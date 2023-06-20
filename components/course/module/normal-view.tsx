"use client";

import Image from "next/image";
import { useContext } from "react";
import { UnitModuleContext } from "@/contexts/unit-module-context";

export default function NormalView() {
  const unitModule = useContext(UnitModuleContext);

  return (
    <>
      {/* Navigation bar */}
      <div className="p-[1rem] bg-dark-gray flex justify-between items-center">
        <button>
          <Image
            src="/icons/hamburger.png"
            alt="Hamburger icon"
            width={32}
            height={27.75}
          />
        </button>
        <h1 className="w-[60%] text-white text-right font-bold text-[1.25rem]">
          {`${unitModule.rank}. ${unitModule.title}`}
        </h1>
      </div>
    </>
  );
}
