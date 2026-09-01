import { apiClient } from "../../../lib/api-client";
import type { OrderResponse, PaymentInput } from "../types/payment.type";

export async function paymentorder(
  input: PaymentInput,
): Promise<OrderResponse> {
  const response = await apiClient.post<OrderResponse>("/order", input);

  return response.data;
}
