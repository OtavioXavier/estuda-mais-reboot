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
