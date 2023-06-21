export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  course: string;
}

export interface CourseUnit {
  id: number;
  title: string;
  rank: number;
  course_id: number;
}

export interface CourseUnitModule {
  id: number;
  title: string;
  description: string;
  rank: number;
  course_unit_id: number;
}

export interface CourseUnitModuleChunk {
  id: number;
  title: string;
  content_path: string;
  rank: number;
  unit_module_id: number;
}
