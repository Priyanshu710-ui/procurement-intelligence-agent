import Groq from "groq-sdk";
import type { AnalysisResult } from "./analysis";

const MODEL = "qwen/qwen3.8-27b";

const tools = [
  {
    type: "function" as const,
    function: {
      name: "get_spend_overview",
      description:
        "Get the overall procurement spending picture including total spend, order count, suppliers, supplier spending, categories, and monthly trends.",
      parameters: {
        type: "object",
        properties: {},
        required: [],
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "compare_suppliers",
      description:
        "Compare suppliers by total spend, number of orders, and average order value.",
      parameters: {
        type: "object",
        properties: {},
        required: [],
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "find_duplicate_purchases",
      description:
        "Find possible duplicate purchases where the same supplier, item, and amount appear multiple times.",
      parameters: {
        type: "object",
        properties: {},
        required: [],
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "find_spending_anomalies",
      description:
        "Find statistically unusual purchases that stand out within their category.",
      parameters: {
        type: "object",
        properties: {},
        required: [],
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "find_savings_opportunities",
      description:
        "Identify procurement cost-saving opportunities using duplicate purchases, supplier concentration, recurring purchases, and spending patterns.",
      parameters: {
        type: "object",
        properties: {},
        required: [],
      },
    },
  },
];

const SYSTEM_PROMPT = `
You are an AI Procurement Intelligence Agent.

Analyze the procurement data provided by local tools.

Rules:
- Never invent suppliers, amounts, categories, invoices, or savings.
- Use the appropriate tool before answering data-related questions.
- For supplier questions use compare_suppliers.
- For duplicate questions use find_duplicate_purchases.
- For suspicious spending use find_spending_anomalies.
- For savings questions use find_savings_opportunities.
- For broad questions use get_spend_overview.
- Explain findings in simple business language.
- Give actionable recommendations.
- Separate recoverable duplicate amounts from estimated future savings.
- Never describe estimated savings as guaranteed.
- Keep answers concise and useful.
`;

export async function runProcurementAgent(
  question: string,
  analysis: AnalysisResult
): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error("GROQ_API_KEY is not configured.");
  }

  const groq = new Groq({
    apiKey,
  });

  let messages: any[] = [
    {
      role: "system",
      content: SYSTEM_PROMPT,
    },
    {
      role: "user",
      content: question,
    },
  ];

  for (let round = 0; round < 5; round++) {
    const completion = await groq.chat.completions.create({
      model: MODEL,
      messages,
      tools,
      tool_choice: "auto",
      temperature: 0.2,
      max_tokens: 1200,
    });

    const message = completion.choices[0]?.message;

    if (!message) {
      throw new Error("Groq returned an empty response.");
    }

    // Normal final answer
    if (!message.tool_calls?.length) {
      return (
        message.content?.trim() ||
        "The procurement agent could not generate an answer."
      );
    }

    // Add assistant tool-call message
    messages.push(message);

    // Execute requested tools
    for (const toolCall of message.tool_calls) {
      const toolName = toolCall.function.name;

      console.log("EXECUTING GROQ TOOL:", toolName);

      const result = executeTool(toolName, analysis);

      console.log(
        `TOOL RESULT (${toolName}):`,
        JSON.stringify(result, null, 2)
      );

      messages.push({
        role: "tool",
        tool_call_id: toolCall.id,
        content: JSON.stringify(result),
      });
    }
  }

  return "The procurement agent reached the maximum number of tool calls.";
}


// ======================================================
// LOCAL PROCUREMENT TOOLS
// ======================================================

function executeTool(
  toolName: string,
  analysis: AnalysisResult
): unknown {
  switch (toolName) {
    case "get_spend_overview":
      return {
        totalSpend: analysis.totalSpend,
        orderCount: analysis.orderCount,
        supplierCount: analysis.supplierCount,
        supplierSpend: analysis.supplierSpend,
        categorySpend: analysis.categorySpend,
        monthlySpend: analysis.monthlySpend,
      };

    case "compare_suppliers":
      return {
        suppliers: analysis.supplierSpend,
      };

    case "find_duplicate_purchases":
      return {
        count: analysis.duplicates.length,
        duplicates: analysis.duplicates,
      };

    case "find_spending_anomalies":
      return {
        count: analysis.anomalies.length,
        anomalies: analysis.anomalies,
      };

    case "find_savings_opportunities": {
      const duplicateRecovery =
        analysis.duplicates.reduce(
          (total, duplicate) =>
            total +
            duplicate.amount *
              (duplicate.occurrences.length - 1),
          0
        );

      const topSupplier = analysis.supplierSpend[0];

      return {
        duplicateRecoveryAmount:
          Math.round(duplicateRecovery * 100) / 100,

        topSupplierOpportunity: topSupplier
          ? {
              supplier: topSupplier.supplier,
              totalSpend: topSupplier.totalSpend,
              shareOfSpend:
                analysis.totalSpend > 0
                  ? Math.round(
                      (topSupplier.totalSpend /
                        analysis.totalSpend) *
                        10000
                    ) / 100
                  : 0,
            }
          : null,

        recurringDuplicates:
          analysis.duplicates.slice(0, 10),

        anomalies:
          analysis.anomalies.slice(0, 10),

        note:
          "Supplier consolidation savings are scenario-based and should be validated through negotiation or benchmarking.",
      };
    }

    default:
      return {
        error: `Unknown procurement tool: ${toolName}`,
      };
  }
}
