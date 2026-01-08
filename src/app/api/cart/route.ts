import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

// GET /api/cart - Fetch all cart items for the authenticated user
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

    // Fetch cart items with product details
    const { data: cartItems, error } = await supabase
      .from("cart_items")
      .select(
        `
        quantity,
        created_at,
        products (*)
      `
      )
      .eq("user_id", user.id);

    if (error) throw error;

    // Transform the data to match frontend CartItem structure
    const transformedItems =
      cartItems?.map((item) => ({
        ...item.products,
        quantity: item.quantity,
      })) || [];

    return NextResponse.json({ success: true, data: transformedItems });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}

// POST /api/cart - Add item(s) to cart (supports single item or bulk)
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
    const items = Array.isArray(body)
      ? body
      : [{ productId: body.productId, quantity: body.quantity || 1 }];

    if (items.length === 0) {
      return NextResponse.json(
        { success: false, error: "No items provided" },
        { status: 400 }
      );
    }

    // Process each item
    for (const item of items) {
      const { productId, quantity = 1 } = item;

      if (!productId) continue; // Skip invalid items

      // Check if item already exists in cart
      const { data: existingItem } = await supabase
        .from("cart_items")
        .select("quantity")
        .eq("user_id", user.id)
        .eq("product_id", productId)
        .single();

      if (existingItem) {
        // Replace with new quantity (user's latest intent)
        await supabase
          .from("cart_items")
          .update({
            quantity: quantity,
            updated_at: new Date().toISOString(),
          })
          .eq("user_id", user.id)
          .eq("product_id", productId);
      } else {
        // Insert new cart item
        await supabase.from("cart_items").insert({
          user_id: user.id,
          product_id: productId,
          quantity,
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error adding to cart:", error);
    return NextResponse.json(
      { success: false, error: "Failed to add item to cart" },
      { status: 500 }
    );
  }
}

// PUT /api/cart - Update cart item quantity
export async function PUT(request: NextRequest) {
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

    const { productId, quantity } = await request.json();

    if (!productId || quantity === undefined) {
      return NextResponse.json(
        { success: false, error: "Product ID and quantity are required" },
        { status: 400 }
      );
    }

    if (quantity < 1) {
      return NextResponse.json(
        { success: false, error: "Quantity must be at least 1" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("cart_items")
      .update({
        quantity,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", user.id)
      .eq("product_id", productId);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating cart:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update cart item" },
      { status: 500 }
    );
  }
}

// DELETE /api/cart - Remove single item, bulk items, or clear all cart items
// - Single item: { productId: number }
// - Bulk delete: { productIds: number[] }
// - Clear all: no body
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
    let productIds: number[] | undefined;
    try {
      const body = await request.json();
      productId = body.productId;
      productIds = body.productIds;
    } catch {
      // No body or invalid JSON - treat as clear all request
      productId = undefined;
      productIds = undefined;
    }

    // Bulk delete (array of product IDs)
    if (productIds && Array.isArray(productIds) && productIds.length > 0) {
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("user_id", user.id)
        .in("product_id", productIds);

      if (error) throw error;

      return NextResponse.json({ success: true });
    }

    // Clear all cart items (no productId or productIds provided)
    if (!productId) {
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("user_id", user.id);

      if (error) throw error;

      return NextResponse.json({ success: true });
    }

    // Single item delete
    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("user_id", user.id)
      .eq("product_id", productId);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error removing from cart:", error);
    return NextResponse.json(
      { success: false, error: "Failed to remove item from cart" },
      { status: 500 }
    );
  }
}
