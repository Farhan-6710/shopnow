import { useState, useEffect } from "react";
import { productsData } from "@/src/data/productsData";
import { Product } from "@/types/product";
import { RootState } from "@/src/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "@/src/redux/cart/cartSlice";

// Define the FilterState interface
interface FilterState {
  selectedCategory: string[];
  selectedPriceRange: string[];
  selectedColors: string[];
}

export const useFilteredProducts = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const currency = useSelector((state: RootState) => state.cart.currency);

  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    selectedCategory: [],
    selectedPriceRange: [],
    selectedColors: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [notificationMessage, setNotificationMessage] = useState<string | null>(
    null
  );

  const categories = Array.from(
    new Set(productsData.map((product) => product.category))
  );

  // Utility function to check if any filter is applied
  const areFiltersApplied = () => {
    return (
      filters.selectedCategory.length > 0 ||
      filters.selectedPriceRange.length > 0 ||
      filters.selectedColors.length > 0
    );
  };

  useEffect(() => {
    // Define priceRanges inside useEffect to avoid making it a dependency
    const priceRanges = {
      cheap: { USD: 20, INR: 500 },
      affordable: { USD: 39, INR: 2500 },
      expensive: { USD: 39, INR: 2500 },
    };

    // Extract price range values based on the current currency
    const cheapPrice = priceRanges.cheap[currency];
    const affordablePrice = priceRanges.affordable[currency];

    const filtered = productsData.filter((product) => {
      const matchesCategory =
        filters.selectedCategory.length === 0 ||
        filters.selectedCategory.includes(product.category);

      const productPrice = product.prices[currency] || product.prices.USD;

      let matchesPrice = true;
      if (filters.selectedPriceRange.length > 0) {
        matchesPrice = filters.selectedPriceRange.some((range) => {
          if (range === "cheap") {
            return productPrice <= cheapPrice;
          } else if (range === "affordable") {
            return productPrice > cheapPrice && productPrice <= affordablePrice;
          } else if (range === "expensive") {
            return productPrice > affordablePrice;
          }
          return false;
        });
      }

      const matchesColor =
        filters.selectedColors.length === 0 ||
        filters.selectedColors.includes(product.color);

      return matchesCategory && matchesPrice && matchesColor;
    });

    setLoading(true);
    setTimeout(() => {
      setProducts(filtered);
      setLoading(false);
    }, 700);
  }, [
    filters.selectedCategory,
    filters.selectedPriceRange,
    filters.selectedColors,
    currency,
  ]);

  // Trigger notification once products are filtered and loaded, and filters are applied
  useEffect(() => {
    if (!loading && areFiltersApplied()) {
      triggerNotification(`${products.length} items matched your filters.`);
    }
  }, [loading, products.length]);

  // Function to handle filter changes and show notification
  const triggerNotification = (message: string) => {
    setNotificationMessage(message);
  };

  // Immediately close the notification
  const closeNotificationImmediately = () => {
    setNotificationMessage(null); // Immediately clear the notification message
  };

  const handleAddToCart = (productId: number) => {
    if (!cartItems.some((item) => item.id === productId)) {
      const product = productsData.find((product) => product.id === productId);
      if (product) {
        dispatch(addToCart({ ...product, quantity: 1, currency }));
      }
    }
  };

  const handleRemoveFromCart = (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  const handleCategoryChange = (category: string) => {
    setFilters((prevFilters) => {
      const updatedCategory = prevFilters.selectedCategory.includes(category)
        ? prevFilters.selectedCategory.filter((c) => c !== category) // Remove category if already selected
        : [...prevFilters.selectedCategory, category]; // Add category if not selected
      return { ...prevFilters, selectedCategory: updatedCategory };
    });
  };

  const handlePriceRangeChange = (priceRange: string) => {
    setFilters((prevFilters) => {
      const updatedPriceRange = prevFilters.selectedPriceRange.includes(
        priceRange
      )
        ? prevFilters.selectedPriceRange.filter((r) => r !== priceRange) // Remove price range if already selected
        : [...prevFilters.selectedPriceRange, priceRange]; // Add price range if not selected
      return { ...prevFilters, selectedPriceRange: updatedPriceRange };
    });
  };

  const handleColorChange = (color: string) => {
    setFilters((prevFilters) => {
      const updatedColors = prevFilters.selectedColors.includes(color)
        ? prevFilters.selectedColors.filter((c) => c !== color) // Remove color if already selected
        : [...prevFilters.selectedColors, color]; // Add color if not selected
      return { ...prevFilters, selectedColors: updatedColors };
    });
  };

  const handleResetFilter = () => {
    closeNotificationImmediately(); // Close the notification immediately when reset is triggered
    setFilters({
      selectedCategory: [],
      selectedPriceRange: [],
      selectedColors: [],
    });
  };

  return {
    products,
    loading,
    notificationMessage,
    categories,
    filters,
    handleAddToCart,
    handleRemoveFromCart,
    handleCategoryChange,
    handlePriceRangeChange,
    handleColorChange,
    handleResetFilter,
    setNotificationMessage,
  };
};
