export interface BudgetData {
  category: string;
  totalBudget: number;
  spent: number;
  ExpenseId: string,
  month: string;
  CreatedAt: string;
  items: ExpenseData[];
}

export interface ExpenseData {
  id: string;
  category: string;
  title?: string;
  amount: number;
  date: string;
  notes?: string;
}