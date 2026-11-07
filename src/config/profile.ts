export interface Profile {
  givenName: string;
  familyName: string;
  credentials: string;
  role: { en: string; th: string; zh: string };
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
  portrait: { src: string | null; alt: string };
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
  },
  organization: "Erawan Center",
  department: "Medical Service Department",
  administration: "Bangkok Metropolitan Administration",
  location: "Bangkok, Thailand",
  mobile: { display: "+66 86 607 8928", number: "+66866078928" },
  office: { display: "+66 2 225 0314", number: "+6622250314" },
  whatsapp: { label: "WhatsApp", url: "https://wa.me/66866078928" },
  instagram: { label: "@bankblanc", url: "https://www.instagram.com/bankblanc/" },
  line: { id: "0866078928", url: null },
  email: "chaithawat.emer.work@gmail.com",
  portrait: { src: "/portrait-v2.webp", alt: "Chaithawat Chueluecha in front of an ambulance and the Erawan EMS building" },
  contactFilename: "Chaithawat-Chueluecha.vcf",
};

export const fullName = `${profile.givenName} ${profile.familyName}, ${profile.credentials}`;
