import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export interface UserData {
  id: number;
  username: string;
  email: string;
}

export async function getUser(): Promise<{
  user: UserData | null;
  status: number;
}> {
  const cookieStore = cookies();
  const jwtToken = cookieStore.get("jwt");
  let user: UserData;
  if (!jwtToken) {
    return { user: null, status: 401 };
  }
  try {
    const { payload } = await jwtVerify(
      jwtToken.value,
      new TextEncoder().encode(process.env.JWT_SECRET!)
    );
    user = payload as unknown as UserData;
    return { user, status: 200 };
  } catch (error) {
    return { user: null, status: 403 };
  }
}
