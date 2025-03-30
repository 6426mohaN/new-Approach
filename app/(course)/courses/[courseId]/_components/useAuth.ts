import { auth } from "@clerk/nextjs/server";

export const useAuth = () => {
    const { userId } = auth();
    return  userId ;
}