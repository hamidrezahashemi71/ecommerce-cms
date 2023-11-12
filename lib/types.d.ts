
interface LayoutProp {
  children: React.ReactNode
}

interface DashboardLayoutProps extends LayoutProp {
  params: { storeId: string }
}

interface FormattedItems {
  value: string
  label: string
}
