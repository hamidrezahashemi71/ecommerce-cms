"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cellAction"

export type ColorColumn = {
  id: string
  name: string
  value: string
  createdAt: string
}

export const columns: ColumnDef<ColorColumn>[] = [
  {
    accessorKey: "name",
    header: "رنگ",
  },
  {
    accessorKey: "value",
    header: "مقدار",
    cell: ({ row }) => (
      <div className="flex items-center justify-start gap-x-2">
        <div
          className="h-6 w-6 rounded-full border"
          style={{ backgroundColor: row.original.value }}
        />
        {row.original.value}
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
