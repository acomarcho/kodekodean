"use client";

import Image from "next/image";
import { useContext } from "react";
import { CourseUnitContext } from "@/contexts/course-unit-context";

export default function Hero() {
  const { courseUnit, modules } = useContext(CourseUnitContext);

  return (
    <div className="flex flex-col gap-[1rem] p-[1rem] lg:flex-row lg:justify-between lg:items-center lg:p-[2.5rem] pt-[calc(76px+1rem)] lg:pt-[calc(82px+1rem)]">
      <div className="flex flex-col gap-[1rem] lg:w-[50%]">
        <div className="flex flex-col gap-[0rem] lg:gap-[1rem]">
          <h1 className="text-white text-[1.25rem] font-bold lg:text-[3rem] lg:leading-[3.625rem]">
            {courseUnit.title
              ? `Unit ${courseUnit.rank}: ${courseUnit.title}`
              : "Course unit tidak ditemukan"}
          </h1>
          <p className="text-light-gray text-[1rem] lg:text-[1.25rem]">
            Anda sudah menyelesaikan 0/{modules.count} modul pada unit ini.
          </p>
        </div>
      </div>
      <div className="hidden lg:block lg:w-[50%]">
        <Image
          src="/assets/course-code.png"
          alt="Computer monitor with code written in it"
          width={560}
          height={180}
          className="mx-auto"
        />
      </div>
    </div>
  );
}
