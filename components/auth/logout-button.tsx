"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[13.5px] font-semibold text-[var(--black-400)] transition-colors hover:bg-[var(--red-50)] hover:text-[var(--red-600)] disabled:opacity-50"
    >
      <LogOut size={18} strokeWidth={1.7} />
      {loading ? "Logging out..." : "Log out"}
    </button>
  );
}
