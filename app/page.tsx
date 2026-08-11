import Link from "next/link";
import {
  ArrowRight,
  Banknote,
  CheckCircle2,
  Landmark,
  ReceiptText,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { MarketingFooter, MarketingNav } from "@/components/marketing";
import { formatEuroPlain } from "@/lib/format";
import { dashboardMetrics } from "@/lib/mvp-data";

const features = [
  {
    icon: ReceiptText,
    title: "Invoicing",
    body: "Create and send invoices in euros. Track draft, sent, paid, and overdue in one list.",
    featured: true,
  },
  {
    icon: Banknote,
    title: "Expenses",
    body: "Log bills and receipts, route approvals, and keep spending tied to the ledger.",
    featured: false,
  },
  {
    icon: Landmark,
    title: "Bank reconciliation",
    body: "Import bank feeds and match lines to invoices and expenses automatically.",
    featured: false,
  },
  {
    icon: Wallet,
    title: "Live overview",
    body: "Cash, receivables, payables, and profit — updated as you work, not at month-end.",
    featured: false,
  },
];

const workflow = [
  { step: "01", title: "Send an invoice", copy: "Create in euros, send to your client, and track status from draft to paid." },
  { step: "02", title: "Record expenses", copy: "Capture vendor bills and team spend. Approve what hits the books." },
  { step: "03", title: "Reconcile the bank", copy: "Match statement lines to ledger entries. Close the month with confidence." },
];

const faqs = [
  {
    q: "Do I need an accountant to start?",
    a: "No. Espanafonica handles the ledger behind simple actions. Invite your accountant when you need them.",
  },
  {
    q: "What currency does it use?",
    a: "Euros by default. All amounts, invoices, and reports display in €.",
  },
  {
    q: "Can I migrate existing data?",
    a: "Import contacts, open invoices, and bank statements from CSV. Run both systems in parallel while you settle in.",
  },
  {
    q: "Is my data secure?",
    a: "Encrypted in transit and at rest, with role-based access and a full audit trail.",
  },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MarketingNav />

      <section className="mx-auto w-full max-w-[1160px] px-6 pb-20 pt-16">
        <div className="landing-hero-grid">
          <div>
            <span className="badge b-brand">
              <ShieldCheck size={13} />
              MVP ledger for European teams
            </span>
            <h1 className="editorial mt-6 text-[42px] leading-[1.1] sm:text-[52px]">
              Your books, without the busywork.
            </h1>
            <p className="mt-5 max-w-[480px] text-[16px] leading-relaxed text-[var(--black-400)]">
              Espanafonica is a focused accounting ledger — invoices, expenses, bank
              reconciliation, and a live dashboard. All in euros.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/register" className="btn btn-primary btn-lg">
                Start free
              </Link>
              <Link href="/login" className="btn btn-outline btn-lg">
                Log in
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-6 text-[13px] font-semibold text-[var(--black-400)]">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[var(--green-600)]" /> No setup fee
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[var(--green-600)]" /> EUR by default
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[var(--green-600)]" /> Audit-ready ledger
              </span>
            </div>
          </div>

          <div className="panel panel-flush overflow-hidden">
            <div className="flex items-center gap-2 border-b border-[var(--black-100)] bg-[var(--black-50)] px-4 py-2.5">
              <span className="h-2 w-2 rounded-full bg-[var(--black-200)]" />
              <span className="h-2 w-2 rounded-full bg-[var(--black-200)]" />
              <span className="h-2 w-2 rounded-full bg-[var(--black-200)]" />
              <span className="ml-2 text-[11px] text-[var(--black-400)]">Dashboard preview</span>
            </div>
            <div className="stat-strip">
              {[
                ["Cash", dashboardMetrics.cashBalance],
                ["Receivables", dashboardMetrics.receivables],
                ["Payables", dashboardMetrics.payables],
                ["Profit MTD", dashboardMetrics.netProfitMtd],
              ].map(([label, value]) => (
                <div key={label as string} className="stat-strip-item">
                  <div className="stat-strip-label">{label as string}</div>
                  <div className="stat-strip-value tnum">{formatEuroPlain(value as number)}</div>
                </div>
              ))}
            </div>
            <div className="p-5">
              <div className="mb-3 text-[12px] font-bold text-[var(--black-400)]">Cash flow</div>
              <div className="flex items-end gap-1.5" style={{ height: 100 }}>
                {[42, 58, 36, 72, 48, 84, 62, 90, 68, 96, 74, 100].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t"
                    style={{
                      height: `${h}%`,
                      background: i % 2 ? "var(--black-100)" : "var(--ginger-500)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="border-t border-[var(--black-100)] bg-white">
        <div className="mx-auto w-full max-w-[1160px] px-6 py-20">
          <div className="max-w-[520px]">
            <div className="eyebrow">MVP modules</div>
            <h2 className="mt-2 text-[32px] leading-tight">Everything you need to run the books</h2>
            <p className="mt-3 text-[14px] text-[var(--black-400)]">
              Four core workflows. One ledger. No feature bloat — just what matters for day-to-day accounting.
            </p>
          </div>
          <div className="feature-bento mt-10">
            {features.map((f) => (
              <div
                key={f.title}
                className={`card card-hover ${f.featured ? "feature-bento-featured" : ""}`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[var(--ginger-50)]">
                  <f.icon size={20} color="var(--ginger-600)" strokeWidth={1.7} />
                </div>
                <h3 className="mt-4 text-[16px] font-bold">{f.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--black-400)]">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="workflow" className="mx-auto w-full max-w-[1160px] px-6 py-20">
        <div className="eyebrow">How it works</div>
        <h2 className="mt-2 text-[32px] leading-tight">Three steps to closed books</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {workflow.map((item) => (
            <div key={item.step} className="panel">
              <div className="panel-body">
                <div className="text-[32px] font-bold leading-none text-[var(--ginger-200)]">{item.step}</div>
                <h3 className="mt-4 text-[16px] font-bold">{item.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[var(--black-400)]">{item.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="border-t border-[var(--black-100)] bg-white">
        <div className="mx-auto w-full max-w-[760px] px-6 py-20">
          <h2 className="text-center text-[32px]">Questions</h2>
          <div className="mt-8 flex flex-col gap-3">
            {faqs.map((f) => (
              <details key={f.q} className="panel group">
                <summary className="cursor-pointer list-none px-5 py-4 text-[15px] font-semibold">
                  {f.q}
                </summary>
                <p className="px-5 pb-5 text-[13px] leading-relaxed text-[var(--black-400)]">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--ginger-600)]">
        <div className="mx-auto flex w-full max-w-[1160px] flex-col items-center gap-6 px-6 py-16 text-center">
          <h2 className="editorial max-w-[520px] text-[34px] leading-tight text-white">
            Close this month before lunch.
          </h2>
          <Link href="/register" className="btn btn-lg" style={{ background: "#fff", color: "var(--ginger-700)" }}>
            Get started <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
