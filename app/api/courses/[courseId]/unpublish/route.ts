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
        })
        if(!course){
            return new NextResponse("Not Found",{status: 404})
        }

        const unpublishedCourse = await db.course.update({
            where: {
                id: course.id,
                userId,
            },
            data: {
                isPublished: false,
            }
        })
         return NextResponse.json(unpublishedCourse)
    } catch (error) {
        console.log("[Course Id unPublished]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}