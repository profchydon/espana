import { redirect } from "next/navigation";
import { SettingsForm } from "@/components/settings/settings-form";
import { getUserById } from "@/lib/auth";
import { getSession } from "@/lib/session";
import { getSettings } from "@/lib/settings";

export default async function SettingsPage() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const user = await getUserById(session.userId);
  if (!user) {
    redirect("/login");
  }

  const settings = await getSettings(user.id, user.companyName);

  return (
    <div className="max-w-[800px]">
      <SettingsForm initialSettings={settings} />
    </div>
  );
}
