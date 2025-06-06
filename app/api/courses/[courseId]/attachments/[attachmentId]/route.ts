import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server"

import { NextResponse } from "next/server";

export async function DELETE(
    req: Request,
    {params}: {params:{courseId:string,attachmentId:string}}
){
    try{
        const { userId } = auth();
        if(!userId){
            return new NextResponse("unauthorized", {status: 401})
        }

        const courseOwner = db.course.findUnique({
            where:{
                id: userId,
                userId: userId
            }
        })
        if(!courseOwner){
            return new NextResponse("unauthorized", {status: 401})
        }

        const attachment = await db.attachment.delete({
            where: {
                courseId: params.courseId,
                id:params.attachmentId
            }
        })

        return NextResponse.json(attachment)

    }catch(error){
        console.log("Attachment_ID",error)
        return new NextResponse("Internal Error",{status: 500})
    }
}