
interface LayoutProp {
  children: React.ReactNode
}

interface DashboardLayoutProps extends LayoutProp {
  params: { storeId: string }
}

// GENERAL
interface HeadingProps {
  title: string
  description: string
}

// STORE
interface FormattedItems {
  value: string
  label: string
}

// SETTINGS
interface SettingsPageProps {
  params: { storeId: string }
}

// MODALS
interface ModalProps {
  title: string
  description: string
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

interface AlertModalProps {
  onClose: () => void
  onConfirm: () => void
  isOpen: boolean
  loading: boolean
}

interface ApiAlertProps {
  title: string
  description: string
  variant: "public" | "admin"
}

// HOOKS
interface UseStoreModalType {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

// IMAGE UPLOAD
interface ImageUploadProps {
  disabled: boolean
  onChange: (value: string) => void
  onRemove: (value: string) => void
  value: string[]
}
