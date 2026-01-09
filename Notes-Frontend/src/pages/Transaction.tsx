import { Search } from 'lucide-react'
import { useContext, useEffect, useMemo, useState } from 'react'
import {
    Coffee, Zap, Bus, ShoppingBag, Film,
    HeartPulse, Pizza, Smartphone,
} from "lucide-react"
import { ExpenseContextData } from '../Context/ExpenseContext'
import api from '../utils/axiosConfig'
const Transaction = () => {

    const icons = [{
        icon: <Coffee />,
        category: "Food",
        color: "bg-orange-600"
    },
    {
        icon: <Bus />,
        category: "Travel",
        color: "bg-green-600"

    },
    {
        icon: <Film />,
        category: "Food",
        color: "bg-yellow-600"
    },
    {
        icon: <Zap />,
        category: "Electricity",
        color: "bg-sky-600"
    },
    {
        icon: <ShoppingBag />,
        category: "Shopping",
        color: "bg-indigo-600"
    },
    {
        icon: <HeartPulse />,
        category: "Health",
        color: "bg-orange-600"
    },
    {
        icon: <Smartphone />,

        category: "Recharge",
        color: "bg-red-600"
    }, {
        icon: <Pizza />,
        category: "Snacks",
        color: "bg-red-600"
    }]

    function iconFInder(category: string) {
        const iconCategory = icons.find(elem => elem.category === category)
        return {
            category: iconCategory?.icon,
            color: iconCategory?.color
        };
    }
    const { value } = useContext(ExpenseContextData);
    const [query, setquery] = useState<string>("")


    const filtered = useMemo(() => {
        const q = query.toLowerCase();

        return value.expenses.filter((elem) => {
            return (elem.title.toLowerCase().includes(q) || elem.amount.toString() === q || elem.category.toLowerCase().includes(q) || elem.date.toLowerCase().includes(q.toLowerCase()))

        })
    }, [query, value.expenses])

    const [page, setpage] = useState<number>(1)

    useEffect(()=>{
        async function getProducts(){
              const response = await api.get("/products", { params: {
            search: query,
            page: page,
            limit: 10
        }})
        console.log(response);
        
        }
        getProducts();
    }, [query, page])
    return (



        <div className='w-full h-screen font-[satoshi] bg-zinc-950 text-zinc-50 overflow-auto'>
            <div className='p-5'>
                <h1 className='font-semibold text-2xl'>Transactions</h1>
                <h1 className='font-semibold text-sm text-zinc-400 mt-10'>Your transactions</h1>
                <div className='w-full shadow-md border-zinc-200 h-16 rounded-lg flex items-center p-4 gap-2'>
                    <Search />
                    <input value={query} onChange={(e) => setquery(e.target.value)} className='rounded-lg w-fit p-2 outline-none' type="text" placeholder='Search Transactions' />

                </div>
            </div>
            {filtered.map(item => {
                return (
                    <>
                        <div key={item.id} className='mt-4'>
                            <div className='w-full flex justify-between p-6'>
                                <div className='flex gap-2'>
                                    <div className={`w-10 h-10 rounded-full ${iconFInder(item.category).color} flex items-center justify-center`}>{iconFInder(item.category).category}</div>
                                    <div className='ml-4'>
                                        <div className='font-semibold text-xl'>{item.title}</div>


                                        <div className='flex gap-4 items-center'>
                                            <div className='font-medium text-zinc-400 text-sm'>{item.date}</div>
                                            <div className='font-medium text-zinc-400 text-sm'>{item.month}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='text-orange-500 text-lg font-semibold'>₹{item.amount}</div>
                            </div>
                        </div>

                    </>
                )
            })}


        </div>
    )
}

export default Transaction