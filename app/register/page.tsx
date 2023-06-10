import Wrapper from "@/components/common/wrapper";
import Register from "@/components/register/register";

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
      <Register />
    </Wrapper>
  );
}
