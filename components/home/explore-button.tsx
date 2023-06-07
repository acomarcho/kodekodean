"use client";
import { useRouter } from "next/navigation";

export default function ExploreButton() {
  const router = useRouter();

  return (
    <button
      className="w-[100%] bg-none px-[1.25rem] py-[1rem] text-white font-bold border-2 border-white transition-all hover:bg-white hover:text-black text-[1rem] lg:text-[1.25rem]"
      onClick={() => router.push("/")}
    >
      Lihat contoh materi
    </button>
  );
}
