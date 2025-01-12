'use server'
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';
import { schemaSummaryQuestions } from '@/types/schemas';
import { SQ } from '@/types';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createClient } from './supabase/server';

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
       Pesquise nos 5 melhores sites de noticias e artigos cientificos para este assunto: ${assunto}.
       
       Para cada site, forneça um resumo conciso e objetivo dos artigos e sites mais relevantes sobre ${assunto}. Os resumos devem conter o nome do site onde foi retirado o texto para resumo, mas basta o nome principal, como por exemplo, Wikipedia, um bom título, o texto pode ser longo com cerca de 600 palavras e um link para o texto original diretamente no site e ao todo devem ser 5 resumos. 

       Após isto crie ou pegue da internet 10 a 15 questões relacionadas estes resumos.
 
       Para as questões é necessário uma resposta correta (reposta), alternativas (array onde a primeira posição equivale a letra A e assim por diante).
 
       Todos os itens criados devem conter um id uuid e seguir o schema.
     `;

    const { object } = await generateObject({
      model: genAI('gemini-2.0-flash-exp'),
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

export const login = async (formData: FormData) => {
  const supabase = await createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.log(error)
    redirect("/error");
  }

  revalidatePath('/', 'layout');
  redirect('/user-app');
}

export const signup = async (formData: FormData) => {
  const supabase = await createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    nome: formData.get('name') as string,
    termo: formData.get('license') as string,
  }

  const { error, data: { user } } = await supabase.auth.signUp({ email: data.email, password: data.password });

  if (user) {
    const { error } = await supabase
      .from("estudante")
      .insert({
        email: data.email,
        nome: data.nome,
        termo: data.termo
      })
    console.log(error)
    if (error) throw new Error(`Erro ao inserir dados na tabela: ${error.message}`);
  }

  console.log(error)
  if (error) redirect("/error");

  revalidatePath('/', 'layout')
  redirect('/user-app')
}