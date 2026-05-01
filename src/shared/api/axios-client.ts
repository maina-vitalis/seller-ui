/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from "axios"

import { apiConfig } from "@/shared/api/config"

export const apiClient = axios.create({
  baseURL: apiConfig.baseUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
})

//Response interceptor - Refreshing the tokens
let isRefreshing = false
const failedQueue: Array<{
  resolve: (token: any) => void
  reject: (reason?: any) => void
}> = []

const processingQueue = (token: string | null, error?: null | Error) => {
  failedQueue.forEach((item) => {
    if (error) {
      item.reject(error)
    } else {
      item.resolve(token)
    }
  })
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        //queue the request when the refreshing is still in progress
        return new Promise((resolve, reject) =>
          failedQueue.push({ resolve, reject })
        ).then(() => {
          return apiClient(originalRequest)
        })
      }

      isRefreshing = true
      originalRequest._retry = true

      try {
        await apiClient.post("/auth/refresh-token")
        processingQueue(null)
        return apiClient(originalRequest)
      } catch (error) {
        processingQueue(null, error as Error)

        return Promise.reject(error)
      } finally {
        isRefreshing = false
      }
    }
    return Promise.reject(error)
  }
)
