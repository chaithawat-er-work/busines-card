import test from "node:test";
import assert from "node:assert/strict";
import { PNG } from "pngjs";
import jsQR from "jsqr";
import { canonicalUrl } from "../src/lib/canonical";
import { createVCard } from "../src/lib/vcard";
import { createQrPng } from "../src/lib/qr";
import { profile } from "../src/config/profile";

// Reserved by this test as a fixture; this is not an approved launch URL.
const fixtureUrl = "https://chaithawat-card.pages.dev/";

test("canonical URL is explicit and rejects unsafe or known preview destinations", () => {
  assert.equal(canonicalUrl(undefined), null);
  assert.equal(canonicalUrl("  "), null);
  assert.equal(canonicalUrl(fixtureUrl.slice(0, -1)), fixtureUrl);
  for (const value of ["http://localhost:3000", "https://localhost/", "https://127.0.0.1/", "https://10.0.0.2/", "https://[::1]/", "https://card.local/", "https://example.com/", "https://preview.card.pages.dev/", "https://card.vercel.app/", "https://card.netlify.app/", "https://user:pass@card.org/", "https://card.org/?preview=1", "https://card.org/#profile", "not a url"]) {
    assert.throws(() => canonicalUrl(value), Error, value);
  }
});

test("vCard contains the supplied identity and correctly typed telephone fields", () => {
  const card = createVCard(profile, fixtureUrl);
  const unfolded = card.replace(/\r\n /g, "");
  assert.ok(card.startsWith("BEGIN:VCARD\r\nVERSION:3.0\r\n"));
  assert.ok(card.endsWith("END:VCARD\r\n"));
  assert.ok(unfolded.includes("N:Chueluecha;Chaithawat;;;MD\r\n"));
  assert.ok(unfolded.includes("FN:Chaithawat Chueluecha\\, MD\r\n"));
  assert.ok(unfolded.includes("ORG:Erawan Center;Medical Service Department;Bangkok Metropolitan Administration\r\n"));
  assert.ok(unfolded.includes("TITLE:Emergency Physician Of Erawan Center\r\n"));
  assert.ok(unfolded.includes("TEL;TYPE=CELL,VOICE:+66866078928\r\n"));
  assert.ok(unfolded.includes("TEL;TYPE=WORK,VOICE:+6622250314\r\n"));
  assert.ok(unfolded.includes("EMAIL;TYPE=INTERNET,WORK:chaithawat.emer.work@gmail.com\r\n"));
  assert.ok(unfolded.includes("NOTE:LINE ID: 0866078928\r\n"));
  assert.ok(unfolded.includes(`URL:${fixtureUrl}\r\n`));
  assert.ok(!createVCard(profile, null).includes("URL:"));
  for (const line of card.split("\r\n")) assert.ok(Buffer.byteLength(line, "utf8") <= 75);
});

test("vCard safely escapes text and folds Unicode without corrupting it", () => {
  const givenName = "ก".repeat(50) + ",;\\\nInjected";
  const card = createVCard({ ...profile, givenName }, null);
  const unfolded = card.replace(/\r\n /g, "");
  assert.ok(unfolded.includes("ก".repeat(50) + "\\,\\;\\\\\\nInjected"));
  for (const line of card.split("\r\n")) assert.ok(Buffer.byteLength(line, "utf8") <= 75);
});

test("2048px downloadable QR decodes to precisely the configured canonical URL", async () => {
  const dataUrl = await createQrPng(fixtureUrl);
  const png = PNG.sync.read(Buffer.from(dataUrl.split(",")[1], "base64"));
  assert.equal(png.width, 2048);
  assert.equal(png.height, 2048);
  const decoded = jsQR(new Uint8ClampedArray(png.data), png.width, png.height);
  assert.equal(decoded?.data, fixtureUrl);
  await assert.rejects(createQrPng("http://localhost:3000/"));
});

test("telephone and social destinations match the owner-supplied brief", () => {
  assert.equal(profile.mobile.number, "+66866078928");
  assert.equal(profile.office.number, "+6622250314");
  assert.equal(profile.whatsapp.url, "https://wa.me/66866078928");
  assert.equal(profile.instagram.url, "https://www.instagram.com/bankblanc/");
  assert.equal(profile.line.id, "0866078928");
  assert.equal(profile.line.url, "https://line.me/ti/p/w0A3X6PN1X");
  assert.equal(profile.email, "chaithawat.emer.work@gmail.com");
});
