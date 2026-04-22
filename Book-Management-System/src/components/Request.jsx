import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { API_BASE_URL } from "../config";


export default function Request({isOpen, onClose}) {

    const bacename  = jwtDecode(localStorage.getItem('token')).name
    const [smallBooks, setSmallBooks] = useState(0);
    const [bigBooks, setBigBooks] = useState(0);
    const [mahaBigBooks, setMahaBigBooks] = useState(0);
    const [desc, setDesc] = useState('');

    if(!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        const totalBooks = Number(smallBooks) + Number(bigBooks) + Number(mahaBigBooks);
        // Send allotment data to backend API
        fetch(`${API_BASE_URL}/bace/request`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ 
                name: bacename,
                small_books: Number(smallBooks),
                big_books: Number(bigBooks),
                mahabig_books: Number(mahaBigBooks),
                desc
             }),
        })
        .then(response => response.json())
        .then(data => {
            if(data.success){
                alert("Books allotted successfully!");
                onClose(); // Close the allotment form after successful submission
            } else {
                alert("Allotment failed: " + data.message);
            }
        })
        .catch(error => console.error("Error during allotment:", error));
    }
 
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-96 relative animate-in fade-in zoom-in duration-200">
                <button onClick={onClose} className="absolute top-2 right-2 text-white hover:text-gray-700 bg-red-500 rounded-full p-1 font-bold text-xl">
                    Close
                    </button>
                <h2 className="text-2xl font-bold mb-4">Request Books</h2>
                
                <form onSubmit={handleSubmit} >
                    <div className="mb-4">
                        <label htmlFor="bacename" className="block text-sm font-medium text-gray-700">BACE Name</label>
                        <span id="bacename" name="bacename" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 ">{bacename}</span>
                    </div>
                    <div className="mb-4 flex">
                        <label htmlFor="booktitle" className="block text-sm font-medium text-gray-700">Small Books</label>
                        <input type="number" id="smallBooks" name="smallBooks" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={(e)=>setSmallBooks(e.target.value)}/>
                    </div>
                    <div className="mb-4 flex">
                        <label htmlFor="booktitle" className="block text-sm font-medium text-gray-700">Big Books</label>
                        <input type="number" id="bigBooks" name="bigBooks" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={(e)=>setBigBooks(e.target.value)}/>
                    </div>
                    <div className="mb-4 flex">
                        <label htmlFor="booktitle" className="block text-sm font-medium text-gray-700">MahaBig Books</label>
                        <input type="number" id="mahaBigBooks" name="mahaBigBooks" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={(e)=>setMahaBigBooks(e.target.value)}/>
                    </div>
                    <div className="mb-4 flex gap-2 items-center">
                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Total</label>
                        <span id="quantity" name="quantity" className="" >{Number(smallBooks) + Number(bigBooks) + Number(mahaBigBooks)}
                            </span>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="desc" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            id="desc"
                            name="desc"
                            rows={3}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 resize-y"
                            placeholder="Enter description..."
                            onChange={(e)=>setDesc(e.target.value)}
                        />
                    </div>
                <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    Request Now
                </button>
                </form>



            </div>
        </div>
    )

}