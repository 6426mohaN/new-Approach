// "use client";

// import { useState, useEffect } from "react";
// import { useUser } from "@clerk/nextjs"; // Client-side user hook
// import { fetchQuizzesByCourse } from "@/actions/quizActions";
// import CertificatePage from "@/components/CertificatePage";
// import { db } from "@/lib/db";

// interface Quiz {
//   id: number;
//   question: string;
//   options: string[];
//   correctIndex: number;
// }

// export default function TestPage({
//   courseId,
//   courseTitle,
// }: {
//   courseId: string;
//   courseTitle: string;
// }) {
//   const { user } = useUser(); // Access user data on the client
//   const [quizzes, setQuizzes] = useState<Quiz[]>([]);
//   const [answers, setAnswers] = useState<number[]>([]);
//   const [score, setScore] = useState<number | null>(null);
//   // const [courseTitle, setCourseTitle] = useState<string | null>(null);
//   console.log("Rendering TestPage with courseId:", courseId);



//   const userName = user?.firstName || "Guest";

//   useEffect(() => {
//     if (!courseId) {
//       console.error("courseId is missing, skipping quiz fetch.");
//       return;
//     }

//     async function loadQuizzes() {
//       try {

//         const fetchedQuizzes = await fetchQuizzesByCourse(courseId);
//         const parsedQuizzes = fetchedQuizzes.map((quiz) => ({
//           id: quiz.id,
//           question: quiz.question,
//           options: Array.isArray(quiz.options) ? (quiz.options as string[]) : ["", "", "", ""],
//           correctIndex: quiz.correctIndex,
//         }));

//         setQuizzes(parsedQuizzes);
//         setAnswers(new Array(parsedQuizzes.length).fill(-1));
//       } catch (error) {
//         console.error("Error fetching quizzes:", error);
//       }
//     }

//     loadQuizzes();
//   }, [courseId]);

//   const handleOptionChange = (quizIndex: number, optionIndex: number) => {
//     const updatedAnswers = [...answers];
//     updatedAnswers[quizIndex] = optionIndex;
//     setAnswers(updatedAnswers);
//   };

//   const calculateScore = () => {
//     let calculatedScore = 0;

//     quizzes.forEach((quiz, index) => {
//       if (answers[index] === quiz.correctIndex) {
//         calculatedScore += 1;
//       }
//     });

//     const finalScore = Math.round((calculatedScore / quizzes.length) * 100);
//     setScore(finalScore);
    

//   };
//   console.log("QuizPage received courseId:", courseId);

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">

//       <h1>quiz pagee {courseTitle}</h1>

//       {quizzes.length === 0 ? (
//         <p>Loading quizzes...</p>
//       ) : (
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             calculateScore();
//           }}
//         >
//           {quizzes.map((quiz, quizIndex) => (
//             <div key={quiz.id} className="mb-6 p-4 border rounded-md">
//               <h3 className="font-medium mb-2">{quiz.question}</h3>
//               <div className="space-y-2">
//                 {quiz.options.map((option, optionIndex) => (
//                   <label key={optionIndex} className="flex items-center space-x-2">
//                     <input
//                       type="radio"
//                       name={`question-${quizIndex}`}
//                       value={optionIndex}
//                       checked={answers[quizIndex] === optionIndex}
//                       onChange={() => handleOptionChange(quizIndex, optionIndex)}
//                       className="cursor-pointer"
//                     />
//                     <span>{option}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>
//           ))}

//           {score === null ? (
//             <button
//               type="submit"
//               className="bg-green-500 text-white px-4 py-2 rounded-md w-full"
//             >
//               Submit Test
//             </button>
//           ) : score >= 50 ? (

            
//             <CertificatePage userName={userName} courseTitle={courseTitle} />




//           ) : (
//             <div className="mt-6 text-center">
//               <p className="text-lg font-medium text-red-500">
//                 Sorry, you scored {score}%. Try again to pass the course!
//               </p>
//               <button
//                 type="button"
//                 onClick={() => {
//                   setScore(null);
//                   setAnswers(new Array(quizzes.length).fill(-1));
//                 }}
//                 className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
//               >
//                 Retake Test
//               </button>
//             </div>
//           )}
//         </form>
//       )}
//     </div>
//   );
// }
/****************************************************************************************** */

// "use client";

// import { useState, useEffect } from "react";
// import { useUser } from "@clerk/nextjs";
// import { useParams } from "next/navigation"; // ✅ Correct way to get dynamic params in a Client Component
// import { fetchQuizzesByCourse } from "@/actions/quizActions";
// import CertificatePage from "@/components/CertificatePage";

// interface Quiz {
//   id: number;
//   question: string;
//   options: string[];
//   correctIndex: number;
// }

// export default function TestPage() {
//   const params = useParams(); // ✅ Get URL parameters dynamically
//   const courseId = params?.courseId as string; // ✅ Ensure courseId is a string
//   const { user } = useUser(); 

//   const [quizzes, setQuizzes] = useState<Quiz[]>([]);
//   const [answers, setAnswers] = useState<number[]>([]);
//   const [score, setScore] = useState<number | null>(null);
//   const [courseTitle, setCourseTitle] = useState<string | null>(null);

//   console.log("Rendering TestPage with courseId:", courseId);

//   const userName = user?.firstName || "Guest";

//   useEffect(() => {
//     if (!courseId) {
//       console.error("courseId is missing, skipping quiz fetch.");
//       return;
//     }

//     async function loadQuizzes() {
//       try {
//         const fetchedQuizzes = await fetchQuizzesByCourse(courseId);
//         const parsedQuizzes = fetchedQuizzes.map((quiz) => ({
//           id: quiz.id,
//           question: quiz.question,
//           options: Array.isArray(quiz.options) ? quiz.options : ["", "", "", ""],
//           correctIndex: quiz.correctIndex,
//         }));

//         setQuizzes(parsedQuizzes);
//         setAnswers(new Array(parsedQuizzes.length).fill(-1));

//         //courseTitle={courseTitle}
//         setCourseTitle("Sample Course Title"); // Replace with actual fetching logic

//       } catch (error) {
//         console.error("Error fetching quizzes:", error);
//       }
//     }

//     loadQuizzes();
//   }, [courseId]);

//   const handleOptionChange = (quizIndex: number, optionIndex: number) => {
//     const updatedAnswers = [...answers];
//     updatedAnswers[quizIndex] = optionIndex;
//     setAnswers(updatedAnswers);
//   };

//   const calculateScore = () => {
//     let calculatedScore = 0;
//     quizzes.forEach((quiz, index) => {
//       if (answers[index] === quiz.correctIndex) {
//         calculatedScore += 1;
//       }
//     });

//     const finalScore = Math.round((calculatedScore / quizzes.length) * 100);
//     setScore(finalScore);
//   };

//   console.log("QuizPage received courseId:", courseId);

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
//       <h1>Quiz Page: {courseTitle || "Loading..."}</h1>

//       {quizzes.length === 0 ? (
//         <p>Loading quizzes...</p>
//       ) : (
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             calculateScore();
//           }}
//         >
//           {quizzes.map((quiz, quizIndex) => (
//             <div key={quiz.id} className="mb-6 p-4 border rounded-md">
//               <h3 className="font-medium mb-2">{quiz.question}</h3>
//               <div className="space-y-2">
//                 {quiz.options.map((option, optionIndex) => (
//                   <label key={optionIndex} className="flex items-center space-x-2">
//                     <input
//                       type="radio"
//                       name={`question-${quizIndex}`}
//                       value={optionIndex}
//                       checked={answers[quizIndex] === optionIndex}
//                       onChange={() => handleOptionChange(quizIndex, optionIndex)}
//                       className="cursor-pointer"
//                     />
//                     <span>{option}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>
//           ))}

//           {score === null ? (
//             <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md w-full">
//               Submit Test
//             </button>
//           ) : score >= 50 ? (
//             <CertificatePage userName={userName} courseTitle={courseTitle || "Course"} />
//           ) : (
//             <div className="mt-6 text-center">
//               <p className="text-lg font-medium text-red-500">
//                 Sorry, you scored {score}%. Try again to pass the course!
//               </p>
//               <button
//                 type="button"
//                 onClick={() => {
//                   setScore(null);
//                   setAnswers(new Array(quizzes.length).fill(-1));
//                 }}
//                 className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
//               >
//                 Retake Test
//               </button>
//             </div>
//           )}
//         </form>
//       )}
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs"; // Client-side user hook
import { fetchQuizzesByCourse } from "@/actions/quizActions";
import CertificatePage from "@/components/CertificatePage";
import { db } from "@/lib/db";

interface Quiz {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
}

export default function TestPage({
  courseId,
  courseTitle: initialCourseTitle,
}: {
  courseId: string;
  courseTitle?: string;
}) {
  const { user } = useUser(); // Access user data on the client
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [answers, setAnswers] = useState<number[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [courseTitle, setCourseTitle] = useState<string | null>(initialCourseTitle || null);

  console.log("Rendering TestPage with courseId:", courseId);

  const userName = user?.firstName || "Guest";

  useEffect(() => {
    if (!courseId) {
      console.error("courseId is missing, skipping quiz fetch.");
      return;
    }

    async function loadQuizzes() {
      try {
        const fetchedQuizzes = await fetchQuizzesByCourse(courseId);
        const parsedQuizzes = fetchedQuizzes.map((quiz) => ({
          id: quiz.id,
          question: quiz.question,
          options: Array.isArray(quiz.options) ? quiz.options : ["", "", "", ""],
          correctIndex: quiz.correctIndex,
        }));

        setQuizzes(parsedQuizzes);
        setAnswers(new Array(parsedQuizzes.length).fill(-1));

        // ✅ Fetch Course Title Dynamically if Not Provided
        if (!initialCourseTitle) {
          const courseDetails = await db.course.findUnique({
            where: { id: courseId },
            select: { title: true },
          });

          setCourseTitle(courseDetails?.title || "Unknown Course");
        }
      } catch (error) {
        console.error("Error fetching quizzes or course details:", error);
      }
    }

    loadQuizzes();
  }, [courseId, initialCourseTitle]);

  const handleOptionChange = (quizIndex: number, optionIndex: number) => {
    const updatedAnswers = [...answers];
    updatedAnswers[quizIndex] = optionIndex;
    setAnswers(updatedAnswers);
  };

  const calculateScore = () => {
    let calculatedScore = 0;

    quizzes.forEach((quiz, index) => {
      if (answers[index] === quiz.correctIndex) {
        calculatedScore += 1;
      }
    });

    const finalScore = Math.round((calculatedScore / quizzes.length) * 100);
    setScore(finalScore);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1>Quiz Page - {courseTitle}</h1>

      {quizzes.length === 0 ? (
        <p>Loading quizzes...</p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            calculateScore();
          }}
        >
          {quizzes.map((quiz, quizIndex) => (
            <div key={quiz.id} className="mb-6 p-4 border rounded-md">
              <h3 className="font-medium mb-2">{quiz.question}</h3>
              <div className="space-y-2">
                {quiz.options.map((option, optionIndex) => (
                  <label key={optionIndex} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`question-${quizIndex}`}
                      value={optionIndex}
                      checked={answers[quizIndex] === optionIndex}
                      onChange={() => handleOptionChange(quizIndex, optionIndex)}
                      className="cursor-pointer"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          {score === null ? (
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-md w-full"
            >
              Submit Test
            </button>
          ) : score >= 50 ? (
            <CertificatePage userName={userName} courseTitle={courseTitle || "Unknown Course"} />
          ) : (
            <div className="mt-6 text-center">
              <p className="text-lg font-medium text-red-500">
                Sorry, you scored {score}%. Try again to pass the course!
              </p>
              <button
                type="button"
                onClick={() => {
                  setScore(null);
                  setAnswers(new Array(quizzes.length).fill(-1));
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
              >
                Retake Test
              </button>
            </div>
          )}
        </form>
      )}
    </div>
  );
}
