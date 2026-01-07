import { BellRing, UserRound } from "lucide-react"
import { NavLink } from "react-router-dom"

const Navbar2: React.FC = () => {
  return (
    <div className="w-full p-3 flex items-center justify-between bg-zinc-950 font-[satoshi]">

      {/* USER */}
      <NavLink to="/user" className="p-2 rounded-full bg-zinc-50">
        <UserRound color="black" />
      </NavLink>

      {/* NOTIFICATION */}
      <NavLink to="/notifications" className="relative">
        <BellRing color="white" />

        {/* RED DOT */}
        <div className="absolute top-0 right-0.5 w-2 h-2 rounded-full 
                        bg-red-500 shadow-[0_0_12px_crimson]" />
      </NavLink>

    </div>
  )
}

export default Navbar2
