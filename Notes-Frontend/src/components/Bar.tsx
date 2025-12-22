import { BarChart } from "@mui/x-charts/BarChart";

interface MonthlyBarChartProps {
  expenses: {
    amount: number;
    month: string;
  }[];
}

const MONTHS = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December",
];

const MonthlyBarChart: React.FC<MonthlyBarChartProps> = ({ expenses }) => {
  // aggregate expenses month-wise
  const monthlyTotals = MONTHS.map((month) => {
    const total = expenses
      .filter((e) => e.month === month)
      .reduce((sum, e) => sum + Number(e.amount), 0);

    return total;
  });

  return (
    <div className="w-full h-80">
      <BarChart
        xAxis={[
          {
            scaleType: "band",
            data: MONTHS.map((m) => m.slice(0, 3)), // Jan, Feb...
          },
        ]}
        series={[
          {
            data: monthlyTotals,
            label: "Expenses",
          },
        ]}
        height={300}
        margin={{ top: 20, bottom: 40, left: 50, right: 20 }}
      />
    </div>
  );
};

export default MonthlyBarChart;
