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

    query = `
    SELECT
      cu.id, cu.title, cu.rank, cu.course_id, COUNT(cu.id) module_count
    FROM
      course_units cu
      JOIN course_unit_modules cum ON cum.course_unit_id = cu.id
    WHERE
      cu.id = $1
    GROUP BY
      cu.id
    `;
    values = [parseInt(params.id)];
    result = await conn!.query(query, values);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: "Course unit tidak ditemukan" },
        { status: 404 }
      );
    }

    const res = result.rows[0];

    let formattedResult = {
      courseUnit: {
        id: res.id,
        title: res.title,
        rank: res.rank,
        course_id: res.course_id,
      },
      modules: {
        count: res.module_count,
      },
    };

    return NextResponse.json(formattedResult, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}
