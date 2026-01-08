import axios from "axios"
import { getAccessToken, setAccessToken } from "./tokenStore"

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true
})

api.interceptors.request.use((config) => {
  console.log("➡️ Request interceptor called", config.url)

  const token = getAccessToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config

    if (
      error.response?.status === 401 &&
      !(originalRequest as any)._retry
    ) {
      (originalRequest as any)._retry = true

      try {
        console.log("🔄 Calling refresh API")

        const res = await axios.post(
          "http://localhost:3000/api/auth/refresh",
            {},                        
          { withCredentials: true }
        )

        console.log("✅ New access token received", res.data.accessToken)

        setAccessToken(res.data.accessToken)

        originalRequest.headers.Authorization =
          `Bearer ${res.data.accessToken}`

        console.log("🔁 Retrying original request")

        return api(originalRequest)
      } catch (err) {
        console.log("❌ Refresh failed → logout", err)
      }
    }

    return Promise.reject(error)
  }
)

export default api
