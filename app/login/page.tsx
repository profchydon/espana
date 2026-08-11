import Link from "next/link";
import { Wallet, ArrowLeft } from "lucide-react";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="auth-split">
      <div className="auth-brand-panel">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15">
              <Wallet size={18} />
            </div>
            <span className="editorial text-[20px] font-bold">Espanafonica</span>
          </div>
          <h1 className="editorial mt-16 max-w-[360px] text-[36px] leading-tight">
            Your ledger, always in euros.
          </h1>
          <p className="mt-4 max-w-[340px] text-[15px] leading-relaxed text-white/75">
            Invoices, expenses, and bank reconciliation in one calm dashboard.
          </p>
        </div>
        <p className="text-[13px] text-white/50">© {new Date().getFullYear()} Espanafonica</p>
      </div>

      <div className="auth-form-panel">
        <Link
          href="/"
          className="absolute top-6 left-6 flex items-center gap-2 text-[13px] font-semibold text-[var(--black-400)] hover:text-[var(--black-900)]"
        >
          <ArrowLeft size={15} /> Home
        </Link>

        <div className="w-full max-w-[400px]">
          <div className="mb-8 lg:hidden flex flex-col items-center text-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--sunshine-500)] text-white mb-4">
              <Wallet size={22} />
            </div>
            <h1 className="editorial text-[28px]">Welcome back</h1>
          </div>

          <div className="hidden lg:block mb-8">
            <h1 className="editorial text-[32px] leading-tight">Welcome back</h1>
            <p className="mt-2 text-[14px] text-[var(--black-400)]">Log in to your Espanafonica account.</p>
          </div>

          <LoginForm />

          <p className="mt-6 text-center text-[13px] text-[var(--black-400)]">
            No account?{" "}
            <Link href="/register" className="font-semibold text-[var(--ginger-600)] hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
