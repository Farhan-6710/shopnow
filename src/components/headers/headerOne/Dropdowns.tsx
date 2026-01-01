"use client";

import React from "react";
import AccountDropdown from "./AccountDropdown";
import CurrencyDropdown from "./CurrencyDropdown";

const Dropdowns: React.FC = () => {
  return (
    <div className="flex space-x-3 pr-">
      <CurrencyDropdown />
      <AccountDropdown />
    </div>
  );
};

export default Dropdowns;
