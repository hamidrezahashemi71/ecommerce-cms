import React from 'react'
import BillboardClient from './components/client'
import prismadb from '@/lib/prismadb'
import { BillboardColumn } from './components/columns'
import moment from "jalali-moment"

export default async function Billboards(props: DashboardLayoutProps) {
  const { params } = props

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const formattedBillboards: BillboardColumn[] = billboards.map((billboard) => ({
    id: billboard.id,
    label: billboard.label,
    createdAt: moment(billboard.createdAt).format('jYYYY/jM/jD')
  }))

  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  )
}
