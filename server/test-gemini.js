import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

async function test() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const instructions = "You are an expert AI Writing Assistant.";
    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        systemInstruction: instructions,
    });
    const history = [];
    try {
        const chat = model.startChat({ history });
        const result = await chat.sendMessageStream("Hi there!");
        for await (const chunk of result.stream) {
            process.stdout.write(chunk.text());
        }
        console.log("\nStream finished successfully!");
    } catch (e) {
        console.error("Stream error:", e);
    }
}
test();
