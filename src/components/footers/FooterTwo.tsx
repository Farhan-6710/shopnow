import React from "react";
import Image from "next/image";

const FooterTwo: React.FC = () => {
  return (
    <footer className="bg-background text-foreground py-6 border-t transition-colors duration-200">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center px-4 space-y-4 sm:space-y-0">
        {/* Left Column: Copyright Text */}
        <div className="text-sm">
          &copy; {new Date().getFullYear()} SHOPNOW. All rights reserved.
        </div>

        {/* Right Column: PAYMENT APPS */}
        <div className="w-auto flex items-center justify-center">
          <Image
            src="/images/payments.png"
            alt="Payments"
            width={380} // Set width directly
            height={64} // Set height directly
            className="flex items-center justify-center w-64" // Set width auto for md and above, specific width for smaller screens
          />
        </div>
      </div>
    </footer>
  );
};

export default FooterTwo;
