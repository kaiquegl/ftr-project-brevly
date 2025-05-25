Bem vindo ao projeto Brev.ly encurtador de links;

# Getting Started

Para rodar a aplicação, comece pelo SERVER:
- Obrigatório ter docker na máquina.

```bash
docker compose -f ./docker/compose.yaml up -d
pnpm install
pnpm run db:generate
pnpm run db:migrate
pnpm dev
```

Depois rode a aplicação WEB

```bash
pnpm install
pnpm dev
```
