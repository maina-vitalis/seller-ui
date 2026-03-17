import axios from "axios"

import { apiConfig } from "@/shared/api/config"

export const apiClient = axios.create({
  baseURL: apiConfig.baseUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
})
