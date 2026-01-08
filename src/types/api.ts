    // src/types/api.ts

/**
 * Standard API response wrapper
 */
export interface ApiResponse<T = void> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Payload for adding/updating a single cart item
 */
export interface CartItemPayload {
  productId: number;
  quantity: number;
}

/**
 * Payload for bulk cart operations
 */
export interface BulkCartItemPayload {
  productId: number;
  quantity: number;
}

/**
 * Payload for single wishlist item
 */
export interface WishlistItemPayload {
  productId: number;
}

/**
 * Track items removed while offline for sync
 */
export type RemovedItemsMap = Record<number, boolean>;
