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

import { useState, useRef } from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  Check,
  ExternalLink,
  ChevronDown,
  ShieldCheck,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles
} from 'lucide-react';

export default function LandingPage({
  language = 'id',
  onSwitchLanguage,
}) {
  const isId = language === 'id';

  // Direct Shopify Checkout URL
  const SHOPIFY_PRODUCT_URL = 'https://tubaf3puagbnjx9l-60629549105.shopifypreview.com/products/ai-timelapse-video-generator-masterclass-lifetime-access';

  // Video Player Controls
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full text-[#0f172a] bg-white selection:bg-[#38bdf8] selection:text-[#0f172a] min-h-screen font-sans antialiased">
      {/* ── TOP NAVBAR ── */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/90 border-b border-slate-200/80 transition-all">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-[#0284c7] to-[#38bdf8] flex items-center justify-center shadow-md shadow-[#0284c7]/25 shrink-0">
              <span className="text-base sm:text-lg" role="img" aria-label="Logo">🎬</span>
            </div>
            <div>
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-[#0f172a] block leading-tight">
                AI TIMELAPSE<span className="text-[#0284c7]">™</span>
              </span>
              <span className="text-[10px] text-slate-500 tracking-widest uppercase font-medium block">
                Creation Kit
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs sm:text-sm font-semibold text-slate-600">
            <button
              type="button"
              onClick={() => scrollToSection('workflow')}
              className="hover:text-[#0284c7] transition-colors cursor-pointer"
            >
              {isId ? 'Cara Kerja' : 'Workflow'}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('features')}
              className="hover:text-[#0284c7] transition-colors cursor-pointer"
            >
              {isId ? 'Kurikulum' : 'Curriculum'}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('testimonials')}
              className="hover:text-[#0284c7] transition-colors cursor-pointer"
            >
              {isId ? 'Testimoni' : 'Reviews'}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('pricing')}
              className="hover:text-[#0284c7] transition-colors cursor-pointer"
            >
              {isId ? 'Harga' : 'Pricing'}
            </button>
          </nav>

          {/* Action CTAs & Language Switcher */}
          <div className="flex items-center gap-3">
            <a
              href={SHOPIFY_PRODUCT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#0284c7] to-[#0ea5e9] hover:from-[#0369a1] hover:to-[#0284c7] text-white font-bold text-xs transition-all cursor-pointer shadow-md shadow-[#0284c7]/20 hover:scale-105 active:scale-95"
            >
              <span>{isId ? 'Beli Akses - $19' : 'Get Access - $19'}</span>
              <ArrowRight size={14} />
            </a>

            {/* Language Switcher */}
            <div className="flex items-center bg-slate-100 p-1 rounded-full border border-slate-200">
              <button
                type="button"
                onClick={() => onSwitchLanguage('id')}
                className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  language === 'id'
                    ? 'bg-[#0284c7] text-white shadow-xs font-extrabold'
                    : 'text-slate-600 hover:text-[#0f172a]'
                }`}
              >
                ID
              </button>
              <button
                type="button"
                onClick={() => onSwitchLanguage('en')}
                className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-[#0284c7] text-white shadow-xs font-extrabold'
                    : 'text-slate-600 hover:text-[#0f172a]'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── 1. FULLSCREEN HERO SECTION WITH CINEMATIC VIDEO BACKGROUND ── */}
      <section className="relative w-full min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-5rem)] flex items-center overflow-hidden border-b border-slate-800 bg-[#080c14]">
        {/* Full-Bleed Video Background */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          poster="/cinematic_villa_timelapse.jpg"
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          {/* Custom user video slot takes priority if added */}
          <source src="/custom_hero_video.mp4" type="video/mp4" />
          {/* Built-in high-definition generated reel */}
          <source src="/hero_timelapse_loop.mp4" type="video/mp4" />
        </video>

        {/* Deep Navy / Cosmic Vignette Overlay for High-Contrast Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#080c14]/95 via-[#080c14]/85 to-[#080c14]/40 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080c14]/90 via-transparent to-[#080c14]/40 z-10 pointer-events-none" />

        {/* Hero Foreground Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20 py-16 sm:py-24">
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

            {/* Primary CTA */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-8">
              <a
                href={SHOPIFY_PRODUCT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-[#0284c7] to-[#38bdf8] hover:from-[#0369a1] hover:to-[#0ea5e9] text-white font-extrabold text-sm sm:text-base hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#0284c7]/40 cursor-pointer flex items-center justify-center gap-2.5 shrink-0"
              >
                <span>{isId ? 'Dapatkan Akses Instan - $19' : 'Get Instant Access - $19'}</span>
                <ArrowRight size={18} />
              </a>
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

        {/* Floating Controls for Background Video */}
        <div className="absolute bottom-6 right-6 z-20 hidden sm:flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#080c14]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-700/60 shadow-lg text-xs text-white">
            <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse" />
            <span className="text-[11px] font-bold text-white tracking-wide">
              8K ARCHITECTURE REEL
            </span>
          </div>

          <button
            type="button"
            onClick={togglePlay}
            className="w-9 h-9 rounded-full bg-[#080c14]/85 backdrop-blur-md border border-slate-700/60 flex items-center justify-center text-white hover:text-[#38bdf8] transition-colors cursor-pointer shadow-lg"
            title={isPlaying ? 'Pause Background Video' : 'Play Background Video'}
          >
            {isPlaying ? <Pause size={15} /> : <Play size={15} className="ml-0.5" />}
          </button>

          <button
            type="button"
            onClick={toggleMute}
            className="w-9 h-9 rounded-full bg-[#080c14]/85 backdrop-blur-md border border-slate-700/60 flex items-center justify-center text-white hover:text-[#38bdf8] transition-colors cursor-pointer shadow-lg"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>
        </div>

        {/* Scroll Down Indicator */}
        <button
          type="button"
          onClick={() => scrollToSection('workflow')}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-1.5 text-slate-400 hover:text-white cursor-pointer transition-colors"
        >
          <span className="text-[10px] uppercase font-bold tracking-widest">{isId ? 'Pelajari Alur Kerja' : 'Explore Workflow'}</span>
          <ChevronDown size={14} className="animate-bounce text-[#38bdf8]" />
        </button>
      </section>

      {/* ── 2. STORY NARRATIVE & VALUE MANIFESTO ── */}
      <section className="py-20 bg-[#f8fafc] border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight uppercase mb-6">
            {isId ? 'KAMU PASTI PERNAH MELIHAT VIDEO SEPERTI INI' : 'YOU’VE PROBABLY SEEN THESE VIDEOS'}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto mb-10 text-left">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[#0284c7] font-mono text-xs block mb-1 font-bold">01 / LAND</span>
              <p className="text-sm font-bold text-[#0f172a]">{isId ? 'Lahan kosong berdebu.' : 'Empty raw land.'}</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[#0284c7] font-mono text-xs block mb-1 font-bold">02 / STRUCTURE</span>
              <p className="text-sm font-bold text-[#0f172a]">{isId ? 'Pondasi beton dipasang.' : 'Foundation emerges.'}</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[#0284c7] font-mono text-xs block mb-1 font-bold">03 / FRAMING</span>
              <p className="text-sm font-bold text-[#0f172a]">{isId ? 'Dinding bata mulai naik.' : 'Walls & glass rise.'}</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[#0284c7] font-mono text-xs block mb-1 font-bold">04 / COMPLETED</span>
              <p className="text-sm font-bold text-[#0f172a]">{isId ? 'Rumah impian megah jadi.' : 'Dream villa completed.'}</p>
            </div>
          </div>

          <p className="text-base sm:text-xl text-[#1e3a8a] font-semibold max-w-2xl mx-auto leading-relaxed mb-4">
            {isId
              ? '"Ini bukan pekerjaan kru studio CGI mahal. Ini murni satu orang, satu laptop, dan instruksi AI yang presisi."'
              : '"This is not a massive CGI studio production. It is simply one person, one laptop, and the exact AI prompt geometry."'}
          </p>
        </div>
      </section>

      {/* ── 3. FOUR-PHASE REAL ARCHITECTURE SEQUENCE ── */}
      <section id="workflow" className="py-20 border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-4xl font-black text-[#0f172a] tracking-tight uppercase mb-3">
              {isId ? 'PROGRESI FISIK BERTAHAP TANPA GLITCH' : 'PHYSICAL PROGRESSION WITHOUT GLITCHES'}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {isId
                ? 'Bukan animasi fade instan, melainkan perakitan material nyata lapis demi lapis yang stabil antar frame.'
                : 'Not cheap dissolves, but genuine physical layer-by-layer material deposition across stable camera coordinates.'}
            </p>
          </div>

          {/* Panoramic HD Sequence Image */}
          <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-2xl bg-slate-900 mb-8 shadow-sky-500/5">
            <Image
              src="/construction_sequence_phases.jpg"
              alt="4-Stage Architectural Construction Timeline Progression"
              width={1920}
              height={1080}
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3.5 rounded-2xl bg-[#f8fafc] border border-slate-200">
              <span className="text-xs font-mono text-[#0284c7] block font-bold mb-1">TAHAP 1</span>
              <p className="text-sm font-bold text-[#0f172a]">{isId ? 'Galian & Tanah Kosong' : 'Excavation & Empty Land'}</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#f8fafc] border border-slate-200">
              <span className="text-xs font-mono text-[#0284c7] block font-bold mb-1">TAHAP 2</span>
              <p className="text-sm font-bold text-[#0f172a]">{isId ? 'Pengecoran Pondasi' : 'Foundation & Concrete Slab'}</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#f8fafc] border border-slate-200">
              <span className="text-xs font-mono text-[#0284c7] block font-bold mb-1">TAHAP 3</span>
              <p className="text-sm font-bold text-[#0f172a]">{isId ? 'Rangka & Dinding Bata' : 'Framing & Structural Walls'}</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#f8fafc] border border-slate-200">
              <span className="text-xs font-mono text-[#0284c7] block font-bold mb-1">TAHAP 4</span>
              <p className="text-sm font-bold text-[#0f172a]">{isId ? 'Finishing & Golden Hour' : 'Finishing & Completed Villa'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. WHAT YOU GET (Simpel, Bersih, HD Mockup) ── */}
      <section id="features" className="py-20 bg-[#f8fafc] border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: HD Product Mockup Image */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-2xl bg-white group shadow-sky-500/10">
                <Image
                  src="/product_kit_bundle.jpg"
                  alt="AI Timelapse Creator Kit Digital Studio Bundle Mockup"
                  width={1024}
                  height={768}
                  className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Right: Concise Curriculum List */}
            <div className="lg:col-span-6">
              <h2 className="text-xs font-bold text-[#0284c7] uppercase tracking-widest mb-2">
                {isId ? 'ISI LENGKAP BUNDLE' : 'WHAT’S INSIDE THE KIT'}
              </h2>
              <h3 className="text-2xl sm:text-4xl font-black text-[#0f172a] tracking-tight uppercase mb-6">
                AI TIMELAPSE COMPLETE KIT
              </h3>

              <div className="space-y-3.5 mb-8">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <Check size={18} className="text-[#0284c7] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-[#0f172a]">{isId ? 'Video Training Langkah-demi-Langkah' : 'Step-by-Step Video Training'}</h4>
                    <p className="text-xs text-slate-600">{isId ? 'Dari riset ide, generate frame, hingga klip jadi siap upload.' : 'From concept, frame generation, to polished video upload.'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <Check size={18} className="text-[#0284c7] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-[#0f172a]">{isId ? 'Pustaka Prompt AI Siap Pakai' : 'Ready-to-Use AI Prompt Library'}</h4>
                    <p className="text-xs text-slate-600">{isId ? 'Formula prompt 8-layer untuk Google Veo 3, Nano Banana, dan Kling.' : '8-layer prompt architecture engineered for Veo 3, Imagen, and Kling.'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <Check size={18} className="text-[#0284c7] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-[#0f172a]">{isId ? 'Alur Kerja Image-to-Video' : 'Image-to-Video Workflow Guide'}</h4>
                    <p className="text-xs text-slate-600">{isId ? 'Teknik transisi halus tanpa teleportasi antar tahapan bangunan.' : 'Seamless transition techniques avoiding jitter or random morphing.'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <Check size={18} className="text-[#0284c7] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-[#0f172a]">{isId ? 'Editing & Audio ASMR Sound Guide' : 'Editing & ASMR Audio Layering'}</h4>
                    <p className="text-xs text-slate-600">{isId ? 'Optimasi timing durasi 9:16 untuk TikTok, Instagram Reels, & Shorts.' : 'Short-form pacing and satisfying sound design that boosts watch time.'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <Check size={18} className="text-[#0284c7] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-[#0f172a]">{isId ? 'Akses Tools AI Prompt Generator' : 'AI Prompt Generator Tool Access'}</h4>
                    <p className="text-xs text-slate-600">{isId ? 'Otomasi peracikan prompt urutan konstruksi tanpa perlu mikir dari nol.' : 'Instantly synthesize multi-sequence prompts tailored to your concepts.'}</p>
                  </div>
                </div>
              </div>

              <a
                href={SHOPIFY_PRODUCT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#0284c7] to-[#0ea5e9] hover:from-[#0369a1] hover:to-[#0284c7] text-white font-extrabold text-sm transition-all shadow-lg shadow-[#0284c7]/25 hover:scale-105 active:scale-95"
              >
                <span>{isId ? 'Ambil Kit Lengkap Sekarang' : 'Claim Complete Kit Now'}</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. TESTIMONIALS (Clean Quote Cards in Crisp Light Style) ── */}
      <section id="testimonials" className="py-20 border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-4xl font-black text-[#0f172a] tracking-tight uppercase mb-3">
              {isId ? 'BUKTI NYATA DARI KREATOR LAIN' : 'REAL RESULTS FROM CREATORS'}
            </h2>
            <p className="text-sm text-slate-600">
              {isId ? 'Mereka yang sudah take action dan melihat hasil views-nya langsung.' : 'Creators who applied the workflow and achieved immediate traction.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#f8fafc] p-7 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
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

            <div className="bg-[#f8fafc] p-7 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
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

            <div className="bg-[#f8fafc] p-7 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
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

      {/* ── 6. PRICING & SHOPIFY CHECKOUT CARD ── */}
      <section id="pricing" className="py-24 relative overflow-hidden border-b border-slate-200 text-center bg-[#f8fafc]">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[450px] rounded-full pointer-events-none opacity-15 blur-[130px]"
          style={{ background: '#0284c7' }}
        />

        <div className="max-w-xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="bg-[#0f172a] border-2 border-[#0284c7] rounded-3xl p-8 sm:p-10 shadow-2xl shadow-sky-900/20 text-left relative">
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
              <span className="text-base text-slate-400 line-through font-medium">$49</span>
              <span className="text-5xl sm:text-6xl font-black text-white">$19</span>
              <span className="text-xs text-[#38bdf8] font-bold uppercase tracking-wider">{isId ? 'Sekali Bayar' : 'One-Time'}</span>
            </div>

            <p className="text-xs text-slate-300 mb-8">
              {isId ? 'Tanpa biaya bulanan. Akses instan langsung dikirim ke email.' : 'No monthly subscription. Instant digital access delivered 24/7.'}
            </p>

            {/* Direct Shopify Checkout CTA */}
            <a
              href={SHOPIFY_PRODUCT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 rounded-full bg-gradient-to-r from-[#0284c7] to-[#38bdf8] hover:from-[#0369a1] hover:to-[#0ea5e9] text-white font-extrabold text-base flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#0284c7]/30 hover:scale-[1.02] active:scale-98 transition-all block text-center mb-4"
            >
              <span>{isId ? 'DAPATKAN AKSES SEKARANG - $19' : 'GET INSTANT ACCESS - $19'}</span>
              <ExternalLink size={16} />
            </a>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck size={14} className="text-[#38bdf8]" />
              <span>{isId ? 'Pembayaran Aman & Terenkripsi via Shopify' : 'Secure & Encrypted Checkout via Shopify'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. FAQ ACCORDION ── */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a] uppercase mb-2">
              {isId ? 'PERTANYAAN UMUM (FAQ)' : 'FREQUENTLY ASKED QUESTIONS'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              {isId ? 'Jawaban cepat untuk hal-hal yang sering ditanyakan.' : 'Everything you need to know before getting started.'}
            </p>
          </div>

          <div className="space-y-3">
            <div className="bg-[#f8fafc] rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <button
                type="button"
                onClick={() => toggleFaq(0)}
                className="w-full p-5 text-left font-bold text-sm sm:text-base text-[#0f172a] flex items-center justify-between gap-4 cursor-pointer hover:text-[#0284c7] transition-colors"
              >
                <span>{isId ? 'Apakah saya membutuhkan software berbayar atau kamera?' : 'Do I need expensive cameras or paid software?'}</span>
                <ChevronDown size={18} className={`shrink-0 transition-transform ${openFaq === 0 ? 'rotate-180 text-[#0284c7]' : 'text-slate-500'}`} />
              </button>
              {openFaq === 0 && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200 bg-white">
                  {isId
                    ? 'Sama sekali tidak! Anda hanya memerlukan laptop atau HP dengan koneksi internet. Semua tools AI yang digunakan gratis atau menyediakan free trial.'
                    : 'Not at all! All you need is a laptop or phone with internet access. The primary AI tools featured offer free tiers or trial access.'}
                </div>
              )}
            </div>

            <div className="bg-[#f8fafc] rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <button
                type="button"
                onClick={() => toggleFaq(1)}
                className="w-full p-5 text-left font-bold text-sm sm:text-base text-[#0f172a] flex items-center justify-between gap-4 cursor-pointer hover:text-[#0284c7] transition-colors"
              >
                <span>{isId ? 'Saya masih pemula tanpa pengalaman AI, apakah bisa?' : 'I am a complete beginner, is this suitable for me?'}</span>
                <ChevronDown size={18} className={`shrink-0 transition-transform ${openFaq === 1 ? 'rotate-180 text-[#0284c7]' : 'text-slate-500'}`} />
              </button>
              {openFaq === 1 && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200 bg-white">
                  {isId
                    ? 'Bisa banget! Materi dirancang dari nol dengan panduan visual dan template prompt siap copy-paste tanpa perlu istilah teknis rumit.'
                    : 'Yes! The entire kit is beginner-engineered with step-by-step video walk-throughs and ready-to-paste prompt templates.'}
                </div>
              )}
            </div>

            <div className="bg-[#f8fafc] rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <button
                type="button"
                onClick={() => toggleFaq(2)}
                className="w-full p-5 text-left font-bold text-sm sm:text-base text-[#0f172a] flex items-center justify-between gap-4 cursor-pointer hover:text-[#0284c7] transition-colors"
              >
                <span>{isId ? 'Bagaimana cara mengakses materi setelah membeli?' : 'How do I access the materials after purchase?'}</span>
                <ChevronDown size={18} className={`shrink-0 transition-transform ${openFaq === 2 ? 'rotate-180 text-[#0284c7]' : 'text-slate-500'}`} />
              </button>
              {openFaq === 2 && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200 bg-white">
                  {isId
                    ? 'Segera setelah checkout berhasil di Shopify, Anda akan menerima email otomatis yang berisi link akses langsung ke seluruh video, prompt, dan tools generator.'
                    : 'Immediately upon checkout via Shopify, an automated email with direct access links to all tutorials, prompt sheets, and tool generators will be delivered to your inbox.'}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-12 bg-[#090d16] border-t border-slate-800 text-center text-xs text-slate-400">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-base">🎬</span>
            <span className="font-bold text-white">AI TIMELAPSE™</span>
            <span>&bull; All Rights Reserved</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href={SHOPIFY_PRODUCT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#38bdf8] font-bold hover:underline cursor-pointer"
            >
              {isId ? 'Beli Akses ($19) →' : 'Get Access ($19) →'}
            </a>
          </div>

          <div>
            &copy; {new Date().getFullYear()} AI TIMELAPSE™.
          </div>
        </div>
      </footer>
    </div>
  );
}
