# Bistro Bliss E2E Test Suite Status: READY

## Overview
The requirement-driven 4-tier E2E integration test suite for the Bistro Bliss monorepo is fully installed, configured, and ready for execution via Playwright (`@playwright/test`).

## Monorepo Configuration
- **Playwright Config**: `playwright.config.js`
- **Base URL**: `http://localhost:3000`
- **Dual WebServer Auto-Spin**:
  - Backend API: `pnpm dev:backend` (port `3001`)
  - Frontend SPA: `pnpm dev:frontend` (port `3000`)

## Test Suite Inventory (46 Total Specs)
| Tier | Spec File | Purpose | Case Count |
|------|-----------|---------|:----------:|
| Tier 1 | `tests/e2e/tier1-feature-coverage.spec.js` | Auth, Menu browsing, Booking submission, Customer my-bookings, Admin reservation accept/reject, Admin menu CRUD, Admin user management | 17 |
| Tier 2 | `tests/e2e/tier2-boundary.spec.js` | Form validation errors, invalid/expired JWT, unauthenticated protected route access, non-admin access blocks | 16 |
| Tier 3 | `tests/e2e/tier3-cross-feature.spec.js` | Multi-role workflows (Customer books -> Admin approves -> Customer live status change; Admin adds/deletes dish -> Customer catalog sync) | 8 |
| Tier 4 | `tests/e2e/tier4-real-world.spec.js` | Concurrent requests, session invalidation, database seed reset recovery, end-to-end user & admin lifecycle | 5 |

## Execution Commands
- **Run Full E2E Suite**: `pnpm run test:e2e` (or `npx playwright test`)
- **Run Tier 1**: `pnpm run test:e2e:tier1`
- **Run Tier 2**: `pnpm run test:e2e:tier2`
- **Run Tier 3**: `pnpm run test:e2e:tier3`
- **Run Tier 4**: `pnpm run test:e2e:tier4`
