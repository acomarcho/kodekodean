import { createContext } from "react";
import { CourseUnit } from "@/lib/schema";

export const CourseUnitContext = createContext<CourseUnit>({
  id: -1,
  title: "",
  rank: -1,
  courseID: -1,
});
