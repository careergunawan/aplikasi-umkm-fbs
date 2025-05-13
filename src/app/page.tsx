
import { PageHeader } from "@/components/page-header";
import { SummaryCard } from "@/components/dashboard/summary-card";
import { SalesOverviewChart } from "@/components/dashboard/sales-overview-chart";
import { RecentSalesTable } from "@/components/dashboard/recent-sales-table";
import { placeholderSales, placeholderProducts, placeholderCsrPrograms, placeholderSalesChartData, placeholderDailySalesSummary } from "@/lib/placeholder-data";
import { DollarSign, Package, Users, BarChartBig } from "lucide-react"; // Changed PackageWarning to Package
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
  const totalSalesToday = placeholderDailySalesSummary.length > 0 ? placeholderDailySalesSummary[0].totalRevenue : 0;
  const lowStockItemsCount = placeholderProducts.filter(p => p.status === 'Low Stock').length;
  const activeCsrProgramsCount = placeholderCsrPrograms.filter(p => p.status === 'Active').length;
  const totalTransactionsToday = placeholderDailySalesSummary.length > 0 ? placeholderDailySalesSummary[0].totalTransactions : 0;
  
  return (
    <div className="flex-1 space-y-6 p-4 md:p-6 lg:p-8">
      <PageHeader 
        title="Dashboard" 
        description="Welcome back! Here's an overview of your business."
        actions={
          <Button asChild>
            <Link href="/sales/new">New Sale</Link>
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard 
          title="Today's Revenue" 
          value={`Rp ${totalSalesToday.toLocaleString()}`}
          icon={DollarSign}
          description={`${totalTransactionsToday} transactions`}
        />
        <SummaryCard 
          title="Low Stock Items" 
          value={lowStockItemsCount} 
          icon={Package} // Changed PackageWarning to Package
          description="Needs restocking soon"
          iconClassName={lowStockItemsCount > 0 ? "text-destructive" : "text-green-500"}
        />
        <SummaryCard 
          title="Active CSR Programs" 
          value={activeCsrProgramsCount} 
          icon={Users} // Users icon as a proxy for community/CSR
          description="Engaging the community"
        />
         <SummaryCard 
          title="Monthly Sales Growth" 
          value="+12.5%" 
          icon={BarChartBig}
          description="Compared to last month"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        <SalesOverviewChart data={placeholderSalesChartData} />
        <RecentSalesTable sales={placeholderSales} />
      </div>

      {/* Placeholder for more dashboard components */}
      {/* 
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        <CardComponent title="Stock Status Overview" />
        <CardComponent title="Top Selling Products" />
        <CardComponent title="CSR Contribution Tracker" />
      </div> 
      */}
    </div>
  );
}

