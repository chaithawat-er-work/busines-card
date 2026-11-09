import type { Language } from "./translations";

export interface Profile {
  givenName: string;
  familyName: string;
  credentials: string;
  role: Record<Language, string>;
  organization: string;
  department: string;
  administration: string;
  location: string;
  mobile: { display: string; number: string };
  office: { display: string; number: string };
  whatsapp: { label: string; url: string };
  instagram: { label: string; url: string };
  line: { id: string; url: string | null };
  email: string;
  portrait: { src: string | null; alt: string; width: number; height: number };
  socialImage: string;
  contactFilename: string;
}

export const profile: Profile = {
  givenName: "Chaithawat",
  familyName: "Chueluecha",
  credentials: "MD",
  role: {
    en: "Emergency Physician Of Erawan Center",
    th: "แพทย์เวชศาสตร์ฉุกเฉิน ศูนย์เอราวัณ",
    zh: "Erawan Center 急诊医师",
    ja: "Erawan Center 救急医",
    ko: "Erawan Center 응급의학과 의사",
    id: "Dokter Emergensi di Erawan Center",
  },
  organization: "Erawan Center",
  department: "Medical Service Department",
  administration: "Bangkok Metropolitan Administration",
  location: "Bangkok, Thailand",
  mobile: { display: "+66 86 607 8928", number: "+66866078928" },
  office: { display: "+66 2 225 0314", number: "+6622250314" },
  whatsapp: { label: "WhatsApp", url: "https://wa.me/66866078928" },
  instagram: { label: "@bankblanc", url: "https://www.instagram.com/bankblanc/" },
  line: { id: "0866078928", url: "https://line.me/ti/p/w0A3X6PN1X" },
  email: "chaithawat.emer.work@gmail.com",
  portrait: { src: "/portrait-suit.webp", alt: "Chaithawat Chueluecha wearing a navy suit and silver tie outdoors", width: 240, height: 372 },
  socialImage: "og-image-suit.png",
  contactFilename: "Chaithawat-Chueluecha.vcf",
};

export const fullName = `${profile.givenName} ${profile.familyName}, ${profile.credentials}`;
