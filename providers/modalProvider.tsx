'use client'

import StoreModal from "@/components/ui/modals/storeModal"
import { useEffect, useState } from "react"

export function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if(!isMounted) return null

  return (
    <>
      <StoreModal/>
    </>
  )
}
