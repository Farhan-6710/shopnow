import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

// GET /api/wishlist - Fetch all wishlist items for the authenticated user
export async function GET() {
  try {
    const supabase = await createClient();

    // Get authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Fetch wishlist items with product details
    const { data: wishlistItems, error } = await supabase
      .from("wishlist_items")
      .select(
        `
        created_at,
        products (*)
      `
      )
      .eq("user_id", user.id);

    if (error) throw error;

    // Transform the data to match frontend Product structure
    const transformedItems = wishlistItems?.map((item) => item.products) || [];

    return NextResponse.json({ success: true, data: transformedItems });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch wishlist" },
      { status: 500 }
    );
  }
}

// POST /api/wishlist - Add item(s) to wishlist (supports single item or bulk)
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Get authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Support both single item and bulk array
    const productIds = Array.isArray(body)
      ? body.map((item) => item.productId)
      : [body.productId];

    if (productIds.length === 0 || !productIds[0]) {
      return NextResponse.json(
        { success: false, error: "No product IDs provided" },
        { status: 400 }
      );
    }

    // Get existing wishlist items to avoid duplicates
    const { data: existingItems } = await supabase
      .from("wishlist_items")
      .select("product_id")
      .eq("user_id", user.id)
      .in("product_id", productIds);

    const existingProductIds = new Set(
      existingItems?.map((item) => item.product_id) || []
    );

    // Filter out items that already exist
    const newProductIds = productIds.filter(
      (id) => !existingProductIds.has(id)
    );

    if (newProductIds.length > 0) {
      // Insert new wishlist items in bulk
      const itemsToInsert = newProductIds.map((productId) => ({
        user_id: user.id,
        product_id: productId,
      }));

      const { error } = await supabase
        .from("wishlist_items")
        .insert(itemsToInsert);

      if (error) throw error;
    }

    return NextResponse.json({
      success: true,
      added: newProductIds.length,
      skipped: existingProductIds.size,
    });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    return NextResponse.json(
      { success: false, error: "Failed to add item to wishlist" },
      { status: 500 }
    );
  }
}

// DELETE /api/wishlist - Remove single item or clear all wishlist items
// If no productId is provided, clears all wishlist items
export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Get authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Try to parse the request body
    let productId: number | undefined;
    try {
      const body = await request.json();
      productId = body.productId;
    } catch {
      // No body or invalid JSON - treat as clear all request
      productId = undefined;
    }

    if (!productId) {
      // Clear all wishlist items for the user
      const { error } = await supabase
        .from("wishlist_items")
        .delete()
        .eq("user_id", user.id);

      if (error) throw error;

      return NextResponse.json({ success: true });
    }

    // Single item delete
    const { error } = await supabase
      .from("wishlist_items")
      .delete()
      .eq("user_id", user.id)
      .eq("product_id", productId);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    return NextResponse.json(
      { success: false, error: "Failed to remove item from wishlist" },
      { status: 500 }
    );
  }
}
