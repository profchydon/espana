import { Landmark, ArrowRightLeft, Search, RefreshCw, CheckCircle2 } from "lucide-react";

export default function BankingPage() {
  const bankFeeds = [
    { 
      id: "BF-101", 
      date: "Jul 5, 2026", 
      desc: "PAYSTACK *ACME CORP", 
      amount: "₦1,200,000", 
      type: "in",
      match: { type: "exact", confidence: 98, target: "Invoice #INV-2044" }
    },
    { 
      id: "BF-102", 
      date: "Jul 4, 2026", 
      desc: "AWS EMEA", 
      amount: "₦45,000", 
      type: "out",
      match: { type: "rule", confidence: 95, target: "Software Subscriptions" }
    },
    { 
      id: "BF-103", 
      date: "Jul 3, 2026", 
      desc: "TRANSFER TO WEMA BANK", 
      amount: "₦500,000", 
      type: "out",
      match: null
    },
    { 
      id: "BF-104", 
      date: "Jul 3, 2026", 
      desc: "NIP/POS/SUPERMART", 
      amount: "₦12,500", 
      type: "out",
      match: { type: "suggested", confidence: 60, target: "Office Supplies" }
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-[28px] font-bold tracking-tight text-[var(--black-900)]">Bank Reconciliation</h1>
          <p className="text-[14px] text-[var(--black-400)] mt-1">Match bank statement lines to your ledger automatically.</p>
        </div>
        <button className="btn btn-outline">
          <RefreshCw size={16} /> Sync bank feed
        </button>
      </div>

      {/* Bank Account Selector */}
      <div className="card flex items-center justify-between !p-4">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--sunshine-50)] text-[var(--sunshine-600)]">
            <Landmark size={20} />
          </div>
          <div>
            <h3 className="font-bold text-[15px]">Zenith Bank Corporate</h3>
            <p className="text-[13px] text-[var(--black-400)]">Account: 101****452 • Last synced: 2 mins ago</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[13px] text-[var(--black-400)] font-medium">Statement balance</div>
          <div className="tnum font-bold text-[20px]">₦14,213,380</div>
        </div>
      </div>

      {/* Reconciliation Feed */}
      <div className="flex flex-col gap-4">
        <h3 className="text-[16px] font-bold mt-2">To Review ({bankFeeds.length})</h3>
        
        {bankFeeds.map((feed) => (
          <div key={feed.id} className="card !p-0 flex flex-col sm:flex-row overflow-hidden border border-[var(--black-100)]">
            {/* Bank Statement side (Left) */}
            <div className="flex-1 bg-[var(--black-50)] p-5 border-b sm:border-b-0 sm:border-r border-[var(--black-100)]">
              <div className="text-[12px] font-semibold text-[var(--black-400)] mb-2 uppercase tracking-wider">Bank Statement</div>
              <div className="flex justify-between items-start">
                <div>
                  <div className="tnum text-[13px] text-[var(--black-500)] mb-1">{feed.date}</div>
                  <div className="font-medium text-[15px]">{feed.desc}</div>
                </div>
                <div className={`tnum font-bold text-[16px] ${feed.type === 'in' ? 'text-[var(--green-600)]' : 'text-[var(--black-900)]'}`}>
                  {feed.type === 'in' ? '+' : '-'}{feed.amount}
                </div>
              </div>
            </div>

            {/* Middle Icon */}
            <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 h-full items-center justify-center z-10 pointer-events-none">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white border border-[var(--black-100)] shadow-sm text-[var(--black-300)]">
                <ArrowRightLeft size={14} />
              </div>
            </div>

            {/* Ledger Match side (Right) */}
            <div className="flex-1 p-5 bg-white relative">
              <div className="text-[12px] font-semibold text-[var(--ginger-600)] mb-2 uppercase tracking-wider">Ledger Match</div>
              
              {feed.match ? (
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="font-medium text-[15px]">{feed.match.target}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-[12px] font-medium px-2 py-0.5 rounded-sm ${
                          feed.match.type === 'exact' ? 'bg-[var(--green-50)] text-[var(--green-700)]' : 
                          feed.match.type === 'rule' ? 'bg-[var(--iris-50)] text-[var(--iris-700)]' : 
                          'bg-[var(--sunshine-50)] text-[var(--sunshine-700)]'
                        }`}>
                          {feed.match.type === 'exact' ? 'Exact match' : 
                           feed.match.type === 'rule' ? 'Bank rule applied' : 
                           'AI Suggestion'}
                        </span>
                        {feed.match.confidence > 90 && (
                          <span className="text-[12px] text-[var(--black-400)]">{feed.match.confidence}% confidence</span>
                        )}
                      </div>
                    </div>
                    <button className="btn btn-primary btn-sm shrink-0">
                      OK
                    </button>
                  </div>
                  <div className="text-[12.5px] text-[var(--black-400)] flex gap-4">
                    <button className="hover:text-[var(--black-900)] underline">Find other match</button>
                    <button className="hover:text-[var(--black-900)] underline">Add as new</button>
                    <button className="hover:text-[var(--black-900)] underline">Transfer</button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col h-full justify-center">
                  <div className="flex gap-2">
                    <button className="btn btn-outline btn-sm flex-1">Find match</button>
                    <button className="btn btn-outline btn-sm flex-1">Add as new</button>
                    <button className="btn btn-outline btn-sm flex-1">Transfer</button>
                  </div>
                  <div className="mt-3 relative">
                    <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--black-300)]" />
                    <input type="text" placeholder="Search contacts or accounts..." className="input !py-1.5 !pl-8 !text-[13px] w-full" />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Done State */}
      <div className="card flex flex-col items-center justify-center py-12 text-center border-dashed mt-4 bg-transparent border-2 border-[var(--black-100)]">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--green-50)] text-[var(--green-600)] mb-4">
          <CheckCircle2 size={24} />
        </div>
        <h3 className="text-[18px] font-bold">You're all caught up!</h3>
        <p className="text-[14px] text-[var(--black-400)] mt-1 max-w-[300px]">There are no more bank transactions to reconcile for this account.</p>
      </div>
    </div>
  );
}
