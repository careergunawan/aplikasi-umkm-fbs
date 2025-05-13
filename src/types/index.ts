// Placeholder types - expand as needed

export interface Product {
  id: string;
  name: string;
  sku: string;
  stockQuantity: number;
  lowStockThreshold: number;
  category?: string;
  price: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  imageUrl?: string;
  lastRestocked?: string; // ISO Date string
  predictedDemand?: number;
}

export interface CsrProgram {
  id: string;
  name: string;
  type: 'donation' | 'environmental' | 'community';
  targetAmount: number;
  collectedAmount: number;
  status: 'Active' | 'Completed' | 'Upcoming';
  startDate: string; // ISO Date string
  endDate?: string; // ISO Date string
}

export interface Sale {
  id: string;
  date: string; // ISO Date string
  customerName: string;
  totalAmount: number;
  paymentMethod: 'Cash' | 'Card' | 'QRIS' | 'Digital Wallet';
  staffMember: string;
  status: 'Completed' | 'Pending' | 'Refunded';
}

export interface DailySaleSummary {
  date: string;
  totalTransactions: number;
  totalRevenue: number;
}

// For AI Stock Prediction Form
export interface PredictionInput {
  productName: string;
  historicalSalesData: string;
  currentStockQuantity: number;
  lowStockThreshold: number;
}

export interface PredictionOutput {
  predictedDemand: number;
  reorderRecommendation: string;
  confidenceScore: number;
}

// Chart data structures
export interface SalesChartData {
  month: string;
  totalSales: number;
}

export interface StockStatusChartData {
  status: string;
  count: number;
}

export interface CsrProgressChartData {
  programName: string;
  collected: number;
  target: number;
}
