# ⚡ Procurement Intelligence Agent

<div align="center">

# 🧠 PROCUREMENT INTELLIGENCE AGENT

### **Turn procurement data into decisions, savings, and action.**

Upload procurement data → analyze spending → detect risk → uncover savings → investigate with AI.

<p>
  <a href="https://procurement-intelligence-agent-69zp.vercel.app/"><strong>🚀 Live Demo</strong></a>
  ·
  <a href="https://github.com/Priyanshu710-ui/procurement-intelligence-agent"><strong>⭐ GitHub</strong></a>
</p>

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Groq](https://img.shields.io/badge/Groq-AI-orange?style=for-the-badge)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel)

**Built by Priyanshu**

</div>

---

## 🚀 Live Demo

<div align="center">

### [⚡ OPEN THE PROCUREMENT INTELLIGENCE AGENT](https://procurement-intelligence-agent-69zp.vercel.app/)

**Live on Vercel** · Upload a CSV and start investigating procurement spend.

</div>

---

## 🎯 What is this?

Procurement teams sit on top of huge amounts of transactional data, but finding the important signals often means spreadsheets, filters, pivot tables, and repeated manual investigation.

**Procurement Intelligence Agent turns that workflow into an interactive intelligence system.**

The application transforms raw purchasing records into:

- 💰 **Spend intelligence**
- 🏢 **Supplier intelligence**
- 🕵️ **Duplicate-purchase signals**
- 🚨 **Unusual-spending / anomaly signals**
- 💡 **Savings opportunities**
- 🤖 **Conversational AI investigation**

> **The goal is simple: move from “What happened?” to “What should we investigate or do next?”**

---

## ✨ Core Capabilities

### 📥 1. Upload Procurement Data

Bring in procurement history through CSV and turn a flat file into an analysis-ready dataset.

### 📊 2. Spend Intelligence

Understand where money is going across suppliers, categories, purchase orders, and time.

Key views include:

- Total spend
- Purchase-order volume
- Supplier spend
- Category spend
- Monthly spend trends
- Average order value
- Supplier concentration

### 🕵️ 3. Duplicate Purchase Detection

Identify repeated purchasing patterns using transaction attributes such as supplier, item, and amount.

These signals help teams investigate potential duplicate payments or repeated purchases.

### 🚨 4. Anomaly Investigation

Surface transactions that stand out within the analyzed dataset so procurement teams can focus attention on unusually large or otherwise suspicious activity.

> **A signal is not a verdict. It is a starting point for investigation.**

### 🏢 5. Supplier Intelligence

Compare supplier relationships and identify where negotiation attention, consolidation, or deeper review may be valuable.

### 💡 6. AI Recommendations

Turn analytical findings into prioritised procurement opportunities, explanations, and potential savings areas.

### 🤖 7. Procurement AI Agent

Ask natural-language questions about the analyzed data:

```text
Where are we overspending?

Which suppliers should we negotiate with?

Show me potential duplicate purchases.

How much could we potentially recover?

Which category has the biggest opportunity?

What procurement risks should I investigate first?
```

The dashboard gives the overview. **The agent lets you investigate it.**

---

## 🧠 How It Works

```text
┌──────────────────────┐
│  PROCUREMENT CSV     │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Validate + Normalize │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  Analysis Engine     │
├──────────────────────┤
│ Spend                │
│ Suppliers            │
│ Categories           │
│ Trends               │
│ Duplicates           │
│ Anomalies            │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ AI Intelligence      │
│ Recommendations      │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Procurement AI Agent │
└──────────────────────┘
```

### **UPLOAD → ANALYZE → DETECT → EXPLAIN → INVESTIGATE → ACT**

---

## 🧩 Technical Architecture

```text
                         USER
                           │
                           ▼
                    ┌─────────────┐
                    │  Next.js UI │
                    └──────┬──────┘
                           │
                  ┌────────┴────────┐
                  ▼                 ▼
          ┌──────────────┐   ┌──────────────┐
          │ /api/analyze │   │  /api/agent  │
          └──────┬───────┘   └──────┬───────┘
                 │                  │
                 └────────┬─────────┘
                          ▼
                 ┌─────────────────┐
                 │ Analysis / AI   │
                 │ Intelligence    │
                 └────────┬────────┘
                          ▼
                 ┌─────────────────┐
                 │ Groq + Qwen     │
                 └─────────────────┘
```

### Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js, React, TypeScript |
| Styling | Tailwind CSS |
| Charts | Recharts |
| AI | Groq + Qwen 3.8 27B |
| Data Processing | CSV parsing, normalization, aggregation, detection |
| Deployment | Vercel |

---

## 📈 Intelligence Pipeline

| Stage | What happens |
|---|---|
| **01** | 📥 Upload procurement CSV |
| **02** | ✅ Validate required data |
| **03** | 🧹 Normalize transaction records |
| **04** | 📊 Calculate spend and supplier metrics |
| **05** | 🔎 Detect duplicate and unusual transactions |
| **06** | 🧠 Generate AI-backed intelligence |
| **07** | 💡 Prioritize recommendations |
| **08** | 💬 Investigate with the Procurement Agent |

---

## 🔥 Example Dataset Intelligence

The included sample dataset demonstrates the type of signals the application can surface:

| Metric | Example |
|---|---:|
| 💰 Total Spend | **$162,830** |
| 🧾 Purchase Orders | **30** |
| 🏢 Suppliers | **6** |
| 🚩 Potential Duplicate Flags | **10** |
| 🏆 Top Supplier | **ACME IT Solutions** |
| 💸 Potential Duplicate Recovery | **$34,200** |

### Example signals

```text
Global Office Supplies  → A4 Paper Cartons
Global Office Supplies  → Toner Cartridges
ACME IT Solutions       → Wireless Mouse
Metro Facilities Co     → HVAC Maintenance
BrightPath Marketing    → Trade Show Booth
Northstar Logistics     → Freight - West Region
```

These figures are **example results from the included sample dataset**, not universal benchmarks.

---

## 🖥️ Product Experience

The interface is designed around a simple investigation loop:

```text
┌──────────────────────────────────────────────┐
│              PROCUREMENT OVERVIEW            │
├────────────┬────────────┬──────────┬─────────┤
│ TOTAL      │ ORDERS     │ SUPPLIERS│ FLAGS   │
│ SPEND      │            │          │         │
├────────────┴────────────┴──────────┴─────────┤
│                                              │
│               SPEND OVER TIME               │
│                                              │
├──────────────────────┬───────────────────────┤
│   TOP SUPPLIERS       │   CATEGORIES         │
│   ███████████         │   █████████           │
│   █████████           │   ███████             │
│   ██████              │   █████               │
└──────────────────────┴───────────────────────┘
```

The experience moves from **overview → evidence → recommendation → conversation**.

---

## 📁 Project Structure

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

## ⚙️ Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/Priyanshu710-ui/procurement-intelligence-agent.git
cd procurement-intelligence-agent
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add your environment variable

Create `.env.local`:

```env
GROQ_API_KEY=your_groq_api_key
```

### 4. Start the development server

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

> 🔐 **Never commit `.env.local` or expose your API key in client-side code.**

---

## 🧪 Quick Demo Flow

```text
🚀 Open the Live Demo
        ↓
📄 Load sample procurement data
        ↓
🧠 Run analysis
        ↓
📊 Explore spend + supplier insights
        ↓
🚩 Review duplicate / anomaly signals
        ↓
💡 Read recommendations
        ↓
🤖 Ask the Procurement Agent
```

Try asking:

```text
Where are we overspending?
```

```text
Which supplier should we negotiate with first?
```

```text
How much potential duplicate recovery did we identify?
```

---

## 🛡️ Data & Security Notes

The application is designed around temporary analysis of uploaded procurement data rather than persistent storage of the uploaded records.

For local development and deployment:

- Keep `GROQ_API_KEY` server-side.
- Do not commit secrets.
- Treat detected anomalies and duplicate matches as **investigation signals**, not final accounting conclusions.
- Validate results against source systems before taking financial action.

---

## 🌱 What Could Come Next?

The current architecture leaves room for a much larger procurement intelligence platform:

- Real-time spend monitoring
- Supplier negotiation intelligence
- Contract and invoice intelligence
- Purchase-order risk scoring
- Savings tracking over time
- Procurement forecasting
- ERP / accounting integrations
- Persistent database-backed analytics
- Approval and workflow automation
- Multi-agent procurement workflows

The direction is clear:

> **From dashboards that describe procurement to AI systems that help procurement teams decide what to do next.**

---

## 🏆 Why This Project Matters

| Capability | Why it matters |
|---|---|
| ⚡ Automated analysis | Reduces repetitive spreadsheet investigation |
| 🧠 AI reasoning layer | Makes complex findings easier to interrogate |
| 🔎 Investigative workflow | Focuses attention on unusual or high-value signals |
| 💬 Conversational UX | Lets users ask questions without rebuilding reports |
| 📊 Visual analytics | Makes spend patterns easier to understand |
| 💰 Savings-oriented | Connects findings to potential financial opportunities |
| 🚀 Deployed product | Available as a live web application |

---

## 👨‍💻 Built By

### Priyanshu

**AI / Data / Full-Stack Developer**

Building practical systems at the intersection of:

```text
DATA
  +
AI
  +
ENGINEERING
  ↓
REAL-WORLD INTELLIGENCE
```

---

<div align="center">

# ⚡ PROCUREMENT DATA IN.
# 💰 INTELLIGENCE OUT.

### **Built by Priyanshu to find the signals hiding in the ledger.**

[🚀 OPEN LIVE DEMO](https://procurement-intelligence-agent-69zp.vercel.app/)

⭐ **Star the repository if you like the project.**

</div>
