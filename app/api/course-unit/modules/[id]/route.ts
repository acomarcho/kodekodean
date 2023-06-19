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
    let values: number[];
    let result: QueryResult<any>;

    if (!/^\d+$/.test(params.id)) {
      return NextResponse.json(
        { message: "Format ID tidak valid" },
        { status: 400 }
      );
    }

    query =
      "SELECT id, title, description, rank, course_unit_id FROM course_unit_modules WHERE course_unit_id = $1 ORDER BY rank ASC";
    values = [parseInt(params.id)];
    result = await conn!.query(query, values);

    if (result.rows.length === 0) {
      return NextResponse.json(
        {
          message:
            "Course unit tidak ditemukan atau course unit tidak memiliki module",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({ courseModules: result.rows }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}
