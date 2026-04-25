import { API_BASE_URL } from "../config";
// import { Link } from "react-router-dom";
import BookButton from "../components/BookButton";
import Card from "../components/Card";
import TableData from "../components/TableData";
import Allot from "../components/Allot";
import {  useEffect, useState } from "react";
import { SiBookstack } from "react-icons/si";
import { MdSportsScore } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";

export default function AdminHome() {

  const [adminDetails, setAdminDetails] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [monthScore, setMonthScore] = useState(0);

  useEffect(() => {
    const getAdminData = async () => {
      const response = await fetch(`${API_BASE_URL}/admin/get-details`);
      const data = await response.json();
      setAdminDetails(data);
    };
    getAdminData();

    // Fetch all transactions for score calculation
    const token = localStorage.getItem("token");
    fetch(`${API_BASE_URL}/transactions/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setTransactions(data))
      .catch((error) => console.error("Error fetching transactions:", error));
  }, []);

  useEffect(() => {
    // Calculate this month's score (sum of total_books for current month)
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const score = transactions
      .filter((tx) => {
        const txDate = new Date(tx.timestamp);
        return txDate.getMonth() === currentMonth && txDate.getFullYear() === currentYear;
      })
      .reduce((sum, tx) => sum + (tx.total_books || 0), 0);
    setMonthScore(score);
  }, [transactions]);
  
  

  const [allotVisible, setAllotVisible] = useState(false);

  return (
    <div>

      <div className="flex justify-between">
        <Card title={'Admin'} desc={''} bg={'oklch(79.5% 0.184 86.047) '} />
        <div className="flex flex-wrap items-center justify-center">
        <Card title={'Instock'} desc={adminDetails.big_books} bg={'oklch(64.8% 0.2 131.684)'} icon={SiBookstack}/>
        <Card title={'This month Score'} desc={monthScore} bg={'oklch(43.2% 0.232 292.759)'} icon={MdSportsScore} />

        <div className="flex flex-col items-center justify-center">

          <div onClick={
            ()=>{
              setAllotVisible(true);
              console.log(adminDetails);
                            
            }
          }>
          < BookButton title={'Allot Books'} color={'oklch(64.8% 0.2 131.684)'} />
          </div>
          < BookButton title={'Get BACE info'} color={'oklch(70.7% 0.165 254.624)'}  link={'/binfo'}/>
        </div>

      </div>

      </div>
      
      <div className="m-2">
        <div className="flex gap-2 m-2 text-2xl "><GrTransaction/> Transaction History</div>

        <div className="max-h-[70vh] overflow-y-auto border rounded-lg">
          <TableData name='Admin' />
        </div>

      </div>

      <Allot isOpen={allotVisible}
        onClose={()=>setAllotVisible(false)}
        onSuccess={()=>{}}
      />

    </div>
  )

}
