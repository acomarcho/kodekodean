import Wrapper from "@/components/common/wrapper";
import Login from "@/components/login/login";
import AuthProvider from "@/components/common/auth-provider";

export const metadata = {
  title: "kodekodean.id - Login",
  description: "Belajar pemrograman ala anak ITB",
};

export default async function LoginPage() {
  return (
    <Wrapper>
      <AuthProvider requireGuest={true} redirectTo={"/authenticated"}>
        <Login />
      </AuthProvider>
    </Wrapper>
  );
}
