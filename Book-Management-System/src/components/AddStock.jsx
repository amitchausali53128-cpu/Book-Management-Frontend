import { API_BASE_URL } from "../config";
import {useState, useEffect} from "react";
export default function Allot({isOpen, onClose, onSuccess, tx}) {
   
    const [smallBooks, setSmallBooks] = useState(0);
    const [bigBooks, setBigBooks] = useState(0);
    const [mahaBigBooks, setMahaBigBooks] = useState(0);


    useEffect(() => {
        if (tx) {
            setSmallBooks(tx.small_books || 0);
            setBigBooks(tx.big_books || 0);
            setMahaBigBooks(tx.mahabig_books || 0);
        }
    }, [tx, isOpen]);

    if(!isOpen) return null;

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch(`${API_BASE_URL}/admin/update-books`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ 
               
                small_books: Number(smallBooks),
                big_books: Number(bigBooks),
                mahabig_books: Number(mahaBigBooks),
                
            }),
        });

        const data = await response.json();

        if (data.success) {

            onSuccess(data.transaction);
            alert("Books Added successfully!");
            onClose(); 
        } else {
            alert("Failed: " + data.message);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("A network error occurred.");
    }
};

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm font-outfit">
            <div className="bg-white p-4 sm:p-8 rounded-xl shadow-2xl w-full max-w-xs sm:max-w-md relative animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
                <button onClick={onClose} className="absolute top-2 right-2 text-white hover:text-gray-700 bg-red-500 rounded-full p-1 font-bold text-xl">
                    Close
                </button>
                <h2 className="text-2xl font-bold mb-4">Add to Stock</h2>
                <form onSubmit={handleSubmit} >
                    
                    <div className="mb-4 flex">
                        <label htmlFor="smallBooks" className="block text-sm font-medium text-gray-700">Small Books</label>
                        <input
                            type="number"
                            id="smallBooks"
                            name="smallBooks"
                            value={smallBooks}
                            onChange={(e) => setSmallBooks(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="mb-4 flex">
                        <label htmlFor="bigBooks" className="block text-sm font-medium text-gray-700">Big Books</label>
                        <input
                            type="number"
                            id="bigBooks"
                            name="bigBooks"
                            value={bigBooks}
                            onChange={(e) => setBigBooks(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="mb-4 flex">
                        <label htmlFor="mahaBigBooks" className="block text-sm font-medium text-gray-700">MahaBig Books</label>
                        <input
                            type="number"
                            id="mahaBigBooks"
                            name="mahaBigBooks"
                            value={mahaBigBooks}
                            onChange={(e) => setMahaBigBooks(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    
                    <div className="mb-4 flex gap-2 items-center">
                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Total</label>
                        <span id="quantity" name="quantity" className="" >{Number(smallBooks) + Number(bigBooks) + Number(mahaBigBooks)}</span>
                    </div>

                    <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                        Add to Stock
                    </button>
                </form>
            </div>
        </div>
    );
}