'use client'

import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { OrderColumn, columns } from './columns'
import { DataTable } from '@/components/ui/dataTable'

interface OrderClientProps {
  data: OrderColumn[]
}

export default function OrderClient(props: OrderClientProps) {
  const { data } = props
  const { push } = useRouter()
  const params = useParams()

  return (
    <>
      <Heading
        title={`سفارشات (${data.length})`}
        description='مدیریت سفارشات فروشگاه'
      />
      <Separator />
      <DataTable
        columns={columns}
        data={data}
        searchKey='products'
      />
    </>
  )
}
