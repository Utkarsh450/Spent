const Transactions = ({
    title,
    category,
    amount,
    color,
}: {
    title: string | undefined;
    category: string
    amount: number;
    color: string
}) => (
    <div className="w-full flex items-center justify-between p-4 rounded-xl bg-zinc-50">
        <div>
            <h1 className="text-sm font-semibold">{title}</h1>
            <p className="text-xs text-zinc-400">{category}</p>
        </div>
        <span className={`text-sm font-semibold ${color}`}>
            {amount}
        </span>
    </div>
)

export default Transactions;