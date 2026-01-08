"use client";

import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConfirmationModal from "@/components/modals/ConfirmationModal";
import { motion } from "framer-motion";

interface WishlistHeaderProps {
  itemCount: number;
  onClearAll: () => void;
  isEmpty: boolean;
}

const WishlistHeader: React.FC<WishlistHeaderProps> = ({
  itemCount,
  onClearAll,
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
            id="wishlist-heading"
            className="text-2xl md:text-3xl font-bold text-foreground"
          >
            My Wishlist
          </h1>
          <p className="text-muted-foreground mt-1">
            {itemCount === 0
              ? "No items saved"
              : `${itemCount} item${itemCount > 1 ? "s" : ""} saved`}
          </p>
        </div>

        {!isEmpty && (
          <Button
            variant="outline"
            size="md"
            onClick={() => setShowClearModal(true)}
            aria-label="Clear all items from wishlist"
          >
            <Trash2 className="size-4 mr-2" />
            Clear All
          </Button>
        )}
      </motion.div>

      <ConfirmationModal
        open={showClearModal}
        onOpenChange={setShowClearModal}
        title="Clear Wishlist"
        description="Are you sure you want to remove all items from your wishlist? This action cannot be undone."
        icon={Trash2}
        confirmLabel="Clear All"
        cancelLabel="Cancel"
        onConfirm={() => {
          onClearAll();
          setShowClearModal(false);
        }}
        onCancel={() => setShowClearModal(false)}
      />
    </>
  );
};

export default WishlistHeader;
