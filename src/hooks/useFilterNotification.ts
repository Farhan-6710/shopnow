import { useState, useEffect } from "react";

interface UseFilterNotificationProps {
  isLoading: boolean; // Track if the products are still being loaded
  productsLength: number; // Number of products after filtering
  isFilterApplied: boolean; // Whether any filters are applied
}

export const useFilterNotification = ({
  isLoading,
  productsLength,
  isFilterApplied,
}: UseFilterNotificationProps) => {
  const [notificationMessage, setNotificationMessage] = useState<string | null>(
    null
  );

  // Trigger notification only when loading is finished, and filters are applied
  useEffect(() => {
    if (!isLoading && isFilterApplied) {
      // Only trigger notification after loadin is complete and filters are applied
      triggerNotification(`${productsLength} items matched your filters.`);
    } else {
      // Ensure notification is cleared if still loading or no filters applied
      setNotificationMessage(null);
    }
  }, [isLoading, productsLength, isFilterApplied]);

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
    closeNotificationImmediately,
  };
};
