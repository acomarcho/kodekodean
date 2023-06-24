import { NextResponse } from "next/server";
import conn from "@/lib/pg";
import { getUser } from "@/lib/server/get-user";
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

    // Get user data
    const getUserData = await getUser();
    if (getUserData.status !== 200) {
      return NextResponse.json(
        { message: "Anda tidak memiliki akses untuk melakukan perintah ini!" },
        { status: getUserData.status }
      );
    }

    const user = getUserData.user!;

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

    query = `
    SELECT
      COUNT(*) finished_count
    FROM
      course_units cu
      JOIN course_unit_modules cum ON cum.course_unit_id = cu.id
      JOIN user_unit_modules uum ON uum.unit_module_id = cum.id
    WHERE
      uum.user_id = $1
      AND cu.id = $2
    `;
    values = [user.id, parseInt(params.id)];
    result = await conn!.query(query, values);
    const finishedCount = result.rows[0].finished_count;

    let formattedResult = {
      courseUnit: {
        id: res.id,
        title: res.title,
        rank: res.rank,
        course_id: res.course_id,
      },
      modules: {
        count: res.module_count,
        finishedCount,
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
