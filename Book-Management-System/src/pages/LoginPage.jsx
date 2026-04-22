import { API_BASE_URL } from "../config";
import { useState } from "react"
import { useAuth } from "../store/auth.jsx"


export default function LoginPage() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const {storeToken} = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`${API_BASE_URL}/user/login`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name:username,password})
        })
        const data = await response.json();
        if(data.success){
            
            storeToken(data.token);
            if(data.user.role === 'admin'){
              
                
                window.location.href = '/admin/dashboard';
            }
                else if(data.user.role === 'bace'){
                    
                    e.preventDefault();
                    console.log(data.user);
                    const res = await fetch(`${API_BASE_URL}/bace/getbyname/${data.user.name}`);
                    const baceData = await res.json();
                    console.log(baceData);
                    window.location.href = `/bacehome/${baceData._id}`;
                    
                }
        } else {
            alert('Login failed: ' + data.message);
            
        }
        
        
    }

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
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