import Card from "../components/Card"
import transactions from "../data/transactions.json"
import BookButton from "../components/BookButton"
import TableData from "../components/TableData"

export default function BaceHome() {

  return (
    <div>

      <div className="flex justify-between flex-wrap px-6 items-center">
        <Card title={'BACE 1'} desc={'location'} bg={'oklch(79.5% 0.184 86.047) '} />
        <div className="flex flex-wrap items-center justify-center">
        <Card title={'Instock'} desc={200} bg={'oklch(64.8% 0.2 131.684)'} />
        <Card title={'This month Score'} desc={140} bg={'oklch(43.2% 0.232 292.759)'} />

        <div className="flex flex-col items-center justify-center">

          < BookButton title={'Request Books'} color={'oklch(64.8% 0.2 131.684)'} />
          < BookButton title={'Submit Payment Info'} color={'oklch(70.7% 0.165 254.624)'} />
        </div>

      </div>

      </div>
      
      <div className="m-2">
        <heading className="m-2 text-2xl ">Transaction History</heading>

        <div className="max-h-[70vh] overflow-y-auto border rounded-lg">
          <TableData transactions={transactions} />
        </div>

      </div>

    </div>
  )

}


