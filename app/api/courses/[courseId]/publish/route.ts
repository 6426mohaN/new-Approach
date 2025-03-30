import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function PATCH(
    req: Request,
    { params }: { params: { courseId: string } }
) {
    try {
        const { userId } = auth()
        if(!userId){
            return new NextResponse("unauthorized", {status: 401})
        }
        const course = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId,
            },
            include: {
                chapters: {
                    include: {
                        muxData: true
                    }
                    }
                }
        })
        if(!course){
            return new NextResponse("Not Found",{status: 404})
        }
        const hasPublishedChapter = course.chapters.some((chapter)=> chapter.isPublished)
        
        if(!course.title || !course.description || !course.imageUrl || !course.categoryId || !course.price || !hasPublishedChapter){
            return new NextResponse("Missing required Fields",{status: 400})
        }
        const publishedCourse = await db.course.update({
            where: {
                id: course.id,
                userId,
            },
            data: {
                isPublished: true,
            }
        })
        return NextResponse.json(publishedCourse)
    } catch (error) {
        console.log("[Course Id Published]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}