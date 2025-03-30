"use client"
import { useAuth, UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { Button } from './ui/button'

import React from 'react'
import { LogOut } from 'lucide-react'
import Link from 'next/link'
import { SearchInput } from './search-input'
import { isTeacher } from '@/lib/roles'
import { isAdmin } from '@/lib/roles'



const NavbarRoutes = () => {

  const { userId } = useAuth();

  const pathname = usePathname();


  const isTeacherPage = pathname?.startsWith("/teacher")
  const isCoursePage = pathname?.includes("/courses") 
  const isSearchPage = pathname === "/search"
 

  const isUserAdmin = isAdmin(userId)
  const isUserTeacher = isTeacher(userId)
  const isRegularUser = !isUserAdmin && !isUserTeacher
  
  

  return (
    <>
    {
      (isSearchPage)&&(
        <div className=' hidden md:block'>
          <SearchInput />
        </div>
      )
    }
      <div className=' flex gap-x-2 ml-auto'>
        {(isTeacherPage || isCoursePage) ? (
            <Link href="/">
            
          <Button size="sm" variant="ghost">
              <LogOut className=' h-4 w-4 mr-2' />
              Home
          </Button>
          </Link>
        ): (isUserTeacher) ? (
          <Link href="/teacher/courses">
          <Button size="sm" variant="ghost">
            Teacher mode
          </Button>
          </Link>
        ): (isUserAdmin) ? (
          <Button size="sm" variant="ghost">
            Admin panel
          </Button>
        ): (isRegularUser) ? (
          <Button size="sm" variant="ghost">
            
          </Button>
        ): null
        }
        
        <UserButton />
        
      </div>
      
      
    </>
  )
}

export default NavbarRoutes
