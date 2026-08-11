import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const SEED = {
  user: {
    email: "owner@demo.espanafonica",
    password: "DemoPass123",
    firstName: "Demo",
    lastName: "Owner",
    companyName: "Demo Ledger SL",
  },
  settings: {
    legalBusinessName: "Demo Ledger SL",
    registrationNumber: "B12345678",
    taxId: "ESB12345678",
    businessAddress: "Calle Mayor 1, 28013 Madrid, Spain",
    baseCurrency: "EUR",
    financialYearEnd: "12-31",
  },
};

async function main() {
  const passwordHash = await bcrypt.hash(SEED.user.password, 12);

  const user = await prisma.user.upsert({
    where: { email: SEED.user.email },
    update: {
      passwordHash,
      firstName: SEED.user.firstName,
      lastName: SEED.user.lastName,
      companyName: SEED.user.companyName,
    },
    create: {
      email: SEED.user.email,
      passwordHash,
      firstName: SEED.user.firstName,
      lastName: SEED.user.lastName,
      companyName: SEED.user.companyName,
    },
  });

  await prisma.userSettings.upsert({
    where: { userId: user.id },
    update: SEED.settings,
    create: {
      userId: user.id,
      ...SEED.settings,
    },
  });

  console.log("Seed complete.");
  console.log(`  Login: ${SEED.user.email} / ${SEED.user.password}`);
  console.log(`  Dashboard: http://localhost:3000/dashboard`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
