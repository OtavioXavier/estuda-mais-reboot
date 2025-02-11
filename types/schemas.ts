import { z } from "zod";

export const formSchemaLogin = z.object({
   email: z.string({ required_error: "Email é necessário.", }).email({ message: 'Por favor insira um email válido.' }).trim(),
   password: z
      .string({ required_error: "Senha é necessária." })
      .trim()
})

export const generateSummarySchema = z.object({
   assunto: z.string().min(2, { message: 'é necessário um assunto para começarmos os resumos' })
})

export const formSchemaSignup = z.object({
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