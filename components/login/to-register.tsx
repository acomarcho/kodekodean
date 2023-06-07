"use-client";

import Link from "next/link";

export default function ToRegister() {
  return (
    <Link href="/register">
      <span className="text-cyan underline">Buat akun baru</span>
    </Link>
  );
}
