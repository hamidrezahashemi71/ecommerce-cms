import React from 'react'
import ProductClient from './components/client'
import prismadb from '@/lib/prismadb'
import { ProductColumn } from './components/columns'
import moment from "jalali-moment"
import { formatter } from '@/lib/utils'

export default async function Products(props: DashboardLayoutProps) {
  const { params } = props

  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId
    },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const formattedProducts: ProductColumn[] = products.map((product) => ({
    id: product.id,
    name: product.name,
    price: formatter.format(Number(product.price)),
    isFeatured: product.isFeatured,
    isArchived: product.isArchived,
    category: product.category.name,
    size: product.size.name,
    color: product.color.value,
    createdAt: moment(product.createdAt).format('jYYYY/jM/jD')
  }))

  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  )
}
