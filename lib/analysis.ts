// Core procurement analysis logic. Pure functions, no I/O, so they're easy
// to unit test and easy to port to a Python/Pandas service later if you
// outgrow doing this in the Next.js API route.

export interface PurchaseRecord {
  date: string;
  supplier: string;
  category: string;
  item: string;
  quantity: number;
  unit_price: number;
  amount: number;
  invoice_id: string;
  po_id: string;
}

export interface SupplierSpend {
  supplier: string;
  totalSpend: number;
  orderCount: number;
  avgOrderValue: number;
}

export interface CategorySpend {
  category: string;
  totalSpend: number;
  share: number;
}

export interface MonthlySpend {
  month: string;
  totalSpend: number;
}

export interface DuplicateFlag {
  supplier: string;
  item: string;
  amount: number;
  occurrences: { date: string; invoice_id: string; po_id: string }[];
}

export interface AnomalyFlag {
  record: PurchaseRecord;
  zScore: number;
  categoryAvg: number;
  reason: string;
}

export interface AnalysisResult {
  totalSpend: number;
  orderCount: number;
  supplierCount: number;
  supplierSpend: SupplierSpend[];
  categorySpend: CategorySpend[];
  monthlySpend: MonthlySpend[];
  duplicates: DuplicateFlag[];
  anomalies: AnomalyFlag[];
  topSuppliersByShare: { supplier: string; share: number }[];
}

const REQUIRED_FIELDS = [
  "date",
  "supplier",
  "category",
  "item",
  "quantity",
  "unit_price",
  "amount",
  "invoice_id",
  "po_id",
];

export function validateHeaders(headers: string[]): {
  valid: boolean;
  missing: string[];
} {
  const lower = headers.map((h) => h.trim().toLowerCase());
  const missing = REQUIRED_FIELDS.filter((f) => !lower.includes(f));
  return { valid: missing.length === 0, missing };
}

export function normalizeRows(rows: Record<string, string>[]): PurchaseRecord[] {
  return rows
    .filter((r) => r.supplier && r.amount)
    .map((r) => ({
      date: (r.date || "").trim(),
      supplier: (r.supplier || "Unknown").trim(),
      category: (r.category || "Uncategorized").trim(),
      item: (r.item || "Unspecified item").trim(),
      quantity: Number(r.quantity) || 0,
      unit_price: Number(r.unit_price) || 0,
      amount: Number(r.amount) || 0,
      invoice_id: (r.invoice_id || "").trim(),
      po_id: (r.po_id || "").trim(),
    }))
    .filter((r) => Number.isFinite(r.amount) && r.amount > 0);
}

function monthKey(dateStr: string): string {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "Unknown";
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

export function analyzeSpend(records: PurchaseRecord[]): AnalysisResult {
  const totalSpend = records.reduce((s, r) => s + r.amount, 0);
  const orderCount = records.length;

  // --- Spend by supplier ---
  const supplierMap = new Map<string, { total: number; count: number }>();
  for (const r of records) {
    const cur = supplierMap.get(r.supplier) || { total: 0, count: 0 };
    cur.total += r.amount;
    cur.count += 1;
    supplierMap.set(r.supplier, cur);
  }
  const supplierSpend: SupplierSpend[] = Array.from(supplierMap.entries())
    .map(([supplier, v]) => ({
      supplier,
      totalSpend: round2(v.total),
      orderCount: v.count,
      avgOrderValue: round2(v.total / v.count),
    }))
    .sort((a, b) => b.totalSpend - a.totalSpend);

  const supplierCount = supplierSpend.length;
  const topSuppliersByShare = supplierSpend.slice(0, 8).map((s) => ({
    supplier: s.supplier,
    share: totalSpend ? round2((s.totalSpend / totalSpend) * 100) : 0,
  }));

  // --- Spend by category ---
  const categoryMap = new Map<string, number>();
  for (const r of records) {
    categoryMap.set(r.category, (categoryMap.get(r.category) || 0) + r.amount);
  }
  const categorySpend: CategorySpend[] = Array.from(categoryMap.entries())
    .map(([category, total]) => ({
      category,
      totalSpend: round2(total),
      share: totalSpend ? round2((total / totalSpend) * 100) : 0,
    }))
    .sort((a, b) => b.totalSpend - a.totalSpend);

  // --- Monthly trend ---
  const monthMap = new Map<string, number>();
  for (const r of records) {
    const key = monthKey(r.date);
    monthMap.set(key, (monthMap.get(key) || 0) + r.amount);
  }
  const monthlySpend: MonthlySpend[] = Array.from(monthMap.entries())
    .map(([month, total]) => ({ month, totalSpend: round2(total) }))
    .sort((a, b) => a.month.localeCompare(b.month));

  // --- Duplicate purchase detection ---
  // Groups by supplier + item + amount. If the same combination appears more
  // than once (different invoices/POs), it's flagged as a likely duplicate.
  const dupMap = new Map<string, DuplicateFlag>();
  for (const r of records) {
    const key = `${r.supplier}::${r.item}::${r.amount}`;
    const existing = dupMap.get(key);
    if (existing) {
      existing.occurrences.push({
        date: r.date,
        invoice_id: r.invoice_id,
        po_id: r.po_id,
      });
    } else {
      dupMap.set(key, {
        supplier: r.supplier,
        item: r.item,
        amount: r.amount,
        occurrences: [{ date: r.date, invoice_id: r.invoice_id, po_id: r.po_id }],
      });
    }
  }
  const duplicates = Array.from(dupMap.values())
    .filter((d) => d.occurrences.length > 1)
    .sort((a, b) => b.occurrences.length - a.occurrences.length);

  // --- Anomaly detection (z-score within each category) ---
  const anomalies: AnomalyFlag[] = [];
  const byCategory = new Map<string, PurchaseRecord[]>();
  for (const r of records) {
    const arr = byCategory.get(r.category) || [];
    arr.push(r);
    byCategory.set(r.category, arr);
  }
  for (const [, recs] of byCategory) {
    if (recs.length < 3) continue; // not enough data to judge an outlier
    const amounts = recs.map((r) => r.amount);
    const mean = amounts.reduce((s, a) => s + a, 0) / amounts.length;
    const variance =
      amounts.reduce((s, a) => s + (a - mean) ** 2, 0) / amounts.length;
    const std = Math.sqrt(variance);
    if (std === 0) continue;
    for (const r of recs) {
      const z = (r.amount - mean) / std;
      if (z >= 2.5) {
        anomalies.push({
          record: r,
          zScore: round2(z),
          categoryAvg: round2(mean),
          reason: `${r.amount.toLocaleString()} is ${round2(
            z
          )} standard deviations above the average for "${r.category}" (avg ${round2(
            mean
          ).toLocaleString()})`,
        });
      }
    }
  }
  anomalies.sort((a, b) => b.zScore - a.zScore);

  return {
    totalSpend: round2(totalSpend),
    orderCount,
    supplierCount,
    supplierSpend,
    categorySpend,
    monthlySpend,
    duplicates,
    anomalies,
    topSuppliersByShare,
  };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
