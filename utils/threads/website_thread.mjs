'use server'

import { parentPort, threadId } from 'node:worker_threads'
import { GoogleGenerativeAI } from "@google/generative-ai";

if (parentPort) {
  parentPort.once('message', async ({ assunto }) => {
    console.time('achando sites-' + threadId)

    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY?.toString() || '');
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
    const prompt = `me de o nome dos 3 melores sites para estudar ${assunto} usando este schema de json  
          sites: string[]

          um exemplo:
          sites: [
            'wikipedia',
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

    console.timeEnd('achando sites-' + threadId)
    parentPort?.postMessage(responseData.sites)
  })
}
