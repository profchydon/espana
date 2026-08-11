import type { InvoiceStatus, TransactionStatus } from "@/lib/mvp-data";

const invoiceStyles: Record<InvoiceStatus, string> = {
  Paid: "b-success",
  Sent: "b-iris",
  Draft: "b-neutral",
  Overdue: "b-danger",
};

const invoiceDots: Record<InvoiceStatus, string> = {
  Paid: "var(--green-500)",
  Sent: "var(--iris-500)",
  Draft: "var(--black-400)",
  Overdue: "var(--red-500)",
};

export function InvoiceStatusBadge({ status }: { status: InvoiceStatus }) {
  return (
    <span className={`badge ${invoiceStyles[status]}`}>
      <span className="dot" style={{ background: invoiceDots[status] }} />
      {status}
    </span>
  );
}

export function TransactionStatusBadge({ status }: { status: TransactionStatus }) {
  const isCleared = status === "Cleared";
  return (
    <span className={`badge ${isCleared ? "b-success" : "b-warn"}`}>
      <span className="dot" style={{ background: isCleared ? "var(--green-500)" : "var(--sunshine-500)" }} />
      {status}
    </span>
  );
}

export function ExpenseStatusBadge({ status }: { status: "Approved" | "Pending" }) {
  const approved = status === "Approved";
  return (
    <span className={`badge ${approved ? "b-success" : "b-warn"}`}>
      <span className="dot" style={{ background: approved ? "var(--green-500)" : "var(--sunshine-500)" }} />
      {status}
    </span>
  );
}
