"use client";

import React from "react";
import AccountDropdown from "./AccountDropdown";
import CurrencyDropdown from "./CurrencyDropdown";

const Dropdowns: React.FC = () => {
  return (
    <div className="flex space-x-3 pr-2">
      <AccountDropdown />
      <CurrencyDropdown />
    </div>
  );
};

export default Dropdowns;
