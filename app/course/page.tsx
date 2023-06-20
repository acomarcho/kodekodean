import Wrapper from "@/components/common/wrapper";
import Hero from "@/components/course/home/hero";
import Courses from "@/components/course/home/courses";
import AuthProvider from "@/components/common/auth-provider";
import Navbar from "@/components/common/navbar";

export const metadata = {
  title: "kodekodean.id - Courses",
  description: "Pilih course yang ingin Anda pelajari!",
};

export default async function CoursePage() {
  return (
    <>
      <Navbar />
      <Wrapper>
        <AuthProvider requireLogin={true} redirectTo={"/login"}>
          <div className="min-h-screen">
            <Hero />
            <Courses />
          </div>
        </AuthProvider>
      </Wrapper>
    </>
  );
}
