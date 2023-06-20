import Wrapper from "@/components/common/wrapper";
import Register from "@/components/register/register";
import AuthProvider from "@/components/common/auth-provider";
import Navbar from "@/components/common/navbar";

export const metadata = {
  title: "kodekodean.id - Register",
  description: "Belajar pemrograman ala anak ITB",
};

export default async function RegisterPage() {
  return (
    <>
      <Navbar />
      <Wrapper>
        <AuthProvider requireGuest={true} redirectTo={"/course"}>
          <Register />
        </AuthProvider>
      </Wrapper>
    </>
  );
}
