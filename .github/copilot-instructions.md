<!-- Short, focused instructions for AI coding agents working on this repo -->
# Guidance for AI coding agents

This repository is an Angular 20 application with server-side rendering (SSR) using @angular/ssr and an Express server. Keep instructions short and actionable and reference concrete files below.

- Project entry points
  - Client bootstrap: `src/main.ts`
  - SSR server: `src/server.ts` (uses `@angular/ssr/node` and exports `reqHandler`)
  - Application root component: `src/app/app.ts`

- Build & run (developer workflows)
  - Dev server: `npm start` (runs `ng serve` per `package.json`). Use `ng serve` for quick iteration.
  - Production SSR runtime (after build): `node dist/condo-admin-simpleto/server/server.mjs` (script: `serve:ssr:condo-admin-simpleto`)
  - Tests: `npm test` (runs `ng test` / Karma)

- Architecture & patterns
  - Angular 20 with standalone components. Many components are declared `standalone: true` (examples: `src/app/core/dashboard/dashboard.component.ts`, `src/app/core/condominios/condominios.component.ts`). Prefer adding imports via the component's `imports` array rather than NgModule where possible.
  - Application configuration is split between browser and server:
    - Browser config: `src/app/app.config.ts`
    - Server config (SSR): `src/app/app.config.server.ts` and `src/app/app.routes.server.ts` (prerender all routes by default).
  - Routing: `src/app/app.routes.ts` defines app routes (dashboard, condominios).
  - Tenant pattern: requests pass an `X-Owner-Id` header set by `src/app/core/tenant.interceptor.ts`, which reads the owner id from `TenantService` (`src/app/core/tenant.service.ts`) backed by localStorage.
  - Services: Most services are provided either at root (`@Injectable({ providedIn: 'root' })`) or component-level via `providers` in the component decorator (see `DashboardComponent` provider example).

- Styling & assets
  - Global styles: `src/styles.scss` (also `src/app/app.scss` for app-scoped styles).
  - Tailwind may be present (`tailwindcss` is a dependency) but styles are SCSS by default; prefer existing SCSS files when editing components.

- Tests & linting
  - Unit tests run with Karma (`ng test`). Tests live alongside source files (e.g. `src/app/app.spec.ts`).

- Integration points & external dependencies
  - The Express server in `src/server.ts` serves the SSR bundle and can define API endpoints. When adding backend endpoints, follow the pattern already present (static assets + fallback to Angular rendering).
  - External libraries of note: `@angular/ssr`, `@angular/material`, `tailwindcss`, `express`, `uuid`.

- Helpful concrete examples to copy
  - Tenant header injection: see `src/app/core/tenant.interceptor.ts` and `src/app/core/tenant.service.ts`.
  - Standalone component + provider pattern: see `src/app/core/dashboard/dashboard.component.ts`.
  - SSR server handler and startup: `src/server.ts` exports `reqHandler` and starts the Express server when run directly.

- Editing & PR guidance for agents
  - Keep changes minimal and focused. For UI changes, prefer editing standalone component templates (`.html`) and styles (`.scss`), and update the component's `imports` array if new modules are needed.
  - When adding an HTTP call that should include tenant context, rely on `tenantInterceptor` to attach `X-Owner-Id` rather than manually reading localStorage.
  - If you modify server-side rendering behavior, update `src/app/app.config.server.ts` and `src/app/app.routes.server.ts` accordingly and ensure `reqHandler` still serves the app.

If anything in this file is unclear or you'd like more examples (tests, CI, or how SSR is bundled), tell me which area to expand.
