# VigiWatch Edge Agent

A local process that runs inside a customer's network to talk to CCTV/DVR/NVR
hardware and report normalized, vendor-independent health data to the
VigiWatch cloud application. This codebase is intentionally separate from the
Next.js web app — it is deployed and run on-premise, not in the browser or in
the cloud app's server runtime.

## Responsibilities

- Discover devices on the local network (`src/discovery`).
- Talk to vendor-specific hardware through dedicated adapters (`src/adapters/*`),
  isolating all vendor SDK/API quirks from the rest of the system.
- Normalize raw vendor responses into a single, vendor-independent health data
  shape (`src/health`) before anything leaves the local network.
- Execute commands issued by the cloud (`src/commands`), e.g. re-check a device.
- Load local configuration, including recorder credentials, without ever
  exposing them outside this process (`src/config`).

## Architecture rules

1. Vendor-specific CCTV/DVR/NVR API logic lives **only** here, never in the
   Next.js app.
2. The cloud application only ever receives normalized, vendor-independent
   health data from this agent — never raw vendor payloads.
3. Local recorder credentials and any Supabase service-role credentials must
   never be exposed to browser/client code.

## Getting started

```bash
cd edge-agent
npm install
npm run dev
```

No business logic is implemented yet — this is structure only.
