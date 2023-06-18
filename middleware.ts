import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const authenticatedAPIs = ["/api/course"];

export async function middleware(request: NextRequest) {
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
      await jwtVerify(
        jwtToken.value,
        new TextEncoder().encode(process.env.JWT_SECRET!)
      );
      
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
