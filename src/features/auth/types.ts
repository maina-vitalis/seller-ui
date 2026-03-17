export type UserProfile = {
  id: string
  email: string
  name: string
  role: "BUYER" | "VENDOR" | "ADMIN"
}

export type AuthSessionState = {
  isLoading: boolean
  isAuthenticated: boolean
  user: UserProfile | null
  error: string | null
}
