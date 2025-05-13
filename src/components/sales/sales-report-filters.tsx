"use client";

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Filter } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";

export function SalesReportFilters() {
  const [dateRange, setDateRange] = React.useState<Date | undefined>(undefined);
  // In a real app, use DateRange:
  // const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
  //   from: new Date(2024, 0, 20),
  //   to: addDays(new Date(2024, 0, 20), 20),
  // })

  return (
    <div className="flex flex-col md:flex-row items-center gap-3 mb-4 p-4 border rounded-lg bg-card shadow">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full md:w-[260px] justify-start text-left font-normal",
              !dateRange && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange ? format(dateRange, "PPP") : <span>Pick a date range</span>}
            {/* For DateRange:
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "LLL dd, y")} -{" "}
                  {format(dateRange.to, "LLL dd, y")}
                </>
              ) : (
                format(dateRange.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )} */}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="single" // Change to "range" for DateRangePicker
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={1} // Change to 2 for DateRangePicker
          />
        </PopoverContent>
      </Popover>

      <Select>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Payment Method" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Methods</SelectItem>
          <SelectItem value="cash">Cash</SelectItem>
          <SelectItem value="card">Card</SelectItem>
          <SelectItem value="qris">QRIS</SelectItem>
          <SelectItem value="digital_wallet">Digital Wallet</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Staff Member" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Staff</SelectItem>
          <SelectItem value="ani">Ani</SelectItem>
          <SelectItem value="rudi">Rudi</SelectItem>
          <SelectItem value="sari">Sari</SelectItem>
        </SelectContent>
      </Select>
      
      <Input placeholder="Search by customer..." className="w-full md:w-[200px]" />

      <Button className="w-full md:w-auto">
        <Filter className="mr-2 h-4 w-4" />
        Apply Filters
      </Button>
    </div>
  );
}
