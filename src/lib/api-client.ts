import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { tokenStore } from "../features/auth/token-store";

type RefreshResponse = {
  accessToken: string;
};

type RetryRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

const baseUrl = import.meta.env.VITE_API_URL;

export const apiClient = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

const refreshClient = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const accessToken = tokenStore.get();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

let refreshPromise: Promise<string> | null = null;

async function refreshAccessToken(): Promise<string> {
  if (!refreshPromise) {
    refreshPromise = refreshClient
      .post<RefreshResponse>("/refresh")
      .then((res) => {
        tokenStore.set(res.data.accessToken);
        return res.data.accessToken;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

apiClient.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const request = error.config as RetryRequestConfig | undefined;
    const status = error.response?.status;
    const isAuthRequest =
      request?.url === "/auth/login" ||
      request?.url === "/auth/register" ||
      request?.url === "/auth/refresh";

    if (status !== 401 || !request || request?._retry || isAuthRequest) {
      return Promise.reject(error);
    }
    request._retry = true;

    try {
      await refreshAccessToken();
      return apiClient(request);
    } catch {
      tokenStore.clear();
      return Promise.reject(error);
    }
  },
);
