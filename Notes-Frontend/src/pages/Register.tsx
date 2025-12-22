import { Link } from "react-router-dom"

const Register = () => {
  return (
    <div className="flex items-center justify-center font-[satoshi] mt-22">
            <div className="flex flex-col gap-4">
                <h1 className="font-semibold text-lg">Create your account</h1>
                <form className="flex flex-col gap-4">
                    <div className="flex gap-4">
                        <input className="w-fit grow h-fit text-zinc-500 text-sm p-2 md:text-md md:p-3 hover:bg-zinc-200 outline-none bg-zinc-100 rounded" placeholder="FirstName" type="text" />
                        <input className="w-fit grow h-fit text-zinc-500 text-sm p-2 md:text-md md:p-3 hover:bg-zinc-200 outline-none bg-zinc-100 rounded" placeholder="LastName" type="text" />
                    </div>
                    <input className=" h-fit text-zinc-500 text-sm p-2 md:text-md md:p-3 hover:bg-zinc-200 outline-none bg-zinc-100 rounded" placeholder="Email" type="email" />
                    <input className=" h-fit p-2 text-zinc-500 text-sm md:text-md md:p-3 hover:bg-zinc-200 outline-none bg-zinc-100 rounded" placeholder="Password" type="password" />
                    <button className="w-fit h-fit p-2 text-sm md:text-md bg-sky-500 hover:bg-sky-600 text-zinc-50 cursor-pointer rounded">Create</button>
                </form>
                <h1 className="font-medium text-zinc-400 text-sm">Already have a account? <Link to="/login" className="text-sky-500 cursor-pointer hover:underline">Login here</Link></h1>
            </div>
        </div>
  )
}

export default Register