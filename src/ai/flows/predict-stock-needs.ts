// use server'
'use server';

/**
 * @fileOverview Predicts stock needs for each product using AI.
 *
 * - predictStockNeeds - A function that handles the stock prediction process.
 * - PredictStockNeedsInput - The input type for the predictStockNeeds function.
 * - PredictStockNeedsOutput - The return type for the predictStockNeeds function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictStockNeedsInputSchema = z.object({
  productName: z.string().describe('The name of the product.'),
  historicalSalesData: z
    .string()
    .describe(
      'Historical sales data for the product, including dates and quantities sold.'
    ),
  currentStockQuantity: z
    .number()
    .describe('The current stock quantity of the product.'),
  lowStockThreshold: z
    .number()
    .describe(
      'The threshold at which the stock is considered low and needs reordering.'
    ),
});
export type PredictStockNeedsInput = z.infer<typeof PredictStockNeedsInputSchema>;

const PredictStockNeedsOutputSchema = z.object({
  predictedDemand: z
    .number()
    .describe('The predicted demand for the product in the near future.'),
  reorderRecommendation: z
    .string()
    .describe(
      'A recommendation on whether to reorder the product and the suggested quantity.'
    ),
  confidenceScore: z
    .number()
    .describe('A confidence score (0-100) for the prediction.'),
});
export type PredictStockNeedsOutput = z.infer<typeof PredictStockNeedsOutputSchema>;

export async function predictStockNeeds(input: PredictStockNeedsInput): Promise<PredictStockNeedsOutput> {
  return predictStockNeedsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictStockNeedsPrompt',
  input: {schema: PredictStockNeedsInputSchema},
  output: {schema: PredictStockNeedsOutputSchema},
  prompt: `You are an AI assistant that predicts stock needs for products based on historical sales data.

  Analyze the following information to determine the predicted demand and reorder recommendation for the product.

  Product Name: {{{productName}}}
  Historical Sales Data: {{{historicalSalesData}}}
  Current Stock Quantity: {{{currentStockQuantity}}}
  Low Stock Threshold: {{{lowStockThreshold}}}

  Based on this information, provide a predicted demand, a reorder recommendation, and a confidence score for the prediction.
  `,
});

const predictStockNeedsFlow = ai.defineFlow(
  {
    name: 'predictStockNeedsFlow',
    inputSchema: PredictStockNeedsInputSchema,
    outputSchema: PredictStockNeedsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
