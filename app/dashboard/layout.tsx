import { Sidebar, TopHeader } from "@/components/dashboard-shell";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg-page)] text-[var(--fg-primary)]">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopHeader />
        <main className="flex-1 overflow-y-auto scroll-thin p-8">
          <div className="mx-auto max-w-[1120px]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
