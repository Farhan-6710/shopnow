"use client";

import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConfirmationModal from "@/components/atoms/ConfirmationModal";

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
      <div className="flex items-center justify-between mb-6">
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
            variant="ghost"
            size="sm"
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => setShowClearModal(true)}
          >
            <Trash2 className="size-4 mr-2" />
            Clear All
          </Button>
        )}
      </div>

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
