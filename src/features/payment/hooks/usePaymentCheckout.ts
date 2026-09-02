import { useEffect, useState } from "react";
import type {
  RazorpayFailedResponse,
  RazorpayPaymentResponse,
} from "../types/payment.type";
import { useMutation } from "@tanstack/react-query";
import { paymentVerification } from "../api/payment.api";
const API_KEY = import.meta.env.VITE_RZPAY_API_KEY;

export const usePaymentCheckout = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const {
    mutate: verifyPayment,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: paymentVerification,
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setIsLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePaymentCheckout = (amount: number, orderId: string) => {
    if (!window.Razorpay) {
      console.error("Razorpay SDK is not loaded");
      return;
    }

    const options = {
      key: API_KEY,
      amount,
      currency: "INR",
      name: "Test org",
      description: "Test Transaction",
      order_id: orderId,

      handler: (response: RazorpayPaymentResponse) => {
        verifyPayment(response);
      },

      prefill: {
        name: "John Doe",
        email: "john@example.com",
        contact: "9876543210",
      },

      theme: {
        color: "#3399cc",
      },
    };

    const razorpay = new window.Razorpay(options);

    razorpay.on("payment.failed", (response: RazorpayFailedResponse) => {
      console.error(response.error);
    });

    razorpay.open();
  };
  return { isLoaded, handlePaymentCheckout, isPending, isSuccess };
};
