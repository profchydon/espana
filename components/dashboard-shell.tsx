"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Wallet,
  LayoutDashboard,
  ReceiptText,
  Landmark,
  Banknote,
  Settings,
  Bell,
  Search,
  Plus,
} from "lucide-react";
import { LogoutButton } from "@/components/auth/logout-button";
import type { User } from "@/lib/auth";

function initials(user: User) {
  return `${user.firstName[0] ?? ""}${user.lastName[0] ?? ""}`.toUpperCase();
}

const mainNav = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Invoices", href: "/dashboard/invoices", icon: ReceiptText },
  { name: "Expenses", href: "/dashboard/expenses", icon: Banknote },
  { name: "Banking", href: "/dashboard/banking", icon: Landmark },
];

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname.startsWith(href);
}

export function Sidebar({ user }: { user: User }) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-[248px] shrink-0 flex-col border-r border-[var(--black-100)] bg-[var(--bg-surface)]">
      <div className="flex h-[60px] items-center px-5 border-b border-[var(--black-100)]">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--sunshine-500)] text-white">
            <Wallet size={17} />
          </div>
          <span className="editorial text-[17px] font-bold tracking-tight">Espanafonica</span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto scroll-thin p-4">
        <div className="mb-2 px-2 text-[11px] font-bold uppercase tracking-wider text-[var(--black-300)]">
          Ledger
        </div>
        <nav className="flex flex-col gap-0.5">
          {mainNav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13.5px] font-semibold transition-colors ${
                  active
                    ? "bg-[var(--ginger-50)] text-[var(--ginger-700)]"
                    : "text-[var(--black-400)] hover:bg-[var(--black-50)] hover:text-[var(--black-900)]"
                }`}
              >
                <item.icon size={17} strokeWidth={active ? 2 : 1.7} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="mt-6 mb-2 px-2 text-[11px] font-bold uppercase tracking-wider text-[var(--black-300)]">
          Quick actions
        </div>
        <div className="flex flex-col gap-2 px-1">
          <Link href="/dashboard/invoices" className="btn btn-outline btn-sm w-full justify-center">
            <Plus size={14} /> New invoice
          </Link>
          <Link href="/dashboard/expenses" className="btn btn-ghost btn-sm w-full justify-center">
            Record expense
          </Link>
        </div>
      </div>

      <div className="border-t border-[var(--black-100)] p-4">
        <div className="mb-3 flex items-center gap-3 rounded-lg bg-[var(--black-50)] px-3 py-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[var(--iris-100)] text-[var(--iris-700)] text-[12px] font-bold">
            {initials(user)}
          </div>
          <div className="min-w-0">
            <div className="truncate text-[13px] font-semibold leading-tight">
              {user.firstName} {user.lastName}
            </div>
            <div className="truncate text-[11px] text-[var(--black-400)]">{user.companyName}</div>
          </div>
        </div>
        <nav className="flex flex-col gap-0.5">
          <Link
            href="/dashboard/settings"
            className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13.5px] font-semibold transition-colors ${
              pathname.includes("/dashboard/settings")
                ? "bg-[var(--ginger-50)] text-[var(--ginger-700)]"
                : "text-[var(--black-400)] hover:bg-[var(--black-50)] hover:text-[var(--black-900)]"
            }`}
          >
            <Settings size={17} strokeWidth={1.7} />
            Settings
          </Link>
          <LogoutButton />
        </nav>
      </div>
    </aside>
  );
}

export function TopHeader() {
  return (
    <header className="flex h-[60px] shrink-0 items-center justify-between border-b border-[var(--black-100)] bg-[var(--bg-surface)] px-6">
      <div className="flex w-full max-w-[380px] items-center gap-2 rounded-lg border border-[var(--black-100)] bg-[var(--bg-page)] px-3 py-2 focus-within:border-[var(--ginger-500)] focus-within:ring-2 focus-within:ring-[var(--ginger-500)]/15 transition-all">
        <Search size={15} className="text-[var(--black-300)]" />
        <input
          type="text"
          placeholder="Search invoices, expenses, transactions…"
          className="w-full bg-transparent text-[13px] outline-none placeholder:text-[var(--black-300)]"
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="relative rounded-lg p-2 text-[var(--black-400)] transition-colors hover:bg-[var(--black-50)] hover:text-[var(--black-900)]"
          aria-label="Notifications"
        >
          <Bell size={18} strokeWidth={1.7} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border border-white bg-[var(--red-500)]" />
        </button>
        <div className="hidden sm:block rounded-md border border-[var(--black-100)] bg-[var(--black-50)] px-2.5 py-1 text-[11px] font-semibold text-[var(--black-400)]">
          EUR
        </div>
      </div>
    </header>
  );
}
