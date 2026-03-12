export default function TableData({ transactions }) {
  return (
    <table className="min-w-full">
      <thead className="sticky top-0 bg-gray-200 z-10">
        <tr >
          <th class="px-4 py-2">Date</th>
          <th class="px-4 py-2">Bace Name</th>
          <th class="px-4 py-2">Transaction ID</th>
          <th class="px-4 py-2">Total books</th>
          <th class="px-4 py-2">Amount</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr className="text-center shadow-md transition transform hover: -translate-y-2 hover:shadow-xl" key={transaction.tr_id}>
            <td class=" px-4 py-2">{transaction.date}</td>
            <td class=" px-4 py-2">{transaction.bace_name}</td>
            <td class=" px-4 py-2">{transaction.tr_id}</td>
            <td class=" px-4 py-2">{transaction.total_books}</td>
            <td class=" px-4 py-2">{transaction.amount}</td>
          </tr>
        ))}


      </tbody></table>
  )
}