export type InvoiceStatus = "Draft" | "Sent" | "Paid" | "Overdue";
export type TransactionStatus = "Cleared" | "Pending";
export type MatchType = "exact" | "rule" | "suggested";

export const dashboardMetrics = {
  cashBalance: 14213380,
  receivables: 2161880,
  payables: 1185200,
  netProfitMtd: 4821100,
  trends: {
    cashBalance: { value: "+4.2%", positive: true },
    receivables: { value: "-1.1%", positive: false },
    payables: { value: "+12.4%", positive: false },
    netProfitMtd: { value: "+8.9%", positive: true },
  },
};

export const cashFlowMonths = [
  { month: "Jan", inflow: 420000, outflow: 280000 },
  { month: "Feb", inflow: 510000, outflow: 310000 },
  { month: "Mar", inflow: 380000, outflow: 290000 },
  { month: "Apr", inflow: 620000, outflow: 340000 },
  { month: "May", inflow: 480000, outflow: 360000 },
  { month: "Jun", inflow: 710000, outflow: 390000 },
  { month: "Jul", inflow: 560000, outflow: 320000 },
  { month: "Aug", inflow: 640000, outflow: 410000 },
  { month: "Sep", inflow: 590000, outflow: 370000 },
  { month: "Oct", inflow: 780000, outflow: 430000 },
  { month: "Nov", inflow: 690000, outflow: 400000 },
  { month: "Dec", inflow: 820000, outflow: 450000 },
];

export const recentTransactions = [
  { id: "TRX-001", date: "Aug 8, 2026", desc: "Invoice #INV-2041 payment", amount: 420000, status: "Cleared" as TransactionStatus },
  { id: "TRX-002", date: "Aug 7, 2026", desc: "AWS EMEA subscription", amount: -45000, status: "Cleared" as TransactionStatus },
  { id: "TRX-003", date: "Aug 7, 2026", desc: "Office supplies — Leroy Merlin", amount: -12500, status: "Pending" as TransactionStatus },
  { id: "TRX-004", date: "Aug 6, 2026", desc: "Invoice #INV-2040 payment", amount: 1150000, status: "Cleared" as TransactionStatus },
  { id: "TRX-005", date: "Aug 5, 2026", desc: "Payroll run — July", amount: -3400000, status: "Cleared" as TransactionStatus },
];

export const actionItems = [
  {
    id: "bank-unmatched",
    tone: "danger" as const,
    title: "3 bank lines need matching",
    body: "Review your CaixaBank feed to close August books.",
    href: "/dashboard/banking",
    action: "Reconcile",
  },
  {
    id: "invoices-overdue",
    tone: "warning" as const,
    title: "2 invoices overdue",
    body: "Acme Corp and Beta Ltd are past due by 15+ days.",
    href: "/dashboard/invoices",
    action: "Review",
  },
  {
    id: "expenses-pending",
    tone: "neutral" as const,
    title: "4 expenses awaiting approval",
    body: "Team submissions totalling €18,400 need a sign-off.",
    href: "/dashboard/expenses",
    action: "Approve",
  },
];

export const invoices = [
  { id: "INV-2045", client: "Beta Ltd.", date: "Aug 5, 2026", due: "Aug 19, 2026", amount: 850000, status: "Draft" as InvoiceStatus },
  { id: "INV-2044", client: "Acme Corp.", date: "Aug 2, 2026", due: "Aug 16, 2026", amount: 1200000, status: "Sent" as InvoiceStatus },
  { id: "INV-2043", client: "TechFlow SL", date: "Jul 28, 2026", due: "Aug 11, 2026", amount: 450000, status: "Paid" as InvoiceStatus },
  { id: "INV-2042", client: "Oasis Clinics", date: "Jul 25, 2026", due: "Aug 8, 2026", amount: 3100000, status: "Overdue" as InvoiceStatus },
  { id: "INV-2041", client: "Peak Retail", date: "Jul 20, 2026", due: "Aug 3, 2026", amount: 420000, status: "Paid" as InvoiceStatus },
  { id: "INV-2040", client: "Nova Digital", date: "Jul 15, 2026", due: "Jul 29, 2026", amount: 1150000, status: "Paid" as InvoiceStatus },
];

export const expenses = [
  { id: "EXP-892", vendor: "AWS EMEA", category: "Software", date: "Aug 7, 2026", amount: 45000, status: "Approved" },
  { id: "EXP-891", vendor: "Leroy Merlin", category: "Office", date: "Aug 7, 2026", amount: 12500, status: "Pending" },
  { id: "EXP-890", vendor: "Iberia Airlines", category: "Travel", date: "Aug 4, 2026", amount: 89000, status: "Approved" },
  { id: "EXP-889", vendor: "Google Workspace", category: "Software", date: "Aug 1, 2026", amount: 32000, status: "Approved" },
  { id: "EXP-888", vendor: "WeWork Madrid", category: "Rent", date: "Jul 31, 2026", amount: 420000, status: "Approved" },
  { id: "EXP-887", vendor: "Telefónica", category: "Utilities", date: "Jul 30, 2026", amount: 18500, status: "Pending" },
];

export const bankAccount = {
  name: "CaixaBank Business",
  masked: "ES12 **** **** 4521",
  balance: 14213380,
  lastSynced: "2 min ago",
};

export const bankFeeds = [
  {
    id: "BF-101",
    date: "Aug 8, 2026",
    desc: "TRANSFER ACME CORP",
    amount: 1200000,
    type: "in" as const,
    match: { type: "exact" as MatchType, confidence: 98, target: "Invoice #INV-2044" },
  },
  {
    id: "BF-102",
    date: "Aug 7, 2026",
    desc: "AWS EMEA",
    amount: 45000,
    type: "out" as const,
    match: { type: "rule" as MatchType, confidence: 95, target: "Software subscriptions" },
  },
  {
    id: "BF-103",
    date: "Aug 6, 2026",
    desc: "TRANSFER INTERNAL",
    amount: 500000,
    type: "out" as const,
    match: null,
  },
  {
    id: "BF-104",
    date: "Aug 6, 2026",
    desc: "LEROY MERLIN MADRID",
    amount: 12500,
    type: "out" as const,
    match: { type: "suggested" as MatchType, confidence: 72, target: "Office supplies" },
  },
];
