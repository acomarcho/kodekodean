"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SingleCourseUnitModule } from "@/lib/state/response";

interface ModuleProps {
  module: SingleCourseUnitModule;
}

export default function ModuleAccordion({ module }: ModuleProps) {
  const { id, title, description, rank } = module.unitModule;
  const { isFinished } = module;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const router = useRouter();

  const handleClick = () => {
    setIsOpen((oldIsOpen) => !oldIsOpen);
  };

  return (
    <div className="p-[1rem] bg-dark-gray lg:p-[1.5rem]" key={id}>
      <div className="flex justify-between items-center">
        <h1 className="text-white text-[1rem] font-bold w-[60%] lg:text-[2rem]">
          <span className={`${isFinished ? "text-green" : "text-yellow"}`}>
            {`#${rank}`}.{" "}
          </span>
          {title}
        </h1>
        <button
          className={`pointer transition-all ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          onClick={handleClick}
        >
          <Image
            src="/icons/chevron-down.png"
            alt="Chevron icon"
            width={25}
            height={25}
          />
        </button>
      </div>
      <div
        className={`transition-all flex flex-col gap-[0.75rem] overflow-hidden ${
          isOpen ? "max-h-[10rem] mt-[1rem]" : "max-h-[0rem]"
        } lg:gap-[1rem]`}
      >
        <p className="text-light-gray text-[1rem] lg:text-[1.25rem]">
          {description}
        </p>
        <button
          className="w-[100%] bg-primary px-[1.25rem] py-[1rem] text-white font-bold transition-all hover:bg-primary-hover text-[1rem] lg:text-[1.25rem]"
          onClick={() => router.push(`/course/unit/module/${id}`)}
        >
          Lihat materi
        </button>
      </div>
    </div>
  );
}
