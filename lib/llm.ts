import Groq from "groq-sdk";
import type { AnalysisResult } from "./analysis";

export interface Insight {
  title: string;
  description: string;
  estimatedSavings?: number;
  priority?: "high" | "medium" | "low";
}

const MODEL = "qwen/qwen3.8-27b";

export async function generateInsights(
  analysis: AnalysisResult
): Promise<Insight[]> {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error(
      "GROQ_API_KEY is not set. Add it to your .env.local file."
    );
  }

  const groq = new Groq({
    apiKey,
  });

  const prompt = `
You are a senior procurement analyst.

Analyze the following procurement data and identify the most useful
cost-saving opportunities.

PROCUREMENT DATA:

Total spend: $${analysis.totalSpend}
Purchase orders: ${analysis.orderCount}
Suppliers: ${analysis.supplierCount}

Supplier spend:
${JSON.stringify(analysis.supplierSpend, null, 2)}

Category spend:
${JSON.stringify(analysis.categorySpend, null, 2)}

Monthly spend:
${JSON.stringify(analysis.monthlySpend, null, 2)}

Possible duplicates:
${JSON.stringify(analysis.duplicates, null, 2)}

Anomalies:
${JSON.stringify(analysis.anomalies, null, 2)}

Return ONLY valid JSON.

Use exactly this structure:

{
  "insights": [
    {
      "title": "Short opportunity title",
      "description": "Explain the opportunity and why it matters.",
      "estimatedSavings": 1000,
      "priority": "high"
    }
  ]
}

Rules:
- Return 4 to 6 useful recommendations.
- Use only information supported by the data.
- Never invent suppliers, amounts, categories, or invoices.
- estimatedSavings must be a reasonable estimate, not a guaranteed saving.
- If savings cannot reasonably be estimated, omit estimatedSavings.
- priority must be "high", "medium", or "low".
- Focus on:
  - duplicate recovery
  - supplier negotiation
  - supplier consolidation
  - recurring purchases
  - category concentration
  - process improvements
- Keep descriptions practical and business-focused.
`;

  const completion = await groq.chat.completions.create({
    model: MODEL,
    messages: [
      {
        role: "system",
        content:
          "You are a procurement intelligence analyst. Always return valid JSON when requested.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.2,
    max_tokens: 2000,
    response_format: {
      type: "json_object",
    },
  });

  const content = completion.choices[0]?.message?.content;

  if (!content) {
    throw new Error(
      "Groq returned an empty recommendation response."
    );
  }

  let parsed: any;

  try {
    parsed = JSON.parse(content);
  } catch {
    throw new Error(
      "Groq returned invalid JSON for recommendations."
    );
  }

  const insights = Array.isArray(parsed)
    ? parsed
    : parsed.insights || parsed.recommendations || [];

  if (!Array.isArray(insights)) {
    throw new Error(
      "Groq returned an invalid recommendations format."
    );
  }

  return insights.map((item: any) => ({
    title: String(
      item.title || "Procurement opportunity"
    ),

    description: String(
      item.description || ""
    ),

    ...(item.estimatedSavings !== undefined &&
    !Number.isNaN(Number(item.estimatedSavings))
      ? {
          estimatedSavings: Number(
            item.estimatedSavings
          ),
        }
      : {}),

    priority:
      item.priority === "high" ||
      item.priority === "medium" ||
      item.priority === "low"
        ? item.priority
        : "medium",
  }));
}