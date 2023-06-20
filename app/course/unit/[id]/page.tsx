import Wrapper from "@/components/common/wrapper";
import AuthProvider from "@/components/common/auth-provider";
import CourseUnitProvider from "@/components/course/unit/course-unit-provider";
import Hero from "@/components/course/unit/hero";
import Modules from "@/components/course/unit/modules";
import Navbar from "@/components/common/navbar";

export const metadata = {
  title: "kodekodean.id - Course unit",
  description: "Pilih modul yang ingin Anda pelajari!",
};

interface PageProps {
  params: {
    id: number;
  };
}

export default async function CourseUnitDetailPage({ params }: PageProps) {
  return (
    <AuthProvider requireLogin={true} redirectTo={"/login"}>
      <Navbar />
      <Wrapper>
        <CourseUnitProvider id={params.id}>
          <div className="min-h-screen">
            <Hero />
            <Modules />
          </div>
        </CourseUnitProvider>
      </Wrapper>
    </AuthProvider>
  );
}
