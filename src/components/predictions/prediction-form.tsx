"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from "@/hooks/use-toast";
import type { PredictionInput, PredictionOutput } from '@/types';
import { predictStockNeedsAction } from '@/app/predictions/actions';
import { Loader2, CheckCircle, AlertTriangle, TrendingUp, ShoppingCart, Percent } from 'lucide-react';
import { historicalSalesExample } from '@/lib/placeholder-data';

const predictionFormSchema = z.object({
  productName: z.string().min(3, { message: "Product name must be at least 3 characters." }),
  historicalSalesData: z.string().min(10, { message: "Historical sales data is required." }),
  currentStockQuantity: z.coerce.number().int().min(0, { message: "Stock quantity must be a non-negative integer." }),
  lowStockThreshold: z.coerce.number().int().min(0, { message: "Low stock threshold must be a non-negative integer." }),
});

export function PredictionForm() {
  const [predictionResult, setPredictionResult] = useState<PredictionOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<PredictionInput>({
    resolver: zodResolver(predictionFormSchema),
    defaultValues: {
      productName: "",
      historicalSalesData: historicalSalesExample,
      currentStockQuantity: 50,
      lowStockThreshold: 10,
    },
  });

  const onSubmit: SubmitHandler<PredictionInput> = async (data) => {
    setIsLoading(true);
    setPredictionResult(null);
    try {
      const result = await predictStockNeedsAction(data);
      if (result) {
        setPredictionResult(result);
        toast({
          title: "Prediction Successful",
          description: `AI has predicted stock needs for ${data.productName}.`,
          variant: "default",
        });
      } else {
        throw new Error("Prediction returned no result.");
      }
    } catch (error) {
      console.error("Prediction error:", error);
      toast({
        title: "Prediction Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Predict Stock Needs</CardTitle>
        <CardDescription>Enter product details to get an AI-powered stock prediction.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Kopi Arabika Super" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="historicalSalesData"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Historical Sales Data</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter historical sales data, e.g., 'Jan 2023: 50 units, Feb 2023: 60 units...'"
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Provide data like monthly sales, weekly sales, etc.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="currentStockQuantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Stock Quantity</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 150" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lowStockThreshold"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Low Stock Threshold</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 20" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Predicting...
                </>
              ) : (
                "Get Prediction"
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>

      {predictionResult && (
        <Card className="mt-6 bg-secondary/50 border-secondary shadow-inner">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <CheckCircle className="h-6 w-6" />
              Prediction Result for {form.getValues("productName")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-background rounded-md shadow-sm">
              <div className="flex items-center gap-2 text-sm font-medium">
                <TrendingUp className="h-5 w-5 text-accent" />
                Predicted Demand:
              </div>
              <span className="text-lg font-semibold text-foreground">{predictionResult.predictedDemand} units</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-background rounded-md shadow-sm">
              <div className="flex items-center gap-2 text-sm font-medium">
                <ShoppingCart className="h-5 w-5 text-accent" />
                Reorder Recommendation:
              </div>
              <span className="text-sm text-foreground text-right">{predictionResult.reorderRecommendation}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-background rounded-md shadow-sm">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Percent className="h-5 w-5 text-accent" />
                Confidence Score:
              </div>
              <span className="text-lg font-semibold text-foreground">{predictionResult.confidenceScore}%</span>
            </div>
          </CardContent>
        </Card>
      )}
      {isLoading && !predictionResult &&(
         <div className="mt-6 p-6 flex flex-col items-center justify-center text-muted-foreground bg-secondary/30 rounded-lg">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-3" />
            <p className="text-sm">Generating AI prediction, please wait...</p>
        </div>
      )}
    </Card>
  );
}
