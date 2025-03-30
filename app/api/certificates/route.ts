import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    // Get the authenticated user ID
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Parse the request body
    const { courseId, qrCodeUrl } = await req.json();

    // Save the certificate to the database
    const certificate = await db.certificate.create({
      data: {
        userId,
        qrCodeUrl,
        course: {
          connect: {
            id: courseId, // Connect to an existing course
          },
        },
      },
    });

    return NextResponse.json(certificate, { status: 201 });
  } catch (error) {
    console.error("Error saving certificate:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}