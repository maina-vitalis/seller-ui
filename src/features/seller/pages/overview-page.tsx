import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { useSellerOverview } from "@/features/seller/hooks/use-seller-overview"
import {
  OverviewStats,
  OverviewStatsSkeleton,
} from "../components/overview-stats"
import {
  RecentOrdersTable,
  RecentOrdersTableSkeleton,
} from "../components/recent-orders-table"

export function OverviewPage() {
  const { isLoading, data, error } = useSellerOverview()

  console.log(isLoading)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
        <p className="text-sm text-muted-foreground">
          Your store performance at a glance
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {isLoading ? (
        <>
          <OverviewStatsSkeleton />
          <RecentOrdersTableSkeleton />
        </>
      ) : data ? (
        <>
          <OverviewStats stats={data.stats} />
          <RecentOrdersTable orders={data.recentOrders} />
        </>
      ) : null}
    </div>
  )
}
