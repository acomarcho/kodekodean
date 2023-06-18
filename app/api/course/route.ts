import { NextResponse } from "next/server";
import conn from "@/lib/pg";
import { QueryResult } from "pg";

export async function GET() {
  try {

  } catch (error) {
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}
