import Wrapper from "@/components/common/wrapper";
import Login from "@/components/login/login";

export const metadata = {
  title: "kodekodean.id - Login",
  description: "Belajar pemrograman ala anak ITB",
};

export default function LoginPage() {
  return (
    <Wrapper>
      <Login />
    </Wrapper>
  );
}
