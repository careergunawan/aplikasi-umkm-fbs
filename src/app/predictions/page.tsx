import { PageHeader } from "@/components/page-header";
import { PredictionForm } from "@/components/predictions/prediction-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, History } from "lucide-react";

export default function PredictionsPage() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-6 lg:p-8">
      <PageHeader 
        title="AI Stock Predictions"
        description="Leverage AI to predict stock needs and optimize inventory."
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PredictionForm />
        </div>
        <div className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-accent" />
                How it Works
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                This tool uses an AI model to analyze historical sales data, current stock levels, and your defined low stock threshold.
              </p>
              <p>
                Based on these inputs, it predicts future demand and provides a recommendation on whether to reorder the product and suggests a quantity.
              </p>
              <p>
                A confidence score (0-100) indicates the AI's certainty in its prediction.
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5 text-accent" />
                Prediction History
              </CardTitle>
              <CardDescription>View past predictions for this product.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p>Prediction history feature coming soon.</p>
              {/* Placeholder for history list or chart */}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
