import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { PlusCircle, Download } from "lucide-react";
import { InventoryTable } from "@/components/inventory/inventory-table";
import { placeholderProducts } from "@/lib/placeholder-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function InventoryPage() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-6 lg:p-8">
      <PageHeader 
        title="Inventory Management"
        description="Track and manage your product stock levels."
        actions={
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </Button>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </div>
        }
      />
      
      <Tabs defaultValue="all_products">
        <div className="flex items-center justify-between pb-4">
          <TabsList>
            <TabsTrigger value="all_products">All Products</TabsTrigger>
            <TabsTrigger value="low_stock">Low Stock</TabsTrigger>
            <TabsTrigger value="out_of_stock">Out of Stock</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Input placeholder="Search products..." className="w-64" />
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="minuman">Minuman</SelectItem>
                <SelectItem value="makanan_ringan">Makanan Ringan</SelectItem>
                <SelectItem value="perawatan_diri">Perawatan Diri</SelectItem>
                <SelectItem value="bahan_pokok">Bahan Pokok</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <TabsContent value="all_products">
          <InventoryTable products={placeholderProducts} />
        </TabsContent>
        <TabsContent value="low_stock">
          <InventoryTable products={placeholderProducts.filter(p => p.status === 'Low Stock')} />
        </TabsContent>
        <TabsContent value="out_of_stock">
          <InventoryTable products={placeholderProducts.filter(p => p.status === 'Out of Stock')} />
        </TabsContent>
        <TabsContent value="categories">
          <p className="text-muted-foreground">Category management interface coming soon.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
