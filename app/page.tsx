import Link from "next/link";
import {
  ArrowRight,
  Banknote,
  BarChart3,
  Boxes,
  Building2,
  FileText,
  Landmark,
  ReceiptText,
  ShieldCheck,
  Stethoscope,
  Scale,
  Store,
  Truck,
} from "lucide-react";
import { MarketingFooter, MarketingNav } from "@/components/marketing";

const features = [
  {
    icon: ReceiptText,
    title: "Intelligent Invoicing",
    body: "Create, send, and track invoices across borders with automated multi-currency support.",
  },
  {
    icon: Landmark,
    title: "Global Bank Reconciliation",
    body: "Connect your global accounts and let our AI engine match transactions instantaneously.",
  },
  {
    icon: Banknote,
    title: "Ledger Automation",
    body: "Double-entry accounting runs in the background. Every action posts directly to the general ledger.",
  },
  {
    icon: Boxes,
    title: "Expense Management",
    body: "Capture receipts, categorize spending, and route approvals without leaving the platform.",
  },
  {
    icon: Building2,
    title: "Asset Depreciation",
    body: "Log fixed assets and automatically compute depreciation schedules in real time.",
  },
  {
    icon: BarChart3,
    title: "Real-time Reporting",
    body: "Generate P&L, balance sheets, and cash flow statements with a single click.",
  },
];

const industries = [
  { icon: FileText, name: "Fintech Startups", copy: "API-first ledgers with webhook support" },
  { icon: Store, name: "E-commerce", copy: "High-volume transaction reconciliation" },
  { icon: BarChart3, name: "SaaS Platforms", copy: "Subscription and deferred revenue tracking" },
  { icon: Scale, name: "Agencies", copy: "Multi-currency invoicing and billable hours" },
  { icon: Truck, name: "Logistics", copy: "Fleet assets and per-route cost tracking" },
  { icon: Stethoscope, name: "Healthcare", copy: "Supplies, billing and asset registers" },
];

const faqs = [
  {
    q: "Do I need an accountant to use Espanafonica?",
    a: "No. The ledger work happens behind simple actions — send an invoice, approve a bill, match a bank line. Your accountant can join with their own login when you need them.",
  },
  {
    q: "Can I migrate from another tool?",
    a: "Yes. Import your chart of accounts, contacts, open invoices and bank statements from CSV or Excel, and you can run both systems in parallel while you settle in.",
  },
  {
    q: "Is my data safe?",
    a: "Your books are encrypted in transit and at rest, with role-based access and a full audit log of every change.",
  },
  {
    q: "How does pricing work?",
    a: "One flat annual plan with every module included. No per-seat surprises — see the pricing page for details.",
  },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MarketingNav />

      {/* Hero */}
      <section className="mx-auto w-full max-w-[1200px] px-6 pb-20 pt-20 text-center">
        <span
          className="badge b-neutral"
          style={{ border: "1px solid var(--black-100)", background: "#fff" }}
        >
          <ShieldCheck size={13} color="var(--green-600)" />
          Audit-ready books, every day of the year
        </span>
        <h1
          className="editorial mx-auto mt-6 max-w-[720px] text-[44px] leading-[1.12] sm:text-[56px]"
        >
          Accounting that runs itself.
        </h1>
        <p className="mx-auto mt-5 max-w-[560px] text-[16px] leading-relaxed" style={{ color: "var(--black-400)" }}>
          Espanafonica automates your bookkeeping — invoicing, bank reconciliation,
          inventory and live financial statements — so you spend hours on your
          business, not your books.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link href="/register" className="btn btn-primary btn-lg">
            Get started
          </Link>
          <Link href="/request-demo" className="btn btn-outline btn-lg">
            Schedule a demo
          </Link>
        </div>

        {/* Product glimpse */}
        <div
          className="card mx-auto mt-14 max-w-[880px] overflow-hidden text-left"
          style={{ padding: 0 }}
        >
          <div
            className="flex items-center gap-2 px-5 py-3"
            style={{ borderBottom: "1px solid var(--black-100)", background: "var(--black-50)" }}
          >
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--black-100)" }} />
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--black-100)" }} />
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--black-100)" }} />
            <span className="ml-3 text-[12px]" style={{ color: "var(--black-300)" }}>
              app.espanafonica.com — dashboard
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 p-6 sm:grid-cols-4">
            {[
              ["Cash balance", "€13,213,380"],
              ["Revenue (90d)", "€6,721,180"],
              ["Expenses (90d)", "€2,385,200"],
              ["Receivables", "€2,161,880"],
            ].map(([label, value]) => (
              <div key={label}>
                <div className="text-[11.5px] font-semibold" style={{ color: "var(--black-300)" }}>
                  {label}
                </div>
                <div
                  className="tnum mt-1 text-[19px] font-bold"
                >
                  {value}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-end gap-1.5 px-6 pb-6" aria-hidden>
            {[38, 52, 30, 66, 48, 74, 58, 82, 64, 90, 72, 96].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t"
                style={{
                  height: h,
                  background: i % 2 ? "var(--black-100)" : "var(--ginger-400)",
                }}
              />
            ))}
          </div>
        </div>

        <p className="mt-10 text-[12px] font-semibold uppercase tracking-wide" style={{ color: "var(--black-300)" }}>
          Trusted by teams at
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          {["GlobalPay", "Acme", "NovaTech", "BetaLtd", "FinCorp", "Accrue"].map((brand) => (
            <span
              key={brand}
              className="text-[15px] font-bold tracking-tight"
              style={{ color: "var(--black-300)" }}
            >
              {brand}
            </span>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="w-full" style={{ background: "#fff", borderTop: "1px solid var(--black-100)" }}>
        <div className="mx-auto w-full max-w-[1200px] px-6 py-20">
          <div className="max-w-[520px]">
            <div className="eyebrow">Everything in one ledger</div>
            <h2 className="mt-2 text-[32px] leading-tight">
              All your accounting needs, one calm place
            </h2>
            <p className="mt-3 text-[14.5px]" style={{ color: "var(--black-400)" }}>
              Not a spreadsheet in the cloud. Every module below posts to a single
              double-entry ledger, so your reports are always current.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="card card-hover">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-[10px]"
                  style={{ background: "var(--ginger-50)" }}
                >
                  <f.icon size={20} color="var(--ginger-600)" strokeWidth={1.7} />
                </div>
                <h3 className="mt-4 text-[16.5px]">{f.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed" style={{ color: "var(--black-400)" }}>
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section id="industries" className="mx-auto w-full max-w-[1200px] px-6 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="eyebrow">Built for your industry</div>
            <h2 className="mt-2 text-[32px] leading-tight">Works the way your business works</h2>
          </div>
          <Link href="/request-demo" className="btn btn-ghost">
            Talk to sales <ArrowRight size={16} />
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind) => (
            <div key={ind.name} className="card card-hover flex items-start gap-4" style={{ padding: 20 }}>
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px]"
                style={{ background: "var(--sunshine-100)" }}
              >
                <ind.icon size={18} color="var(--sunshine-700)" strokeWidth={1.7} />
              </div>
              <div>
                <div className="text-[15px] font-bold">
                  {ind.name}
                </div>
                <div className="mt-0.5 text-[12.5px]" style={{ color: "var(--black-400)" }}>
                  {ind.copy}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="w-full" style={{ background: "#fff", borderTop: "1px solid var(--black-100)" }}>
        <div className="mx-auto w-full max-w-[820px] px-6 py-20">
          <h2 className="text-center text-[32px]">Questions, answered</h2>
          <div className="mt-8 flex flex-col gap-3">
            {faqs.map((f) => (
              <details key={f.q} className="card group" style={{ padding: 0 }}>
                <summary className="cursor-pointer list-none px-6 py-4 text-[15px] font-semibold">
                  {f.q}
                </summary>
                <p className="px-6 pb-5 text-[13.5px] leading-relaxed" style={{ color: "var(--black-400)" }}>
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section style={{ background: "var(--ginger-600)" }}>
        <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-6 px-6 py-16 text-center">
          <h2 className="editorial max-w-[560px] text-[34px] leading-tight text-white">
            Close this month&apos;s books before lunch.
          </h2>
          <div className="flex gap-3">
            <Link href="/register" className="btn btn-lg" style={{ background: "#fff", color: "var(--ginger-700)" }}>
              Get started
            </Link>
            <Link
              href="/request-demo"
              className="btn btn-lg"
              style={{ border: "1.5px solid rgba(255,255,255,0.6)", color: "#fff" }}
            >
              Schedule a demo
            </Link>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
