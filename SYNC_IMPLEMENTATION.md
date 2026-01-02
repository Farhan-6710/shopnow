# Bulk Sync on Login Implementation

## Overview

When unauthenticated users add items to cart/wishlist locally (Redux only), on login, all local items are automatically synced to the backend using bulk insert APIs. This ensures seamless data persistence across devices with no data loss.

## Flow Diagram

```
User Login
    ↓
useSyncUserData Hook (detects user authentication)
    ↓
Dispatch: cart/syncToBackend + wishlist/syncToBackend
    ↓
┌──────────────────────────────┬──────────────────────────────┐
│  Cart Sync Saga              │  Wishlist Sync Saga          │
├──────────────────────────────┼──────────────────────────────┤
│ 1. Check authentication      │ 1. Check authentication       │
│ 2. Get local cart items      │ 2. Get local wishlist items   │
│ 3. Map to bulk format        │ 3. Extract product IDs        │
│    [{productId, quantity}]   │    [productId1, productId2]   │
│ 4. POST /api/cart (bulk)     │ 4. POST /api/wishlist (bulk)  │
│ 5. Dispatch fetchCartRequest │ 5. Dispatch fetchWishlistReq  │
└──────────────────────────────┴──────────────────────────────┘
    ↓
Backend APIs handle duplicate checking
    ↓
Fetch merged data from backend
    ↓
Update Redux with synced state
    ↓
Show success toast notification
```

## Implementation Details

### 1. Cart Saga (`src/redux/cart/cartSaga.ts`)

**New API Function:**

```typescript
addBulkItems: async (
  items: { productId: number; quantity: number }[]
): Promise<void> => {
  const response = await fetch("/api/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(items),
  });
  // Handle response
};
```

**New Saga Function:**

```typescript
function* syncCartToBackendSaga() {
  // 1. Check authentication
  const isAuthenticated: boolean = yield call(isUserAuthenticated);
  if (!isAuthenticated) return;

  // 2. Get local cart items from Redux
  const localCartItems: CartItem[] = yield select(selectCartItems);
  if (localCartItems.length === 0) {
    yield put(fetchCartRequest()); // Still fetch backend cart
    return;
  }

  // 3. Prepare bulk items
  const bulkItems = localCartItems.map((item) => ({
    productId: item.id,
    quantity: item.quantity,
  }));

  // 4. Sync to backend
  yield call(cartApi.addBulkItems, bulkItems);

  // 5. Fetch merged data
  yield put(fetchCartRequest());

  // 6. Show success toast
  showToast({
    type: "success",
    title: "Cart Synced",
    description: `${bulkItems.length} items synced successfully`,
  });
}
```

**Watcher Update:**

```typescript
yield takeEvery("cart/syncToBackend", syncCartToBackendSaga);
```

### 2. Wishlist Saga (`src/redux/wishlist/wishlistSaga.ts`)

**New API Function:**

```typescript
addBulkItems: async (productIds: number[]): Promise<void> => {
  const response = await fetch("/api/wishlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productIds.map((id) => ({ productId: id }))),
  });
  // Handle response
};
```

**New Saga Function:**

```typescript
function* syncWishlistToBackendSaga() {
  // 1. Check authentication
  const isAuthenticated: boolean = yield call(isUserAuthenticated);
  if (!isAuthenticated) return;

  // 2. Get local wishlist items
  const localWishlistItems: Product[] = yield select(selectWishlistItems);
  if (localWishlistItems.length === 0) {
    yield put(fetchWishlistRequest());
    return;
  }

  // 3. Extract product IDs
  const productIds = localWishlistItems.map((item) => item.id);

  // 4. Sync to backend
  yield call(wishlistApi.addBulkItems, productIds);

  // 5. Fetch merged data
  yield put(fetchWishlistRequest());

  // 6. Show success toast
  showToast({
    type: "success",
    title: "Wishlist Synced",
    description: `${productIds.length} items synced successfully`,
  });
}
```

**Watcher Update:**

```typescript
yield takeEvery("wishlist/syncToBackend", syncWishlistToBackendSaga);
```

### 3. Backend Cart API (`src/app/api/cart/route.ts`)

**POST Handler - Bulk Insert Support:**

```typescript
// Accept both array and single item (backward compatible)
const items = Array.isArray(body)
  ? body
  : [{ productId: body.productId, quantity: body.quantity || 1 }];

// Process each item
for (const { productId, quantity } of items) {
  // Check if item already exists
  const { data: existingItem } = await supabase
    .from("cart_items")
    .select("*")
    .eq("user_id", user.id)
    .eq("product_id", productId)
    .single();

  if (existingItem) {
    // Update existing quantity
    await supabase
      .from("cart_items")
      .update({ quantity: existingItem.quantity + quantity })
      .eq("id", existingItem.id);
  } else {
    // Insert new item
    await supabase
      .from("cart_items")
      .insert([{ user_id: user.id, product_id: productId, quantity }]);
  }
}
```

### 4. Backend Wishlist API (`src/app/api/wishlist/route.ts`)

**POST Handler - Bulk Insert with Duplicate Filtering:**

```typescript
// Accept both array and single item
const productIds = Array.isArray(body)
  ? body.map((item) => item.productId)
  : [body.productId];

// Bulk query existing items
const { data: existingItems } = await supabase
  .from("wishlist_items")
  .select("product_id")
  .eq("user_id", user.id)
  .in("product_id", productIds);

const existingProductIds = new Set(
  existingItems?.map((item) => item.product_id) || []
);

// Filter out duplicates
const newProductIds = productIds.filter((id) => !existingProductIds.has(id));

if (newProductIds.length > 0) {
  // Bulk insert new items
  const itemsToInsert = newProductIds.map((productId) => ({
    user_id: user.id,
    product_id: productId,
  }));

  await supabase.from("wishlist_items").insert(itemsToInsert);
}

return NextResponse.json({
  success: true,
  added: newProductIds.length,
  skipped: existingProductIds.size,
});
```

### 5. Sync Hook (`src/hooks/useSyncUserData.ts`)

**Complete Implementation:**

```typescript
export const useSyncUserData = () => {
  const dispatch = useDispatch();
  const { user, loading } = useAuth();
  const hasSynced = useRef(false);

  useEffect(() => {
    // Sync on login (only once)
    if (user && !loading && !hasSynced.current) {
      hasSynced.current = true;

      dispatch({ type: "cart/syncToBackend" });
      dispatch({ type: "wishlist/syncToBackend" });
    }

    // Reset sync flag on logout
    if (!user && !loading) {
      hasSynced.current = false;
    }
  }, [user?.id, loading, dispatch]);
};
```

## Key Features

### 1. **Backward Compatibility**

- APIs accept both single items and arrays
- Existing functionality remains unchanged
- No breaking changes for current consumers

### 2. **Duplicate Handling**

- **Cart**: Updates quantity if item exists, inserts if new
- **Wishlist**: Bulk queries existing items, filters duplicates, inserts only new items

### 3. **Error Resilience**

- If sync fails, still attempts to fetch backend data
- Shows warning toast instead of error
- Ensures user can still access backend items

### 4. **Performance Optimization**

- **Cart**: Sequential processing (to handle quantity updates correctly)
- **Wishlist**: Single bulk insert query (more efficient)
- Minimizes database round trips

### 5. **User Feedback**

- Success toast: "Cart/Wishlist Synced - X items synced successfully"
- Warning toast: "Some items may not have synced properly"
- Console logs for debugging

## Testing Checklist

- [ ] Unauthenticated user adds items to cart locally
- [ ] Unauthenticated user adds items to wishlist locally
- [ ] User logs in
- [ ] Verify sync toasts appear
- [ ] Check cart and wishlist show merged data (local + backend)
- [ ] Verify no duplicate items in cart/wishlist
- [ ] Test with empty local cart/wishlist
- [ ] Test with empty backend cart/wishlist
- [ ] Test with items in both local and backend
- [ ] Test sync failure scenarios
- [ ] Verify backend APIs still work with single items
- [ ] Test logout and re-login (hasSynced flag reset)

## Database Schema

### Cart Items Table

```sql
CREATE TABLE cart_items (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Wishlist Items Table

```sql
CREATE TABLE wishlist_items (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  product_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);
```

## Future Enhancements

1. **Offline Queue**: Store failed sync attempts and retry
2. **Conflict Resolution**: Handle timestamp-based conflicts
3. **Partial Sync**: Sync only changed items (delta sync)
4. **Background Sync**: Use Service Workers for background syncing
5. **Optimistic Locking**: Prevent race conditions with version numbers
