import React from "react";
import Image from "next/image";

const PaymentMethods: React.FC = () => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-3">Payment Methods</h3>
      <div className="w-full border rounded-md overflow-hidden bg-background">
        <Image
          src="/images/payments2.png"
          alt="Payment Methods"
          width={800}
          height={400}
          className="w-full h-auto"
        />
      </div>
    </div>
  );
};

export default PaymentMethods;
