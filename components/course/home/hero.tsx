import Image from "next/image";
import Greeting from "./greeting";

export default function Courses() {
  return (
    <div className="flex flex-col gap-[1rem] p-[1rem] lg:flex-row lg:justify-between min-h-screen lg:p-[2.5rem]">
      <div className="flex flex-col gap-[1rem] lg:w-[50%]">
        <div className="flex flex-col gap-[0rem] lg:gap-[1rem]">
          <h1 className="text-white text-[1.25rem] font-bold lg:text-[3rem] leading-[3.625rem]">
            Ingin <span className="text-purple">belajar apa</span> Anda hari
            ini?
          </h1>
          <Greeting />
        </div>
      </div>
      <div className="hidden lg:block lg:w-[50%]">
        <Image
          src="/assets/course-code.png"
          alt="Computer monitor with code written in it"
          width={560}
          height={180}
          className="mx-auto"
        />
      </div>
    </div>
  );
}
