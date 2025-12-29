import { Product } from "@/types/product";

export type ProductTag =
  | "bestseller"
  | "trending"
  | "top-rated"
  | "added-to-cart"
  | "unavailable";

interface ProductTagConfig {
  label: string;
  style: React.CSSProperties;
}

/**
 * Theme-aware tag styles
 * Light → expressive
 * Dark  → muted, deep, premium
 */
const TAG_STYLES: Record<
  "light" | "dark",
  Record<ProductTag, ProductTagConfig>
> = {
  light: {
    "added-to-cart": {
      label: "Added To Cart",
      style: {
        backgroundColor: "#065f46", // emerald-800
        color: "#d1fae5",
      },
    },

    bestseller: {
      label: "Bestseller",
      style: {
        backgroundColor: "#2563eb", // blue-600
        color: "#eff6ff",
      },
    },

    trending: {
      label: "Trending",
      style: {
        backgroundColor: "#facc15", // yellow-400
        color: "#422006",
      },
    },

    "top-rated": {
      label: "Top Rated",
      style: {
        backgroundColor: "#dc2626", // red-600
        color: "#fee2e2",
      },
    },

    unavailable: {
      label: "Not in Stock",
      style: {
        backgroundColor: "#6b7280", // gray-500
        color: "#f9fafb",
      },
    },
  },

  dark: {
    "added-to-cart": {
      label: "Added To Cart",
      style: {
        backgroundColor: "#064e3b",
        color: "#a7f3d0",
      },
    },

    bestseller: {
      label: "Bestseller",
      style: {
        backgroundColor: "#0b2f5b", // deeper, more saturated blue
        color: "#c7ddff", // brighter blue text
      },
    },

    trending: {
      label: "Trending",
      style: {
        backgroundColor: "#4a3500", // warmer, richer amber bg
        color: "#ffeb99", // lifted amber text
      },
    },

    "top-rated": {
      label: "Top Rated",
      style: {
        backgroundColor: "#4a0f0f", // richer red bg
        color: "#ffd1d1", // brighter red text
      },
    },

    unavailable: {
      label: "Not in Stock",
      style: {
        backgroundColor: "#1f2933", // slightly lighter than card bg
        color: "#b6bcc6", // readable but subdued
      },
    },
  },
};

/**
 * Resolves final tag config for a product
 */
export const getProductTag = (
  item: Product,
  isInCart: boolean,
  theme: "light" | "dark" = "light"
): ProductTagConfig | null => {
  const palette = TAG_STYLES[theme];

  // 1. Cart state
  if (isInCart) return palette["added-to-cart"];

  // 2. Check product tags
  if (item.tags?.length) {
    const tag = item.tags[0] as ProductTag;
    return palette[tag] || null;
  }

  // 3. No tag to display
  return null;
};
