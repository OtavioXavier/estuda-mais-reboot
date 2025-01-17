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
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

const formSchema = z.object({
  nome: z
    .string({ required_error: "Nome é necessário.", })
    .min(2, { message: 'Nome precisa de ao menos 2 caracteres.' })
    .trim(),
  email: z.string({ required_error: "Email é necessário.", }).email({ message: 'Por favor insira um email válido.' }).trim(),
  password: z
    .string({ required_error: "Senha é necessária.", })
    .min(8, { message: 'Precisa de ao menos 8 caracteres' })
    .regex(/[a-zA-Z]/, { message: 'Deve conter ao menos uma letra.' })
    .regex(/[0-9]/, { message: 'Deve conter ao menos um numero' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Deve conter ao menos um caractere especial',
    })
    .trim(),
  termo: z.boolean().refine((val) => val === true, {
    message: "Aceite o termo para continuar.",
  }),
})

export default function CadastrarForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      nome: "",
      termo: false
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    try {
      const { email, password, nome, termo } = values;
      const supabase = createClientComponentClient();

      const { error, data: { user } } = await supabase.auth.signUp({
        email,
        password,

      })

      if (error) throw new Error(`Erro ao fazer cadastro: ${error.message}`);


      if (user) {
        const { error } = await supabase
          .from("estudante")
          .insert({
            email,
            nome,
            termo
          })

        if (error) throw new Error(`Erro ao inserir dados na tabela: ${error.message}`);

        form.reset();
        toast({
          title: "Sucesso",
          description: "Cadastro concluido com sucesso!"
        })
        router.replace("/user-app");
      }

    } catch (error) {
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
                        <Button onClick={() => setShowPassword(!showPassword)} variant={"ghost"}>{showPassword ? <Eye size={16} color="#007BFF" /> : <EyeClosed size={16} color="#007BFF" />}</Button>
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