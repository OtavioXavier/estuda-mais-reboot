'use server'

import { generateSummarySchema } from '@/types/schemas';
import { IMessageInput, Questao, Resumo, } from '@/types';
import { Worker } from 'node:worker_threads';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import type { formSchemaLogin, formSchemaSignup } from "@/types/schemas";
import { z } from 'zod';
import crypto from 'node:crypto'

export const generateSummary = async (_: unknown, data: FormData): Promise<string | null | undefined> => {
  try {
    const result = generateSummarySchema.safeParse(Object.fromEntries(data));

    if (!result.success) {
      return result.error.flatten().fieldErrors.assunto?.[0] ?? 'Erro de validação.';
    }

    const { assunto } = result.data;

    const websites = await searchSources(assunto);

    const [resumos, questoes] = await Promise.all([
      Promise.all([
        createSummary({ assunto, site: websites[0] }),
        createSummary({ assunto, site: websites[1] }),
        createSummary({ assunto, site: websites[2] }),
      ]),
      Promise.all([
        createQuestions(assunto),
        createQuestions(assunto),
        createQuestions(assunto),
      ]),
    ]);

    const resumosResult: Resumo[] = resumos;
    const questoesResult: Questao[] = questoes.flat();
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("Usuário não autenticado.");
    }

    await supabase.from('resumo').delete().eq('usuario', user.id);
    await supabase.from('questao').delete().eq('usuario', user.id);

    const resumosInsert = resumosResult.map((resumo) => ({
      id: crypto.randomUUID(),
      titulo: resumo.titulo,
      texto: resumo.texto,
      link: resumo.link,
      fonte: resumo.fonte,
      usuario: user.id,
    }));

    const questoesInsert = questoesResult.map((questao) => ({
      id: crypto.randomUUID(),
      pergunta: questao.pergunta,
      alternativas: questao.alternativas,
      resposta: questao.resposta,
      usuario: user.id,
    }));

    const { error: resumosError } = await supabase.from('resumo').insert(resumosInsert);

    if (resumosError) {
      console.log(resumosError.message)
      await supabase.from('resumo').delete().eq('usuario', user.id);
      throw new Error('erro na gravação de resumos: ', resumosError)
    }

    const { error: questaoError } = await supabase.from('questao').insert(questoesInsert);
    if (questaoError) {
      console.log(questaoError.message)
      await supabase.from('questao').delete().eq('usuario', user.id);
      throw new Error('erro na gravação de questoes: ', questaoError)
    }
    return 'geração concluida';
  } catch (error) {
    console.log('Erro durante a geração de resumos e questões: ', error);
    return null;
  }
};

function searchSources(assunto: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./utils/website_thread.mjs");

    worker.on("message", (fontes: string[]) => {
      resolve(fontes);
    })

    worker.on('error', (error: Error) => {
      console.error(`Worker error: ${error}`);
      reject(error);
    });

    worker.on('exit', (code: number) => {
      if (code !== 0) {
        console.log(`Worker exited with code: ${code}`);
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });

    worker.postMessage(assunto);
  });
}

function createSummary(messageInput: IMessageInput): Promise<Resumo> {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./utils/summary_thread.mjs");

    worker.on("message", (resumo: Resumo) => {
      resolve(resumo);
    })

    worker.on('error', (error: Error) => {
      console.error(`Worker error: ${error}`);
      reject(error);
    });

    worker.on('exit', (code: number) => {
      if (code !== 0) {
        console.log(`Worker exited with code: ${code}`);
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });

    worker.postMessage(messageInput);
  });
}

function createQuestions(assunto: string): Promise<Questao[]> {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./utils/question_thread.mjs");

    worker.on("message", (questoes: Questao[]) => {
      resolve(questoes);
    })

    worker.on('error', (error: Error) => {
      console.error(`Worker error: ${error}`);
      reject(error);
    });

    worker.on('exit', (code: number) => {
      if (code !== 0) {
        console.log(`Worker exited with code: ${code}`);
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });

    worker.postMessage(assunto);
  });
}

export const login = async (formData: z.infer<typeof formSchemaLogin>) => {
  const supabase = await createClient();

  const data = {
    email: formData.email,
    password: formData.password,
  }

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    throw new Error(`${error.message}`);
  }

  revalidatePath('/', "page");
}

export const signup = async (formData: z.infer<typeof formSchemaSignup>) => {
  const supabase = await createClient()

  const registerData = {
    email: formData.email,
    password: formData.password,
  }

  const { error, data: { user } } = await supabase.auth.signUp(registerData);

  if (user) {
    const { error } = await supabase
      .from('estudante')
      .insert({
        id: user.id,
        email: formData.email,
        usuario: formData.nome,
        termo: formData.termo
      });
    if (error) {
      throw new Error(`Erro ao inserir dados na tabela: ${error?.message}`);
    }
  } else {
    throw new Error(`Erro ao fazer cadastro: ${error?.message}`);
  }

  if (error) {
    throw new Error(`${error.message}`)
  }

  revalidatePath('/', "page");

}