import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = cookies();
  cookieStore.delete("jwt");

  return NextResponse.json(
    { message: "Berhasil keluar dari sistem" },
    { status: 200 }
  );
}
