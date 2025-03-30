// import { db } from "@/lib/db";
// import { auth } from "@clerk/nextjs/server";
// import { Chapter, Course, UserProgress } from "@prisma/client"
// import { redirect } from "next/navigation";
// import { CourseSidebarItem } from "./course-sidebar-item";
// import { CourseProgress } from "@/components/course-progress";

// interface CourseSidebarProps {
//  course: Course & {
//     chapters: (Chapter & {
//         userProgress: UserProgress[] | null
//     })[]
//  } 
//  progressCount: number;
// }

// export const  CourseSidebar = async ({
//     course,
//     progressCount

// }: CourseSidebarProps) => {
//     const {userId } = auth()
//     if(!userId){
//         return redirect ('/')
//     }

//     const purchase = await db.purchase.findUnique({
//         where: {
//             userId_courseId: {
//                 userId,
//                 courseId: course.id
//             }
//         }
//     })

//     return (
//         <div className=" h-full border-r flex flex-col overflow-y-auto shadow-sm">
//             <div className=" p-8 flex flex-col border-b">
//                 <h1 className=" font-semibold">
//                     {course.title}
//                 </h1>
//                 {purchase && (
//                     <div className=" mt-10 ">
//                             <CourseProgress
//                             variant = "success"
//                             value = {progressCount}
//                             />
//                     </div>
//                 )}
//             </div>
//             <div className=" flex flex-col w-full">
//             {course.chapters.map(chapter => (
//                 <CourseSidebarItem 
//                     key={chapter.id}
//                     id={chapter.id}
//                     label = {chapter.title}
//                     isCompleted = {!!chapter.userProgress?.[0]?.isCompleted}
//                     courseId = {course.id}
//                     isLocked={!chapter.isFree && !purchase}

//                    />
                
//             ))}
//             </div>
//         </div>
//     )
// }
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { CourseSidebarItem } from "./course-sidebar-item";
import { CourseProgress } from "@/components/course-progress";


interface CourseSidebarProps {
    course: {
        id: string;
        title: string;
        chapters: {
            id: string;
            title: string;
            isFree: boolean;
            userProgress: { isCompleted: boolean }[] | null;
        }[];
    };
    progressCount: number;
}

export const CourseSidebar = async ({ course, progressCount }: CourseSidebarProps) => {
    const { userId } = auth();
    if (!userId) {
        return redirect("/");
    }

    const purchase = await db.purchase.findUnique({
        where: {
            userId_courseId: {
                userId,
                courseId: course.id
            }
        }
    });

    return (
        <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
            <div className="p-8 flex flex-col border-b">
                <h1 className="font-semibold">{course.title}</h1>
                {purchase && (
                    <div className="mt-10">
                        <CourseProgress variant="success" value={progressCount} />
                    </div>
                )}
            </div>
            <div className="flex flex-col w-full h-screen md:h-full justify-between overflow-auto">
                {course.chapters.map((chapter) => (
                    <CourseSidebarItem
                        key={chapter.id}
                        id={chapter.id}
                        label={chapter.title}
                        isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
                        courseId={course.id}
                        isLocked={!chapter.isFree && !purchase}
                    />
                ))}
                <CourseSidebarItem
                    key="quiz"
                    id="quiz"
                    label="Take the Quiz"
                    isCompleted={false}
                    courseId={course.id}
                    isLocked={!purchase} // Use the purchase state for locking
                    type="quiz"
            />
                      {/* New client component */}
            </div>
        </div>
    );
};
