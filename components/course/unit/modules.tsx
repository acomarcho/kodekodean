"use client";

import { useState, useEffect, useContext } from "react";
import { CourseUnitContext } from "@/contexts/course-unit-context";
import axios, { AxiosError } from "axios";
import { CourseUnitModule } from "@/lib/schema";
import { notification, Spin } from "antd";
import ModuleAccordion from "./module-accordion";

export default function Modules() {
  const modules = [
    {
      id: 1,
      title: "Apa itu paradigma fungsional?",
      description: "Lorem ipsum dolor sit amet, constectur adipiscing elit.",
      finished: true,
      rank: 1,
    },
    {
      id: 2,
      title: "Instalasi Haskell",
      description:
        "Cara melakukan instalasi compiler Haskell (GHCi) untuk memulai pemrograman dalam Haskell",
      finished: false,
      rank: 2,
    },
    {
      id: 3,
      title: "Program Haskell pertama Anda",
      description:
        "Lorem ipsum dolor sit amet, constectur adipiscing elit. Lorem ipsum dolor sit amet, constectur adipiscing elit.",
      finished: false,
      rank: 3,
    },
  ];

  return (
    <div className="p-[1rem] flex flex-col gap-[1rem] lg:px-[2.5rem] lg:gap-[1.5rem]">
      {modules.map((module) => {
        return <ModuleAccordion key={module.id} module={module} />;
      })}
    </div>
  );
}
