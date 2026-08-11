import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createDefaultSettings } from "@/lib/settings";

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  companyName: string;
  createdAt: string;
};

function mapUser(user: {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  companyName: string;
  createdAt: Date;
}): User {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    companyName: user.companyName,
    createdAt: user.createdAt.toISOString(),
  };
}

export async function getUserByEmail(
  email: string
): Promise<(User & { passwordHash: string }) | null> {
  const user = await prisma.user.findUnique({
    where: { email: email.trim().toLowerCase() },
  });

  if (!user) return null;

  return {
    ...mapUser(user),
    passwordHash: user.passwordHash,
  };
}

export async function getUserById(id: string): Promise<User | null> {
  const user = await prisma.user.findUnique({ where: { id } });
  return user ? mapUser(user) : null;
}

export async function createUser(input: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  companyName: string;
}): Promise<User> {
  const email = input.email.trim().toLowerCase();
  const passwordHash = await bcrypt.hash(input.password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      firstName: input.firstName.trim(),
      lastName: input.lastName.trim(),
      companyName: input.companyName.trim(),
    },
  });

  await createDefaultSettings(user.id, user.companyName);

  return mapUser(user);
}

export async function verifyPassword(password: string, passwordHash: string) {
  return bcrypt.compare(password, passwordHash);
}
