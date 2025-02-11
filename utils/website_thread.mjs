'use server';

import { parentPort } from 'node:worker_threads'
import { GoogleGenerativeAI } from "@google/generative-ai";

parentPort?.on("message", async (assunto) => {

  const genAI = new GoogleGenerativeAI(
    process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY?.toString() || ''
  );
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
  const prompt = `
  prompt = me dê o nome dos 3 melhores artigos como fonte para estudos no assunto: ${assunto}, como este exemplo:
{
  "fontes": [
    'Nome do Artigo 1',
    'Nome do Artigo 2',
    'Nome do Artigo 3'
]
}

   Gere apenas o JSON sem outros textos ou formatações. Certifique-se de que o JSON gerado é válido e não contém caracteres especiais ou de controle.
  `;

  try {
    const response = await model.generateContent(prompt);
    const responseText = response.response.text();
    const cleanedText = responseText.replace(/```json|```/g, '').trim();
    const responseData = JSON.parse(cleanedText);
    parentPort?.postMessage(responseData.fontes)
  } catch (error) {
    parentPort?.postMessage({ error: error.message });
  } finally {
    parentPort?.close();
    process.exit(0);
  }

})
