'use client'

import { Button } from "@/components/ui/button";
import axios from "axios";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface CourseProgressButtonProps{
    chapterId: string;
    courseId: string;
    isCompleted?: boolean;
    nextChapterId?: string
}
export const CourseProgressButton = ({
    chapterId,
    courseId,
    isCompleted,
    nextChapterId
}: CourseProgressButtonProps) =>{
    //TODO: add hooks
    const router = useRouter();
    
    const [isLoading, setIsLoading] = useState(false)

    const onClick = async () => {
        try {
            setIsLoading(true)
            await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`,{
                isCompleted: !isCompleted
            })

            if(!isCompleted && !nextChapterId) {
                
            }    

            if (!isCompleted && nextChapterId) {
                router.push(`/courses/${courseId}/chapters/${nextChapterId}`)
            }
            toast.success('progress updated')
            router.refresh();

        } catch (error) {
            toast.error('something went wrong')
        }finally{
            setIsLoading(false)
        }
    }

    const Icon = isCompleted ? XCircle : CheckCircle
    return (
        <Button
        onClick={onClick}
        disabled={isLoading}
        type="button"
        variant={isCompleted ? "outline" : "success"}
        className=" w-full md:w-auto"
        >
            {isCompleted ? "Not Completed" : "Mark as Completed"}
            <Icon className=" h-4 w-4 ml-2" />
        </Button>
    )
}