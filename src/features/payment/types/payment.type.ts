interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description?: string;
  image?: string;
  order_id: string;
  handler: (response: RazorpayPaymentResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color?: string;
  };
}

export interface RazorpayPaymentResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayErrorDetail {
  code: string;
  description: string;
  source: string;
  step: string;
  reason: string;
  metadata: {
    order_id: string;
    payment_id?: string;
  };
}

export interface RazorpayFailedResponse {
  error: RazorpayErrorDetail;
}

interface RazorpayInstance {
  open(): void;
  on(
    event: "payment.failed",
    callback: (response: RazorpayFailedResponse) => void,
  ): void;
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

export interface PaymentInput {
  amount: number;
  currency: string;
  receipt?: string;
  notes?: Record<string, string>;
}

export interface OrderResponse {
  status: number;
  message: string;
  order: Order;
}

export interface Order {
  amount: number;
  amount_due: number;
  amount_paid: number;
  attempts: number;
  created_at: number;
  currency: string;
  entity: string;
  id: string;
  notes: Record<string, string> | [];
  offer_id: string | null;
  receipt: string | null;
  status: string;
}

export interface PaymentVerificationInput {
  razorpay_order_id: string;
  razorpay_signature: string;
  razorpay_payment_id: string;
}
