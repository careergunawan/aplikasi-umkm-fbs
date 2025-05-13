import { SummaryCard } from "@/components/dashboard/summary-card";
import type { DailySaleSummary } from "@/types";
import { DollarSign, ListChecks, TrendingUp, Users } from "lucide-react";

interface SalesSummaryCardsProps {
  dailySummaries: DailySaleSummary[]; // Assuming summaries are sorted, latest first
}

export function SalesSummaryCards({ dailySummaries }: SalesSummaryCardsProps) {
  const latestSummary = dailySummaries.length > 0 ? dailySummaries[0] : { totalRevenue: 0, totalTransactions: 0 };
  const previousSummary = dailySummaries.length > 1 ? dailySummaries[1] : { totalRevenue: 0, totalTransactions: 0 };

  const revenueChange = previousSummary.totalRevenue > 0 
    ? (((latestSummary.totalRevenue - previousSummary.totalRevenue) / previousSummary.totalRevenue) * 100).toFixed(1)
    : 'N/A';

  const transactionsChange = previousSummary.totalTransactions > 0
    ? (((latestSummary.totalTransactions - previousSummary.totalTransactions) / previousSummary.totalTransactions) * 100).toFixed(1)
    : 'N/A';


  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <SummaryCard
        title="Total Revenue (Today)"
        value={`Rp ${latestSummary.totalRevenue.toLocaleString()}`}
        icon={DollarSign}
        description={revenueChange !== 'N/A' ? `${revenueChange}% from yesterday` : 'No previous data'}
      />
      <SummaryCard
        title="Transactions (Today)"
        value={latestSummary.totalTransactions}
        icon={ListChecks}
        description={transactionsChange !== 'N/A' ? `${transactionsChange}% from yesterday` : 'No previous data'}
      />
      <SummaryCard
        title="Avg. Transaction Value"
        value={`Rp ${(latestSummary.totalTransactions > 0 ? latestSummary.totalRevenue / latestSummary.totalTransactions : 0).toLocaleString(undefined, {maximumFractionDigits:0})}`}
        icon={TrendingUp}
        description="For today's sales"
      />
      <SummaryCard
        title="New Customers (Today)"
        value="12" // Placeholder
        icon={Users}
        description="+5 from yesterday" // Placeholder
      />
    </div>
  );
}
