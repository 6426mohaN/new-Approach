export const isTeacher = (metadata?: any) => {
  return metadata?.role === "teacher";
};

export const isAdmin = (metadata?: any) => {
  return metadata?.role === "admin";
};
// export const isStudent = (metadata?: any) => {
//   // If role is null or not set, consider the user as a student
//   return metadata?.role === "student" || metadata?.role === null;
// };