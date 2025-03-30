"use server";

import {db} from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

// Fetch quizzes by course ID
export async function fetchQuizzesByCourse(courseId: string) {
  try {
    const quizzes = await db.quiz.findMany({
      where: { courseId },
    });

    // Transform `options` to ensure it is a string array
    return quizzes.map((quiz) => ({
      id: quiz.id,
      question: quiz.question,
      options: Array.isArray(quiz.options) && quiz.options.every((opt) => typeof opt === "string")
        ? (quiz.options as string[]) // Type assertion after validation
        : ["", "", "", ""], // Fallback if invalid
      correctIndex: quiz.correctIndex,
    }));
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    return [];
  }
}

// Save a quiz under a specific course
export async function saveQuiz(courseId: string, question: string, options: string[], correctIndex: number) {
  try {
    await db.quiz.create({
      data: {
        title: "",
        courseId,
        question,
        options,
        correctIndex,
      },
    });
  } catch (error) {
    console.error("Error saving quiz:", error);
  }
}

// Delete all quizzes under a course
export async function deleteQuizzesByCourse(courseId: string) {
  try {
    await db.quiz.deleteMany({
      where: { courseId },
    });
  } catch (error) {
    console.error("Error deleting quizzes:", error);
  }
}
// Check if a user has purchased a course
export async function checkCoursePurchase(courseId: string) {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  const purchase = await db.purchase.findFirst({
    where: {
      courseId,
      userId,
    },
  });

  return !!purchase; // Returns true if purchase exists
}
