import type { Product, CsrProgram, Sale, DailySaleSummary, SalesChartData, StockStatusChartData, CsrProgressChartData } from '@/types';

export const placeholderProducts: Product[] = [
  { id: 'prod_1', name: 'Kopi Arabika Super', sku: 'KAS001', stockQuantity: 150, lowStockThreshold: 20, category: 'Minuman', price: 25000, status: 'In Stock', imageUrl: 'https://picsum.photos/200/200?random=1', data_ai_hint: "coffee beans" },
  { id: 'prod_2', name: 'Snack Kentang Pedas', sku: 'SKP002', stockQuantity: 15, lowStockThreshold: 10, category: 'Makanan Ringan', price: 12000, status: 'Low Stock', imageUrl: 'https://picsum.photos/200/200?random=2', data_ai_hint: "potato chips" },
  { id: 'prod_3', name: 'Sabun Mandi Herbal', sku: 'SMH003', stockQuantity: 0, lowStockThreshold: 15, category: 'Perawatan Diri', price: 18000, status: 'Out of Stock', imageUrl: 'https://picsum.photos/200/200?random=3', data_ai_hint: "soap bar" },
  { id: 'prod_4', name: 'Teh Melati Celup', sku: 'TMC004', stockQuantity: 200, lowStockThreshold: 30, category: 'Minuman', price: 15000, status: 'In Stock', imageUrl: 'https://picsum.photos/200/200?random=4', data_ai_hint: "tea bags" },
  { id: 'prod_5', name: 'Minyak Goreng Sehat', sku: 'MGS005', stockQuantity: 45, lowStockThreshold: 50, category: 'Bahan Pokok', price: 35000, status: 'In Stock', imageUrl: 'https://picsum.photos/200/200?random=5', data_ai_hint: "cooking oil" },
];

export const placeholderCsrPrograms: CsrProgram[] = [
  { id: 'csr_1', name: 'Bantu Pendidikan Anak Lokal', type: 'donation', targetAmount: 5000000, collectedAmount: 3500000, status: 'Active', startDate: '2024-01-01', endDate: '2024-12-31' },
  { id: 'csr_2', name: 'Tanam Pohon untuk Masa Depan', type: 'environmental', targetAmount: 2000000, collectedAmount: 2000000, status: 'Completed', startDate: '2023-06-01', endDate: '2023-09-30' },
  { id: 'csr_3', name: 'Dukungan Komunitas Lansia', type: 'community', targetAmount: 3000000, collectedAmount: 1200000, status: 'Active', startDate: '2024-03-01' },
];

export const placeholderSales: Sale[] = [
  { id: 'sale_1', date: '2024-07-20T10:30:00Z', customerName: 'Budi Santoso', totalAmount: 150000, paymentMethod: 'QRIS', staffMember: 'Ani', status: 'Completed' },
  { id: 'sale_2', date: '2024-07-20T11:45:00Z', customerName: 'Citra Lestari', totalAmount: 75000, paymentMethod: 'Digital Wallet', staffMember: 'Rudi', status: 'Completed' },
  { id: 'sale_3', date: '2024-07-19T15:00:00Z', customerName: 'Dewi Anggraini', totalAmount: 220000, paymentMethod: 'Card', staffMember: 'Ani', status: 'Completed' },
  { id: 'sale_4', date: '2024-07-19T09:15:00Z', customerName: 'Eko Prasetyo', totalAmount: 50000, paymentMethod: 'Cash', staffMember: 'Sari', status: 'Pending' },
];

export const placeholderDailySalesSummary: DailySaleSummary[] = [
  { date: '2024-07-20', totalTransactions: 120, totalRevenue: 15750000 },
  { date: '2024-07-19', totalTransactions: 110, totalRevenue: 14200000 },
  { date: '2024-07-18', totalTransactions: 105, totalRevenue: 13800000 },
];

export const placeholderSalesChartData: SalesChartData[] = [
  { month: "Jan", totalSales: Math.floor(Math.random() * 5000) + 1000 },
  { month: "Feb", totalSales: Math.floor(Math.random() * 5000) + 1000 },
  { month: "Mar", totalSales: Math.floor(Math.random() * 5000) + 1000 },
  { month: "Apr", totalSales: Math.floor(Math.random() * 5000) + 1000 },
  { month: "May", totalSales: Math.floor(Math.random() * 5000) + 1000 },
  { month: "Jun", totalSales: Math.floor(Math.random() * 5000) + 1000 },
];

export const placeholderStockStatusChartData: StockStatusChartData[] = [
  { status: "In Stock", count: placeholderProducts.filter(p => p.status === 'In Stock').length },
  { status: "Low Stock", count: placeholderProducts.filter(p => p.status === 'Low Stock').length },
  { status: "Out of Stock", count: placeholderProducts.filter(p => p.status === 'Out of Stock').length },
];

export const placeholderCsrProgressChartData: CsrProgressChartData[] = placeholderCsrPrograms.map(p => ({
  programName: p.name.substring(0, 20) + (p.name.length > 20 ? "..." : ""), // Shorten name for chart
  collected: p.collectedAmount,
  target: p.targetAmount,
}));

export const historicalSalesExample = `Jan 2024: 50 units
Feb 2024: 65 units
Mar 2024: 80 units
Apr 2024: 70 units
May 2024: 90 units
Jun 2024: 100 units`;
