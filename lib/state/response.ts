import {
  Course,
  CourseUnit,
  CourseUnitModule,
  CourseUnitModuleChunk,
} from "@/lib/state/schema";

export interface CourseDetailResponse {
  data: {
    course: Course;
  };
}

export interface CourseUnitData {
  unit: CourseUnit;
  modules: {
    count: number;
    finishedCount: number;
  };
}

export interface CourseUnitResponse {
  data: {
    units: CourseUnitData[];
  };
}

export interface ErrorResponse {
  data: {
    message: string;
  };
}

export interface CourseResponse {
  data: {
    courses: Course[];
  };
}

export interface Chunk {
  id: number;
  title: string;
  content_path: string;
  rank: number;
  unit_module_id: number;
  content: string;
}

export interface ChunkDetailResponse {
  data: {
    moduleChunk: Chunk;
  };
}

export interface UnitModuleDetailResponse {
  data: {
    unitModule: CourseUnitModule;
  };
}

export interface UnitModuleChunksResponse {
  data: {
    moduleChunks: CourseUnitModuleChunk[];
  };
}

export interface CourseUnitDetailResponse {
  data: {
    courseUnit: CourseUnit;
    modules: {
      count: number;
      finishedCount: number;
    };
  };
}

export interface SingleCourseUnitModule {
  unitModule: CourseUnitModule;
  isFinished: boolean;
}

export interface CourseUnitModuleResponse {
  data: {
    unitModules: SingleCourseUnitModule[];
  };
}

export interface LoginResponse {
  data: {
    message: string;
  };
}

export interface RegisterResponse {
  data: {
    message: string;
  };
}