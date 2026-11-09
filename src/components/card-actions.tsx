"use client";

import { useState } from "react";
import { ArrowUpRight, Copy, Download, Share2, UserRoundPlus } from "lucide-react";
import { profile, fullName } from "@/config/profile";
import { createVCard } from "@/lib/vcard";
import { AppIcon } from "./app-icon";
import { useLanguage } from "./language-provider";

export function LineContact() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<"lineCopied" | "lineManual" | null>(null);
  const [manual, setManual] = useState(false);
  async function copyLineId() {
    try {
      await navigator.clipboard.writeText(profile.line.id);
      setStatus("lineCopied");
    } catch {
      setManual(true);
      setStatus("lineManual");
    }
  }
  return <div className="line-contact">
    {profile.line.url ? <a className="contact-link social-link" href={profile.line.url} target="_blank" rel="noopener noreferrer">
      <AppIcon app="line" /><span className="contact-text"><small>LINE</small><strong>{t.lineAdd}</strong></span><ArrowUpRight className="contact-arrow" size={15} />
    </a> :
    <button type="button" className="contact-link social-link" onClick={copyLineId} aria-label={`${t.lineCopy}: ${profile.line.id}`}>
      <AppIcon app="line" /><span className="contact-text"><small>{t.lineCopy}</small><strong>{profile.line.id}</strong></span><Copy className="contact-arrow" size={15} />
    </button>}
    {status && <p className="line-status" role="status">{t[status]}</p>}
    {manual && <input className="line-id-input" aria-label={t.lineId} readOnly value={profile.line.id} onFocus={e => e.target.select()} />}
  </div>;
}

export function SaveContact({ url }: { url: string | null }) {
  const { t } = useLanguage();
  const [saved, setSaved] = useState(false);
  function downloadContact() {
    const file = new Blob([createVCard(profile, url)], { type: "text/vcard;charset=utf-8" });
    const objectUrl = URL.createObjectURL(file);
    const anchor = document.createElement("a");
    anchor.href = objectUrl;
    anchor.download = profile.contactFilename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(objectUrl), 30_000);
    setSaved(true);
  }
  return <>
    <button className="save-button" onClick={downloadContact}><UserRoundPlus size={22} /><span>{t.save}</span><Download size={20} /></button>
    <p className="save-hint" role="status">{saved ? t.saved : t.saveHint}</p>
  </>;
}

export function ShareCard({ url }: { url: string | null }) {
  const { t, language } = useLanguage();
  const [status, setStatus] = useState<"shared" | "copied" | "manual" | null>(null);
  const [manual, setManual] = useState(false);
  async function share() {
    if (!url) return;
    setStatus(null);
    if (navigator.share) {
      try { await navigator.share({ title: fullName, text: `${fullName} · ${profile.affiliation[language].organization}`, url }); setStatus("shared"); return; }
      catch (error) { if (error instanceof Error && error.name === "AbortError") return; }
    }
    try {
      await navigator.clipboard.writeText(url);
      setStatus("copied");
    } catch {
      setManual(true);
      setStatus("manual");
    }
  }
  return <div className="share-control">
    <button className="share-button" onClick={share} disabled={!url} title={!url ? t.sharePending : undefined}><Share2 size={19} />{t.share}</button>
    <p className="share-status" role="status">{status ? t[status] : ""}</p>
    {manual && <label className="manual-copy"><Copy size={16} />{t.cardLink}<input aria-label={t.cardLink} readOnly value={url ?? ""} onFocus={e => e.target.select()} /></label>}
  </div>;
}

