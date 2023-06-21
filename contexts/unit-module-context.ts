import { createContext } from "react";
import { CourseUnitModule, CourseUnitModuleChunk } from "@/lib/schema";

// TODO: Define chunk structure
export interface IUnitModuleContext {
  unitModule: CourseUnitModule;
  chunks: CourseUnitModuleChunk[];
}

export const UnitModuleContext = createContext<IUnitModuleContext>({
  unitModule: {
    id: -1,
    title: "",
    description: "",
    rank: -1,
    course_unit_id: -1,
  },
  chunks: [],
});
