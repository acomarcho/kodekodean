import AuthProvider from "@/components/common/auth-provider";
import UnitModuleProvider from "@/components/course/module/unit-module-provider";
import ChunkProvider from "@/components/course/module/chunk-provider";

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
        <ChunkProvider />
      </UnitModuleProvider>
    </AuthProvider>
  );
}
