"use client";

import React from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const WishlistEmpty: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 border bg-card">
      <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
        <Heart className="size-12 text-muted-foreground" />
      </div>
      <h2 className="text-xl font-semibold text-foreground mb-2">
        Your wishlist is empty
      </h2>
      <p className="text-muted-foreground text-center max-w-md mb-6">
        Save items you love by clicking the heart icon on any product.
        They&apos;ll appear here for easy access later.
      </p>
      <Button asChild>
        <Link href="/">Browse Products</Link>
      </Button>
    </div>
  );
};

export default WishlistEmpty;
