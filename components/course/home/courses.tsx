"use client";

import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { Course } from "@/lib/schema";
import { notification, Spin } from "antd";
import { useRouter } from "next/navigation";

export default function Courses() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [courses, setCourses] = useState<Course[]>([]);

  const [api, contextHolder] = notification.useNotification();

  const router = useRouter();

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);

      try {
        interface CourseResponse {
          data: {
            courses: Course[];
          };
        }

        const response = (await axios.get("/api/course")) as CourseResponse;
        setCourses(response.data.courses);

        setIsLoading(false);
      } catch (error) {
        interface ErrorResponse {
          data: {
            message: string;
          };
        }

        const err = error as AxiosError;
        let errMessage = "";
        if (err.response) {
          const errResponse = err.response as ErrorResponse;
          errMessage = errResponse.data.message;
        } else {
          errMessage = err.message;
        }
        api.error({
          message: "Gagal mengambil data courses",
          description: errMessage,
          placement: "bottomRight",
        });
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [api]);

  const handleClick = (id: number) => {
    router.push(`/course/${id}`);
  };

  if (isLoading) {
    return (
      <div className="w-[100%] flex flex-col justify-center items-center gap-[1rem]  p-[1rem] lg:px-[2.5rem]">
        {contextHolder}
        <div>
          <Spin size="large" />
        </div>
        <p className="text-white font-bold text-[2rem]">Loading ...</p>
      </div>
    );
  }

  return (
    <div className="p-[1rem] grid grid-cols-1 gap-[1rem] lg:px-[2.5rem] lg:grid-cols-2">
      {contextHolder}
      {!isLoading &&
        courses.map(({ id, title, description, course }) => {
          return (
            <div
              className="w-[100%] bg-dark-gray flex flex-col gap-[2rem] justify-between p-[1.5rem] lg:p-[2rem]"
              key={id}
            >
              {/* Course information */}
              <div className="flex flex-col gap-[1rem]">
                <h1 className="text-white font-bold text-[1.25rem] lg:text-[1.75rem]">
                  {title}
                </h1>
                <p className="text-light-gray text-[1rem] lg:text-[1.25rem]">
                  {description}
                </p>
                <p className="text-green text-[1rem] lg:text-[1.25rem]">
                  Materi diambil dari mata kuliah {course}
                </p>
              </div>
              {/* Button */}
              <button
                className="text-white border-2 border-white p-[1rem] font-bold transition-all hover:pointer hover:text-black hover:bg-white text-[1rem] lg:text-[1.25rem]"
                onClick={() => handleClick(id)}
              >
                Mulai belajar
              </button>
            </div>
          );
        })}
    </div>
  );
}
