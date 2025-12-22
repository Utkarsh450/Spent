import { Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/Register"
import CreateHisaab from "../pages/CreateHisaab"
import Dashboard from "../pages/Dashboard"
import Transaction from "../pages/Transaction"
import UserProfile from "../pages/UserProfile"
import Settings from "../pages/Settings"
import Budget from "../pages/Budget"
import Categories from "../pages/Categories"
import MonthlyAnalytics from "../pages/Barchart"
const MainRoutes: React.FC = () => {
  return (
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/charts" element={<Dashboard/>}/>
        <Route path="/create-hisaab" element={<CreateHisaab/>}/>
        <Route path="/transactions" element={<Transaction/>}/>
        
        <Route path="/user-profile" element={<CreateHisaab/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/user" element={<UserProfile/>}/>
        <Route path="/settings" element={<Settings/>}/>
        <Route path="/Budgets" element={<Budget/>}/>
        <Route path="/categories" element={<Categories/>}/>
        <Route path="/bar" element={<MonthlyAnalytics/>}/>
    </Routes>
  )
}

export default MainRoutes