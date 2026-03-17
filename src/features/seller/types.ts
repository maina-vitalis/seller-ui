export type SellerOverview = {
  stats: {
    totalProducts: number
    activeOrders: number
    monthlyRevenue: number
    pendingPayout: number
  }
  recentOrders: Array<{
    id: string
    customerName: string
    amount: number
    status: string
    createdAt: string
  }>
}
