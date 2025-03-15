import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import OpenAI from "openai";
export const dynamic = 'force-dynamic'
// Input validation schema
const GenerateImageSchema = z.object({
  prompt: z.string().min(1, "Prompt is required").max(600, "Prompt is too long"),
});

const client = new OpenAI({
  baseURL: "https://api.studio.nebius.com/v1/",
  apiKey: process.env.NEBIUS_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const result = GenerateImageSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }
    const { prompt } = result.data;

    const response = await client.images.generate({
      model: "stability-ai/sdxl",
      response_format: "url",
      // extra_body: {
      //   response_extension: "webp",
      //   width: 1024,
      //   height: 1024,
      //   num_inference_steps: 30,
      //   negative_prompt: "",
      //   seed: -1,
      // },
      // extr
      prompt: prompt,
    });

    console.log(response);

    if (!response) {
      return NextResponse.json({ error: response }, { status: 500 });
    }

    return NextResponse.json({
      imageUrl: response.data[0].url,
    });
  } catch (error) {
    console.error("Error in API route:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
