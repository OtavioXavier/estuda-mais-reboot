'use server';

import { parentPort, threadId } from 'node:worker_threads'
import { GoogleGenerativeAI } from "@google/generative-ai";

parentPort?.on('message', async (messageInput) => {
    console.time('resumindo-' + threadId)
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY?.toString() || '');
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
    const prompt = `crie somente 1 resumo sobre: ${messageInput.assunto} e retorne o objeto usando este schema de json  
    {
    resumo:
    id: string,
    site(Nome do site): string,
    titulo(Título relevante): string.
    texto(Resumo do texto (400 palavras)): string,
    link(Link para o texto original): string,
    }
          
    a partir do site: ${messageInput.site}
          `;
    try {
        const response = await model.generateContent(prompt);
        const responseText = response.response.text();

        if (!responseText) {
            throw new Error('A resposta do modelo não contém o texto esperado.');
        }

        const cleanedText = responseText.replace(/```json|```/g, '').trim();
        const responseData = JSON.parse(cleanedText);
        parentPort?.postMessage(responseData.resumo)

    } catch (error) {
        parentPort?.postMessage({ error: error.message });

    } finally {
        parentPort?.close();
        process.exit(0);
    }

})
