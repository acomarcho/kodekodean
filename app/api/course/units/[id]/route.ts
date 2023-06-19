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

    // TODO: Return number of modules and completed modules
    query = "SELECT id, title, rank, course_id FROM course_units WHERE course_id = $1";
    values = [params.id];
    result = await conn!.query(query, values);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: "Course tidak ditemukan atau course tidak memiliki unit" },
        { status: 404 }
      );
    }

    return NextResponse.json({ units: result.rows }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}
