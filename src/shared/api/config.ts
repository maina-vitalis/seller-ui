const DEFAULT_API_BASE_URL = "http://localhost:3000/api"
const DEFAULT_CUSTOMER_AUTH_URL = "http://localhost:5173/auth"

export const apiConfig = {
  baseUrl: import.meta.env.VITE_API_BASE_URL ?? DEFAULT_API_BASE_URL,
  customerAuthUrl:
    import.meta.env.VITE_CUSTOMER_AUTH_URL ?? DEFAULT_CUSTOMER_AUTH_URL,
}
