import { useLocation } from "react-router-dom"
import Navbar from "./components/Navbar"
import MainRoutes from "./routes/MainRoutes"
const App = () => {
  const location = useLocation()

  console.log(location.pathname);
  
  return (
    <div className="w-screen h-screen">
      <MainRoutes/>
      { (location.pathname === "/charts" || location.pathname === "/notification" || location.pathname === "/user" || location.pathname === "/" || location.pathname === "/transactions" || location.pathname === "/categories") && <>
      <Navbar/>
      </>}
    </div>
  
)
}





export default App