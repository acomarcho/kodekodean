"use client";

import { ReactNode } from "react";
import { useEffect, useState } from "react";
import { CourseContext } from "@/contexts/course-context";
import { Course } from "@/lib/schema";
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
    // TODO: Fetch course data from API
    setCourse({
      id: id,
      title: "Pemrograman fungsional menggunakan Haskell",
      description:
        "Belajar pemrograman menggunakan paradigma fungsional. Anda akan mempelajari gaya pemrograman fungsional, fungsi rekursif, dan fungsi lambda. Lorem ipsum dolor sit amet, constectur adipiscing elit. Lorem ipsum dolor sit amet, constectur adipiscing elit.",
      course: "IF1210 Dasar Pemrograman",
    });
    setIsLoading(false);
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
