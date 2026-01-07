import React, { useContext, type ReactNode } from 'react'
import { ExpenseContextData } from '../Context/ExpenseContext'
import { Navigate } from 'react-router-dom'

interface AuthWrapperProps{
    children: ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
    const { value } = useContext(ExpenseContextData)
    
    
    
  return value.username ? <>{children}</> : <Navigate to="/login" />
;
}

export default AuthWrapper