import { useState, useEffect } from "react";

interface UseFilterNotificationProps {
  loading: boolean;        // Track if the products are still being loaded
  productsLength: number;  // Number of products after filtering
  filtersApplied: boolean; // Whether any filters are applied
}

export const useFilterNotification = ({
  loading,
  productsLength,
  filtersApplied,
}: UseFilterNotificationProps) => {
  const [notificationMessage, setNotificationMessage] = useState<string | null>(null);

  // Trigger notification only when loading is finished, and filters are applied
  useEffect(() => {
    if (!loading && filtersApplied) {
      // Only trigger notification after loading is complete and filters are applied
      triggerNotification(`${productsLength} items matched your filters.`);
    } else {
      // Ensure notification is cleared if still loading or no filters applied
      setNotificationMessage(null);
    }
  }, [loading, productsLength, filtersApplied]);

  // Function to handle notification trigger
  const triggerNotification = (message: string) => {
    setNotificationMessage(message);
  };

  // Immediately close the notification
  const closeNotificationImmediately = () => {
    setNotificationMessage(null); // Immediately clear the notification message
  };

  return {
    notificationMessage,
    triggerNotification,
    setNotificationMessage, // Returning the close function for other use cases
  };
};
