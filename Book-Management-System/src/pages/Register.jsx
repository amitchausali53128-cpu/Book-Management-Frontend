import { API_BASE_URL } from "../config";
import { useState } from "react";
import ToggleSwitch from "../components/ToggleSwitch";

export default function Register(){

    const [name, setname] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('bace'); // Default role is 'bace'

    const handleSubmit = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            alert("Passwords do not match!");
            return;
        }

        fetch(`${API_BASE_URL}/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, password, role}),
        }).then(response => response.json())
        .then(data => {
            if(data.success){
                alert("Registration successful! user");
            }
        })
    }
       
    return (
            <div className="h-[90vh] flex items-center justify-center bg-gray-100 font-outfit">
                <div className="bg-white p-4 sm:p-8 rounded-lg shadow-md w-full max-w-xs sm:max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                <ToggleSwitch Name="role" onChange={(checked) => setRole(checked ? 'admin' : 'bace')} checked={role==='admin'} />
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" id="name" name="name" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={(e)=>setname(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Set Password</label>
                        <input type="password" id="password" name="password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input type="password" id="cnf-password" name="password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={(e)=>setConfirmPassword(e.target.value)}/>
                    </div>
                    <div>
                        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Register</button>
                    </div>
                </form>
            </div>
        </div>
    )
}