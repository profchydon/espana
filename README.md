# Espanafonica

Accounting SaaS ledger — invoices, expenses, bank reconciliation, and dashboard. Built with Next.js 16, PostgreSQL, Prisma, and Redis.

## Quick start (Docker)

```bash
cp .env.example .env
chmod +x run.sh
./run.sh build
./run.sh up
```

- **App:** http://localhost:3000  
- **Demo login:** `owner@demo.espanafonica` / `DemoPass123`

See [setup.md](./setup.md) for full documentation.

## Local development

```bash
cp .env.example .env
docker compose -f docker/docker-compose.yml up -d postgres redis
bun install
bun run db:setup
bun run dev
```

## Scripts

| Script | Description |
|--------|-------------|
| `./run.sh up` | Start full Docker stack (includes seeder) |
| `./run.sh seed` | Re-run database push + seed |
| `bun run db:setup` | Push schema + seed from host |
| `bun run dev` | Next.js dev server |
