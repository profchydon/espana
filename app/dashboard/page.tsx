import Link from "next/link";
import { ArrowUpRight, ArrowDownRight, MoreHorizontal, Plus } from "lucide-react";

export default function DashboardOverview() {
  const metrics = [
    { label: "Cash balance", value: "€14,213,380", trend: "+4.2%", positive: true },
    { label: "Receivables", value: "€2,161,880", trend: "-1.1%", positive: false },
    { label: "Payables", value: "€1,185,200", trend: "+12.4%", positive: false },
    { label: "Net profit (MTD)", value: "€4,821,100", trend: "+8.9%", positive: true },
  ];

  const transactions = [
    { id: "TRX-001", date: "Jul 4, 2026", desc: "Invoice #INV-2041 payment", amount: "+€420,000", status: "Cleared" },
    { id: "TRX-002", date: "Jul 3, 2026", desc: "AWS Subscription", amount: "-€45,000", status: "Cleared" },
    { id: "TRX-003", date: "Jul 3, 2026", desc: "Office Supplies", amount: "-€12,500", status: "Pending" },
    { id: "TRX-004", date: "Jul 2, 2026", desc: "Invoice #INV-2040 payment", amount: "+€1,150,000", status: "Cleared" },
    { id: "TRX-005", date: "Jul 1, 2026", desc: "Payroll Run - June", amount: "-€3,400,000", status: "Cleared" },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Page Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-[28px] font-bold tracking-tight text-[var(--black-900)]">Overview</h1>
          <p className="text-[14px] text-[var(--black-400)] mt-1">Here's what's happening with your finances today.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/expenses" className="btn btn-outline">
            Record expense
          </Link>
          <Link href="/dashboard/invoices" className="btn btn-primary">
            <Plus size={16} /> Create invoice
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, i) => (
          <div key={i} className="card flex flex-col justify-between" style={{ padding: 20 }}>
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-medium text-[var(--black-400)]">{metric.label}</span>
              <span className={`badge ${metric.positive ? 'b-success' : 'b-danger'}`}>
                {metric.positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {metric.trend}
              </span>
            </div>
            <div className="tnum mt-4 text-[24px] font-bold text-[var(--black-900)]">
              {metric.value}
            </div>
          </div>
        ))}
      </div>

      {/* Charts & Tables Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Cash flow chart placeholder */}
        <div className="card lg:col-span-2 flex flex-col">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-[16px] font-bold">Cash flow</h2>
            <select className="select !w-auto !py-1.5 !px-3 !text-[13px]">
              <option>Last 6 months</option>
              <option>This year</option>
            </select>
          </div>
          <div className="flex-1 flex items-end gap-2" aria-hidden>
            {[30, 45, 60, 40, 80, 55, 75, 45, 90, 65, 100, 85].map((h, i) => (
              <div key={i} className="group relative flex flex-1 flex-col justify-end gap-1 h-[200px]">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-[var(--black-900)] text-white text-[11px] py-1 px-2 rounded whitespace-nowrap pointer-events-none transition-opacity z-10">
                  €{(h * 15000).toLocaleString()}
                </div>
                <div 
                  className="w-full rounded-t-sm transition-all duration-300 hover:opacity-80"
                  style={{ 
                    height: `${h}%`, 
                    background: i % 2 === 0 ? "var(--ginger-500)" : "var(--sunshine-400)" 
                  }}
                ></div>
                <div className="text-center text-[10px] text-[var(--black-300)] mt-2">
                  {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action required / Notifications */}
        <div className="card flex flex-col">
          <h2 className="text-[16px] font-bold mb-4">To-do list</h2>
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3 border-b border-[var(--black-50)] pb-4">
              <div className="mt-0.5 flex h-2 w-2 shrink-0 rounded-full bg-[var(--red-500)]"></div>
              <div>
                <p className="text-[13.5px] font-medium text-[var(--black-900)]">3 bank transactions unmatched</p>
                <p className="text-[12.5px] text-[var(--black-400)] mt-0.5">Please review your bank feed from Zenith Bank to close the month.</p>
                <Link href="/dashboard/banking" className="mt-2 inline-block text-[13px] font-medium text-[var(--ginger-600)] hover:underline">Reconcile now</Link>
              </div>
            </div>
            <div className="flex items-start gap-3 border-b border-[var(--black-50)] pb-4">
              <div className="mt-0.5 flex h-2 w-2 shrink-0 rounded-full bg-[var(--sunshine-500)]"></div>
              <div>
                <p className="text-[13.5px] font-medium text-[var(--black-900)]">2 invoices overdue</p>
                <p className="text-[12.5px] text-[var(--black-400)] mt-0.5">Acme Corp and Beta Ltd have outstanding balances over 15 days.</p>
                <Link href="/dashboard/invoices" className="mt-2 inline-block text-[13px] font-medium text-[var(--ginger-600)] hover:underline">Send reminders</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions Table */}
      <div className="card !p-0 overflow-hidden">
        <div className="flex items-center justify-between border-b border-[var(--black-100)] p-5">
          <h2 className="text-[16px] font-bold">Recent transactions</h2>
          <Link href="/dashboard/reports" className="btn btn-ghost btn-sm">
            View all
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="table-ds">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Transaction ID</th>
                <th>Status</th>
                <th className="text-right">Amount</th>
                <th className="w-10"></th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((trx) => (
                <tr key={trx.id}>
                  <td>{trx.date}</td>
                  <td className="font-medium text-[var(--black-900)]">{trx.desc}</td>
                  <td className="tnum text-[var(--black-400)]">{trx.id}</td>
                  <td>
                    <span className={`badge ${trx.status === 'Cleared' ? 'b-success' : 'b-warn'}`}>
                      {trx.status === 'Cleared' ? <div className="dot bg-[var(--green-500)]"></div> : <div className="dot bg-[var(--sunshine-500)]"></div>}
                      {trx.status}
                    </span>
                  </td>
                  <td className={`text-right tnum font-medium ${trx.amount.startsWith('-') ? 'text-[var(--black-900)]' : 'text-[var(--green-600)]'}`}>
                    {trx.amount}
                  </td>
                  <td>
                    <button className="text-[var(--black-300)] hover:text-[var(--black-900)] transition-colors">
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
