"use client";

import Image from "next/image";
import { useContext, useState, useEffect, useRef } from "react";
import { UnitModuleContext } from "@/contexts/unit-module-context";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export default function DesktopView() {
  const { unitModule, chunks } = useContext(UnitModuleContext);

  const [navbarHeight, setNavbarHeight] = useState<number>(0);
  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!navbarRef.current?.clientHeight) {
      return;
    }

    setNavbarHeight(navbarRef.current?.clientHeight);
  }, []);

  const content = `# 1. Pendahuluan
  
  ## Video
  
  <iframe src="https://www.youtube.com/embed/RBqWwm2eEq0"/>
  
  ## Teks
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas placerat, lectus quis suscipit dapibus, nibh mi ali quam arcu, in commodo sapien enim vitae magna. Quisque dictum egestas est. Ut molestie est libero, sed egestas leo viverra et. Sed tristique, velit congue pharetra posuere, nulla elit luctus lorem, at lacinia sapien urna ut diam. Quisque nunc sapien, mattis eget dolor in, pulvinar rhoncus dolor. Aliquam id aliquam libero, vel feugiat lectus. Etiam aliquet, massa vel molestie cursus, velit elit rutrum diam, et scelerisque urna orci a ipsum. Praesent ultricies mi nec odio semper faucibus. 
  
  ![Test image](https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg)
  
  Nulla diam nunc, pulvinar nec hendrerit sed, dignissim non ipsum. Fusce porta lacus at cursus lacinia. Nulla facilisi. Morbi vitae condimentum quam. Etiam at egestas massa, blandit consectetur elit. Pellentesque condimentum posuere vestibulum. Praesent aliquam ac libero at laoreet.  
  `;

  return (
    <>
      {/* Navbar */}
      <div
        className="fixed top-0 left-0 right-0 bg-dark-gray z-[2]"
        ref={navbarRef}
      >
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
      <div
        className="fixed left-[2rem] z-[2] overflow-y-scroll"
        style={{
          top: `${navbarHeight + 32}px`,
          maxHeight: `calc(100vh - ${navbarHeight + 32}px - 32px)`,
        }}
      >
        <div className="flex flex-col gap-[1rem]">
          {chunks.map((chunk) => {
            return (
              <button
                key={chunk.id}
                className="p-[1.5rem] bg-dark-gray font-bold text-white text-[1rem] pointer transition-all max-w-[150px] text-left hover:bg-primary"
              >
                {`${chunk.rank}. ${chunk.title}`}
              </button>
            );
          })}
        </div>
      </div>
      {/* Content */}
      <div
        className="p-[2rem] bg-dark-gray absolute left-[50%] translate-x-[-50%] w-[40rem]"
        style={{
          top: `${navbarHeight + 32}px`,
        }}
      >
        <ReactMarkdown className="mobile-markdown" rehypePlugins={[rehypeRaw]}>
          {content}
        </ReactMarkdown>
      </div>
    </>
  );
}
