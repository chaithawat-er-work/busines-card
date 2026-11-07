# Project conventions

- Use Next.js App Router, strict TypeScript, Tailwind CSS, and static export (`out/`).
- Keep all owner details in `src/config/profile.ts`. Never invent credentials, job titles, portraits, or official logos.
- Use a neutral portrait placeholder until the owner supplies a photograph.
- Canonical URLs come only from `NEXT_PUBLIC_SITE_URL`, never the browser location. Reject local, private, reserved, and known preview hosts. QR and URL sharing stay unavailable until configured.
- Do not publish or connect a public GitHub account without the owner's approval of provider and exact public URL. Never buy services.
- No tracking, analytics, authentication, database, or external font requests.
- Preserve keyboard access, visible focus, touch targets, contrast, and reduced-motion support.
- Use pnpm. Run `pnpm test`, `pnpm typecheck`, and `pnpm build` after functional changes.
- Keep generated `.next/`, `out/`, and dependencies out of source control.
