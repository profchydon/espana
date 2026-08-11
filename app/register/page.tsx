import Link from "next/link";
import { Wallet, ArrowLeft } from "lucide-react";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
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
            Start with a clean ledger.
          </h1>
          <p className="mt-4 max-w-[340px] text-[15px] leading-relaxed text-white/75">
            Create your account and get invoices, expenses, and banking in one place — EUR by default.
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

        <div className="w-full max-w-[440px]">
          <div className="mb-8 lg:hidden flex flex-col items-center text-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--sunshine-500)] text-white mb-4">
              <Wallet size={22} />
            </div>
            <h1 className="editorial text-[28px]">Create account</h1>
          </div>

          <div className="hidden lg:block mb-8">
            <h1 className="editorial text-[32px] leading-tight">Create account</h1>
            <p className="mt-2 text-[14px] text-[var(--black-400)]">Set up your business ledger in minutes.</p>
          </div>

          <RegisterForm />

          <p className="mt-6 text-center text-[13px] text-[var(--black-400)]">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-[var(--ginger-600)] hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
