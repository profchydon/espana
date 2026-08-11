import { prisma } from "@/lib/prisma";

export type UserSettings = {
  userId: string;
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

function mapSettings(settings: {
  userId: string;
  legalBusinessName: string;
  registrationNumber: string;
  taxId: string;
  businessAddress: string;
  baseCurrency: string;
  financialYearEnd: string;
  updatedAt: Date;
}): UserSettings {
  return {
    userId: settings.userId,
    legalBusinessName: settings.legalBusinessName,
    registrationNumber: settings.registrationNumber,
    taxId: settings.taxId,
    businessAddress: settings.businessAddress,
    baseCurrency: settings.baseCurrency as UserSettings["baseCurrency"],
    financialYearEnd: settings.financialYearEnd as UserSettings["financialYearEnd"],
    updatedAt: settings.updatedAt.toISOString(),
  };
}

export async function createDefaultSettings(userId: string, companyName: string) {
  await prisma.userSettings.upsert({
    where: { userId },
    update: {},
    create: {
      userId,
      legalBusinessName: companyName,
      ...DEFAULT_SETTINGS,
    },
  });
}

export async function getSettings(userId: string, companyName?: string): Promise<UserSettings> {
  let settings = await prisma.userSettings.findUnique({ where: { userId } });

  if (!settings) {
    await createDefaultSettings(userId, companyName ?? "My Business");
    settings = await prisma.userSettings.findUnique({ where: { userId } });
  }

  if (!settings) {
    throw new Error("Failed to load user settings.");
  }

  return mapSettings(settings);
}

export async function updateSettings(
  userId: string,
  input: Omit<UserSettings, "userId" | "updatedAt">
) {
  const settings = await prisma.userSettings.update({
    where: { userId },
    data: {
      legalBusinessName: input.legalBusinessName.trim(),
      registrationNumber: input.registrationNumber.trim(),
      taxId: input.taxId.trim(),
      businessAddress: input.businessAddress.trim(),
      baseCurrency: input.baseCurrency,
      financialYearEnd: input.financialYearEnd,
    },
  });

  return mapSettings(settings);
}

export async function resetSettings(userId: string, companyName: string) {
  const settings = await prisma.userSettings.update({
    where: { userId },
    data: {
      legalBusinessName: companyName,
      ...DEFAULT_SETTINGS,
    },
  });

  return mapSettings(settings);
}
