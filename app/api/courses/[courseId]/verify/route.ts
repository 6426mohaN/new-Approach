import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function GET(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    // Get the authenticated user ID
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Fetch the certificate for the authenticated user and course
    const certificate = await db.certificate.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId: params.courseId,
        },
      },
      include: { course: true }, // Include related course data
    });

    if (!certificate) {
      return NextResponse.json(
        { success: false, message: "Certificate not found" },
        { status: 404 }
      );
    }

    // Return the certificate details
    return NextResponse.json(
      {
        success: true,
        data: {
          userId: certificate.userId,
          courseId: certificate.courseId,
          issuedAt: certificate.issuedAt,
          courseTitle: certificate.course.title, // Assuming the course has a title field
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying certificate:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}