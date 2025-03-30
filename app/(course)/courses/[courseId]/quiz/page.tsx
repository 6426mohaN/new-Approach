
import { db } from "@/lib/db";
import TestPage from "./testwrapper/page";

export default async function TestPageWrapper({ params }: { params: { courseId: string } }) {
  const { courseId } = params;
  // Fetch the course title from the database
  const course = await db.course.findFirst({
    where: { id: courseId },
    select: { title: true },
  });

  const courseTitle = course?.title || "Untitled Course";

  return <TestPage courseId={courseId} courseTitle={courseTitle} />;
}
