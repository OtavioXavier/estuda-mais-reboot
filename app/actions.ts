'use server'

import { generateSummarySchema, schemaSummaryQuestions } from '@/types/schemas';
import { IMessageInput, Questao, Resumo, type SQ } from '@/types';
import { Worker } from 'node:worker_threads';

export const generateSummary = async (_: unknown, data: FormData): Promise<SQ | string | null> => {
  try {
    const result = generateSummarySchema.safeParse(Object.fromEntries(data));

    if (!result.success) {
      return result.error.flatten().fieldErrors.assunto?.[0] ?? 'Erro de validação.';
    }

    const { assunto } = result.data;

    const websites = await searchWebsites(assunto);

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

function searchWebsites(assunto: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./utils/website_thread.mjs");

    worker.on("message", (websites: string[]) => {
      resolve(websites);
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

    worker.on("message", (question: Questao[]) => {
      resolve(question);
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