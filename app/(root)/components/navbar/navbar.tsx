import { UserButton, auth } from '@clerk/nextjs'
import React from 'react'
import MainNav from '@/app/(root)/components/navbar/mainNav'
import StoreSwitcher from './storeSwitcher'
import { redirect } from 'next/navigation'
import prismadb from '@/lib/prismadb'

export default async function Navbar() {
  const { userId } = auth()

  if(!userId) redirect("/sign-in")

  const stores = await prismadb.store.findMany({
    where: {
      userId,
    }
  })

  return (
    <div className='border-b'>
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />
        <MainNav className='mx-6'/>
        <div className="mr-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl='/' />
        </div>
      </div>
    </div>
  )
}
