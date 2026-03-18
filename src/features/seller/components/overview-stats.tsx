import { DollarSign, Package, ShoppingCart, Wallet } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import type { SellerOverview } from "@/features/seller/types"

type OverviewStatsProps = {
  stats: SellerOverview["stats"]
}

const statConfig = [
  {
    key: "monthlyRevenue" as const,
    label: "Monthly Revenue",
    icon: DollarSign,
    format: (v: number) => `$${v.toLocaleString()}`,
    description: "This month",
  },
  {
    key: "activeOrders" as const,
    label: "Active Orders",
    icon: ShoppingCart,
    format: (v: number) => v.toString(),
    description: "Awaiting fulfillment",
  },
  {
    key: "totalProducts" as const,
    label: "Active Listings",
    icon: Package,
    format: (v: number) => v.toString(),
    description: "Published products",
  },
  {
    key: "pendingPayout" as const,
    label: "Pending Payout",
    icon: Wallet,
    format: (v: number) => `$${v.toLocaleString()}`,
    description: "Available to withdraw",
  },
]

export function OverviewStats({ stats }: OverviewStatsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statConfig.map(({ key, label, icon: Icon, format, description }) => (
        <Card key={key}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{label}</CardTitle>
            <Icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{format(stats[key])}</div>
            <p className="text-xs text-muted-foreground">{description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export function OverviewStatsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-4 rounded" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-20 mb-1" />
            <Skeleton className="h-3 w-32" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
