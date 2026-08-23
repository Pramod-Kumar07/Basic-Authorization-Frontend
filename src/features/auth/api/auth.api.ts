import { apiClient } from "../../../lib/api-client";
import { tokenStore } from "../token-store";
import type {
  RegisterInput,
  RegisterResponse,
  LoginInput,
  LoginResponse,
  LogoutResponse,
  UsersResponse,
  User,
} from "./auth.types";

export async function register(
  input: RegisterInput,
): Promise<RegisterResponse> {
  const response = await apiClient.post<RegisterResponse>(
    "/auth/register",
    input,
  );

  return response.data;
}

export async function login(input: LoginInput): Promise<LoginResponse> {
  const response = await apiClient.post<LoginResponse>("/auth/login", input);

  tokenStore.set(response.data.accessToken);

  return response.data;
}
export async function logout(): Promise<LogoutResponse> {
  const response = await apiClient.post<LogoutResponse>("/auth/logout");

  tokenStore.clear();

  return response.data;
}

export async function getUser(): Promise<User[]> {
  const response = await apiClient.get<UsersResponse>("/users");
  return response.data.users;
}
