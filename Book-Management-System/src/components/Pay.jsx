import { API_BASE_URL } from "../config";
import { useState } from "react";

export default function Pay({isOpen, onClose, tx, onSuccess}) {

    const [trId, setTrId] = useState('');
    const [amount, setAmount] = useState(0);

    if(!isOpen || !tx) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (amount > tx.amount.pending) {
    alert("Amount exceeds pending balance");
    return;
}
        fetch(`${API_BASE_URL}/transactions/status`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: tx._id,
                transaction_id: trId,
                paid: tx.amount.paid + amount,
                pending: tx.amount.pending - amount,
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            onSuccess(data.transaction);
           onClose();
    setTrId('');
    setAmount(0);
        })
        .catch((error) => {
            console.error("Error processing payment:", error);
        });         
    }
 
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-96 relative animate-in fade-in zoom-in duration-200">
                <button onClick={onClose} className="absolute top-2 right-2 text-white hover:text-gray-700 bg-red-500 rounded-full p-1 font-bold text-xl">
                    Close
                    </button>
                <h2 className="text-2xl font-bold mb-4">Submit the Lakshmi</h2>
                
                <form onSubmit={handleSubmit} >
                    <div className="mb-4 flex items-center gap-2">
                        <label htmlFor="bacename" className="block text-sm font-medium text-gray-700">BACE Name</label>
                        <span className="block px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 ">{tx.bace}</span>
                    </div>
                    <div className="mb-4 flex items-center gap-2">
                        <label htmlFor="bacename" className="block text-sm font-medium text-gray-700">Amount Paid</label>
                        <span className="block px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 ">{tx.amount.paid}</span>
                    </div>
                    <div className="mb-4 flex items-center gap-2">
                        <label htmlFor="bacename" className="block text-sm font-medium text-gray-700">Amount Pending</label>
                        <span className="block px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 ">{tx.amount.pending}</span>
                    </div>
                    <div className="mb-4 ">
                        <label htmlFor="booktitle" className="block text-sm font-medium text-gray-700">Transaction Id</label>
                        <input type="text" id="smallBooks" name="smallBooks" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={(e)=>setTrId(e.target.value)}/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="booktitle" className="block text-sm font-medium text-gray-700">Enter Amount</label>
                        <input type="number" id="bigBooks" name="bigBooks" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={(e)=>setAmount(Number(e.target.value))}/>
                    </div>
                    
                <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    Submit Now
                </button>
                </form>
           </div>
        </div>
    )

}