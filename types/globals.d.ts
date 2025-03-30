export {}

export type Roles = "student" | "teacher" | "admin";

declare global {
    interface CustomJwtSessionClaims {
        metadata: {
            role?: Roles
        }
    }
}