import Link from "next/link";
import { Wallet, ArrowLeft } from "lucide-react";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg-page)] items-center justify-center p-6">
      <Link
        href="/"
        className="absolute top-8 left-8 flex items-center gap-2 text-sm font-medium text-[var(--black-400)] hover:text-[var(--black-900)] transition-colors"
      >
        <ArrowLeft size={16} /> Back to home
      </Link>

      <div className="w-full max-w-[420px]">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--sunshine-500)] text-white mb-6 shadow-sm">
            <Wallet size={24} />
          </div>
          <h1 className="editorial text-[32px] leading-tight mb-2">Welcome back</h1>
          <p className="text-[15px] text-[var(--black-400)]">
            Log in to manage your Espanafonica account.
          </p>
        </div>

        <LoginForm />

        <div className="mt-8 text-center text-sm text-[var(--black-400)]">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-medium text-[var(--ginger-600)] hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
