import type { UserProfile } from "@/features/auth/types"
import { useSellerOverview } from "@/features/seller/hooks/use-seller-overview"

type SellerDashboardProps = {
  user: UserProfile
}

export function SellerDashboard({ user }: Readonly<SellerDashboardProps>) {
  const { isLoading, data, error } = useSellerOverview()

  return (
    <main className="mx-auto flex min-h-svh w-full max-w-6xl flex-col gap-6 p-6 md:p-10">
      <header className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <p className="text-sm text-muted-foreground">Seller Console</p>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Welcome back{user.name ? `, ${user.name}` : ""}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>
      </header>

      {isLoading ? (
        <section className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">
          Loading your seller data...
        </section>
      ) : null}

      {error ? (
        <section className="rounded-2xl border border-destructive/30 bg-destructive/10 p-6 text-sm text-destructive">
          {error}
        </section>
      ) : null}

      {data ? (
        <>
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Products" value={data.stats.totalProducts} />
            <StatCard label="Active Orders" value={data.stats.activeOrders} />
            <StatCard
              label="Monthly Revenue"
              value={`$${data.stats.monthlyRevenue.toLocaleString()}`}
            />
            <StatCard
              label="Pending Payout"
              value={`$${data.stats.pendingPayout.toLocaleString()}`}
            />
          </section>

          <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Recent Orders</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="text-muted-foreground">
                  <tr>
                    <th className="pr-4 pb-3 font-medium">Order</th>
                    <th className="pr-4 pb-3 font-medium">Customer</th>
                    <th className="pr-4 pb-3 font-medium">Amount</th>
                    <th className="pr-4 pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data.recentOrders.map((order) => (
                    <tr key={order.id} className="border-t border-border/60">
                      <td className="py-3 pr-4 font-medium">#{order.id}</td>
                      <td className="py-3 pr-4">{order.customerName}</td>
                      <td className="py-3 pr-4">${order.amount.toFixed(2)}</td>
                      <td className="py-3 pr-4">{order.status}</td>
                      <td className="py-3">{formatDate(order.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      ) : null}
    </main>
  )
}

type StatCardProps = {
  label: string
  value: string | number
}

function StatCard({ label, value }: Readonly<StatCardProps>) {
  return (
    <article className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <p className="text-xs tracking-wide text-muted-foreground uppercase">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold tracking-tight">{value}</p>
    </article>
  )
}

function formatDate(input: string): string {
  const date = new Date(input)

  if (Number.isNaN(date.getTime())) {
    return "-"
  }

  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date)
}
