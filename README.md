# VigiWatch

VigiWatch (product line: ShieldWatch) is a CCTV infrastructure assurance and
AMC (Annual Maintenance Contract) operations platform. It monitors the health
of customer CCTV/DVR/NVR infrastructure and manages the service operations
(visits, incidents, certificates) built around that infrastructure.

This is the initial project scaffold: folder structure and base configuration
only. No business logic, dashboards, or mock data have been implemented yet.

## System overview

The system is made up of three parts:

1. **VigiWatch cloud/web app** (this repo's root — Next.js) — the SaaS
   application customers and technicians use.
2. **Supabase** — backend, database, and auth layer for the cloud app.
3. **edge-agent** (`edge-agent/`) — a separate process that runs inside each
   customer's local network, talks to their CCTV/DVR/NVR hardware, and
   reports normalized health data back to the cloud.

```
VigiWatch (cloud app)  <──HTTPS──  edge-agent (customer network)
        │                                  │
        ▼                                  ▼
    Supabase                    Vendor-specific hardware
 (DB / Auth / API)          (Hikvision, Dahua, Uniview, ONVIF, ...)
```

## Architecture rules

1. The Next.js app is the VigiWatch cloud/web application.
2. Supabase is the backend/database/auth layer.
3. `edge-agent` is a separate local process that runs inside the customer's
   network — it is not deployed as part of the web app.
4. Vendor-specific CCTV/DVR/NVR API logic lives only inside `edge-agent`'s
   adapters, never inside the Next.js app.
5. The cloud application only ever deals with normalized, vendor-independent
   health data.
6. Supabase service-role credentials and CCTV recorder credentials are never
   exposed to browser/client code.
7. Client, technician, and shared UI code are kept separate.
8. Feature-specific logic lives inside its corresponding `features/*` folder
   rather than in generic utilities.

## Folder structure

```
src/
  app/            Next.js App Router routes
    (auth)/       Authentication routes
    (client)/     Client-facing routes
    (technician)/ Technician-facing routes
    api/          Route handlers
  components/
    ui/           Generic, reusable UI primitives
    client/       Client-specific components
    technician/   Technician-specific components
    shared/       Shared components
  lib/
    supabase/     Supabase client/server/middleware setup
    types/        Shared cross-cutting types
    utils/        Generic utilities
  features/       Feature modules (sites, monitoring, incidents, service, certificates)
  hooks/          Shared React hooks
  config/         App-level configuration

edge-agent/       Separate local process — see edge-agent/README.md
supabase/         Database migrations and seed scripts (schema managed separately)
docs/             Architecture, API, and edge-agent documentation
```

## Getting started

### Web app

```bash
npm install
cp .env.example .env.local   # fill in Supabase credentials
npm run dev
```

### Edge agent

```bash
cd edge-agent
npm install
cp .env.example .env         # fill in agent credentials
npm run dev
```

## Status

This is a scaffold-only commit: structure and configuration, no product
functionality yet.
