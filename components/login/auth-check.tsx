"use client";

import { useEffect } from "react";
import { authenticateUser } from "@/lib/authenticate";
import { useRouter } from "next/navigation";

export default function AuthCheck() {
  const router = useRouter();

  useEffect(() => {
    const asyncAuthenticateUser = async () => {
      try {
        const user = await authenticateUser();
        if (user) {
          router.push("/authenticated");
        }
      } catch (error) {
        return;
      }
    };

    asyncAuthenticateUser();
  }, [router]);

  return <></>;
}
