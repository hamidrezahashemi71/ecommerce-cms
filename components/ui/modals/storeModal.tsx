'use client'

import { useStoreModal } from "@/hooks/useStoreModal"
import { Modal } from "@/components/ui/modal"

export default function StoreModal() {
  const storeModal = useStoreModal()

  return (
    <Modal
      title={"ایجاد فروشگاه جدید"}
      description={"جهت مدیریت دسته بندی ها و محصولات، یک فروشگاه جدید ایجاد کنید"}
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      فرم ایجاد فروشگاه
    </Modal>
  )
}
