import Image from "next/image";

export default function Subcontent() {
  return (
    <>
      <div className="p-[1rem] flex flex-col gap-[1rem] lg:flex-row lg:justify-between lg:items-center lg:min-h-screen lg:p-[2.5rem]">
        <div className="flex flex-col gap-[1rem] lg:w-[50%]">
          <h1 className="text-white text-[1.25rem] font-bold lg:text-[3rem] lg:leading-[3.625rem]">
            Materi yang <span className="text-cyan">terstruktur</span>.{" "}
            <span className="text-red">Tidak bertele-tele</span> dengan
            penjelasan yang tidak penting.{" "}
            <span className="text-yellow italic">
              We value your time, attention, and energy
            </span>
            .
          </h1>
          <p className="text-light-gray text-[1rem] lg:text-[1.25rem]">
            Terinspirasi dari kelas-kelas perkuliahan yang lama dan membosankan,
            kami berusaha menyediakan intisari dari ilmu pemrograman yang kami
            dapatkan di ITB secara ringkas tanpa memotong pemahaman. Kelas-kelas
            yang kami bawa{" "}
            <span className="font-bold text-white">
              berorientasi problem solving: terfokus pada latihan-latihan
              praktikal
            </span>
            .
          </p>
          <p className="text-light-gray text-[1rem] lg:text-[1.25rem]">
            Materi kami sajikan dalam bentuk{" "}
            <span className="font-bold text-white">teks</span>,{" "}
            <span className="font-bold text-white">video</span>, dan{" "}
            <span className="font-bold text-white">soal-soal latihan </span>
            untuk Anda melakukan uji pemahaman.
          </p>
        </div>
        <div className="hidden lg:block lg:w-[50%]">
          <Image
            src="/assets/woman-book.png"
            alt="A woman reading a book"
            width={316}
            height={392}
            className="mx-auto"
          />
        </div>
      </div>
      <div className="p-[1rem] flex flex-col gap-[1rem] lg:flex-row lg:justify-between lg:items-center lg:min-h-screen lg:p-[2.5rem]">
        <div className="flex flex-col gap-[1rem] lg:w-[50%]">
          <h1 className="text-white text-[1.25rem] font-bold lg:text-[3rem] lg:leading-[3.625rem]">
            <span className="text-cyan">Harga yang sangat cocok</span> untuk{" "}
            <span className="text-purple">kalangan mahasiswa</span>. Tidak perlu mengeluarkan banyak
            uang!
          </h1>
          <p className="text-light-gray text-[1rem] lg:text-[1.25rem]">
            Kami memiliki keyakinan bahwa edukasi yang baik layak dimiliki oleh
            setiap kalangan masyarakat. Oleh karena itu, kami berusaha untuk
            menyediakan konten pembelajaran secara <span className="text-white font-bold">gratis</span>.
          </p>
        </div>
        <div className="hidden lg:block lg:w-[50%]">
          <Image
            src="/assets/wallet.png"
            alt="An open wallet with some money inside"
            width={316}
            height={315}
            className="mx-auto"
          />
        </div>
      </div>
    </>
  );
}
