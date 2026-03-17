import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function PayoutsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Payouts</h1>
        <p className="text-muted-foreground">
          View your earnings and payout history
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payout Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-12">
            Payout management interface coming soon...
          </p>
        </CardContent>
      </Card>
    </div>
  )
}