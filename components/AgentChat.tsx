"use client";

import { useState } from "react";
import type { AnalysisResult } from "@/lib/analysis";

interface AgentChatProps {
  analysis: AnalysisResult;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  {
    label: "Overspending",
    question: "Where are we overspending?",
  },
  {
    label: "Supplier strategy",
    question: "Which supplier should we negotiate with?",
  },
  {
    label: "Duplicates",
    question: "Find suspicious or duplicate purchases.",
  },
  {
    label: "Savings",
    question: "How much money could we potentially save?",
  },
];

function renderInline(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong
          key={index}
          className="font-semibold text-ledger"
        >
          {part.slice(2, -2)}
        </strong>
      );
    }

    return <span key={index}>{part}</span>;
  });
}

function formatAgentResponse(text: string) {
  const lines = text.split("\n");

  const elements: React.ReactNode[] = [];
  let tableRows: string[][] = [];
  let tableMode = false;

  function flushTable() {
    if (!tableRows.length) return;

    const rows = tableRows;
    const header = rows[0];

    elements.push(
      <div
        key={`table-${elements.length}`}
        className="my-5 overflow-hidden rounded-xl border border-line bg-white shadow-sm"
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-line bg-slate-50">
                {header.map((cell, index) => (
                  <th
                    key={index}
                    className="whitespace-nowrap px-4 py-3 font-mono text-[9px] uppercase tracking-[0.14em] text-ink/40"
                  >
                    {renderInline(cell.trim())}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.slice(1).map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border-b border-line/70 last:border-0 hover:bg-gold/[0.025]"
                >
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="px-4 py-3 text-ink/70"
                    >
                      {renderInline(cell.trim())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );

    tableRows = [];
    tableMode = false;
  }

  lines.forEach((rawLine, index) => {
    const line = rawLine.trim();

    if (!line) {
      if (tableMode) flushTable();

      elements.push(
        <div
          key={`space-${index}`}
          className="h-2"
        />
      );

      return;
    }

    /*
     * Markdown table
     */
    if (line.includes("|")) {
      const cells = line
        .split("|")
        .map((cell) => cell.trim())
        .filter(Boolean);

      const isSeparator = cells.every((cell) =>
        /^:?-{2,}:?$/.test(cell)
      );

      if (isSeparator) {
        tableMode = true;
        return;
      }

      if (!tableMode && tableRows.length === 0) {
        tableMode = true;
      }

      tableRows.push(cells);
      return;
    }

    if (tableMode) {
      flushTable();
    }

    /*
     * Headings
     */
    if (/^#{1,3}\s/.test(line)) {
      const heading = line.replace(/^#{1,3}\s/, "");

      elements.push(
        <h3
          key={index}
          className="mb-2 mt-6 font-display text-lg text-ledger first:mt-0"
        >
          {renderInline(heading)}
        </h3>
      );

      return;
    }

    /*
     * Numbered list
     */
    const numbered = line.match(/^(\d+)\.\s+(.*)$/);

    if (numbered) {
      elements.push(
        <div
          key={index}
          className="mt-3 flex gap-3"
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gold/25 bg-gold/5 font-mono text-[10px] text-gold">
            {numbered[1]}
          </span>

          <p className="pt-0.5 leading-7 text-ink/70">
            {renderInline(numbered[2])}
          </p>
        </div>
      );

      return;
    }

    /*
     * Bullet list
     */
    const bullet = line.match(/^[-*•]\s+(.*)$/);

    if (bullet) {
      elements.push(
        <div
          key={index}
          className="flex gap-3 py-1"
        >
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />

          <p className="leading-7 text-ink/70">
            {renderInline(bullet[1])}
          </p>
        </div>
      );

      return;
    }

    /*
     * Action / Bottom line emphasis
     */
    if (
      line.startsWith("Action:") ||
      line.startsWith("Bottom line:")
    ) {
      const colonIndex = line.indexOf(":");

      const label = line.slice(0, colonIndex + 1);
      const content = line.slice(colonIndex + 1);

      elements.push(
        <div
          key={index}
          className="my-4 rounded-xl border border-gold/20 bg-gold/[0.06] px-4 py-3.5"
        >
          <p className="text-sm leading-6 text-ink/70">
            <strong className="font-mono text-[9px] uppercase tracking-[0.15em] text-gold">
              {label}
            </strong>{" "}
            {renderInline(content.trim())}
          </p>
        </div>
      );

      return;
    }

    /*
     * Normal paragraph
     */
    elements.push(
      <p
        key={index}
        className="leading-7 text-ink/70"
      >
        {renderInline(line)}
      </p>
    );
  });

  if (tableMode) {
    flushTable();
  }

  return elements;
}

export default function AgentChat({
  analysis,
}: AgentChatProps) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function askAgent(questionText?: string) {
    const finalQuestion =
      questionText?.trim() ||
      question.trim();

    if (!finalQuestion || loading) {
      return;
    }

    setQuestion("");
    setError(null);

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: finalQuestion,
      },
    ]);

    setLoading(true);

    try {
      const res = await fetch(
        "/api/agent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: finalQuestion,
            analysis,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error ||
            "The procurement agent failed."
        );
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            data.answer ||
            "I couldn't generate an answer.",
        },
      ]);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong.";

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    askAgent();
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_20px_60px_rgba(23,32,51,0.07)]">
      {/* HEADER */}
      <div className="border-b border-line px-5 py-5 sm:px-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-gold/20 bg-gold/5">
              <span className="font-mono text-xs font-bold text-gold">
                AI
              </span>

              <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-ledger">
                  Procurement Agent
                </h2>

                <span className="rounded-full border border-green-600/15 bg-green-50 px-2 py-0.5 font-mono text-[8px] uppercase tracking-wider text-green-700">
                  Online
                </span>
              </div>

              <p className="mt-1 text-xs text-ink/40">
                Ask questions about your analyzed spend.
              </p>
            </div>
          </div>

          {messages.length > 0 && (
            <button
              type="button"
              onClick={() => {
                setMessages([]);
                setError(null);
              }}
              className="rounded-lg px-3 py-2 font-mono text-[9px] uppercase tracking-[0.14em] text-ink/35 hover:bg-rust/5 hover:text-rust"
            >
              Clear conversation
            </button>
          )}
        </div>
      </div>

      {/* SUGGESTIONS */}
      <div className="border-b border-line bg-slate-50/70 px-5 py-4 sm:px-7">
        <div className="mb-3 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />

          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/35">
            Quick questions
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {SUGGESTIONS.map((item) => (
            <button
              key={item.label}
              type="button"
              disabled={loading}
              onClick={() =>
                askAgent(item.question)
              }
              className="rounded-full border border-line bg-white px-3.5 py-2 text-xs font-medium text-ink/55 shadow-sm hover:-translate-y-0.5 hover:border-gold/40 hover:bg-gold/5 hover:text-ledger disabled:cursor-not-allowed disabled:opacity-50"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* CONVERSATION */}
      <div className="max-h-[620px] overflow-y-auto px-5 py-7 sm:px-7">
        {messages.length === 0 && (
          <div className="py-12 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-gold/20 bg-gold/5 shadow-sm">
              <span className="font-mono text-sm font-bold text-gold">
                ?
              </span>
            </div>

            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/30">
              Procurement intelligence
            </p>

            <h3 className="mt-2 font-display text-2xl text-ledger">
              What would you like to investigate?
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-ink/45">
              Ask about suppliers, duplicate purchases,
              unusual spending, or potential savings.
            </p>
          </div>
        )}

        <div className="space-y-7">
          {messages.map(
            (message, index) => (
              <div
                key={index}
                className={
                  message.role === "user"
                    ? "flex justify-end"
                    : "flex justify-start"
                }
              >
                {message.role === "user" ? (
                  <div className="max-w-[88%] rounded-2xl rounded-br-md bg-ledger px-4 py-3.5 text-sm leading-6 text-white shadow-md sm:max-w-[75%]">
                    {message.content}
                  </div>
                ) : (
                  <div className="w-full">
                    <div className="mb-2.5 flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-gold/20 bg-gold/5 font-mono text-[8px] font-bold text-gold">
                        AI
                      </span>

                      <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink/35">
                        Procurement intelligence
                      </span>
                    </div>

                    <div className="rounded-2xl rounded-tl-md border border-line bg-slate-50/80 px-5 py-4">
                      <div className="max-w-none text-sm">
                        {formatAgentResponse(
                          message.content
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          )}

          {/* LOADING */}
          {loading && (
            <div className="flex justify-start">
              <div className="w-full">
                <div className="mb-2.5 flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-gold/20 bg-gold/5 font-mono text-[8px] font-bold text-gold">
                    AI
                  </span>

                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink/35">
                    Analyzing procurement data
                  </span>
                </div>

                <div className="rounded-2xl rounded-tl-md border border-line bg-slate-50/80 px-5 py-5">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />

                    <span
                      className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold"
                      style={{
                        animationDelay: "150ms",
                      }}
                    />

                    <span
                      className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold"
                      style={{
                        animationDelay: "300ms",
                      }}
                    />

                    <span className="ml-2 text-xs text-ink/40">
                      Reviewing your spend...
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-rust/20 bg-rust/5 px-4 py-3 text-sm text-rust">
              {error}
            </div>
          )}
        </div>
      </div>

      {/* INPUT */}
      <div className="border-t border-line bg-white px-5 py-5 sm:px-6">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <div className="relative flex-1">
            <input
              value={question}
              onChange={(event) =>
                setQuestion(
                  event.target.value
                )
              }
              disabled={loading}
              placeholder="Ask something about your procurement data..."
              className="h-12 w-full rounded-xl border border-line bg-slate-50 px-4 pr-12 text-sm text-ledger outline-none placeholder:text-ink/30 focus:border-gold/50 focus:bg-white focus:ring-4 focus:ring-gold/10 disabled:cursor-not-allowed disabled:opacity-60"
            />

            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 rounded-md bg-white px-1.5 py-1 font-mono text-[8px] uppercase tracking-wider text-ink/25 shadow-sm">
              AI
            </span>
          </div>

          <button
            type="submit"
            disabled={
              loading ||
              !question.trim()
            }
            className="h-12 rounded-xl bg-ledger px-7 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-white shadow-sm hover:-translate-y-0.5 hover:shadow-md hover:bg-ledger/90 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:translate-y-0"
          >
            {loading
              ? "Analyzing..."
              : "Ask Agent"}
          </button>
        </form>

        <div className="mt-3 flex items-center justify-between">
          <p className="font-mono text-[8px] uppercase tracking-[0.13em] text-ink/25">
            Answers are grounded in your uploaded dataset
          </p>

          <p className="hidden font-mono text-[8px] uppercase tracking-[0.13em] text-ink/25 sm:block">
            Enter ↵
          </p>
        </div>
      </div>
    </section>
  );
}