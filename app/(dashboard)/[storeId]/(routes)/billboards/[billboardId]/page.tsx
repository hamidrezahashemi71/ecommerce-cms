import React from 'react'
import prismadb from '@/lib/prismadb'
import BillboardForm from './components/billboardForm'

interface NewBillboardPageProps {
  params: { billboardId: string }
}

export default async function Billboard(props: NewBillboardPageProps) {
  const { params } = props
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: params.billboardId
    }
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-6 pt-6">
        <BillboardForm
          initialData={billboard}
        />
      </div>
    </div>
  )
}
