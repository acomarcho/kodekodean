import Wrapper from "@/components/common/wrapper";
import AuthProvider from "@/components/common/auth-provider";
import CourseUnitProvider from "@/components/course/unit/course-unit-provider";

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
    <Wrapper>
      <AuthProvider requireLogin={true} redirectTo={"/login"}>
        <CourseUnitProvider id={params.id}>
          <p className="text-white">Hello world!</p>
        </CourseUnitProvider>
      </AuthProvider>
    </Wrapper>
  );
}
