import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Sale } from "@/types"
import { ScrollArea } from "@/components/ui/scroll-area"

interface RecentSalesTableProps {
  sales: Sale[];
}

export function RecentSalesTable({ sales }: RecentSalesTableProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
        <CardDescription>A quick look at the latest transactions.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sales.slice(0, 5).map((sale) => ( // Show top 5 recent sales
                <TableRow key={sale.id}>
                  <TableCell className="font-medium">{sale.customerName}</TableCell>
                  <TableCell>{new Date(sale.date).toLocaleDateString()}</TableCell>
                  <TableCell>${sale.totalAmount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={sale.status === 'Completed' ? 'default' : sale.status === 'Pending' ? 'secondary' : 'destructive'}
                      className={
                        sale.status === 'Completed' ? 'bg-green-500/20 text-green-700 hover:bg-green-500/30' :
                        sale.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-700 hover:bg-yellow-500/30' :
                        'bg-red-500/20 text-red-700 hover:bg-red-500/30'
                      }
                    >
                      {sale.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
