'use client'

import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { SizeColumn, columns } from './columns'
import { DataTable } from '@/components/ui/dataTable'
import ApiList from '@/components/ui/apiList'

interface SizeClientProps {
  data: SizeColumn[]
}

export default function SizeClient(props: SizeClientProps) {
  const { data } = props
  const { push } = useRouter()
  const params = useParams()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`سایزها (${data.length})`}
          description='مدیریت سایزهای فروشگاه'
        />
        <Button
          onClick={() => push(`/${params.storeId}/sizes/new`)}
        >
          <Plus className='ml-2 h-4 w-4' />
          {"اضافه کردن"}
        </Button>
      </div>
      <Separator />
      <DataTable
        columns={columns}
        data={data}
        searchKey='name'
      />
      <Heading title='ای پی آی' description='ای پی آی های مربوط به سایزها' />
      <Separator />
      <ApiList entityName='sizes' entityIdName='sizeId'/>
    </>
  )
}
