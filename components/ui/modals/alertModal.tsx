'use client'

import { useEffect, useState } from "react"
import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"

export default function AlertModal(props: AlertModalProps) {
  const { isOpen, onClose, onConfirm, loading } = props
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if(!isMounted) return null

  return (
    <Modal
      title="مطمئنید؟"
      description="این عملیات برگشت پذیر نخواهد بود."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 gap-2 flex items-center justify-end w-full">
        <Button
          disabled={loading}
          variant='outline'
          onClick={onClose}
        >
          {"لغو"}
        </Button>
        <Button
          disabled={loading}
          variant='destructive'
          onClick={onConfirm}
        >
          {"ادامه"}
        </Button>
      </div>
    </Modal>
  )
}
