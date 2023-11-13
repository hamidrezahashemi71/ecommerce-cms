"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cellAction"

export type CategoryColumn = {
  id: string
  name: string
  billboardLabel: string
  createdAt: string
}

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "عنوان",
  },
  {
    accessorKey: "billboard",
    header: "بیلبورد",
    cell: ({ row }) => row.original.billboardLabel
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
