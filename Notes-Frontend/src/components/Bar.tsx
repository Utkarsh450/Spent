import { BarChart } from "@mui/x-charts/BarChart"

interface MonthlyBarChartProps {
  expenses: {
    amount: number
    month: string
  }[]
}

const MONTHS = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December",
]

const MonthlyBarChart: React.FC<MonthlyBarChartProps> = ({ expenses }) => {
  const monthlyTotals = MONTHS.map((month) =>
    expenses
      .filter((e) => e.month === month)
      .reduce((sum, e) => sum + Number(e.amount), 0)
  )

  return (
    <div className="w-full h-65 rounded">
      <BarChart
        xAxis={[
          {
            scaleType: "band",
            data: MONTHS.map((m) => m.slice(0, 3)),
            tickLabelStyle: {
              fontSize: 12,
              fill: "#71717a",
            },
          },
        ]}
        series={[
          {
            data: monthlyTotals,
            label: "Expenses",
            color: "#6366f1", // indigo
          },
        ]}
        height={260}
        margin={{ top: 20, bottom: 30, left: 40, right: 10 }}
        grid={{ horizontal: true }}
      />
    </div>
  )
}

export default MonthlyBarChart
