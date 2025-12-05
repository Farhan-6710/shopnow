// components/Loader.tsx
import React from "react";

const Loader: React.FC = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-primaryDarkTwo bg-opacity-50 z-50">
    <div className="w-16 h-16 border-4 border-t-4 border-primary rounded-full animate-spin"></div>
  </div>
);

export default Loader;
