import { NextResponse } from "next/server";
import conn from "@/lib/pg";
import { QueryResult } from "pg";

export async function GET() {
  try {
    let query: string;
    let result: QueryResult<any>;

    query = "SELECT id, title, description, course FROM courses";
    result = await conn!.query(query);

    return NextResponse.json({ courses: result.rows }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}
