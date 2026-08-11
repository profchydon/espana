import { Landmark, RefreshCw, Search, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { formatEuroPlain } from "@/lib/format";
import { bankAccount, bankFeeds } from "@/lib/mvp-data";

export default function BankingPage() {
  const unmatched = bankFeeds.filter((feed) => !feed.match).length;

  return (
    <div>
      <PageHeader
        title="Banking"
        description="Match bank statement lines to your ledger."
        actions={
          <button type="button" className="btn btn-outline btn-sm">
            <RefreshCw size={14} /> Sync feed
          </button>
        }
      />

      <div className="panel mb-6 !p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--sunshine-50)] text-[var(--sunshine-600)]">
              <Landmark size={20} />
            </div>
            <div>
              <h3 className="text-[15px] font-bold">{bankAccount.name}</h3>
              <p className="text-[13px] text-[var(--black-400)]">
                {bankAccount.masked} · Synced {bankAccount.lastSynced}
              </p>
            </div>
          </div>
          <div className="sm:text-right">
            <div className="text-[12px] font-semibold text-[var(--black-400)]">Statement balance</div>
            <div className="tnum text-[22px] font-bold">{formatEuroPlain(bankAccount.balance)}</div>
          </div>
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[15px] font-bold">
          To review <span className="text-[var(--black-400)]">({bankFeeds.length})</span>
        </h2>
        {unmatched > 0 ? (
          <span className="badge b-warn">{unmatched} unmatched</span>
        ) : null}
      </div>

      <div className="flex flex-col gap-4">
        {bankFeeds.map((feed) => (
          <div key={feed.id} className="panel recon-card panel-flush">
            <div className="recon-side recon-side-bank">
              <div className="recon-label recon-label-bank">Bank statement</div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="tnum text-[12px] text-[var(--black-400)]">{feed.date}</div>
                  <div className="mt-1 text-[15px] font-semibold">{feed.desc}</div>
                </div>
                <div
                  className={`tnum shrink-0 text-[16px] font-bold ${
                    feed.type === "in" ? "text-[var(--green-600)]" : "text-[var(--black-900)]"
                  }`}
                >
                  {feed.type === "in" ? "+" : "-"}
                  {formatEuroPlain(feed.amount)}
                </div>
              </div>
            </div>

            <div className="recon-side recon-side-ledger">
              <div className="recon-label recon-label-ledger">Ledger match</div>

              {feed.match ? (
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-[15px] font-semibold">{feed.match.target}</div>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded px-2 py-0.5 text-[11px] font-bold ${
                            feed.match.type === "exact"
                              ? "bg-[var(--green-50)] text-[var(--green-700)]"
                              : feed.match.type === "rule"
                                ? "bg-[var(--iris-50)] text-[var(--iris-700)]"
                                : "bg-[var(--sunshine-50)] text-[var(--sunshine-700)]"
                          }`}
                        >
                          {feed.match.type === "exact"
                            ? "Exact match"
                            : feed.match.type === "rule"
                              ? "Rule applied"
                              : "Suggested"}
                        </span>
                        <span className="text-[12px] text-[var(--black-400)]">
                          {feed.match.confidence}% confidence
                        </span>
                      </div>
                    </div>
                    <button type="button" className="btn btn-primary btn-sm shrink-0">
                      Confirm
                    </button>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-4 text-[12px] font-semibold text-[var(--black-400)]">
                    <button type="button" className="hover:text-[var(--black-900)]">Find other</button>
                    <button type="button" className="hover:text-[var(--black-900)]">Add as new</button>
                    <button type="button" className="hover:text-[var(--black-900)]">Transfer</button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex flex-wrap gap-2">
                    <button type="button" className="btn btn-outline btn-sm">
                      Find match
                    </button>
                    <button type="button" className="btn btn-outline btn-sm">
                      Add as new
                    </button>
                    <button type="button" className="btn btn-outline btn-sm">
                      Transfer
                    </button>
                  </div>
                  <div className="relative mt-3">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--black-300)]" />
                    <input
                      type="text"
                      placeholder="Search contacts or accounts…"
                      className="input !py-2 !pl-9 !text-[13px]"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="panel mt-6 flex flex-col items-center justify-center border-2 border-dashed border-[var(--black-100)] bg-transparent py-12 text-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--green-50)] text-[var(--green-600)]">
          <CheckCircle2 size={22} />
        </div>
        <h3 className="text-[17px] font-bold">All caught up</h3>
        <p className="mt-1 max-w-[320px] text-[14px] text-[var(--black-400)]">
          No additional bank lines waiting for this account.
        </p>
      </div>
    </div>
  );
}
