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
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";

const formSchema = z.object({
  email: z.string({ required_error: "Email é necessário.", }).email({ message: 'Por favor insira um email válido.' }).trim(),
  password: z
    .string({ required_error: "Senha é necessária." })
    .trim()
})

export default function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState<boolean>(false);


  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    try {
      const { email, password } = values;
      const supabase = createClientComponentClient();

      const { error, data: { session } } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw new Error(`Erro ao fazer login: ${error.message}`);

      form.reset();

      toast({
        title: "Sucesso",
        description: "Login concluido com sucesso!"
      })

      router.refresh();


    } catch (error: any) {
      toast({
        title: "Erro",
        variant: "destructive",
        description: `${error.message}`
      })
    }
  }

  return (
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
                      <Button onClick={() => setShowPassword(!showPassword)} variant={"ghost"}>{showPassword ? <Eye size={16} color="#007BFF" /> : <EyeClosed size={16} color="#007BFF" />}</Button>
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
  )
} 