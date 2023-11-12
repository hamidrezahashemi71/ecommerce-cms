import React from 'react'

export default function Heading(props: HeadingProps) {
  const { title, description } = props
  return (
    <div>
      <h2 className='text-3xl font-bold'>
        {title}
      </h2>
      <p className='text-sm text-muted-foreground'>
        {description}
      </p>
    </div>
  )
}
