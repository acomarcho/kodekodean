import { NextResponse } from "next/server";
import conn from "@/lib/pg";
import { QueryResult } from "pg";
import fs from "fs/promises";

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
      "SELECT id, title, content_path, rank, unit_module_id FROM course_unit_module_chunks WHERE id = $1";
    values = [parseInt(params.id)];
    result = await conn!.query(query, values);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: "Module chunk tidak ditemukan" },
        { status: 404 }
      );
    }

    const moduleChunk = result.rows[0];
    let content: string;

    // Read file
    try {
      content = await fs.readFile(
        `${process.cwd()}${moduleChunk.content_path}`,
        {
          encoding: "utf-8",
        }
      );
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { message: "Tidak ditemukan file sesuai content_path" },
        { status: 404 }
      );
    }

    moduleChunk.content = content;

    return NextResponse.json({ moduleChunk }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}
