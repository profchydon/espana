import Link from "next/link";
import { Plus, Filter, Download, Search, MoreHorizontal } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { InvoiceStatusBadge } from "@/components/dashboard/status-badge";
import { formatEuroPlain } from "@/lib/format";
import { invoices } from "@/lib/mvp-data";

export default function InvoicesPage() {
  const outstanding = invoices
    .filter((inv) => inv.status === "Sent" || inv.status === "Overdue")
    .reduce((sum, inv) => sum + inv.amount, 0);
  const overdue = invoices.filter((inv) => inv.status === "Overdue").length;
  const paidMtd = invoices.filter((inv) => inv.status === "Paid").reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div>
      <PageHeader
        title="Invoices"
        description="Create, send, and track customer invoices in euros."
        actions={
          <button type="button" className="btn btn-primary btn-sm">
            <Plus size={14} /> New invoice
          </button>
        }
      />

      <div className="panel panel-flush mb-6">
        <div className="stat-strip">
          <div className="stat-strip-item">
            <div className="stat-strip-label">Outstanding</div>
            <div className="stat-strip-value tnum">{formatEuroPlain(outstanding)}</div>
          </div>
          <div className="stat-strip-item">
            <div className="stat-strip-label">Overdue</div>
            <div className="stat-strip-value tnum">{overdue}</div>
          </div>
          <div className="stat-strip-item">
            <div className="stat-strip-label">Collected (MTD)</div>
            <div className="stat-strip-value tnum">{formatEuroPlain(paidMtd)}</div>
          </div>
          <div className="stat-strip-item">
            <div className="stat-strip-label">Total invoices</div>
            <div className="stat-strip-value tnum">{invoices.length}</div>
          </div>
        </div>
      </div>

      <div className="panel mb-6 !p-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-full max-w-[320px] items-center gap-2 rounded-lg border border-[var(--black-100)] bg-[var(--bg-page)] px-3 py-2">
            <Search size={15} className="text-[var(--black-300)]" />
            <input
              type="text"
              placeholder="Search client or invoice ID…"
              className="w-full bg-transparent text-[13px] outline-none placeholder:text-[var(--black-300)]"
            />
          </div>
          <div className="flex gap-2">
            <button type="button" className="btn btn-outline btn-sm">
              <Filter size={14} /> Filter
            </button>
            <button type="button" className="btn btn-outline btn-sm">
              <Download size={14} /> Export
            </button>
          </div>
        </div>
      </div>

      <div className="panel panel-flush">
        <div className="overflow-x-auto">
          <table className="table-ds w-full">
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Client</th>
                <th>Issued</th>
                <th>Due</th>
                <th>Status</th>
                <th className="text-right">Amount</th>
                <th className="w-10" />
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id}>
                  <td className="tnum font-semibold text-[var(--black-900)]">
                    <Link href="#" className="hover:text-[var(--ginger-600)] transition-colors">
                      {inv.id}
                    </Link>
                  </td>
                  <td>{inv.client}</td>
                  <td className="tnum text-[var(--black-400)]">{inv.date}</td>
                  <td className="tnum text-[var(--black-400)]">{inv.due}</td>
                  <td>
                    <InvoiceStatusBadge status={inv.status} />
                  </td>
                  <td className="text-right tnum font-semibold">{formatEuroPlain(inv.amount)}</td>
                  <td>
                    <button type="button" className="text-[var(--black-300)] hover:text-[var(--black-900)]">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-[var(--black-100)] px-5 py-3.5 text-[13px] text-[var(--black-400)]">
          <span>Showing {invoices.length} invoices</span>
          <div className="flex gap-1">
            <button type="button" className="rounded-md border border-[var(--black-100)] px-3 py-1.5 opacity-50" disabled>
              Previous
            </button>
            <button type="button" className="rounded-md border border-[var(--black-100)] px-3 py-1.5 hover:bg-[var(--black-50)]">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
