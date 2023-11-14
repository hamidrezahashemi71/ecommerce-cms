"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cellAction"

export type ProductColumn = {
  id: string
  name: string
  price: string
  category: string
  size: string
  color: string
  isFeatured: boolean
  isArchived: boolean
  createdAt: string
}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "نام محصول",
  },
  {
    accessorKey: "isArchived",
    header: "ناموجود",
  },
  {
    accessorKey: "isFeatured",
    header: "فروش ویژه",
  },
  {
    accessorKey: "price",
    header: "قیمت",
  },
  {
    accessorKey: "category",
    header: "دسته بندی",
  },
  {
    accessorKey: "size",
    header: "سایز",
  },
  {
    accessorKey: "color",
    header: "رنگ",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.color}
        <div
          className="h-6 w-6 rounded-full border"
          style={{ backgroundColor: row.original.color }}
        />
      </div>
    )
  },
  {
    accessorKey: "createdAt",
    header: "تاریخ ایجاد",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
]
