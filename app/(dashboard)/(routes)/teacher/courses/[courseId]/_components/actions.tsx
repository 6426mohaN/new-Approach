'use client'

import { Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ConfirmModal } from "@/components/modals/confirm-modal"
import { useState } from "react"
import toast from "react-hot-toast"
import axios from "axios"
import { useRouter } from "next/navigation"


interface ActionsProps {
    disabled?: boolean
    courseId: string
 
    isPublished: boolean

}
export const Actions = ({
disabled,
courseId,

isPublished
}: ActionsProps) => {
    const router = useRouter()
   
    const [isLoading, setIsLoading] = useState(false)

    const onClick = async() =>{
        try{
            setIsLoading(true)
            if(isPublished){
                await  axios.patch(`/api/courses/${courseId}/unpublish`)
                toast.success("course unpublished")
            }else{
                await axios.patch(`/api/courses/${courseId}/publish`)
                toast.success("course published")
              
            }
            router.refresh();
        }catch{
            toast.error("something went wrong")
        }finally{
            setIsLoading(false)
        }
    }

    const onDelete = async () => {
        try {
            setIsLoading(true)
            await axios.delete(`/api/courses/${courseId}`)
            toast.success('course deleted')
            router.refresh();
            router.push(`/teacher/courses`)
            
        } catch {
            toast.error("Something went wrong(onDelete actions.tsx)")
            
        }finally{
            setIsLoading(false)
        }
    }

    return (
        <div className=" flex items-center gap-x-2">
            <Button
            onClick = {onClick}
            disabled={disabled || isLoading}
            variant={'outline'}
            size={"sm"}
            >
            {isPublished ? 'Unpublish' : 'Publish'}
            </Button>

            <ConfirmModal onConfirm = {onDelete}>
            <Button size={"sm"} disabled={isLoading}>
                <Trash className="h-4 w-4" />
            </Button>
            </ConfirmModal>

        </div>
    )
}