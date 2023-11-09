

export default function AuthLayout(props: LayoutProp) {
  const { children } = props
  return (
    <div className="flex items-center justify-center h-full">
      {children}
    </div>
  )
}
