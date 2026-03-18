import { mockSellerOverview } from "@/features/seller/api/mock-data"
import { DashboardStats } from "../components/dashboard-stats"
import { RecentOrders } from "../components/recent-orders"

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your store performance
        </p>
      </div>

      <DashboardStats stats={mockSellerOverview.stats} />
      <RecentOrders orders={mockSellerOverview.recentOrders} />
    </div>
  )
}
