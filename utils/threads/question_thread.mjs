'use server'

import { parentPort, threadId } from 'node:worker_threads'
import { GoogleGenerativeAI } from "@google/generative-ai";

if (parentPort) {
  parentPort.once('message', async ({ assunto }) => {
    console.time('criando questao-' + threadId)

    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY?.toString() || '');
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    const prompt = `crie 3 novas questões novas sobre: ${assunto} usando este schema json
          questoes=[{
            questao:
            id: string,
            numero(deve ser ${threadId}): number,
            titulo(Título da questao): string,
            resposta(alternativa correta): string,
            alternativas(A, B, C, D): string[]
  }
      ...      
  ]
          `;

    const response = await model.generateContent(prompt);

    const responseText = response.response.text();
    if (!responseText) {
      throw new Error('A resposta do modelo não contém o texto esperado.');
    }
    const cleanedText = responseText.replace(/```json|```/g, '').trim();
    const responseData = JSON.parse(cleanedText);
    parentPort?.postMessage(responseData.questoes)
  })
}
