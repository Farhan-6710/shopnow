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

// POST /api/wishlist - Add item to wishlist
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

    const { productId } = await request.json();

    if (!productId) {
      return NextResponse.json(
        { success: false, error: "Product ID is required" },
        { status: 400 }
      );
    }

    // Check if item already exists in wishlist
    const { data: existingItem } = await supabase
      .from("wishlist_items")
      .select("product_id")
      .eq("user_id", user.id)
      .eq("product_id", productId)
      .single();

    if (existingItem) {
      return NextResponse.json(
        { success: false, error: "Item already in wishlist" },
        { status: 409 }
      );
    }

    // Insert new wishlist item
    const { error } = await supabase.from("wishlist_items").insert({
      user_id: user.id,
      product_id: productId,
    });

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    return NextResponse.json(
      { success: false, error: "Failed to add item to wishlist" },
      { status: 500 }
    );
  }
}

// DELETE /api/wishlist - Remove item from wishlist
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

    const { productId } = await request.json();

    if (!productId) {
      return NextResponse.json(
        { success: false, error: "Product ID is required" },
        { status: 400 }
      );
    }

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
