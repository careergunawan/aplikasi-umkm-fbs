import type { LucideIcon } from 'lucide-react';
import { LayoutDashboard, Boxes, HeartHandshake, LineChart, BrainCircuit, Bot } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    label: 'Inventory',
    href: '/inventory',
    icon: Boxes,
  },
  {
    label: 'CSR Programs',
    href: '/csr',
    icon: HeartHandshake,
  },
  {
    label: 'Sales Reports',
    href: '/sales',
    icon: LineChart,
  },
  {
    label: 'Stock Predictions',
    href: '/predictions',
    icon: Bot, // Using Bot as BrainCircuit is not available in older lucide-react. Update if available.
  },
];
