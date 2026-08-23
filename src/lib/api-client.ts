import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { tokenStore } from "../features/auth/token-store";

type RefreshResponse = {
  accessToken: string;
};

export type ApiErrorResponse = {
  message?: string;
  eroror?: string;
  errors?: { message: string }[];
};

type RetryRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

const baseUrl = import.meta.env.VITE_API_URL;

export const apiClient = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const refreshClient = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = tokenStore.get();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

let refreshPromise: Promise<string> | null = null;

async function refreshAccessToken(): Promise<string> {
  if (!refreshPromise) {
    refreshPromise = refreshClient
      .post<RefreshResponse>("/auth/refresh")
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

function normalizeErrorMessage(error: AxiosError<ApiErrorResponse>): string {
  if (error.response) {
    const data = error.response.data;
    return (
      data?.message ||
      data?.eroror ||
      data?.errors?.[0]?.message ||
      error.response?.statusText ||
      "Something went wrong!"
    );
  }
  if (error.request) {
    return "Network error.";
  }
  return error?.message || "Something went wrong!";
}

apiClient.interceptors.response.use(
  (res) => res,
  async (error: AxiosError<ApiErrorResponse>) => {
    const request = error.config as RetryRequestConfig | undefined;
    const status = error.response?.status;
    const isAuthRequest =
      request?.url === "/auth/login" ||
      request?.url === "/auth/register" ||
      request?.url === "/auth/refresh";

    if (status !== 401 || !request || request?._retry || isAuthRequest) {
      error.message = normalizeErrorMessage(error);
      return Promise.reject(error);
    }
    request._retry = true;

    try {
      await refreshAccessToken();
      return apiClient(request);
    } catch (error) {
      tokenStore.clear();
      const err = error as AxiosError<ApiErrorResponse>;
      err.message =
        status === 401
          ? "Session expired. Please log in again."
          : normalizeErrorMessage(err);

      return Promise.reject(err);
    }
  },
);
