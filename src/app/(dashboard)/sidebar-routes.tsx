"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Crown, Home, MessageCircleQuestion } from "lucide-react"
import { SidebarItem } from "./sidebar-item"
import { usePathname } from "next/navigation"
import { usePaywall } from "@/features/subscriptions/hooks/use-paywall"
import { useCheckout } from "@/features/subscriptions/api/use-checkout"

export const SidebarRoutes = () => {
    const mutation = useCheckout()
    const { shouldBlock, isLoading } = usePaywall()
    const pathname = usePathname()


    return (
        <div className="flex flex-col gap-y-4 flex-1">
            {shouldBlock && !isLoading && (
                <>
                <div className="px-3">
                <Button
                    onClick={() => mutation.mutate()}
                    disabled={mutation.isPending}
                    className="w-full rounded-xl border-none hover:bg-white hover:opacity-75 transition"
                    variant="outline"
                    size="lg"
                >
                    <Crown className="mr-2 size-4 fill-yellow-500 text-yellow-500"/>
                    Upgrade to Pro
                </Button>
            </div>
            <div className="px-3">
            <Separator />
            </div>
            </>
            )}
            
            <ul className="flex flex-col gap-y-1 px-3">
                <SidebarItem 
                    href="/"
                    icon={Home}
                    label="Home"
                    isActive={pathname === "/"}
                />
            </ul>
            <div className="px-3">
                <Separator />
            </div>
            <ul className="flex flex-col gap-y-1 px-3">
                <SidebarItem 
                    href={pathname}
                    icon={CreditCard}
                    label="Billing"
                    onClick={() => {}}
                />
                <SidebarItem 
                    href="mailto:imaging@gmail.com"
                    icon={MessageCircleQuestion}
                    label="Get Help"
                />
            </ul>
        </div>
    )
}