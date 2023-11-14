import React from 'react'
import prismadb from '@/lib/prismadb'
import ColorForm from './components/colorForm'

interface NewColorPageProps {
  params: { colorId: string }
}

export default async function Color(props: NewColorPageProps) {
  const { params } = props

  const color = await prismadb.color.findUnique({
    where: {
      id: params.colorId
    }
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-6 pt-6">
        <ColorForm
          initialData={color}
        />
      </div>
    </div>
  )
}
