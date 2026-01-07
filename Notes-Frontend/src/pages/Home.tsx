import {
  Coffee, Zap, Bus, ShoppingBag, Film,
  HeartPulse, Pizza, Smartphone,
} from "lucide-react"
import { NavLink } from "react-router-dom"
import Category from "../components/Category"
import { useContext } from "react"
import { ExpenseContextData } from "../Context/ExpenseContext"

const Home: React.FC = () => {
  const {value } = useContext(ExpenseContextData)
  const spent = value.expenses[value.expenses.length - 1]?.amount.toFixed(2)  
  const totalBudget = Number(value.OverAllBudget).toFixed(2)  

  // value.expenses.
  
  return (
    <div className="w-full min-h-screen bg-zinc-950 text-white font-[satoshi] p-4">

      {/* Header */}
      <div className="mb-4">
        <h1 className="text-xl font-semibold">Hello Utkarsh Barnwal</h1>
        <p className="text-xs text-zinc-400">GOOD MORNING</p>
      </div>

      {/* Balance */}
      <div className="h-40 bg-blue-500 rounded-2xl p-5 mb-6 flex flex-col justify-around">
        <div>
          <p className="text-xs text-blue-100">Your available balance</p>
          <h1 className="text-3xl font-semibold">₹{(totalBudget)}</h1>
        </div>
        <div className="flex gap-3">
          
          <span>₹{ spent ? spent : Number("0").toFixed(2)}</span>
          <span className="bg-white text-zinc-900 text-xs px-3 py-1 rounded-full">
            +10%
          </span>
        </div>
      </div>

      {/* Categories */}
      <h2 className="text-lg font-semibold mb-3">Categories</h2>

      <div className="grid grid-cols-2  gap-4">
        <NavLink to="/create-hisaab?category=Food">
          <Category bg="bg-yellow-500" icon={<Coffee />} label="Food" />
        </NavLink>

        <NavLink to="/create-hisaab?category=Electricity">
          <Category bg="bg-sky-500" icon={<Zap />} label="Electricity" />
        </NavLink>

        <NavLink to="/create-hisaab?category=Travel">
          <Category bg="bg-emerald-500" icon={<Bus />} label="Travel" />
        </NavLink>

        <NavLink to="/create-hisaab?category=Shopping">
          <Category bg="bg-pink-500" icon={<ShoppingBag />} label="Shopping" />
        </NavLink>

        <NavLink to="/create-hisaab?category=Movies">
          <Category bg="bg-purple-500" icon={<Film />} label="Movies" />
        </NavLink>

        <NavLink to="/create-hisaab?category=Health">
          <Category bg="bg-red-500" icon={<HeartPulse />} label="Health" />
        </NavLink>

        <NavLink to="/create-hisaab?category=Snacks">
          <Category bg="bg-orange-500" icon={<Pizza />} label="Snacks" />
        </NavLink>

        <NavLink to="/create-hisaab?category=Recharge">
          <Category bg="bg-indigo-500" icon={<Smartphone />} label="Recharge" />
        </NavLink>
      </div>
    </div>
  )
}

export default Home
