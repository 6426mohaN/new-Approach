'use client'

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { useDebounce } from "@/hooks/use-debounce"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import qs from "qs"

export const SearchInput = () => {
    const [value, setValue] = useState("")
    const debouncedValue = useDebounce(value)

    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const currentCategoryId = searchParams.get('categoryId')

    useEffect(() => {
        const queryParams = qs.stringify({
            title: debouncedValue,
            categoryId: currentCategoryId
        }, { skipNulls: true });
    
        const url = `${pathname}?${queryParams}`;
        router.push(url);
    }, [debouncedValue, currentCategoryId, pathname, router]);
    
    

  return ( 
  <div className=" relative">
    <Search 
    className=" h-4 w-4 absolute top-3 left-3 text-muted-foreground"
    />
    <Input 
    value={value}
    onChange={(e) => setValue(e.target.value)}
    className=" w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200"
    placeholder="Search for a Course"
    />
        
    </div>
    )
} 