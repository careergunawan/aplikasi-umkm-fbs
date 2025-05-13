"use client";
import type React from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { SidebarNav } from './sidebar-nav';
import { LogOut, Settings, UserCircle } from 'lucide-react';
import Link from 'next/link';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen>
      <SidebarWrapped>
        <SidebarInset>{children}</SidebarInset>
      </SidebarWrapped>
    </SidebarProvider>
  );
}

function SidebarWrapped({ children }: { children: React.ReactNode }) {
  // isMobile is used to conditionally render the trigger
  const { isMobile } = useSidebar();

  return (
    <>
      <Sidebar
        variant="sidebar" // "sidebar", "floating", "inset"
        collapsible="icon" // "offcanvas", "icon", "none"
        className="shadow-lg"
      >
        <SidebarHeader className="h-16 flex items-center justify-between p-4">
          <Link href="/" className="text-2xl font-bold text-sidebar-primary-foreground hover:text-sidebar-accent-foreground transition-colors">
            BizTrack
          </Link>
          {!isMobile && <SidebarTrigger />}
        </SidebarHeader>
        <SidebarContent className="flex-1 p-2">
          <SidebarNav />
        </SidebarContent>
        <SidebarFooter className="p-4 border-t border-sidebar-border">
          <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
            <UserCircle className="mr-2 h-5 w-5" />
            Profile
          </Button>
          <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
            <Settings className="mr-2 h-5 w-5" />
            Settings
          </Button>
          <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
            <LogOut className="mr-2 h-5 w-5" />
            Logout
          </Button>
        </SidebarFooter>
      </Sidebar>
      {children}
    </>
  );
}
