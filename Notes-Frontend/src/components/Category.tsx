/* Small reusable UI pieces */

const Category = ({
    bg,
    icon,
    label,
}: {
    bg: string
    icon: React.ReactNode
    label: string
}) => (
    <div className={`h-24 rounded-xl ${bg} flex items-center justify-center`}>
        <div className="flex flex-col items-center gap-1">
            <div className="bg-white p-2 rounded-full text-black">
                {icon}
            </div>
            <span className="text-sm font-semibold">{label}</span>
        </div>
    </div>
)

export default Category;