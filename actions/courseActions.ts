import { db } from "@/lib/db";

// Fetch course title by course ID
export async function fetchCourseTitle(courseId: string) {
  try {
    const course = await db.course.findUnique({
      where: { id: courseId },
      select: { title: true },
    });
    return course?.title || "Untitled Course";
  } catch (error) {
    console.error("Error fetching course title:", error);
    return "Error fetching title";
  }
}
