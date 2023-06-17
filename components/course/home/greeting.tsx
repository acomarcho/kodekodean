"use client";

import { AuthContext } from "@/contexts/auth-context";
import { useContext } from "react";

export default function Greeting() {
  const user = useContext(AuthContext);

  return (
    <p className="text-light-gray text-[1rem] lg:text-[1.25rem]">
      Halo, <span className="text-yellow">{user.username}</span>! Yuk, pilih
      salah satu dari pathway yang kami sediakan!
    </p>
  );
}
