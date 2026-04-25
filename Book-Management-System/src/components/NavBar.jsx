import { Link } from "react-router-dom"
import { useAuth } from "../store/auth"
import { jwtDecode } from "jwt-decode"
import { useEffect, useState } from "react"

export default function NavBar(){
    const {token} = useAuth()
    const [role, setRole] = useState(null);

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setRole(decoded.role);
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
    }, [token]);
    return(
        <div className="bg-green-300 p-2 font-outfit text-center gap-2 sm:gap-4 flex flex-wrap items-center justify-center w-full">
            {role === 'admin' && <Link to="/admin/dashboard" className="ml-2 sm:ml-4">Admin Home</Link>}

            {token ? (
                <>
                <Link to="/logout">Logout</Link>
                </>
            ) : (
                <>
                <Link to="/" >Login</Link>
                <Link to="/register" >Register</Link>   
                </>
            )}
        </div>
    )
}