import React, { useContext } from 'react'
import MonthlyAnalytics from '../components/Bar'
import { ExpenseContextData } from '../Context/ExpenseContext'

const Bar = () => {
    const { value } = useContext(ExpenseContextData)
  return (
    <div>
      <MonthlyAnalytics expenses={value.expenses}/>    </div>
  )
}

export default Bar