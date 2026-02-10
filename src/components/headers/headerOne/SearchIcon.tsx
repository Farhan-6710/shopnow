import React from "react";
import { Search } from "lucide-react";

const SearchIcon = () => (
  <button className="block md:hidden relative mt-1" aria-label="Open search">
    <Search
      className="text-primary"
      size={24}
      strokeWidth={2.5}
      aria-hidden="true"
    />
  </button>
);

export default SearchIcon;
