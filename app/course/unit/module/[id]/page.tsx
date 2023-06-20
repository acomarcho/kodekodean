import Wrapper from "@/components/common/wrapper";
import AuthProvider from "@/components/common/auth-provider";
import UnitModuleProvider from "@/components/course/module/unit-module-provider";
import Hero from "@/components/course/unit/hero";
import Modules from "@/components/course/unit/modules";
import Navbar from "@/components/common/navbar";

export const metadata = {
  title: "kodekodean.id - Unit module",
  description: "Pelajari modul yang Anda ingin kuasai!",
};

interface PageProps {
  params: {
    id: number;
  };
}

export default async function ModuleDetailPage({ params }: PageProps) {
  return (
    <AuthProvider requireLogin={true} redirectTo={"/login"}>
      <UnitModuleProvider id={params.id}>
        <p>Hello world!</p>
      </UnitModuleProvider>
    </AuthProvider>
  );
}
