"use client";

import { ReactNode } from "react";
import { useEffect, useState } from "react";
import { CourseUnitContext } from "@/contexts/course-unit-context";
import { CourseUnit } from "@/lib/schema";
import { Spin } from "antd";
import axios from "axios";

interface Props {
  children?: ReactNode;
  id: number;
}

export default function CourseUnitProvider({ children, id }: Props) {
  const [courseUnit, setCourseUnit] = useState<CourseUnit>({
    id: -1,
    title: "",
    rank: -1,
    courseID: -1,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourseUnitInfo = async () => {
      setIsLoading(true);
      try {
        interface CourseUnitDetailResponse {
          data: {
            courseUnit: CourseUnit;
          };
        }
        const response = (await axios.get(
          `/api/course-unit/${id}`
        )) as CourseUnitDetailResponse;

        setCourseUnit(response.data.courseUnit);
      } catch (error) {
        setCourseUnit({
          id: -1,
          title: "",
          rank: -1,
          courseID: -1,
        });
      }
      setIsLoading(false);
    };

    fetchCourseUnitInfo();
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
    <CourseUnitContext.Provider value={courseUnit}>
      {children}
    </CourseUnitContext.Provider>
  );
}
