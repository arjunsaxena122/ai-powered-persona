import { hiteshSirSystemPrompt } from "@/helper/prompt/hiteshSir.prompt";
import { piyushSirSystemPrompt } from "@/helper/prompt/piyushSir.prompt";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources";

const client = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: process.env.GEMINI_BASE_URL,
});

type TConversational = {
  aiMessages: ChatCompletionMessageParam[];
  updateAt: number;
};

const conversational: TConversational = {
  aiMessages: [],
  updateAt: Date.now() + 1000 * 60 * 5,
};

export async function POST(request: NextRequest) {
  if (Date.now() > conversational.updateAt) {
    conversational.aiMessages = [];
  }

  try {
    const { usermessage, chatUser } = await request.json();
    if (!usermessage || !chatUser) {
      throw new Error(`ERROR from message ${usermessage || chatUser}`);
    }

    const system_prompt =
      chatUser === "Hitesh Sir" ? hiteshSirSystemPrompt : piyushSirSystemPrompt;

    conversational.aiMessages.push({ role: "system", content: system_prompt });

    conversational.aiMessages.push({ role: "user", content: usermessage });

    const response = await client.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: conversational.aiMessages,
    });

    if (!response) {
      throw new Error(`ERROR from message ${response}`);
    }

    conversational.aiMessages.push({
      role: "assistant",
      content: response.choices[0].message.content,
    });

    // console.log(conversational.aiMessages);

    return NextResponse.json(
      {
        response,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    NextResponse.json(`ERROR:${error}`, {
      status: 500,
    });
  }
}
