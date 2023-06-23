"use client";

import Image from "next/image";
import { useContext, useState, useEffect, useRef } from "react";
import { UnitModuleContext } from "@/contexts/unit-module-context";
import { ViewProps } from "./chunk-provider";
import { Spin } from "antd";
import { useRouter } from "next/navigation";
import MarkdownWithCode from "./markdown-with-code";

export default function DesktopView({
  isLoading,
  chunkIndex,
  setChunkIndex,
  chunk,
}: ViewProps) {
  const { unitModule, chunks } = useContext(UnitModuleContext);

  const [navbarHeight, setNavbarHeight] = useState<number>(0);
  const navbarRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  useEffect(() => {
    if (!navbarRef.current?.clientHeight) {
      return;
    }

    setNavbarHeight(navbarRef.current?.clientHeight);
  }, []);

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
      {/* Navbar */}
      <div
        className="fixed top-0 left-0 right-0 bg-dark-gray z-[2]"
        ref={navbarRef}
      >
        <div className="max-w-[1280px] mx-auto p-[1rem] px-[2.5rem]">
          <div className="flex items-center gap-[2rem]">
            <button className="pointer" onClick={() => router.back()}>
              <Image
                src="/icons/xmark.png"
                alt="X mark"
                width={38}
                height={51}
              />
            </button>
            <h1 className="text-white font-bold text-[2rem]">
              {unitModule.rank !== -1
                ? `${unitModule.rank}. ${unitModule.title}`
                : `Modul tidak ditemukan`}
            </h1>
          </div>
        </div>
      </div>
      {/* Sidebar */}
      <div
        className="fixed left-[2rem] z-[2] overflow-y-scroll"
        style={{
          top: `${navbarHeight + 32}px`,
          maxHeight: `calc(100vh - ${navbarHeight + 32}px - 32px)`,
        }}
      >
        <div className="flex flex-col gap-[1rem]">
          {chunks.map((chunk, idx) => {
            return (
              <button
                key={chunk.id}
                className={`p-[1.5rem] ${
                  idx <= chunkIndex ? "bg-primary" : "bg-dark-gray"
                } font-bold text-white text-[1rem] pointer transition-all max-w-[150px] text-left ${
                  idx <= chunkIndex
                    ? "hover:bg-primary-hover"
                    : "hover:bg-primary"
                }`}
                onClick={() => handleSidebarClick(idx)}
              >
                {`${chunk.rank}. ${chunk.title}`}
              </button>
            );
          })}
        </div>
      </div>
      {/* Content */}
      <div
        className="p-[2rem] bg-dark-gray absolute left-[50%] translate-x-[-50%] w-[40rem] flex flex-col gap-[1rem]"
        style={{
          top: `${navbarHeight + 32}px`,
        }}
      >
        {!isLoading && (
          <>
            <MarkdownWithCode className="desktop-markdown">
              {chunk.title
                ? `# ${chunk.rank}. ${chunk.title}\n\n${chunk.content}`
                : "Konten tidak ditemukan"}
            </MarkdownWithCode>
            {/* Buttons */}
            <div className="flex justify-between">
              <button
                className="bg-none text-[1.25rem] px-[1rem] py-[0.5rem] text-white font-bold border-2 border-white pointer transition-all hover:bg-white hover:text-black"
                onClick={handlePreviousClick}
              >
                Kembali
              </button>
              <button
                className="bg-primary text-[1.25rem] px-[1rem] py-[0.5rem] text-white font-bold pointer transition-all hover:bg-primary-hover"
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
