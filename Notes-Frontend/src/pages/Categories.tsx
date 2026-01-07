import { useContext } from "react"
import CategoryCharts from "../components/CategoryCharts"
import { ExpenseContextData } from "../Context/ExpenseContext"
import { ChevronLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

const Categories = () => {
    const { value } = useContext(ExpenseContextData)
    const navigate = useNavigate();

    const chartData = value.expenses.map(e => ({
          name: e.title,
          amount: e.amount,
        }))       
  return (
    <div className="w-full h-screen p-5 font-[satoshi] bg-zinc-200">
         <div className="flex mt-5 gap-2">
        <div className="w-6 h-6 rounded-full font-semibold bg-zinc-50 text-zinc-900"> <ChevronLeft onClick={() => navigate("/charts")} /></div>

        <h1 className="text-xl font-semibold mb-6">Categories</h1>
      </div>
         <CategoryCharts expenses={chartData} total={value.expenses}/>
    </div>
  )
}

export default Categories