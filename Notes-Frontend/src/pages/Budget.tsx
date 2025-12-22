import { ArrowLeft, Gauge, NotebookTabs  } from "lucide-react"
import { useNavigate } from 'react-router-dom'
import { ExpenseContextData } from '../Context/ExpenseContext';
import { useContext, useState } from "react";

const Budget = () => {
    const navigate = useNavigate();

    const { value, setdata } = useContext(ExpenseContextData)
    console.log(value.OverAllBudget);
    




    const [name, setname] = useState<string>("")
    
    const handleBudget = ()=>{
        setdata(prev => ({...prev, OverAllBudget: Number(name)}))
    }
  return (
    <div className='w-full h-screen p-4 font-[satoshi]'>
        
        
        
        
        <div className='flex items-center gap-4'>
            <div onClick={()=>navigate("/charts")} className='w-fit h-fit p-2 rounded-full bg-zinc-300 hover:bg-zinc-400'><ArrowLeft /></div>
            <div className='font-medium text-xl'>Budget Planner</div>
        </div>
        <div className='mt-10 flex items-center justify-between'>
            <div className='flex flex-col gap-2 justify-center'>
                <h2 className='font-semibold text-2xl'>Set monthly <br /> budget</h2>
                <h2 className='font-normal text-sm'>setting a budget reduces <br /> expenditures about 10% on <br /> average</h2>
            </div>
            <div className='text-2xl'>
                
                <Gauge  size={95} />
            </div>
        </div>
        
        
        <div className='flex mt-10 items-center justify-between'>
            <div className='flex items-center gap-4'>
                <div className='w-fit h-fit rounded-full p-2 bg-zinc-300 hover:bg-zinc-400'><NotebookTabs /></div>
                <div className='font-semibold text-lg'>Overall Budget</div>
            </div>
            <div>

                <input value={"₹"+name} onChange={(e)=>setname(e.target.value)} className={`w-22 h-10 p-2 text-zinc-900 outline-none rounded-lg bg-zinc-100 text-md font-semibold`} type="text" placeholder='₹' />
            </div>
        </div>
        <div>
            <button onClick={()=> handleBudget()} className='w-44 h-14 fixed bottom-0 left-0 translate-x-28 mb-3 p-2 font-semibold rounded-full bg-green-700 text-green-200 active:scale-95 hover:bg-green-800 text-xl'>Set Budget</button>
        </div>
    </div>
  )
}   










export default Budget