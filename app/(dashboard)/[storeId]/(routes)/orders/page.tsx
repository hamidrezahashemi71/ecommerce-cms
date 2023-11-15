import React from 'react'
import OrderClient from './components/client'
import prismadb from '@/lib/prismadb'
import { OrderColumn } from './components/columns'
import moment from "jalali-moment"
import { formatter } from '@/lib/utils'

export default async function Orders(props: DashboardLayoutProps) {
  const { params } = props

  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId
    },
    include: {
      orderItem: {
        include: {
          product: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const formattedOrders: OrderColumn[] = orders.map((order) => ({
    id: order.id,
    phone: order.phone,
    address: order.address,
    products: order.orderItem.map((item) => item.product.name).join(', '),
    isPaid: order.isPaid,
    totalPrice: formatter.format(order.orderItem.reduce((total, item) => {
      return total + Number(item.product.price)
    }, 0)),
    createdAt: moment(order.createdAt).format('jYYYY/jM/jD')
  }))

  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  )
}
