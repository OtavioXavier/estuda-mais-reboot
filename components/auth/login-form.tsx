"use client"

import { useForm } from "react-hook-form";
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { josefinSans } from "@/utils/fonts";
import { Button } from "../ui/button";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import type { formSchemaLogin } from "@/types/schemas";
import { ScrollArea } from "../ui/scroll-area";
import { login } from "@/app/actions";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchemaLogin>>({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchemaLogin>) => {

    try {
      await login(values);

      toast({
        title: "Sucesso",
        description: "Login concluido com sucesso!"
      });
      router.replace('/user-app');

    } catch (error) {
      toast({
        title: "Erro",
        variant: "destructive",
        description: `falha ao fazer login: ${error}`
      });
    }
  }

  return (
    <ScrollArea className="h-screnn md:h-[80vh]">
      <div className="flex flex-col justify-center items-center space-y-2">
        <h1 className={`${josefinSans.className} text-xl font-semibold my-4`}>Bem vindo de volta!</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col space-y-3 mb-10">

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl >
                      <Input required type="email" placeholder="E-mail" {...field} className={`${josefinSans.className} bg-secondaryWhite focus:border-main w-96 h-12`} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl >
                      <div className={`${josefinSans.className} bg-secondaryWhite w-96 h-12 flex items-center justify-between rounded-lg`}>
                        <Input type={showPassword ? "text" : "password"} placeholder="Senha" {...field} className={`${josefinSans.className} focus:border-main bg-transparent  w-80 h-12 `} />
                        <Button type="button" onClick={() => setShowPassword(!showPassword)} variant={"ghost"}>{showPassword ? <Eye size={16} color="#007BFF" /> : <EyeClosed size={16} color="#007BFF" />}</Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            </div>

            <Button type="submit" className={`${josefinSans.className} bg-main focus:border-main w-96 h-12 text-lg`}>Fazer login</Button>

            <div className="flex flex-col items-center w-96 mt-8">
              <p className={`${josefinSans.className} text-[#777575]`}>Ou se registre usando: </p>
              <div className="flex justify-around w-96 mt-2">
                <Button className={`${josefinSans.className} text-foreground bg-transparent border-
               [#777575] border flex items-center h-12 w-36 hover:text-white`}>
                  <Image src={"/google-icon.svg"} width={24} height={24} alt="Google" />
                  Google
                </Button>
                <Button className={`${josefinSans.className} text-foreground bg-transparent border-[#777575] border flex items-center h-12 w-36 hover:text-white`}>
                  <Image src={"/github-icon.svg"} width={24} height={24} alt="Github" />
                  Github
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </ScrollArea>
  )
} 