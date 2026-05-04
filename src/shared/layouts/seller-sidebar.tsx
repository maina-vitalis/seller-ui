import { useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Wallet,
  Settings,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { useGetAllStoresQuery } from "@/features/seller/api/seller-api"
import { setActiveStore } from "@/features/seller/storeSlice"
import { useAppDispatch, useAppSelector } from "../store"

const navItems = [
  { label: "Overview", href: "/", icon: LayoutDashboard },
  { label: "Products", href: "/products", icon: Package },
  { label: "Orders", href: "/orders", icon: ShoppingCart },
  { label: "Payouts", href: "/payouts", icon: Wallet },
  { label: "Settings", href: "/settings", icon: Settings },
]

export function SellerSidebar() {
  const location = useLocation()
  const { isError, data, isLoading } = useGetAllStoresQuery()
  const [open, setOpen] = useState(false)
  const activeStore = useAppSelector((state) => state.activeStore.activeStoreId)
  const dispatch = useAppDispatch()

  const stores = data?.store ?? []
  const selectedStore =
    stores.find((store) => store.id === activeStore) ?? stores[0]

  //function to handle the store change
  function handleStoreChange(id: string) {
    dispatch(setActiveStore(id))
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild disabled={isLoading || isError}>
            <Button
              variant="outline"
              className="w-full justify-between bg-sidebar-accent/50"
            >
              <div className="flex min-w-0 flex-col items-start gap-0.5 text-left">
                <span className="truncate font-medium">
                  {isLoading
                    ? "Loading stores..."
                    : (selectedStore?.storeName ?? "Select a store")}
                </span>
              </div>
            </Button>
          </PopoverTrigger>

          <PopoverContent
            className="w-[--radix-popover-trigger-width] p-0"
            align="start"
          >
            <Command className="w-full">
              <CommandInput placeholder="Search stores..." />
              <CommandList>
                <CommandEmpty>
                  {stores.length > 0
                    ? "No stores match your search."
                    : "No stores found."}
                </CommandEmpty>
                <CommandGroup>
                  {stores.map((store) => (
                    <CommandItem
                      key={store.id}
                      value={`${store.storeName} ${store.businessType}`}
                      onSelect={() => handleStoreChange(store.id)}
                    >
                      <div className="flex flex-col items-start gap-0.5">
                        <span className="font-medium">{store.storeName}</span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      item.href === "/"
                        ? location.pathname === "/"
                        : location.pathname.startsWith(item.href)
                    }
                    tooltip={item.label}
                  >
                    <NavLink to={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter />
      <SidebarRail />
    </Sidebar>
  )
}
