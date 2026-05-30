import { createBrowserRouter } from "react-router-dom"
import { ProtectedRoute } from "./protected-route"
import { SellerRoot } from "./seller-root"
import { OverviewPage } from "@/features/seller/pages/overview-page"
import { ProductsPage } from "@/features/products/pages/products-page"
import { AddProductPage } from "@/features/products/pages/add-product-page"
import { RouteErrorPage } from "./route-error"

export const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    errorElement: <RouteErrorPage />,
    children: [
      {
        element: <SellerRoot />,
        children: [
          { path: "/", element: <OverviewPage /> },
          { path: "/products", element: <ProductsPage /> },
          { path: "/products/new", element: <AddProductPage /> },
        ],
      },
    ],
  },
])
