'use client'

import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { ColorColumn } from "./columns"
import { Button } from "@/components/ui/button"
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react"
import toast from "react-hot-toast"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import axios from "axios"
import AlertModal from "@/components/ui/modals/alertModal"

interface CellActionProps {
  data: ColorColumn
}

export default function CellAction(props: CellActionProps) {
  const { data } = props
  const { push, refresh } = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id)
    toast.success('آی دی کپی شد')
  }

  const onDelete = async() => {
    try {

      setLoading(true)
      await axios.delete(`/api/${params.storeId}/colors/${data.id}`)
      toast.success("رنگ حذف شد")
      refresh()

    } catch (error) {

      toast.error('مطمئن شوید که تمامی محصولات مرتبط با این رنگ را حذف کرده اید.')

    } finally {

      setLoading(false)
      setOpen(false)

    }
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <DropdownMenu dir="rtl">
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className="h-4 w-8 p-0"
          >
            <span className="sr-only">
              {"باز کردن منو"}
            </span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuLabel>
            {"عملیات"}
          </DropdownMenuLabel>
          <DropdownMenuItem
            className="cursor-pointer hover:text-yellow-700 transition-colors"
            onClick={() => push(`/${params.storeId}/colors/${data.id}`)}
          >
            <Edit className="ml-2 h-4 w-4" />
            {"ویرایش"}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onCopy(data.id)}
            className="cursor-pointer hover:text-green-700 transition-colors"
          >
            <Copy className="ml-2 h-4 w-4" />
            {"کپی آی دی"}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setOpen(true)}
            className="cursor-pointer hover:text-red-700 transition-colors"
          >
            <Trash className="ml-2 h-4 w-4" />
            {"حذف"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
