'use client';

/**
 * Design Read:
 * High-converting viral AI construction timelapse kit landing page.
 * Clean, modern light aesthetic with a crisp White background (Putih),
 * complemented by Deep Navy (Biru tua), Electric Sky Blue (Biru muda), and Dark Slate / Black (Hitam).
 *
 * Hero Container:
 * Full cinematic video background playing seamlessly inside the Hero container.
 * Zero em-dashes per guidelines.
 */

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  Check,
  ExternalLink,
  ChevronDown,
  ShieldCheck,
  Sparkles,
  MessageSquare,
  Palette,
  Clapperboard,
  Smartphone,
  Repeat,
  Eye,
  MessageSquareQuote,
  TrendingUp,
  Home,
  Zap,
  X,
  Plus
} from 'lucide-react';

export default function LandingPage({
  language = 'id',
  onSwitchLanguage,
  onOpenStudio,
}) {
  const isId = language === 'id';

  // Direct Shopify Checkout URL
  const SHOPIFY_PRODUCT_URL = 'https://tubaf3puagbnjx9l-60629549105.shopifypreview.com/products/ai-timelapse-video-generator-masterclass-lifetime-access';

  // Video Reference
  const videoRef = useRef(null);

  // Navbar Dynamic Scroll State
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ensure hero video autoplays reliably
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  // Scroll reveal animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // FAQ Accordion State - default all open to match reference layout
  const [openFaqs, setOpenFaqs] = useState({ 0: true, 1: true, 2: true, 3: true, 4: true });

  const toggleFaq = (idx) => {
    setOpenFaqs((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full text-[#0f172a] bg-white selection:bg-[#38bdf8] selection:text-[#0f172a] min-h-screen font-sans antialiased">
      {/* ── TOP NAVBAR (Seamlessly Blends Over Video with Soft Gradient) ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-[#080c14]/90 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl py-3 sm:py-4'
            : 'bg-gradient-to-b from-[#080c14]/95 via-[#080c14]/60 to-transparent border-b border-white/5 py-4 sm:py-6'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-[#0284c7] to-[#38bdf8] flex items-center justify-center shadow-md shadow-[#0284c7]/30 shrink-0">
              <span className="text-base sm:text-lg" role="img" aria-label="Logo">🎬</span>
            </div>
            <div>
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-white block leading-tight">
                AI TIMELAPSE<span className="text-[#38bdf8]">™</span>
              </span>
              <span className="text-[10px] text-slate-300 tracking-widest uppercase font-medium block">
                Creation Kit
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs sm:text-sm font-semibold text-slate-200">
            <button
              type="button"
              onClick={() => scrollToSection('why')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {isId ? 'Kenapa AI' : 'Why AI'}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('how-it-works')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {isId ? 'Cara Kerja' : 'Workflow'}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('workflow')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {isId ? 'Bukti Visual' : 'Gallery'}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('what-you-get')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {isId ? 'Paket Kit' : 'What You Get'}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('bonuses')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {isId ? 'Bonus' : 'Bonuses'}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('pricing')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {isId ? 'Harga' : 'Pricing'}
            </button>
          </nav>

          {/* Action CTAs & Language Switcher */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenStudio}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#0284c7] to-[#38bdf8] hover:from-[#0369a1] hover:to-[#0ea5e9] text-white font-bold text-xs transition-all cursor-pointer shadow-md shadow-[#0284c7]/30 hover:scale-105 active:scale-95"
            >
              <span>{isId ? 'Buka Generator' : 'Open Generator'}</span>
              <ArrowRight size={14} />
            </button>

            {/* Language Switcher */}
            <div className="flex items-center bg-[#0f172a]/75 backdrop-blur-md p-1 rounded-full border border-slate-700/60">
              <button
                type="button"
                onClick={() => onSwitchLanguage('id')}
                className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  language === 'id'
                    ? 'bg-[#38bdf8] text-[#080c14] shadow-xs font-extrabold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                ID
              </button>
              <button
                type="button"
                onClick={() => onSwitchLanguage('en')}
                className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-[#38bdf8] text-[#080c14] shadow-xs font-extrabold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── 1. FULLSCREEN HERO SECTION WITH CINEMATIC VIDEO BACKGROUND ── */}
      <section className="relative w-full min-h-screen flex items-center overflow-hidden border-b border-slate-800 bg-[#080c14]">
        {/* Full-Bleed Video Background starting from the very top */}
        <video
          ref={videoRef}
          src="/video-ai.mp4"
          autoPlay
          loop
          muted
          playsInline
          poster="/video_ai_poster.jpg"
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          {/* Primary AI timelapse video */}
          <source src="/video-ai.mp4" type="video/mp4" />
          {/* Fallback generated reel */}
          <source src="/hero_timelapse_loop.mp4" type="video/mp4" />
        </video>

        {/* Soft Vignette Overlay so the video is clearly visible while text stays crisp */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#080c14]/70 via-[#080c14]/35 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080c14]/40 via-transparent to-[#080c14]/60 z-10 pointer-events-none" />

        {/* Hero Foreground Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20 pt-28 pb-16 sm:pt-36 sm:pb-24">
          <div className="max-w-3xl">
            {/* Refined Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0284c7]/20 border border-[#38bdf8]/40 text-[11px] font-bold text-[#38bdf8] tracking-wider uppercase mb-6 shadow-sm backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse" />
              <Sparkles size={13} className="text-[#38bdf8]" />
              <span>{isId ? 'Tren Konten AI Video 2026' : 'Trending AI Video Workflow'}</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.75rem] font-black tracking-tight text-white leading-[1.12] mb-5">
              {isId ? (
                <>
                  Buat Video Timelapse Konstruksi <span className="bg-gradient-to-r from-[#38bdf8] to-[#93c5fd] bg-clip-text text-transparent">100% dengan AI.</span>
                </>
              ) : (
                <>
                  Create Viral AI Construction <span className="bg-gradient-to-r from-[#38bdf8] to-[#93c5fd] bg-clip-text text-transparent">Timelapses with AI.</span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-xl font-bold text-[#38bdf8] tracking-wide mb-3">
              {isId ? 'Tanpa Kamera. Tanpa Drone. Tanpa Lokasi Proyek.' : 'No Camera. No Drone. No Construction Site.'}
            </p>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed mb-8 font-normal">
              {isId
                ? 'Kuasai alur kerja sistematis untuk mengubah prompt sederhana menjadi video timelapse konstruksi bernilai tinggi untuk TikTok, Instagram Reels, dan YouTube Shorts.'
                : 'Master the exact system to turn simple prompts into satisfying construction timelapse videos engineered for viral reach on TikTok, Reels, and Shorts.'}
            </p>

            {/* Primary CTA: Opens Generator Page */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-8">
              <button
                type="button"
                onClick={onOpenStudio}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-[#0284c7] to-[#38bdf8] hover:from-[#0369a1] hover:to-[#0ea5e9] text-white font-extrabold text-sm sm:text-base hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#0284c7]/40 cursor-pointer flex items-center justify-center gap-2.5 shrink-0"
              >
                <span>{isId ? 'Dapatkan Akses Instan' : 'Get Instant Access'}</span>
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Micro Trust Strip */}
            <div className="flex flex-wrap items-center gap-5 text-xs text-slate-300 font-medium">
              <div className="flex items-center gap-1.5">
                <Check size={15} className="text-[#38bdf8]" />
                <span>{isId ? 'Sekali Bayar' : 'One-Time Payment'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check size={15} className="text-[#38bdf8]" />
                <span>{isId ? 'Akses Instan' : 'Instant Access'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check size={15} className="text-[#38bdf8]" />
                <span>{isId ? 'Ramah Pemula' : 'Beginner Friendly'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check size={15} className="text-[#38bdf8]" />
                <span>{isId ? 'Tanpa Langganan' : 'Zero Subscriptions'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <button
          type="button"
          onClick={() => scrollToSection('why')}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-1.5 text-slate-400 hover:text-white cursor-pointer transition-colors"
        >
          <span className="text-[10px] uppercase font-bold tracking-widest">{isId ? 'Kenapa AI Timelapse' : 'Explore Why AI'}</span>
          <ChevronDown size={14} className="animate-bounce text-[#38bdf8]" />
        </button>
      </section>

      {/* ── 1. KENAPA TIMELAPSE AI? ── */}
      <section id="why" className="py-24 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          {/* Pill Badge */}
          <div className="scroll-reveal">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-[#0284c7] font-extrabold text-xs uppercase tracking-wider mb-5">
              {isId ? 'KENAPA TIMELAPSE AI?' : 'WHY AI TIMELAPSE?'}
            </div>

            {/* Main Title */}
            <h2 className="text-3xl sm:text-5xl font-black text-[#0f172a] tracking-tight mb-3">
              {isId ? (
                <>
                  Konten Paling Gampang <span className="text-[#0284c7]">yang Paling Viral</span>
                </>
              ) : (
                <>
                  The Easiest Content <span className="text-[#0284c7]">That Goes Most Viral</span>
                </>
              )}
            </h2>

            {/* Subtitle / Sub-bar */}
            <p className="text-xs sm:text-sm font-bold tracking-widest text-slate-500 uppercase mb-14">
              {isId ? 'TANPA KAMERA • TANPA DRONE • TANPA LOKASI' : 'NO CAMERA • NO DRONE • NO PHYSICAL LOCATION'}
            </p>
          </div>

          {/* 3 Benefit Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Card 1 */}
            <div className="bg-[#f8fafc] p-8 rounded-3xl border border-slate-200 shadow-xs hover:border-[#0284c7]/40 transition-all flex flex-col items-center text-center group scroll-reveal scroll-delay-1 hover-lift">
              <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-100 text-[#0284c7] flex items-center justify-center mb-5 text-2xl group-hover:scale-110 transition-transform shadow-xs">
                🏡
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#0f172a] mb-2.5">
                {isId ? 'Ribuan Desain Rumah' : 'Thousands of Home Designs'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {isId
                  ? 'Mau rumah minimalis, modern, atau mewah? AI bisa generate unlimited variasi. Setiap video = konten unik.'
                  : 'Minimalist, contemporary, or luxury villas? AI generates infinite variations. Every single video is unique.'}
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#f8fafc] p-8 rounded-3xl border border-slate-200 shadow-xs hover:border-[#0284c7]/40 transition-all flex flex-col items-center text-center group scroll-reveal scroll-delay-2 hover-lift">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-100 text-amber-500 flex items-center justify-center mb-5 text-2xl group-hover:scale-110 transition-transform shadow-xs">
                ⚡
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#0f172a] mb-2.5">
                {isId ? '10 Menit per Video' : '10 Minutes per Video'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {isId
                  ? 'Dari prompt ke video siap upload. Nggak perlu nunggu proyek selesai berminggu-minggu.'
                  : 'From text prompt to upload-ready video. No need to wait weeks for physical construction sites.'}
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#f8fafc] p-8 rounded-3xl border border-slate-200 shadow-xs hover:border-[#0284c7]/40 transition-all flex flex-col items-center text-center group scroll-reveal scroll-delay-3 hover-lift">
              <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-100 text-rose-500 flex items-center justify-center mb-5 text-2xl group-hover:scale-110 transition-transform shadow-xs">
                📈
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#0f172a] mb-2.5">
                {isId ? 'View Gampang Naik' : 'High Engagement & Views'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {isId
                  ? 'Niche timelapse rumah punya engagement rate tertinggi di TikTok & Reels. Satisfying content = auto-share.'
                  : 'Architectural timelapses command the highest retention on TikTok & Reels. Satisfying visual loops trigger viral shares.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. CARA KERJA (Ini Bukan CGI Studio. Ini Satu Orang + AI) ── */}
      <section id="how-it-works" className="py-24 bg-[#f8fafc] border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Top Social Proof Metrics Bar */}
          <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-xs p-4 sm:p-6 mb-16 scroll-reveal hover-lift">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-100">
              <div className="flex items-center gap-3 px-3 py-2">
                <div className="w-10 h-10 rounded-2xl bg-sky-50 text-[#0284c7] flex items-center justify-center shrink-0 border border-sky-100">
                  <Eye size={20} />
                </div>
                <div>
                  <div className="text-base sm:text-lg font-black text-[#0f172a]">10M+ Views</div>
                  <div className="text-xs text-slate-500">TikTok &amp; YouTube</div>
                </div>
              </div>

              <div className="flex items-center gap-3 px-3 py-2 pt-4 md:pt-2">
                <div className="w-10 h-10 rounded-2xl bg-sky-50 text-[#0284c7] flex items-center justify-center shrink-0 border border-sky-100">
                  <Repeat size={20} />
                </div>
                <div>
                  <div className="text-base sm:text-lg font-black text-[#0f172a]">500K+ Shares</div>
                  <div className="text-xs text-slate-500">{isId ? 'Lintas Platform' : 'Across Platforms'}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 px-3 py-2 pt-4 md:pt-2">
                <div className="w-10 h-10 rounded-2xl bg-sky-50 text-[#0284c7] flex items-center justify-center shrink-0 border border-sky-100">
                  <MessageSquareQuote size={20} />
                </div>
                <div>
                  <div className="text-base sm:text-lg font-black text-[#0f172a]">&ldquo;Ini beneran AI?!&rdquo;</div>
                  <div className="text-xs text-slate-500">{isId ? '90% Komentar Takjub' : '90% of Comments'}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 px-3 py-2 pt-4 md:pt-2">
                <div className="w-10 h-10 rounded-2xl bg-sky-50 text-[#0284c7] flex items-center justify-center shrink-0 border border-sky-100">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <div className="text-base sm:text-lg font-black text-[#0f172a]">Tren #1</div>
                  <div className="text-xs text-slate-500">Content AI 2026</div>
                </div>
              </div>
            </div>
          </div>

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 scroll-reveal">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-xs font-bold text-[#0284c7] tracking-wider uppercase mb-5 shadow-xs">
              <Sparkles size={13} className="text-[#0284c7]" />
              <span>{isId ? 'RAHASIANYA?' : 'THE SECRET?'}</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-[#0f172a] tracking-tight mb-5 leading-tight">
              {isId ? (
                <>
                  Ini Bukan CGI Studio. Ini <span className="bg-gradient-to-r from-[#0284c7] to-[#38bdf8] bg-clip-text text-transparent">Satu Orang + AI.</span>
                </>
              ) : (
                <>
                  Not a CGI Studio. Just <span className="bg-gradient-to-r from-[#0284c7] to-[#38bdf8] bg-clip-text text-transparent">One Person + AI.</span>
                </>
              )}
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              {isId
                ? 'Semua video timelapse rumah viral itu dibuat dengan pipeline sederhana yang bisa kamu ikuti dalam 10 menit.'
                : 'Every viral architectural timelapse video is crafted using a streamlined 10-minute pipeline anyone can replicate.'}
            </p>
          </div>

          {/* 4-Step Pipeline Flow with Connector Arrows */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 max-w-5xl mx-auto mb-16">
            {/* Step 1 */}
            <div className="flex-1 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xs hover:border-[#0284c7]/40 transition-all text-center flex flex-col items-center relative group scroll-reveal scroll-delay-1 hover-lift">
              <div className="w-8 h-8 rounded-full bg-[#0284c7] text-white font-black text-xs flex items-center justify-center shadow-md shadow-[#0284c7]/30 -mt-10 mb-4 ring-4 ring-[#f8fafc]">
                1
              </div>
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-[#0284c7] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MessageSquare size={22} />
              </div>
              <h3 className="text-base font-bold text-[#0f172a] mb-2">
                {isId ? 'Ketik Prompt' : 'Write Prompt'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {isId
                  ? 'Deskripsikan rumah impian. AI yang visualisasikan.'
                  : 'Describe your dream concept. AI handles visualization.'}
              </p>
            </div>

            <div className="hidden lg:flex items-center justify-center text-slate-300">
              <ArrowRight size={22} />
            </div>

            {/* Step 2 */}
            <div className="flex-1 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xs hover:border-[#0284c7]/40 transition-all text-center flex flex-col items-center relative group scroll-reveal scroll-delay-2 hover-lift">
              <div className="w-8 h-8 rounded-full bg-[#0284c7] text-white font-black text-xs flex items-center justify-center shadow-md shadow-[#0284c7]/30 -mt-10 mb-4 ring-4 ring-[#f8fafc]">
                2
              </div>
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-[#0284c7] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Palette size={22} />
              </div>
              <h3 className="text-base font-bold text-[#0f172a] mb-2">
                {isId ? 'AI Generate Gambar' : 'AI Generates Frames'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {isId
                  ? 'Dari lahan kosong sampai rumah jadi, tahap demi tahap.'
                  : 'From raw ground to completed villa, stage by stage.'}
              </p>
            </div>

            <div className="hidden lg:flex items-center justify-center text-slate-300">
              <ArrowRight size={22} />
            </div>

            {/* Step 3 */}
            <div className="flex-1 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xs hover:border-[#0284c7]/40 transition-all text-center flex flex-col items-center relative group scroll-reveal scroll-delay-3 hover-lift">
              <div className="w-8 h-8 rounded-full bg-[#0284c7] text-white font-black text-xs flex items-center justify-center shadow-md shadow-[#0284c7]/30 -mt-10 mb-4 ring-4 ring-[#f8fafc]">
                3
              </div>
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-[#0284c7] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Clapperboard size={22} />
              </div>
              <h3 className="text-base font-bold text-[#0f172a] mb-2">
                {isId ? 'AI Animasikan' : 'AI Animates Clip'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {isId
                  ? 'Gambar berubah jadi video timelapse yang smooth.'
                  : 'Stills transform into smooth, fluid timelapse motion.'}
              </p>
            </div>

            <div className="hidden lg:flex items-center justify-center text-slate-300">
              <ArrowRight size={22} />
            </div>

            {/* Step 4 */}
            <div className="flex-1 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xs hover:border-[#0284c7]/40 transition-all text-center flex flex-col items-center relative group scroll-reveal scroll-delay-4 hover-lift">
              <div className="w-8 h-8 rounded-full bg-[#0284c7] text-white font-black text-xs flex items-center justify-center shadow-md shadow-[#0284c7]/30 -mt-10 mb-4 ring-4 ring-[#f8fafc]">
                4
              </div>
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-[#0284c7] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Smartphone size={22} />
              </div>
              <h3 className="text-base font-bold text-[#0f172a] mb-2">
                {isId ? 'Upload & Viral' : 'Publish & Go Viral'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {isId
                  ? 'Post ke TikTok/YouTube. Duduk, ngopi, liat views naik.'
                  : 'Post to TikTok, Reels, & Shorts. Watch views skyrocket.'}
              </p>
            </div>
          </div>

          {/* Bottom Manifesto Quote Box */}
          <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 text-center shadow-xs scroll-reveal hover-lift">
            <p className="text-sm sm:text-base text-slate-700 italic font-medium leading-relaxed">
              {isId
                ? '"Ini bukan kerja tim. Ini satu orang, satu laptop, dan AI. Dan sekarang, kamu bisa belajar caranya."'
                : '"This is not a massive production team. This is one person, one laptop, and AI. And now, you can master how it is done."'}
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. FOUR-PHASE REAL ARCHITECTURE SEQUENCE (Visual Proof) ── */}
      <section id="workflow" className="py-24 border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-[#0284c7] font-extrabold text-xs uppercase tracking-wider mb-4">
              {isId ? 'BUKTI VISUAL NYATA' : 'REAL VISUAL PROOF'}
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0f172a] tracking-tight uppercase mb-3">
              {isId ? 'PROGRESI FISIK BERTAHAP TANPA GLITCH' : 'PHYSICAL PROGRESSION WITHOUT GLITCHES'}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {isId
                ? 'Bukan animasi fade instan, melainkan perakitan material nyata lapis demi lapis yang stabil antar frame.'
                : 'Not cheap dissolves, but genuine physical layer-by-layer material deposition across stable camera coordinates.'}
            </p>
          </div>

          {/* Panoramic HD Sequence Image with Button-like Cursor Hover Scale */}
          <div className="rounded-3xl overflow-hidden border border-slate-200/90 shadow-2xl bg-slate-900 mb-8 shadow-sky-500/5 scroll-reveal group cursor-pointer transition-all duration-500 ease-out hover:scale-[1.03] active:scale-[0.98] hover:shadow-2xl hover:shadow-sky-500/25 hover:border-[#38bdf8]">
            <div className="relative overflow-hidden">
              <Image
                src="/construction_sequence_phases.jpg"
                alt="4-Stage Architectural Construction Timeline Progression"
                width={2752}
                height={1536}
                quality={100}
                unoptimized
                className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center scroll-reveal">
            <div className="p-4 rounded-2xl bg-[#f8fafc] border border-slate-200 hover:border-[#0284c7] hover:bg-white hover:shadow-xl hover:shadow-sky-500/10 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer">
              <span className="text-xs font-mono text-[#0284c7] block font-bold mb-1">TAHAP 1</span>
              <p className="text-sm font-bold text-[#0f172a]">{isId ? 'Galian & Tanah Kosong' : 'Excavation & Empty Land'}</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#f8fafc] border border-slate-200 hover:border-[#0284c7] hover:bg-white hover:shadow-xl hover:shadow-sky-500/10 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer">
              <span className="text-xs font-mono text-[#0284c7] block font-bold mb-1">TAHAP 2</span>
              <p className="text-sm font-bold text-[#0f172a]">{isId ? 'Pengecoran Pondasi' : 'Foundation & Concrete Slab'}</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#f8fafc] border border-slate-200 hover:border-[#0284c7] hover:bg-white hover:shadow-xl hover:shadow-sky-500/10 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer">
              <span className="text-xs font-mono text-[#0284c7] block font-bold mb-1">TAHAP 3</span>
              <p className="text-sm font-bold text-[#0f172a]">{isId ? 'Rangka & Dinding Bata' : 'Framing & Structural Walls'}</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#f8fafc] border border-slate-200 hover:border-[#0284c7] hover:bg-white hover:shadow-xl hover:shadow-sky-500/10 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer">
              <span className="text-xs font-mono text-[#0284c7] block font-bold mb-1">TAHAP 4</span>
              <p className="text-sm font-bold text-[#0f172a]">{isId ? 'Finishing & Golden Hour' : 'Finishing & Completed Villa'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. YANG KAMU DAPAT (What You Get - Clean & Elegant Layout) ── */}
      <section id="what-you-get" className="py-24 bg-[#f8fafc] border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Heading + 5 Bullet Checklist directly on surface */}
            <div className="lg:col-span-7 scroll-reveal">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-[#0284c7] font-extrabold text-xs uppercase tracking-wider mb-5">
                {isId ? 'YANG KAMU DAPAT' : 'WHAT YOU GET'}
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-[#0f172a] tracking-tight leading-[1.15] mb-4">
                {isId ? (
                  <>
                    Semua yang<br />
                    Kamu Butuhkan<br />
                    untuk <span className="text-[#0284c7]">Bikin Video</span><br />
                    <span className="text-[#0284c7]">Timelapse AI</span>
                  </>
                ) : (
                  <>
                    Everything You Need<br />
                    to <span className="text-[#0284c7]">Create Viral</span><br />
                    <span className="text-[#0284c7]">AI Timelapse Videos</span>
                  </>
                )}
              </h2>

              <p className="text-sm sm:text-base text-slate-500 font-medium mb-8">
                {isId
                  ? 'Panduan lengkap dari nol sampai bisa viral.'
                  : 'Complete step-by-step masterclass from scratch to viral success.'}
              </p>

              {/* 5 Checklists with clean subtle dividers (No boxy wrapper) */}
              <div className="space-y-4 mb-8">
                {/* 1. Template Prompt Siap Pakai */}
                <div className="flex items-start gap-4 pb-4 border-b border-slate-200/70">
                  <div className="w-6 h-6 rounded-full bg-[#0284c7] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm shadow-[#0284c7]/30">
                    <Check size={13} strokeWidth={3} />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#0f172a]">
                      {isId ? 'Template Prompt Siap Pakai' : 'Ready-to-Use Prompt Templates'}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5 leading-relaxed">
                      {isId
                        ? 'Copy-paste prompt untuk generate gambar rumah tahap demi tahap'
                        : 'Copy-paste exact prompt formulas to generate architectural stages seamlessly.'}
                    </p>
                  </div>
                </div>

                {/* 2. Tutorial AI Image-to-Video */}
                <div className="flex items-start gap-4 pb-4 border-b border-slate-200/70">
                  <div className="w-6 h-6 rounded-full bg-[#0284c7] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm shadow-[#0284c7]/30">
                    <Check size={13} strokeWidth={3} />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#0f172a]">
                      {isId ? 'Tutorial AI Image-to-Video' : 'AI Image-to-Video Tutorials'}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5 leading-relaxed">
                      {isId
                        ? 'Step-by-step cara ubah gambar jadi video timelapse smooth'
                        : 'Step-by-step methods to convert static frames into 60 FPS buttery-smooth motion.'}
                    </p>
                  </div>
                </div>

                {/* 3. Editing & Music Guide */}
                <div className="flex items-start gap-4 pb-4 border-b border-slate-200/70">
                  <div className="w-6 h-6 rounded-full bg-[#0284c7] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm shadow-[#0284c7]/30">
                    <Check size={13} strokeWidth={3} />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#0f172a]">
                      {isId ? 'Editing & Music Guide' : 'Editing & Audio Layering Guide'}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5 leading-relaxed">
                      {isId
                        ? 'Gabungkan klip, tambah ASMR sound, optimasi durasi untuk TikTok/Reels'
                        : 'Combine sequence cuts, insert ASMR construction sounds, and optimize timing for TikTok/Reels.'}
                    </p>
                  </div>
                </div>

                {/* 4. Strategi Viral & Hashtag */}
                <div className="flex items-start gap-4 pb-4 border-b border-slate-200/70">
                  <div className="w-6 h-6 rounded-full bg-[#0284c7] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm shadow-[#0284c7]/30">
                    <Check size={13} strokeWidth={3} />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#0f172a]">
                      {isId ? 'Strategi Viral & Hashtag' : 'Viral Growth & Hashtag Formula'}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5 leading-relaxed">
                      {isId
                        ? 'Formula caption, hashtag, dan timing upload yang terbukti boost views'
                        : 'Tested caption frameworks, algorithmic tag grouping, and scheduling to trigger viral view spikes.'}
                    </p>
                  </div>
                </div>

                {/* 5. Variasi Niche Timelapse */}
                <div className="flex items-start gap-4 pb-1">
                  <div className="w-6 h-6 rounded-full bg-[#0284c7] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm shadow-[#0284c7]/30">
                    <Check size={13} strokeWidth={3} />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#0f172a]">
                      {isId ? 'Variasi Niche Timelapse' : 'Niche Variations Blueprint'}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5 leading-relaxed">
                      {isId
                        ? 'Bukan cuma rumah - gedung, taman, interior, kota futuristik'
                        : 'Expand beyond houses - skyscrapers, luxury interiors, zen gardens, and cyberpunk cities.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={onOpenStudio}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#0284c7] to-[#0ea5e9] hover:from-[#0369a1] hover:to-[#0284c7] text-white font-extrabold text-sm sm:text-base transition-all shadow-xl shadow-[#0284c7]/25 hover:scale-105 active:scale-95 cursor-pointer mt-2"
              >
                <span>{isId ? 'Dapatkan Akses Sekarang' : 'Get Instant Access'}</span>
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Right Column: Pristine Single Showcase Card */}
            <div className="lg:col-span-5 flex justify-center items-center scroll-reveal scroll-delay-2">
              <div className="w-full bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-xl shadow-slate-200/50 flex flex-col items-center justify-center text-center hover-lift transition-all">
                <div className="flex items-center justify-between w-full gap-2 sm:gap-3">
                  {/* Step 1: Fondasi */}
                  <div className="flex flex-col items-center flex-1">
                    <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-2xl bg-sky-50/80 border border-sky-100/90 shadow-xs flex items-center justify-center text-2xl sm:text-3xl mb-2.5 hover:scale-110 transition-transform">
                      🏗️
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-slate-700">{isId ? 'Fondasi' : 'Foundation'}</span>
                  </div>

                  <div className="text-slate-300 font-bold text-sm sm:text-base shrink-0">→</div>

                  {/* Step 2: Struktur */}
                  <div className="flex flex-col items-center flex-1">
                    <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-2xl bg-sky-50/80 border border-sky-100/90 shadow-xs flex items-center justify-center text-2xl sm:text-3xl mb-2.5 hover:scale-110 transition-transform">
                      🧱
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-slate-700">{isId ? 'Struktur' : 'Structure'}</span>
                  </div>

                  <div className="text-slate-300 font-bold text-sm sm:text-base shrink-0">→</div>

                  {/* Step 3: Finishing */}
                  <div className="flex flex-col items-center flex-1">
                    <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-2xl bg-sky-50/80 border border-sky-100/90 shadow-xs flex items-center justify-center text-2xl sm:text-3xl mb-2.5 hover:scale-110 transition-transform">
                      🏡
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-slate-700">{isId ? 'Finishing' : 'Finishing'}</span>
                  </div>

                  <div className="text-slate-300 font-bold text-sm sm:text-base shrink-0">→</div>

                  {/* Step 4: Video! */}
                  <div className="flex flex-col items-center flex-1">
                    <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-tr from-[#0284c7] to-[#38bdf8] border border-[#0284c7] shadow-lg shadow-[#0284c7]/25 flex items-center justify-center text-2xl sm:text-3xl mb-2.5 hover:scale-110 transition-transform">
                      🎬
                    </div>
                    <span className="text-xs sm:text-sm font-extrabold text-[#0284c7]">{isId ? 'Video!' : 'Video!'}</span>
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t border-slate-100 w-full text-center">
                  <p className="text-sm sm:text-base font-extrabold text-[#0284c7]">
                    {isId ? 'Semua dari 1 prompt AI' : 'All generated from 1 AI prompt'}
                  </p>
                  <p className="text-xs text-slate-400 mt-1 font-medium">
                    {isId ? 'Otomatis render tahap demi tahap' : 'Automated multi-stage progression'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. BONUS EKSKLUSIF (Dua Hal yang Bikin Paket Ini Beda dari yang Lain) ── */}
      <section id="bonuses" className="py-24 bg-[#0a0f1d] text-white border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 scroll-reveal">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 font-extrabold text-xs uppercase tracking-wider mb-5">
              {isId ? 'BONUS EKSKLUSIF' : 'EXCLUSIVE BONUSES'}
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4 leading-tight">
              {isId ? (
                <>
                  Dua Hal yang Bikin Paket Ini{' '}
                  <span className="bg-gradient-to-r from-[#38bdf8] to-[#818cf8] bg-clip-text text-transparent">
                    Beda dari yang Lain
                  </span>
                </>
              ) : (
                <>
                  Two Things That Set This Bundle{' '}
                  <span className="bg-gradient-to-r from-[#38bdf8] to-[#818cf8] bg-clip-text text-transparent">
                    Apart from the Rest
                  </span>
                </>
              )}
            </h2>

            <p className="text-sm sm:text-base text-slate-400 font-medium">
              {isId
                ? 'Bukan cuma materi - kamu dapat jaminan terus berkembang dan support langsung dari mentor.'
                : 'Not just static tutorials - you receive ongoing growth guarantee and direct 1-on-1 mentor support.'}
            </p>
          </div>

          {/* 2 Bonus Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-8">
            {/* Bonus #1 Card */}
            <div className="bg-[#111827]/90 text-white rounded-3xl p-7 sm:p-9 border border-slate-800 hover:border-[#0284c7]/60 transition-all flex flex-col justify-between shadow-xl relative group scroll-reveal scroll-delay-1 hover-lift">
              <div>
                {/* Icon & Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-sky-950/70 border border-sky-800/60 text-amber-400 flex items-center justify-center text-xl shadow-xs group-hover:scale-110 transition-transform">
                    <Sparkles size={22} className="text-amber-400" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-sky-950/80 border border-sky-700/60 text-sky-400 font-mono font-bold text-xs uppercase tracking-wider">
                    {isId ? 'BONUS #1' : 'BONUS #1'}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-black text-white mb-1">
                  {isId ? 'Akses Tools Eksklusif' : 'Exclusive Tool Access'}
                </h3>
                <h4 className="text-lg sm:text-xl font-black text-[#38bdf8] mb-4">
                  AI Prompt Generator
                </h4>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {isId
                    ? 'Nggak perlu pusing mikirin prompt rumit. Tinggal masukkan idemu, dan AI kami akan meracik prompt sinematik yang sempurna untuk Google Veo atau Nano Banana. Otomatis & Presisi.'
                    : 'Skip the headaches of manual prompt formulation. Simply input your concept, and our system synthesizes production-ready cinematic prompts for Google Veo and Kling. Automated & precise.'}
                </p>

                {/* App Interface Visual Mockup */}
                <div className="rounded-2xl bg-[#090d16] border border-slate-800 p-4 sm:p-5 mb-6 shadow-inner font-sans">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      <span className="text-[11px] font-mono text-slate-400 ml-1">AI Timelapse Prompt Generator</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 font-mono font-semibold border border-sky-500/20">
                      Studio v2.4
                    </span>
                  </div>

                  {/* Mock input field */}
                  <div className="space-y-2.5">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                      <span className="truncate">Modern Minimalist Concrete Villa on Cliffside...</span>
                      <span className="text-[10px] text-slate-500 font-mono">16:9 4K</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                        <span>Veo 3 Architecture Engine</span>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>4-Stage Coherent Flow</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-2.5 mb-6 text-xs sm:text-sm text-slate-300 font-medium">
                  <li className="flex items-center gap-2.5">
                    <span className="text-[#38bdf8] text-xs">✦</span>
                    <span>{isId ? 'Fitur Multi-Sequence (hingga 5 sequence mulus)' : 'Multi-Sequence support (up to 5 smooth stages)'}</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="text-[#38bdf8] text-xs">✦</span>
                    <span>{isId ? 'Dynamic Camera Movement Auto-Director' : 'Dynamic Camera Movement Auto-Director'}</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="text-[#38bdf8] text-xs">✦</span>
                    <span>{isId ? 'Akses penuh selamanya, tanpa langganan bulanan' : 'Lifetime complete access, zero monthly subscriptions'}</span>
                  </li>
                </ul>
              </div>

              {/* Bonus Value Bar */}
              <div className="rounded-xl bg-slate-900/90 border border-slate-800 px-4 py-3 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-400 tracking-wider">
                  {isId ? 'NILAI BONUS' : 'BONUS VALUE'}
                </span>
                <span className="text-sm sm:text-base font-extrabold text-[#38bdf8]">
                  {isId ? 'Rp 149.000' : '$49 Value'}
                </span>
              </div>
            </div>

            {/* Bonus #2 Card */}
            <div className="bg-[#111827]/90 text-white rounded-3xl p-7 sm:p-9 border border-slate-800 hover:border-[#818cf8]/60 transition-all flex flex-col justify-between shadow-xl relative group scroll-reveal scroll-delay-2 hover-lift">
              <div>
                {/* Icon & Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-950/70 border border-indigo-800/60 text-indigo-400 flex items-center justify-center text-xl shadow-xs group-hover:scale-110 transition-transform">
                    <MessageSquare size={22} className="text-indigo-400" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-400 font-mono font-bold text-xs uppercase tracking-wider">
                    {isId ? 'BONUS #2' : 'BONUS #2'}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-black text-white mb-1">
                  {isId ? 'Konsultasi 1-on-1' : '1-on-1 Consultation'}
                </h3>
                <h4 className="text-lg sm:text-xl font-black text-[#818cf8] mb-4">
                  {isId ? 'Langsung ke Mentor - GRATIS' : 'Direct Mentor Access - FREE'}
                </h4>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-8">
                  {isId
                    ? 'Belajar sendiri kadang bisa stuck. Makanya, kamu bisa tanya langsung ke mentor - soal teknik, prompt yang tidak jalan, atau strategi konten. Personal, tanpa antrian, tanpa biaya tambahan.'
                    : 'Learning solo can lead to roadblocks. Connect directly with an experienced creator to debug prompts, optimize animation workflows, or refine viral strategy. 1-on-1, zero queues, zero extra charges.'}
                </p>

                {/* Features List */}
                <ul className="space-y-3.5 mb-8 text-xs sm:text-sm text-slate-300 font-medium">
                  <li className="flex items-center gap-2.5">
                    <span className="text-[#818cf8] text-xs">✦</span>
                    <span>{isId ? 'Tanya apa saja seputar materi timelapse AI' : 'Ask anything regarding AI architecture timelapse'}</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="text-[#818cf8] text-xs">✦</span>
                    <span>{isId ? 'Dapat feedback langsung dari mentor berpengalaman' : 'Direct critique & pointers from experienced creators'}</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="text-[#818cf8] text-xs">✦</span>
                    <span>{isId ? 'Eksklusif untuk member - tidak dijual terpisah' : 'Exclusive to kit members - not sold separately'}</span>
                  </li>
                </ul>
              </div>

              {/* Bonus Value Bar */}
              <div className="rounded-xl bg-slate-900/90 border border-slate-800 px-4 py-3 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-400 tracking-wider">
                  {isId ? 'NILAI BONUS' : 'BONUS VALUE'}
                </span>
                <span className="text-sm sm:text-base font-extrabold text-emerald-400">
                  {isId ? 'Tak Ternilai' : 'Priceless'}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Callout Banner */}
          <div className="max-w-5xl mx-auto bg-[#111827] rounded-3xl p-6 sm:p-7 border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 scroll-reveal hover-lift">
            <p className="text-xs sm:text-sm text-slate-300 text-center sm:text-left leading-relaxed">
              <strong className="text-white font-extrabold">
                {isId ? 'Semua bonus ini sudah termasuk' : 'All of these exclusive bonuses are included'}
              </strong>{' '}
              {isId
                ? 'dalam harga Rp 49.000 - tanpa syarat tambahan.'
                : 'within the one-time $19 price - zero hidden conditions.'}
            </p>

            <button
              type="button"
              onClick={onOpenStudio}
              className="px-7 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-[#0f172a] font-black text-sm transition-all shadow-lg hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer shrink-0"
            >
              <span>{isId ? 'Klaim Sekarang' : 'Claim Access Now'}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ── 6. TESTIMONIALS (Clean Quote Cards in Crisp Light Style) ── */}
      <section id="testimonials" className="py-24 border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14 scroll-reveal">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-[#0284c7] font-extrabold text-xs uppercase tracking-wider mb-4">
              {isId ? 'HASIL KREATOR' : 'CREATOR RESULTS'}
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0f172a] tracking-tight uppercase mb-3">
              {isId ? 'BUKTI NYATA DARI KREATOR LAIN' : 'REAL RESULTS FROM CREATORS'}
            </h2>
            <p className="text-sm text-slate-600">
              {isId ? 'Mereka yang sudah take action dan melihat hasil views-nya langsung.' : 'Creators who applied the workflow and achieved immediate traction.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#f8fafc] p-7 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between scroll-reveal scroll-delay-1 hover-lift">
              <p className="text-sm text-slate-700 leading-relaxed mb-6 italic">
                &ldquo;Gila sih, gue cuma ikutin template prompt-nya dan langsung jadi video timelapse rumah yang smooth banget. Upload ke TikTok tembus 50K views di hari pertama.&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                <div className="w-9 h-9 rounded-full bg-[#1e3a8a] text-white font-black flex items-center justify-center text-xs shadow-xs">
                  FN
                </div>
                <div>
                  <div className="text-sm font-bold text-[#0f172a]">Fajar Nugroho</div>
                  <div className="text-[11px] text-slate-500">AI Content Creator</div>
                </div>
              </div>
            </div>

            <div className="bg-[#f8fafc] p-7 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between scroll-reveal scroll-delay-2 hover-lift">
              <p className="text-sm text-slate-700 leading-relaxed mb-6 italic">
                &ldquo;Awalnya mikir ini pasti ribet, ternyata beneran gampang. Sekarang tiap hari posting 2-3 video timelapse dan akun saya sudah 10K followers dalam sebulan.&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                <div className="w-9 h-9 rounded-full bg-[#1e3a8a] text-white font-black flex items-center justify-center text-xs shadow-xs">
                  SA
                </div>
                <div>
                  <div className="text-sm font-bold text-[#0f172a]">Sarah Amelia</div>
                  <div className="text-[11px] text-slate-500">Faceless Page Creator</div>
                </div>
              </div>
            </div>

            <div className="bg-[#f8fafc] p-7 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between scroll-reveal scroll-delay-3 hover-lift">
              <p className="text-sm text-slate-700 leading-relaxed mb-6 italic">
                &ldquo;Template prompt-nya worth it banget. Tinggal ganti style arsitektur dan langsung jadi konten baru. Nggak perlu pusing mikir dari nol lagi.&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                <div className="w-9 h-9 rounded-full bg-[#1e3a8a] text-white font-black flex items-center justify-center text-xs shadow-xs">
                  RW
                </div>
                <div>
                  <div className="text-sm font-bold text-[#0f172a]">Rendi Wijaya</div>
                  <div className="text-[11px] text-slate-500">YouTube Shorts Creator</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. PRICING & SHOPIFY CHECKOUT CARD ── */}
      <section id="pricing" className="py-24 relative overflow-hidden border-b border-slate-200 text-center bg-[#f8fafc]">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full pointer-events-none opacity-15 blur-[140px]"
          style={{ background: '#0284c7' }}
        />

        <div className="max-w-xl mx-auto px-4 sm:px-6 relative z-10 scroll-reveal">
          <div className="bg-[#0f172a] border-2 border-[#0284c7] rounded-3xl p-8 sm:p-10 shadow-2xl shadow-sky-900/20 text-left relative hover-lift">
            <div className="inline-block bg-[#0284c7] text-white font-black text-[11px] px-3.5 py-1 rounded-full uppercase tracking-wider mb-6 shadow-sm">
              {isId ? 'PENAWARAN TERBATAS' : 'LIMITED TIME LAUNCH'}
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
              AI TIMELAPSE COMPLETE KIT
            </h3>
            <p className="text-xs text-slate-300 mb-6">
              {isId ? 'Akses penuh ke semua materi video, prompt formula, dan generator tools.' : 'Full unrestricted access to all training, prompts, and tool generators.'}
            </p>

            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-base text-slate-400 line-through font-medium">
                {isId ? 'Rp 149.000' : '$49'}
              </span>
              <span className="text-4xl sm:text-5xl font-black text-white">
                {isId ? 'Rp 49.000' : '$19'}
              </span>
              <span className="text-xs text-[#38bdf8] font-bold uppercase tracking-wider">{isId ? 'Sekali Bayar' : 'One-Time'}</span>
            </div>

            {/* Direct Generator Access & Shopify Checkout CTA */}
            <div className="flex flex-col gap-3 mb-4">
              <button
                type="button"
                onClick={onOpenStudio}
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#0284c7] to-[#38bdf8] hover:from-[#0369a1] hover:to-[#0ea5e9] text-white font-extrabold text-base flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#0284c7]/30 hover:scale-[1.02] active:scale-98 transition-all text-center"
              >
                <span>{isId ? 'DAPATKAN AKSES INSTAN (BUKA GENERATOR)' : 'GET INSTANT ACCESS (OPEN GENERATOR)'}</span>
                <ArrowRight size={18} />
              </button>

              <a
                href={SHOPIFY_PRODUCT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-full bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all text-center border border-slate-700/60"
              >
                <span>{isId ? 'Beli Lisensi Penuh via Shopify (Rp 49.000)' : 'Purchase Full License via Shopify ($19)'}</span>
                <ExternalLink size={14} />
              </a>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck size={14} className="text-[#38bdf8]" />
              <span>{isId ? 'Pembayaran Aman & Terenkripsi via Shopify' : 'Secure & Encrypted Checkout via Shopify'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. FAQ ACCORDION ── */}
      <section id="faq" className="py-20 sm:py-24 bg-[#f8fafc] border-t border-slate-200/60">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-14 scroll-reveal">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f172a] tracking-tight">
              {isId ? (
                <>
                  Masih Bingung? <span className="text-[#2563eb]">Baca Ini Dulu</span>
                </>
              ) : (
                <>
                  Still Confused? <span className="text-[#2563eb]">Read This First</span>
                </>
              )}
            </h2>
          </div>

          <div className="space-y-4 scroll-reveal">
            {[
              {
                q: isId ? 'Tools apa saja yang dibutuhkan?' : 'What tools do I need?',
                a: isId
                  ? 'Kamu hanya butuh laptop/HP dan koneksi internet. Tools utama: Google Flow AI (gratis), Whisk AI / image generator, dan CapCut untuk editing. Semua panduan setup ada di dalam materi.'
                  : 'You only need a laptop or phone and an internet connection. Key tools: Google Flow AI (free), Whisk AI / image generator, and CapCut for editing. Full setup instructions are included in the kit.',
              },
              {
                q: isId ? 'Hasilnya beneran bisa viral?' : 'Can the videos really go viral?',
                a: isId
                  ? 'Niche timelapse rumah AI termasuk "satisfying content" yang disukai algoritma. Banyak akun baru dapet ratusan ribu views di video pertama. Kuncinya konsisten + strategi yang tepat — semua ada di panduan.'
                  : 'AI architecture & timelapse videos belong to the high-engagement "satisfying content" niche favored by social algorithms. Many fresh accounts reach hundreds of thousands of views on their first upload. Consistency and proven prompts are key — everything is detailed inside.',
              },
              {
                q: isId ? 'Saya gaptek, apakah bisa?' : 'I am a complete beginner, is this suitable for me?',
                a: isId
                  ? 'Bisa banget! Setiap langkah pakai screenshot dan video tutorial. Intinya: copy prompt → generate → edit → upload. Sesimpel itu.'
                  : 'Absolutely! Every step is documented with visual walk-throughs and clear screenshots. The workflow is simple: copy prompt → generate → edit → upload.',
              },
              {
                q: isId ? 'Berapa lama bisa bikin 1 video?' : 'How long does it take to create one video?',
                a: isId
                  ? 'Rata-rata 10-15 menit per video. Kalau sudah terbiasa, bisa batch produce 5-10 video sekaligus dalam 1 jam.'
                  : 'Around 10-15 minutes per video on average. Once familiar with the workflow, you can batch produce 5-10 videos within an hour.',
              },
              {
                q: isId ? 'Apakah ada update materi?' : 'Will I get future updates?',
                a: isId
                  ? 'Ya! Setiap ada tools AI baru atau perubahan algoritma, materi di-update dan kamu dapat akses gratis ke semua update.'
                  : 'Yes! Whenever new AI tools or algorithm shifts emerge, materials are updated and you get lifetime free access to all updates.',
              },
            ].map((faq, idx) => {
              const isOpen = !!openFaqs[idx];
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:border-slate-300 transition-all p-5 sm:p-6"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left flex items-start justify-between gap-4 cursor-pointer group"
                  >
                    <span className="font-bold text-sm sm:text-base text-rose-500 group-hover:text-rose-600 transition-colors">
                      {faq.q}
                    </span>
                    <span className="shrink-0 w-6 h-6 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                      {isOpen ? (
                        <X size={16} strokeWidth={2.5} />
                      ) : (
                        <Plus size={16} strokeWidth={2.5} />
                      )}
                    </span>
                  </button>
                  {isOpen && (
                    <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-12 sm:py-16 bg-[#f8fafc] border-t border-slate-200 text-slate-600">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-200/90">
            {/* Brand Logo / Name */}
            <div className="text-left font-black text-lg sm:text-xl text-[#0f172a] tracking-tight">
              BelajarPakai.AI
            </div>

            {/* Navigation / Policy Links */}
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs sm:text-sm text-slate-500 font-medium">
              <a
                href="#terms"
                onClick={(e) => {
                  e.preventDefault();
                  alert(isId ? 'Syarat & Ketentuan: Akses materi dan generator bersifat personal untuk satu pengguna terdaftar.' : 'Terms & Conditions: Material and generator access is personal to one registered user.');
                }}
                className="hover:text-[#0f172a] transition-colors cursor-pointer"
              >
                {isId ? 'Syarat & Ketentuan' : 'Terms & Conditions'}
              </a>
              <a
                href="#privacy"
                onClick={(e) => {
                  e.preventDefault();
                  alert(isId ? 'Kebijakan Privasi: Data Anda dilindungi dengan standar keamanan privasi Shopify dan SSL.' : 'Privacy Policy: Your data is protected by Shopify and SSL privacy security standards.');
                }}
                className="hover:text-[#0f172a] transition-colors cursor-pointer"
              >
                {isId ? 'Kebijakan Privasi' : 'Privacy Policy'}
              </a>
              <a
                href="mailto:support@belajarpakai.ai"
                className="hover:text-[#0f172a] transition-colors cursor-pointer"
              >
                {isId ? 'Hubungi Kami' : 'Contact Us'}
              </a>
            </div>
          </div>

          {/* Copyright Notice */}
          <div className="pt-8 text-center text-xs text-slate-500 font-normal">
            &copy; 2026 BelajarPakai.AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
