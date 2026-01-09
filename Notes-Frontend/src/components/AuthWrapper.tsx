import { useEffect, useState, type ReactNode } from "react"
import { Navigate } from "react-router-dom"
import api from "../utils/axiosConfig"

interface AuthWrapperProps {
  children: ReactNode
}

type AuthStatus = "checking" | "authenticated" | "unauthenticated"

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const [status, setStatus] = useState<AuthStatus>("checking")

  useEffect(() => {
    let isMounted = true

    api
      .get("/auth/@me")
      .then(() => {
        if (isMounted) setStatus("authenticated")
      })
      .catch(() => {
        if (isMounted) setStatus("unauthenticated")
      })

    return () => {
      isMounted = false
    }
  }, [])

  // 🔒 BLOCK UI until auth is decided
  if (status === "checking") {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-sm text-zinc-400">Checking authentication...</p>
      </div>
    )
  }

  if (status === "unauthenticated") {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export default AuthWrapper
