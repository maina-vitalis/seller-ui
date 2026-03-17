import { createBrowserRouter } from "react-router-dom"
import { ProtectedRoute } from "./protected-route"
import { DashboardPage } from "@/features/dashboard/pages/dashboard-page"
import { ProductsPage } from "@/features/products/pages/products-page"
import { OrdersPage } from "@/features/orders/pages/orders-page"
import { PayoutsPage } from "@/features/payouts/pages/payouts-page"
import { SettingsPage } from "@/features/settings/pages/settings-page"
import { AccountPage } from "@/features/account/pages/account-page"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "orders",
        element: <OrdersPage />,
      },
      {
        path: "payouts",
        element: <PayoutsPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
      {
        path: "account",
        element: <AccountPage />,
      },
    ],
  },
])