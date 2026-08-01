import { redirect } from "next/navigation";
import { Sidebar, TopHeader } from "@/components/dashboard-shell";
import { getUserById } from "@/lib/auth";
import { getSession } from "@/lib/session";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const user = getUserById(session.userId);
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg-page)] text-[var(--fg-primary)]">
      <Sidebar user={user} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopHeader user={user} />
        <main className="flex-1 overflow-y-auto scroll-thin p-8">
          <div className="mx-auto max-w-[1120px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
