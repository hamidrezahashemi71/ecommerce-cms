import React from 'react'

export default function Heading(props: HeadingProps) {
  const { title, description } = props
  return (
    <div className='flex-col space-y-2'>
      <h2 className='text-2xl font-bold'>
        {title}
      </h2>
      <p className='text-sm text-muted-foreground'>
        {description}
      </p>
    </div>
  )
}
