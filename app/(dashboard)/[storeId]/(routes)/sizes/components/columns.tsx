"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cellAction"

export type SizeColumn = {
  id: string
  name: string
  value: string
  createdAt: string
}

export const columns: ColumnDef<SizeColumn>[] = [
  {
    accessorKey: "name",
    header: "سایز",
  },
  {
    accessorKey: "value",
    header: "مقدار",
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
