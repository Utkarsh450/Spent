import { useLocation } from "react-router-dom"
import Navbar from "./components/Navbar"
import MainRoutes from "./routes/MainRoutes"
import Navbar2 from "./components/Navbar2"
import { useEffect, useState } from "react"
import Pikachuloader from "./components/Pikachuloader"

const App = () => {
  const [loaded, setLoaded] = useState(false)
  const location = useLocation()

  useEffect(() => {
    // 👇 minimum boot loader time (UX friendly)
    const timer = setTimeout(() => {
      setLoaded(true)
    }, 3000) // 1.2s — adjust if needed

    return () => clearTimeout(timer)
  }, [])

  if (!loaded) {
    return <Pikachuloader />   // 🔥 ONLY FIRST LOAD
  }

  return (
    <div className="w-screen h-screen">
      
      {(location.pathname === "/" ||
        location.pathname === "/charts" ||
        location.pathname === "/transactions" ||
        location.pathname === "/budget") && (
        <Navbar2 />
      )}

      <MainRoutes />

      {(location.pathname === "/charts" ||
        location.pathname === "/notification" ||
        location.pathname === "/user" ||
        location.pathname === "/" ||
        location.pathname === "/transactions" ||
        location.pathname === "/categories" ||
        location.pathname === "/bar") && (
        <Navbar />
      )}

    </div>
  )
}

export default App
