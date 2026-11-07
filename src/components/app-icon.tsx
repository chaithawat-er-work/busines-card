import { Instagram } from "lucide-react";

/** Local vector app marks: no external image requests or icon fonts. */
export function AppIcon({ app }: { app: "line" | "whatsapp" | "instagram" | "gmail" }) {
  return <span className={`app-icon app-icon-${app}`} aria-hidden="true">
    {app === "gmail" ? <svg viewBox="0 0 32 26" width="29" height="25" fill="none"><path d="M3 23V5l13 10L29 5v18" stroke="#4285f4" strokeWidth="5" strokeLinejoin="round"/><path d="M3 23V5" stroke="#4285f4" strokeWidth="5"/><path d="M29 23V5" stroke="#34a853" strokeWidth="5"/><path d="m3 5 13 10L29 5" stroke="#ea4335" strokeWidth="5" strokeLinejoin="round"/><path d="M3 5v7" stroke="#c5221f" strokeWidth="5"/><path d="M29 5v7" stroke="#fbbc04" strokeWidth="5"/></svg> : app === "instagram" ? <Instagram size={26} strokeWidth={1.9} /> : app === "line" ?
      <svg viewBox="0 0 40 40" width="32" height="32"><path fill="white" d="M20 5C10.6 5 3 10.7 3 17.7c0 6.3 6 11.6 14 12.5.6.1 1.3.3 1.5.8.2.4.1 1.1.1 1.5l-.3 2c-.1.6-.5 2.2 1.9 1.2 2.5-1 13.3-7.8 16-13.4 1.2-2.1 1.8-3.5 1.8-5.6C38 10.7 30.4 5 20 5Z" /><text x="20.5" y="21" fill="#06a344" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="800" letterSpacing="-.5">LINE</text></svg> :
      <svg viewBox="0 0 32 32" width="28" height="28" fill="none"><path d="M6.3 25.6 3 29l1.7-7A12.6 12.6 0 1 1 16 28.5c-3.5 0-6.6-1.1-9.7-2.9Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><path d="M11.2 9c-.3-.7-.6-.7-1-.7h-.8c-.4 0-.8.2-1.1.6-1 1-1.4 2.3-1.1 3.7.6 3.8 5.8 9.6 10.6 10.5 1.4.3 3-.4 3.6-1.3.4-.5.7-1.8.6-2.1-.1-.2-.4-.3-.8-.5l-2.7-1.3c-.4-.2-.7-.2-.9.2l-1.3 1.5c-.3.3-.5.3-.9.1-1.5-.7-3.3-2-4.5-4-.3-.4-.1-.6.1-.8l1-1.3c.2-.3.2-.5.1-.8L11.2 9Z" fill="currentColor" /></svg>}
  </span>;
}
