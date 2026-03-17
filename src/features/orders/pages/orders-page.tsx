import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function OrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
        <p className="text-muted-foreground">
          Track and manage your orders
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-12">
            Order management interface coming soon...
          </p>
        </CardContent>
      </Card>
    </div>
  )
}