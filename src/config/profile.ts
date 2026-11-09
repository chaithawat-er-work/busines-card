import type { Language } from "./translations";

export interface Profile {
  givenName: string;
  familyName: string;
  credentials: string;
  role: Record<Language, string>;
  organization: string;
  affiliation: Record<Language, { organization: string; department: string; administration: string }>;
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
    en: "Emergency Physician",
    th: "แพทย์เวชศาสตร์ฉุกเฉิน",
    zh: "急诊医师",
    "zh-Hant": "急診醫師",
    ja: "救急医",
    ko: "응급의학과 의사",
    id: "Dokter Emergensi",
    ms: "Doktor Perubatan Kecemasan",
    tl: "Doktor sa Emerhensiya",
    de: "Notfallmediziner",
  },
  organization: "ศูนย์รับแจ้งเหตุและสั่งการ ศูนย์บริการการแพทย์ฉุกเฉินกรุงเทพมหานคร (ศูนย์เอราวัณ)",
  affiliation: {
    en: { organization: "Emergency Call and Dispatch Center,\nBangkok Emergency Medical Service (Erawan Center)", department: "Medical Service Department", administration: "Bangkok Metropolitan Administration" },
    th: { organization: "ศูนย์รับแจ้งเหตุและสั่งการ ศูนย์บริการการแพทย์ฉุกเฉินกรุงเทพมหานคร (ศูนย์เอราวัณ)", department: "สำนักการแพทย์", administration: "กรุงเทพมหานคร" },
    zh: { organization: "急救接报与调度中心，曼谷紧急医疗服务中心（Erawan Center）", department: "医疗服务局", administration: "曼谷市政府" },
    "zh-Hant": { organization: "緊急通報與派遣中心，曼谷緊急醫療服務中心（Erawan Center）", department: "醫療服務局", administration: "曼谷市政府" },
    ja: { organization: "救急通報・指令センター、バンコク救急医療サービスセンター（エラワンセンター）", department: "医療サービス局", administration: "バンコク都庁" },
    ko: { organization: "응급 신고 및 출동 지령센터, 방콕 응급의료서비스센터 (에라완 센터)", department: "의료서비스국", administration: "방콕시청" },
    id: { organization: "Pusat Penerimaan Panggilan dan Pengiriman Respons Darurat, Pusat Layanan Medis Darurat Bangkok (Pusat Erawan)", department: "Departemen Layanan Medis", administration: "Pemerintah Metropolitan Bangkok" },
    ms: { organization: "Pusat Penerimaan Panggilan dan Penyelarasan Tindak Balas Kecemasan, Pusat Perkhidmatan Perubatan Kecemasan Bangkok (Pusat Erawan)", department: "Jabatan Perkhidmatan Perubatan", administration: "Pentadbiran Metropolitan Bangkok" },
    tl: { organization: "Sentro ng Pagtanggap ng Tawag at Pagpapadala ng Tulong, Bangkok Emergency Medical Service Center (Erawan Center)", department: "Kagawaran ng Serbisyong Medikal", administration: "Pamahalaang Metropolitan ng Bangkok" },
    de: { organization: "Notruf- und Leitstelle, Bangkok Emergency Medical Service Center (Erawan Center)", department: "Abteilung für medizinische Dienste", administration: "Stadtverwaltung Bangkok" },
  },
  department: "Medical Service Department",
  administration: "Bangkok Metropolitan Administration",
  location: "Bangkok, Thailand",
  mobile: { display: "+66 86 607 8928", number: "+66866078928" },
  office: { display: "+66 2 225 0314", number: "+6622250314" },
  whatsapp: { label: "WhatsApp", url: "https://wa.me/qr/6HUGJ23RNQZQN1" },
  instagram: { label: "@bankblanc", url: "https://www.instagram.com/bankblanc/" },
  line: { id: "0866078928", url: "https://line.me/ti/p/w0A3X6PN1X" },
  email: "chaithawat.emer.work@gmail.com",
  portrait: { src: "/portrait-suit.webp", alt: "Chaithawat Chueluecha wearing a navy suit and silver tie outdoors", width: 240, height: 372 },
  socialImage: "og-image-organization.png",
  contactFilename: "Chaithawat-Chueluecha.vcf",
};

export const fullName = `${profile.givenName} ${profile.familyName}, ${profile.credentials}`;
