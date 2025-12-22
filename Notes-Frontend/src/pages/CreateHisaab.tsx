import { useContext, useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { type LucideIcon } from "lucide-react";
type Category = {
  name: string;
  icon: LucideIcon;
  bg: string;
};
import {
  Coffee,
  Zap,
  Bus,
  ShoppingBag,
  Film,
  HeartPulse,
  Pizza,
  Smartphone,
  ChevronDown,
  ChevronLeft
} from "lucide-react"
import { ExpenseContextData } from "../Context/ExpenseContext"
import { nanoid } from "nanoid";

/* ---------------- Categories ---------------- */

const categories: Category[] = [
  { name: "Food", icon: Coffee, bg: "bg-yellow-500" },
  { name: "Electricity", icon: Zap, bg: "bg-sky-500" },
  { name: "Travel", icon: Bus, bg: "bg-emerald-500" },
  { name: "Shopping", icon: ShoppingBag, bg: "bg-pink-500" },
  { name: "Movies", icon: Film, bg: "bg-purple-500" },
  { name: "Health", icon: HeartPulse, bg: "bg-red-500" },
  { name: "Snacks", icon: Pizza, bg: "bg-orange-500" },
  { name: "Recharge", icon: Smartphone, bg: "bg-indigo-500" },
];

/* ---------------- Page ---------------- */

const CreateHisaab = () => {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const { setdata } = useContext(ExpenseContextData);

  const urlCategory = params.get("category")

  const [amount, setAmount] = useState("")
  const [note, setNote] = useState("")
  const [name, setname] = useState<string>("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [pickerOpen, setPickerOpen] = useState(false)
  /* pre-select category if coming from Home */
  useEffect(() => {
    function getCategory() {
      if (urlCategory) {
        setSelectedCategory(urlCategory)
      }
    }
    getCategory();
  }, [urlCategory])


  const current = categories.find(c => c.name === selectedCategory)
  const handleAddExpense = () => {
    // 🔹 save expense here (context / backend later)
    // stay on page, reset only fields that make sense
    // setdata(prev =>)    
    if (!selectedCategory) return;




    const obj1 = {
      id: nanoid(),
      category: selectedCategory,
      time:  new Date().toLocaleString("en-GB", {
        month: "long"
}),

      title: name,
      month:  new Date().toLocaleTimeString("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
}),

      amount: Number(amount),
      date: new Date().toLocaleDateString("en-GB", {
        day: "numeric", month: "short",
        year: "numeric",
      }),
      notes: note
    }

    setAmount("")
    setNote("")
    // normal user → go home
    setdata(prev => {
      return {
        ...prev,
        expenses: [...prev.expenses, obj1]
      }
    })
    // navigate(`/?category=${selectedCategory}`)
  }
  return (
    <div className="w-full min-h-screen bg-zinc-950 text-white font-[satoshi] p-4 pb-28">

      {/* Header */}
      <div className="flex mt-5 gap-2">
        <div className="w-6 h-6 rounded-full font-semibold bg-zinc-50 text-zinc-900"> <ChevronLeft onClick={() => navigate("/")} /></div>

        <h1 className="text-xl font-semibold mb-6">Add Expense</h1>
      </div>

      {/* Amount */}
      <input
        type="number"
        placeholder="₹ 0"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="
          w-full bg-transparent text-4xl font-semibold
          outline-none placeholder-zinc-600 mb-8
        "
      />

      {/* Category selector */}
      <div
        onClick={() => setPickerOpen(true)}
        className="
          w-full bg-zinc-900 rounded-2xl p-4 mb-6
          flex items-center justify-between
          active:bg-zinc-800 transition
        "
      >
        <span className="text-sm text-zinc-400">Category</span>

        {current ? (
          <div className="flex ml-32 items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full ${current.bg} flex items-center justify-center text-black`}
            >
              <current.icon size={16} />
            </div>
            <span className="font-semibold">{current.name}</span>
          </div>
        ) : (
          <span className="text-zinc-500">Select</span>
        )}

        <ChevronDown size={18} className="text-zinc-400" />
      </div>
      {/* Expense name / note */}
      <input
      required
        type="text"
        placeholder="What was this expense for? (optional)"
        value={name}
        onChange={(e) => setname(e.target.value)}
        className="
    w-full bg-zinc-900 rounded-2xl p-4 mb-6
    outline-none text-sm
    placeholder-zinc-500
  "
      />


      {/* Note */}
      <textarea
        placeholder="Note (optional)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="
          w-full h-20 bg-zinc-900 rounded-2xl p-4
          outline-none resize-none placeholder-zinc-500 mb-6
        "
      />

      {/* Add more toggle */}
      {/* CTA */}
      <button
        onClick={handleAddExpense}
        disabled={!amount || !selectedCategory}
        className={`
          fixed bottom-5 left-1/2 -translate-x-1/2
          w-[92%] h-14 rounded-2xl text-lg font-semibold
          transition
          ${amount && selectedCategory
            ? "bg-blue-500 active:scale-95"
            : "bg-zinc-700 text-zinc-400"
          }
        `}
      >
        Add Expense
      </button>

      {/* Category picker (bottom sheet) */}
      {pickerOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end">
          <div className="w-full bg-zinc-900 rounded-t-3xl p-5">
            <h2 className="text-lg font-semibold mb-4">Select Category</h2>

            <div className="grid grid-cols-4 gap-4">
              {categories.map(cat => (
                <div
                  key={cat.name}
                  onClick={() => {
                    setSelectedCategory(cat.name)
                    setPickerOpen(false)
                  }}
                  className={`
                    h-16 rounded-xl ${cat.bg}
                    flex items-center justify-center
                    active:scale-95
                    ${selectedCategory === cat.name ? "ring-2 ring-white" : ""}
                  `}
                >
                  <div className="bg-white p-2 rounded-full text-black">
                    <cat.icon size={16} />
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setPickerOpen(false)}
              className="w-full mt-6 text-sm text-zinc-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )

}

export default CreateHisaab
