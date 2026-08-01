"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Wallet,
  LayoutDashboard,
  ReceiptText,
  Landmark,
  Banknote,
  Boxes,
  Building2,
  BarChart3,
  Settings,
  Bell,
  Search,
  ChevronDown,
} from "lucide-react";
import { LogoutButton } from "@/components/auth/logout-button";
import type { User } from "@/lib/auth";

function initials(user: User) {
  return `${user.firstName[0] ?? ""}${user.lastName[0] ?? ""}`.toUpperCase();
}

export function Sidebar({ user }: { user: User }) {
  const pathname = usePathname();

  const navigation = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Sales & Invoicing", href: "/dashboard/invoices", icon: ReceiptText },
    { name: "Bank Reconciliation", href: "/dashboard/banking", icon: Landmark },
    { name: "Bills & Expenses", href: "/dashboard/expenses", icon: Banknote },
    { name: "Inventory", href: "/dashboard/inventory", icon: Boxes },
    { name: "Fixed Assets", href: "/dashboard/assets", icon: Building2 },
    { name: "Reports", href: "/dashboard/reports", icon: BarChart3 },
  ];

  return (
    <div className="flex h-full w-[260px] flex-col border-r border-[var(--black-100)] bg-[var(--bg-surface)]">
      <div className="flex h-16 items-center px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[var(--sunshine-500)] text-white">
            <Wallet size={16} />
          </div>
          <span className="editorial text-lg font-bold tracking-tight text-[var(--black-900)]">
            Espanafonica
          </span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto scroll-thin px-4 py-4">
        <nav className="flex flex-col gap-1">
          {navigation.map((item) => {
            const isActive =
              pathname === item.href ||
              (pathname.startsWith(item.href) && item.href !== "/dashboard");
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-[14px] font-medium transition-colors ${
                  isActive
                    ? "bg-[var(--ginger-50)] text-[var(--ginger-700)]"
                    : "text-[var(--black-400)] hover:bg-[var(--black-50)] hover:text-[var(--black-900)]"
                }`}
              >
                <item.icon size={18} strokeWidth={isActive ? 2 : 1.7} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-[var(--black-100)] p-4">
        <nav className="flex flex-col gap-1">
          <Link
            href="/dashboard/settings"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-[14px] font-medium transition-colors ${
              pathname.includes("/dashboard/settings")
                ? "bg-[var(--ginger-50)] text-[var(--ginger-700)]"
                : "text-[var(--black-400)] hover:bg-[var(--black-50)] hover:text-[var(--black-900)]"
            }`}
          >
            <Settings size={18} strokeWidth={1.7} />
            Settings
          </Link>
          <LogoutButton />
        </nav>
      </div>
    </div>
  );
}

export function TopHeader({ user }: { user: User }) {
  return (
    <header className="flex h-16 w-full items-center justify-between border-b border-[var(--black-100)] bg-[var(--bg-surface)] px-8">
      <div className="flex w-full max-w-[400px] items-center gap-2 rounded-md border border-[var(--black-100)] bg-[var(--bg-page)] px-3 py-1.5 focus-within:border-[var(--ginger-500)] focus-within:ring-2 focus-within:ring-[var(--ginger-500)]/20 transition-all">
        <Search size={16} className="text-[var(--black-300)]" />
        <input
          type="text"
          placeholder="Search invoices, transactions, contacts..."
          className="w-full bg-transparent text-[14px] outline-none placeholder:text-[var(--black-300)]"
        />
        <div className="flex items-center gap-1 rounded border border-[var(--black-100)] bg-white px-1.5 py-0.5 text-[10px] font-medium text-[var(--black-300)]">
          ⌘K
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative text-[var(--black-400)] hover:text-[var(--black-900)] transition-colors">
          <Bell size={20} strokeWidth={1.7} />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-[var(--red-500)] border border-white"></span>
        </button>

        <div className="h-8 w-px bg-[var(--black-100)] mx-1"></div>

        <button className="flex items-center gap-2 hover:bg-[var(--black-50)] p-1.5 rounded-lg transition-colors">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[var(--iris-100)] text-[var(--iris-700)] font-bold text-[13px] tracking-tight">
            {initials(user)}
          </div>
          <div className="hidden sm:flex flex-col items-start text-left">
            <span className="text-[13px] font-semibold leading-tight text-[var(--black-900)]">
              {user.firstName} {user.lastName}
            </span>
            <span className="text-[11px] font-medium leading-tight text-[var(--black-400)]">
              {user.companyName}
            </span>
          </div>
          <ChevronDown size={14} className="text-[var(--black-400)] ml-1" />
        </button>
      </div>
    </header>
  );
}
