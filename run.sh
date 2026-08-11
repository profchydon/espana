#!/usr/bin/env bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"
COMPOSE="docker compose --env-file .env -f docker/docker-compose.yml"

CMD="${1:-up}"

check_env() {
  if [[ "$CMD" == "up" || "$CMD" == "build" || "$CMD" == "rebuild" || "$CMD" == "seed" ]]; then
    if [[ ! -f ".env" ]]; then
      echo "Error: .env not found."
      [[ -f ".env.example" ]] && echo "  Run: cp .env.example .env"
      exit 1
    fi
  fi
}

case "$CMD" in
  up)
    check_env
    echo "Starting Espanafonica stack..."
    $COMPOSE up -d
    echo ""
    echo "Services started:"
    echo "  App:        http://localhost:3000"
    echo "  PostgreSQL: localhost:5434"
    echo "  Redis:      localhost:6379"
    echo ""
    echo "Demo login: owner@demo.espanafonica / DemoPass123"
    echo "Dashboard:  http://localhost:3000/dashboard"
    echo ""
    echo "Run './run.sh logs' to follow logs."
    ;;
  down)
    echo "Stopping Espanafonica stack..."
    $COMPOSE down
    ;;
  build)
    check_env
    echo "Building images..."
    $COMPOSE build --no-cache
    echo "Build complete. Run './run.sh up' to start."
    ;;
  rebuild)
    check_env
    echo "Rebuilding and starting..."
    $COMPOSE up -d --build
    ;;
  seed)
    check_env
    echo "Running database push + seed..."
    $COMPOSE run --rm db-setup
    echo "Seed complete."
    ;;
  logs)
    $COMPOSE logs -f "${@:2}"
    ;;
  *)
    echo "Usage: $0 {up|down|build|rebuild|seed|logs}"
    echo ""
    echo "  up      - Start all services (default; runs db-setup + seed on first start)"
    echo "  down    - Stop all services"
    echo "  build   - Build images without cache"
    echo "  rebuild - Rebuild and start"
    echo "  seed    - Re-run prisma db push + seed"
    echo "  logs    - Follow logs (pass service names for specific services)"
    exit 1
    ;;
esac
