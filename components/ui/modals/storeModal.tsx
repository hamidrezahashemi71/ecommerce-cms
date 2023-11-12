'use client'

import { useStoreModal } from "@/hooks/useStoreModal"
import { Modal } from "@/components/ui/modal"
import * as zod from 'zod'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"

type StoreFormValues = zod.infer<typeof formSchema>

const formSchema = zod.object({
  name: zod.string().min(1)
})

export default function StoreModal() {
  const storeModal = useStoreModal()
  const [loading, setLoading] = useState(false)

  const form = useForm<StoreFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ''
    }
  })

  const onSubmit = async(values: StoreFormValues) => {
    try {

      setLoading(true)
      const res = await axios.post("/api/stores", values)
      window.location.assign(`/${res.data.id}`) // fully refresh to fully push data to db

    } catch (error) {

      console.log("[SUBMIT_STORE]", error)
      toast.error("مشکلی پیش آمد")

    } finally {

      setLoading(false)

    }
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
                      disabled={loading}
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
                disabled={loading}
                variant='outline'
                onClick={storeModal.onClose}
              >
                {"لغو"}
              </Button>
              <Button
                disabled={loading}
                type="submit"
              >
                {"ادامه"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  )
}
