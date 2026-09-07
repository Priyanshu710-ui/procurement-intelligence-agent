# ⚡ AI Procurement Intelligence Agent

<div align="center">

# 🧠 PROCUREMENT INTELLIGENCE
### Turn messy procurement data into intelligent decisions.

**Upload → Analyze → Detect → Investigate → Save**

An AI-powered procurement intelligence platform that transforms purchase history into actionable insights using data analytics and an intelligent procurement agent.

<br />

[![Live Demo](https://img.shields.io/badge/🚀_LIVE_DEMO-Open_App-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://procurement-intelligence-agent-jack-5127.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/Priyanshu710-ui/procurement-intelligence-agent)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Groq](https://img.shields.io/badge/AI-Groq%20%2B%20Qwen-orange?style=for-the-badge)](https://groq.com/)

<br />

**Built by Priyanshu**

</div>

---

## 🚀 LIVE DEMO

<div align="center">

### **[⚡ OPEN PROCUREMENT INTELLIGENCE AGENT](https://procurement-intelligence-agent-jack-5127.vercel.app)**

**Launch the live app → upload procurement data → uncover hidden savings.**

</div>

> **Note:** The live application requires a valid AI environment configuration on the deployed backend. Never expose your `GROQ_API_KEY` in the browser or repository.

---

# 🌌 The Mission

Procurement teams deal with enormous amounts of purchasing data.

Thousands of:

- Purchase Orders
- Invoices
- Suppliers
- Products
- Categories
- Transactions
- Pricing records

Hidden inside that data are expensive mistakes and missed opportunities.

**Duplicate purchases. Supplier concentration. Unusual spending. Missed savings.**

The problem?

Finding them manually is slow.

### This project turns that process into an intelligent investigation.

```text
                    PROCUREMENT DATA
                           │
                           ▼
                  ┌─────────────────┐
                  │   CSV UPLOAD    │
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │ DATA ANALYSIS   │
                  └────────┬────────┘
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
         SUPPLIERS     DUPLICATES    ANOMALIES
              │            │            │
              └────────────┼────────────┘
                           ▼
                  ┌─────────────────┐
                  │ AI INTELLIGENCE │
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │ RECOMMENDATIONS │
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │ PROCUREMENT AI  │
                  │     AGENT       │
                  └─────────────────┘
```

> **Raw procurement data → intelligence → action**

---

# 🔥 Core Capabilities

## 💰 Spend Intelligence

Understand exactly where procurement money is going.

The platform analyzes:

- Total procurement spend
- Purchase order volume
- Supplier spending
- Category spending
- Monthly spending trends
- Supplier concentration

Instead of staring at spreadsheets, you get an immediate financial overview.

---

## 🕵️ Duplicate Purchase Detection

One of the most expensive problems in procurement is paying for the same thing multiple times.

The system searches for repeated combinations of:

```text
Supplier + Item + Amount
```

Potential duplicate purchases are surfaced automatically.

### Example

```text
Supplier: Global Office Supplies
Item:     A4 Paper Cartons
Amount:   $1,400
Occurrences: 3
```

The agent can then investigate the potential recovery opportunity.

---

## 🚨 Unusual Spending Detection

Not every large purchase is wrong. But some purchases deserve attention.

The system analyzes spending patterns and identifies purchases that statistically stand out within their category.

This helps procurement teams investigate:

- Unexpectedly expensive purchases
- Pricing outliers
- Unusual category spending
- Potential procurement mistakes

> The goal isn't to blindly label purchases as fraud. The goal is to **find the transactions worth investigating.**

---

## 🏢 Supplier Intelligence

Supplier relationships can hide major strategic opportunities.

The dashboard analyzes supplier-level spending and reveals:

- Highest-spend suppliers
- Supplier concentration
- Order counts
- Average order values
- Relative supplier importance

This helps answer:

> Who has the most negotiating leverage?

> Where are we overly dependent on one supplier?

> Which supplier relationships deserve attention first?

---

# 🤖 AI Procurement Agent

This is where the project gets interesting.

Instead of manually exploring charts, ask the system questions in natural language.

```text
Where are we overspending?

Which supplier should we negotiate with?

Find suspicious or duplicate purchases.

How much money could we potentially save?

Which supplier has the highest concentration?

What are the biggest procurement risks?
```

The agent analyzes the uploaded procurement intelligence and responds conversationally.

**No spreadsheet archaeology required.**

---

# ⚡ AI-Powered Recommendations

After analysis, the system generates actionable recommendations based on the procurement dataset.

Each recommendation can include:

- Priority
- Explanation
- Estimated savings
- Procurement opportunity

The key question is:

> **"So what should we do about it?"**

---

# 🎯 Intelligence Pipeline

| Stage | What happens |
|---|---|
| **01 — Upload** | Upload procurement transaction data as CSV. |
| **02 — Validate** | Required procurement fields are checked. |
| **03 — Normalize** | Raw transaction records are cleaned and normalized. |
| **04 — Analyze** | Spend, suppliers, categories, trends and purchase patterns are calculated. |
| **05 — Detect** | Potential duplicates and unusual transactions are identified. |
| **06 — Generate Intelligence** | AI analyzes the resulting procurement picture. |
| **07 — Recommend** | Potential savings and strategic actions are surfaced. |
| **08 — Ask** | The Procurement Agent lets users investigate conversationally. |

---

# 📊 Procurement Command Center

The interface combines an executive dashboard with AI investigation tools.

### Executive Overview

```text
┌─────────────────────────────────────────────┐
│              SPEND AT A GLANCE              │
├────────────┬────────────┬──────────┬────────┤
│ Total      │ Orders     │ Suppliers│ Flags  │
│ Spend      │            │          │        │
├────────────┴────────────┴──────────┴────────┤
│                                             │
│              SPEND OVER TIME                │
│                                             │
│        ╭──────╮                             │
│   ╭────╯      ╰──────╮                      │
│───╯                   ╰────                 │
│                                             │
├──────────────────────┬──────────────────────┤
│   TOP SUPPLIERS       │   CATEGORIES         │
│   ███████████         │   █████████           │
│   █████████           │   ███████             │
│   ██████              │   █████               │
└──────────────────────┴──────────────────────┘
```

The dashboard also surfaces detailed duplicate and anomaly investigations.

---

# 🧩 Technology Stack

### Frontend

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Recharts**

### AI

- **Groq**
- **Qwen 3.8 27B**

### Data Intelligence

- CSV parsing
- Data normalization
- Supplier aggregation
- Category analysis
- Monthly trend analysis
- Duplicate detection
- Statistical anomaly detection

### Architecture

```text
Next.js
   │
   ├── UI
   ├── Dashboard
   ├── AI Recommendations
   └── Procurement Agent
          │
          ▼
       API Routes
          │
          ▼
    Analysis Engine
          │
          ▼
       Groq / Qwen
```

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
│   ├── globals.css
│   ├── page.tsx
│   └── ...
│
├── components/
│   ├── AgentChat.tsx
│   ├── Dashboard.tsx
│   ├── InsightsList.tsx
│   ├── UploadForm.tsx
│   └── ...
│
├── lib/
│   ├── agent.ts
│   ├── analysis.ts
│   ├── llm.ts
│   └── ...
│
├── sample-data/
├── public/
├── package.json
└── README.md
```

---

# ⚙️ Run Locally

### 1. Clone

```bash
git clone https://github.com/Priyanshu710-ui/procurement-intelligence-agent.git
cd procurement-intelligence-agent
```

### 2. Install

```bash
npm install
```

### 3. Configure AI

Create `.env.local`:

```env
GROQ_API_KEY=your_groq_api_key
```

> Never commit `.env.local` to GitHub.

### 4. Start

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# 🧪 Try It

Use the included sample procurement dataset to explore the platform immediately.

```text
Launch
  ↓
Try sample data
  ↓
Analysis
  ↓
Recommendations
  ↓
Dashboard
  ↓
Ask the Procurement Agent
```

Try asking:

```text
Where are we overspending?
How much money could we potentially recover from duplicates?
Which supplier should we negotiate with?
```

---

# 🧠 Example Intelligence

For the included sample dataset, the system can surface:

| Metric | Result |
|---|---:|
| **Total Spend** | **$162,830** |
| **Purchase Orders** | **30** |
| **Suppliers** | **6** |
| **Potential Duplicate Flags** | **10** |
| **Top Supplier** | **ACME IT Solutions** |

### Potential duplicate recovery

**$34,200** in potential recovery opportunities are surfaced from the sample duplicate patterns.

---

# 💡 Why This Project?

Traditional procurement analysis often looks like:

```text
CSV
 ↓
Excel
 ↓
Filters
 ↓
Pivot Tables
 ↓
More Excel
 ↓
Someone asks for another report
 ↓
More Excel
```

This project asks:

> **What if procurement data could investigate itself?**

Instead of only displaying numbers, the platform combines:

**Analytics + Detection + AI + Conversation**

into one workflow.

---

# 🛡️ Data Handling

Procurement data is analyzed in-memory per request.

The application is designed around temporary analysis rather than persistent storage of uploaded procurement records.

---

# 🌌 The Vision

This project is more than a dashboard.

It is a prototype for an intelligent procurement analyst.

Imagine a procurement team asking:

```text
"Why did our spending increase this quarter?"
```

and getting an intelligent explanation grounded in analyzed procurement data.

Then asking:

```text
"How much could we save?"
```

and continuing the investigation conversationally.

> **From dashboards that show what happened to AI systems that help decide what to do next.**

---

# 🚀 Future Possibilities

- Real-time procurement monitoring
- Supplier negotiation intelligence
- Contract intelligence
- Purchase-order risk scoring
- Automated savings tracking
- Procurement forecasting
- ERP integration
- Database-backed analytics
- Approval workflow intelligence
- Continuous spend monitoring
- Multi-agent procurement workflows

---

# 🏆 Project Highlights

| Capability | What it delivers |
|---|---|
| ⚡ **Automated** | No manual spreadsheet investigation required. |
| 🧠 **Intelligent** | AI turns analytical results into understandable recommendations. |
| 🔎 **Investigative** | Potential duplicate and unusual spending patterns are surfaced automatically. |
| 💬 **Conversational** | Ask procurement questions in natural language. |
| 📊 **Visual** | Complex procurement data becomes an interactive dashboard. |
| 🎯 **Action-Oriented** | Identifies where action could create value. |

---

# 👨‍💻 Built By

## Priyanshu

**AI / Data / Full-Stack Developer**

Building intelligent systems where:

```text
        DATA
          +
          AI
          +
     ENGINEERING
          │
          ▼
  REAL-WORLD INTELLIGENCE
```

---

<div align="center">

# ⚡ PROCUREMENT DATA IN.
# 💰 INTELLIGENCE OUT.

### Built by Priyanshu to find the money hiding in the ledger.

<br />

### 🚀 [LIVE DEMO](https://procurement-intelligence-agent-jack-5127.vercel.app) · ⭐ [STAR THE REPO](https://github.com/Priyanshu710-ui/procurement-intelligence-agent)

</div>
