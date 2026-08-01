import { getDb } from "@/lib/db";

export type UserSettings = {
  userId: number;
  legalBusinessName: string;
  registrationNumber: string;
  taxId: string;
  businessAddress: string;
  baseCurrency: "EUR" | "USD" | "GBP";
  financialYearEnd: "12-31" | "03-31" | "06-30" | "09-30";
  updatedAt: string;
};

export const DEFAULT_SETTINGS = {
  registrationNumber: "",
  taxId: "",
  businessAddress: "",
  baseCurrency: "EUR" as const,
  financialYearEnd: "12-31" as const,
};

type SettingsRow = {
  user_id: number;
  legal_business_name: string;
  registration_number: string;
  tax_id: string;
  business_address: string;
  base_currency: string;
  financial_year_end: string;
  updated_at: string;
};

function mapSettings(row: SettingsRow): UserSettings {
  return {
    userId: row.user_id,
    legalBusinessName: row.legal_business_name,
    registrationNumber: row.registration_number,
    taxId: row.tax_id,
    businessAddress: row.business_address,
    baseCurrency: row.base_currency as UserSettings["baseCurrency"],
    financialYearEnd: row.financial_year_end as UserSettings["financialYearEnd"],
    updatedAt: row.updated_at,
  };
}

export function createDefaultSettings(userId: number, companyName: string) {
  getDb()
    .prepare(
      `INSERT OR IGNORE INTO user_settings (
        user_id, legal_business_name, registration_number, tax_id,
        business_address, base_currency, financial_year_end
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      userId,
      companyName,
      DEFAULT_SETTINGS.registrationNumber,
      DEFAULT_SETTINGS.taxId,
      DEFAULT_SETTINGS.businessAddress,
      DEFAULT_SETTINGS.baseCurrency,
      DEFAULT_SETTINGS.financialYearEnd
    );
}

export function getSettings(userId: number, companyName?: string): UserSettings {
  const row = getDb()
    .prepare(`SELECT * FROM user_settings WHERE user_id = ?`)
    .get(userId) as SettingsRow | undefined;

  if (!row) {
    createDefaultSettings(userId, companyName ?? "My Business");
    return getSettings(userId);
  }

  return mapSettings(row);
}

export function updateSettings(
  userId: number,
  input: Omit<UserSettings, "userId" | "updatedAt">
) {
  getDb()
    .prepare(
      `UPDATE user_settings SET
        legal_business_name = ?,
        registration_number = ?,
        tax_id = ?,
        business_address = ?,
        base_currency = ?,
        financial_year_end = ?,
        updated_at = datetime('now')
      WHERE user_id = ?`
    )
    .run(
      input.legalBusinessName.trim(),
      input.registrationNumber.trim(),
      input.taxId.trim(),
      input.businessAddress.trim(),
      input.baseCurrency,
      input.financialYearEnd,
      userId
    );

  return getSettings(userId);
}

export function resetSettings(userId: number, companyName: string) {
  getDb()
    .prepare(
      `UPDATE user_settings SET
        legal_business_name = ?,
        registration_number = ?,
        tax_id = ?,
        business_address = ?,
        base_currency = ?,
        financial_year_end = ?,
        updated_at = datetime('now')
      WHERE user_id = ?`
    )
    .run(
      companyName,
      DEFAULT_SETTINGS.registrationNumber,
      DEFAULT_SETTINGS.taxId,
      DEFAULT_SETTINGS.businessAddress,
      DEFAULT_SETTINGS.baseCurrency,
      DEFAULT_SETTINGS.financialYearEnd,
      userId
    );

  return getSettings(userId);
}
