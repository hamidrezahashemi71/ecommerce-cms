import React from 'react'
import CategoryClient from './components/client'
import prismadb from '@/lib/prismadb'
import { CategoryColumn } from './components/columns'
import moment from "jalali-moment"

export default async function Categories(props: DashboardLayoutProps) {
  const { params } = props
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId
    },
    include: {
      billboard: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const formattedCategories: CategoryColumn[] = categories.map((category) => ({
    id: category.id,
    name: category.name,
    billboardLabel: category.billboard.label,
    createdAt: moment(category.createdAt).format('jYYYY/jM/jD')
  }))

  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  )
}
