import { z } from "zod";

export const schemaSummaryQuestions = z.object({
   resumos: z.object({
      id: z.string(),
      titulo: z.string(),
      site: z.string(),
      texto: z.string(),
      link: z.string()
   }).array(),
   questoes: z.object({
      id: z.string(),
      numero: z.number(),
      titulo: z.string(),
      resposta: z.string(),
      alternativas: z.string().array(),
   }).array(),
});

export const formSchemaLogin = z.object({
   email: z.string({ required_error: "Email é necessário.", }).email({ message: 'Por favor insira um email válido.' }).trim(),
   password: z
      .string({ required_error: "Senha é necessária." })
      .trim()
})

