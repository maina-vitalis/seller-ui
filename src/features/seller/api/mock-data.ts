import type { SellerOverview } from "@/features/seller/types"

export const mockSellerOverview: SellerOverview = {
  stats: {
    totalProducts: 24,
    activeOrders: 12,
    monthlyRevenue: 5240,
    pendingPayout: 1850,
  },
  recentOrders: [
    {
      id: "ORD-2025-001",
      customerName: "Alice Johnson",
      amount: 89.99,
      status: "Delivered",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "ORD-2025-002",
      customerName: "Bob Smith",
      amount: 245.5,
      status: "Processing",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "ORD-2025-003",
      customerName: "Carol White",
      amount: 120.0,
      status: "Pending",
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "ORD-2025-004",
      customerName: "David Brown",
      amount: 340.99,
      status: "Delivered",
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "ORD-2025-005",
      customerName: "Eva Davis",
      amount: 56.75,
      status: "Processing",
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    },
  ],
}
