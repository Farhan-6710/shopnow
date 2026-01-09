"use client";

import React from "react";
import AccountDropdown from "./AccountDropdown";
import CurrencyDropdown from "./CurrencyDropdown";

const Dropdowns: React.FC = () => {
  return (
    <div className="flex gap-2">
      <CurrencyDropdown />
      <AccountDropdown />
    </div>
  );
};

export default Dropdowns;
