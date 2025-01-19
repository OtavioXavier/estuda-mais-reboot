'use server'
// import { createGoogleGenerativeAI } from '@ai-sdk/google';
// import { generateObject } from 'ai';
import { generateSummarySchema, schemaSummaryQuestions } from '@/types/schemas';
import { IMessageInput, Questao, Resumo, SQ } from '@/types';
import { Worker } from 'node:worker_threads';

export const generateSummary = async (_: unknown, data: FormData): Promise<SQ | string | null> => {
  // console.time('generateSummary');
  try {
    const result = generateSummarySchema.safeParse(Object.fromEntries(data));
    // console.timeLog('generateSummary', 'Após validação inicial');

    if (!result.success) {
      return result.error.flatten().fieldErrors.assunto?.[0] ?? 'Erro de validação.';
    }

    const { assunto } = result.data;

    const messageInput: IMessageInput = { assunto, site: '' }

    const websites = await searchWebsites(messageInput);

    const resumos: Resumo[] = await Promise.all([
      createSummary({ ...messageInput, site: websites[0] }),
      createSummary({ ...messageInput, site: websites[1] }),
      createSummary({ ...messageInput, site: websites[2] })
    ])

    const questoes: Questao[] = (
      await Promise.all([
      createQuestion(messageInput),
      createQuestion(messageInput),
      createQuestion(messageInput),
      createQuestion(messageInput),
    ])
  ).flat();

    const sq: SQ = {
      resumos,
      questoes
    }

    //     const genAI = createGoogleGenerativeAI({
    //       apiKey: process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY,
    //     });

    //     const prompt = `
    //     Pesquise nos 3 melhores sites de notícias ou artigos científicos sobre: ${assunto}. 
    //     Resuma cada site com:
    //       - Nome do site.
    //       - Título relevante.
    //       - Resumo do texto (400 palavras).
    //       - Link para o texto original.
    //     Gere também 8 a 10 perguntas com respostas, incluindo alternativas (A, B, C, D), todas relacionadas aos resumos.
    //     Use o schema fornecido para os resultados.
    // `;

    //     const { object } = await generateObject({
    //       model: genAI('gemini-2.0-flash-exp'),
    //       schema: schemaSummaryQuestions,
    //       prompt,
    //     });
    // console.timeLog('generateSummary', 'Após chamada à API externa');

    const validatedObject = schemaSummaryQuestions.parse(sq);
    console.timeLog('generateSummary', 'Após validação do schema');
    console.timeEnd('generateSummary');

    return validatedObject;
  } catch (error) {
    console.error('Erro durante a geração de resumos e questões: ', error);
    return null;
  }
};

const createSummary = (data: IMessageInput): Promise<Resumo> => {
  const worker = new Worker('./utils/threads/summary_thread.mjs')
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
  const worker = new Worker('./utils/threads/question_thread.mjs')
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
  const worker = new Worker('./utils/threads/website_thread.mjs')
  const p = new Promise<string[]>((resolve, reject) => {
    worker.once('message', (message) => {
      return resolve(message)
    })
    worker.once('error', reject)
  })
  worker.postMessage(data)
  return p;
}

