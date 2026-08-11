import { NextResponse } from "next/server";
import { getUserById } from "@/lib/auth";
import { getSession } from "@/lib/session";
import { getSettings, resetSettings, updateSettings } from "@/lib/settings";

const CURRENCIES = new Set(["EUR", "USD", "GBP"]);
const YEAR_ENDS = new Set(["12-31", "03-31", "06-30", "09-30"]);

async function requireUser() {
  const session = await getSession();
  if (!session) return null;

  const user = await getUserById(session.userId);
  if (!user) return null;

  return user;
}

export async function GET() {
  const user = await requireUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const settings = await getSettings(user.id, user.companyName);
  return NextResponse.json({ settings });
}

export async function PUT(request: Request) {
  const user = await requireUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = await request.json();

    if (body.reset === true) {
      const settings = await resetSettings(user.id, user.companyName);
      return NextResponse.json({ settings });
    }

    const legalBusinessName =
      typeof body.legalBusinessName === "string" ? body.legalBusinessName : "";
    const registrationNumber =
      typeof body.registrationNumber === "string" ? body.registrationNumber : "";
    const taxId = typeof body.taxId === "string" ? body.taxId : "";
    const businessAddress =
      typeof body.businessAddress === "string" ? body.businessAddress : "";
    const baseCurrency = typeof body.baseCurrency === "string" ? body.baseCurrency : "EUR";
    const financialYearEnd =
      typeof body.financialYearEnd === "string" ? body.financialYearEnd : "12-31";

    if (!legalBusinessName.trim()) {
      return NextResponse.json({ error: "Legal business name is required." }, { status: 400 });
    }

    if (!CURRENCIES.has(baseCurrency)) {
      return NextResponse.json({ error: "Invalid base currency." }, { status: 400 });
    }

    if (!YEAR_ENDS.has(financialYearEnd)) {
      return NextResponse.json({ error: "Invalid financial year end." }, { status: 400 });
    }

    const settings = await updateSettings(user.id, {
      legalBusinessName,
      registrationNumber,
      taxId,
      businessAddress,
      baseCurrency: baseCurrency as "EUR" | "USD" | "GBP",
      financialYearEnd: financialYearEnd as "12-31" | "03-31" | "06-30" | "09-30",
    });

    return NextResponse.json({ settings });
  } catch {
    return NextResponse.json({ error: "Something went wrong. Try again." }, { status: 500 });
  }
}
