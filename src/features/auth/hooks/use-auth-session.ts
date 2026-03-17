import { useGetCurrentUserQuery } from "@/features/auth/api/auth-api"
import type { AuthSessionState } from "@/features/auth/types"
import { getRtkQueryErrorMessage } from "@/shared/api/rtk-error"

export function useAuthSession(): AuthSessionState {
  const { data: user, isLoading, error } = useGetCurrentUserQuery()

  console.log(user)

  return {
    isLoading,
    isAuthenticated: Boolean(user),
    user: user ?? null,
    error: getRtkQueryErrorMessage(error),
  }
}
