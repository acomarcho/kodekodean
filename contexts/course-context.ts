import { createContext } from "react";
import { Course } from "@/lib/schema";

export const CourseContext = createContext<Course>({
  id: -1,
  title: "",
  description: "",
  course: "",
});
