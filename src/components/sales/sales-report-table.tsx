import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eye, Edit2, FileText } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Sale } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SalesReportTableProps {
  sales: Sale[];
}

export function SalesReportTable({ sales }: SalesReportTableProps) {
  const getStatusBadgeClasses = (status: Sale['status']) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 border-green-300 hover:bg-green-200';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-200';
      case 'Refunded':
        return 'bg-red-100 text-red-800 border-red-300 hover:bg-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200';
    }
  };
  
  const getPaymentMethodBadgeClasses = (method: Sale['paymentMethod']) => {
    switch (method) {
      case 'QRIS':
        return 'bg-sky-100 text-sky-800 border-sky-300 hover:bg-sky-200';
      case 'Card':
        return 'bg-indigo-100 text-indigo-800 border-indigo-300 hover:bg-indigo-200';
      case 'Digital Wallet':
        return 'bg-purple-100 text-purple-800 border-purple-300 hover:bg-purple-200';
      case 'Cash':
         return 'bg-lime-100 text-lime-800 border-lime-300 hover:bg-lime-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200';
    }
  };


  return (
    <ScrollArea className="max-h-[500px] rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sale ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Staff</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead className="text-right">Total (Rp)</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sales.map((sale) => (
            <TableRow key={sale.id}>
              <TableCell className="font-mono text-xs">{sale.id.substring(0,8)}...</TableCell>
              <TableCell>{new Date(sale.date).toLocaleDateString()}</TableCell>
              <TableCell className="font-medium">{sale.customerName}</TableCell>
              <TableCell>{sale.staffMember}</TableCell>
              <TableCell>
                <Badge variant="outline" className={getPaymentMethodBadgeClasses(sale.paymentMethod)}>
                  {sale.paymentMethod}
                </Badge>
              </TableCell>
              <TableCell className="text-right">{sale.totalAmount.toLocaleString()}</TableCell>
              <TableCell>
                <Badge variant="outline" className={getStatusBadgeClasses(sale.status)}>
                  {sale.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit2 className="mr-2 h-4 w-4" />
                      Edit Sale
                    </DropdownMenuItem>
                     <DropdownMenuItem>
                      <FileText className="mr-2 h-4 w-4" />
                      Generate Invoice
                    </DropdownMenuItem>
                    {sale.status !== 'Refunded' && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                          Process Refund
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
       {sales.length === 0 && (
        <div className="text-center p-8 text-muted-foreground">
          No sales data found for the selected filters.
        </div>
      )}
    </ScrollArea>
  );
}
