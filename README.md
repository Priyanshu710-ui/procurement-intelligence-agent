# Procurement Intelligence Agent

An AI procurement analyst that investigates spending across suppliers,
purchase orders, and invoices, and flags cost-saving opportunities:
duplicate purchases, statistical spending anomalies, supplier concentration,
and category-level breakdowns — with AI-generated recommendations on top.

Built as a single Next.js app (frontend + API route) so it deploys to
Vercel with zero extra infrastructure. No database is required to run it —
uploaded CSVs are analyzed in memory per request.

## What it does

- Parses a CSV of purchase records
- Computes spend by supplier, category, and month
- Detects likely **duplicate purchases** (same supplier + item + amount
  appearing more than once)
- Flags **statistical anomalies** (purchases that are unusually large
  relative to others in the same category, via z-score)
- Sends the summarized statistics to Claude to generate prioritized,
  actionable cost-saving recommendations
- Displays everything in a dashboard with charts and tables

## Tech stack

- **Next.js 14** (App Router, TypeScript) — frontend + API route, deploys
  natively on Vercel
- **Papaparse** — CSV parsing
- **Recharts** — charts
- **Anthropic SDK (`@anthropic-ai/sdk`)** — the LLM reasoning layer
- **Tailwind CSS** — styling

> The original brief suggested Python + PostgreSQL + Pandas + LangGraph +
> Next.js. This build keeps the same *capabilities* (structured data
> analysis, LLM reasoning, anomaly detection, business intelligence) but
> implements the analysis in TypeScript inside the Next.js API route so the
> whole thing is a single deployable app with no separate backend or
> database to host. See "Extending this project" below if you want to add
> the Python/Postgres pieces back in.

## 1. Open in VS Code

Unzip the project, then:

```bash
cd procurement-intelligence-agent
code .
```

Install dependencies:

```bash
npm install
```

Copy the environment template and add your Anthropic API key:

```bash
cp .env.example .env.local
```

Edit `.env.local` and set:

```
ANTHROPIC_API_KEY=sk-ant-...
```

Get a key at https://console.anthropic.com/ if you don't have one.

Run it locally:

```bash
npm run dev
```

Open http://localhost:3000 — click **"Try it with sample data"** to see it
work immediately, or drop in your own CSV.

### CSV format

Your file needs these columns (case-insensitive):

```
date, supplier, category, item, quantity, unit_price, amount, invoice_id, po_id
```

A sample file is included at `public/sample_purchases.csv` and
`sample-data/sample_purchases.csv`.

## 2. Deploy to Vercel

**Option A — Vercel CLI**

```bash
npm install -g vercel
vercel
```

Follow the prompts. When asked, set the `ANTHROPIC_API_KEY` environment
variable, or add it afterward:

```bash
vercel env add ANTHROPIC_API_KEY
```

Then deploy to production:

```bash
vercel --prod
```

**Option B — Vercel dashboard (recommended for most people)**

1. Push this project to a GitHub repo.
2. Go to https://vercel.com/new and import the repo.
3. Vercel auto-detects Next.js — no build config changes needed.
4. Under **Environment Variables**, add:
   - `ANTHROPIC_API_KEY` = your Anthropic API key
5. Click **Deploy**.

That's it — the app (including the `/api/analyze` route) runs as Vercel
serverless functions.

## Project structure

```
app/
  page.tsx              Main page (upload, results, dashboard)
  layout.tsx            Root layout, fonts, metadata
  globals.css           Design tokens / global styles
  api/analyze/route.ts  API route: parse CSV -> analyze -> call LLM
components/
  UploadForm.tsx         Drag-and-drop / file picker
  Dashboard.tsx           Charts + duplicate/anomaly tables
  InsightsList.tsx        AI-generated recommendation cards
lib/
  analysis.ts             Spend analysis, duplicate + anomaly detection
  llm.ts                  Claude prompt + call for insights
public/
  sample_purchases.csv    Demo dataset
```

## Extending this project

- **Persist uploads / history**: add a Postgres database (e.g. Vercel
  Postgres or Neon), store parsed records per upload, and add a history
  view. `DATABASE_URL` is already stubbed in `.env.example`.
- **Multi-step agent reasoning (LangGraph)**: `lib/llm.ts` currently makes a
  single structured call to Claude. You can swap this for a multi-step
  LangGraph agent (e.g. a Python service called from the API route, or a
  TypeScript LangGraph.js graph) if you want iterative tool use — e.g. the
  agent re-querying the data before finalizing recommendations.
- **Pandas-style analysis in Python**: if you'd rather run the analysis in
  Python/Pandas, move the logic in `lib/analysis.ts` into a small FastAPI
  service and call it from the API route, or deploy it as a separate
  Vercel Python serverless function under `api/`.
- **Contract analysis**: the brief mentions analyzing contracts. Add a PDF
  upload path and feed extracted text to Claude alongside the spend
  summary for contract-aware recommendations.

## Notes

- Uploaded data is processed in memory for the duration of the request and
  is not written to disk or a database in this base version.
- Anomaly detection uses a z-score (≥ 2.5 standard deviations above the
  category mean) and needs at least 3 purchases in a category to judge an
  outlier.
