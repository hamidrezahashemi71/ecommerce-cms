import React from 'react'
import prismadb from '@/lib/prismadb'
import SizeForm from './components/sizeForm'

interface NewSizePageProps {
  params: { sizeId: string }
}

export default async function Size(props: NewSizePageProps) {
  const { params } = props

  const size = await prismadb.size.findUnique({
    where: {
      id: params.sizeId
    }
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-6 pt-6">
        <SizeForm
          initialData={size}
        />
      </div>
    </div>
  )
}
