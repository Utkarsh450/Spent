import { EyeOff, Lock, Share2 } from "lucide-react";
const Notes: React.FC = () => {
  return (
    <div className="px-8 py-10 font-[satoshi]">
      <div className="flex gap-5 items-center">
        <div className="flex gap-2 bg-sky-500 p-2 rounded items-center w-fit h-fit">
          <Lock width={18} color="white" />
          <div className="text-[0.9rem] w-fit h-5 rounded text-zinc-50">Encrypted</div>
        </div>
        <div className="w-8 h-fit p-2 rounded bg-zinc-200"><EyeOff width={18} /></div>
        <div className="flex gap-2"><Share2 />
          <h1 className="font-semibold">Share as a link</h1>
        </div>
        <div className="flex gap-4">
          <div className="w-fit h-fit p-2 text-zinc-50 font-semibold rounded bg-red-500">Delete</div>
          <div className="w-fit h-fit p-2 text-zinc-200 rounded font-semibold bg-yellow-600">Edit</div>
        </div>
      </div>
      <div className="font-semibold text-md mt-5 text-zinc-400">Created on 12-07-2025</div>
      <div className="mt-6 max-w-3xl">
        <div className="px-4 py-3 bg-zinc-50 rounded-md">
          <h2 className="text-2xl font-bold text-zinc-900 mb-1">My Notes title</h2>
          <p className="text-base text-zinc-600 leading-6">My notes Description</p>
        </div>
      </div>
    </div>
  )
}

export default Notes