import Wrapper from "@/components/common/wrapper";
import Hero from "@/components/course/detail/hero";
import AuthProvider from "@/components/common/auth-provider";
import CourseProvider from "@/components/course/detail/course-provider";

export const metadata = {
  title: "kodekodean.id - Course unit",
  description: "Pilih unit yang ingin Anda pelajari!",
};

interface PageProps {
  params: {
    id: number;
  };
}

export default async function CourseDetailPage({ params }: PageProps) {
  return (
    <Wrapper>
      <AuthProvider requireLogin={true} redirectTo={"/login"}>
        <CourseProvider id={params.id}>
          <div className="min-h-screen">
            <Hero />
          </div>
        </CourseProvider>
      </AuthProvider>
    </Wrapper>
  );
}
