import Wrapper from "@/components/common/wrapper";
import Register from "@/components/register/register";
import AuthProvider from "@/components/common/auth-provider";

import { redirect } from "next/navigation";
import { authenticateUser } from "@/lib/authenticate";

export const metadata = {
  title: "kodekodean.id - Register",
  description: "Belajar pemrograman ala anak ITB",
};

export default async function RegisterPage() {
  const user = await authenticateUser();
  if (user) {
    redirect("/authenticated");
  }

  return (
    <Wrapper>
      <AuthProvider requireGuest={true} redirectTo={"/authenticated"}>
        <Register />
      </AuthProvider>
    </Wrapper>
  );
}
