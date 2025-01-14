import { crimsonText } from "@/utils/fonts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignupForm from "@/components/auth/signup-form";
import LoginForm from "@/components/auth/login-form";
import Logo from "@/components/commom/logo";

export default async function Home() {
  return (
    <div className="p-4 flex items-center md:items-start flex-col-reverse md:flex-row space-y-6 md:space-x-6">
      <div className="bg-main md:w-1/2 min-h-screen rounded-xl p-4">
        <Logo theme="light" />
        <div className="mt-40 ml-10">
          <p className={`${crimsonText.className} text-white text-5xl `}>&quot; O sucesso é a soma de pequenos esforços repetidos <span className="font-bold">dia após dia</span>. &quot;</p>
          <p className={`${crimsonText.className} text-white text-2xl font-bold mt-4`}>— Robert Collier</p>
        </div>
      </div>
      <Logo theme="blue" className="absolute right-8 top-0 md:top-auto" />
      <div className="flex flex-col items-center w-1/2 pb-8">
          <Tabs defaultValue="account" className="mt-8">
            <TabsList className="bg-secondaryWhite text-foreground ">
              <TabsTrigger className="data-[state=active]:bg-main w-48 data-[state=active]:text-white" value="cadastrar">Cadastrar</TabsTrigger>
              <TabsTrigger className="data-[state=active]:bg-main w-48 data-[state=active]:text-white" value="entrar">Entrar</TabsTrigger>
            </TabsList>
            <TabsContent value="cadastrar"><SignupForm /></TabsContent>
            <TabsContent value="entrar"><LoginForm /></TabsContent>
          </Tabs>
      </div>
    </div>
  );
}
