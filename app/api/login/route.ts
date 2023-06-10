import { NextResponse } from "next/server";
import conn from "@/lib/pg";
import bcrypt from "bcrypt";
import { QueryResult } from "pg";

export async function POST(request: Request) {
  interface LoginRequest {
    usernameOrEmail: string;
    password: string;
  }

  try {
    const { usernameOrEmail, password } =
      (await request.json()) as LoginRequest;

    if (!usernameOrEmail || !password) {
      return NextResponse.json(
        { message: "Semua data harus diisi" },
        { status: 400 }
      );
    }

    // const hashedPassword = await bcrypt.hash(password, 12);

    let query: string;
    let values: string[];
    let result: QueryResult<any>;

    query = "SELECT * FROM users WHERE username = $1 OR email = $1";
    values = [usernameOrEmail];
    result = await conn!.query(query, values);

    if (result.rows.length == 0) {
      return NextResponse.json(
        {
          message:
            "Data yang Anda masukkan salah. Pastikan data yang Anda masukkan benar! ",
        },
        { status: 400 }
      );
    }

    console.log(result.rows);

    return NextResponse.json({ message: "Login berhasil" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}
