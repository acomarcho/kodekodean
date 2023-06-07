"use-client";

import Link from "next/link";

export default function ToLogin() {
  return (
    <Link href="/login">
      <span className="text-cyan underline">Masuk</span>
    </Link>
  );
}
