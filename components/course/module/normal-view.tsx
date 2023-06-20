"use client";

import Image from "next/image";
import { useContext, useState } from "react";
import { UnitModuleContext } from "@/contexts/unit-module-context";

export default function NormalView() {
  const { unitModule, chunks } = useContext(UnitModuleContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setIsOpen((oldIsOpen) => !oldIsOpen);
  };

  return (
    <>
      {/* Navigation bar */}
      <div className="p-[1rem] bg-dark-gray flex justify-between items-center">
        <button
          className={`pointer transition-all ${
            !isOpen ? "rotate-0" : "rotate-90"
          }`}
          onClick={() => handleOpen()}
        >
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
        {/* Overlay*/}
        <div className="fixed top-0 left-0 w-[100vw] h-[100vh] bg-transparent z-[2]">
          {/* Sidebar */}
          <div className="fixed top-0 left-0 w-[50%] h-[100vh] bg-dark-gray p-[1rem] z-[3]">
            <div className="flex flex-col gap-[1rem]">
              {chunks.map((chunk) => {
                return (
                  <button
                    key={chunk.id}
                    className="p-[0.5rem] text-white bg-none border-2 border-white transition-all pointer hover:bg-white hover:text-black"
                  >
                    {`${chunk.rank}. ${chunk.title}`}
                  </button>
                );
              })}
              <button className="p-[0.5rem] text-white bg-none border-2 border-white transition-all pointer hover:bg-white hover:text-black">
                Keluar dari modul
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
