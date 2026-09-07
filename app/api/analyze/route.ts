import { NextRequest, NextResponse } from "next/server";
import Papa from "papaparse";
import {
  analyzeSpend,
  normalizeRows,
  validateHeaders,
} from "@/lib/analysis";
import {
  generateInsights,
  type Insight,
} from "@/lib/llm";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const csvText: string | undefined = body?.csv;

    if (!csvText || typeof csvText !== "string") {
      return NextResponse.json(
        {
          error: "No CSV content received.",
        },
        {
          status: 400,
        }
      );
    }

    const parsed = Papa.parse<Record<string, string>>(
      csvText,
      {
        header: true,
        skipEmptyLines: true,
        transformHeader: (h) =>
          h.trim().toLowerCase(),
      }
    );

    if (
      parsed.errors.length > 0 &&
      parsed.data.length === 0
    ) {
      return NextResponse.json(
        {
          error:
            "Could not parse CSV file. Please check the format.",
        },
        {
          status: 400,
        }
      );
    }

    const headers = parsed.meta.fields || [];

    const { valid, missing } =
      validateHeaders(headers);

    if (!valid) {
      return NextResponse.json(
        {
          error: `CSV is missing required columns: ${missing.join(
            ", "
          )}`,
        },
        {
          status: 400,
        }
      );
    }

    const records = normalizeRows(parsed.data);

    if (records.length === 0) {
      return NextResponse.json(
        {
          error:
            "No valid purchase records found in the file.",
        },
        {
          status: 400,
        }
      );
    }

    const analysis = analyzeSpend(records);

    let insights: Insight[];
    let insightsError: string | null = null;

    try {
      insights = await generateInsights(analysis);
    } catch (e) {
      insightsError =
        e instanceof Error
          ? e.message
          : "Failed to generate AI insights.";

      insights = [];
    }

    return NextResponse.json({
      analysis,
      insights,
      insightsError,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        error:
          "Unexpected error while analyzing the file.",
      },
      {
        status: 500,
      }
    );
  }
}