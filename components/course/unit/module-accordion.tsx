"use client";

import { useState } from "react";

interface ModuleProps {
  module: {
    id: number;
    title: string;
    description: string;
    finished: boolean;
    rank: number;
  };
}

export default function ModuleAccordion({ module }: ModuleProps) {
  const { id, title, description, finished, rank } = module;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="p-[1rem] bg-dark-gray lg:p-[1.5rem]" key={id}>
      <h1 className="text-white text-[1rem] font-bold lg:text-[2rem]">
        <span className={`${finished ? "text-green" : "text-yellow"}`}>
          {`#${rank}`}.{" "}
        </span>
        {title}
      </h1>
      <div
        className={`transition-all flex flex-col gap-[0.75rem] lg:gap-[1rem]`}
      >
        <p className="text-light-gray text-[1rem] lg:text-[1.25rem]">
          {description}
        </p>
        <button className="w-[100%] bg-primary px-[1.25rem] py-[1rem] text-white font-bold transition-all hover:bg-primary-hover text-[1rem] lg:text-[1.25rem]">
          Lihat materi
        </button>
      </div>
    </div>
  );
}
