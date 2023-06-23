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

    query = `
      SELECT
        cu.id, cu.title, cu.rank, cu.course_id, COUNT(cu.id) module_count
      FROM
        course_units cu
        JOIN course_unit_modules cum ON cum.course_unit_id = cu.id
      WHERE
        cu.course_id = $1
      GROUP BY
        cu.id
      ORDER BY
        cu.rank ASC
    `;
    values = [params.id];
    result = await conn!.query(query, values);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: "Course tidak ditemukan atau course tidak memiliki unit" },
        { status: 404 }
      );
    }

    let formattedResult = result.rows.map((row) => {
      return {
        unit: {
          id: row.id,
          title: row.title,
          rank: row.rank,
          course_id: row.course_id,
        },
        modules: {
          count: row.module_count,
        },
      };
    });

    return NextResponse.json({ units: formattedResult }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}
