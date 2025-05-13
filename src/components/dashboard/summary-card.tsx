import type React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { LucideIcon } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  className?: string;
  iconClassName?: string;
}

export function SummaryCard({ title, value, icon: Icon, description, className, iconClassName }: SummaryCardProps) {
  return (
    <Card className={cn("shadow-lg hover:shadow-xl transition-shadow", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className={cn("h-5 w-5 text-accent", iconClassName)} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {description && <p className="text-xs text-muted-foreground pt-1">{description}</p>}
      </CardContent>
    </Card>
  );
}

// Helper to add cn if not present
import { cn as utilCn } from '@/lib/utils';
const cn = (...inputs: any[]) => utilCn(inputs);
