"use client";

import Image from "next/image";
import { useContext, useState } from "react";
import { UnitModuleContext } from "@/contexts/unit-module-context";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export default function NormalView() {
  const { unitModule, chunks } = useContext(UnitModuleContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
      {/* Navigation bar */}
      <div className="p-[1rem] bg-dark-gray flex justify-between items-center">
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
            height={27.75}
          />
        </button>
        <h1 className="w-[60%] text-white text-right font-bold text-[1.25rem]">
          {`${unitModule.rank}. ${unitModule.title}`}
        </h1>
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
              {chunks.map((chunk) => {
                return (
                  <button
                    key={chunk.id}
                    className="p-[0.5rem] text-white text-left bg-none border-2 border-white transition-all pointer hover:bg-white hover:text-black"
                  >
                    {`${chunk.rank}. ${chunk.title}`}
                  </button>
                );
              })}
              <button className="p-[0.5rem] text-white text-left bg-none border-2 border-white transition-all pointer hover:bg-white hover:text-black">
                Keluar dari modul
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="p-[1rem] bg-black min-h-[100vh] flex flex-col gap-[1rem]">
        <ReactMarkdown className="mobile-markdown" rehypePlugins={[rehypeRaw]}>
          {content}
        </ReactMarkdown>
      </div>
    </>
  );
}
