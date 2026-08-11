# Espanafonica — Setup Guide

Run the accounting SaaS locally or in production with Docker (PostgreSQL + Redis + one-shot seeder).

---

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and Docker Compose
- [Bun](https://bun.sh) 1.x (for local dev scripts outside Docker)

---

## Quick start (Docker)

```bash
cp .env.example .env
chmod +x run.sh
./run.sh build
./run.sh up
```

Open **http://localhost:3000**

**Demo account** (created by seeder):

| Field | Value |
|-------|-------|
| Email | `owner@demo.espanafonica` |
| Password | `DemoPass123` |

---

## `run.sh` commands

| Command | Description |
|---------|-------------|
| `./run.sh up` | Start Postgres, Redis, run db push + seed, then app |
| `./run.sh down` | Stop all services |
| `./run.sh build` | Build Docker images |
| `./run.sh rebuild` | Rebuild and start |
| `./run.sh seed` | Re-run `prisma db push` + seed (db-setup container) |
| `./run.sh logs` | Follow container logs |

---

## Local development (DB in Docker, app on host)

```bash
cp .env.example .env
docker compose -f docker/docker-compose.yml up -d postgres redis
bun install
bun run db:setup    # push schema + seed
bun run dev
```

---

## Environment variables

| Variable | Purpose | Default |
|----------|---------|---------|
| `DATABASE_URL` | Postgres connection (host) | `postgresql://postgres:postgres@localhost:5434/acct` |
| `REDIS_URL` | Redis connection | `redis://localhost:6379` |
| `AUTH_SECRET` | JWT session signing | Change in production |
| `APP_URL` | Public app URL | `http://localhost:3000` |
| `AUTH_TRUST_HOST` | Required in Docker / behind proxy | `true` |
| `SESSION_MAX_AGE_DAYS` | Session cookie lifetime | `7` |

Generate a production secret:

```bash
openssl rand -base64 32
```

**Docker note:** The `app` container overrides `DATABASE_URL` and `REDIS_URL` to use internal hostnames (`postgres`, `redis`). Keep `.env` pointed at `localhost:5434` for host-side Prisma commands.

---

## Database & seeder

- Schema: `prisma/schema.prisma` (PostgreSQL via Prisma)
- Seeder: `prisma/seed.ts` — idempotent demo user + settings
- Applied automatically by the `db-setup` container on `./run.sh up`

Manual seed from host:

```bash
bun run db:setup
# or
./run.sh seed
```

---

## Stack

| Service | Container | Host port |
|---------|-----------|-----------|
| App | `acct-app` | 3000 |
| PostgreSQL | `acct-postgres` | 5434 |
| Redis | `acct-redis` | 6379 |
| DB setup (one-shot) | `acct-db-setup` | — |
