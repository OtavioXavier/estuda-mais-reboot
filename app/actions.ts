'use server'

import { generateSummarySchema, schemaSummaryQuestions } from '@/types/schemas';
import { IMessageInput, Questao, Resumo, SQ } from '@/types';
import { Worker } from 'node:worker_threads';
import path from 'path';

export const generateSummary = async (_: unknown, data: FormData): Promise<SQ | string | null> => {
  try {
    const result = generateSummarySchema.safeParse(Object.fromEntries(data));

    if (!result.success) {
      return result.error.flatten().fieldErrors.assunto?.[0] ?? 'Erro de validação.';
    }

    const { assunto } = result.data;

    const messageInput: IMessageInput = { assunto, site: '' }

    const websites = await searchWebsites(messageInput);

    const [resumos, questoes] = await Promise.all([
      Promise.all([
        createSummary({ ...messageInput, site: websites[0] }),
        createSummary({ ...messageInput, site: websites[1] }),
        createSummary({ ...messageInput, site: websites[2] }),
      ]),
      Promise.all([
        createQuestion(messageInput),
        createQuestion(messageInput),
        createQuestion(messageInput),
        createQuestion(messageInput),
      ]),
    ]);

    const resumosResult: Resumo[] = resumos;
    const questoesResult: Questao[] = questoes.flat();

    const sq: SQ = {
      resumos: resumosResult,
      questoes: questoesResult
    }

    const validatedObject = schemaSummaryQuestions.parse(sq);
    return validatedObject;
  } catch (error) {
    console.error('Erro durante a geração de resumos e questões: ', error);
    return null;
  }
};

const createSummary = (data: IMessageInput): Promise<Resumo> => {
  const worker = new Worker(path.resolve(process.cwd(), 'app/utils/threads/summary_thread.mjs'))
  const p = new Promise<Resumo>((resolve, reject) => {
    worker.once('message', (message) => {
      return resolve(message)
    })
    worker.once('error', reject)
  })
  worker.postMessage(data)
  return p;
}

const createQuestion = (data: IMessageInput): Promise<Questao[]> => {
  const worker = new Worker(path.resolve(process.cwd(), 'app/utils/threads/question_thread.mjs'))
  const p = new Promise<Questao[]>((resolve, reject) => {
    worker.once('message', (message) => {
      return resolve(message)
    })
    worker.once('error', reject)
  })
  worker.postMessage(data)
  return p;
}

const searchWebsites = (data: IMessageInput): Promise<string[]> => {
  const worker = new Worker(path.resolve(process.cwd(), 'app/utils/threads/website_thread.mjs'))
  const p = new Promise<string[]>((resolve, reject) => {
    worker.once('message', (message) => {
      return resolve(message)
    })
    worker.once('error', reject)
  })
  worker.postMessage(data)
  return p;
}