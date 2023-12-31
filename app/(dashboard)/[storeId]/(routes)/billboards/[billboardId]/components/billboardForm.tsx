'use client'
import { Button } from "@/components/ui/button"
import Heading from "@/components/ui/heading"
import { Billboard } from "@prisma/client"
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
import ImageUpload from "@/components/ui/imageUpload"

type BillboardFormValues = zod.infer<typeof formSchema>

interface BillboardFormProps {
  initialData: Billboard | null
}

const formSchema = zod.object({
  label: zod.string().min(1),
  imageUrl: zod.string().min(1)
})

export default function BillboardForm(props: BillboardFormProps) {
  const { initialData } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const { refresh, push } = useRouter()

  const title = initialData ? "ویرایش بیلبورد" : "ایجاد بیلبورد"
  const description = initialData ? "بیلبورد را ویرایش کنید" : "بیلبورد جدید بسازید"
  const toastMessage = initialData ? "بیلبورد ویرایش شد" : "بیلبورد ساخته شد"
  const action = initialData ? "ذخیره تغییرات" : "اضافه کردن"

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: "",
      imageUrl: ""
    }
  })

  const onSubmit = async(values: BillboardFormValues) => {
    try {

      setLoading(true)

      if(initialData) {
        await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, values)
      } else {
        await axios.post(`/api/${params.storeId}/billboards`, values)
      }

      refresh()
      push(`/${params.storeId}/billboards`)
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
      await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`)
      push(`/${params.storeId}/billboards`)
      toast.success("بیلبورد حذف شد")

    } catch (error) {

      toast.error('مطمئن شوید که تمامی دسته بندی های این بیلبورد را حذف کرده اید.')

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
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {"تصویر پس زمینه"}
                </FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage>
                    {"بارگزاری تصویر بیلبورد الزامی است."}
                  </FormMessage>
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {"لیبل بیلبورد"}
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="لیبل بیلبورد"
                      { ...field }
                    />
                  </FormControl>
                  <FormMessage>
                    {"نام بیلبورد الزامی است."}
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
