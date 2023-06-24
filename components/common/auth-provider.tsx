"use client";

import { ReactNode } from "react";
import { useEffect, useState } from "react";
import { authenticateUser } from "@/lib/authenticate";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/contexts/auth-context";
import { User } from "@/lib/state/schema";
import { Spin } from "antd";

interface Props {
  children?: ReactNode;
  requireLogin?: boolean;
  requireGuest?: boolean;
  redirectTo?: string;
}

export default function AuthProvider({
  children,
  requireLogin,
  requireGuest,
  redirectTo,
}: Props) {
  const [user, setUser] = useState<User>({
    id: -1,
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const asyncAuthenticateUser = async () => {
      try {
        setIsLoading(true);
        const user = await authenticateUser();

        if (user) {
          setUser(user);
          if (requireGuest) {
            router.replace(redirectTo!);
          } else {
            setIsLoading(false);
          }
        } else {
          if (requireLogin) {
            router.replace(redirectTo!);
          } else {
            setIsLoading(false);
          }
        }
      } catch (error) {
        setIsLoading(false);
        return;
      }
    };

    asyncAuthenticateUser();
  }, [router, requireGuest, requireLogin, redirectTo]);

  if (isLoading) {
    return (
      <div className="h-[100vh] flex flex-col justify-center items-center gap-[1rem] bg-black">
        <div>
          <Spin size="large" />
        </div>
        <p className="text-white font-bold text-[2rem]">Loading ...</p>
      </div>
    );
  }

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
