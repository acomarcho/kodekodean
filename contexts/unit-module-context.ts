import { createContext } from "react";
import { CourseUnitModule } from "@/lib/schema";

export const UnitModuleContext = createContext<CourseUnitModule>({
  id: -1,
  title: "",
  description: "",
  rank: -1,
  course_unit_id: -1,
});
