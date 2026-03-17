import { refreshAccessToken } from "@/features/auth/api/auth-api"

class TokenService {
  private accessToken: string | null = null
  private refreshPromise: Promise<string> | null = null
  private isRefreshing = false

  setAccessToken(token: string | null) {
    this.accessToken = token
  }

  getAccessToken(): string | null {
    return this.accessToken
  }

  async refreshToken(): Promise<string> {
    if (this.isRefreshing && this.refreshPromise) {
      return this.refreshPromise
    }

    this.isRefreshing = true
    this.refreshPromise = this.performRefresh()

    try {
      const token = await this.refreshPromise
      this.setAccessToken(token)
      return token
    } finally {
      this.isRefreshing = false
      this.refreshPromise = null
    }
  }

  private async performRefresh(): Promise<string> {
    try {
      return await refreshAccessToken()
    } catch (error) {
      this.clearToken()
      throw error
    }
  }

  clearToken() {
    this.accessToken = null
  }

  hasValidToken(): boolean {
    return this.accessToken !== null
  }
}

export const tokenService = new TokenService()