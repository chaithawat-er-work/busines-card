import { BusinessCard } from "@/components/business-card";
import { canonicalUrl } from "@/lib/canonical";
import { createQrPng } from "@/lib/qr";

export default async function Home() {
  const url = canonicalUrl(process.env.NEXT_PUBLIC_SITE_URL);
  const qr = url ? await createQrPng(url) : null;
  return <BusinessCard url={url} qr={qr} />;
}
