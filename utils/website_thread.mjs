'use server';

import { parentPort } from 'node:worker_threads'
import { GoogleGenerativeAI } from "@google/generative-ai";

parentPort?.on("message", async (assunto) => {

  const genAI = new GoogleGenerativeAI(
    process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY?.toString() || ''
  );
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
  const prompt = `me de o nome dos 3 melores artigos para estudar ${assunto} usando este schema de json  
          sites: string[]

          um exemplo:
          sites: [
            'wikipedia',
            ...
          ]
            Não escreva nada aném do json
          `;
  try {
    const response = await model.generateContent(prompt);
    const responseText = response.response.text();
    const cleanedText = responseText.replace(/```json|```/g, '').trim();
    const responseData = JSON.parse(cleanedText);
    parentPort?.postMessage(responseData.sites)
  } catch (error) {
    parentPort?.postMessage({ error: error.message });
  } finally {
    parentPort?.close();
    process.exit(0);
  }

})
