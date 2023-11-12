'use client'

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Copy, Server } from "lucide-react"
import { Badge, BadgeProps } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"

const textMap: Record<ApiAlertProps["variant"], string> = {
  public: "عمومی",
  admin: "ادمین"
}

const variantMap: Record<ApiAlertProps["variant"], BadgeProps['variant']> = {
  public: "secondary",
  admin: "destructive"
}

export default function ApiAlert(props: ApiAlertProps) {
  const { title, description, variant = 'public' } = props

  const onCopy = (description: string) => {
    navigator.clipboard.writeText(description)
    toast.success('آدرس API کپی شد')
  }

  return (
    <Alert>
      <Server className="h-4 w-4" />
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge variant={variantMap[variant]}>
          {textMap[variant]}
        </Badge>
      </AlertTitle>
      <AlertDescription className="mt-4 flex items-center justify-between">
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          {description}
        </code>
        <Button
          variant='outline'
          size='icon'
          onClick={() => onCopy(description)}
        >
          <Copy className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  )
}
