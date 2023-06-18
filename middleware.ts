import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jwt-simple";

const authenticatedAPIs = ["/api/course"];

export function middleware(request: NextRequest) {
  const route = authenticatedAPIs.find((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (route) {
    const jwtToken = request.cookies.get("jwt");

    if (!jwtToken) {
      return NextResponse.json(
        {
          message: "Kamu tidak memiliki akses untuk melihat konten ini",
        },
        { status: 401 }
      );
    }

    try {
      jwt.decode(jwtToken.value, process.env.JWT_SECRET!);
      return NextResponse.next();
    } catch (error) {
      return NextResponse.json(
        { message: "Kamu tidak memiliki akses untuk melihat konten ini" },
        { status: 403 }
      );
    }
  }

  return NextResponse.next();
}
