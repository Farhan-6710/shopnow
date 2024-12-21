import React from "react";
import Image from "next/image";

const PaymentMethods: React.FC = () => {
  return (
    <div className="mt-6">
      <h3 className={`text-lg font-semibold mb-2 dark:text-white`}>Payment Methods</h3>
      <div className="flex flex-wrap justify-center items-center gap-4 w-100 pt-2">
        <div className="flex flex-col justify-center items-center space-x-2 w-full bg-gray-200 dark:bg-gray-700">
          <Image
            src="/images/payments2.png"
            alt="Credit Card"
            width={500} // Replace with the actual width of your image
            height={300} // Replace with the actual height of your image
            className="w-full h-auto" // Optional: for responsive styling
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
