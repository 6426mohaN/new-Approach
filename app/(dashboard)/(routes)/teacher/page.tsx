import { getDashboardCourses } from "@/actions/get-dashboardCourses";

import { SignedIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

import { redirect } from "next/navigation";

import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const TeacherPage = async () => {
  const { userId } = auth();

  if(!userId){
    return redirect('/')
  }

  // const {
  //   completedCourses,
  //   coursesInProgress
  // } = await getDashboardCourses(userId)

  const user = await currentUser();
  const firstName = user?.firstName || 'Guest'

  return (
    <div>
      
      <div className="absolute top-0 right-0 m-5">
        <SignedIn>
          
        </SignedIn>
      </div>
      <div>
      <nav className="bg-white p-4 mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold"><span className="text-blue-500">EDU</span> <span className="text-green-700">LMS</span></h1>
        
        <div className="space-x-4">
          <Link href="#about" className="hover:text-blue-500">About</Link>
          <Link href="#courses" className="hover:text-blue-500">Courses</Link>
          <Link href="#contact" className="hover:text-blue-500">Help</Link>
          
          
        </div>
      </nav>
      {/* Hero Section */}
      <div>
        <h1 className=" text-2xl pl-4 font-bold text-gray-700">Welcome, {firstName}</h1>
      </div>
      <section id="About" className="flex flex-col-reverse md:flex-row items-center p-10 md:p-20">
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl font-bold mb-4">Welcome to the Ethiopian Defense University College of Engineering LMS - Teacher Portal</h2>
          <div className="text-lg text-gray-600 mb-6">
            <p>Empowering educators with the tools to create, manage, and deliver high-quality courses to future engineers.</p>
            <h2>🎓 What you can do:</h2>
              <ul>
                <li className=" text-green-300">📚 Create & Manage Courses
                </li>
                <li className=" text-yellow-300">
                🎥 Upload High-Quality Videos
                </li>
                <li className=" text-red-300">
                💬 Interact with Students
                </li>
                <li className=" text-blue-300">
                📊 Track your Progress
                </li>
              </ul>
              </div>
          
        {/* <Link href="/search">
  
            <Button className="bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700">
              Browse Courses
            </Button>
          
        </Link> */}
        </div>
        <div className="md:w-1/2">
          <Image src="/DEC-LOGO.jpg" width={600} height={400} alt="Trading view"  />
        </div>
      </section>
      {/* Features Section */}
      <section className="bg-white p-10 md:p-20">
        <h2 className="text-3xl font-bold text-center mb-6">Why Teach with Us?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-gray-200 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Seamless Course Management</h3>
            <p className="text-gray-600">Effortlessly upload materials, structure lessons, and manage your curriculum.</p>
          </div>
          <div className="p-6 bg-gray-200 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Engaging Assessments</h3>
            <p className="text-gray-600">Set up quizzes, assignments to evaluate student understanding.</p>
          </div>
          <div className="p-6 bg-gray-200 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Collaborative Learning Environment</h3>
            <p className="text-gray-600">Connect with students through discussions, Q&A sessions, and interactive lessons.</p>
          </div>
        </div>
      </section>
      
      {/** section with the courses that are purchased */}
      <section id="courses" className="bg-gray-100 p-10 md:p-20 text-center">
        <h2 className="text-3xl font-bold mb-6">Your Courses</h2>
        <Link href={"/teacher/courses"}>
        <Button>
          My Courses
        </Button>
        </Link>
        <p className="text-lg text-gray-600 mb-8">How many courses did i make.</p>
        
      </section>
      <section id="courses" className="bg-white p-10 md:p-20 text-center pb-4">
        <h2 className="text-3xl font-bold mb-6">Check your Performance</h2>
        <Link href={"/teacher/analytics"}>
        <Button>
          Check Revenue
        </Button>
        </Link>
        <p className="text-lg text-gray-600 mb-8">How much did I make?</p>
        
      </section>
      <section id="contact" className="bg-white p-10 md:p-20 pt-4">
        <h2 className="text-3xl font-bold text-center mb-6">Get in Touch</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-gray-200 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">📩 Reach Out Anytime</h3>
            <p className="text-gray-600"> Have questions or need support? We&apos;re here to help!</p>
          </div>
          <div className="p-6 bg-gray-200 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">📞 Contact Us</h3>
            <p className="text-gray-600">Stay connected with our team for inquiries, feedback, or assistance.</p>
          </div>
          <div className="p-6 bg-gray-200 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">📍 Join Our Community</h3>
            <p className="text-gray-600">Connect with instructors, engage in discussions, and collaborate with fellow learners.</p>
          </div>
        </div>
      </section>
      <section id="teacher" className="bg-gray-100 p-10 md:p-20">
        <div className="bg-white p-10 md:p-20 items-center justify-center grid grid-cols-1">
        <h2 className="text-3xl font-bold text-center mb-6">Need Assistance?</h2>
        <Button className="bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700">
          <Link href='mailto:getiyenahom751@gmail.com'  >Send us an email</Link>

        </Button>
        <p className="text-sm text-center mt-4 text-gray-600 mb-8">Reach Out Anytime</p>
        </div>
      </section>
       {/* Footer */}
       <footer className="bg-gray-900 text-white p-6 text-center">
        <p>🔹 Ready to shape the future of engineering education? Start creating your course today!</p>
        <p>&copy; {new Date().getFullYear()} EDU LMS. All rights reserved.</p>
        <p>Created by EDU students | Powered by Next.js</p>
      </footer>
      </div>
      
      

      
    </div>
  );
}

export default TeacherPage