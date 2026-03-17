import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Package, ShoppingCart, Clock } from "lucide-react"

type DashboardStatsProps = {
  stats: {
    totalProducts: number
    activeOrders: number
    monthlyRevenue: number
    pendingPayout: number
  }
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  const statItems = [
    {
      title: "Total Revenue",
      value: `$${stats.monthlyRevenue.toLocaleString()}`,
      icon: DollarSign,
      description: "This month",
    },
    {
      title: "Total Orders",
      value: stats.activeOrders.toString(),
      icon: ShoppingCart,
      description: "Active orders",
    },
    {
      title: "Pending Orders",
      value: stats.activeOrders.toString(),
      icon: Clock,
      description: "Awaiting fulfillment",
    },
    {
      title: "Active Listings",
      value: stats.totalProducts.toString(),
      icon: Package,
      description: "Published products",
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statItems.map((item) => (
        <Card key={item.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {item.title}
            </CardTitle>
            <item.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
            <p className="text-xs text-muted-foreground">
              {item.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}