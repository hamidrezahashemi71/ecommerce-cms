'use client'

import { useStoreModal } from "@/hooks/useStoreModal"
import { Modal } from "@/components/ui/modal"
import * as zod from 'zod'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const formSchema = zod.object({
  name: zod.string().min(1)
})

export default function StoreModal() {
  const storeModal = useStoreModal()
  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ''
    }
  })

  const onSubmit = async(values: zod.infer<typeof formSchema>) => {
    console.log("values", values)
  }

  return (
    <Modal
      title={"ایجاد فروشگاه جدید"}
      description={"جهت مدیریت دسته بندی ها و محصولات، یک فروشگاه جدید ایجاد کنید"}
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div className="space-y-4 py-4 pb-4">
        <Form { ...form }>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name = 'name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {"نام فروشگاه"}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="فروشگاه"
                      { ...field }
                    />
                  </FormControl>
                  <FormMessage>
                    {"نام فروشگاه باید حداقل شامل 1 کاراکتر باشد"}
                  </FormMessage>
                </FormItem>
              )}
           />
            <div className="pt-6 flex items-center justify-end gap-2 w-full">
              <Button
                variant='outline'
                onClick={storeModal.onClose}
              >
                {"لغو"}
              </Button>
              <Button type="submit">
                {"ادامه"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  )
}
