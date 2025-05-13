"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip as RechartsTooltip } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"
import type { SalesChartData } from "@/types";

interface SalesOverviewChartProps {
  data: SalesChartData[];
}

const chartConfig = {
  totalSales: {
    label: "Total Sales",
    color: "hsl(var(--primary))",
  },
} satisfies Record<string, any>;


export function SalesOverviewChart({ data }: SalesOverviewChartProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Sales Overview - Last 6 Months</CardTitle>
        <CardDescription>Showing total sales per month.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart accessibilityLayer data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
            <RechartsTooltip 
              cursor={{ fill: 'hsl(var(--accent) / 0.2)' }}
              content={<ChartTooltipContent 
                formatter={(value, name) => {
                  if (name === 'totalSales') {
                    return `$${(value as number).toLocaleString()}`;
                  }
                  return String(value);
                }}
              />} 
            />
            <Bar dataKey="totalSales" fill="var(--color-totalSales)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Based on simulated data.
        </div>
      </CardFooter>
    </Card>
  )
}
