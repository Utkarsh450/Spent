import Stack from "@mui/material/Stack";
import { PieChart } from "@mui/x-charts/PieChart";

interface PieProps {
  expenses: { totalBudget: number; totalSpent: number }[];
}

const COLORS = ["#FF6B6B", "#2ECC71"]; // spent / remaining

const CategoryCharts: React.FC<PieProps> = ({ expenses }) => {
  // assume single budget object (most common case)
  const totalBudget = expenses.reduce((s, e) => s + e.totalBudget, 0);
  const totalSpent = expenses.reduce((s, e) => s + e.totalSpent, 0);

  const remaining = Math.max(totalBudget - totalSpent, 0);

  const data = [
    {
      label: "Spent",
      value: totalSpent,
      color: COLORS[0],
    },
    {
      label: "Remaining",
      value: remaining,
      color: COLORS[1],
    },
  ];  

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      className="relative"
    >
      <PieChart
        width={180}
        height={180}
        margin={{ top: 10, bottom: 10, left: 10, right: 10 }}
        series={[
          {
            data,
            innerRadius: 60,
            outerRadius: 85,
            paddingAngle: 2,
            cornerRadius: 8,
          },
        ]}
        slotProps={{ legend: { hidden: true } }}
      />

      {/* Center Text */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-none">
        <p className="text-[11px] text-zinc-500">Spent</p>
        <p className="text-lg font-semibold text-zinc-900">
          ₹{totalSpent}
        </p>
        <p className="text-[10px] text-zinc-400">
          of ₹{totalBudget}
        </p>
      </div>
    </Stack>
  );
};

export default CategoryCharts;
