import React from "react";
import { MapPin } from "lucide-react";

const AddressSection: React.FC = () => (
  <div className="hidden md:flex items-center space-x-3">
    <div className="flex items-center space-x-1.5">
      <MapPin className="text-gray-600 dark:text-gray-400" size={14} />
      <span className="text-foreground text-xs transition-colors duration-200">
        123 Street, Trend City, TX 56789
      </span>
    </div>
  </div>
);

export default AddressSection;
