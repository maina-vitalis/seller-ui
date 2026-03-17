import { Outlet } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useAuthSession } from "@/features/auth/hooks/use-auth-session"
import { SellerLayout } from "@/shared/layouts/seller-layout"
import { apiConfig } from "@/shared/api/config"

export function ProtectedRoute() {
  const { user, isLoading, isAuthenticated, error } = useAuthSession()
  console.log(user, isAuthenticated)

  if (isLoading) {
    return <CenteredMessage title="Checking your session..." />
  }

  if (!isAuthenticated || !user) {
    return (
      <CenteredMessage
        title="Seller session required"
        description={
          error ??
          "Please login from the customer app. Once you are authenticated as a seller, you will be redirected here."
        }
        actionLabel="Go to customer auth"
        onAction={redirectToCustomerAuth}
      />
    )
  }

  if (user.role !== "VENDOR") {
    return (
      <CenteredMessage
        title="Seller access not enabled"
        description="Your account is authenticated, but seller access is not active yet. Contact support or complete seller onboarding in the customer app."
        actionLabel="Return to customer app"
        onAction={redirectToCustomerAuth}
      />
    )
  }

  return (
    <SellerLayout user={user}>
      <Outlet />
    </SellerLayout>
  )
}

type CenteredMessageProps = {
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
}

function CenteredMessage({
  title,
  description,
  actionLabel,
  onAction,
}: Readonly<CenteredMessageProps>) {
  return (
    <main className="flex min-h-svh items-center justify-center p-6">
      <section className="w-full max-w-xl rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
        <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
          {title}
        </h1>
        {description ? (
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        ) : null}
        {actionLabel && onAction ? (
          <Button className="mt-6" onClick={onAction}>
            {actionLabel}
          </Button>
        ) : null}
      </section>
    </main>
  )
}

function redirectToCustomerAuth() {
  window.location.href = apiConfig.customerAuthUrl
}
