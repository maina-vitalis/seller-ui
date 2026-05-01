import { Outlet } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useAuthSession } from "@/features/auth/hooks/use-auth-session"
import { apiConfig } from "@/shared/api/config"

export function ProtectedRoute() {
  const { user, isLoading, isAuthenticated, error } = useAuthSession()

  if (isLoading) {
    return <AuthGate title="Checking your session..." />
  }

  if (!isAuthenticated || !user) {
    return (
      <AuthGate
        title="Seller session required"
        description={
          error ??
          "Please login from the customer app. Once authenticated as a seller, you will be redirected here."
        }
        actionLabel="Go to customer app"
        onAction={redirectToCustomerAuth}
      />
    )
  }

  const isVendor = user.role.some((r) => r.role === "VENDOR")

  if (user && !isVendor) {
    return (
      <AuthGate
        title="Seller access not enabled"
        description="Your account is authenticated, but seller access is not active yet. Contact support or complete seller onboarding in the customer app."
        actionLabel="Return to customer app"
        onAction={redirectToCustomerAuth}
      />
    )
  }

  return <Outlet context={{ user }} />
}

type AuthGateProps = {
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
}

function AuthGate({
  title,
  description,
  actionLabel,
  onAction,
}: Readonly<AuthGateProps>) {
  return (
    <main className="flex min-h-svh items-center justify-center p-6">
      <section className="w-full max-w-md border border-border bg-card p-8 text-center shadow-sm">
        <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
        {description && (
          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        )}
        {actionLabel && onAction && (
          <Button className="mt-6 rounded-none" onClick={onAction}>
            {actionLabel}
          </Button>
        )}
      </section>
    </main>
  )
}

function redirectToCustomerAuth() {
  globalThis.location.href = apiConfig.customerAuthUrl
}
