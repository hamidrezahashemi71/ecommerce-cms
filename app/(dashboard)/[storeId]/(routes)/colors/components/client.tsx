'use client'

import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { ColorColumn, columns } from './columns'
import { DataTable } from '@/components/ui/dataTable'
import ApiList from '@/components/ui/apiList'

interface ColorClientProps {
  data: ColorColumn[]
}

export default function ColorClient(props: ColorClientProps) {
  const { data } = props
  const { push } = useRouter()
  const params = useParams()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`رنگ ها (${data.length})`}
          description='مدیریت رنگ های فروشگاه'
        />
        <Button
          onClick={() => push(`/${params.storeId}/colors/new`)}
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
      <Heading title='ای پی آی' description='ای پی آی های مربوط به رنگ ها' />
      <Separator />
      <ApiList entityName='colors' entityIdName='colorId'/>
    </>
  )
}
