import { GrTransaction } from "react-icons/gr";
import NavBar from "../components/NavBar";
import LongCard from "../components/LongCard";
import { SiBookstack } from "react-icons/si";
import { MdSportsScore } from "react-icons/md";


export default function AdminHome() {
 
  return (
    <div className="m-0 p-0">
        <NavBar />
        <div className="px-3">

        <div className="block md:flex gap-4 my-4">

        <LongCard  title='In Stock' value={30} icon={SiBookstack} />
        <LongCard  title='This month Score' value={100} icon={MdSportsScore} />
        </div>
        <button className="p-1 m-1 bg-blue-200 rounded font-outfit text-lg">
          Allot Books
        </button>


      <div className="flex gap-3 text-2xl items-center font-lato" >
        <GrTransaction />
        Transactions
        </div>
        
        </div>
        

    </div>
  )
}