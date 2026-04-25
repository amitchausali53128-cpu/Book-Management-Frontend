export default function TrDetail(){
    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-4 sm:p-8 rounded-lg shadow-md w-full max-w-xs sm:max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Transaction Details</h2>
                <div className="space-y-4">
                    <div>
                        <p><span className="font-medium">Transaction ID:</span> 123456789</p>
                        <p><span className="font-medium">BACE Name:</span> BACE 1</p>
                        <p><span className="font-medium">Book Title:</span> The Great Gatsby</p>
                        <p><span className="font-medium">Quantity:</span> 3</p>
                        <p><span className="font-medium">Total Price:</span> $45.00</p>
                        <p><span className="font-medium">Status:</span> Completed</p>
                    </div>
                    <div>
                        <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">View Invoice</button>
                    </div>
                </div>
            </div>
        </div>
    )
}