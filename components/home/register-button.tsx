"use client";
import { useRouter } from "next/navigation";

export default function RegisterButton() {
  const router = useRouter();

  return (
    <button
      className="w-[100%] bg-primary px-[1.25rem] py-[1rem] text-white font-bold transition-all hover:bg-primary-hover text-[1rem] lg:text-[1.25rem]"
      onClick={() => router.push("/register")}
    >
      Mulai belajar
    </button>
  );
}
