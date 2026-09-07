"use client";

import { useEffect, useState } from "react";
import UploadForm from "@/components/UploadForm";
import Dashboard from "@/components/Dashboard";
import InsightsList from "@/components/InsightsList";
import AgentChat from "@/components/AgentChat";
import type { AnalysisResult } from "@/lib/analysis";
import type { Insight } from "@/lib/llm";

export default function Home() {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [insightsError, setInsightsError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setShowIntro(false);
      } else {
        setShowIntro(true);
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  async function handleSubmit(csv: string) {
    setLoading(true);
    setError(null);
    setAnalysis(null);
    setInsights([]);
    setInsightsError(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ csv }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }

      setAnalysis(data.analysis);
      setInsights(data.insights || []);
      setInsightsError(data.insightsError || null);
    } catch (e) {
      setError(
        "Could not reach the analysis service. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* =====================================================
          CINEMATIC AI INTRO
          ===================================================== */}

      <div
        className={`ai-intro ${
          showIntro
            ? "ai-intro-visible"
            : "ai-intro-hidden"
        }`}
      >
        <div className="ai-intro-glow" />

        <div className="ai-core">
          <div className="ai-core-light" />

          <div className="ai-star">
            ✦
          </div>

          <div className="ai-orbit ai-orbit-one" />
          <div className="ai-orbit ai-orbit-two" />
          <div className="ai-orbit ai-orbit-three" />
        </div>

        <div className="ai-intro-label">
          PROCUREMENT INTELLIGENCE
        </div>

        <div className="ai-scroll-hint">
          <span />
          SCROLL TO EXPLORE
        </div>
      </div>

      {/* =====================================================
          MAIN WEBSITE
          ===================================================== */}

      <main className="min-h-screen">

        {/* ===================================================
            NAVIGATION
            =================================================== */}

        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-ledger text-paper shadow-sm">
              <span className="font-mono text-xs font-bold">
                PI
              </span>
            </div>

            <div>
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-ledger">
                Procurement
              </p>

              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/40">
                Intelligence Platform
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-2 rounded-full border border-line bg-paper/70 px-3 py-1.5 sm:flex">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-600" />

            <span className="font-mono text-[9px] uppercase tracking-wider text-ink/50">
              AI system online
            </span>
          </div>
        </nav>

        {/* ===================================================
            HERO
            =================================================== */}

        <section className="mx-auto max-w-7xl px-5 pb-14 pt-10 sm:px-8 md:pb-20 md:pt-16 lg:px-10">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">

            {/* LEFT SIDE */}

            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/5 px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />

                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-gold">
                  AI-powered spend analysis
                </span>
              </div>

              <h1 className="max-w-3xl font-display text-5xl leading-[0.98] tracking-tight text-ledger sm:text-6xl lg:text-7xl">
                Turn procurement data
                <span className="block text-gold">
                  into savings.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-ink/55 sm:text-lg">
                Upload your purchase history and uncover duplicate
                spend, supplier concentration, unusual purchases,
                and actionable cost-saving opportunities.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">

                <div className="rounded-lg border border-line bg-paper px-4 py-3">
                  <p className="font-mono text-[9px] uppercase tracking-wider text-ink/35">
                    Duplicate detection
                  </p>

                  <p className="mt-1 text-sm font-medium text-ledger">
                    Automated
                  </p>
                </div>

                <div className="rounded-lg border border-line bg-paper px-4 py-3">
                  <p className="font-mono text-[9px] uppercase tracking-wider text-ink/35">
                    Supplier analysis
                  </p>

                  <p className="mt-1 text-sm font-medium text-ledger">
                    Real-time
                  </p>
                </div>

                <div className="rounded-lg border border-line bg-paper px-4 py-3">
                  <p className="font-mono text-[9px] uppercase tracking-wider text-ink/35">
                    AI assistant
                  </p>

                  <p className="mt-1 text-sm font-medium text-ledger">
                    Groq powered
                  </p>
                </div>

              </div>
            </div>

            {/* RIGHT AI PANEL */}

            <div className="relative">

              <div className="absolute -inset-4 rounded-3xl bg-gold/5 blur-2xl" />

              <div className="relative rounded-2xl border border-line bg-paper p-5 shadow-[0_25px_70px_rgba(20,30,40,0.08)] sm:p-6">

                <div className="mb-5 flex items-center justify-between">

                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/35">
                      Analysis engine
                    </p>

                    <p className="mt-1 font-display text-xl text-ledger">
                      Procurement intelligence
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-gold/20 bg-gold/5">
                    <span className="font-mono text-xs font-bold text-gold">
                      AI
                    </span>
                  </div>

                </div>

                <div className="space-y-2">

                  {[
                    ["01", "Analyze purchase history"],
                    ["02", "Compare suppliers"],
                    ["03", "Detect suspicious spend"],
                    ["04", "Find savings opportunities"],
                  ].map(([number, label]) => (

                    <div
                      key={number}
                      className="flex items-center gap-3 rounded-xl border border-line/70 bg-ink/[0.02] px-4 py-3"
                    >
                      <span className="font-mono text-[9px] text-gold">
                        {number}
                      </span>

                      <span className="text-sm text-ink/65">
                        {label}
                      </span>
                    </div>

                  ))}

                </div>

                <div className="mt-5 rounded-xl bg-ledger px-4 py-4 text-paper">

                  <p className="font-mono text-[9px] uppercase tracking-wider text-paper/45">
                    Built for
                  </p>

                  <p className="mt-1 text-sm">
                    Faster, smarter procurement decisions.
                  </p>

                </div>

              </div>
            </div>

          </div>
        </section>

        {/* ===================================================
            UPLOAD
            =================================================== */}

        <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:px-10">

          <div className="rounded-2xl border border-line bg-paper p-5 shadow-[0_18px_50px_rgba(20,30,40,0.05)] sm:p-7">

            <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">

              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
                  Start analysis
                </p>

                <h2 className="mt-1 font-display text-2xl text-ledger sm:text-3xl">
                  Upload your procurement data
                </h2>
              </div>

              <p className="max-w-sm text-xs leading-5 text-ink/40">
                Your data is analyzed in memory per request and is
                not stored.
              </p>

            </div>

            <UploadForm
              onSubmit={handleSubmit}
              loading={loading}
            />

            {error && (
              <div className="mt-4 rounded-xl border border-rust/25 bg-rust/5 p-4 text-sm text-rust">
                {error}
              </div>
            )}

          </div>

        </section>

        {/* ===================================================
            RESULTS
            =================================================== */}

        {analysis && (

          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

            {/* AI RECOMMENDATIONS */}

            <section className="mb-16">

              <div className="mb-6 flex items-end justify-between gap-4">

                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
                    AI intelligence
                  </p>

                  <h2 className="mt-1 font-display text-3xl text-ledger sm:text-4xl">
                    Recommendations
                  </h2>
                </div>

                <span className="hidden rounded-full border border-line px-3 py-1.5 font-mono text-[9px] uppercase tracking-wider text-ink/40 sm:block">
                  Generated from your data
                </span>

              </div>

              <InsightsList
                insights={insights}
                error={insightsError}
              />

            </section>

            {/* DASHBOARD */}

            <section className="mb-16">

              <div className="mb-6">

                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
                  Procurement analytics
                </p>

                <h2 className="mt-1 font-display text-3xl text-ledger sm:text-4xl">
                  Spend dashboard
                </h2>

              </div>

              <div className="rounded-2xl border border-line bg-paper p-5 shadow-[0_18px_50px_rgba(20,30,40,0.04)] sm:p-7">
                <Dashboard analysis={analysis} />
              </div>

            </section>

            {/* PROCUREMENT AGENT */}

            <section className="mb-20">

              <div className="mb-6">

                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
                  Ask your data
                </p>

                <h2 className="mt-1 font-display text-3xl text-ledger sm:text-4xl">
                  Procurement Agent
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-6 text-ink/45">
                  Ask natural-language questions and get answers
                  grounded in the procurement data you just analyzed.
                </p>

              </div>

              <AgentChat analysis={analysis} />

            </section>

          </div>

        )}

        {/* ===================================================
            FOOTER
            =================================================== */}

        <footer className="border-t border-line">

          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">

            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45">
                Procurement Intelligence
              </p>

              <p className="mt-1 text-xs text-ink/30">
                AI-powered procurement analytics platform
              </p>
            </div>

            <p className="text-xs text-ink/30">
              Built with Next.js, Recharts, and Groq.
            </p>

          </div>

        </footer>

      </main>
    </>
  );
}