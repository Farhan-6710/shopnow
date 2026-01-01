"use client";

import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConfirmationModal from "@/components/atoms/ConfirmationModal";
import { motion } from "framer-motion";

interface CartHeaderProps {
  itemCount: number;
  onClearCart: () => void;
  isEmpty: boolean;
}

const CartHeader: React.FC<CartHeaderProps> = ({
  itemCount,
  onClearCart,
  isEmpty,
}) => {
  const [showClearModal, setShowClearModal] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="flex items-center justify-between mb-6"
      >
        <div>
          <h1
            id="cart-heading"
            className="text-2xl md:text-3xl font-bold text-foreground"
          >
            My Cart
          </h1>
          <p className="text-muted-foreground mt-1">
            {itemCount === 0
              ? "No items"
              : `${itemCount} item${itemCount > 1 ? "s" : ""} in cart`}
          </p>
        </div>

        {!isEmpty && (
          <Button
            variant="outline"
            size="md"
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => setShowClearModal(true)}
            aria-label="Clear all items from cart"
          >
            <Trash2 className="size-4 mr-2" />
            Clear Cart
          </Button>
        )}
      </motion.div>

      <ConfirmationModal
        open={showClearModal}
        onOpenChange={setShowClearModal}
        title="Clear Cart"
        description="Are you sure you want to remove all items from your cart? This action cannot be undone."
        icon={Trash2}
        confirmLabel="Clear Cart"
        cancelLabel="Cancel"
        onConfirm={() => {
          onClearCart();
          setShowClearModal(false);
        }}
        onCancel={() => setShowClearModal(false)}
      />
    </>
  );
};

export default CartHeader;
