"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { isAdmin, isTeacher } from "@/lib/roles";

const AuthRedirect = () => {
  const { userId, isLoaded, sessionId } = useAuth(); // `sessionId` helps refresh Clerk session
  const { user, isLoaded: userLoaded } = useUser(); // Fetch latest user metadata
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoaded && userLoaded && userId) {
      // Refetch user metadata to get updated roles
      const metadata = user?.publicMetadata || {}; // Get latest role data
      console.log("User Metadata:", metadata); // 🔍 Debug

      const teacherStatus = isTeacher(metadata);
      const adminStatus = isAdmin(metadata);

      console.log("Admin Status:", adminStatus); // 🔍 Debug
      console.log("Teacher Status:", teacherStatus); // 🔍 Debug

      if (adminStatus && !pathname.startsWith("/admin")) {
        router.push("/admin");
      } else if (teacherStatus && !pathname.startsWith("/teacher")) {
        router.push("/teacher");
      } else if (
        (!adminStatus && !teacherStatus && pathname !== "/") ||
        metadata.role === null // Explicit check for null role
      ) {
        console.log("Redirecting user with no valid role to `/`");
        router.push("/");
      }
    }
  }, [userId, isLoaded, userLoaded, sessionId, user, router, pathname]); 

  return null; // No UI needed
};

export default AuthRedirect;