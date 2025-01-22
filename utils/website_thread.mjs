import { parentPort } from 'node:worker_threads'
import { GoogleGenerativeAI } from "@google/generative-ai";

export default parentPort?.on("message", async ({ assunto }) => {

  const genAI = new GoogleGenerativeAI(
    process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY?.toString() || ''
  );
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
  const cleanedText = responseText.replace(/```json|```/g, '').trim();
  const responseData = JSON.parse(cleanedText);
  parentPort?.postMessage(responseData.sites)
})
