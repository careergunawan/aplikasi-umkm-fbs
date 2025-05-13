import Image from 'next/image';
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
import { MoreHorizontal, Edit, Trash2, BarChart } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Product } from "@/types";
import { ScrollArea } from '@/components/ui/scroll-area';

interface InventoryTableProps {
  products: Product[];
}

export function InventoryTable({ products }: InventoryTableProps) {
  const getStatusBadgeVariant = (status: Product['status']) => {
    switch (status) {
      case 'In Stock':
        return 'bg-green-100 text-green-800 border-green-300 hover:bg-green-200';
      case 'Low Stock':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-200';
      case 'Out of Stock':
        return 'bg-red-100 text-red-800 border-red-300 hover:bg-red-200';
      default:
        return 'secondary';
    }
  };

  return (
    <ScrollArea className="rounded-md border shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Price (Rp)</TableHead>
            <TableHead className="text-right">Stock</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <Image 
                  src={product.imageUrl || `https://picsum.photos/seed/${product.id}/50/50`} 
                  alt={product.name}
                  width={50} 
                  height={50} 
                  className="rounded-md object-cover"
                  data-ai-hint={product.data_ai_hint || "product image"}
                />
              </TableCell>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.sku}</TableCell>
              <TableCell>{product.category || '-'}</TableCell>
              <TableCell className="text-right">{product.price.toLocaleString()}</TableCell>
              <TableCell className="text-right">{product.stockQuantity}</TableCell>
              <TableCell>
                <Badge variant="outline" className={getStatusBadgeVariant(product.status)}>
                  {product.status}
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
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Product
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <BarChart className="mr-2 h-4 w-4" />
                      View Analytics
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Product
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {products.length === 0 && (
        <div className="text-center p-8 text-muted-foreground">
          No products found.
        </div>
      )}
    </ScrollArea>
  );
}
