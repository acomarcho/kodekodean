"use client";

import Image from "next/image";
import { useContext } from "react";
import { UnitModuleContext } from "@/contexts/unit-module-context";

export default function DesktopView() {
  const { unitModule, chunks } = useContext(UnitModuleContext);

  return (
    <>
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 bg-dark-gray">
        <div className="max-w-[1280px] mx-auto p-[1rem] px-[2.5rem]">
          <div className="flex items-center gap-[2rem]">
            <button className="pointer">
              <Image
                src="/icons/xmark.png"
                alt="X mark"
                width={38}
                height={51}
              />
            </button>
            <h1 className="text-white font-bold text-[2rem]">{`${unitModule.rank}. ${unitModule.title}`}</h1>
          </div>
        </div>
      </div>
      {/* Sidebar */}
      <div className="fixed top-[7.5rem] left-[2rem]">
        <div className="flex flex-col gap-[1rem]">
          {chunks.map((chunk) => {
            return (
              <button
                key={chunk.id}
                className="p-[1.5rem] bg-dark-gray font-bold text-white text-[1.25rem] pointer transition-all max-w-[200px] hover:bg-[#000000]"
              >
                {`${chunk.rank}. ${chunk.title}`}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
