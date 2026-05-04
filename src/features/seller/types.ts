export type SellerOverview = {
  stats: {
    totalProducts: number
    activeOrders: number
    monthlyRevenue: number
    pendingPayout: number
  }
  recentOrders: Array<{
    id: string
    customerName: string
    amount: number
    status: string
    createdAt: string
  }>
}
export interface Store {
  id: string
  storeName: string
  registeredName: string | null
  description: string
  businessType: string // You could use a union here like 'Corp' | 'Individual'
  status: "ONBOARDING" | "ACTIVE" | "SUSPENDED" // Suggested union based on context
  idDocumentUrl: string | null
  taxDocument: string | null
  bankAccountNumber: string | null
  routingNumber: string | null
  logoUrl: string | null
  bannerUrl: string | null
  isVerified: boolean
  vendorProfileId: string
  createdAt: string // Use Date if you plan to parse it immediately
  updatedAt: string
}

export interface SellerStores {
  id: string
  userId: string
  description: string | null
  isVerified: boolean
  KYCUrl: string | null
  createdAt: string
  updatedAt: string
  store: Store[]
}
