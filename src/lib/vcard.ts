import type { Profile } from "../config/profile";

function escapeText(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/\r\n|\r|\n/g, "\\n").replace(/;/g, "\\;").replace(/,/g, "\\,");
}

/** RFC 2425 folding: at most 75 UTF-8 octets per physical line. */
function foldLine(line: string): string {
  let result = "";
  let bytes = 0;
  for (const char of line) {
    const size = new TextEncoder().encode(char).length;
    if (bytes + size > 75) { result += "\r\n "; bytes = 1; }
    result += char;
    bytes += size;
  }
  return result;
}

export function createVCard(p: Profile, url: string | null): string {
  const esc = escapeText;
  const lines = [
    "BEGIN:VCARD", "VERSION:3.0",
    `N:${esc(p.familyName)};${esc(p.givenName)};;;${esc(p.credentials)}`,
    `FN:${esc(`${p.givenName} ${p.familyName}, ${p.credentials}`)}`,
    `ORG:${esc(p.organization)};${esc(p.department)};${esc(p.administration)}`,
    `TITLE:${esc(p.role.en)}`,
    `TEL;TYPE=CELL,VOICE:${p.mobile.number}`,
    `TEL;TYPE=WORK,VOICE:${p.office.number}`,
    `EMAIL;TYPE=INTERNET,WORK:${esc(p.email)}`,
    `NOTE:${esc(`LINE ID: ${p.line.id}`)}`,
    ...(url ? [`URL:${esc(url)}`] : []),
    "END:VCARD",
  ];
  return `${lines.map(foldLine).join("\r\n")}\r\n`;
}
