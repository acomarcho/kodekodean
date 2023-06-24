import { NextResponse } from "next/server";
import conn from "@/lib/pg";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { QueryResult, DatabaseError } from "pg";

interface Params {
  params: {
    id: string;
  };
}

export async function POST(_: Request, { params }: Params) {
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
    interface UserData {
      id: number;
      username: string;
      email: string;
    }
    const cookieStore = cookies();
    const jwtToken = cookieStore.get("jwt");
    let user: UserData;
    if (!jwtToken) {
      return NextResponse.json(
        { message: "Anda tidak memiliki akses untuk melakukan perintah ini" },
        { status: 401 }
      );
    }
    try {
      const { payload } = await jwtVerify(
        jwtToken.value,
        new TextEncoder().encode(process.env.JWT_SECRET!)
      );
      user = payload as unknown as UserData;
    } catch (error) {
      return NextResponse.json(
        { message: "Anda tidak memiliki akses untuk melakukan perintah ini" },
        { status: 403 }
      );
    }

    query =
      "INSERT INTO user_unit_modules (user_id, unit_module_id, created_at) VALUES($1, $2, NOW())";
    values = [user.id, parseInt(params.id)];
    result = await conn!.query(query, values);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    const err = error as DatabaseError;

    if (err.code?.startsWith("23")) {
      return NextResponse.json(
        { message: "Data yang Anda kirimkan salah" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}
