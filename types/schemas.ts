import { z } from "zod";

export const schemaSummaryQuestions = z.object({
    resumos: z.object({
       id: z.string(),
       titulo: z.string(),
       site: z.string(),
       paragrafos: z.string().array()
    }).array(),
    questoes: z.object({
       id: z.string(),
       numero: z.number(),
       titulo: z.string(),
       tipo: z.enum(['objetiva', 'aberta']),
       resposta: z.string().optional(),
       alternativas: z.string().array().optional(),
    }).array(),
  });
