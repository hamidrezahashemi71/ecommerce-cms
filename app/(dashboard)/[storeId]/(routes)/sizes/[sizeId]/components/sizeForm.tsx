'use client'
import { Button } from "@/components/ui/button"
import Heading from "@/components/ui/heading"
import { Size } from "@prisma/client"
import { Trash } from "lucide-react"
import { Separator } from '@/components/ui/separator'
import * as zod from 'zod'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import toast from "react-hot-toast"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import AlertModal from "@/components/ui/modals/alertModal"

type SizeFormValues = zod.infer<typeof formSchema>

interface SizeFormProps {
  initialData: Size | null
}

const formSchema = zod.object({
  name: zod.string().min(1),
  value: zod.string().min(1)
})

export default function SizeForm(props: SizeFormProps) {
  const { initialData } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const { refresh, push } = useRouter()

  const title = initialData ? "ویرایش سایز" : "ایجاد سایز"
  const description = initialData ? "سایز را ویرایش کنید" : "سایز جدید بسازید"
  const toastMessage = initialData ? "سایز ویرایش شد" : "سایز ساخته شد"
  const action = initialData ? "ذخیره تغییرات" : "اضافه کردن"

  const form = useForm<SizeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      value: ""
    }
  })

  const onSubmit = async(values: SizeFormValues) => {
    try {

      setLoading(true)

      if(initialData) {
        await axios.patch(`/api/${params.storeId}/sizes/${params.sizeId}`, values)
      } else {
        await axios.post(`/api/${params.storeId}/sizes`, values)
      }

      refresh()
      push(`/${params.storeId}/sizes`)
      toast.success(toastMessage)

    } catch (error) {

      toast.error("مشکلی پیش آمد")

    } finally {

      setLoading(false)

    }
  }

  const onDelete = async() => {
    try {

      setLoading(true)
      await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`)
      push(`/${params.storeId}/sizes`)
      toast.success("سایز حذف شد")

    } catch (error) {

      toast.error('مطمئن شوید که تمامی محصولات مرتبط با این سایز را حذف کرده اید.')

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
      <div className="flex items-center justify-between">
        <Heading
          title={title}
          description={description}
        />
        {initialData && (
          <Button
          disabled={loading}
          variant='destructive'
          size='icon'
          onClick={() => setOpen(true)}
        >
          <Trash className="h-4 w-4" />
        </Button>
        )}
      </div>
      <Separator />
      <Form { ...form }>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {"نام سایز"}
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="نام سایز"
                      { ...field }
                    />
                  </FormControl>
                  <FormMessage>
                    {"نام سایز الزامی است."}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {"مقدار سایز"}
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="مقدار سایز"
                      { ...field }
                    />
                  </FormControl>
                  <FormMessage>
                    {"مقدار سایز الزامی است."}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={loading}
            type="submit"
          >
            {action}
          </Button>
        </form>
      </Form>
    </>
  )
}
