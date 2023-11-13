import React from 'react'
import prismadb from '@/lib/prismadb'
import CategoryForm from './components/categoryForm'

interface NewCategoryPageProps {
  params: { categoryId: string, storeId: string }
}

export default async function Category(props: NewCategoryPageProps) {
  const { params } = props

  const category = await prismadb.category.findUnique({
    where: {
      id: params.categoryId
    }
  })

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-6 pt-6">
        <CategoryForm
          initialData={category}
          billboards={billboards}
        />
      </div>
    </div>
  )
}
