import { NextResponse } from "next/server";
import conn from "@/lib/pg";
import bcrypt from "bcrypt";
import { QueryResult } from "pg";
import { User } from "@/lib/schema";
import { verify } from "hcaptcha";
import { cookies } from "next/headers";
import { SignJWT } from "jose";

export async function POST(request: Request) {
  interface LoginRequest {
    usernameOrEmail: string;
    password: string;
    token: string;
  }

  try {
    const { usernameOrEmail, password, token } =
      (await request.json()) as LoginRequest;

    if (!usernameOrEmail || !password || !token) {
      return NextResponse.json(
        { message: "Semua data harus diisi" },
        { status: 400 }
      );
    }

    const isVerified = await verify(process.env.HCAPTCHA_SECRET!, token);
    if (!isVerified.success) {
      return NextResponse.json(
        { message: "Token hCaptcha tidak valid" },
        { status: 400 }
      );
    }

    let query: string;
    let values: string[];
    let result: QueryResult<any>;

    query =
      "SELECT id, username, email, password FROM users WHERE username = $1 OR email = $1";
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

    const user = result.rows[0] as User;

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return NextResponse.json(
        {
          message:
            "Data yang Anda masukkan salah. Pastikan data yang Anda masukkan benar! ",
        },
        { status: 400 }
      );
    }

    const iat = Math.floor(Date.now() / 1000);
    const signedJWT = await new SignJWT({
      id: user.id,
      username: user.username,
      email: user.email,
    })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setExpirationTime(iat + 60 * 60 * 24 * 7)
      .setIssuedAt(iat)
      .setNotBefore(iat)
      .sign(new TextEncoder().encode(process.env.JWT_SECRET!));

    const cookieStore = cookies();
    cookieStore.set({
      name: "jwt",
      value: signedJWT,
      expires: new Date().setDate(new Date().getDate() + 7),
      path: "/",
    });

    return NextResponse.json({ message: "Login berhasil" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}
