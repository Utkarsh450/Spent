import { ArrowLeft, Wallet } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { ExpenseContextData } from "../Context/ExpenseContext"

const Budget = () => {
  const navigate = useNavigate()
  const { value, setdata } = useContext(ExpenseContextData)

  const [amount, setAmount] = useState<string>("")

  const handleBudget = () => {
    if (!amount) return
    setdata(prev => ({
      ...prev,
      OverAllBudget: Number(amount),
    }))
    navigate("/charts")
  }

  return (
    <div className="w-full h-screen bg-zinc-100 font-[satoshi] flex flex-col">

      {/* Header */}
      <div className="flex items-center gap-3 p-4">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-zinc-200 flex items-center justify-center active:scale-95"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-semibold text-zinc-900">
          Monthly Budget
        </h1>
      </div>

      {/* Main content */}
      <div className="flex-1 px-4 flex flex-col gap-10">

        {/* Info block */}
        <div className="mt-4">
          <p className="text-3xl font-semibold text-zinc-900 leading-tight">
            Plan your <br /> monthly spending
          </p>
          <p className="text-sm text-zinc-500 mt-2">
            Setting a budget helps you stay in control of your expenses.
          </p>
        </div>

        {/* Current budget card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <Wallet className="text-green-600" />
            </div>
            <div>
              <p className="text-xs text-zinc-500">Current budget</p>
              <p className="text-xl font-semibold text-zinc-900">
                ₹{value.OverAllBudget || 0}
              </p>
            </div>
          </div>
        </div>

        {/* Input */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-zinc-600">
            Set new monthly budget
          </label>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            placeholder="Enter amount (₹)"
            className="
              w-full h-14 px-4
              rounded-xl bg-white
              text-lg font-semibold text-zinc-900
              outline-none border border-zinc-200
              focus:border-green-600
            "
          />
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="p-4">
        <button
          onClick={handleBudget}
          className="
            w-full h-14 rounded-full
            bg-green-700 text-green-100
            font-semibold text-lg
            active:scale-95 transition
            disabled:opacity-50
          "
          disabled={!amount}
        >
          Save Budget
        </button>
      </div>

    </div>
  )
}


export default Budget