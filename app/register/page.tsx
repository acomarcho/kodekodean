import Wrapper from "@/components/common/wrapper";
import Register from "@/components/register/register";

export const metadata = {
  title: "kodekodean.id - Register",
  description: "Belajar pemrograman ala anak ITB",
};

export default function RegisterPage() {
  return (
    <Wrapper>
      <Register />
    </Wrapper>
  );
}
