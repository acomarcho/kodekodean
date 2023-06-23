"use client";

import { useState, useEffect, useContext } from "react";
import { CourseUnitContext } from "@/contexts/course-unit-context";
import axios, { AxiosError } from "axios";
import { CourseUnitModule } from "@/lib/schema";
import { notification, Spin } from "antd";
import ModuleAccordion from "./module-accordion";

export default function Modules() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [unitModules, setUnitModules] = useState<CourseUnitModule[]>([]);
  const { courseUnit } = useContext(CourseUnitContext);

  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    const fetchCourseUnitModules = async () => {
      setIsLoading(true);

      try {
        interface CourseUnitModuleResponse {
          data: {
            unitModules: CourseUnitModule[];
          };
        }

        const response = (await axios.get(
          `/api/course-unit/modules/${courseUnit.id}`
        )) as CourseUnitModuleResponse;
        setUnitModules(response.data.unitModules);

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
          message: "Gagal mengambil modul dari unit",
          description: errMessage,
          placement: "bottomRight",
        });
        setIsLoading(false);
      }
    };

    fetchCourseUnitModules();
  }, [api, courseUnit]);

  if (isLoading) {
    return (
      <div className="w-[100%] flex flex-col justify-center items-center gap-[1rem] p-[1rem] lg:px-[2.5rem]">
        {contextHolder}
        <div>
          <Spin size="large" />
        </div>
        <p className="text-white font-bold text-[2rem]">Loading ...</p>
      </div>
    );
  }

  return (
    <div className="p-[1rem] flex flex-col gap-[1rem] lg:px-[2.5rem] lg:gap-[1.5rem]">
      {unitModules.map((module) => {
        return <ModuleAccordion key={module.id} module={module} />;
      })}
    </div>
  );
}
