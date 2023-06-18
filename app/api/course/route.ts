import { NextResponse } from "next/server";
import conn from "@/lib/pg";
import { QueryResult } from "pg";

export async function GET() {
  try {
    return NextResponse.json({ message: "DEBUG: Sukses!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}
