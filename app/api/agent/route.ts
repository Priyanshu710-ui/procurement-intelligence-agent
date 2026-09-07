import { NextRequest, NextResponse } from "next/server";
import { runProcurementAgent } from "@/lib/agent";
import type { AnalysisResult } from "@/lib/analysis";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const question: string | undefined = body?.question;
    const analysis: AnalysisResult | undefined = body?.analysis;

    if (!question || typeof question !== "string") {
      return NextResponse.json(
        {
          error: "Please provide a question.",
        },
        {
          status: 400,
        }
      );
    }

    if (!analysis) {
      return NextResponse.json(
        {
          error: "Please upload and analyze procurement data first.",
        },
        {
          status: 400,
        }
      );
    }

    const answer = await runProcurementAgent(
      question,
      analysis
    );

    return NextResponse.json({
      answer,
    });
  } catch (error) {
    console.error("Procurement agent error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "The procurement agent failed.",
      },
      {
        status: 500,
      }
    );
  }
}