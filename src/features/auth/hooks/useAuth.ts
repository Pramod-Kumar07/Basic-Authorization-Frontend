import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser, logout } from "../api/auth.api";
import { useNavigate } from "react-router";

export const userQueryKey = ["auth", "user"] as const;
export function useUser() {
  return useQuery({
    queryFn: getUser,
    queryKey: userQueryKey,
    retry: false,
    staleTime: 5 * 60 * 60,
  });
}

// features/auth/hooks/useAuth.ts
export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logout,
    onSettled: () => {
      queryClient.removeQueries({ queryKey: userQueryKey });
      navigate("/login", { replace: true });
    },
  });
}
