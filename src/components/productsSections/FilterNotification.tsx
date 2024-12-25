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
  const [animationKey, setAnimationKey] = useState(0); // Key to reset animation

  useEffect(() => {
    // Set a new animation key each time the notification is triggered
    setAnimationKey((prevKey) => prevKey + 1); // This will force a re-render of the timer bar

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300); // Delay the onClose callback
    }, 3000); // Popup duration

    return () => clearTimeout(timer);
  }, [onClose, message]); // Trigger again when the message or onClose changes

  useEffect(() => {
    const fixedElement = document.querySelector(
      ".fixed-element"
    ) as HTMLElement | null;

    function centerElement() {
      if (fixedElement) {
        const viewportWidth = window.innerWidth;
        const elementWidth = fixedElement.offsetWidth;
        fixedElement.style.left = `${(viewportWidth - elementWidth) / 2}px`;
      } else {
        console.error("Could not find the element with class '.fixed-element'");
      }
    }

    centerElement(); // Initial centering
    window.addEventListener("resize", centerElement); // Recenter on resize

    return () => {
      window.removeEventListener("resize", centerElement);
    };
  }, []); // Empty dependency array ensures this runs only once after the initial render

  return (
    <div
      className={`fixed-element ${visible ? "popup-enter" : "popup-exit"}`} // Apply the class here
      role="alert"
      style={{
        position: "fixed",
        bottom: "20px", // Adjust as needed
        zIndex: 100, // Ensure it's on top
      }}
    >
      <div
        className={`bg-primary text-white rounded-lg shadow-lg transition-all duration-300 border border-gray-600 relative ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Timer bar (green line) */}
        <div key={animationKey} className="timer-bar bg-green-400"></div>{" "}
        {/* Reset animation on key change */}
        <div className="flex items-center px-6 py-4">
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
