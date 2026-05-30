import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom"

export function RouteErrorPage() {
  const error = useRouteError()
  const message = resolveErrorMessage(error)

  return (
    <main className="flex min-h-svh items-center justify-center p-6">
      <section className="w-full max-w-lg rounded-3xl border border-border bg-card p-8 shadow-sm">
        <p className="text-sm font-medium tracking-[0.2em] text-muted-foreground uppercase">
          Unexpected error
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
          Something went wrong
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {message}
        </p>
        <div className="mt-6">
          <Link
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            to="/"
          >
            Go back to overview
          </Link>
        </div>
      </section>
    </main>
  )
}

function resolveErrorMessage(error: unknown): string {
  if (isRouteErrorResponse(error)) {
    return `${error.status} ${error.statusText}`.trim()
  }

  if (error instanceof Error && error.message) {
    return error.message
  }

  return "The page could not be rendered. Please try again."
}
