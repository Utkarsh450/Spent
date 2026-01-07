import { Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/Register"
import CreateHisaab from "../pages/CreateHisaab"
import Dashboard from "../pages/Dashboard"
import Transaction from "../pages/Transaction"
import UserProfile from "../pages/UserProfile"
import Budget from "../pages/Budget"
import Categories from "../pages/Categories"
import MonthlyAnalytics from "../pages/Barchart"
import AuthWrapper from "../components/AuthWrapper"
const MainRoutes: React.FC = () => {
  return (
    <Routes>
        <Route path="/" element={<AuthWrapper><Home/></AuthWrapper>}/>
        <Route path="/charts" element={<AuthWrapper><Dashboard/></AuthWrapper>}/>
        <Route path="/create-hisaab" element={<AuthWrapper><CreateHisaab/></AuthWrapper>}/>
        <Route path="/transactions" element={<AuthWrapper><Transaction/></AuthWrapper>}/>
        
        <Route path="/user-profile" element={<AuthWrapper><CreateHisaab/></AuthWrapper>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/user" element={<AuthWrapper><UserProfile/></AuthWrapper>}/>
        <Route path="/budgets" element={<AuthWrapper><Budget/></AuthWrapper>}/>
        <Route path="/categories" element={<AuthWrapper><Categories/></AuthWrapper>}/>
        <Route path="/bar" element={<AuthWrapper><MonthlyAnalytics/></AuthWrapper>}/>
    </Routes>
  )
}

export default MainRoutes