"use client";

import React from "react";
import {
  BadgeDollarSign,
  ChevronDown,
  DollarSign,
  IndianRupee,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/redux/store"; // Import RootState type
import { setCurrency } from "@/src/redux/cart/cartSlice"; // Import the setCurrency action

interface CurrencyDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
  dropdownRef: React.RefObject<HTMLDivElement>; // Renamed prop
}

const CurrencyDropdown: React.FC<CurrencyDropdownProps> = ({
  isOpen,
  onToggle,
  dropdownRef, // Updated prop name
}) => {
  const dispatch = useDispatch();
  const currency = useSelector((state: RootState) => state.cart.currency);

  const handleCurrencySelect = (selectedCurrency: "USD" | "INR") => {
    dispatch(setCurrency(selectedCurrency)); // Dispatch the setCurrency action
    onToggle(); // Close the dropdown
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {" "}
      {/* Updated prop usage */}
      <button
        className="flex items-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 px-2 py-1 pr-0 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-sm transition-all duration-300 ease-in-out dark:text-gray-200"
        onClick={onToggle}
      >
        <BadgeDollarSign
          className="text-primary dark:text-primaryLight mr-1"
          size={20}
          strokeWidth={1.5}
        />
        {currency} <ChevronDown className="ml-1 p-1" />
      </button>
      {isOpen && (
        <ul className="absolute right-0 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 shadow-lg transition-all duration-300 ease-in-out z-10">
          <li>
            <button
              className="flex items-center px-3 py-1 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border-b border-gray-300 dark:border-gray-700 transition-all duration-300 ease-in-out text-md w-full text-left"
              onClick={() => handleCurrencySelect("USD")}
            >
              <DollarSign
                className="mr-2 text-gray-700 dark:text-gray-300"
                size={20}
                strokeWidth={2}
              />
              USD
            </button>
          </li>
          <li>
            <button
              className="flex items-center px-3 py-1 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out text-md w-full text-left"
              onClick={() => handleCurrencySelect("INR")}
            >
              <IndianRupee
                className="mr-2 text-gray-700 dark:text-gray-300"
                size={20}
                strokeWidth={2}
              />
              INR
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default CurrencyDropdown;
