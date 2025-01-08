import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect, RedirectType } from "next/navigation";
import { cookies } from "next/headers"
import { crimsonText, josefinSans } from "@/utils/fonts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CadastrarForm from "@/components/auth/CadastrarForm";
import LoginForm from "@/components/auth/LoginForm";
import Logo from "@/components/commom/logo";

export default async function Home() {
  let loggedIn = false;
  try {
    const supabase = createServerComponentClient({ cookies })
    const { data: { session } } = await supabase.auth.getSession();

    if (session) loggedIn = true;
  } catch (e) {
    console.log("Home:", e);
  } finally {
    if (loggedIn) redirect("/user-app", RedirectType.replace)
  }

  return (
    <div className="p-4 flex space-x-6">
      <div className="bg-main w-1/2 min-h-screen rounded-xl p-4">
        <Logo theme="light" />
        <div className="mt-40 ml-10">
          <p className={`${crimsonText.className} text-white text-5xl `}>"O sucesso é a soma de pequenos esforços repetidos <span className="font-bold">dia após dia</span>."</p>
          <p className={`${crimsonText.className} text-white text-2xl font-bold mt-4`}>— Robert Collier</p>
        </div>
      </div>
      <Logo theme="blue" className="absolute right-8" />
      <div className="flex flex-col items-center w-1/2 pb-8">

        <Tabs defaultValue="account" className="mt-8">
          <TabsList className="bg-secondaryWhite text-foreground ">
            <TabsTrigger className="data-[state=active]:bg-main w-48 data-[state=active]:text-white" value="cadastrar">Cadastrar</TabsTrigger>
            <TabsTrigger className="data-[state=active]:bg-main w-48 data-[state=active]:text-white" value="entrar">Entrar</TabsTrigger>
          </TabsList>
          <TabsContent value="cadastrar"><CadastrarForm /></TabsContent>
          <TabsContent value="entrar"><LoginForm /></TabsContent>
        </Tabs>


      </div>
    </div>
  );
}
