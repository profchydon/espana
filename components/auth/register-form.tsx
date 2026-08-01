"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.get("firstName"),
          lastName: formData.get("lastName"),
          companyName: formData.get("companyName"),
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Unable to create account.");
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

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="label">
            First name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="input"
            placeholder="Jane"
            autoComplete="given-name"
            required
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="lastName" className="label">
            Last name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="input"
            placeholder="Doe"
            autoComplete="family-name"
            required
            disabled={loading}
          />
        </div>
      </div>

      <div>
        <label htmlFor="companyName" className="label">
          Company name
        </label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          className="input"
          placeholder="Acme Inc."
          autoComplete="organization"
          required
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor="email" className="label">
          Work email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="input"
          placeholder="jane@acme.com"
          autoComplete="email"
          required
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor="password" className="label">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="input"
          placeholder="••••••••"
          autoComplete="new-password"
          minLength={8}
          required
          disabled={loading}
        />
        <p className="help">Must be at least 8 characters.</p>
      </div>

      <button type="submit" className="btn btn-primary mt-2 w-full justify-center" disabled={loading}>
        {loading ? "Creating account..." : "Create account"}
      </button>

      <p className="mt-2 text-center text-[12px] text-[var(--black-400)]">
        By clicking &quot;Create account&quot;, you agree to our{" "}
        <Link href="#" className="underline hover:text-[var(--black-900)]">
          Terms
        </Link>{" "}
        and{" "}
        <Link href="#" className="underline hover:text-[var(--black-900)]">
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}
