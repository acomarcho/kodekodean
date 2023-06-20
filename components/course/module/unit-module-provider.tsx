"use client";

import { ReactNode, useState, useEffect } from "react";
import { UnitModuleContext } from "@/contexts/unit-module-context";
import { CourseUnitModule } from "@/lib/schema";
import { Spin } from "antd";

interface Props {
  children?: ReactNode;
  id: number;
}

export default function UnitModuleProvider({ children, id }: Props) {
  const [unitModule, setUnitModule] = useState<CourseUnitModule>({
    id: -1,
    title: "",
    description: "",
    rank: -1,
    course_unit_id: -1,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Get module data from API
    setUnitModule({
      id: 1,
      title: "Apa itu paradigma fungsional?",
      description: "Belajar mengenali apa itu paradigma fungsional",
      rank: 1,
      course_unit_id: 1,
    });
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="h-[100vh] flex flex-col justify-center items-center gap-[1rem] bg-black">
        <div>
          <Spin size="large" />
        </div>
        <p className="text-white font-bold text-[2rem]">Loading ...</p>
      </div>
    );
  }

  return (
    <UnitModuleContext.Provider value={unitModule}>
      {children}
    </UnitModuleContext.Provider>
  );
}
