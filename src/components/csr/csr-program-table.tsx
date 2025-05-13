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
import { Progress } from "@/components/ui/progress";
import { MoreHorizontal, Edit, Trash2, Eye } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { CsrProgram } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CsrProgramTableProps {
  programs: CsrProgram[];
}

export function CsrProgramTable({ programs }: CsrProgramTableProps) {
  const getStatusBadgeVariant = (status: CsrProgram['status']) => {
    switch (status) {
      case 'Active':
        return 'bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200';
      case 'Completed':
        return 'bg-green-100 text-green-800 border-green-300 hover:bg-green-200';
      case 'Upcoming':
        return 'bg-purple-100 text-purple-800 border-purple-300 hover:bg-purple-200';
      default:
        return 'secondary';
    }
  };

  return (
    <ScrollArea className="rounded-md border shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Program Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Collected (Rp)</TableHead>
            <TableHead className="text-right">Target (Rp)</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {programs.map((program) => (
            <TableRow key={program.id}>
              <TableCell className="font-medium">{program.name}</TableCell>
              <TableCell className="capitalize">{program.type}</TableCell>
              <TableCell>
                <Badge variant="outline" className={getStatusBadgeVariant(program.status)}>
                  {program.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">{program.collectedAmount.toLocaleString()}</TableCell>
              <TableCell className="text-right">{program.targetAmount.toLocaleString()}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Progress value={(program.collectedAmount / program.targetAmount) * 100} className="w-[100px] h-2" />
                  <span className="text-xs text-muted-foreground">
                    {Math.round((program.collectedAmount / program.targetAmount) * 100)}%
                  </span>
                </div>
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
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Program
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Program
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
       {programs.length === 0 && (
        <div className="text-center p-8 text-muted-foreground">
          No CSR programs found.
        </div>
      )}
    </ScrollArea>
  );
}
