import type { Metadata } from "next";
import { profile, fullName } from "@/config/profile";
import { canonicalUrl } from "@/lib/canonical";
import { assetPath } from "@/lib/site-path";
import "./globals.css";

const url = canonicalUrl(process.env.NEXT_PUBLIC_SITE_URL);
const description = `Connect with ${fullName}, ${profile.role.en}, ${profile.department}, ${profile.administration}. Save contact details and connect in ${profile.location}.`;

export const metadata: Metadata = {
  title: `${fullName} | ${profile.organization}`,
  description,
  ...(url ? { metadataBase: new URL(url), alternates: { canonical: url } } : {}),
  robots: url ? { index: true, follow: true } : { index: false, follow: false },
  icons: { icon: assetPath("/icon.svg"), apple: assetPath("/apple-touch-icon.png") },
  openGraph: {
    title: `${fullName} | ${profile.organization}`, description,
    type: "profile", firstName: profile.givenName, lastName: profile.familyName,
    ...(url ? { url, images: [{ url: `${url}og-image.png`, width: 1200, height: 630, alt: `${fullName} digital business card` }] } : {}),
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: fullName, description, ...(url ? { images: [`${url}og-image.png`] } : {}) },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
