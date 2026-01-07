import { House, ChartPie, BriefcaseBusiness, CreditCard, Notebook     } from "lucide-react"
import { NavLink } from "react-router-dom"

const Navbar = () => {
  return (
    <div className='w-full bg-zinc-50 flex items-center justify-around'>
      <NavLink to="/"><House className="w-full h-full hover:bg-blue-200 hover:text-sky-600 p-2 rounded-full" size={28}/></NavLink>
      <NavLink to="/charts"><ChartPie className="w-full h-full hover:bg-blue-200 hover:text-sky-600 p-2 rounded-full" size={28} /></NavLink>
      <NavLink to="/create-hisaab" className="clip-notch w-24 h-24 rounded-full bg-[crimson] active:scale-95 flex items-center justify-center text-zinc-50 shadow-md -translate-y-8"> <BriefcaseBusiness size={28} /></NavLink>
      <NavLink to="/transactions  "><CreditCard    className="w-full h-full hover:bg-blue-200 hover:text-sky-600 p-2 rounded-full" size={28} /></NavLink>
      <NavLink to="/Budgets"><Notebook className="w-full h-full rotate-90 hover:bg-blue-200 hover:text-sky-600 p-2 rounded-full" size={28} /></NavLink>
    </div>
  )
}

export default Navbar