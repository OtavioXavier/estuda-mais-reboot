"use client"

import { useForm } from "react-hook-form";
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { crimsonText, josefinSans } from "@/utils/fonts";
import { Checkbox } from "../ui/checkbox";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { formSchemaSignup } from "@/types/schemas";
import { signup } from "@/app/actions";

export default function CadastrarForm() {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchemaSignup>>({
    resolver: zodResolver(formSchemaSignup),
    defaultValues: {
      email: "",
      password: "",
      nome: "",
      termo: false
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchemaSignup>) => {

    try {
      await signup(values);

      toast({
        title: "Sucesso",
        description: "Cadastro concluido com sucesso!"
      })
      form.reset();
    }
    catch (error) {

      toast({
        title: "Erro",
        variant: "destructive",
        description: `${error}`
      })
    }
  }

  return (
    <ScrollArea className="h-screnn md:h-[80vh]">
      <div className="flex flex-col justify-center items-center space-y-2">
        <h1 className={`${josefinSans.className} text-xl font-semibold my-4`}>Bom primeiro passo!</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col space-y-3 mb-10">
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormControl >
                      <Input placeholder="Nome de Usuario" {...field} className={`${josefinSans.className} bg-secondaryWhite focus:border-main w-96 h-12`} />
                    </FormControl>
                    <FormDescription className={`${crimsonText.className}`}>
                      insira o nome ou apelido
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl >
                      <Input type="email" placeholder="E-mail" {...field} className={`${josefinSans.className} bg-secondaryWhite focus:border-main w-96 h-12`} />
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

              <FormField
                control={form.control}
                name="termo"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                    <FormControl >
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />

                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className={`${crimsonText.className} text-md`}>
                        Eu aceito os termos de uso.
                      </FormLabel>
                      <FormDescription className={`${crimsonText.className}`}>
                        Você pode acessar aos termos de uso clicando
                        <Link className="font-bold text-main" href="/examples/forms"> aqui</Link>.
                      </FormDescription>
                      <FormMessage />
                    </div>

                  </FormItem>
                )}
              />

            </div>

            <Button type="submit" className={`${josefinSans.className} bg-main focus:border-main w-96 h-12 text-lg`}>Criar conta</Button>

            <div className="flex flex-col items-center w-96 mt-8">
              <p className={`${josefinSans.className} text-[#777575]`}>Ou se registre usando: </p>
              <div className="flex justify-around w-96 mt-2">
                <Button className={`${josefinSans.className} text-foreground bg-transparent border-[#777575] border flex items-center h-12 w-36 hover:text-white`}>
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