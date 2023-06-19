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
  courseID: number;
}