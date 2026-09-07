import type { Insight } from "@/lib/llm";

const PRIORITY_STYLES: Record<
  NonNullable<Insight["priority"]>,
  string
> = {
  high: "border-rust/30 bg-rust/5 text-rust",
  medium: "border-gold/30 bg-gold/5 text-gold",
  low: "border-line bg-ink/5 text-ink/60",
};

export default function InsightsList({
  insights,
  error,
}: {
  insights: Insight[];
  error?: string | null;
}) {
  if (error) {
    return (
      <div className="rounded-sm border border-rust/30 bg-rust/5 p-4 text-sm text-rust">
        Couldn't generate AI insights: {error}
      </div>
    );
  }

  if (!insights.length) {
    return (
      <div className="rounded-sm border border-line bg-paper p-6 text-sm text-ink/60">
        No AI recommendations were generated.
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {insights.map((insight, index) => {
        const priority = insight.priority ?? "medium";

        return (
          <div
            key={`${insight.title}-${index}`}
            className="rounded-sm border border-line bg-paper p-5"
          >
            <div className="mb-3 flex items-start justify-between gap-4">
              <h3 className="font-display text-lg text-ledger">
                {insight.title}
              </h3>

              <span
                className={`shrink-0 rounded-sm border px-2 py-1 font-mono text-[10px] uppercase tracking-wider ${PRIORITY_STYLES[priority]}`}
              >
                {priority}
              </span>
            </div>

            <p className="text-sm leading-6 text-ink/65">
              {insight.description}
            </p>

            {insight.estimatedSavings !== undefined && (
              <div className="mt-4 border-t border-line pt-3">
                <span className="font-mono text-[10px] uppercase tracking-wider text-ink/40">
                  Estimated savings
                </span>

                <p className="mt-1 font-mono text-lg text-ledger">
                  $
                  {insight.estimatedSavings.toLocaleString(
                    "en-US",
                    {
                      maximumFractionDigits: 0,
                    }
                  )}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}