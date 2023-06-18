import { NextResponse } from "next/server";
import conn from "@/lib/pg";
import { QueryResult } from "pg";

interface Params {
  params: {
    id: string;
  };
}

export async function GET(_: Request, { params }: Params) {
  try {
    let query: string;
    let values: string[];
    let result: QueryResult<any>;

    query = "SELECT id, title, description, course FROM courses WHERE id = $1";
    values = [params.id];
    result = await conn!.query(query, values);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: "Course tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({ courses: result.rows[0] }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}
