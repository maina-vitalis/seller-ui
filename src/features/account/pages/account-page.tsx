import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AccountPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Account</h1>
        <p className="text-muted-foreground">
          Manage your account settings
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-12">
            Account settings interface coming soon...
          </p>
        </CardContent>
      </Card>
    </div>
  )
}