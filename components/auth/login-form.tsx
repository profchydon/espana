"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Unable to log in.");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="card flex flex-col gap-5" onSubmit={handleSubmit}>
      {error ? (
        <p className="rounded-md border border-[var(--red-200)] bg-[var(--red-50)] px-3 py-2 text-[13px] text-[var(--red-700)]">
          {error}
        </p>
      ) : null}

      <div>
        <label htmlFor="email" className="label">
          Email address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="input"
          placeholder="you@company.com"
          autoComplete="email"
          required
          disabled={loading}
        />
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label htmlFor="password" className="label !mb-0">
            Password
          </label>
          <Link href="#" className="text-[12px] font-medium text-[var(--ginger-600)] hover:underline">
            Forgot password?
          </Link>
        </div>
        <input
          type="password"
          id="password"
          name="password"
          className="input"
          placeholder="••••••••"
          autoComplete="current-password"
          required
          disabled={loading}
        />
      </div>

      <button type="submit" className="btn btn-primary mt-2 w-full justify-center" disabled={loading}>
        {loading ? "Logging in..." : "Log in"}
      </button>
    </form>
  );
}
