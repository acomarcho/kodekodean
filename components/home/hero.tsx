import Image from "next/image";

export default function Hero() {
  return (
    <div className="p-[1rem] flex flex-col gap-[1rem] lg:flex-row lg:justify-between lg:items-center lg:p-[2.5rem]">
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
          <button className="w-[100%] bg-primary px-[1.25rem] py-[1rem] text-white font-bold transition-all hover:bg-primary-hover text-[1rem] lg:text-[1.25rem]">
            Mulai belajar
          </button>
          <button className="w-[100%] bg-none px-[1.25rem] py-[1rem] text-white font-bold border-2 border-white transition-all hover:bg-white hover:text-black text-[1rem] lg:text-[1.25rem]">
            Lihat contoh materi
          </button>
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
