import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { CsrProgramTable } from "@/components/csr/csr-program-table";
import { placeholderCsrPrograms } from "@/lib/placeholder-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CsrPage() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-6 lg:p-8">
      <PageHeader 
        title="CSR Programs"
        description="Manage your Corporate Social Responsibility initiatives."
        actions={
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Program
          </Button>
        }
      />
      <Tabs defaultValue="active_programs">
        <TabsList className="mb-4">
          <TabsTrigger value="active_programs">Active Programs</TabsTrigger>
          <TabsTrigger value="completed_programs">Completed Programs</TabsTrigger>
          <TabsTrigger value="all_programs">All Programs</TabsTrigger>
        </TabsList>
        <TabsContent value="active_programs">
           <CsrProgramTable programs={placeholderCsrPrograms.filter(p => p.status === 'Active')} />
        </TabsContent>
        <TabsContent value="completed_programs">
           <CsrProgramTable programs={placeholderCsrPrograms.filter(p => p.status === 'Completed')} />
        </TabsContent>
         <TabsContent value="all_programs">
           <CsrProgramTable programs={placeholderCsrPrograms} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
