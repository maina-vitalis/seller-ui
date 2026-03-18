import { createBrowserRouter } from "react-router-dom"
import { ProtectedRoute } from "./protected-route"
import { SellerRoot } from "./seller-root"
import { OverviewPage } from "@/features/seller/pages/overview-page"

export const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <SellerRoot />,
        children: [
          { path: "/", element: <OverviewPage /> },
        ],
      },
    ],
  },
])
