import Link from "next/link";
import { Wallet } from "lucide-react";

export function MarketingNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--black-100)] bg-[var(--bg-page)]/90 backdrop-blur-md">
      <div className="mx-auto flex h-[60px] max-w-[1160px] items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--sunshine-500)] text-white">
            <Wallet size={18} />
          </div>
          <span className="editorial text-[18px] font-bold tracking-tight">Espanafonica</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <Link href="#features" className="text-[13px] font-semibold text-[var(--black-400)] hover:text-[var(--black-900)]">
            Features
          </Link>
          <Link href="#workflow" className="text-[13px] font-semibold text-[var(--black-400)] hover:text-[var(--black-900)]">
            Workflow
          </Link>
          <Link href="#faq" className="text-[13px] font-semibold text-[var(--black-400)] hover:text-[var(--black-900)]">
            FAQ
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/login" className="btn btn-ghost btn-sm hidden sm:inline-flex">
            Log in
          </Link>
          <Link href="/register" className="btn btn-primary btn-sm">
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}

export function MarketingFooter() {
  return (
    <footer className="border-t border-[var(--black-100)] bg-[var(--bg-page)] py-10">
      <div className="mx-auto flex max-w-[1160px] flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[var(--sunshine-500)] text-white">
            <Wallet size={14} />
          </div>
          <span className="editorial text-[16px] font-bold">Espanafonica</span>
        </div>
        <p className="text-[13px] text-[var(--black-400)]">
          © {new Date().getFullYear()} Espanafonica. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
