import type { SerializedError } from "@reduxjs/toolkit"

type QueryError = {
  status: number | string
  data?: unknown
}

export function getRtkQueryErrorMessage(
  error: QueryError | SerializedError | undefined
): string | null {
  if (!error) {
    return null
  }

  if ("status" in error) {
    const payload = error.data

    if (
      typeof payload === "object" &&
      payload !== null &&
      "message" in payload
    ) {
      const message = (payload as { message?: unknown }).message
      if (typeof message === "string" && message.length > 0) {
        return message
      }
    }

    if (error.status === 401) {
      return "Your session has expired. Please login again."
    }

    if (typeof error.status === "number" && error.status >= 500) {
      return "The server is unavailable. Please try again shortly."
    }

    if (error.status === "FETCH_ERROR" || error.status === "AXIOS_ERROR") {
      return "Unable to reach server. Check your network connection."
    }

    return "Request failed. Please try again."
  }

  if (error.message) {
    return error.message
  }

  return "Request failed. Please try again."
}
