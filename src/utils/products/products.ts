import { Product } from "@/types/product";
import { createClient } from "@/utils/supabase/client";

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
      label: "Out of Stock",
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
      label: "Out of Stock",
      style: {
        backgroundColor: "#2a3038", // deeper gray with richer tone
        color: "#d1d5db", // bright gray text for good contrast
      },
    },
  },
};

/**
 * Resolves applicable tags for a product
 * @param item - Product object
 * @param isInCart - Whether product is in cart
 * @param theme - Theme mode ("light" or "dark")
 * @param limit - Max number of tags to return (default: Infinity for all tags)
 * @returns Array of tag configs limited by the specified number
 *
 * Priority order:
 * 1. Cart state - "Added To Cart" if isInCart
 * 2. Item status - "Not in Stock" if unavailable
 * 3. Product tags - All custom tags from item.tags array
 */
export const getProductTags = (
  item: Product,
  isInCart: boolean,
  theme: "light" | "dark" = "light",
  limit: number = Infinity
): ProductTagConfig[] => {
  const palette = TAG_STYLES[theme];

  // Map all product tags to their configs
  let tags = (item.tags || [])
    .map((tag) => palette[tag as ProductTag])
    .filter(Boolean) as ProductTagConfig[];

  // Add unavailable tag at the start if applicable
  if (item.status === "unavailable") {
    tags = [palette["unavailable"], ...tags];
  }

  // Add cart tag at the start if applicable (highest priority)
  if (isInCart) {
    tags = [palette["added-to-cart"], ...tags];
  }

  return tags.slice(0, limit);
};

/**
 * Fetch a single product by name (case-insensitive)
 * Used for SSG/ISR in product detail pages
 * @param itemName - URL-encoded product name
 * @returns Product data or null
 */
export async function getProduct(itemName: string): Promise<Product | null> {
  const supabase = createClient();
  const decodedName = decodeURIComponent(itemName);

  const { data } = await supabase
    .from("products")
    .select("*")
    .ilike("name", decodedName)
    .single();

  return data;
}

/**
 * Fetch all product names for static path generation
 * Used in generateStaticParams for SSG
 * @returns Array of product names
 */
export async function getAllProductNames(): Promise<{ name: string }[]> {
  const supabase = createClient();
  const { data } = await supabase.from("products").select("name");
  return data || [];
}
