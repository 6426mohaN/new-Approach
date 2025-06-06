'use client'

import { cn } from "@/lib/utils";
import { CheckCircle, Lock, PlayCircle, ListCheck } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";


interface CourseSidebarItemProps {
    label: string
    id: string
    isCompleted: boolean
    courseId: string;
    isLocked: boolean;
    type?: "chapter" | "quiz"
}
export const CourseSidebarItem = ({
    label,
    id,
    isCompleted,
    courseId,
    isLocked,
    type = 'chapter'
}: CourseSidebarItemProps) => {
    const pathname = usePathname();
    const router = useRouter();

    // const Icon = isLocked ? Lock : (isCompleted ? CheckCircle : PlayCircle)
    const Icon = isLocked ? Lock : isCompleted ? CheckCircle : type === "quiz" ? ListCheck : PlayCircle;

    const isActive = pathname?.includes(id);

    const onClick = () => {
        // router.push(`/courses/${courseId}/chapters/${id}`);
        const path = type === "quiz" ? `/courses/${courseId}/quiz` : `/courses/${courseId}/chapters/${id}`;
        router.push(path);
        
    }
    return (
        <button
        onClick={onClick}
        type="button"
        className={cn(
            'flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20',
            isActive && 'text-slate-700 bg-slate-200/20 hover:bg-slate-200/20 hover:text-slate-700',
            isCompleted && 'text-emerald-700 hover:text-emerald-700',
            isCompleted && isActive && "bg-emerald-200/20",
            type=="quiz" && "font-bold text-blue-600"
            )}
        >
            <div className=" flex items-center gap-x-2 py-4">
                <Icon
                size={22}
                className={cn(
                    "text-slate-500",
                    isCompleted && "text-emerald-700",
                    isActive && "text-slate-700"
                )}
                />
                {label}
            </div>

           

            <div className={cn(
                'ml-auto opacity-0 border-2 border-slate-700 h-full transition-all',
                isActive && 'opacity-100',
                isCompleted && 'border-emerald-700'

            )}>

            </div>
        </button>
    )
}