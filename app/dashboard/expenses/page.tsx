import { Plus, Filter, Search, MoreHorizontal } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { ExpenseStatusBadge } from "@/components/dashboard/status-badge";
import { formatEuroPlain } from "@/lib/format";
import { expenses } from "@/lib/mvp-data";

export default function ExpensesPage() {
  const pending = expenses.filter((e) => e.status === "Pending");
  const pendingTotal = pending.reduce((sum, e) => sum + e.amount, 0);
  const approvedMtd = expenses.filter((e) => e.status === "Approved").reduce((sum, e) => sum + e.amount, 0);

  return (
    <div>
      <PageHeader
        title="Expenses"
        description="Track bills, receipts, and team spending — all in euros."
        actions={
          <button type="button" className="btn btn-primary btn-sm">
            <Plus size={14} /> Record expense
          </button>
        }
      />

      <div className="panel panel-flush mb-6">
        <div className="stat-strip">
          <div className="stat-strip-item">
            <div className="stat-strip-label">Pending approval</div>
            <div className="stat-strip-value tnum">{formatEuroPlain(pendingTotal)}</div>
          </div>
          <div className="stat-strip-item">
            <div className="stat-strip-label">Awaiting review</div>
            <div className="stat-strip-value tnum">{pending.length}</div>
          </div>
          <div className="stat-strip-item">
            <div className="stat-strip-label">Approved (MTD)</div>
            <div className="stat-strip-value tnum">{formatEuroPlain(approvedMtd)}</div>
          </div>
          <div className="stat-strip-item">
            <div className="stat-strip-label">Total entries</div>
            <div className="stat-strip-value tnum">{expenses.length}</div>
          </div>
        </div>
      </div>

      <div className="panel mb-6 !p-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-full max-w-[320px] items-center gap-2 rounded-lg border border-[var(--black-100)] bg-[var(--bg-page)] px-3 py-2">
            <Search size={15} className="text-[var(--black-300)]" />
            <input
              type="text"
              placeholder="Search vendor or category…"
              className="w-full bg-transparent text-[13px] outline-none placeholder:text-[var(--black-300)]"
            />
          </div>
          <button type="button" className="btn btn-outline btn-sm">
            <Filter size={14} /> Filter
          </button>
        </div>
      </div>

      <div className="panel panel-flush">
        <div className="overflow-x-auto">
          <table className="table-ds w-full">
            <thead>
              <tr>
                <th>Expense</th>
                <th>Vendor</th>
                <th>Category</th>
                <th>Date</th>
                <th>Status</th>
                <th className="text-right">Amount</th>
                <th className="w-10" />
              </tr>
            </thead>
            <tbody>
              {expenses.map((exp) => (
                <tr key={exp.id}>
                  <td className="tnum font-semibold text-[var(--black-900)]">{exp.id}</td>
                  <td>{exp.vendor}</td>
                  <td>
                    <span className="badge b-neutral">{exp.category}</span>
                  </td>
                  <td className="tnum text-[var(--black-400)]">{exp.date}</td>
                  <td>
                    <ExpenseStatusBadge status={exp.status as "Approved" | "Pending"} />
                  </td>
                  <td className="text-right tnum font-semibold">{formatEuroPlain(exp.amount)}</td>
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
      </div>
    </div>
  );
}
