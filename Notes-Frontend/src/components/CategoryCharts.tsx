import { PieChart } from "@mui/x-charts/PieChart";
import Transactions from "./Transactions";

interface CategoryProps {
  expenses: { name: string; amount: number }[];
  total: { title: string, category: string, amount: number, id:string, month: string}[]
}

const COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#FFD93D",
  "#6A5ACD",
  "#FFA500",
  "#1E90FF",
  "#2ECC71",
  "#FF7F50",
];

const CategoryCharts: React.FC<CategoryProps> = ({ expenses, total }) => {
  const data = expenses.map((item, index) => ({
    label: item.name,
    value: item.amount,
    color: COLORS[index % COLORS.length],
  }));
  
        
  const top5Expenses = [...total]
  .sort((a, b) => b.amount - a.amount)
  .slice(0, 5); 

  const totalAmount = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="flex flex-col overflow-auto w-full">

      {/* LEFT → PIE (top-left) */}
      <div className="flex overflow-visible items-start gap-4 w-full">
        <div className="relative shrink-0">
        <PieChart
          width={220}
          height={220}
            margin={{ top: 20, bottom: 20, left: 0, right: 20 }} // ✅ THIS IS THE FIX
          
            series={[
            {
              data,
              innerRadius: 60,
              outerRadius: 90,
              paddingAngle: 2,
              cornerRadius: 6,
            },
          ]}
          slotProps={{
            legend: { hidden: true }, // ❌ disable built-in legend
          }}
        />

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-[11px] text-zinc-500">Total Spent</p>
          <p className="text-lg font-semibold text-zinc-900">
            ₹{totalAmount}
          </p>
        </div>
      </div>

      {/* RIGHT → LEGEND (top-right) */}
      <div className="flex flex-col gap-3 mt-8">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-zinc-700">
              {item.label}
            </span>
          </div>
        )).slice(0,5)}
      </div>
      </div>
      <div className="mt-4 flex flex-col gap-3">
        { top5Expenses.map(elem => <Transactions title={elem.title} category={elem.category} amount={elem.amount} color={"bg-zinc-50"}/>)}
</div>

    </div>
  );
};

export default CategoryCharts;
