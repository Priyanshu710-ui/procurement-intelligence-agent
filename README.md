# ⚡ AI Procurement Intelligence Agent

<div align="center">

### Turn procurement data into decisions.

**Upload → Analyze → Detect → Investigate → Save**

An AI-powered procurement intelligence platform that turns purchase records into actionable spend insights, risk signals, savings opportunities, and a conversational procurement investigation experience.

<br />

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Groq](https://img.shields.io/badge/AI-Groq%20%2B%20Qwen-purple?style=for-the-badge)](https://groq.com/)
[![Tailwind CSS](https://img.shields.io/badge/UI-Tailwind-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Recharts](https://img.shields.io/badge/Charts-Recharts-orange?style=for-the-badge)](https://recharts.org/)

</div>

---

## 🌌 Enter the Procurement Intelligence Layer

Procurement data is full of signals.

The problem is finding them before they become expensive.

Duplicate purchases. Supplier concentration. Unusual transactions. Recurring spend. Negotiation opportunities.

**AI Procurement Intelligence Agent** turns those signals into an investigation workflow.

Instead of digging through spreadsheets transaction by transaction, upload a CSV and let the system build the procurement picture for you.

> **Raw transactions in. Procurement intelligence out.**

---

## 🚀 What happens after you upload data?

```text
                    ┌─────────────────────┐
                    │   PROCUREMENT CSV   │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   VALIDATE + CLEAN  │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   SPEND ANALYSIS    │
                    └──────────┬──────────┘
                               │
             ┌─────────────────┼─────────────────┐
             ▼                 ▼                 ▼
       SUPPLIERS          DUPLICATES        ANOMALIES
             │                 │                 │
             └─────────────────┼─────────────────┘
                               ▼
                    ┌─────────────────────┐
                    │   AI INTELLIGENCE   │
                    └──────────┬──────────┘
                               │
                ┌──────────────┴──────────────┐
                ▼                             ▼
         RECOMMENDATIONS              PROCUREMENT AGENT
                │                             │
                └──────────────┬──────────────┘
                               ▼
                    ┌─────────────────────┐
                    │   BETTER DECISIONS  │
                    └─────────────────────┘
```

---

# 🧠 Intelligence Modules

## 💰 Spend Intelligence

Get an instant procurement overview covering:

- Total spend
- Purchase order count
- Supplier count
- Spend by supplier
- Spend by category
- Monthly spending trends
- Supplier concentration

The goal is simple: **see the financial picture before making the decision.**

---

## 🕵️ Duplicate Purchase Detection

The analysis engine searches for repeated combinations of:

```text
Supplier + Item + Amount
```

When the same combination appears multiple times, it is surfaced as a possible duplicate.

The system also calculates the potential recoverable amount from repeated occurrences.

Example:

```text
Supplier:     Global Office Supplies
Item:         A4 Paper Cartons
Amount:       $1,400
Occurrences:  3
```

That means the repeated spend becomes an immediate investigation target.

---

## 🚨 Statistical Spending Anomalies

Large purchases are not automatically bad purchases.

Instead, the system looks for transactions that stand out relative to spending within their category.

The anomaly engine uses **z-score based detection** and requires enough category history to make the comparison meaningful.

This helps surface transactions worth investigating rather than blindly labeling them as fraudulent.

---

## 🏢 Supplier Intelligence

Supplier concentration can create negotiation and dependency risks.

The platform compares suppliers using:

- Total spend
- Order count
- Average order value
- Share of total procurement spend

This makes questions like these much easier to answer:

> Which supplier deserves our attention first?

> Where are we most concentrated?

> Who should we negotiate with?

---

# 🤖 Meet the Procurement Agent

This is where the dashboard becomes conversational.

Instead of manually searching through charts, ask the agent what you want to know.

### Try questions like:

```text
Where are we overspending?
```

```text
Which supplier should we negotiate with?
```

```text
Find suspicious or duplicate purchases.
```

```text
How much money could we potentially save?
```

```text
Give me an overview of our procurement spend.
```

The agent uses local procurement tools to retrieve the relevant analysis before answering.

### Under the hood

The agent currently has dedicated tools for:

- `get_spend_overview`
- `compare_suppliers`
- `find_duplicate_purchases`
- `find_spending_anomalies`
- `find_savings_opportunities`

The AI is instructed to stay grounded in the analyzed dataset and avoid inventing suppliers, amounts, invoices, or savings.

---

# 🧠 AI Recommendations

After analysis, the platform sends the structured procurement picture to the AI recommendation layer.

Recommendations focus on practical opportunities such as:

- Duplicate recovery
- Supplier negotiation
- Supplier consolidation
- Recurring purchases
- Category concentration
- Procurement process improvements

Each recommendation can include:

```text
Priority
Description
Estimated savings
```

Estimated savings are treated as **estimates, not guaranteed outcomes**.

---

# ⚡ The AI Stack

The project uses **Groq** as the inference layer with:

```text
qwen/qwen3.8-27b
```

The same model powers the procurement intelligence experience and the conversational procurement agent.

The agent uses tool calling so the model can request the specific procurement analysis needed for a question instead of relying on unsupported guesses.

---

# 📊 Dashboard Experience

The interface is designed as a procurement command center.

```text
┌─────────────────────────────────────────────────────┐
│              PROCUREMENT INTELLIGENCE               │
│                                                     │
│   Total Spend   Orders   Suppliers   Flags          │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│                 SPEND OVER TIME                    │
│                                                     │
│             ╭──────────╮                            │
│        ╭────╯          ╰──────╮                    │
│   ─────╯                       ╰────                │
│                                                     │
├───────────────────────┬─────────────────────────────┤
│    TOP SUPPLIERS       │     SPEND BY CATEGORY      │
│                        │                             │
│    ███████████         │     █████████              │
│    █████████           │     ███████                │
│    ██████              │     █████                  │
│                        │                             │
├────────────────────────┴─────────────────────────────┤
│                                                     │
│             POSSIBLE DUPLICATE PURCHASES            │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│                UNUSUAL SPENDING                    │
│                                                     │
└─────────────────────────────────────────────────────┘
```

The UI includes a cinematic AI-focused visual layer while keeping the actual procurement data interactive and usable.

---

# 🎯 Procurement Intelligence Workflow

### 01 — Upload

Drop in a procurement CSV or use the included sample dataset.

### 02 — Validate

Required procurement fields are checked before analysis.

### 03 — Normalize

Purchase records are converted into a consistent structure.

### 04 — Analyze

Spend is aggregated across suppliers, categories, and months.

### 05 — Detect

Potential duplicates and statistical anomalies are identified.

### 06 — Recommend

The AI generates prioritized procurement opportunities.

### 07 — Investigate

Ask the Procurement Agent natural-language questions.

### 08 — Act

Use the findings to guide procurement review, negotiation, and cost-saving decisions.

---

# 🧩 Architecture

```text
                    NEXT.JS APPLICATION
                           │
          ┌────────────────┴────────────────┐
          │                                 │
          ▼                                 ▼
      FRONTEND                         API ROUTES
          │                                 │
          │                     ┌───────────┴───────────┐
          │                     │                       │
          ▼                     ▼                       ▼
     Dashboard              /analyze                 /agent
          │                     │                       │
          │                     ▼                       ▼
          │              Analysis Engine        Procurement Agent
          │                     │                       │
          │                     └───────────┬───────────┘
          │                                 │
          └─────────────────────────────────┤
                                            ▼
                                      Groq / Qwen
```

---

# 🛠️ Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 14 App Router |
| Language | TypeScript |
| UI | React + Tailwind CSS |
| Charts | Recharts |
| CSV Processing | PapaParse |
| AI Inference | Groq |
| AI Model | Qwen 3.8 27B |
| API | Next.js Route Handlers |
| Deployment Target | Vercel |

---

# 📁 Project Structure

```text
procurement-intelligence-agent/
│
├── app/
│   ├── api/
│   │   ├── agent/
│   │   │   └── route.ts
│   │   └── analyze/
│   │       └── route.ts
│   │
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── AgentChat.tsx
│   ├── Dashboard.tsx
│   ├── InsightsList.tsx
│   └── UploadForm.tsx
│
├── lib/
│   ├── agent.ts
│   ├── analysis.ts
│   └── llm.ts
│
├── public/
│   └── sample_purchases.csv
│
├── sample-data/
│
├── package.json
├── tailwind.config.ts
└── README.md
```

---

# ⚙️ Run Locally

## 1. Clone

```bash
git clone https://github.com/Priyanshu710-ui/procurement-intelligence-agent.git
cd procurement-intelligence-agent
```

## 2. Install

```bash
npm install
```

## 3. Configure Groq

Create `.env.local`:

```env
GROQ_API_KEY=your_groq_api_key
```

Never commit your API key.

## 4. Start

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

---

# 📄 CSV Format

The uploaded CSV should contain these columns:

```text
date, supplier, category, item, quantity, unit_price, amount, invoice_id, po_id
```

Headers are handled case-insensitively.

A sample dataset is available at:

```text
public/sample_purchases.csv
```

---

# 🧪 Quick Demo

Don't have procurement data ready?

Use:

```text
Try it with sample data
```

Then explore:

```text
Spend Overview
      ↓
AI Recommendations
      ↓
Supplier Analysis
      ↓
Duplicate Detection
      ↓
Anomaly Detection
      ↓
Procurement Agent
```

---

# 🔐 Data Handling

Uploaded procurement data is analyzed in memory for the request.

This base version does not require a database and does not persist uploaded records to disk or a database.

That keeps the application lightweight and straightforward to deploy.

---

# ☁️ Deploy to Vercel

The application is designed as a single Next.js application, making it a natural fit for Vercel.

### CLI

```bash
npm install -g vercel
vercel
```

Add the environment variable when prompted or through the Vercel project settings:

```text
GROQ_API_KEY
```

For production:

```bash
vercel --prod
```

### GitHub + Vercel

1. Push the repository to GitHub.
2. Import the repository into Vercel.
3. Add `GROQ_API_KEY` under Environment Variables.
4. Deploy.

No separate backend server or database is required for the base application.

---

# 🔭 What's Next?

The current system is intentionally focused, but the architecture can evolve into a much larger procurement intelligence platform.

Potential upgrades:

- Contract intelligence
- PDF contract analysis
- Supplier risk scoring
- Purchase-order risk prediction
- Procurement forecasting
- Supplier benchmarking
- Negotiation intelligence
- Savings tracking
- Historical upload management
- PostgreSQL-backed procurement history
- ERP integrations
- Automated procurement workflows
- Multi-agent procurement reasoning

The bigger vision:

```text
             DATA
              │
              ▼
        ┌─────────────┐
        │ INTELLIGENCE│
        └──────┬──────┘
               │
      ┌────────┼────────┐
      ▼        ▼        ▼
   DETECT   PREDICT  RECOMMEND
      │        │        │
      └────────┼────────┘
               ▼
            ACTION
```

---

# 🏆 Why It Matters

Most analytics tools answer:

> **What happened?**

This project aims to go one step further:

> **What should we investigate, why does it matter, and where could we save?**

That is the difference between a static dashboard and an intelligence workflow.

---

<div align="center">

# ⚡ PROCUREMENT DATA IN.
# 🧠 INTELLIGENCE OUT.

### Built to find the money hiding in the ledger.

<br />

**AI Procurement Intelligence Agent**

</div>
