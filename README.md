# Chaithawat Digital Medical Business Card

A mobile-first Next.js App Router, TypeScript, Tailwind CSS digital business card. No database, accounts, analytics, paid APIs, or visitor app required. The supplied portrait is optimized to WebP; no separate official logo is used.

## Status

Local implementation. **Not deployed.** Hosting provider, permanent public URL, and permission to publish are pending. QR generation and URL sharing are intentionally unavailable until a canonical URL is configured. No temporary QR is presented as a finished asset.

## Structure

```text
src/app/                  Page, layout, metadata, responsive styles
src/components/           Save contact, share/copy, QR download
src/config/profile.ts     All editable profile information
src/lib/                  Canonical URL guard, vCard, QR encoder
public/                   Optimized portrait, favicon, social preview
scripts/preview.mjs        Local server for the static production build
tests/card.test.ts        Identity, URL safety, vCard, QR decoding checks
AGENTS.md                 Project conventions
```

## Local development

The card supports English, Thai, and Simplified Chinese through the always-visible **English / ไทย / 中文** selector. English is the initial default. The selected language is remembered in this browser's local storage when available; no language preference is sent to a server. UI labels, instructions, feedback, QR descriptions, and location text switch together. The document language updates for screen readers. The owner's name, credentials, official English organization wording, contact destinations, and saved vCard stay consistent in every language. Edit translations in `src/config/translations.ts`.

Use Node.js 22 or later and pnpm 11.25.0. On this computer the executable is `pnpm.cmd`; use that spelling if PowerShell does not resolve `pnpm`. npm is not on the current PATH.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open the Local URL printed by Next.js. Copy `.env.example` to `.env.local` if needed. Leave `NEXT_PUBLIC_SITE_URL` blank until the owner approves the permanent URL. Both application QR generation and sharing use this variable exclusively, never the local browser address.

```sh
pnpm test
pnpm typecheck
pnpm build
pnpm preview
```

Production build uses webpack for predictable Windows compatibility. `out/` is a complete static website. `pnpm preview` serves it at http://127.0.0.1:3000. Stop with Ctrl+C. Do not use `next start` for a static export.

## Update details and portrait

Edit `src/config/profile.ts`. It supplies the page, vCard, and metadata. The owner-confirmed role, Emergency Physician Of Erawan Center, has English, Thai, and Simplified Chinese display text in this file and is included in the vCard TITLE field. Telephone numbers use E.164 notation for `tel:` links. The Save Contact button downloads a vCard 3.0 with structured name, credentials, organization and department, mobile, office, and the website URL when configured. The download is followed by the phone's contact import flow.

The latest owner-supplied image is stored as `public/portrait-v2.webp` at a maximum width of 1200px with metadata removed by the encoder. It displays in a compact square frame, up to 240px wide on desktop and 210px on mobile. CSS `object-fit: cover` with `object-position: 65% 50%` trims part of the ambulance on the left while keeping the doctor prominent. The original image asset is unchanged; only the visible framing changes. To replace it, optimize the replacement to WebP/JPEG, place it in `public/`, and update `portrait.src` and `portrait.alt`. Set `portrait.src` to `null` to use the neutral initials placeholder. No AI alteration is applied to the supplied image.

Contact actions use large Thai labels, colored local app icons, and touch targets of at least 48px. LINE copies the supplied `0866078928` ID and explains how to search for it; there is no guessed add-friend URL. Gmail opens the user's configured mail app through `mailto:chaithawat.emer.work@gmail.com`. Both email and LINE ID are included in the saved vCard (LINE in its note field). See [the Thai publishing walkthrough](DEPLOYMENT_TH.md) for GitHub and Cloudflare Pages instructions.

If the profile identity changes, regenerate `public/og-image.png` with matching text and portrait. The current static social preview is 1200×630; the favicon is a personal CC monogram, not an organizational mark.

## Canonical URL, QR, and sharing

For international sharing, send one permanent public website link by email, message, AirDrop, or QR. Recipients can open the card on iOS or Android without signing in to this website. WhatsApp, Instagram, and email use their direct destinations; their own app/account requirements still apply. Set `profile.line.url` to the owner's actual add-friend link copied from LINE → Home → Add friends → QR code → My QR code → Copy link. The card then shows a direct **Add on LINE** action in all three languages. Until this real link is supplied, the existing copy-ID fallback remains in place; a phone number alone is not treated as a confirmed add-friend URL.

Set `NEXT_PUBLIC_SITE_URL` to the **owner-approved permanent HTTPS public profile URL** in `.env.local` and the hosting build environment. Rebuild whenever it changes: Next.js embeds this public value at build time. Do not put secrets in `NEXT_PUBLIC_*` variables.

The guard rejects local/IP/reserved hosts, known preview deployments, credentials, query strings, and fragments. This conservative version also rejects all `vercel.app` and `netlify.app` subdomains because the app cannot reliably distinguish permanent from preview hosts there; use a verified custom domain for those providers. A plain production `<project>.pages.dev` host is supported, while multi-label Pages preview hosts are rejected. No automatic validator can establish permanence or ownership: the owner must confirm the exact destination.

Once configured, the build generates a QR with a four-module quiet zone and a 2048×2048 PNG download. Scan it on a separate phone and verify the destination before distributing or printing. The automated test decodes a test-only fixture; it does not claim to validate a live deployment. No final QR file exists before the destination is confirmed.

Share uses the native Web Share API when supported. Cancellation is respected. Unsupported or failed native sharing falls back to clipboard; if clipboard access fails, the page offers a selectable link. Phone, WhatsApp, and Instagram links are always available.

## Proposed deployment: Cloudflare Pages static hosting

The recommended candidate is Cloudflare Pages using Next.js static export. Owner approval of both **Cloudflare Pages and the exact available production subdomain is required before account connection or publishing**. No GitHub repository or remote has been created by this implementation.

Cloudflare's [Next.js static export guide](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/) documents the static route. [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports) produce `out/`; server actions, request-time APIs, cookies, ISR, and default image optimization are unavailable. This project uses none of those features; portrait optimization happens before deployment.

After approval:

1. Confirm the exact available production name in the provider dashboard. An illustrative subdomain is not a reserved or verified URL.
2. Set `NEXT_PUBLIC_SITE_URL` to that exact public HTTPS URL. Rebuild and run the checks.
3. For Git integration, create the owner's approved GitHub repository and connect it to Cloudflare Pages. Use the actual production branch, Node 24, `pnpm build`, and output directory `out`. Enable the repository's pinned pnpm version in the build environment.
4. Alternatively, upload the contents of `out/` through Pages Direct Upload. Choose Git integration versus Direct Upload deliberately because switching project modes can require a new project.
5. Verify deployment succeeds, then visit the public site and scan/download the final QR. Only then distribute it.
6. To update, edit the configuration/assets, run checks, rebuild with the same canonical URL, and redeploy. A URL change requires regenerating and replacing any distributed QR assets.

Consult the current [Pages limits](https://developers.cloudflare.com/pages/platform/limits/) and [pricing](https://developers.cloudflare.com/pages/functions/pricing/) before approval. Free plans have build, project, and asset limits, no guarantee of name availability, and provider terms can change. This static card does not require Pages Functions or a paid plan. No purchase is authorized.

## Launch verification still required

Local validation on 7 November 2026: production static export passed, TypeScript passed, and all five automated tests passed. An HTTP smoke check returned 200 for the profile page, portrait, favicon, touch icon, social preview, and stylesheet; all four contact destinations matched the brief. The unconfigured build correctly omitted a QR and emitted `noindex`. The QR test decoded a 2048px PNG to the exact test fixture URL.

Browser automation could not complete: the browser connector timed out twice, and Windows Computer Use stopped because it could not determine the current browser URL confidently. The responsive breakpoints are implemented, but rendered mobile widths, console errors, keyboard interaction, native share/clipboard flows, and actual phone contact import remain unverified. Open the local preview for visual review before launch.

- Owner confirms displayed name, credentials, organization wording, portrait, and both telephone numbers.
- Test dialing, correct WhatsApp conversation, and the Instagram account on real phones.
- Import the downloaded vCard in iPhone Contacts and Android Contacts. Automated content checks cannot prove device import behavior.
- Confirm the permanent URL, approve publishing, scan the final QR on a separate phone, and test the high-resolution download.
- Check native sharing on iPhone Safari and Android Chrome; clipboard behavior depends on browser permissions and a secure context.

The production URL, repository URL, and final QR image will be handed over after approved deployment, not before.
