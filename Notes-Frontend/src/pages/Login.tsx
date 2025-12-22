import { Link } from "react-router-dom"

const Login = () => {
    return (
        <div className="flex items-center justify-center font-[satoshi] mt-32">
            <div className="flex flex-col gap-4">
                <h1 className="font-semibold text-lg">Login your account</h1>
                <form className="flex flex-col gap-4">
                    <input className="w-fit h-fit text-zinc-500 text-md p-3 hover:bg-zinc-200 outline-none bg-zinc-100 rounded" placeholder="Email" type="email" />
                    <input className="w-fit h-fit p-3 text-zinc-500 text-md hover:bg-zinc-200 outline-none bg-zinc-100 rounded" placeholder="Password" type="password" />
                    <button className="w-24 h-fit p-2 bg-sky-500 hover:bg-sky-600 text-zinc-50 cursor-pointer rounded">Login</button>
                </form>
                <h1 className="font-medium text-zinc-400 text-sm">Don't have a account? <Link to="/register" className="text-sky-500 cursor-pointer hover:underline">Register here</Link></h1>
            </div>
        </div>
    )
}
export default Login
