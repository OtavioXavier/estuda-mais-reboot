'use server';

import { parentPort } from 'node:worker_threads'
import { GoogleGenerativeAI } from "@google/generative-ai";

parentPort?.on('message', async (messageInput) => {
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY?.toString() || '');

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    const prompt = `Crie um resumo sobre: ${messageInput.assunto}, usando este schema de JSON:
    {
      "resumo": {
        "id": "string",
        "site": "string",
        "titulo": "string",
        "texto": "string",
        "link": "string"
      }
    }
    A partir do artigo ou site: ${messageInput.site}
    Gere apenas o JSON sem outros textos ou formatações. Certifique-se de que o JSON gerado é válido e não contém caracteres especiais ou de controle.
    `;
    try {
        const response = await model.generateContent(prompt);

        const responseText = response.response.text();

        if (!responseText) {
            throw new Error('A resposta do modelo não contém o texto esperado.');
        }
        const cleanedText = responseText.replace(/```json|```/gi, '').trim();
        const responseData = JSON.parse(cleanedText);
        parentPort?.postMessage(responseData.resumo)

    } catch (error) {
        parentPort?.postMessage({ error: error.message });

    } finally {
        parentPort?.close();
        process.exit(0);
    }

})