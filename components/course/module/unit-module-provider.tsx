"use client";

import { ReactNode, useState, useEffect } from "react";
import { UnitModuleContext } from "@/contexts/unit-module-context";
import { CourseUnitModule, CourseUnitModuleChunk } from "@/lib/schema";
import { Spin } from "antd";
import axios from "axios";

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
  const [chunks, setChunks] = useState<CourseUnitModuleChunk[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUnitModuleInfo = async () => {
      setIsLoading(true);

      try {
        interface UnitModuleDetailResponse {
          data: {
            unitModule: CourseUnitModule;
          };
        }

        const unitModuleDetailResponse = (await axios.get(
          `/api/unit-module/${id}`
        )) as UnitModuleDetailResponse;

        setUnitModule(unitModuleDetailResponse.data.unitModule);
      } catch (error) {
        setUnitModule({
          id: -1,
          title: "",
          description: "",
          rank: -1,
          course_unit_id: -1,
        });
      }

      try {
        interface UnitModuleChunksResponse {
          data: {
            moduleChunks: CourseUnitModuleChunk[];
          };
        }

        const unitModuleChunksResponse = (await axios.get(
          `/api/unit-module/chunks/${id}`
        )) as UnitModuleChunksResponse;

        setChunks(unitModuleChunksResponse.data.moduleChunks);
      } catch (error) {
        setChunks([]);
      }

      setIsLoading(false);
    };

    fetchUnitModuleInfo();
  }, [id]);

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
    <UnitModuleContext.Provider value={{ unitModule, chunks }}>
      {children}
    </UnitModuleContext.Provider>
  );
}
