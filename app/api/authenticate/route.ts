import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function GET() {
  try {
    const cookieStore = cookies();
    const jwtToken = cookieStore.get("jwt");

    if (!jwtToken) {
      return NextResponse.json({ success: false, user: null }, { status: 401 });
    }

    try {
      const { payload } = await jwtVerify(
        jwtToken.value,
        new TextEncoder().encode(process.env.JWT_SECRET!)
      );
      return NextResponse.json(
        { success: true, user: payload },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json({ success: false, user: null }, { status: 403 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, user: null }, { status: 500 });
  }
}
