import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { useAuth } from "@/providers/authContext";
import { showToast } from "@/config/ToastConfig";

const PaymentMethods: React.FC = () => {
  const { session } = useAuth();
  const handlePaymentClick = () => {
    if (session) {
      showToast({
        type: "info",
        title: "Payment Failed",
        description: "Payment integration coming soon",
      });
    } else {
      showToast({
        type: "error",
        title: "Authentication Required",
        description: "Please log in to proceed with payment.",
      });
    }
  };
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
      <Button
        variant="default"
        className="mt-4 w-full text-md"
        size="lg"
        onClick={handlePaymentClick}
      >
        Proceed to Payment
      </Button>
    </div>
  );
};

export default PaymentMethods;
