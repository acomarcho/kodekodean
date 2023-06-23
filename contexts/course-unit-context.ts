import { createContext } from "react";
import { CourseUnit } from "@/lib/schema";

export interface ICourseUnitContext {
  courseUnit: CourseUnit;
  modules: {
    count: number;
  };
}

export const CourseUnitContext = createContext<ICourseUnitContext>({
  courseUnit: {
    id: -1,
    title: "",
    rank: -1,
    course_id: -1,
  },
  modules: {
    count: 0,
  },
});
