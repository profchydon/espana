"use client";

import { RotateCcw, Save } from "lucide-react";
import { FormEvent, useState } from "react";
import type { UserSettings } from "@/lib/settings";

type SettingsFormProps = {
  initialSettings: UserSettings;
};

export function SettingsForm({ initialSettings }: SettingsFormProps) {
  const [settings, setSettings] = useState(initialSettings);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          legalBusinessName: formData.get("legalBusinessName"),
          registrationNumber: formData.get("registrationNumber"),
          taxId: formData.get("taxId"),
          businessAddress: formData.get("businessAddress"),
          baseCurrency: formData.get("baseCurrency"),
          financialYearEnd: formData.get("financialYearEnd"),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Unable to save settings.");
        return;
      }

      setSettings(data.settings);
      setSuccess("Settings saved.");
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleReset() {
    setError("");
    setSuccess("");
    setResetting(true);

    try {
      const response = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reset: true }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Unable to reset settings.");
        return;
      }

      setSettings(data.settings);
      setSuccess("Settings reset to defaults.");
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setResetting(false);
    }
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit} key={settings.updatedAt}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Settings</h1>
          <p className="page-desc">Business profile and financial preferences.</p>
        </div>
        <div className="page-actions">
          <button
            type="button"
            className="btn btn-outline"
            onClick={handleReset}
            disabled={resetting || saving}
          >
            <RotateCcw size={16} />
            {resetting ? "Resetting..." : "Reset to defaults"}
          </button>
          <button type="submit" className="btn btn-primary" disabled={saving || resetting}>
            <Save size={16} />
            {saving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </div>

      {error ? (
        <p className="rounded-md border border-[var(--red-200)] bg-[var(--red-50)] px-3 py-2 text-[13px] text-[var(--red-700)]">
          {error}
        </p>
      ) : null}

      {success ? (
        <p className="rounded-md border border-[var(--green-200)] bg-[var(--green-50)] px-3 py-2 text-[13px] text-[var(--green-700)]">
          {success}
        </p>
      ) : null}

      <div className="panel">
        <div className="panel-body flex flex-col gap-6">
        <h2 className="text-[16px] font-bold border-b border-[var(--black-100)] pb-4">
          Business details
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <label htmlFor="legalBusinessName" className="label">
              Legal business name
            </label>
            <input
              type="text"
              id="legalBusinessName"
              name="legalBusinessName"
              className="input"
              defaultValue={settings.legalBusinessName}
              required
              disabled={saving || resetting}
            />
          </div>

          <div>
            <label htmlFor="registrationNumber" className="label">
              Registration number
            </label>
            <input
              type="text"
              id="registrationNumber"
              name="registrationNumber"
              className="input"
              defaultValue={settings.registrationNumber}
              placeholder="Optional"
              disabled={saving || resetting}
            />
          </div>

          <div>
            <label htmlFor="taxId" className="label">
              Tax identification number
            </label>
            <input
              type="text"
              id="taxId"
              name="taxId"
              className="input"
              defaultValue={settings.taxId}
              placeholder="Optional"
              disabled={saving || resetting}
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="businessAddress" className="label">
              Business address
            </label>
            <textarea
              id="businessAddress"
              name="businessAddress"
              className="textarea min-h-[80px]"
              defaultValue={settings.businessAddress}
              placeholder="Optional"
              disabled={saving || resetting}
            />
          </div>
        </div>

        <h2 className="text-[16px] font-bold border-b border-[var(--black-100)] pb-4 mt-2">
          Financial preferences
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="baseCurrency" className="label">
              Base currency
            </label>
            <select
              id="baseCurrency"
              name="baseCurrency"
              className="select"
              defaultValue={settings.baseCurrency}
              disabled={saving || resetting}
            >
              <option value="EUR">Euro (€)</option>
              <option value="USD">US Dollar ($)</option>
              <option value="GBP">British Pound (£)</option>
            </select>
          </div>

          <div>
            <label htmlFor="financialYearEnd" className="label">
              Financial year end
            </label>
            <select
              id="financialYearEnd"
              name="financialYearEnd"
              className="select"
              defaultValue={settings.financialYearEnd}
              disabled={saving || resetting}
            >
              <option value="12-31">December 31</option>
              <option value="03-31">March 31</option>
              <option value="06-30">June 30</option>
              <option value="09-30">September 30</option>
            </select>
          </div>
        </div>
        </div>
      </div>
    </form>
  );
}
