import { apiClient } from "../../../lib/api-client";
import type {
  OrderResponse,
  PaymentInput,
  PaymentVerificationInput,
} from "../types/payment.type";

export async function paymentorder(
  input: PaymentInput,
): Promise<OrderResponse> {
  const response = await apiClient.post<OrderResponse>("/order", input);

  return response.data;
}
export async function paymentVerification(
  input: PaymentVerificationInput,
): Promise<Omit<OrderResponse, "order">> {
  const response = await apiClient.post<Omit<OrderResponse, "order">>(
    "/verifypayment",
    input,
  );

  return response.data;
}
