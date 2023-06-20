import AuthProvider from "@/components/common/auth-provider";
import UnitModuleProvider from "@/components/course/module/unit-module-provider";
import NormalView from "@/components/course/module/normal-view";
import DesktopView from "@/components/course/module/desktop-view";

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
        <div className="lg:hidden">
          <NormalView />
        </div>
        <div className="hidden lg:block">
          <DesktopView />
        </div>
      </UnitModuleProvider>
    </AuthProvider>
  );
}
