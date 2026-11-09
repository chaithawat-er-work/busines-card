"use client";

import { ArrowUpRight, Building2, MapPin, Phone, QrCode } from "lucide-react";
import { DownloadQr, LineContact, SaveContact, ShareCard } from "@/components/card-actions";
import { AppIcon } from "@/components/app-icon";
import { profile } from "@/config/profile";
import { LanguageProvider, LanguageSelector, useLanguage } from "./language-provider";
import { assetPath } from "@/lib/site-path";


export function BusinessCard(props: { url: string | null; qr: string | null }) {
  return <LanguageProvider><CardContent {...props} /></LanguageProvider>;
}

function CardContent({ url, qr }: { url: string | null; qr: string | null }) {
  const { t, language } = useLanguage();
  return <>
    <a className="skip-link" href="#profile">{t.skip}</a>
    <header className="site-header"><a className="wordmark" href="#profile" aria-label="Chaithawat Chueluecha profile">CC<span className="wordmark-dot" /></a><span className="header-label">{t.card}</span><LanguageSelector /></header>
    <main id="profile" className="card-shell">
      <article className="profile-card" aria-labelledby="profile-name">
        <div className="profile-content">
          <div className="profile-heading">
          <div className="portrait-panel">
            {profile.portrait.src ? <img className="portrait" src={assetPath(profile.portrait.src)} alt={profile.portrait.alt} lang="en" width={1200} height={675} fetchPriority="high" /> : <div className="portrait-placeholder" role="img" aria-label={t.placeholder}><span>CC</span><small>{t.placeholder}</small></div>}
          </div>
          <div className="identity">
          <div className="profile-kicker"><span /> {t.profile}</div>
          <h1 id="profile-name" lang="en">{profile.givenName}<br />{profile.familyName}<span className="credential">{profile.credentials}</span></h1>
          <p className="profile-role">{profile.role[language]}</p>
          <div className="organization" lang="en"><p>{profile.organization}</p><span>{profile.department}<br />{profile.administration}</span></div>
          <p className="location"><MapPin size={15} />{t.location}</p>
          </div>
          </div>
          <SaveContact url={url} />
          <section className="contact-section" aria-labelledby="contact-title">
            <div className="section-heading"><h2 id="contact-title">{t.contact}</h2><span>{t.choose}</span></div>
            <div className="contact-grid phone-grid">
              <a className="contact-link" href={`tel:${profile.mobile.number}`}><span className="contact-icon"><Phone size={22} /></span><span><small>{t.mobile}</small><strong>{profile.mobile.display}</strong></span><ArrowUpRight className="contact-arrow" size={18} /></a>
              <a className="contact-link" href={`tel:${profile.office.number}`}><span className="contact-icon"><Building2 size={22} /></span><span><small>{t.office}</small><strong>{profile.office.display}</strong></span><ArrowUpRight className="contact-arrow" size={18} /></a>
            </div>
            <div className="contact-grid social-grid">
              <LineContact />
              <a className="contact-link social-link" href={profile.whatsapp.url} target="_blank" rel="noopener noreferrer"><AppIcon app="whatsapp" /><span className="contact-text"><small>{profile.whatsapp.label}</small><strong>{t.message}</strong></span><ArrowUpRight className="contact-arrow" size={15} /></a>
              <a className="contact-link social-link" href={profile.instagram.url} target="_blank" rel="noopener noreferrer"><AppIcon app="instagram" /><span className="contact-text"><small>Instagram</small><strong>{profile.instagram.label}</strong></span><ArrowUpRight className="contact-arrow" size={15} /></a>
              <a className="contact-link social-link email-link" href={`mailto:${profile.email}`}><AppIcon app="gmail" /><span className="contact-text"><small>{t.email}</small><strong>{profile.email}</strong></span><ArrowUpRight className="contact-arrow" size={15} /></a>
            </div>
          </section>
        </div>
      </article>
      <section className="sharing-section" aria-labelledby="sharing-title">
        <div className="sharing-copy"><span className="eyebrow">{t.card}</span><h2 id="sharing-title">{t.stay}</h2><p>{url ? t.shareDescription : t.pendingDescription}</p><ShareCard url={url} /></div>
        {qr ? <div className="qr-group"><div className="qr-frame"><img src={qr} alt={t.qrAlt} width={152} height={152} /></div><div className="qr-details"><span className="qr-label">{t.scan}</span><p>{t.allDetails}</p><DownloadQr image={qr} /><a className="canonical-link" href={url!}>{url}</a></div></div> : <div className="qr-pending"><div className="qr-pending-icon"><QrCode size={34} strokeWidth={1.5} /></div><div><span className="qr-label">QR CODE</span><p>{t.afterLaunch}</p><small>{t.pendingUrl}</small></div></div>}
      </section>
    </main>
    <footer className="site-footer"><span>{profile.givenName} {profile.familyName}, {profile.credentials}</span><span>{t.location}<span className="footer-dot">·</span>{t.card}</span></footer>
  </>;
}
