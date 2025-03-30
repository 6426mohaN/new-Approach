import { isTeacher } from "@/lib/roles";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { clerkClient } from "@clerk/nextjs/server";// ✅ Import Clerk API

const TeacherLayout = async ({ children }: { children: React.ReactNode }) => {
    const { userId } = auth();
    if (!userId) {
        return redirect("/");
    }

    // ✅ Fetch user metadata from Clerk
    const user = await clerkClient().users.getUser(userId);
    const metadata = user?.publicMetadata;

    if (!isTeacher(metadata)) {
        return redirect("/");
    }

    return <>{children}</>;
};

export default TeacherLayout;
