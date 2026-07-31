import Link from "next/link";
import { Wallet } from "lucide-react";

export function MarketingNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--black-100)] bg-[var(--bg-page)]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--sunshine-500)] text-white">
            <Wallet size={20} />
          </div>
          <span className="editorial text-xl font-bold tracking-tight text-[var(--black-900)]">Espanafonica</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <Link href="#features" className="text-sm font-medium text-[var(--black-400)] hover:text-[var(--black-900)]">Features</Link>
          <Link href="#industries" className="text-sm font-medium text-[var(--black-400)] hover:text-[var(--black-900)]">Industries</Link>
          <Link href="#faq" className="text-sm font-medium text-[var(--black-400)] hover:text-[var(--black-900)]">FAQ</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/login" className="btn btn-ghost btn-sm hidden sm:inline-flex">Log in</Link>
          <Link href="/register" className="btn btn-primary btn-sm">Get started</Link>
        </div>
      </div>
    </header>
  );
}

export function MarketingFooter() {
  return (
    <footer className="border-t border-[var(--black-100)] bg-[var(--bg-page)] py-12">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-6 px-6 sm:flex-row">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-[var(--sunshine-500)] text-white">
            <Wallet size={14} />
          </div>
          <span className="editorial text-lg font-bold tracking-tight text-[var(--black-900)]">Espanafonica</span>
        </div>
        <p className="text-sm text-[var(--black-400)]">
          © {new Date().getFullYear()} Espanafonica. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
