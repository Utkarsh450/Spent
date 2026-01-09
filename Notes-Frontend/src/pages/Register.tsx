import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ExpenseContextData } from "../Context/ExpenseContext"
import { setAccessToken } from "../utils/tokenStore"
import api from "../utils/axiosConfig"

/* ---------------- Validation Helpers ---------------- */

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

const isValidPhone = (phone: string) =>
  /^[0-9]{10,12}$/.test(phone)

const isValidPassword = (password: string) =>
  /^(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/.test(password)

/* ---------------- Component ---------------- */

const Register = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [telephone, setTelephone] = useState("")

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const { setdata } = useContext(ExpenseContextData)
  const navigate = useNavigate()

  /* ---------------- Submit Handler ---------------- */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // ---- First Name ----
    if (firstName.trim().length < 2) {
      return setError("First name must be at least 2 characters")
    }

    // ---- Last Name ----
    if (lastName.trim().length < 2) {
      return setError("Last name must be at least 2 characters")
    }

    // ---- Email ----
    if (!isValidEmail(email)) {
      return setError("Please enter a valid email address")
    }

    // ---- Phone ----
    if (!isValidPhone(telephone)) {
      return setError("Phone number must be 10–12 digits")
    }

    // ---- Password ----
    if (!isValidPassword(password)) {
      return setError(
        "Password must be 8+ chars and include a number & special character"
      )
    }

    const payload = {
      fullName: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      },
      email: email.trim(),
      password,
      PhoneNumber: telephone,
    }

    try {
      setLoading(true)
      const response = await api.post("/auth/register", payload)

      if (response.status === 201) {
        setAccessToken(response.data.accessToken)
        setdata(prev => ({
          ...prev,
          username: `${firstName} ${lastName}`,
          email,
        }))

        // Reset form
        setFirstName("")
        setLastName("")
        setEmail("")
        setPassword("")
        setTelephone("")

        navigate("/")
      }
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Registration failed. Please try again."
      )
    } finally {
      setLoading(false)
    }
  }

  /* ---------------- UI ---------------- */

  return (
    <div className="w-full h-screen flex items-center justify-center font-[satoshi]">
      <div className="flex flex-col gap-4 w-[320px]">

        <h1 className="font-semibold text-lg">Create your account</h1>

        {error && (
          <p className="text-red-500 text-sm bg-red-50 p-2 rounded">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex gap-3">
            <input
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="grow p-2 md:p-3 text-sm md:text-md bg-zinc-100 rounded outline-none hover:bg-zinc-200"
              placeholder="First name"
              type="text"
            />

            <input
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="grow p-2 md:p-3 text-sm md:text-md bg-zinc-100 rounded outline-none hover:bg-zinc-200"
              placeholder="Last name"
              type="text"
            />
          </div>

          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 md:p-3 text-sm md:text-md bg-zinc-100 rounded outline-none hover:bg-zinc-200"
            placeholder="Email"
            type="email"
          />

          <input
            required
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            className="p-2 md:p-3 text-sm md:text-md bg-zinc-100 rounded outline-none hover:bg-zinc-200"
            placeholder="Phone number"
            type="tel"
            inputMode="numeric"
          />

          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 md:p-3 text-sm md:text-md bg-zinc-100 rounded outline-none hover:bg-zinc-200"
            placeholder="Password"
            type="password"
          />

          <button
            disabled={loading}
            className="p-2 md:p-3 bg-sky-500 hover:bg-sky-600
                       text-white rounded disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </form>

        <p className="text-sm text-zinc-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-sky-500 hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
