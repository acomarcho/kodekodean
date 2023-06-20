"use client";

import { useContext } from "react";
import { AuthContext } from "@/contexts/auth-context";
import Image from "next/image";
import Link from "next/link";

import axios from "axios";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const user = useContext(AuthContext);
  const router = useRouter();

  const handleLogOut = async () => {
    await axios.post("/api/logout");
    router.push("/");
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-black">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex justify-between items-center p-[1rem] lg:px-[2.5rem]">
          <Link href="/">
            <Image
              src="/icons/kodekodean.svg"
              alt="kodekodean.id's logo"
              width={232}
              height={39}
              className="w-[145px] h-[24px] lg:w-[232px] lg:h-[39px]"
            />
          </Link>
          {user.id !== -1 && (
            <button
              className="text-white border-2 border-white px-[1rem] py-[0.5rem] font-bold transition-all hover:pointer hover:text-black hover:bg-white text-[1rem] lg:text-[1.25rem]"
              onClick={() => handleLogOut()}
            >
              Keluar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
