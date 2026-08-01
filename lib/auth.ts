import bcrypt from "bcryptjs";
import { getDb } from "@/lib/db";
import { createDefaultSettings } from "@/lib/settings";

export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  companyName: string;
  createdAt: string;
};

type UserRow = {
  id: number;
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  company_name: string;
  created_at: string;
};

function mapUser(row: UserRow): User {
  return {
    id: row.id,
    email: row.email,
    firstName: row.first_name,
    lastName: row.last_name,
    companyName: row.company_name,
    createdAt: row.created_at,
  };
}

export function getUserByEmail(email: string): (User & { passwordHash: string }) | null {
  const row = getDb()
    .prepare(
      `SELECT id, email, password_hash, first_name, last_name, company_name, created_at
       FROM users WHERE email = ?`
    )
    .get(email.trim().toLowerCase()) as UserRow | undefined;

  if (!row) return null;

  return {
    ...mapUser(row),
    passwordHash: row.password_hash,
  };
}

export function getUserById(id: number): User | null {
  const row = getDb()
    .prepare(
      `SELECT id, email, first_name, last_name, company_name, created_at
       FROM users WHERE id = ?`
    )
    .get(id) as Omit<UserRow, "password_hash"> | undefined;

  return row ? mapUser({ ...row, password_hash: "" }) : null;
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

  const result = getDb()
    .prepare(
      `INSERT INTO users (email, password_hash, first_name, last_name, company_name)
       VALUES (?, ?, ?, ?, ?)`
    )
    .run(
      email,
      passwordHash,
      input.firstName.trim(),
      input.lastName.trim(),
      input.companyName.trim()
    );

  const user = getUserById(Number(result.lastInsertRowid));
  if (!user) {
    throw new Error("Failed to create user.");
  }

  createDefaultSettings(user.id, user.companyName);

  return user;
}

export async function verifyPassword(password: string, passwordHash: string) {
  return bcrypt.compare(password, passwordHash);
}
