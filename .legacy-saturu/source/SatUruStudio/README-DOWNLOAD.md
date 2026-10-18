# SatUru Studio — project download

This archive contains the website source, its production frontend build, the API source, and the shared workspace packages needed by the app. It does not contain `node_modules`, credentials, or a database.

## View the built website

Install Node.js 22 and pnpm, then run these commands from this folder:

```sh
pnpm install
PORT=24803 BASE_PATH=/ pnpm --filter @workspace/saturu-studio run serve
```

Open `http://localhost:24803`. On Windows PowerShell, set the variables first:

```powershell
$env:PORT = "24803"
$env:BASE_PATH = "/"
pnpm --filter @workspace/saturu-studio run serve
```

## What needs backend configuration

The visual website can be previewed without the backend. Login, registration, password reset, dashboard data, and database-backed messaging require the API server and PostgreSQL. Configure `DATABASE_URL` and a private `SESSION_SECRET`; then run `pnpm --filter @workspace/db run push` and start the API server with `PORT` set. The website uses same-origin `/api` requests, so a local full-stack setup must route `/api` to the API server.

The order request form opens the visitor's email application; it does not send data to a server.

## Contents

- `artifacts/saturu-studio/src` — website source
- `artifacts/saturu-studio/dist/public` — production frontend build
- `artifacts/api-server/src` — API source
- `lib/` — shared API/database workspace packages
- root pnpm workspace and lock files
