"use client";

import { ReactNode } from "react";
import { useEffect, useState } from "react";
import { CourseContext } from "@/contexts/course-context";
import { Course } from "@/lib/state/schema";
import { CourseDetailResponse } from "@/lib/state/response";
import { Spin } from "antd";
import axios from "axios";

interface Props {
  children?: ReactNode;
  id: number;
}

export default function CourseProvider({ children, id }: Props) {
  const [course, setCourse] = useState<Course>({
    id: -1,
    title: "",
    description: "",
    course: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourseInfo = async () => {
      setIsLoading(true);
      try {
        const response = (await axios.get(
          `/api/course/${id}`
        )) as CourseDetailResponse;

        setCourse(response.data.course);
      } catch (error) {
        setCourse({
          id: -1,
          title: "",
          description: "",
          course: "",
        });
      }
      setIsLoading(false);
    };

    fetchCourseInfo();
  }, [id]);

  if (isLoading) {
    return (
      <div className="h-[100vh] flex flex-col justify-center items-center gap-[1rem]">
        <div>
          <Spin size="large" />
        </div>
        <p className="text-white font-bold text-[2rem]">Loading ...</p>
      </div>
    );
  }

  return (
    <CourseContext.Provider value={course}>{children}</CourseContext.Provider>
  );
}
