import type { UserProfile } from "@/features/auth/types"
import { requestJson } from "@/shared/api/http-client"
import { baseApi } from "@/shared/api/base-api"

type CurrentUserResponse = {
  user: UserProfile
}

type RefreshAccessTokenResponse = {
  accessToken: string
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.query<UserProfile, void>({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      // transformResponse: (response: CurrentUserResponse) => response.user,
      providesTags: ["Auth"],
    }),

    logout: builder.mutation<null, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth", "SellerOverview"],
    }),
  }),
})

export const { useGetCurrentUserQuery, useLogoutMutation } = authApi

export async function fetchCurrentUser(
  signal?: AbortSignal
): Promise<UserProfile> {
  const data = await requestJson<CurrentUserResponse>("/auth/me", {
    method: "GET",
    signal,
  })

  return data.user
}

export async function logout(signal?: AbortSignal): Promise<null> {
  return requestJson<null>("/auth/logout", {
    method: "POST",
    signal,
  })
}

export async function refreshAccessToken(
  signal?: AbortSignal
): Promise<string> {
  const response = await requestJson<RefreshAccessTokenResponse>(
    "/auth/refresh",
    {
      method: "POST",
      signal,
    }
  )

  return response.accessToken
}
