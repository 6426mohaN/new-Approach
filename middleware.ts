// import { auth, authMiddleware, clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";
// const protectedRoutes = createRouteMatcher([
//   '/teacher(.*)',
// ])

// const isTeacherRoute = createRouteMatcher([
//   '/teacher(.*)',
// ])



// export default clerkMiddleware(async (auth, req)=>{
//   if(protectedRoutes(req)) auth().protect();
  
//   if(
//     isTeacherRoute(req) &&
//   (await auth()).sessionClaims?.metadata?.role !== "teacher"
//   ) {
//     const url = new URL("/", req.url)
//     return NextResponse.redirect(url)
//   }
  


// });



// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// };

// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// // Define teacher-only routes
// const isTeacherRoute = createRouteMatcher(['/teacher(.*)']);

// export default clerkMiddleware((auth, req) => {
//   const session = auth();

//   // Redirect non-teachers away from teacher routes
//   if (isTeacherRoute(req) && session?.sessionClaims?.metadata?.role !== "teacher") {
//     return NextResponse.redirect(new URL("/", req.url));
//   }
// });

// // Config to match all routes except static files and Next.js internals
// export const config = {
//   matcher: [
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     "/(api|trpc)(.*)",
//   ],
// };

// import { auth, clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// const isTeacherRoute = createRouteMatcher(['/teacher(.*)']);
// const isAdminRoute = createRouteMatcher(['/admin(.*)']);

// export default clerkMiddleware(async (auth, req) => {
//   const { sessionClaims } = await auth();

//   // Protect teacher routes
//   if (isTeacherRoute(req) && sessionClaims?.metadata?.role !== "teacher") {
//     return NextResponse.redirect(new URL("/tesst", req.url));
//   }

//   // Protect admin routes
//   if (isAdminRoute(req) && sessionClaims?.metadata?.role !== "admin") {
//     return NextResponse.redirect(new URL("/tesst", req.url));
//   }

//   return NextResponse.next(); // Allow other routes to proceed
// });

// export const config = {
//   matcher: [
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     '/(api|trpc)(.*)',
//   ],
// };
import { auth, authMiddleware, clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
const protectedRoutes = createRouteMatcher([
  '/',
])

const isTeacherRoute = createRouteMatcher([
  '/teacher(.*)',
])



export default clerkMiddleware(async (auth, req)=>{
  if(protectedRoutes(req)) auth().protect();
  
  if(
    isTeacherRoute(req) &&
  (await auth()).sessionClaims?.metadata?.role !== "teacher"
  ) {
    const url = new URL("/", req.url)
    return NextResponse.redirect(url)
  }
  


});



export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
