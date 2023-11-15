"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CheckCircle, XCircle } from "lucide-react"

export type OrderColumn = {
  id: string
  phone: string
  address: string
  isPaid: boolean
  totalPrice: string
  products: string
  createdAt: string
}

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "products",
    header: "محصولات",
  },
  {
    accessorKey: "phone",
    header: "تلفن",
  },
  {
    accessorKey: "address",
    header: "آدرس",
  },
  {
    accessorKey: "totalPrice",
    header: "قیمت کل",
  },
  {
    accessorKey: "isPaid",
    header: "وضعیت پرداخت",
    cell: ({ row }) => (
      row.original.isPaid
      ? <CheckCircle className="h-4 w-4 text-green-500" />
      : <XCircle className="h-4 w-4 text-red-500" />
  )
  },
  {
    accessorKey: "createdAt",
    header: "تاریخ ایجاد",
  },
]
