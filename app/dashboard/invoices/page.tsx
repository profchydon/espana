import Link from "next/link";
import { Plus, Filter, Download, Search, MoreHorizontal } from "lucide-react";

export default function InvoicesPage() {
  const invoices = [
    { id: "INV-2045", client: "Beta Ltd.", date: "Jul 5, 2026", due: "Jul 19, 2026", amount: "₦850,000", status: "Draft" },
    { id: "INV-2044", client: "Acme Corp.", date: "Jul 2, 2026", due: "Jul 16, 2026", amount: "₦1,200,000", status: "Sent" },
    { id: "INV-2043", client: "TechFlow NG", date: "Jun 28, 2026", due: "Jul 12, 2026", amount: "₦450,000", status: "Paid" },
    { id: "INV-2042", client: "Oasis Hospitals", date: "Jun 25, 2026", due: "Jul 9, 2026", amount: "₦3,100,000", status: "Overdue" },
    { id: "INV-2041", client: "Peak Retail", date: "Jun 20, 2026", due: "Jul 4, 2026", amount: "₦420,000", status: "Paid" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Paid":
        return <span className="badge b-success"><div className="dot bg-[var(--green-500)]"></div>Paid</span>;
      case "Sent":
        return <span className="badge b-iris"><div className="dot bg-[var(--iris-500)]"></div>Sent</span>;
      case "Draft":
        return <span className="badge b-neutral"><div className="dot bg-[var(--black-400)]"></div>Draft</span>;
      case "Overdue":
        return <span className="badge b-danger"><div className="dot bg-[var(--red-500)]"></div>Overdue</span>;
      default:
        return <span className="badge b-neutral">{status}</span>;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-[28px] font-bold tracking-tight text-[var(--black-900)]">Sales & Invoicing</h1>
          <p className="text-[14px] text-[var(--black-400)] mt-1">Manage your customer invoices and track receivables.</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={16} /> New invoice
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-center card !p-3">
        <div className="flex w-full max-w-[320px] items-center gap-2 rounded-md border border-[var(--black-100)] bg-[var(--bg-page)] px-3 py-1.5 focus-within:border-[var(--ginger-500)] focus-within:ring-2 focus-within:ring-[var(--ginger-500)]/20 transition-all">
          <Search size={16} className="text-[var(--black-300)]" />
          <input 
            type="text" 
            placeholder="Search by client or invoice ID..." 
            className="w-full bg-transparent text-[13.5px] outline-none placeholder:text-[var(--black-300)]"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button className="btn btn-outline btn-sm flex-1 sm:flex-auto">
            <Filter size={14} /> Filter
          </button>
          <button className="btn btn-outline btn-sm flex-1 sm:flex-auto">
            <Download size={14} /> Export
          </button>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="card !p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table-ds w-full">
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Client</th>
                <th>Issue Date</th>
                <th>Due Date</th>
                <th>Status</th>
                <th className="text-right">Amount</th>
                <th className="w-10"></th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id}>
                  <td className="tnum font-medium text-[var(--black-900)]">
                    <Link href="#" className="hover:text-[var(--ginger-600)] transition-colors">{inv.id}</Link>
                  </td>
                  <td>{inv.client}</td>
                  <td className="tnum text-[var(--black-400)]">{inv.date}</td>
                  <td className="tnum text-[var(--black-400)]">{inv.due}</td>
                  <td>{getStatusBadge(inv.status)}</td>
                  <td className="text-right tnum font-medium text-[var(--black-900)]">
                    {inv.amount}
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
        
        {/* Pagination placeholder */}
        <div className="flex items-center justify-between border-t border-[var(--black-100)] p-4 text-[13px] text-[var(--black-400)]">
          <div>Showing 1 to 5 of 24 entries</div>
          <div className="flex gap-1">
            <button className="px-3 py-1.5 border border-[var(--black-100)] rounded-md hover:bg-[var(--black-50)] disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1.5 border border-[var(--black-100)] rounded-md hover:bg-[var(--black-50)]">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
