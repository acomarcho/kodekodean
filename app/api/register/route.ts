import { NextResponse } from "next/server";
import conn from "@/lib/pg";
import bcrypt from "bcrypt";

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
        { message: "All fields must be present" },
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
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    if (!validatePassword(password)) {
      return NextResponse.json(
        { message: "Invalid password format" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const query =
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";
    const values = [username, email, hashedPassword];

    await conn!.query(query, values);

    return NextResponse.json(
      { message: "Register successful" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
