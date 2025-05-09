
import { Transaction, Stock } from "@/types";
import { getStockById } from "@/data/stocksData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface TransactionTableProps {
  transactions: Transaction[];
}

const TransactionTable = ({ transactions }: TransactionTableProps) => {
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const getStockName = (stockId: string): string => {
    const stock = getStockById(stockId);
    return stock ? stock.name : "Unknown Stock";
  };

  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Shares</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedTransactions.length > 0 ? (
            sortedTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="py-2">{formatDate(transaction.date)}</TableCell>
                <TableCell className="py-2">{getStockName(transaction.stockId)}</TableCell>
                <TableCell className="py-2">
                  <Badge variant={transaction.type === "buy" ? "default" : "secondary"}>
                    {transaction.type === "buy" ? "Buy" : "Sell"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right py-2">{transaction.shares}</TableCell>
                <TableCell className="text-right py-2">
                  ${transaction.price.toFixed(2)}
                </TableCell>
                <TableCell className="text-right py-2">
                  ${(transaction.price * transaction.shares).toFixed(2)}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6">
                No transactions yet. Start trading!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionTable;
