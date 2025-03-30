// 'use client'
// import AuthRedirect from '@/components/AuthRedirect'
// import Navbar from '@/components/Navbar'
// import Sidebar from '@/components/Sidebar'
// import { usePathname } from 'next/navigation'
// import React from 'react'
// const Dashboardlayout = ({children}:{children:React.ReactNode}) => {
//   const pathname = usePathname();
//   return (
//     <div className=' h-full'>
//       {(pathname === '/')? (
//         <div className=' h-[80px]  fixed inset-y-0 w-full'>
//         <Navbar/>
//       </div>
//       ):(
//         <div className=' h-[80px] md:pl-56 fixed inset-y-0 w-full'>
//         <Navbar/>
//       </div>
//       )}

//       {(pathname === '/')?(
//         ""
//       ):(
//         <div className=' hidden md:flex h-full w-56 fixed flex-col inset-y-0 z-50'>
//         <Sidebar />
//     </div>
//       )}

//       {(pathname === '/')?(
//         <main className=' pt-[80px] h-full'>
//         {children}
          
//         </main>
//       ):(
//         <main className=' md:pl-56  pt-[80px] h-full'>
//         {children}
          
//         </main>
//       )}
//       <AuthRedirect />
        
        
//     </div>
//   )
// }

// export default Dashboardlayout
/****************************************************
 * new code below here
 * ******************************************************
*/

"use client";
import dynamic from "next/dynamic";
import AuthRedirect from "@/components/AuthRedirect";
import { usePathname } from "next/navigation";
import React from "react";

// Dynamically import Navbar and Sidebar to avoid hydration issues
const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });
const Sidebar = dynamic(() => import("@/components/Sidebar"), { ssr: false });

const Dashboardlayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const showAuthRedirect = pathname !== "/search"; // Exclude AuthRedirect for /search


  return (
    <div className="h-full">
      {/* Navbar */}
<div className={`h-[80px] fixed inset-y-0 w-full ${["/", "/teacher", "/admin"].includes(pathname) ? "" : "md:pl-56"}`}>
  <Navbar />
</div>

{/* Sidebar */}
{!["/", "/teacher", "/admin"].includes(pathname) && (
  <div className="hidden md:flex h-full w-56 fixed flex-col inset-y-0 z-50">
    <Sidebar />
  </div>
)}

      {/* Main Content */}
      <main className={`pt-[80px] h-full ${["/", "/teacher", "/admin"].includes(pathname) ? "" : "md:pl-56"}`}>
  {children}
</main>


      {/* Auth Redirect */}
      {showAuthRedirect && <AuthRedirect />}
    </div>
  );
};

export default Dashboardlayout;
