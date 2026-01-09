import axios from "../utils/axiosConfig"
import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ExpenseContextData } from "../Context/ExpenseContext"
import { setAccessToken } from "../utils/tokenStore"

/* ---------------- Component ---------------- */

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const { setdata } = useContext(ExpenseContextData)
  const navigate = useNavigate()

  /* ---------------- Submit Handler ---------------- */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // ---- Basic validations (same as Register style) ----
    if (!email.trim() || !password.trim()) {
      return setError("Please fill all fields")
    }

    if (!email.includes("@")) {
      return setError("Please enter a valid email")
    }

    if (password.length < 6) {
      return setError("Password must be at least 6 characters")
    }

    
    try {
      setLoading(true)

      const response = await axios.post("/auth/login", {
        email: email.trim(),
        password,
      })      

      if (response.status === 200) {
        const { user } = response.data
        setAccessToken(response.data.accessToken)
        
        
        
        setdata(prev => ({
          ...prev,
          username: user?.username,
          email: user?.email,
        }))
        
        
        navigate("/")
      }
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Invalid email or password"
      )
    } finally {
      setLoading(false)
    }
  }

  /* ---------------- UI ---------------- */

  return (
    <div className="w-full h-screen flex items-center justify-center font-[satoshi]">
      <div className="flex flex-col gap-4 w-[320px]">

        <h1 className="font-semibold text-lg">Login your account</h1>

        {error && (
          <p className="text-red-500 text-sm bg-red-50 p-2 rounded">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 text-sm bg-zinc-100 rounded outline-none hover:bg-zinc-200"
            placeholder="Email"
            type="email"
          />

          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 text-sm bg-zinc-100 rounded outline-none hover:bg-zinc-200"
            placeholder="Password"
            type="password"
          />

          <button
            disabled={loading}
            className="w-full p-2 bg-sky-500 hover:bg-sky-600
                       text-white rounded disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-zinc-400">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="text-sky-500 hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
