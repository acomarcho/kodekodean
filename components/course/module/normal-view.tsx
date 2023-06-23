"use client";

import Image from "next/image";
import { useContext, useState, useRef, useEffect } from "react";
import { UnitModuleContext } from "@/contexts/unit-module-context";
import { ViewProps } from "./chunk-provider";
import { Spin } from "antd";
import { useRouter } from "next/navigation";
import MarkdownWithCode from "./markdown-with-code";
import { useWindowSize } from "usehooks-ts";

export default function NormalView({
  isLoading,
  chunkIndex,
  setChunkIndex,
  chunk,
}: ViewProps) {
  const { unitModule, chunks } = useContext(UnitModuleContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [navbarHeight, setNavbarHeight] = useState<number>(0);
  const navbarRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const { width, height } = useWindowSize();

  useEffect(() => {
    if (!navbarRef.current?.clientHeight) {
      return;
    }

    setNavbarHeight(navbarRef.current?.clientHeight);
  }, [width, height]);

  const handleNextClick = () => {
    if (chunkIndex >= chunks.length - 1) {
      // TODO: Mark user has finished the module
      router.back();
    }

    setChunkIndex((oldChunkIndex) => oldChunkIndex + 1);
  };

  const handlePreviousClick = () => {
    if (chunkIndex === 0) {
      router.back();
    }

    setChunkIndex((oldChunkIndex) => oldChunkIndex - 1);
  };

  const handleSidebarClick = (idx: number) => {
    if (chunkIndex === idx) {
      return;
    }

    setChunkIndex(idx);
  };

  return (
    <>
      {/* Navigation bar */}
      <div
        className="p-[1rem] bg-dark-gray flex justify-between items-center fixed top-0 left-0 right-0"
        ref={navbarRef}
      >
        <h1 className="w-[60%] text-white font-bold text-[1.25rem]">
          {unitModule.rank !== -1
            ? `${unitModule.rank}. ${unitModule.title}`
            : `Modul tidak ditemukan`}
        </h1>
        <button
          className={`pointer transition-all ${
            !isOpen ? "rotate-0" : "rotate-90"
          }`}
          onClick={() => setIsOpen((oldIsOpen) => !oldIsOpen)}
        >
          <Image
            src="/icons/hamburger.png"
            alt="Hamburger icon"
            width={32}
            height={28}
          />
        </button>
        {/* Overlay*/}
        <div
          className={`fixed top-0 left-0 transition-all w-[100vw] h-[100vh] bg-transparent z-[2] ${
            !isOpen ? "translate-x-[-100%]" : "translate-x-0"
          }`}
          onClick={() => {
            setIsOpen(false);
          }}
        >
          {/* Sidebar */}
          <div
            className="fixed top-0 left-0 w-[50%] h-[100vh] bg-dark-gray p-[1rem] z-[3]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-[1rem]">
              {chunks.map((chunk, idx) => {
                return (
                  <button
                    key={chunk.id}
                    className={`px-[1rem] py-[0.5rem] text-white text-left ${
                      idx <= chunkIndex
                        ? "bg-primary"
                        : "bg-none border-2 border-white"
                    } transition-all pointer ${
                      idx <= chunkIndex
                        ? "hover:bg-primary-hover"
                        : "hover:bg-white hover:text-black"
                    }`}
                    onClick={() => handleSidebarClick(idx)}
                  >
                    {`${chunk.rank}. ${chunk.title}`}
                  </button>
                );
              })}
              <button
                className="px-[1rem] py-[0.5rem] text-white text-left bg-none border-2 border-white transition-all pointer hover:bg-white hover:text-black"
                onClick={() => router.back()}
              >
                Keluar dari modul
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Content */}
      <div
        className="p-[1rem] bg-black min-h-[100vh] flex flex-col gap-[1rem]"
        style={{
          paddingTop: `${navbarHeight + 16}px`,
        }}
      >
        {!isLoading && (
          <>
            <MarkdownWithCode className="mobile-markdown">
              {chunk.title
                ? `# ${chunk.rank}. ${chunk.title}\n\n${chunk.content}`
                : "Konten tidak ditemukan"}
            </MarkdownWithCode>
            {/* Buttons */}
            <div className="flex justify-between">
              <button
                className="bg-none px-[1rem] py-[0.5rem] text-white font-bold border-2 border-white pointer transition-all hover:bg-white hover:text-black"
                onClick={handlePreviousClick}
              >
                Kembali
              </button>
              <button
                className="bg-primary px-[1rem] py-[0.5rem] text-white font-bold pointer transition-all hover:bg-primary-hover"
                onClick={handleNextClick}
              >
                {chunkIndex >= chunks.length - 1 ? "Selesai" : "Lanjut"}
              </button>
            </div>
          </>
        )}
        {isLoading && (
          <div className="flex flex-col gap-[1rem] items-center justify-center">
            <Spin size="large" />
            <p className="text-white font-bold text-[2rem]">Loading ...</p>
          </div>
        )}
      </div>
    </>
  );
}
