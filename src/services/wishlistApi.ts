// src/services/wishlistApi.ts
import { Product } from "@/types/product";
import { ApiResponse, WishlistItemPayload } from "@/types/api";

const WISHLIST_ENDPOINT = "/api/wishlist";

/**
 * Wishlist API Service
 * Centralized API layer for all wishlist-related operations
 */
export const wishlistApi = {
  /**
   * Fetch all wishlist items for the authenticated user
   */
  async fetch(): Promise<Product[]> {
    const response = await fetch(WISHLIST_ENDPOINT);
    const data: ApiResponse<Product[]> = await response.json();
    if (!data.success)
      throw new Error(data.error || "Failed to fetch wishlist");
    return data.data!;
  },

  /**
   * Add a single item to wishlist
   */
  async addItem(productId: number): Promise<void> {
    const payload: WishlistItemPayload = { productId };
    const response = await fetch(WISHLIST_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data: ApiResponse = await response.json();
    // 409 = already exists, which is fine
    if (!data.success && response.status !== 409) {
      throw new Error(data.error || "Failed to add to wishlist");
    }
  },

  /**
   * Add multiple items to wishlist (for sync)
   */
  async addBulkItems(productIds: number[]): Promise<void> {
    const payload: WishlistItemPayload[] = productIds.map((id) => ({
      productId: id,
    }));
    const response = await fetch(WISHLIST_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data: ApiResponse = await response.json();
    if (!data.success) throw new Error(data.error || "Failed to sync wishlist");
  },

  /**
   * Remove a single item from wishlist
   */
  async removeItem(productId: number): Promise<void> {
    const response = await fetch(WISHLIST_ENDPOINT, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });
    const data: ApiResponse = await response.json();
    if (!data.success)
      throw new Error(data.error || "Failed to remove from wishlist");
  },

  /**
   * Remove multiple items from wishlist (for sync)
   */
  async removeBulkItems(productIds: number[]): Promise<void> {
    const response = await fetch(WISHLIST_ENDPOINT, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productIds }),
    });
    const data: ApiResponse = await response.json();
    if (!data.success)
      throw new Error(data.error || "Failed to bulk remove items");
  },

  /**
   * Clear all wishlist items
   */
  async clearAll(): Promise<void> {
    const response = await fetch(WISHLIST_ENDPOINT, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    const data: ApiResponse = await response.json();
    if (!data.success)
      throw new Error(data.error || "Failed to clear wishlist");
  },
};
