import { API_BASE_URL } from "../config";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import SearchInput from "./SearchInput";
import Pay from "./Pay";
import { jwtDecode } from "jwt-decode";
import Allot from "./Allot";
import { FiInfo } from "react-icons/fi";

export default function TableData({ name }) {
  const [allTransactionsdata, setAllTransactionsdata] = useState([]);
  const [query, setQuery] = useState("");
  const [payVisible, setPayVisible] = useState(false);
  const [allotVisible, setAllotVisible] = useState(false);
  const [selectedTx, setSelectedTx] = useState(null);
  const [role, setRole] = useState("bace");
  const [hoveredTxId, setHoveredTxId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    try {
      const decoded = jwtDecode(token);
      setRole(decoded.role);
    } catch (error) {
      
    }
    if (!token) {
      console.error("No token found. Please log in.");
      return;
    }

    fetch(`${API_BASE_URL}/transactions/all`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setAllTransactionsdata(data))
      .catch((error) =>
        console.error("Error fetching transactions:", error)
      );
  }, []);

  // ✅ Combined filtering (role + search)
  const transactions = allTransactionsdata.filter((transaction) => {
    const matchesRole =
      name === "Admin" || transaction.bace === name;

    const matchesSearch =
      query.trim() === "" ||
      transaction.bace?.toLowerCase().includes(query.toLowerCase()) ||
      transaction.transaction_id?.toLowerCase().includes(query.toLowerCase());

    return matchesRole && matchesSearch;
  });

  return (
    <div>
      {/* Search bar stays fixed above the scrollable table */}
      <div className="mb-2">
        <SearchInput onSearch={setQuery} />
      </div>
      {/* Scrollable table container */}
      <div className="max-h-[400px] overflow-y-auto border rounded-lg">
        <table className="min-w-full">
          <thead className="sticky top-0 bg-gray-200 z-10">
            <tr>
              <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Time</th>
            <th className="px-4 py-2">Bace Name</th>
            <th className="px-4 py-2">Transaction ID</th>
            <th className="px-4 py-2">Total books</th>
            <th className="px-4 py-2">Amount</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((transaction) => (
            <tr
              key={transaction._id}
              className="text-center shadow-md transition transform hover:-translate-y-2 hover:shadow-xl"
            >
              <td className="px-4 py-2">
                {new Date(transaction.timestamp).toDateString()}
              </td>
              <td className="px-4 py-2">
                {new Date(transaction.timestamp).toLocaleTimeString()}
              </td>
              <td className="px-4 py-2">{transaction.bace}</td>
              <td className="px-4 py-2 relative flex items-center justify-center">
                <span>{transaction.transaction_id}</span>
                {transaction.desc && (
                  <span
                    className="ml-2 cursor-pointer relative inline-flex items-center"
                    onMouseEnter={() => setHoveredTxId(transaction._id)}
                    onMouseLeave={() => setHoveredTxId(null)}
                    data-tooltip-id={transaction._id}
                  >
                    <FiInfo className="text-xl text-gray-500 hover:text-blue-500 transition-colors duration-200" />
                  </span>
                )}
                    {/* Tooltip Portal */}
                    {hoveredTxId && (() => {
                      const tx = transactions.find(t => t._id === hoveredTxId);
                      if (!tx || !tx.desc) return null;
                      // Get the icon's position
                      const iconEl = document.querySelector(`[data-tooltip-id='${hoveredTxId}']`);
                      let style = { position: 'fixed', left: '50vw', top: '20vh', zIndex: 9999 };
                      if (iconEl) {
                        const rect = iconEl.getBoundingClientRect();
                        style = {
                          position: 'fixed',
                          left: rect.left + rect.width / 2,
                          top: rect.top - 12,
                          transform: 'translate(-50%, -100%)',
                          zIndex: 9999
                        };
                      }
                      return createPortal(
                        <div style={style} className="min-w-[200px] max-w-xs bg-white border border-gray-400 shadow-lg rounded p-2 text-left text-gray-800 font-normal animate-fade-in">
                          <span className="font-semibold">Description: </span>{tx.desc}
                        </div>,
                        document.body
                      );
                    })()}
              </td>
              <td className="px-4 py-2">{transaction.total_books}</td>
              <td className="px-4 py-2 flex flex-wrap justify-center">{transaction.amount.paid}
                {transaction.amount.pending !== 0 && name !=='Admin' && role !=='admin' &&(
                <div onClick={
                  
            ()=>{setPayVisible(true); setSelectedTx(transaction)}
          }>
                <button className="px-2 bg-blue-400 text-white rounded-md ml-4 hover:bg-blue-600 transition duration-300">
                  Pay
                </button>
                </div>)
                }
                {transaction.amount.pending ==0 && transaction.amount.paid == 0 && role == 'admin' && (
                  <div onClick={
                  
            ()=>{setAllotVisible(true); setSelectedTx(transaction)}
          }>
                <button className="px-2 bg-green-600 text-white rounded-md ml-4 hover:bg-green-800 transition duration-300">
                  Allot
                </button>
                </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
      <Pay isOpen={payVisible} onClose={() => setPayVisible(false)} tx={selectedTx}  onSuccess={(updatedTx) => {
        setAllTransactionsdata((prev) =>
          prev.map((t) =>
            t._id === updatedTx._id ? updatedTx : t
          )
        );
      }}/>
      <Allot isOpen={allotVisible} onClose={() => setAllotVisible(false)} tx={selectedTx} onSuccess={(updatedTx) => {
        setAllTransactionsdata((prev) =>
          prev.map((t) =>
            t._id === updatedTx._id ? updatedTx : t
          )
        );
      }} />
    </div>
  );
}