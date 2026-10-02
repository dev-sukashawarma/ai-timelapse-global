'use client';

/**
 * Design Read (SKILL.md Section 0.B):
 * "Reading this as: High-converting viral AI timelapse creator course & prompt tool landing page,
 * inspired by belajarpakai.ai/timelapse components, structured with Spotify dark aesthetic,
 * restrained motion, high-contrast typography, and strict anti-slop guidelines."
 *
 * Dial Configuration (SKILL.md Section 1):
 * DESIGN_VARIANCE: 7
 * MOTION_INTENSITY: 6
 * VISUAL_DENSITY: 4
 *
 * Component Structure aligned with belajarpakai.ai/timelapse:
 * 1. Navbar (Sticky, minimal, language toggle)
 * 2. Hero Section (Viral headline, stats bar, primary CTA, video/visual preview)
 * 3. Secret Pipeline Section ("Ini Bukan CGI Studio. Ini Satu Orang + AI" - 4 step flow)
 * 4. Value Manifesto Quote Banner ("Ini bukan kerja tim...")
 * 5. Why AI Timelapse Section ("Konten Paling Gampang yang Paling Viral" - 3 core value props)
 * 6. Visual Media Showcase (Real asset cards: Lahan kosong -> Fondasi -> Struktur -> Finishing)
 * 7. What You Get Section ("Semua yang Kamu Butuhkan untuk Bikin Video Timelapse AI")
 * 8. Exclusive Bonuses Section (Bonus #1 Tools Generator + Bonus #2 Konsultasi Mentor)
 * 9. Real Proof / Testimonials ("Mereka Sudah Mulai Duluan" - Fajar, Sarah, Rendi)
 * 10. Pricing & Launch Offer (Rp 49.000 / $9.99 special launch offer)
 * 11. FAQ Accordion ("Masih Bingung? Baca Ini Dulu")
 * 12. Footer
 *
 * Pre-Flight Compliance (SKILL.md Section 14):
 * - Zero em-dashes (—) anywhere
 * - Single theme & single accent color lock (#1db954 / #1ed760)
 * - Shape consistency lock: rounded-full for interactive pill, rounded-3xl for cards
 * - Eyebrow count strictly <= ceil(total_sections / 3)
 * - High contrast WCAG AA on all interactive elements
 */

import { useState } from 'react';
import Image from 'next/image';
import { translations } from '@/lib/translations';
import {
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  Check,
  Star,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  MessageCircle,
  Clock,
  TrendingUp,
  Home,
  Tv,
  Smartphone,
  Share2
} from 'lucide-react';

export default function LandingPage({
  language = 'id',
  onSwitchLanguage,
}) {
  const t = translations[language] || translations.id;
  const l = t.landing;

  // Direct Shopify Checkout URL
  const SHOPIFY_PRODUCT_URL = 'https://tubaf3puagbnjx9l-60629549105.shopifypreview.com/products/ai-timelapse-video-generator-masterclass-lifetime-access';

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full text-foreground bg-[#121212] selection:bg-[#1db954] selection:text-black min-h-screen">
      {/* ── 1. TOP NAVIGATION ── */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#121212]/85 border-b border-white/5 transition-all">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-[#1db954] to-[#1ed760] flex items-center justify-center shadow-lg shadow-[#1db954]/20 shrink-0">
              <span className="text-lg sm:text-xl" role="img" aria-label="Logo">🎬</span>
            </div>
            <div>
              <span className="font-black text-sm sm:text-base tracking-tight text-white block leading-tight">
                TIMELAPSE<span className="text-[#1db954]">.AI</span>
              </span>
              <span className="text-[10px] text-[#a7a7a7] uppercase tracking-wider font-semibold block">
                By BelajarPakaiAI &times; SPB
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-[#b3b3b3]">
            <button
              type="button"
              onClick={() => scrollToSection('pipeline')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {language === 'en' ? 'How it Works' : 'Cara Kerja'}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('why')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {language === 'en' ? 'Why AI' : 'Kenapa AI'}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('what-you-get')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {language === 'en' ? 'Curriculum' : 'Materi'}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('bonuses')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Bonus
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('testimonials')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {language === 'en' ? 'Reviews' : 'Testimoni'}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('pricing')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {language === 'en' ? 'Pricing' : 'Harga'}
            </button>
          </nav>

          {/* Action CTAs & Language Switcher */}
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-[#242424] p-1 rounded-full border border-white/10">
              <button
                type="button"
                onClick={() => onSwitchLanguage('id')}
                className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  language === 'id'
                    ? 'bg-[#1db954] text-black shadow-xs font-extrabold'
                    : 'text-[#a7a7a7] hover:text-white'
                }`}
              >
                ID
              </button>
              <button
                type="button"
                onClick={() => onSwitchLanguage('en')}
                className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-[#1db954] text-black shadow-xs font-extrabold'
                    : 'text-[#a7a7a7] hover:text-white'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── 2. HERO SECTION (belajarpakai.ai/timelapse Aligned) ── */}
      <section className="relative pt-12 sm:pt-20 pb-16 overflow-hidden border-b border-white/5">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[110vw] max-w-[1100px] h-[450px] rounded-full pointer-events-none opacity-20 blur-[130px]"
          style={{ background: 'radial-gradient(ellipse at center, #1db954 0%, #104020 40%, transparent 75%)' }}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Viral Hook & Core CTA */}
            <div className="lg:col-span-6 flex flex-col items-start text-left">
              {/* Eyebrow #1 (Permitted) */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1db954]/15 border border-[#1db954]/30 text-[11px] font-bold text-[#1ed760] uppercase tracking-wider mb-5">
                <span>{l.badge}</span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-5xl md:text-5xl lg:text-5xl font-black tracking-tight text-white leading-[1.12] mb-4">
                <span>{l.heroTitle1}</span>{' '}
                <span className="text-[#1ed760]">
                  {l.heroTitle2}
                </span>
              </h1>

              {/* Subtext */}
              <p className="text-sm sm:text-base text-[#b3b3b3] max-w-xl leading-relaxed mb-6 font-normal">
                {l.heroSubtitle}
              </p>

              {/* Primary CTA */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto mb-6">
                <button
                  type="button"
                  onClick={() => scrollToSection('pricing')}
                  className="px-8 py-3.5 rounded-full bg-[#1db954] hover:bg-[#1ed760] text-black font-black text-sm sm:text-base hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#1db954]/25 cursor-pointer flex items-center justify-center gap-2 shrink-0"
                >
                  <span>{l.ctaBuy}</span>
                  <ArrowRight size={18} />
                </button>
              </div>

              {/* Trust Badge */}
              <div className="text-xs text-[#a7a7a7] font-medium flex items-center gap-2">
                <ShieldCheck size={15} className="text-[#1db954] shrink-0" />
                <span>{l.badgeGuaranteed}</span>
              </div>

              {/* Viral Proof Metrics */}
              <div className="grid grid-cols-3 gap-4 w-full mt-8 pt-6 border-t border-white/10">
                <div>
                  <div className="text-xl sm:text-2xl font-black text-white">{l.stat1Val}</div>
                  <div className="text-[10px] sm:text-xs text-[#a7a7a7] mt-0.5">{l.stat1Label}</div>
                </div>
                <div className="border-x border-white/10 px-3">
                  <div className="text-xl sm:text-2xl font-black text-[#1db954]">{l.stat2Val}</div>
                  <div className="text-[10px] sm:text-xs text-[#a7a7a7] mt-0.5">{l.stat2Label}</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-white">{l.stat3Val}</div>
                  <div className="text-[10px] sm:text-xs text-[#a7a7a7] mt-0.5">{l.stat3Label}</div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Banner Showcase */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#181818] group">
                <Image
                  src="/shopify_hero_ai_robot_chip.jpg"
                  alt="AI Timelapse Video Creation Interface"
                  width={1920}
                  height={1080}
                  className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/90 bg-black/60 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/10">
                  <span className="font-semibold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#1db954] animate-pulse" />
                    100% AI Generated · 0 Kamera
                  </span>
                  <span className="text-[#1ed760] font-mono text-[11px]">TIKTOK &bull; REELS &bull; SHORTS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. PIPELINE SECTION ("Ini Bukan CGI Studio. Ini Satu Orang + AI") ── */}
      <section id="pipeline" className="py-20 bg-[#161616] border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
              {l.proofTitle}
            </h2>
            <p className="text-sm text-[#a7a7a7] leading-relaxed">
              {l.proofSubtitle}
            </p>
          </div>

          {/* 4 Step Sequential Flow */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Step 1 */}
            <div className="bg-[#1e1e1e] rounded-3xl border border-white/5 p-6 hover:border-[#1db954]/30 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#1db954]/15 text-[#1ed760] font-black flex items-center justify-center text-sm mb-4">
                  {l.step1Num}
                </div>
                <h3 className="text-base font-bold text-white mb-2">{l.step1Title}</h3>
                <p className="text-xs text-[#a7a7a7] leading-relaxed">{l.step1Desc}</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#1e1e1e] rounded-3xl border border-white/5 p-6 hover:border-[#1db954]/30 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#1db954]/15 text-[#1ed760] font-black flex items-center justify-center text-sm mb-4">
                  {l.step2Num}
                </div>
                <h3 className="text-base font-bold text-white mb-2">{l.step2Title}</h3>
                <p className="text-xs text-[#a7a7a7] leading-relaxed">{l.step2Desc}</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#1e1e1e] rounded-3xl border border-white/5 p-6 hover:border-[#1db954]/30 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#1db954]/15 text-[#1ed760] font-black flex items-center justify-center text-sm mb-4">
                  {l.step3Num}
                </div>
                <h3 className="text-base font-bold text-white mb-2">{l.step3Title}</h3>
                <p className="text-xs text-[#a7a7a7] leading-relaxed">{l.step3Desc}</p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-[#1e1e1e] rounded-3xl border border-[#1db954]/30 p-6 transition-all flex flex-col justify-between group bg-gradient-to-b from-[#1e1e1e] to-[#122418]">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#1db954] text-black font-black flex items-center justify-center text-sm mb-4">
                  {l.step4Num}
                </div>
                <h3 className="text-base font-bold text-white mb-2">{l.step4Title}</h3>
                <p className="text-xs text-[#a7a7a7] leading-relaxed">{l.step4Desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. MANIFESTO QUOTE BANNER ── */}
      <section className="py-14 bg-gradient-to-r from-[#141414] via-[#1a281e] to-[#141414] border-b border-white/5 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-base sm:text-xl font-bold text-white leading-relaxed italic">
            {l.quoteBanner}
          </p>
        </div>
      </section>

      {/* ── 5. WHY AI TIMELAPSE SECTION ("Konten Paling Gampang yang Paling Viral") ── */}
      <section id="why" className="py-20 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-2">
              {l.whyTitle}
            </h2>
            <div className="text-xs font-bold text-[#1db954] tracking-widest uppercase mb-4">
              {l.whySubtitle}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Why 1 */}
            <div className="bg-[#1a1a1a] rounded-3xl border border-white/5 p-6 hover:border-[#1db954]/30 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#1db954]/10 text-[#1db954] flex items-center justify-center mb-5">
                <Home size={22} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{l.why1Title}</h3>
              <p className="text-xs sm:text-sm text-[#a7a7a7] leading-relaxed">{l.why1Desc}</p>
            </div>

            {/* Why 2 */}
            <div className="bg-[#1a1a1a] rounded-3xl border border-white/5 p-6 hover:border-[#1db954]/30 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#1db954]/10 text-[#1db954] flex items-center justify-center mb-5">
                <Clock size={22} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{l.why2Title}</h3>
              <p className="text-xs sm:text-sm text-[#a7a7a7] leading-relaxed">{l.why2Desc}</p>
            </div>

            {/* Why 3 */}
            <div className="bg-[#1a1a1a] rounded-3xl border border-white/5 p-6 hover:border-[#1db954]/30 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#1db954]/10 text-[#1db954] flex items-center justify-center mb-5">
                <TrendingUp size={22} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{l.why3Title}</h3>
              <p className="text-xs sm:text-sm text-[#a7a7a7] leading-relaxed">{l.why3Desc}</p>
            </div>
          </div>
        </div>
      </section>



      {/* ── 7. WHAT YOU GET SECTION (belajarpakai.ai/timelapse Curriculum) ── */}
      <section id="what-you-get" className="py-20 border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
              {l.whatYouGetTitle}
            </h2>
            <p className="text-sm text-[#a7a7a7]">
              {l.whatYouGetSubtitle}
            </p>
          </div>

          <div className="space-y-3.5">
            <div className="bg-[#1c1c1c] rounded-2xl border border-white/5 p-4.5 sm:p-5 flex items-start gap-4 hover:border-[#1db954]/30 transition-all">
              <div className="w-8 h-8 rounded-full bg-[#1db954]/15 text-[#1ed760] flex items-center justify-center shrink-0 mt-0.5">
                <Check size={16} />
              </div>
              <div>
                <p className="text-sm sm:text-base font-bold text-white">{l.included1}</p>
              </div>
            </div>

            <div className="bg-[#1c1c1c] rounded-2xl border border-white/5 p-4.5 sm:p-5 flex items-start gap-4 hover:border-[#1db954]/30 transition-all">
              <div className="w-8 h-8 rounded-full bg-[#1db954]/15 text-[#1ed760] flex items-center justify-center shrink-0 mt-0.5">
                <Check size={16} />
              </div>
              <div>
                <p className="text-sm sm:text-base font-bold text-white">{l.included2}</p>
              </div>
            </div>

            <div className="bg-[#1c1c1c] rounded-2xl border border-white/5 p-4.5 sm:p-5 flex items-start gap-4 hover:border-[#1db954]/30 transition-all">
              <div className="w-8 h-8 rounded-full bg-[#1db954]/15 text-[#1ed760] flex items-center justify-center shrink-0 mt-0.5">
                <Check size={16} />
              </div>
              <div>
                <p className="text-sm sm:text-base font-bold text-white">{l.included3}</p>
              </div>
            </div>

            <div className="bg-[#1c1c1c] rounded-2xl border border-white/5 p-4.5 sm:p-5 flex items-start gap-4 hover:border-[#1db954]/30 transition-all">
              <div className="w-8 h-8 rounded-full bg-[#1db954]/15 text-[#1ed760] flex items-center justify-center shrink-0 mt-0.5">
                <Check size={16} />
              </div>
              <div>
                <p className="text-sm sm:text-base font-bold text-white">{l.included4}</p>
              </div>
            </div>

            <div className="bg-[#1c1c1c] rounded-2xl border border-white/5 p-4.5 sm:p-5 flex items-start gap-4 hover:border-[#1db954]/30 transition-all">
              <div className="w-8 h-8 rounded-full bg-[#1db954]/15 text-[#1ed760] flex items-center justify-center shrink-0 mt-0.5">
                <Check size={16} />
              </div>
              <div>
                <p className="text-sm sm:text-base font-bold text-white">{l.included5}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. EXCLUSIVE BONUSES (Bonus 1 Tools + Bonus 2 Mentor) ── */}
      <section id="bonuses" className="py-20 bg-[#161616] border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
              {l.bonusTitle}
            </h2>
            <p className="text-sm text-[#a7a7a7] leading-relaxed">
              {l.bonusSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Bonus 1 */}
            <div className="bg-[#1e1e1e] rounded-3xl border border-[#1db954]/30 p-7 sm:p-8 flex flex-col justify-between shadow-xl relative">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1db954] text-black font-black text-[11px] uppercase tracking-wider mb-5 self-start">
                <Sparkles size={13} />
                <span>{l.bonus1Badge}</span>
              </div>
              <div>
                <h3 className="text-xl font-black text-white mb-3">{l.bonus1Title}</h3>
                <p className="text-xs sm:text-sm text-[#a7a7a7] leading-relaxed mb-6">{l.bonus1Desc}</p>
                <div className="space-y-2.5 text-xs sm:text-sm text-[#e0e0e0] mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-[#1ed760] font-bold">&bull;</span>
                    <span>{l.bonus1Feature1}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#1ed760] font-bold">&bull;</span>
                    <span>{l.bonus1Feature2}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#1ed760] font-bold">&bull;</span>
                    <span>{l.bonus1Feature3}</span>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-white/10 text-xs font-bold text-[#1ed760]">
                {l.bonus1Val}
              </div>
            </div>

            {/* Bonus 2 */}
            <div className="bg-[#1e1e1e] rounded-3xl border border-white/10 p-7 sm:p-8 flex flex-col justify-between shadow-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white font-black text-[11px] uppercase tracking-wider mb-5 self-start">
                <MessageCircle size={13} />
                <span>{l.bonus2Badge}</span>
              </div>
              <div>
                <h3 className="text-xl font-black text-white mb-3">{l.bonus2Title}</h3>
                <p className="text-xs sm:text-sm text-[#a7a7a7] leading-relaxed mb-6">{l.bonus2Desc}</p>
                <div className="space-y-2.5 text-xs sm:text-sm text-[#e0e0e0] mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-[#1ed760] font-bold">&bull;</span>
                    <span>{l.bonus2Feature1}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#1ed760] font-bold">&bull;</span>
                    <span>{l.bonus2Feature2}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#1ed760] font-bold">&bull;</span>
                    <span>{l.bonus2Feature3}</span>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-white/10 text-xs font-bold text-[#1ed760]">
                {l.bonus2Val}
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-[#a7a7a7]">
            {l.bonusSummary}
          </p>
        </div>
      </section>

      {/* ── 9. TESTIMONIALS (Fajar Nugroho, Sarah Amelia, Rendi Wijaya) ── */}
      <section id="testimonials" className="py-20 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
              {l.testiTitle}
            </h2>
            <p className="text-sm text-[#a7a7a7] leading-relaxed">
              {l.testiSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {l.testimonials?.map((tItem, idx) => (
              <div
                key={idx}
                className="bg-[#1f1f1f] p-6 rounded-3xl border border-white/5 flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#1db954] mb-4">
                    {[...Array(tItem.rating)].map((_, i) => (
                      <Star key={i} size={15} fill="#1db954" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-[#e0e0e0] leading-relaxed italic mb-6">
                    &ldquo;{tItem.text}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <div className="w-10 h-10 rounded-full bg-[#2a2a2a] text-[#1ed760] font-black flex items-center justify-center text-sm shrink-0">
                    {tItem.avatar}
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-xs sm:text-sm text-white truncate flex items-center gap-1.5">
                      <span>{tItem.name}</span>
                      <CheckCircle2 size={13} className="text-[#1db954]" />
                    </div>
                    <div className="text-[11px] text-[#a7a7a7] truncate font-medium">
                      {tItem.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. PRICING & SHOPIFY CHECKOUT (Rp 49.000 / $9.99) ── */}
      <section id="pricing" className="py-24 relative overflow-hidden border-b border-white/5">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[450px] rounded-full pointer-events-none opacity-15 blur-[140px]"
          style={{ background: '#1db954' }}
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-3">
            {l.pricingTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#a7a7a7] max-w-xl mx-auto mb-12">
            {l.pricingSubtitle}
          </p>

          {/* Pricing Card */}
          <div className="bg-[#1c1c1c] border-2 border-[#1db954] rounded-3xl p-8 sm:p-10 max-w-lg mx-auto shadow-2xl shadow-[#1db954]/10 text-left relative">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#1db954] text-black font-black text-[11px] px-4 py-1 rounded-full uppercase tracking-wider">
              {l.planBadge}
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-black text-white mb-1">{l.planName}</h3>
              <p className="text-xs text-[#a7a7a7] mb-3">{l.planDesc}</p>
              <div className="flex items-baseline gap-3">
                <span className="text-sm sm:text-base text-[#a7a7a7] line-through font-semibold">
                  {l.originalPrice}
                </span>
                <span className="text-4xl sm:text-5xl font-black text-white">
                  {l.salePrice}
                </span>
              </div>
              <p className="text-xs text-[#1db954] font-bold mt-1 uppercase tracking-wide">
                {l.pricePeriod}
              </p>
              <p className="text-xs text-[#f59e0b] font-medium mt-1">
                {l.priceHighlight}
              </p>
            </div>

            {/* Checklist */}
            <div className="space-y-3 mb-8 pt-4 border-t border-white/10 text-xs sm:text-sm text-[#e5e5e5]">
              <div className="flex items-center gap-2.5">
                <Check size={16} className="text-[#1db954] shrink-0" />
                <span>{l.check1}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check size={16} className="text-[#1db954] shrink-0" />
                <span>{l.check2}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check size={16} className="text-[#1db954] shrink-0" />
                <span>{l.check3}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check size={16} className="text-[#1db954] shrink-0" />
                <span>{l.check4}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check size={16} className="text-[#1db954] shrink-0" />
                <span>{l.check5}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check size={16} className="text-[#1db954] shrink-0" />
                <span>{l.check6}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check size={16} className="text-[#1db954] shrink-0" />
                <span>{l.check7}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check size={16} className="text-[#1db954] shrink-0" />
                <span>{l.check8}</span>
              </div>
            </div>

            {/* Shopify CTA Button */}
            <a
              href={SHOPIFY_PRODUCT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 rounded-full bg-[#1db954] hover:bg-[#1ed760] text-black font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#1db954]/20 hover:scale-[1.02] active:scale-98 transition-all block text-center"
            >
              <span>{l.ctaCheckout}</span>
              <ExternalLink size={16} />
            </a>

            <p className="text-[11px] text-[#a7a7a7] text-center mt-4">
              {l.checkoutNote}
            </p>
          </div>
        </div>
      </section>

      {/* ── 11. FAQ ACCORDION ── */}
      <section id="faq" className="py-20 bg-[#161616]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white mb-2">
              {l.faqTitle}
            </h2>
            <p className="text-sm text-[#a7a7a7]">
              {l.faqSubtitle}
            </p>
          </div>

          <div className="space-y-3">
            {l.faqs?.map((faq, idx) => (
              <div
                key={idx}
                className="bg-[#202020] rounded-2xl border border-white/5 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left font-bold text-sm sm:text-base text-white flex items-center justify-between gap-4 cursor-pointer hover:text-[#1db954] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 transition-transform ${openFaq === idx ? 'rotate-180 text-[#1db954]' : 'text-[#a7a7a7]'}`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#b3b3b3] leading-relaxed border-t border-white/5">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 12. FOOTER ── */}
      <footer className="py-12 bg-[#121212] border-t border-white/5 text-center text-xs text-[#a7a7a7]">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-base">🎬</span>
            <span className="font-bold text-white">TIMELAPSE.AI</span>
            <span>&bull; BelajarPakaiAI &times; SPB</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => scrollToSection('what-you-get')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {language === 'en' ? 'Curriculum' : 'Materi'}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('bonuses')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Bonus
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('pricing')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {language === 'en' ? 'Pricing' : 'Harga'}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('pricing')}
              className="text-[#1db954] font-bold hover:underline cursor-pointer"
            >
              {language === 'en' ? 'Get Access →' : 'Dapatkan Akses →'}
            </button>
          </div>

          <div>
            &copy; {new Date().getFullYear()} BelajarPakaiAI &times; SPB AI Creator. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
