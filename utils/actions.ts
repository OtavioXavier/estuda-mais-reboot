'use server'
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateObject, generateText } from 'ai';
import { z } from 'zod';
import { schemaSummaryQuestions } from '@/types/schemas';
import { SQ } from '@/types';

const generateSummarySchema = z.object({
   assunto: z.string().min(2, { message: 'é necessário um assunto para começarmos os resumos' })
})

export const generateSummary = async (_: unknown, data: FormData): Promise<SQ | string | null> => {
   try {
     const result = generateSummarySchema.safeParse(Object.fromEntries(data));
 
     if (!result.success) {
       return result.error.flatten().fieldErrors.assunto?.[0] ?? 'Erro de validação.';
     }
 
     const { assunto } = result.data;
 
     const genAI = createGoogleGenerativeAI({
       apiKey: process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY,
     });
 
     const prompt = `
       Pesquise nos 6 melhores sites do google para este assunto: ${assunto}.
 
       Depois, liste um resumo para cada site contendo 200 caracteres, depois 10 a 15 questões sobre estes resumos.
 
       As questões podem ser divididas em abertas e objetivas, nas objetivas é necessário uma resposta correta (reposta), alternativas (array onde a primeira posição equivale a letra A e assim por diante).
 
       Os resumos devem conter o nome do site resumido, mas basta o nome principal, como por exemplo, Wikipedia. Devem conter também parágrafos onde deve ser discorrido este resumo, onde, cada item no array parágrafos é respectivamente um parágrafo. Além de um bom título... Devem conter pelo menos 5 resumos.
 
       Tudo deve ter um id uuid seguindo o schema.
     `;
 
     const { object } = await generateObject({
       model: genAI('gemini-1.5-flash-8b'),
       schema: schemaSummaryQuestions,
       prompt,
     });
 
     const validatedObject = schemaSummaryQuestions.parse(object);
 
     return validatedObject;
   } catch (error) {
     console.error('Erro durante a geração de resumos e questões: ', error);
     return null;
   }
 };