import React from 'react'
import prismadb from '@/lib/prismadb'
import ProductForm from './components/productForm'

interface NewProductPageProps {
  params: { productId: string, storeId: string }
}

export default async function Product(props: NewProductPageProps) {
  const { params } = props

  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId
    },
    include: {
      images: true
    }
  })

  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId
    }
  })

  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId
    }
  })

  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId
    }
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-6 pt-6">
        <ProductForm
          initialData={product}
          categories={categories}
          sizes={sizes}
          colors={colors}
        />
      </div>
    </div>
  )
}
