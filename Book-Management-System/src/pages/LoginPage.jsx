import { Link } from "react-router-dom"
import { useState } from "react"

export default function LoginPage() {
    return (
        <div className="flex flex-wrap justify-center items-center h-screen bg-black/50">
            <Link to='/login/admin'>
            <button className="hover:bg-blue-200 rounded-xl p-4 h-40 shadow-md m-4 font-light text-2xl transition duration-300 ease-in-out active:scale-95">
                Admin Login
            </button>
            </Link>
            <Link to='/login/bace'>
            <button className="hover:bg-blue-200 rounded-xl p-4 h-40 shadow-md m-4 font-light text-2xl transition duration-300 ease-in-out active:scale-95">
                BACE Login
            </button></Link>
        </div>
    )
}

export function AdminLoginPage() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")



    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch('http://localhost:4000/user/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name:username,password})
        })
        const data = await response.json();
        if(data.success){
            // localStorage.setItem('token', data.token);
            window.location.href = '/admin/dashboard';
        } else {
            alert('Login failed: ' + data.message);
        }
        
        
    }

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input type="text" id="username" name="username" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={(e)=>setUsername(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" id="password" name="password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={(e)=>setPassword(e.target.value)} />
                    </div>
                    <div>
                        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export function BaceLoginPage(){
    return(
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">BACE Login</h2>
                <form className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">BACE Name</label>
                        <input type="text" id="bacename" name="bacename" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" id="password" name="password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}