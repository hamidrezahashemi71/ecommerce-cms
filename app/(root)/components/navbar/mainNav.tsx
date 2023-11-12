'use client'

import { cn } from "@/lib/utils"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"

export default function MainNav({
  className,
  ...props
} : React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()
  const params = useParams()

  const routes = [
    {
      href: `/${params.storeId}`,
      label: 'خانه',
      active: pathname === `/${params.storeId}`
    },
    {
      href: `/${params.storeId}/billboards`,
      label: 'بیلبوردها',
      active: pathname === `/${params.storeId}/billboards`
    },
    {
      href: `/${params.storeId}/settings`,
      label: 'تنظیمات',
      active: pathname === `/${params.storeId}/settings`
    },
  ]

  return (
    <nav className={cn("flex items-center gap-x-6 ", className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm hover:text-primary transition-all",
            route.active ? "text-black dark:text-white font-medium" : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  )
}
