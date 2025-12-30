-- Cart Items Table
-- Stores cart items for authenticated users with quantity
CREATE TABLE cart_items (
  user_id UUID NOT NULL,
  product_id BIGINT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  PRIMARY KEY (user_id, product_id),
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Create index for faster user cart lookups
CREATE INDEX idx_cart_items_user_id ON cart_items(user_id);

-- Wishlist Items Table
-- Stores wishlist items for authenticated users (no quantity)
CREATE TABLE wishlist_items (
  user_id UUID NOT NULL,
  product_id BIGINT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  PRIMARY KEY (user_id, product_id),
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Create index for faster user wishlist lookups
CREATE INDEX idx_wishlist_items_user_id ON wishlist_items(user_id);

-- Enable Row Level Security (RLS) for cart_items
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own cart items
CREATE POLICY "Users can view own cart items"
  ON cart_items FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can only insert their own cart items
CREATE POLICY "Users can insert own cart items"
  ON cart_items FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can only update their own cart items
CREATE POLICY "Users can update own cart items"
  ON cart_items FOR UPDATE
  USING (auth.uid() = user_id);

-- Policy: Users can only delete their own cart items
CREATE POLICY "Users can delete own cart items"
  ON cart_items FOR DELETE
  USING (auth.uid() = user_id);

-- Enable Row Level Security (RLS) for wishlist_items
ALTER TABLE wishlist_items ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own wishlist items
CREATE POLICY "Users can view own wishlist items"
  ON wishlist_items FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can only insert their own wishlist items
CREATE POLICY "Users can insert own wishlist items"
  ON wishlist_items FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can only delete their own wishlist items
CREATE POLICY "Users can delete own wishlist items"
  ON wishlist_items FOR DELETE
  USING (auth.uid() = user_id);
