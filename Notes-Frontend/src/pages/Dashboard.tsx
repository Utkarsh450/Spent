import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft, CreditCard, TrendingUp } from "lucide-react"
import Transactions from "../components/Transactions";
import Pie from "../components/Pie"
import { useContext } from "react";
import { ExpenseContextData } from "../Context/ExpenseContext";

const Dashboard = () => {
  const navigate = useNavigate()


  const { value } = useContext(ExpenseContextData)
  const top5Expenses = [...value.expenses]
  .sort((a, b) => b.amount - a.amount)
  .slice(0, 5);

    const totalBudget: number = Number(value.OverAllBudget);
const totalSpent: number = value.expenses.reduce(
  (acc, expense) => acc + expense.amount,
  0
  
);
  console.log("Growth Rate:",totalSpent*100/totalBudget);
  const Spent = totalSpent*100/totalBudget;

  return (
    <div className="w-full h-screen p-4 font-[satoshi] bg-zinc-100 overflow-auto">

      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/")}
          className="mobile-press w-10 h-10 flex items-center justify-center rounded-full
                     bg-zinc-200 hover:bg-zinc-300 active:scale-95 transition"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="font-semibold text-xl text-zinc-900">Dashboard</h1>
      </div>

        {/* Pie Chart */}
      {/* <Pie
        expenses={value.expenses.map(e => ({
          name: e.title,
          amount: e.amount,
        }))}
      /> */}

      <Pie
        expenses={[{totalBudget, totalSpent}]}
      />

      {/* Stats Cards */}
      <div className="w-full mt-8 grid grid-cols-3 gap-4">

        <div className="
    h-24 rounded-xl
    flex flex-col items-center justify-center
    gap-1
  ">
          <span className="text-xs text-zinc-500">Spent</span>
          <span className="text-lg font-semibold text-zinc-900">{Spent}%</span>
        </div>

        <div className="
    h-24 rounded-xl
    flex flex-col items-center justify-center
    gap-1
  ">
          <span className="text-xs text-zinc-500">Total Budget</span>
          <span className="text-lg font-semibold text-zinc-900">₹{totalBudget}</span>
        </div>

        <div className="
    h-24 rounded-xl
    flex flex-col items-center justify-center
    gap-1
  ">
          <span className="text-xs text-zinc-500">Expenses</span>
          <span className="text-lg font-semibold text-zinc-900">₹{totalSpent}</span>
        </div>

      </div>


      <div className="w-full mt-8 h-[0.1rem] bg-zinc-500"></div>
      <div className="flex items-center mx-auto w-fit  mt-10 gap-10">
        <div className="w-28 h-8 text-center p-2 rounded-full font-semibold flex items-center gap-2  active:scale-95 hover:bg-zinc-800 transition-all text-zinc-50 bg-zinc-900">
          <TrendingUp color="#47b139" />
          <Link to="/bar">Trends</Link>
        </div>
        <div className="w-38 h-8 text-center p-4 rounded-full font-semibold flex items-center gap-2  active:scale-95 hover:bg-zinc-800 transition-all text-zinc-50 bg-zinc-900">
          <CreditCard />
          <Link to="/categories">Categories</Link>
        </div>
      </div>

     <div className="w-full p-4 bg-zinc-300 mt-10 rounded-lg">
      <div className="flex justify-between">
         <div className="font-semibold text-lg">
    Recent Transactions
  </div>

  <Link to="/create-hisaab" className="w-22 h-fit p-2 rounded-full bg-[crimson] text-center active:scale-95 hover:bg-red-800 transition text-sm font-semibold text-zinc-50">
    +
  </Link>
      </div>
      
      <div className="mt-4 flex flex-col gap-3">
        { top5Expenses.map(elem => <Transactions title={elem.title} category={elem.category} amount={elem.amount} color={"bg-zinc-50"}/>)}
</div>

</div>

    </div>
  )
}

export default Dashboard
