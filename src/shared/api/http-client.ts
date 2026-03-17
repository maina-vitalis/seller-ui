import axios from "axios"

import { apiClient } from "@/shared/api/axios-client"

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

export class ApiError extends Error {
  readonly status: number
  readonly payload: unknown

  constructor(message: string, status: number, payload: unknown) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.payload = payload
  }
}

type RequestOptions = {
  method?: HttpMethod
  body?: unknown
  signal?: AbortSignal
  headers?: Record<string, string>
}

export async function requestJson<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { method = "GET", body, signal, headers = {} } = options
  try {
    const response = await apiClient.request<T>({
      url: endpoint,
      method,
      data: body,
      signal,
      headers,
    })

    return response.data
  } catch (rawError) {
    if (axios.isAxiosError(rawError)) {
      const status = rawError.response?.status ?? 0
      const payload = rawError.response?.data ?? rawError.message

      throw new ApiError(
        resolveApiErrorMessage(status, payload),
        status,
        payload
      )
    }

    throw new ApiError("Request failed. Please try again.", 0, rawError)
  }
}

function resolveApiErrorMessage(status: number, payload: unknown): string {
  if (typeof payload === "object" && payload !== null && "message" in payload) {
    const message = (payload as { message?: unknown }).message
    if (typeof message === "string" && message.length > 0) {
      return message
    }
  }

  if (status === 401) {
    return "Your session has expired. Please login again."
  }

  if (status >= 500) {
    return "The server is unavailable. Please try again shortly."
  }

  return "Request failed. Please try again."
}
