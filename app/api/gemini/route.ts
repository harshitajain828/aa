import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(query);
    const response = await result.response;
    const text = response.text();
    return NextResponse.json({ result: text });
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return NextResponse.json({ error: 'Failed to get response from Gemini' }, { status: 500 });
  }
}