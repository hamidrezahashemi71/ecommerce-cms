'use client'

import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'

export default function BillboardClient() {
  const { push } = useRouter()
  const params = useParams()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title='عضو اول آرایه بیلبوردها'
          description='مدیریت بیلبوردهای فروشگاه'
        />
        <Button
          onClick={() => push(`/${params.storeId}/billboards/new`)}
        >
          <Plus className='ml-2 h-4 w-4' />
          {"اضافه کردن"}
        </Button>
      </div>
      <Separator />
    </>
  )
}
