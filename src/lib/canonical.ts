/** Explicit owner-approved URL only. Never infer the QR destination from location.href. */
export function canonicalUrl(value: string | undefined): string | null {
  if (!value?.trim()) return null;
  let url: URL;
  try { url = new URL(value.trim()); } catch { throw new Error("NEXT_PUBLIC_SITE_URL must be an absolute HTTPS public URL."); }
  const host = url.hostname.toLowerCase();
  const blocked = host === "localhost" || !host.includes(".") ||
    /(^|\.)(localhost|local|internal|test|invalid|example|example\.com|example\.org|example\.net)$/.test(host) ||
    /^[\d.]+$/.test(host) || host.includes(":") ||
    host.endsWith(".vercel.app") || host.endsWith(".netlify.app") ||
    host.endsWith(".trycloudflare.com") || host.endsWith(".ngrok-free.app") ||
    (host.endsWith(".pages.dev") && host.split(".").length !== 3);
  if (url.protocol !== "https:" || blocked || url.username || url.password || url.port || url.search || url.hash) {
    throw new Error("NEXT_PUBLIC_SITE_URL must be a permanent public HTTPS URL without credentials, port, query, or fragment. Local and known preview URLs are not allowed.");
  }
  return url.href.endsWith("/") ? url.href : `${url.href}/`;
}
