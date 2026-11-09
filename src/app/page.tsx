import { BusinessCard } from "@/components/business-card";
import { canonicalUrl } from "@/lib/canonical";

export default async function Home() {
  const url = canonicalUrl(process.env.NEXT_PUBLIC_SITE_URL);
  return <BusinessCard url={url} />;
}
