'use client'
import { Button } from "@/components/ui/button"
import Heading from "@/components/ui/heading"
import { Category, Color, Image, Product, Size } from "@prisma/client"
import { Trash } from "lucide-react"
import { Separator } from '@/components/ui/separator'
import * as zod from 'zod'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import toast from "react-hot-toast"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import AlertModal from "@/components/ui/modals/alertModal"
import ImageUpload from "@/components/ui/imageUpload"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

type ProductFormValues = zod.infer<typeof formSchema>

interface ProductFormProps {
  initialData: Product & {
    images: Image[]
  } | null
  categories: Category[]
  sizes: Size[]
  colors: Color[]
}

const formSchema = zod.object({
  name: zod.string().min(1),
  images: zod.object({ url: zod.string() }).array(),
  price: zod.coerce.number().min(1),
  categoryId: zod.string().min(1),
  sizeId: zod.string().min(1),
  colorId: zod.string().min(1),
  isArchived: zod.boolean().default(false).optional(),
  isFeatured: zod.boolean().default(false).optional()
})

export default function ProductForm(props: ProductFormProps) {
  const { initialData, categories, sizes, colors } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const { refresh, push } = useRouter()

  const title = initialData ? "ویرایش محصول" : "ایجاد محصول"
  const description = initialData ? "محصول را ویرایش کنید" : "محصول جدید بسازید"
  const toastMessage = initialData ? "محصول ویرایش شد" : "محصول ساخته شد"
  const action = initialData ? "ذخیره تغییرات" : "اضافه کردن"

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? {
      ...initialData,
      price: parseFloat(String(initialData?.price))
    } : {
      name: "",
      images: [],
      price: 0,
      categoryId: '',
      sizeId: '',
      colorId: '',
      isArchived: false,
      isFeatured: false,
    }
  })

  const onSubmit = async(values: ProductFormValues) => {
    try {

      setLoading(true)

      if(initialData) {
        await axios.patch(`/api/${params.storeId}/products/${params.productId}`, values)
      } else {
        await axios.post(`/api/${params.storeId}/products`, values)
      }

      refresh()
      push(`/${params.storeId}/products`)
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
      await axios.delete(`/api/${params.storeId}/products/${params.productId}`)
      push(`/${params.storeId}/products`)
      toast.success("محصول حذف شد")

    } catch (error) {

      toast.error('مشکلی پیش آمد.')

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
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {"گالری"}
                </FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value.map((image) => image.url)}
                    disabled={loading}
                    onChange={(url) => field.onChange([...field.value, { url }])}
                    onRemove={(url) => field.onChange([...field.value.filter((currentImage) => currentImage.url !== url )])}
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {"نام محصول"}
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="نام محصول"
                      { ...field }
                    />
                  </FormControl>
                  <FormMessage>
                    {"نام محصول الزامی است."}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {"قیمت محصول"}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="100000"
                      { ...field }
                    />
                  </FormControl>
                  <FormMessage>
                    {"قیمت محصول الزامی است."}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {"دسته بندی"}
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
                            placeholder="انتخاب دسته بندی"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem
                            className="cursor-pointer"
                            key={category.id}
                            value={category.id}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  <FormMessage>
                    {"انتخاب دسته بندی الزامی است."}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sizeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {"سایز"}
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
                            placeholder="انتخاب سایز"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {sizes.map((size) => (
                          <SelectItem
                            className="cursor-pointer"
                            key={size.id}
                            value={size.id}
                          >
                            {size.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  <FormMessage>
                    {"انتخاب سایز الزامی است."}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="colorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {"رنگ"}
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
                            placeholder="انتخاب رنگ"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {colors.map((color) => (
                          <div className="flex items-center justify-between gap-2">
                            <SelectItem
                              className="cursor-pointer"
                              key={color.id}
                              value={color.id}
                            >
                              {color.value}
                            </SelectItem>
                            <div
                              className="h-6 w-6 rounded-full border"
                              style={{ backgroundColor: color.value }}
                            />
                          </div>
                        ))}
                      </SelectContent>
                    </Select>
                  <FormMessage>
                    {"انتخاب سایز الزامی است."}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex items-start gap-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1">
                    <FormLabel>
                      {"فروش ویژه"}
                    </FormLabel>
                    <FormDescription>
                      {"این محصول در صفحه اصلی نمایش داده خواهد شد."}
                    </FormDescription>
                  </div>
                  <FormMessage>
                    {"قیمت محصول الزامی است."}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isArchived"
              render={({ field }) => (
                <FormItem className="flex items-start gap-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1">
                    <FormLabel>
                      {"ناموجود"}
                    </FormLabel>
                    <FormDescription>
                      {"این محصول در هیچ کدام از قسمتخای فروشگاه نمایان نخواهد بود.."}
                    </FormDescription>
                  </div>
                  <FormMessage>
                    {"قیمت محصول الزامی است."}
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
