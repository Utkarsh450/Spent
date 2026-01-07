import { useContext } from "react"
import MonthlyAnalytics from "../components/Bar"
import { ExpenseContextData } from "../Context/ExpenseContext"
import CategoryCharts from "../components/CategoryCharts"
import { ChevronLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

const Bar = () => {
  const { value } = useContext(ExpenseContextData)
  let navigate = useNavigate();



  const chartData = value.expenses.map(e => ({
    name: e.title,
    amount: e.amount,
  }))

  const totalSpent = value.expenses.reduce(
    (sum, e) => sum + Number(e.amount),
    0
  )

  return (
    <div className="w-full min-h-screen bg-zinc-100 p-4 pb-24 font-[satoshi]">

      {/* Header */}
      <div className="mb-6">
        <div className="flex space-x-4 items-center">
          <div className="w-6 h-6 rounded-full font-semibold bg-zinc-50 text-zinc-900"> <ChevronLeft onClick={() => navigate("/charts")} /></div>
          <h1 className="text-2xl font-semibold text-zinc-900">
            Monthly Analytics
          </h1>
        </div>
        <p className="text-sm text-zinc-500 mt-1">
          Track your spending month by month
        </p>
      </div>

      {/* Summary Card */}
      <div className="mb-6 rounded-2xl bg-white p-4 shadow-sm">
        <p className="text-sm text-zinc-500">Total Spent</p>
        <p className="text-2xl font-semibold text-zinc-900 mt-1">
          ₹{totalSpent.toLocaleString()}
        </p>
      </div>

      {/* Chart Card */}
      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <p className="text-sm font-medium text-zinc-700 mb-3">
          Expenses Overview
        </p>

        <MonthlyAnalytics
          expenses={value.expenses.map((e) => ({
            amount: e.amount,
            month: e.time,
          }))}
        />
        <p className="font-semibold text-2xl mt-10">Categories</p>
        <CategoryCharts expenses={chartData} total={value.expenses} />
      </div>
    </div>
  )
}

export default Bar
