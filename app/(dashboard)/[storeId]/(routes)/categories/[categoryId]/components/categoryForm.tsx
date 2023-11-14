'use client'
import { Button } from "@/components/ui/button"
import Heading from "@/components/ui/heading"
import { Billboard, Category } from "@prisma/client"
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
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select"

type CategoryFormValues = zod.infer<typeof formSchema>

interface CategoryFormProps {
  initialData: Category | null
  billboards: Billboard[]
}

const formSchema = zod.object({
  name: zod.string().min(1),
  billboardId: zod.string().min(1)
})

export default function CategoryForm(props: CategoryFormProps) {
  const { initialData, billboards } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const { refresh, push } = useRouter()

  const title = initialData ? "ویرایش دسته بندی" : "ایجاد دسته بندی"
  const description = initialData ? "دسته بندی را ویرایش کنید" : "دسته بندی جدید بسازید"
  const toastMessage = initialData ? "دسته بندی ویرایش شد" : "دسته بندی ساخته شد"
  const action = initialData ? "ذخیره تغییرات" : "اضافه کردن"

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      billboardId: ""
    }
  })

  const onSubmit = async(values: CategoryFormValues) => {
    try {

      setLoading(true)

      if(initialData) {
        await axios.patch(`/api/${params.storeId}/categories/${params.categoryId}`, values)
      } else {
        await axios.post(`/api/${params.storeId}/categories`, values)
      }

      refresh()
      push(`/${params.storeId}/categories`)
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
      await axios.delete(`/api/${params.storeId}/categories/${params.categoryId}`)
      push(`/${params.storeId}/categories`)
      toast.success("دسته بندی حذف شد")

    } catch (error) {

      toast.error('مطمئن شوید که تمامی محصولات این دسته بندی را حذف کرده اید.')

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
                    {"عنوان دسته بندی"}
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="عنوان دسته بندی"
                      { ...field }
                    />
                  </FormControl>
                  <FormMessage>
                    {"عنوان دسته بندی الزامی است."}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billboardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {"بیلبورد"}
                  </FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="انتخاب بیلبورد"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {billboards.map((billboard) => (
                          <SelectItem
                            className="cursor-pointer"
                            key={billboard.id}
                            value={billboard.id}
                          >
                            {billboard.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  <FormMessage>
                    {"انتخاب بیلبورد الزامی است."}
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
