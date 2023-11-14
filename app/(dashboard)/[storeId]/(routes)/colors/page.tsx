import React from 'react'
import ColorClient from './components/client'
import prismadb from '@/lib/prismadb'
import { ColorColumn } from './components/columns'
import moment from "jalali-moment"

export default async function Colors(props: DashboardLayoutProps) {
  const { params } = props

  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const formattedColors: ColorColumn[] = colors.map((color) => ({
    id: color.id,
    name: color.name,
    value: color.value,
    createdAt: moment(color.createdAt).format('jYYYY/jM/jD')
  }))

  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorClient data={formattedColors} />
      </div>
    </div>
  )
}
