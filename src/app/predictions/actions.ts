"use server";

import { predictStockNeeds, type PredictStockNeedsInput, type PredictStockNeedsOutput } from '@/ai/flows/predict-stock-needs';

export async function predictStockNeedsAction(input: PredictStockNeedsInput): Promise<PredictStockNeedsOutput | null> {
  try {
    // console.log("Server Action: Calling predictStockNeeds with input:", input);
    const result = await predictStockNeeds(input);
    // console.log("Server Action: Received result from AI flow:", result);
    if (!result) {
      // console.error("Server Action: AI flow returned null or undefined.");
      throw new Error("AI prediction service did not return a result.");
    }
    return result;
  } catch (error) {
    // console.error("Server Action: Error during AI prediction flow:", error);
    // It's better to let the client handle the error message for user display
    // For server logs, this is good.
    if (error instanceof Error) {
        throw new Error(`Prediction failed: ${error.message}`);
    }
    throw new Error("An unknown error occurred during prediction.");
  }
}
