function readString(key: string, defaultValue: string): string {
  const value = process.env[key];
  return value && value.trim() !== "" ? value.trim() : defaultValue;
}

function readNumber(key: string, defaultValue: number): number {
  const value = process.env[key];
  if (!value || value.trim() === "") return defaultValue;

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : defaultValue;
}

function readBoolean(key: string, defaultValue: boolean): boolean {
  const value = process.env[key];
  if (!value || value.trim() === "") return defaultValue;

  return value === "true" || value === "1";
}

const nodeEnv = readString("NODE_ENV", "development");

export const env = {
  nodeEnv,
  isProduction: nodeEnv === "production",
  authSecret: readString("AUTH_SECRET", "dev-secret-change-in-production"),
  databasePath: readString("DATABASE_PATH", "espanafonica.db"),
  sessionMaxAgeDays: readNumber("SESSION_MAX_AGE_DAYS", 7),
  sessionCookieSecure: readBoolean("SESSION_COOKIE_SECURE", nodeEnv === "production"),
  appUrl: readString("APP_URL", "http://localhost:3000"),
};
