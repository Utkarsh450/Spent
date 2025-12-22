import { createContext, useEffect, useState } from "react";
interface ExpenseContextProps {
  children: React.ReactNode;
}


interface ExpenseData {
  title: string;
  id: string;
  time:string;
  category: string;
  amount: number;
  date: string;
  month: string;
  notes?: string;
}

interface ExpenseContextType {
  TotalBalance: number;
  OverAllBudget: number;
  expenses: ExpenseData[];
}

interface ExpenseContextDataType {
  value: ExpenseContextType;
  setdata: React.Dispatch<React.SetStateAction<ExpenseContextType>>;
}

// Default value is required
export const ExpenseContextData = createContext<ExpenseContextDataType>({
  value: { TotalBalance: 0, OverAllBudget:0, expenses: [] },
  setdata: ()=>{}
});

const ExpenseContext: React.FC<ExpenseContextProps> = ({ children }) => {
  const [data, setdata] = useState<ExpenseContextType>(() => {
    const storedData = localStorage.getItem("expenseData");
    return storedData ? (JSON.parse(storedData) as ExpenseContextType) : {TotalBalance: 0, OverAllBudget:0, expenses: [] };
  });

  useEffect(() => {
    localStorage.setItem("expenseData", JSON.stringify(data));
  }, [data]);

  return (
    // 👇 EXACTLY the format you want: value={{ ... }}
    <ExpenseContextData.Provider value={{ value: data, setdata }}>
      {children}
    </ExpenseContextData.Provider>
  );
};

export default ExpenseContext;
