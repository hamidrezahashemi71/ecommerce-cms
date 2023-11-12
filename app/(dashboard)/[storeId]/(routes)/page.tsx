import prismadb from "@/lib/prismadb"

type DashboardPageProps = {
  params: { storeId: string }
}

export default async function DashboardPage(props: DashboardPageProps) {
  const { params } = props
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId
    }
  })

  return (
    <div>
      فروشگاه فعال: {store?.name}
    </div>
  )
}
