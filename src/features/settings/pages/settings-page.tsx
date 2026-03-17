import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Store Settings</h1>
        <p className="text-muted-foreground">
          Configure your store preferences
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Store Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-12">
            Store settings interface coming soon...
          </p>
        </CardContent>
      </Card>
    </div>
  )
}