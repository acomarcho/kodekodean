import Wrapper from "@/components/common/wrapper";
import Login from "@/components/login/login";
import AuthCheck from "@/components/login/auth-check";

export const metadata = {
  title: "kodekodean.id - Login",
  description: "Belajar pemrograman ala anak ITB",
};

export default async function LoginPage() {
  return (
    <Wrapper>
      <AuthCheck />
      <Login />
    </Wrapper>
  );
}
