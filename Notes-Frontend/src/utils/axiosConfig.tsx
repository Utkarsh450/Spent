import axios from "axios";
const instance = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
})


let isRefreshing = false
let failedQueue: any[] = []

const processQueue = (error: any) => {
  failedQueue.forEach(prom => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    error ? prom.reject(error) : prom.resolve()
  })
  failedQueue = []
}

instance.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        }).then(() => instance(originalRequest))
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        await instance.get("/auth/refresh") // 🔥 ROTATION HAPPENS HERE
        processQueue(null)
        return instance(originalRequest)
      } catch (err) {
        processQueue(err)
        window.location.href = "/login"
        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)
export default instance;