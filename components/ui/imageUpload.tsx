'use client'

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ImagePlus, Trash } from "lucide-react"
import { CldUploadWidget } from "next-cloudinary"
import Image from "next/image"

export default function ImageUpload(props: ImageUploadProps) {
  const { disabled, onChange, onRemove, value } = props
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const onUpload = (result: any) => {
    onChange(result.info.secure_url)
  }

  if(!isMounted) return null

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 left-2">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant='destructive'
                size='icon'
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image
              fill
              sizes="max-w-[200px]"
              className="object-cover"
              alt="image"
              src={url}
              priority
            />
          </div>
        ))}
      </div>
      <CldUploadWidget
        onUpload={onUpload}
        uploadPreset="kg76ggjv"
      >
        {({open}) => {
          const onClick = () => open()
          return (
            <Button
              type="button"
              disabled={disabled}
              variant="secondary"
              onClick={onClick}
            >
              <ImagePlus className="h-4 w-4 ml-2" />
              {"بارگزاری تصویر"}
            </Button>
          )
        }}
      </CldUploadWidget>
    </div>
  )
}
