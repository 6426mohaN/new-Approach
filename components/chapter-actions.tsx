'use client'

import { Trash } from "lucide-react"
import { Button } from "./ui/button"
import { ConfirmModal } from "./modals/confirm-modal"
import { useState } from "react"
import toast from "react-hot-toast"
import axios from "axios"
import { useRouter } from "next/navigation"

interface ChapterActionsProps {
    disabled?: boolean
    courseId: string
    chapterId: string
    isPublished: boolean

}
export const ChapterActions = ({
disabled,
courseId,
chapterId,
isPublished
}: ChapterActionsProps) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const onClick = async() =>{
        try{
            setIsLoading(true)
            if(isPublished){
                await  axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/unpublish`)
                toast.success("chapter unpublished")
            }else{
                await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/publish`)
                toast.success("chapter published")
            }
            router.refresh();
        }catch{
            toast.error("something went wring")
        }finally{
            setIsLoading(false)
        }
    }

    const onDelete = async () => {
        try {
            setIsLoading(true)
            await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`)
            toast.success('chapter deleted')
            router.refresh();
            router.push(`/teacher/courses/${courseId}`)
            
        } catch {
            toast.error("Something went wrong(onDelete)")
            
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