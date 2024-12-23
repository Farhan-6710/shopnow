import React, { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react"; // Import CheckCircle icon from Lucide

interface FilterNotificationProps {
  message: string;
  onClose: () => void;
}

const FilterNotification: React.FC<FilterNotificationProps> = ({
  message,
  onClose,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300); // Delay the onClose callback to let the slide-out animation complete
    }, 3000); // Popup duration

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-8 inset-x-0 flex justify-center mx-2 ${
        visible ? "popup-enter" : "popup-exit"
      }`}
      role="alert"
    >
      <div
        className={`bg-primary text-white px-6 py-4 rounded-lg shadow-lg transition-all duration-300 border border-gray-600 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="flex items-center">
          <div className="flex items-center justify-center w-10 h-10 bg-green-500 text-white rounded-full mr-4">
            <CheckCircle size={24} />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-lg font-bold">Filter Applied</h2>
            <span>{message}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterNotification;
