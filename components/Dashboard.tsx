"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import type { AnalysisResult } from "@/lib/analysis";

const COLORS = ["#1F2A44", "#B9843C", "#5C7A5F", "#A6512F", "#324268"];

export default function Dashboard({ analysis }: { analysis: AnalysisResult }) {
  const currency = (n: number) =>
    n.toLocaleString(undefined, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });

  const flagCount =
    analysis.duplicates.length + analysis.anomalies.length;

  return (
    <div className="space-y-12">
      {/* OVERVIEW STATS */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
              Executive overview
            </p>
            <h2 className="mt-1 font-display text-2xl text-ledger sm:text-3xl">
              Spend at a glance
            </h2>
          </div>

          <div className="hidden rounded-full border border-line bg-slate-50 px-3 py-1.5 sm:block">
            <span className="font-mono text-[9px] uppercase tracking-wider text-ink/40">
              Live analysis
            </span>
          </div>
        </div>

        <div className="grid overflow-hidden rounded-2xl border border-line bg-line shadow-sm sm:grid-cols-2 lg:grid-cols-4">
          <Stat
            label="Total spend"
            value={currency(analysis.totalSpend)}
            description="Across all purchases"
          />

          <Stat
            label="Purchase orders"
            value={analysis.orderCount.toLocaleString()}
            description="Transactions analyzed"
          />

          <Stat
            label="Suppliers"
            value={analysis.supplierCount.toLocaleString()}
            description="Unique suppliers"
          />

          <Stat
            label="Flags raised"
            value={flagCount.toString()}
            description="Potential issues"
            accent
          />
        </div>
      </section>

      {/* MONTHLY TREND */}
      {analysis.monthlySpend.length > 1 && (
        <section>
          <SectionTitle
            eyebrow="Trend"
            title="Spend over time"
            description="Monthly procurement activity"
          />

          <div className="rounded-2xl border border-line bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink/35">
                  Monthly spend
                </p>
              </div>

              <span className="rounded-lg border border-gold/20 bg-gold/5 px-3 py-1.5 font-mono text-[10px] text-gold">
                USD
              </span>
            </div>

            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={analysis.monthlySpend}
                  margin={{ top: 8, right: 8, left: -12, bottom: 4 }}
                >
                  <CartesianGrid
                    stroke="#E4E8EE"
                    strokeDasharray="4 5"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="month"
                    tick={{
                      fontSize: 11,
                      fill: "#667085",
                    }}
                    axisLine={{
                      stroke: "#E4E8EE",
                    }}
                    tickLine={false}
                  />

                  <YAxis
                    tick={{
                      fontSize: 11,
                      fill: "#667085",
                    }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) =>
                      `$${Math.round(v / 1000)}k`
                    }
                  />

                  <Tooltip
                    formatter={(v: number) => currency(v)}
                    contentStyle={{
                      borderRadius: 12,
                      borderColor: "#E4E8EE",
                      backgroundColor: "#ffffff",
                      boxShadow:
                        "0 12px 30px rgba(23,32,51,0.10)",
                      fontSize: 12,
                    }}
                    labelStyle={{
                      color: "#172033",
                      fontWeight: 600,
                      marginBottom: 4,
                    }}
                  />

                  <Line
                    type="monotone"
                    dataKey="totalSpend"
                    stroke="#B9843C"
                    strokeWidth={3}
                    dot={{
                      r: 4,
                      fill: "#B9843C",
                      strokeWidth: 2,
                      stroke: "#ffffff",
                    }}
                    activeDot={{
                      r: 6,
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      )}

      {/* SUPPLIER + CATEGORY */}
      <div className="grid gap-8 lg:grid-cols-2">
        <section>
          <SectionTitle
            eyebrow="Concentration"
            title="Top suppliers"
            description="Highest spend by supplier"
          />

          <div className="rounded-2xl border border-line bg-white p-5 shadow-sm sm:p-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={analysis.supplierSpend.slice(0, 8)}
                  layout="vertical"
                  margin={{
                    top: 4,
                    right: 12,
                    left: 4,
                    bottom: 4,
                  }}
                >
                  <XAxis
                    type="number"
                    tick={{
                      fontSize: 10,
                      fill: "#667085",
                    }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) =>
                      `$${Math.round(v / 1000)}k`
                    }
                  />

                  <YAxis
                    type="category"
                    dataKey="supplier"
                    width={120}
                    tick={{
                      fontSize: 10,
                      fill: "#172033",
                    }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <Tooltip
                    formatter={(v: number) => currency(v)}
                    contentStyle={{
                      borderRadius: 12,
                      borderColor: "#E4E8EE",
                      backgroundColor: "#ffffff",
                      boxShadow:
                        "0 12px 30px rgba(23,32,51,0.10)",
                      fontSize: 12,
                    }}
                  />

                  <Bar
                    dataKey="totalSpend"
                    fill="#1F2A44"
                    radius={[0, 6, 6, 0]}
                    barSize={22}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        <section>
          <SectionTitle
            eyebrow="Breakdown"
            title="Spend by category"
            description="Where procurement money goes"
          />

          <div className="rounded-2xl border border-line bg-white p-5 shadow-sm sm:p-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={analysis.categorySpend.slice(0, 8)}
                  layout="vertical"
                  margin={{
                    top: 4,
                    right: 12,
                    left: 4,
                    bottom: 4,
                  }}
                >
                  <XAxis
                    type="number"
                    tick={{
                      fontSize: 10,
                      fill: "#667085",
                    }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) =>
                      `$${Math.round(v / 1000)}k`
                    }
                  />

                  <YAxis
                    type="category"
                    dataKey="category"
                    width={120}
                    tick={{
                      fontSize: 10,
                      fill: "#172033",
                    }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <Tooltip
                    formatter={(v: number) => currency(v)}
                    contentStyle={{
                      borderRadius: 12,
                      borderColor: "#E4E8EE",
                      backgroundColor: "#ffffff",
                      boxShadow:
                        "0 12px 30px rgba(23,32,51,0.10)",
                      fontSize: 12,
                    }}
                  />

                  <Bar
                    dataKey="totalSpend"
                    fill="#B9843C"
                    radius={[0, 6, 6, 0]}
                    barSize={22}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      </div>

      {/* DUPLICATES */}
      <section>
        <SectionTitle
          eyebrow={`${analysis.duplicates.length} found`}
          title="Possible duplicate purchases"
          description="Repeated supplier, item, and amount combinations"
          alert={analysis.duplicates.length > 0}
        />

        {analysis.duplicates.length === 0 ? (
          <EmptyState>
            None detected — no repeated supplier/item/amount
            combinations.
          </EmptyState>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-left text-sm">
                <thead>
                  <tr className="border-b border-line bg-slate-50">
                    <TableHeader>Supplier</TableHeader>
                    <TableHeader>Item</TableHeader>
                    <TableHeader>Amount</TableHeader>
                    <TableHeader>Times seen</TableHeader>
                    <TableHeader>Invoices</TableHeader>
                  </tr>
                </thead>

                <tbody>
                  {analysis.duplicates.slice(0, 25).map((d, i) => (
                    <tr
                      key={i}
                      className="border-b border-line/70 last:border-0 hover:bg-gold/[0.025]"
                    >
                      <TableCell>{d.supplier}</TableCell>

                      <TableCell muted>{d.item}</TableCell>

                      <TableCell mono>
                        {currency(d.amount)}
                      </TableCell>

                      <TableCell>
                        <span className="inline-flex items-center rounded-full border border-rust/20 bg-rust/5 px-2.5 py-1 font-mono text-[10px] font-medium text-rust">
                          {d.occurrences.length}×
                        </span>
                      </TableCell>

                      <TableCell mono muted>
                        {d.occurrences
                          .map((o) => o.invoice_id || "—")
                          .join(", ")}
                      </TableCell>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {analysis.duplicates.length > 25 && (
              <div className="border-t border-line bg-slate-50 px-5 py-3 text-center">
                <span className="font-mono text-[9px] uppercase tracking-wider text-ink/35">
                  Showing first 25 results
                </span>
              </div>
            )}
          </div>
        )}
      </section>

      {/* ANOMALIES */}
      <section>
        <SectionTitle
          eyebrow={`${analysis.anomalies.length} found`}
          title="Unusual spending"
          description="Purchases that stand out statistically"
          alert={analysis.anomalies.length > 0}
        />

        {analysis.anomalies.length === 0 ? (
          <EmptyState>
            None detected — no purchases stood out statistically
            within their category.
          </EmptyState>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] text-left text-sm">
                <thead>
                  <tr className="border-b border-line bg-slate-50">
                    <TableHeader>Supplier</TableHeader>
                    <TableHeader>Item</TableHeader>
                    <TableHeader>Category</TableHeader>
                    <TableHeader>Amount</TableHeader>
                    <TableHeader>Category avg</TableHeader>
                    <TableHeader>Z-score</TableHeader>
                  </tr>
                </thead>

                <tbody>
                  {analysis.anomalies.slice(0, 25).map((a, i) => (
                    <tr
                      key={i}
                      className="border-b border-line/70 last:border-0 hover:bg-gold/[0.025]"
                    >
                      <TableCell>{a.record.supplier}</TableCell>

                      <TableCell muted>
                        {a.record.item}
                      </TableCell>

                      <TableCell muted>
                        {a.record.category}
                      </TableCell>

                      <TableCell mono>
                        {currency(a.record.amount)}
                      </TableCell>

                      <TableCell mono muted>
                        {currency(a.categoryAvg)}
                      </TableCell>

                      <TableCell>
                        <span className="inline-flex items-center rounded-full border border-gold/20 bg-gold/5 px-2.5 py-1 font-mono text-[10px] font-medium text-gold">
                          {a.zScore}σ
                        </span>
                      </TableCell>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {analysis.anomalies.length > 25 && (
              <div className="border-t border-line bg-slate-50 px-5 py-3 text-center">
                <span className="font-mono text-[9px] uppercase tracking-wider text-ink/35">
                  Showing first 25 results
                </span>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

/* ----------------------------- */
/* STAT CARD */
/* ----------------------------- */

function Stat({
  label,
  value,
  description,
  accent,
}: {
  label: string;
  value: string;
  description: string;
  accent?: boolean;
}) {
  return (
    <div className="group bg-white px-5 py-6 sm:px-6">
      <div className="flex items-start justify-between gap-3">
        <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink/40">
          {label}
        </p>

        <span
          className={`h-2 w-2 rounded-full ${
            accent ? "bg-rust" : "bg-gold"
          }`}
        />
      </div>

      <p
        className={`mt-3 font-display text-2xl tracking-tight sm:text-3xl ${
          accent ? "text-rust" : "text-ledger"
        }`}
      >
        {value}
      </p>

      <p className="mt-1 text-xs text-ink/35">
        {description}
      </p>
    </div>
  );
}

/* ----------------------------- */
/* SECTION TITLE */
/* ----------------------------- */

function SectionTitle({
  eyebrow,
  title,
  description,
  alert,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  alert?: boolean;
}) {
  return (
    <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div className="flex items-center gap-2">
          <p
            className={`font-mono text-[9px] uppercase tracking-[0.18em] ${
              alert ? "text-rust" : "text-gold"
            }`}
          >
            {eyebrow}
          </p>

          {alert && (
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rust" />
          )}
        </div>

        <h2 className="mt-1 font-display text-xl text-ledger sm:text-2xl">
          {title}
        </h2>

        {description && (
          <p className="mt-1 text-xs text-ink/40">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

/* ----------------------------- */
/* TABLE HELPERS */
/* ----------------------------- */

function TableHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <th className="px-5 py-3.5 font-mono text-[9px] font-medium uppercase tracking-[0.14em] text-ink/40">
      {children}
    </th>
  );
}

function TableCell({
  children,
  muted,
  mono,
}: {
  children: React.ReactNode;
  muted?: boolean;
  mono?: boolean;
}) {
  return (
    <td
      className={`px-5 py-4 ${
        muted ? "text-ink/55" : "text-ink/80"
      } ${mono ? "font-mono text-xs" : ""}`}
    >
      {children}
    </td>
  );
}

/* ----------------------------- */
/* EMPTY STATE */
/* ----------------------------- */

function EmptyState({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-line bg-white px-5 py-5 shadow-sm">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-green-200 bg-green-50 text-sm text-green-600">
        ✓
      </div>

      <p className="text-sm text-ink/50">
        {children}
      </p>
    </div>
  );
}