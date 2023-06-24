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
        cum.id,
        cum.title,
        cum.description,
        cum.rank,
        cum.course_unit_id,
        (
          CASE
            WHEN coum.completed_id IS NOT NULL THEN TRUE
            ELSE FALSE
          END
        ) is_finished
      FROM
        course_unit_modules cum
        LEFT JOIN (
          SELECT
            cum.id completed_id
          FROM
            course_unit_modules cum
            JOIN user_unit_modules uum ON uum.unit_module_id = cum.id
          WHERE
            uum.user_id = $1
        ) coum ON coum.completed_id = cum.id
      WHERE
        cum.course_unit_id = $2
      ORDER BY cum.rank ASC
    `;
    values = [user.id, parseInt(params.id)];
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

    const formattedResult = result.rows.map((res) => {
      return {
        unitModule: {
          id: res.id,
          title: res.title,
          description: res.description,
          rank: res.rank,
          course_unit_id: res.course_unit_id,
        },
        isFinished: res.is_finished,
      };
    });

    return NextResponse.json({ unitModules: formattedResult }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}
