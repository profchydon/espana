import Link from "next/link";
import { Plus, Wallet, TrendingUp, CreditCard, PiggyBank } from "lucide-react";
import { MetricCard } from "@/components/dashboard/metric-card";
import { PageHeader, PageHeaderLink } from "@/components/dashboard/page-header";
import { TransactionStatusBadge } from "@/components/dashboard/status-badge";
import { formatEuro } from "@/lib/format";
import {
  actionItems,
  cashFlowMonths,
  dashboardMetrics,
  recentTransactions,
} from "@/lib/mvp-data";

export default function DashboardOverview() {
  const maxFlow = Math.max(...cashFlowMonths.flatMap((m) => [m.inflow, m.outflow]));

  return (
    <div>
      <PageHeader
        title="Overview"
        description="Your ledger at a glance — cash, receivables, and what needs attention."
        actions={
          <>
            <PageHeaderLink href="/dashboard/expenses">Record expense</PageHeaderLink>
            <Link href="/dashboard/invoices" className="btn btn-primary btn-sm">
              <Plus size={14} /> Create invoice
            </Link>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Cash balance"
          value={dashboardMetrics.cashBalance}
          trend={dashboardMetrics.trends.cashBalance}
          icon={Wallet}
          accent="green"
        />
        <MetricCard
          label="Receivables"
          value={dashboardMetrics.receivables}
          trend={dashboardMetrics.trends.receivables}
          icon={TrendingUp}
          accent="iris"
        />
        <MetricCard
          label="Payables"
          value={dashboardMetrics.payables}
          trend={dashboardMetrics.trends.payables}
          icon={CreditCard}
          accent="sunshine"
        />
        <MetricCard
          label="Net profit (MTD)"
          value={dashboardMetrics.netProfitMtd}
          trend={dashboardMetrics.trends.netProfitMtd}
          icon={PiggyBank}
          accent="ginger"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="panel lg:col-span-2">
          <div className="panel-head">
            <h2 className="panel-title">Cash flow</h2>
            <select className="select !w-auto !py-1.5 !px-3 !text-[12px]">
              <option>Last 12 months</option>
              <option>This year</option>
            </select>
          </div>
          <div className="panel-body">
            <div className="mb-4 flex gap-5 text-[12px] font-semibold text-[var(--black-400)]">
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-sm bg-[var(--ginger-500)]" /> Inflow
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-sm bg-[var(--black-100)]" /> Outflow
              </span>
            </div>
            <div className="cash-bar">
              {cashFlowMonths.map((month) => (
                <div key={month.month} className="cash-bar-group">
                  <div className="cash-bar-stack" style={{ height: `${(Math.max(month.inflow, month.outflow) / maxFlow) * 100}%` }}>
                    <div
                      className="cash-bar-in"
                      style={{ height: `${(month.inflow / Math.max(month.inflow, month.outflow)) * 100}%` }}
                      title={`In: ${formatEuro(month.inflow)}`}
                    />
                    <div
                      className="cash-bar-out"
                      style={{ height: `${(month.outflow / Math.max(month.inflow, month.outflow)) * 100}%` }}
                      title={`Out: ${formatEuro(month.outflow)}`}
                    />
                  </div>
                  <span className="cash-bar-label">{month.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-head">
            <h2 className="panel-title">Needs attention</h2>
            <span className="badge b-brand">{actionItems.length}</span>
          </div>
          <div className="panel-body !pt-2">
            {actionItems.map((item) => (
              <div key={item.id} className="action-item">
                <span className={`action-dot action-dot-${item.tone}`} />
                <div className="min-w-0 flex-1">
                  <p className="text-[13.5px] font-semibold text-[var(--black-900)]">{item.title}</p>
                  <p className="mt-0.5 text-[12.5px] leading-relaxed text-[var(--black-400)]">{item.body}</p>
                  <Link href={item.href} className="mt-2 inline-block text-[12.5px] font-semibold text-[var(--ginger-600)] hover:underline">
                    {item.action} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="panel panel-flush mt-6">
        <div className="panel-head">
          <h2 className="panel-title">Recent transactions</h2>
          <Link href="/dashboard/banking" className="btn btn-ghost btn-sm">
            View all
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="table-ds">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>ID</th>
                <th>Status</th>
                <th className="text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((trx) => (
                <tr key={trx.id}>
                  <td className="tnum">{trx.date}</td>
                  <td className="font-semibold text-[var(--black-900)]">{trx.desc}</td>
                  <td className="tnum text-[var(--black-400)]">{trx.id}</td>
                  <td>
                    <TransactionStatusBadge status={trx.status} />
                  </td>
                  <td
                    className={`text-right tnum font-semibold ${
                      trx.amount >= 0 ? "text-[var(--green-600)]" : "text-[var(--black-900)]"
                    }`}
                  >
                    {formatEuro(trx.amount, { showSign: true })}
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
