import { auth } from "@clerk/nextjs/server";
import { error } from "console";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
 
const f = createUploadthing();
 
const handleAuth = () => { 
    const { userId } = auth();

    if(!userId) throw new Error("unauthorized")
        return { userId };
}; 
 
export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 }})
  .middleware(()=> handleAuth())
  .onUploadComplete(()=>{}),

  courseAttachment: f(["text", "image", "video", "audio", "pdf"])
  .middleware(()=> handleAuth())
  .onUploadComplete(()=>{}),

  chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: "32GB"}})
  .middleware(()=>handleAuth())
  .onUploadComplete(()=>{}),

} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;