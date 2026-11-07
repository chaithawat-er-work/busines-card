import QRCode from "qrcode";
import { canonicalUrl } from "./canonical";

export async function createQrPng(url: string): Promise<string> {
  const destination = canonicalUrl(url);
  if (!destination) throw new Error("A canonical public URL is required.");
  return QRCode.toDataURL(destination, {
    width: 2048, margin: 4, errorCorrectionLevel: "M",
    color: { dark: "#102c42", light: "#ffffff" },
  });
}
