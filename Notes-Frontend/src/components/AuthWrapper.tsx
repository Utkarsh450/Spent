import { useEffect, useState } from "react"
import { Navigate, useLocation } from "react-router-dom"
import api from "../utils/axiosConfig"

const AuthWrapper = ({ children }) => {
  const [status, setStatus] = useState<"loading" | "ok" | "fail">("loading")
  const location = useLocation()

  useEffect(() => {
    setStatus("loading")

    api.get("/auth/@me")
      .then(() => setStatus("ok"))
      .catch(() => setStatus("fail"))
  }, [location.pathname]) // 🔥 THIS IS THE KEY

  if (status === "loading") return <div>Checking auth...</div>
  if (status === "fail") return <Navigate to="/login" replace />

  return <>{children}</>
}

export default AuthWrapper
