import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Download, Filter, PlusCircle } from "lucide-react";
import { SalesReportTable } from "@/components/sales/sales-report-table";
import { placeholderDailySalesSummary, placeholderSales } from "@/lib/placeholder-data";
import { SalesReportFilters } from "@/components/sales/sales-report-filters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SalesSummaryCards } from "@/components/sales/sales-summary-cards";

export default function SalesPage() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-6 lg:p-8">
      <PageHeader 
        title="Sales Reports"
        description="Analyze your sales performance and trends."
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
             <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Sale Entry
            </Button>
          </div>
        }
      />
      
      <SalesSummaryCards dailySummaries={placeholderDailySalesSummary} />

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Detailed Sales Transactions</CardTitle>
          <div className="pt-2">
            <SalesReportFilters />
          </div>
        </CardHeader>
        <CardContent>
          <SalesReportTable sales={placeholderSales} />
        </CardContent>
      </Card>
    </div>
  );
}
