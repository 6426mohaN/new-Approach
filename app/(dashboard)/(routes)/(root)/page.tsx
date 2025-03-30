import { getDashboardCourses } from "@/actions/get-dashboardCourses";
import { CoursesList } from "@/components/courses-list";
import { SignedIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { CheckCircle, Clock } from "lucide-react";
import { redirect } from "next/navigation";
import { InfoCard } from "./_components/info-card";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";


export default async function Home() {
  const { userId } = auth();

  if(!userId){
    return redirect('/')
  }

  const {
    completedCourses,
    coursesInProgress
  } = await getDashboardCourses(userId)

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
        <h1 className="text-2xl font-bold"><span className="text-blue-500">EDU</span> <span className="text-green-700">LMSS</span></h1>
        
        <div className="space-x-4">
          <Link href="#about" className="hover:text-blue-500">About</Link>
          <Link href="#courses" className="hover:text-blue-500">Courses</Link>
          <Link href="#contact" className="hover:text-blue-500">Contact</Link>
          <Link href="#teacher" className="hover:text-blue-500">Become a Teacher</Link>
          
        </div>
      </nav>
      {/* Hero Section */}
      <div>
        <h1 className=" text-2xl pl-4 font-bold text-gray-700">Welcome, {firstName}</h1>
      </div>
      <section id="About" className="flex flex-col-reverse md:flex-row items-center p-10 md:p-20">
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl font-bold mb-4">Welcome to the Ethiopian Defense University College of Engineering LMS - Student Portal</h2>
          <div className="text-lg text-gray-600 mb-6">
            <p>Empowering future engineers with seamless access to quality courses, interactive discussions, and engaging assessments.</p>
            
              <ul>
                <li className=" text-green-300">📚 Explore a variety of courses.
                </li>
                <li className=" text-yellow-300">
                🎥 Learn through high-quality video.
                </li>
                <li className=" text-red-300">
                💬 Connect with instructors and peers in dedicated discussion spaces.
                </li>
                <li className=" text-blue-300">
                🎓 Track your progress and earn certifications upon course completion.
                </li>
              </ul>
              </div>
          
        <Link href="/search">
  
            <Button className="bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700">
              Browse Courses
            </Button>
          
        </Link>
        </div>
        <div className="md:w-1/2">
          <Image src="/DEC-LOGO.jpg" width={600} height={400} alt="Trading view"  />
        </div>
      </section>
      {/* Features Section */}
      <section className="bg-white p-10 md:p-20">
        <h2 className="text-3xl font-bold text-center mb-6">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-gray-200 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Real-Time Learning</h3>
            <p className="text-gray-600">Access up-to-date course materials, ensuring you stay ahead in your studies..</p>
          </div>
          <div className="p-6 bg-gray-200 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Interactive Lessons</h3>
            <p className="text-gray-600">Engage with dynamic video lectures, quizzes, and hands-on assignments.</p>
          </div>
          <div className="p-6 bg-gray-200 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Community & Collaboration</h3>
            <p className="text-gray-600">Join discussions, connect with instructors, and collaborate with fellow students to enhance your learning experience.</p>
          </div>
        </div>
      </section>
      
      {/** section with the courses that are purchased */}
      <section id="courses" className="bg-gray-100 p-10 md:p-20 text-center">
        <h2 className="text-3xl font-bold mb-6">Courses</h2>
        <p className="text-lg text-gray-600 mb-8">Surf through your courses.</p>
        <div>
        <CoursesList
          items= {[...coursesInProgress, ...completedCourses] }
           />
        </div>
      </section>
      <section id="contact" className="bg-white p-10 md:p-20">
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
        <h2 className="text-3xl font-bold text-center mb-6">Want to become a Teacher?</h2>
        <Button className="bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700">
          <Link href='mailto:getiyenahom751@gmail.com'  >Send us an email</Link>

        </Button>
        <p className="text-sm text-center mt-4 text-gray-600 mb-8">We will take care of Everything</p>
        </div>
      </section>
       {/* Footer */}
       <footer className="bg-gray-900 text-white p-6 text-center">
        <p>&copy; {new Date().getFullYear()} EDU LMS. All rights reserved.</p>
        <p>Created by EDU students | Powered by Next.js</p>
      </footer>
      </div>
      
      

      
    </div>
  );
}
