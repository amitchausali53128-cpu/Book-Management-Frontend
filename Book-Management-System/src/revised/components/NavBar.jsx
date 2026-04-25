import { useState } from "react";
export default function NavBar(){

    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="flex justify-between md:block m-0 p-0 bg-green-300 font-outfit">
           <ul className=" flex space-x-4 px-2 py-1 justify-center">
            <li className="hidden md:block"><a href="#">Home</a></li>
            <li className="hidden md:block"><a href="#">BACEs</a></li>
            <li className="hidden md:block"><a href="#">Register</a></li>
            <li className="hidden md:block"><a href="#">Login</a></li>
           </ul>

            <ul className={`${isOpen? 'block':'hidden'} w-100 p-1 space-y-1`}>
                <li className="block md:hidden"><a href="#">Home</a></li>
                <li className="block md:hidden"><a href="#">BACEs</a></li>
            <li className="block md:hidden"><a href="#">Register</a></li>
            <li className="block md:hidden"><a href="#">Login</a></li>
           
            </ul>

           <button className="" onClick={()=>setIsOpen(!isOpen)} className="flex justify-end px-3 py-1 md:hidden">
           {isOpen ? "X": <>&#9776;</>}
            
            </button>

        </nav>
    )
}