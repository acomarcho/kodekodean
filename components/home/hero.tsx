import Image from "next/image";
import RegisterButton from "./register-button";
import ExploreButton from "./explore-button";

export default function Hero() {
  return (
    <div className="p-[1rem] flex flex-col gap-[1rem] min-h-screen justify-center lg:flex-row lg:justify-between lg:items-center lg:p-[2.5rem] pt-[calc(76px+1rem)] lg:pt-[calc(82px+1rem)]">
      <div className="flex flex-col gap-[1rem] lg:w-[50%]">
        <h1 className="text-white text-[1.25rem] font-bold lg:text-[3rem] lg:leading-[3.625rem]">
          Belajar pemrograman langsung menggunakan{" "}
          <span className="text-cyan">kurikulum dari ITB</span>, dengan materi
          yang disusun oleh lulusan{" "}
          <span className="text-green">Teknik Informatika ITB</span>.
        </h1>
        <p className="text-light-gray text-[1rem] lg:text-[1.25rem]">
          Di <span className="text-white font-bold">kodekodean.id</span>, Anda
          akan diajari pemrograman dari tingkat fundamental sampai Anda bisa
          cukup percaya diri. Anda akan diajarkan cara berpikir komputasional
          yang baik untuk memecahkan masalah-masalah yang ada di dunia nyata.
        </p>
        <p className="text-light-gray text-[1rem] lg:text-[1.25rem]">
          Persoalan-persoalan yang kami berikan dalam kelas ini diambil dan
          dimodifikasi dari persoalan-persoalan yang diberikan kepada mahasiswa
          ITB pada mata kuliah Pengenalan Komputasi. Jadi, materinya dijamin
          menarik dan bermanfaat!
        </p>
        <div className="flex flex-col gap-[1rem] lg:flex-row">
          <RegisterButton />
          <ExploreButton />
        </div>
      </div>
      <div className="hidden lg:block lg:w-[50%]">
        <Image
          src="/assets/hero-code.png"
          alt="Code written in Python"
          width={480}
          height={652}
          className="mx-auto"
        />
      </div>
    </div>
  );
}
