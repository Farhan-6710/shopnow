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
        backgroundColor: "#1f4f3f", // deeper emerald with rich saturation
        color: "#d1fae5", // bright, high contrast text
      },
    },

    bestseller: {
      label: "Bestseller",
      style: {
        backgroundColor: "#1d3a8a", // richer blue-900 with deep saturation
        color: "#dbeafe", // bright blue text for contrast
      },
    },

    trending: {
      label: "Trending",
      style: {
        backgroundColor: "#92400e", // deeper amber-900 with rich tone
        color: "#fef08a", // bright amber text
      },
    },

    "top-rated": {
      label: "Top Rated",
      style: {
        backgroundColor: "#dc2626", // red-600 (reference - perfect)
        color: "#fee2e2", // light red (reference - perfect)
      },
    },

    unavailable: {
      label: "Not in Stock",
      style: {
        backgroundColor: "#374151", // gray-700 with richer tone
        color: "#f3f4f6", // bright gray text
      },
    },
  },

  dark: {
    "added-to-cart": {
      label: "Added To Cart",
      style: {
        backgroundColor: "#0d3f33", // deeper, saturated emerald
        color: "#aef5e0", // bright, high contrast emerald text
      },
    },

    bestseller: {
      label: "Bestseller",
      style: {
        backgroundColor: "#0f2d5c", // rich, saturated blue
        color: "#bcd8ff", // bright, high contrast blue text
      },
    },

    trending: {
      label: "Trending",
      style: {
        backgroundColor: "#5a3f0f", // deep, saturated amber
        color: "#ffeb80", // bright, vibrant amber text
      },
    },

    "top-rated": {
      label: "Top Rated",
      style: {
        backgroundColor: "#871C1B", // richer red bg (reference - perfect)
        color: "#ffd1d1", // brighter red text (reference - perfect)
      },
    },

    unavailable: {
      label: "Not in Stock",
      style: {
        backgroundColor: "#2a3038", // deeper gray with richer tone
        color: "#d1d5db", // bright gray text for good contrast
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
