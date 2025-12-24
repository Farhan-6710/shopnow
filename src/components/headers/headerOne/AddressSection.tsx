import React from "react";
import { MapPin } from "lucide-react";

const AddressSection: React.FC = () => (
  <div className="hidden md:flex items-center space-x-4">
    <div className="flex items-center space-x-2">
      <MapPin className="text-gray-600 dark:text-gray-400" size={18} />
      <span className="text-foreground text-sm transition-colors duration-200">
        123 Street, Trend City, TX 56789
      </span>
    </div>
  </div>
);

export default AddressSection;
