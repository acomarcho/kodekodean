import { NextResponse } from "next/server";
import conn from "@/lib/pg";
import bcrypt from "bcrypt";
import { QueryResult } from "pg";

export async function POST(request: Request) {
  interface RegisterRequest {
    username: string;
    email: string;
    password: string;
  }

  try {
    const { username, email, password } =
      (await request.json()) as RegisterRequest;

    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "Semua data harus diisi" },
        { status: 400 }
      );
    }

    const validateEmail = (v: string) => {
      return v.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) !== null;
    };

    const validatePassword = (v: string) => {
      return (
        v.length >= 8 &&
        v.match(/[a-z]/) !== null &&
        v.match(/[A-Z]/) !== null &&
        v.match(/[0-9]/) !== null
      );
    };

    if (!validateEmail(email)) {
      return NextResponse.json(
        { message: "Format email salah" },
        { status: 400 }
      );
    }

    if (!validatePassword(password)) {
      return NextResponse.json(
        { message: "Format password salah" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    let query: string;
    let values: string[];
    let result: QueryResult<any>;

    query = "SELECT * FROM users WHERE username = $1";
    values = [username];
    result = await conn!.query(query, values);
    if (result.rows.length > 0) {
      return NextResponse.json(
        { message: "Username sudah digunakan" },
        { status: 400 }
      );
    }

    query = "SELECT * FROM users WHERE email = $1";
    values = [email];
    result = await conn!.query(query, values);
    if (result.rows.length > 0) {
      return NextResponse.json(
        { message: "Email sudah digunakan" },
        { status: 400 }
      );
    }

    query = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";
    values = [username, email, hashedPassword];

    await conn!.query(query, values);

    return NextResponse.json({ message: "Register berhasil" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}
