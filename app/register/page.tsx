import Link from "next/link";
import { Wallet, ArrowLeft } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg-page)] items-center justify-center p-6 py-12">
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-sm font-medium text-[var(--black-400)] hover:text-[var(--black-900)] transition-colors">
        <ArrowLeft size={16} /> Back to home
      </Link>
      
      <div className="w-full max-w-[480px]">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--sunshine-500)] text-white mb-6 shadow-sm">
            <Wallet size={24} />
          </div>
          <h1 className="editorial text-[32px] leading-tight mb-2">Create your account</h1>
          <p className="text-[15px] text-[var(--black-400)]">Start automating your bookkeeping in minutes.</p>
        </div>

        <form className="card flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="label">First name</label>
              <input type="text" id="firstName" className="input" placeholder="Jane" required />
            </div>
            <div>
              <label htmlFor="lastName" className="label">Last name</label>
              <input type="text" id="lastName" className="input" placeholder="Doe" required />
            </div>
          </div>

          <div>
            <label htmlFor="company" className="label">Company name</label>
            <input type="text" id="company" className="input" placeholder="Acme Inc." required />
          </div>
          
          <div>
            <label htmlFor="email" className="label">Work email</label>
            <input type="email" id="email" className="input" placeholder="jane@acme.com" required />
          </div>
          
          <div>
            <label htmlFor="password" className="label">Password</label>
            <input type="password" id="password" className="input" placeholder="••••••••" required />
            <p className="help">Must be at least 8 characters.</p>
          </div>

          <Link href="/dashboard" className="btn btn-primary w-full mt-2 justify-center">
            Create account
          </Link>
          
          <p className="text-center text-[12px] text-[var(--black-400)] mt-2">
            By clicking "Create account", you agree to our{" "}
            <Link href="#" className="underline hover:text-[var(--black-900)]">Terms</Link> and{" "}
            <Link href="#" className="underline hover:text-[var(--black-900)]">Privacy Policy</Link>.
          </p>
        </form>

        <div className="mt-8 text-center text-sm text-[var(--black-400)]">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-[var(--ginger-600)] hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
