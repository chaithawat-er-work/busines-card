export type Language = "en" | "th" | "zh";
export const languageOptions: { value: Language; label: string; htmlLang: string }[] = [
  { value: "en", label: "English", htmlLang: "en" },
  { value: "th", label: "ไทย", htmlLang: "th" },
  { value: "zh", label: "中文", htmlLang: "zh-CN" },
];

const english = {
  skip: "Skip to business card", card: "Digital business card", profile: "PROFESSIONAL PROFILE",
  placeholder: "Portrait coming soon", location: "Bangkok, Thailand",
  save: "Save contact", saveHint: "Save my phone numbers and email to your contacts.",
  saved: "Downloaded. Open the file to add me to your contacts.",
  contact: "Contact me", choose: "Tap a contact option", mobile: "Call mobile", office: "Call office",
  lineCopy: "LINE · Copy ID", lineCopied: "LINE ID copied. Open LINE and search this ID to add me.",
  lineManual: "Select and copy this ID, then search for it in LINE.", lineId: "LINE ID to copy",
  message: "Send a message", email: "Send email · Gmail", stay: "Let’s stay connected",
  shareDescription: "Scan the QR code to open this card, or share the link.",
  pendingDescription: "You can save my contact now. QR sharing will be available when the website launches.",
  share: "Share card", sharePending: "Available after the public website launches",
  shared: "Share sheet opened.", copied: "Link copied.", manual: "Select and copy the link below.",
  cardLink: "Card link", qrAlt: "QR code to open this business card", scan: "Scan to open my card",
  allDetails: "All contact details in one place", downloadQr: "Download QR", afterLaunch: "Available after launch",
  pendingUrl: "Permanent website link pending",
};
export type TranslationKey = keyof typeof english;
export type Translations = Record<TranslationKey, string>;

export const translations: Record<Language, Translations> = {
  en: english,
  th: {
    skip: "ข้ามไปยังนามบัตร", card: "นามบัตรอิเล็กทรอนิกส์", profile: "ข้อมูลผู้ติดต่อ",
    placeholder: "กำลังเตรียมรูปโปรไฟล์", location: "กรุงเทพมหานคร ประเทศไทย",
    save: "บันทึกผู้ติดต่อ", saveHint: "แตะปุ่มเพื่อเก็บเบอร์โทรและอีเมลไว้ในโทรศัพท์",
    saved: "ดาวน์โหลดแล้ว · เปิดไฟล์เพื่อเพิ่มลงในรายชื่อผู้ติดต่อ",
    contact: "ช่องทางติดต่อ", choose: "แตะเพื่อเลือกช่องทาง", mobile: "โทรมือถือ", office: "โทรสำนักงาน",
    lineCopy: "LINE · คัดลอก ID", lineCopied: "คัดลอก LINE ID แล้ว · เปิด LINE แล้วค้นหา ID นี้เพื่อเพิ่มเพื่อน",
    lineManual: "เลือกคัดลอก ID แล้วค้นหาใน LINE เพื่อเพิ่มเพื่อน", lineId: "LINE ID สำหรับคัดลอก",
    message: "ส่งข้อความ", email: "ส่งอีเมล · Gmail", stay: "เก็บไว้ติดต่อกัน",
    shareDescription: "สแกน QR เพื่อเปิดนามบัตร หรือกดแชร์ให้ผู้ที่ต้องการติดต่อ",
    pendingDescription: "บันทึกผู้ติดต่อได้ทันที ส่วนการแชร์ QR จะพร้อมหลังเปิดเว็บไซต์",
    share: "แชร์นามบัตร", sharePending: "ใช้งานได้หลังเปิดเว็บไซต์สาธารณะ",
    shared: "เปิดหน้าต่างแชร์แล้ว", copied: "คัดลอกลิงก์แล้ว", manual: "เลือกและคัดลอกลิงก์ด้านล่าง",
    cardLink: "ลิงก์นามบัตร", qrAlt: "QR code สำหรับเปิดนามบัตรนี้", scan: "สแกนเพื่อเปิดนามบัตร",
    allDetails: "ทุกช่องทางติดต่อในหน้าเดียว", downloadQr: "ดาวน์โหลด QR", afterLaunch: "พร้อมหลังเปิดเว็บไซต์",
    pendingUrl: "รอยืนยันลิงก์เว็บไซต์ถาวร",
  },
  zh: {
    skip: "跳转至电子名片", card: "电子名片", profile: "个人资料",
    placeholder: "个人照片即将上传", location: "泰国曼谷",
    save: "保存联系人", saveHint: "将我的电话号码和电子邮箱保存到通讯录。",
    saved: "已下载。请打开文件，将我添加到通讯录。",
    contact: "联系方式", choose: "点击选择联系方式", mobile: "拨打手机", office: "拨打办公电话",
    lineCopy: "LINE · 复制 ID", lineCopied: "已复制 LINE ID。请打开 LINE，搜索此 ID 添加好友。",
    lineManual: "请选择并复制此 ID，然后在 LINE 中搜索添加好友。", lineId: "要复制的 LINE ID",
    message: "发送消息", email: "发送邮件 · Gmail", stay: "保持联系",
    shareDescription: "扫描二维码打开名片，或分享名片链接。",
    pendingDescription: "现在即可保存联系人。网站上线后将提供二维码分享。",
    share: "分享名片", sharePending: "网站正式上线后即可使用",
    shared: "已打开分享菜单。", copied: "已复制链接。", manual: "请选择并复制下方链接。",
    cardLink: "名片链接", qrAlt: "打开此电子名片的二维码", scan: "扫码打开名片",
    allDetails: "所有联系方式，一页呈现", downloadQr: "下载二维码", afterLaunch: "网站上线后可用",
    pendingUrl: "等待确认网站永久链接",
  },
};
