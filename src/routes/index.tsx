import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useInView } from "framer-motion";
import {
  Sun, Home as HomeIcon, Building2, Factory, Droplets, Lamp, Fence, Camera, Wrench,
  Phone, Mail, MapPin, Clock, ArrowRight, ArrowUp, Menu, X, Check,
  Award, Users, Shield, Zap, IndianRupee, Sparkles, ChevronDown, Star,
  MessageCircle, PhoneCall, Calculator as CalculatorIcon, TrendingUp, Leaf, Ruler,
} from "lucide-react";

import heroImg from "@/assets/hero-solar.jpg";
import aboutImg from "@/assets/about-installation.jpg";
import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import p4 from "@/assets/project-4.jpg";
import p5 from "@/assets/project-5.jpg";
import p6 from "@/assets/project-6.jpg";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

/* ---------- Utilities ---------- */
import type { Variants } from "framer-motion";
const EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } },
};
const fadeRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } },
};
const stagger: Variants = { show: { transition: { staggerChildren: 0.08 } } };

function Reveal({ children, variants = fadeUp, className = "" }: any) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Counter({ to, suffix = "", duration = 2 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const step = (t: number) => {
      if (!start) start = t;
      const p = Math.min((t - start) / (duration * 1000), 1);
      setVal(Math.floor(to * (0.1 + 0.9 * (1 - Math.pow(1 - p, 3)))));
      if (p < 1) requestAnimationFrame(step);
      else setVal(to);
    };
    requestAnimationFrame(step);
  }, [inView, to, duration]);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

/* ---------- Nav ---------- */
const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "calculator", label: "Calculator" },
  { id: "subsidy", label: "Subsidy" },
  { id: "testimonials", label: "Reviews" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.2 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[60] gradient-sun"
    />
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "py-2" : "py-4"
          }`}
      >
        <div className="mx-auto max-w-7xl px-4">
          <div
            className={`flex items-center justify-between rounded-2xl px-4 md:px-6 py-3 transition-all ${scrolled ? "glass shadow-[var(--shadow-soft)]" : "bg-white/40 backdrop-blur-md border border-white/40"
              }`}
          >
            <a href="#home" className="flex items-center gap-2.5 shrink-0">
              <img
                src={logo}
                alt="Aditya Solar Solution"
                className="
    h-10
    w-auto
    object-contain
    transition-all
    duration-300
    group-hover:scale-105

    sm:h-14
    md:h-16
    lg:h-16
  "
              />
            </a>
            <nav className="hidden lg:flex items-center gap-1">
              {NAV.map((n) => (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  className="px-3 py-2 text-sm font-medium text-[color:var(--color-ink)]/80 hover:text-[color:var(--color-royal)] transition-colors relative group"
                >
                  {n.label}
                  <span className="absolute left-3 right-3 -bottom-0.5 h-0.5 gradient-sun scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <a
                href="#contact"
                className="hidden md:inline-flex items-center gap-1.5 rounded-full gradient-royal text-white text-sm font-semibold px-4 py-2.5 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-glow)] transition-shadow"
              >
                Get Quote <ArrowRight className="h-4 w-4" />
              </a>
              <button
                onClick={() => setOpen(true)}
                className="lg:hidden grid place-items-center h-10 w-10 rounded-xl border border-border bg-white"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-[color:var(--color-royal-deep)]/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex items-center justify-between p-5">
        <a href="#home" className="flex items-center gap-2.5 shrink-0">
             <img
  src={logo}
  alt="Aditya Solar Solution"
  onError={() => console.log("Logo failed")}
  className="h-12 w-auto"
/>
            </a>
              <button
                onClick={() => setOpen(false)}
                className="grid place-items-center h-10 w-10 rounded-xl bg-white/10 text-white"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <motion.nav
              variants={stagger}
              initial="hidden"
              animate="show"
              className="flex flex-col px-6 pt-6 gap-2"
            >
              {NAV.map((n) => (
                <motion.a
                  key={n.id}
                  variants={fadeUp}
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  className="text-2xl font-display font-semibold text-white py-2 border-b border-white/10"
                >
                  {n.label}
                </motion.a>
              ))}
              <motion.a
                variants={fadeUp}
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-6 rounded-full gradient-sun text-white text-center font-semibold px-5 py-3.5"
              >
                Get Free Consultation
              </motion.a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.25]);

  return (
    <section id="home" ref={ref} className="relative min-h-screen w-full overflow-hidden pt-28 pb-20">
      {/* Background image with deep gradient wash */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 -z-10">
        <img
          src={heroImg}
          alt="Rooftop solar panel installation under a bright blue sky"
          className="h-full w-full object-cover"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--color-royal-deep)]/95 via-[color:var(--color-royal)]/80 to-[color:var(--color-royal-deep)]/70" />
        <div className="absolute inset-0 hero-pattern" />
        {/* subtle grid overlay */}
        <div className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </motion.div>

      {/* Floating orbs */}
      <motion.div
        aria-hidden
        animate={{ y: [0, 30, 0], x: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-24 -left-24 h-96 w-96 rounded-full bg-[color:var(--color-solar)]/30 blur-[120px]"
      />
      <motion.div
        aria-hidden
        animate={{ y: [0, -25, 0], x: [0, -10, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 -right-24 h-[28rem] w-[28rem] rounded-full bg-[color:var(--color-gold)]/25 blur-[130px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 grid lg:grid-cols-[1.15fr_1fr] gap-12 items-center min-h-[calc(100vh-7rem)]">
        {/* Left copy */}
        <motion.div variants={stagger} initial="hidden" animate="show" className="text-white">
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2.5 rounded-full glass-dark px-4 py-2 text-xs md:text-sm text-white/90 border border-white/15"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--color-gold)] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--color-gold)]" />
            </span>
            <span className="font-medium tracking-wide">Andhra Pradesh's Premium Solar EPC Partner</span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-display mt-7 text-[2.5rem] sm:text-6xl lg:text-[5.25rem] font-extrabold leading-[0.98] tracking-tight"
          >
            Illuminate <br className="hidden sm:block" />
            Your Life With{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[color:var(--color-gold)] via-[color:var(--color-solar)] to-[color:var(--color-gold)] bg-clip-text text-transparent">
                Aditya Solar
              </span>
              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.9, duration: 0.9, ease: EASE }}
                className="absolute -bottom-2 left-0 right-0 h-1.5 rounded-full gradient-sun origin-left"
              />
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-7 text-lg md:text-xl text-white/80 max-w-xl leading-relaxed"
          >
            End-to-end solar EPC solutions — from premium rooftop residential
            systems to industrial-scale plants. Engineered for performance,
            built to last <span className="text-white font-semibold">25+ years</span>.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-col sm:flex-row flex-wrap gap-3">
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full gradient-sun text-white font-semibold px-7 py-4 shadow-[var(--shadow-glow)] hover:scale-[1.03] transition-transform"
            >
              Get Free Consultation
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#calculator"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 border border-white/25 text-white font-semibold px-7 py-4 backdrop-blur hover:bg-white/20 transition-colors"
            >
              <CalculatorIcon className="h-4 w-4" /> Solar Savings Calculator
            </a>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            variants={fadeUp}
            className="mt-12 grid grid-cols-3 gap-6 max-w-lg border-t border-white/15 pt-6"
          >
            {[
              { n: "25+", l: "Years Experience" },
              { n: "200+", l: "Installations" },
              { n: "100%", l: "MNRE Approved" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-white to-[color:var(--color-gold)] bg-clip-text text-transparent">
                  {s.n}
                </div>
                <div className="text-[11px] md:text-xs text-white/60 uppercase tracking-[0.15em] mt-1">
                  {s.l}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right visual — premium stacked card */}
        <motion.div
          variants={fadeRight}
          initial="hidden"
          animate="show"
          className="relative hidden lg:block"
        >
          <div className="absolute -inset-8 gradient-sun rounded-[3rem] blur-3xl opacity-30" />

          {/* Rotating sun accent */}
          <motion.div
            aria-hidden
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute -top-10 -right-6 h-32 w-32 rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, #FDB813, #F97316, #FDB813, #F97316, #FDB813)",
              filter: "blur(2px)",
              opacity: 0.55,
            }}
          />

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative glass rounded-[2rem] p-7 shadow-[var(--shadow-soft)] border border-white/60"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-[color:var(--color-solar)] font-bold">
                  Certified Partner
                </p>
                <h3 className="font-display text-2xl font-bold text-[color:var(--color-royal-deep)] mt-1">
                  Why choose Aditya Solar
                </h3>
              </div>
              <div className="grid place-items-center h-14 w-14 rounded-2xl gradient-sun text-white shadow-[var(--shadow-glow)]">
                <Award className="h-7 w-7" />
              </div>
            </div>
            <ul className="space-y-3.5">
              {[
                "Tier-1 Panels & Premium Inverters",
                "In-house Design & Engineering",
                "PM Surya Ghar Subsidy Assistance",
                "25-Year Performance Warranty",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-0.5 grid place-items-center h-6 w-6 rounded-full bg-[color:var(--color-leaf)]/15 text-[color:var(--color-leaf)] shrink-0">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-[color:var(--color-ink)] font-medium">{t}</span>
                </li>
              ))}
            </ul>

            {/* Floating mini badge */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 rounded-2xl bg-white shadow-[var(--shadow-soft)] px-4 py-3 flex items-center gap-3 border border-[color:var(--color-line)]"
            >
              <div className="grid place-items-center h-10 w-10 rounded-xl bg-[color:var(--color-leaf)]/15 text-[color:var(--color-leaf)]">
                <Leaf className="h-5 w-5" />
              </div>
              <div>
                <div className="font-display font-bold text-[color:var(--color-royal-deep)] leading-tight">
                  Clean Energy
                </div>
                <div className="text-[11px] text-[color:var(--color-muted-ink)] uppercase tracking-wider">
                  Zero Emissions
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-4 rounded-2xl bg-[color:var(--color-royal-deep)] text-white shadow-[var(--shadow-soft)] px-4 py-3 flex items-center gap-3"
            >
              <div className="grid place-items-center h-10 w-10 rounded-xl bg-[color:var(--color-gold)]/20 text-[color:var(--color-gold)]">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <div className="font-display font-bold leading-tight">Save up to 90%</div>
                <div className="text-[11px] text-white/70 uppercase tracking-wider">
                  On Electricity Bills
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 flex flex-col items-center gap-2 text-[10px]">
        <span className="uppercase tracking-[0.35em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="h-9 w-6 rounded-full border border-white/40 grid place-items-start p-1"
        >
          <span className="block h-2 w-1 rounded-full bg-white/80" />
        </motion.div>
      </div>
    </section>
  );
}


/* ---------- About ---------- */
function About() {
  return (
    <section id="about" className="section relative overflow-hidden">
      <div className="absolute inset-0 -z-10 grid-lines opacity-40" />
      <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
        <Reveal variants={fadeLeft}>
          <div className="relative">
            <div className="absolute -inset-4 gradient-royal rounded-[2rem] opacity-10 blur-2xl" />
            <div className="relative rounded-3xl overflow-hidden shadow-[var(--shadow-soft)]">
              <img
                src={aboutImg}
                alt="Aditya Solar engineers installing rooftop panels"
                loading="lazy"
                width={1400}
                height={1000}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 md:-right-8 glass rounded-2xl p-5 shadow-[var(--shadow-soft)] w-56">
              <div className="flex items-center gap-3">
                <div className="grid place-items-center h-12 w-12 rounded-xl gradient-sun text-white">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-display text-2xl font-bold text-[color:var(--color-royal-deep)]">
                    <Counter to={200} suffix="+" />
                  </div>
                  <div className="text-xs text-[color:var(--color-muted-ink)] uppercase tracking-wider">
                    Installations
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal variants={fadeRight}>
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[color:var(--color-solar)]">
            About Us
          </span>
          <h2 className="font-display mt-3 text-3xl md:text-5xl font-extrabold text-[color:var(--color-royal-deep)] leading-tight">
            Trusted Solar <span className="text-gradient-royal">EPC Partner</span>
          </h2>
          <p className="mt-6 text-[color:var(--color-muted-ink)] leading-relaxed text-lg">
            Aditya Solar Solution is a trusted solar EPC company delivering
            residential, commercial and industrial solar systems across Andhra
            Pradesh.
          </p>
          <p className="mt-4 text-[color:var(--color-muted-ink)] leading-relaxed">
            Backed by over 25 years of industry experience and more than 200
            completed installations, we provide end-to-end solar solutions — from
            consultation and design to installation and after-sales support.
          </p>
          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            {[
              { icon: Shield, t: "MNRE Approved", d: "Certified components & standards" },
              { icon: Users, t: "Expert Engineers", d: "Trained & certified installers" },
              { icon: IndianRupee, t: "Subsidy Support", d: "End-to-end paperwork" },
              { icon: Wrench, t: "After-Sales Care", d: "Long-term maintenance" },
            ].map(({ icon: Icon, t, d }) => (
              <div
                key={t}
                className="rounded-2xl border border-[color:var(--color-line)] bg-white p-4 hover:shadow-[var(--shadow-soft)] transition-shadow"
              >
                <div className="grid place-items-center h-10 w-10 rounded-xl bg-[color:var(--color-royal)]/10 text-[color:var(--color-royal)]">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mt-3 font-semibold text-[color:var(--color-ink)]">{t}</div>
                <div className="text-sm text-[color:var(--color-muted-ink)]">{d}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Services ---------- */
const SERVICES = [
  { icon: HomeIcon, t: "Residential Rooftop", d: "Custom rooftop systems that cut home electricity bills by up to 90%." },
  { icon: Building2, t: "Commercial Solar", d: "Grid-tied systems for offices, retail and institutions." },
  { icon: Factory, t: "Industrial Solar", d: "Megawatt-scale plants engineered for reliability." },
  { icon: Droplets, t: "Solar Water Pumps", d: "AC/DC pumps for irrigation and agri-water needs." },
  { icon: Lamp, t: "Solar Street Lights", d: "Autonomous, weatherproof lighting for streets & campuses." },
  { icon: Fence, t: "Solar Fencing", d: "Farm-boundary protection powered entirely by sun." },
  { icon: Camera, t: "Solar CCTV", d: "Off-grid surveillance for remote sites." },
  { icon: Wrench, t: "AMC & Maintenance", d: "Preventive service that keeps output at its peak." },
];
function Services() {
  return (
    <section id="services" className="section relative bg-[color:var(--color-cloud)]">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[color:var(--color-solar)]">
            What We Do
          </span>
          <h2 className="font-display mt-3 text-3xl md:text-5xl font-extrabold text-[color:var(--color-royal-deep)]">
            Complete Solar Solutions <br />
            <span className="text-gradient-royal">Under One Roof</span>
          </h2>
          <p className="mt-5 text-[color:var(--color-muted-ink)] text-lg">
            From design to commissioning, we handle every stage so you don't have
            to coordinate multiple vendors.
          </p>
        </Reveal>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {SERVICES.map(({ icon: Icon, t, d }) => (
            <motion.div
              key={t}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className="group relative rounded-3xl bg-white p-6 border border-[color:var(--color-line)] hover:border-transparent hover:shadow-[var(--shadow-soft)] transition-all overflow-hidden"
            >
              <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full gradient-sun opacity-0 group-hover:opacity-20 blur-2xl transition-opacity" />
              <div className="relative grid place-items-center h-14 w-14 rounded-2xl gradient-royal text-white shadow-[var(--shadow-soft)]">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="font-display mt-5 text-xl font-bold text-[color:var(--color-royal-deep)]">
                {t}
              </h3>
              <p className="mt-2 text-sm text-[color:var(--color-muted-ink)] leading-relaxed">{d}</p>
              <a
                href="#contact"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--color-solar)] group/link"
              >
                Read more
                <ArrowRight className="h-3.5 w-3.5 group-hover/link:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Projects (Masonry + Lightbox) ---------- */
const PROJECTS = [
  { img: p1, tag: "Residential", title: "5kW Rooftop — Vijayawada" },
  { img: p2, tag: "Commercial", title: "80kW Office Complex — Guntur" },
  { img: p3, tag: "Industrial", title: "1.2 MW Factory Roof — Vizag" },
  { img: p4, tag: "Solar Water Pump", title: "7.5HP Agri Pump — Krishna" },
  { img: p5, tag: "Residential", title: "10kW Villa — Tirupati" },
  { img: p6, tag: "Public", title: "Solar Street Lighting — Nellore" },
];
function Projects() {
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState<null | (typeof PROJECTS)[number]>(null);
  const tags = ["All", "Residential", "Commercial", "Industrial", "Solar Water Pump", "Public"];
  const shown = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.tag === filter);
  return (
    <section id="projects" className="section relative">
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[color:var(--color-solar)]">
              Projects
            </span>
            <h2 className="font-display mt-3 text-3xl md:text-5xl font-extrabold text-[color:var(--color-royal-deep)]">
              Installations <span className="text-gradient-royal">Across AP</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`text-xs font-semibold px-4 py-2 rounded-full border transition-all ${filter === t
                  ? "gradient-royal text-white border-transparent"
                  : "bg-white text-[color:var(--color-ink)] border-[color:var(--color-line)] hover:border-[color:var(--color-royal)]"
                  }`}
              >
                {t}
              </button>
            ))}
          </div>
        </Reveal>
        <motion.div
          layout
          className="mt-12 columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]"
        >
          {shown.map((p, i) => (
            <motion.button
              key={p.title}
              layout
              onClick={() => setActive(p)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.6 }}
              className="group relative mb-5 w-full rounded-3xl overflow-hidden shadow-[var(--shadow-soft)] block break-inside-avoid text-left"
            >
              <img
                src={p.img}
                alt={p.title}
                loading="lazy"
                className="w-full h-auto group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-royal-deep)]/90 via-transparent to-transparent opacity-90" />
              <div className="absolute inset-0 p-5 flex flex-col justify-end">
                <span className="self-start inline-block text-[10px] uppercase tracking-[0.2em] font-bold px-2.5 py-1 rounded-full gradient-sun text-white">
                  {p.tag}
                </span>
                <div className="font-display text-white text-lg font-bold mt-3">{p.title}</div>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[80] bg-black/85 backdrop-blur-xl grid place-items-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full rounded-3xl overflow-hidden"
            >
              <img src={active.img} alt={active.title} className="w-full h-auto" />
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => setActive(null)}
                  className="grid place-items-center h-11 w-11 rounded-full bg-white text-[color:var(--color-ink)]"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/90 to-transparent text-white">
                <span className="text-xs uppercase tracking-[0.2em] font-bold text-[color:var(--color-gold)]">
                  {active.tag}
                </span>
                <div className="font-display text-2xl font-bold mt-1">{active.title}</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------- Why Choose Us ---------- */
const WHY = [
  { icon: Award, t: "25+ Years Experience" },
  { icon: Zap, t: "200+ Installations" },
  { icon: Shield, t: "Premium Quality Products" },
  { icon: Users, t: "Experienced Engineers" },
  { icon: IndianRupee, t: "Government Subsidy Support" },
  { icon: Wrench, t: "After Sales Support" },
  { icon: Sparkles, t: "Affordable Pricing" },
  { icon: Sun, t: "Fast Installation" },
];
function WhyUs() {
  return (
    <section id="why" className="section relative overflow-hidden bg-[color:var(--color-royal-deep)] text-white">
      <div className="absolute inset-0 hero-pattern opacity-70" />
      <div className="absolute inset-0 grid-lines opacity-10" />
      <div className="relative mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[color:var(--color-gold)]">
            Why Choose Us
          </span>
          <h2 className="font-display mt-3 text-3xl md:text-5xl font-extrabold">
            Built on trust,{" "}
            <span className="bg-gradient-to-r from-[color:var(--color-gold)] to-[color:var(--color-solar)] bg-clip-text text-transparent">
              engineered to last
            </span>
          </h2>
        </Reveal>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {WHY.map(({ icon: Icon, t }) => (
            <motion.div
              key={t}
              variants={fadeUp}
              whileHover={{ y: -6, scale: 1.02 }}
              className="glass-dark rounded-2xl p-5 hover:border-white/30 transition-colors"
            >
              <div className="grid place-items-center h-12 w-12 rounded-xl gradient-sun text-white">
                <Icon className="h-5 w-5" />
              </div>
              <div className="mt-4 font-display font-bold text-lg">{t}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Stats ---------- */
const STATS = [
  { n: 25, s: "+", l: "Years Experience" },
  { n: 200, s: "+", l: "Installations" },
  { n: 100, s: "%", l: "Customer Satisfaction" },
  { n: 24, s: "/7", l: "Support" },
];
function Stats() {
  return (
    <section className="section py-16 md:py-20 relative">
      <div className="mx-auto max-w-7xl grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((s, i) => (
          <Reveal key={s.l}>
            <div className="rounded-3xl border border-[color:var(--color-line)] bg-white p-8 text-center hover:shadow-[var(--shadow-soft)] transition-shadow">
              <div className="font-display text-5xl md:text-6xl font-extrabold text-gradient-royal">
                <Counter to={s.n} suffix={s.s} />
              </div>
              <div className="mt-2 text-sm uppercase tracking-[0.2em] text-[color:var(--color-muted-ink)] font-semibold">
                {s.l}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- Solar Calculator ---------- */
function SolarCalculator() {
  const [category, setCategory] = useState<"Residential" | "Commercial">("Residential");
  const [bill, setBill] = useState(5000);

  const result = useMemo(() => {
    // Assume avg tariff ~ ₹8.5/unit; 1kW ≈ 120 units/month in AP
    const tariff = category === "Residential" ? 8 : 9;
    const monthlyUnits = bill / tariff;
    const systemKW = Math.max(1, Math.round(monthlyUnits / 120));
    const annualGen = systemKW * 1440; // kWh/year
    const costPerKW = category === "Residential" ? 65000 : 55000;
    const cost = systemKW * costPerKW;
    let subsidy = 0;
    if (category === "Residential") {
      if (systemKW >= 3) subsidy = 78000;
      else if (systemKW === 2) subsidy = 60000;
      else if (systemKW === 1) subsidy = 30000;
    }
    const netCost = cost - subsidy;
    const monthlySavings = Math.round(monthlyUnits * tariff);
    const annualSavings = monthlySavings * 12;
    const payback = annualSavings > 0 ? +(netCost / annualSavings).toFixed(1) : 0;
    const lifetimeSavings = annualSavings * 25 - netCost;
    const co2 = Math.round(annualGen * 0.82); // kg CO2/year avoided
    const trees = Math.round(co2 / 21);
    const area = systemKW * 100; // sqft
    return {
      systemKW, annualGen, cost, subsidy, netCost, monthlySavings,
      annualSavings, payback, lifetimeSavings, co2, trees, area,
    };
  }, [category, bill]);

  const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

  return (
    <section id="calculator" className="section relative overflow-hidden">
      <div className="absolute inset-0 -z-10 grid-lines opacity-40" />
      <div className="absolute -top-24 right-1/4 h-80 w-80 rounded-full gradient-sun opacity-10 blur-3xl -z-10" />
      <div className="mx-auto max-w-7xl">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[color:var(--color-solar)]">
            Solar Calculator
          </span>
          <h2 className="font-display mt-3 text-3xl md:text-5xl font-extrabold text-[color:var(--color-royal-deep)]">
            Estimate your <span className="text-gradient-royal">solar savings</span>
          </h2>
          <p className="mt-4 text-[color:var(--color-muted-ink)]">
            Move the slider to see the recommended system, government subsidy and payback in seconds.
          </p>
        </Reveal>

        <div className="mt-12 grid lg:grid-cols-[1fr_1.15fr] gap-6">
          {/* Inputs */}
          <Reveal variants={fadeLeft}>
            <div className="rounded-3xl bg-white border border-[color:var(--color-line)] p-6 md:p-8 shadow-[var(--shadow-soft)]">
              <div className="flex items-center gap-3">
                <div className="grid place-items-center h-12 w-12 rounded-2xl gradient-royal text-white">
                  <CalculatorIcon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-display font-bold text-lg text-[color:var(--color-royal-deep)]">
                    Your details
                  </div>
                  <div className="text-xs text-[color:var(--color-muted-ink)]">
                    We'll compute a personalised estimate
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-muted-ink)]">
                  Property type
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 p-1 rounded-2xl bg-[color:var(--color-cloud)] border border-[color:var(--color-line)]">
                  {(["Residential", "Commercial"] as const).map((c) => (
                    <button
                      key={c}
                      onClick={() => setCategory(c)}
                      className={`py-2.5 rounded-xl text-sm font-semibold transition-all ${category === c
                        ? "gradient-royal text-white shadow-[var(--shadow-soft)]"
                        : "text-[color:var(--color-muted-ink)] hover:text-[color:var(--color-royal)]"
                        }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-muted-ink)]">
                    Monthly electricity bill
                  </div>
                  <div className="font-display font-bold text-xl text-[color:var(--color-royal-deep)]">
                    {inr(bill)}
                  </div>
                </div>
                <input
                  type="range"
                  min={1000}
                  max={100000}
                  step={500}
                  value={bill}
                  onChange={(e) => setBill(Number(e.target.value))}
                  className="mt-4 w-full accent-[color:var(--color-solar)]"
                />
                <div className="mt-1 flex justify-between text-[11px] text-[color:var(--color-muted-ink)]">
                  <span>₹1,000</span>
                  <span>₹1,00,000</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-2">
                {[3000, 5000, 10000, 25000, 50000, 75000].map((v) => (
                  <button
                    key={v}
                    onClick={() => setBill(v)}
                    className={`py-2 rounded-xl text-xs font-semibold border transition-all ${bill === v
                      ? "border-[color:var(--color-royal)] bg-[color:var(--color-royal)]/5 text-[color:var(--color-royal-deep)]"
                      : "border-[color:var(--color-line)] text-[color:var(--color-muted-ink)] hover:border-[color:var(--color-royal)]/50"
                      }`}
                  >
                    {inr(v)}
                  </button>
                ))}
              </div>

              <a
                href="#contact"
                className="mt-8 w-full inline-flex items-center justify-center gap-2 rounded-full gradient-sun text-white font-semibold px-6 py-3.5 shadow-[var(--shadow-glow)] hover:scale-[1.02] transition-transform"
              >
                Get an exact quote <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>

          {/* Results */}
          <Reveal variants={fadeRight}>
            <div className="relative rounded-3xl overflow-hidden gradient-royal text-white p-6 md:p-8 h-full">
              <div className="absolute inset-0 hero-pattern opacity-60" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.3em] text-[color:var(--color-gold)] font-semibold">
                      Recommended System
                    </span>
                    <div className="mt-2 font-display font-extrabold leading-none">
                      <span className="text-5xl md:text-6xl bg-gradient-to-r from-[color:var(--color-gold)] to-[color:var(--color-solar)] bg-clip-text text-transparent">
                        {result.systemKW} kW
                      </span>
                    </div>
                    <div className="mt-2 text-white/70 text-sm">
                      Rooftop area needed ≈ {result.area} sq. ft
                    </div>
                  </div>
                  <div className="grid place-items-center h-16 w-16 rounded-2xl bg-white/10 border border-white/20">
                    <Sun className="h-7 w-7 text-[color:var(--color-gold)]" />
                  </div>
                </div>

                <div className="mt-8 grid sm:grid-cols-2 gap-3">
                  <ResultCard
                    icon={IndianRupee}
                    label="Monthly savings"
                    value={inr(result.monthlySavings)}
                    accent="gold"
                  />
                  <ResultCard
                    icon={TrendingUp}
                    label="25-year savings"
                    value={inr(Math.max(0, result.lifetimeSavings))}
                    accent="solar"
                  />
                  <ResultCard
                    icon={Shield}
                    label="Govt. subsidy"
                    value={result.subsidy > 0 ? inr(result.subsidy) : "—"}
                    accent="leaf"
                  />
                  <ResultCard
                    icon={Clock}
                    label="Payback period"
                    value={`${result.payback} yrs`}
                    accent="gold"
                  />
                </div>

                <div className="mt-4 rounded-2xl bg-white/10 border border-white/15 p-4 grid grid-cols-3 gap-3 text-center">
                  <MiniStat label="System cost" value={inr(result.cost)} />
                  <MiniStat label="After subsidy" value={inr(result.netCost)} />
                  <MiniStat label="Annual generation" value={`${result.annualGen.toLocaleString("en-IN")} kWh`} />
                </div>

                <div className="mt-4 flex items-center gap-3 rounded-2xl bg-white/5 border border-white/10 p-4">
                  <div className="grid place-items-center h-11 w-11 rounded-xl bg-[color:var(--color-leaf)]/25 border border-[color:var(--color-leaf)]/40 shrink-0">
                    <Leaf className="h-5 w-5 text-[color:var(--color-leaf)]" />
                  </div>
                  <div className="text-sm text-white/85">
                    You'd offset ~<b>{result.co2.toLocaleString("en-IN")} kg</b> of CO₂ every year —
                    the equivalent of planting <b>{result.trees}</b> trees.
                  </div>
                </div>

                <p className="mt-4 text-[11px] text-white/55 flex items-start gap-1.5">
                  <Ruler className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                  Estimates only. Final figures depend on roof orientation, shading, tariff slab and DISCOM approvals.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ResultCard({
  icon: Icon, label, value, accent,
}: {
  icon: any; label: string; value: string;
  accent: "gold" | "solar" | "leaf";
}) {
  const bg =
    accent === "gold"
      ? "from-[color:var(--color-gold)]/25 to-[color:var(--color-gold)]/5 border-[color:var(--color-gold)]/40"
      : accent === "solar"
        ? "from-[color:var(--color-solar)]/25 to-[color:var(--color-solar)]/5 border-[color:var(--color-solar)]/40"
        : "from-[color:var(--color-leaf)]/25 to-[color:var(--color-leaf)]/5 border-[color:var(--color-leaf)]/40";
  return (
    <div className={`rounded-2xl bg-gradient-to-br ${bg} border p-4`}>
      <div className="flex items-center gap-2 text-white/80 text-[11px] uppercase tracking-[0.2em] font-semibold">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <div className="mt-2 font-display font-extrabold text-2xl text-white">
        {value}
      </div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-semibold">{label}</div>
      <div className="mt-1 font-display font-bold text-white text-sm md:text-base">{value}</div>
    </div>
  );
}


/* ---------- Subsidy ---------- */
function Subsidy() {
  return (
    <section id="subsidy" className="section relative">
      <div className="mx-auto max-w-7xl relative overflow-hidden rounded-[2rem] gradient-royal text-white p-8 md:p-14">
        <div className="absolute inset-0 hero-pattern opacity-70" />
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full gradient-sun opacity-30 blur-3xl" />
        <div className="relative grid lg:grid-cols-2 gap-10 items-center">
          <Reveal variants={fadeLeft}>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-xs uppercase tracking-[0.25em] font-semibold">
              <IndianRupee className="h-3.5 w-3.5" /> Government Subsidy
            </span>
            <h2 className="font-display mt-4 text-3xl md:text-5xl font-extrabold leading-tight">
              PM Surya Ghar <br />
              <span className="bg-gradient-to-r from-[color:var(--color-gold)] to-[color:var(--color-solar)] bg-clip-text text-transparent">
                Muft Bijli Yojana
              </span>
            </h2>
            <p className="mt-5 text-white/85 max-w-xl">
              Under the Government of India's flagship rooftop solar program,
              eligible households can avail subsidies of up to ₹78,000. We handle
              the paperwork end-to-end.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full gradient-sun text-white font-semibold px-6 py-3.5 shadow-[var(--shadow-glow)]"
              >
                Know More <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/25 text-white font-semibold px-6 py-3.5 hover:bg-white/20 transition-colors"
              >
                Request Site Visit
              </a>
            </div>
          </Reveal>
          <Reveal variants={fadeRight}>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: IndianRupee, t: "Government Subsidy", d: "Up to ₹78,000 direct benefit" },
                { icon: Zap, t: "Lower Electricity Bills", d: "Save up to 90% each month" },
                { icon: Sparkles, t: "Fast ROI", d: "Payback in as little as 4 years" },
                { icon: Shield, t: "Net Metering", d: "Sell excess power back to grid" },
              ].map(({ icon: Icon, t, d }) => (
                <div key={t} className="glass-dark rounded-2xl p-5 hover:bg-white/10 transition-colors">
                  <div className="grid place-items-center h-11 w-11 rounded-xl gradient-sun">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="mt-3 font-display font-bold">{t}</div>
                  <div className="text-sm text-white/75">{d}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Process ---------- */
const STEPS = [
  { n: "01", t: "Free Site Visit", d: "We inspect the site and understand your energy needs." },
  { n: "02", t: "Energy Analysis", d: "Detailed load profile and generation feasibility report." },
  { n: "03", t: "Custom Design", d: "Engineered system layout with premium components." },
  { n: "04", t: "Professional Installation", d: "Certified crew — safe, fast, on-schedule." },
  { n: "05", t: "Testing & Handover", d: "Full commissioning, subsidy filing and training." },
];
function Process() {
  return (
    <section className="section bg-[color:var(--color-cloud)]">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[color:var(--color-solar)]">
            How We Work
          </span>
          <h2 className="font-display mt-3 text-3xl md:text-5xl font-extrabold text-[color:var(--color-royal-deep)]">
            A simple <span className="text-gradient-royal">5-step process</span>
          </h2>
        </Reveal>
        <div className="mt-14 relative">
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[color:var(--color-royal)]/30 to-transparent" />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
          >
            {STEPS.map((s) => (
              <motion.div key={s.n} variants={fadeUp} className="relative">
                <div className="relative rounded-3xl bg-white border border-[color:var(--color-line)] p-6 h-full hover:shadow-[var(--shadow-soft)] transition-shadow">
                  <div className="grid place-items-center h-14 w-14 rounded-2xl gradient-royal text-white font-display font-bold text-lg mx-auto -mt-14 shadow-[var(--shadow-soft)]">
                    {s.n}
                  </div>
                  <div className="text-center mt-4">
                    <div className="font-display font-bold text-lg text-[color:var(--color-royal-deep)]">
                      {s.t}
                    </div>
                    <div className="text-sm text-[color:var(--color-muted-ink)] mt-2">{s.d}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonials ---------- */
const REVIEWS = [
  {
    name: "Ravi Kumar",
    role: "Homeowner, Vijayawada",
    text: "The team handled everything from subsidy paperwork to installation. My electricity bill dropped from ₹4,500 to under ₹400.",
  },
  {
    name: "Lakshmi Devi",
    role: "Business Owner, Guntur",
    text: "Professional, punctual and premium quality work. Our 80kW commercial system pays for itself in under 4 years.",
  },
  {
    name: "Suresh Reddy",
    role: "Farmer, Krishna District",
    text: "Solar water pump has been a game changer — reliable irrigation without diesel costs. Highly recommended.",
  },
  {
    name: "Anitha Rao",
    role: "Villa Owner, Tirupati",
    text: "Beautiful installation, seamless net-metering. Aditya Solar's engineers really know their craft.",
  },
];
function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % REVIEWS.length), 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <section id="testimonials" className="section relative overflow-hidden">
      <div className="absolute inset-0 -z-10 grid-lines opacity-40" />
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[color:var(--color-solar)]">
            Testimonials
          </span>
          <h2 className="font-display mt-3 text-3xl md:text-5xl font-extrabold text-[color:var(--color-royal-deep)]">
            Loved across <span className="text-gradient-royal">Andhra Pradesh</span>
          </h2>
        </Reveal>

        <div className="mt-14 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="glass rounded-3xl p-8 md:p-12 shadow-[var(--shadow-soft)] max-w-3xl mx-auto text-center"
            >
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(5)].map((_, k) => (
                  <Star key={k} className="h-5 w-5 fill-[color:var(--color-gold)] text-[color:var(--color-gold)]" />
                ))}
              </div>
              <p className="text-xl md:text-2xl font-display leading-relaxed text-[color:var(--color-ink)]">
                "{REVIEWS[i].text}"
              </p>
              <div className="mt-8 flex flex-col items-center">
                <div className="grid place-items-center h-14 w-14 rounded-full gradient-royal text-white font-display font-bold text-lg">
                  {REVIEWS[i].name.charAt(0)}
                </div>
                <div className="mt-3 font-semibold text-[color:var(--color-royal-deep)]">
                  {REVIEWS[i].name}
                </div>
                <div className="text-sm text-[color:var(--color-muted-ink)]">{REVIEWS[i].role}</div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="mt-8 flex justify-center gap-2">
            {REVIEWS.map((_, k) => (
              <button
                key={k}
                onClick={() => setI(k)}
                aria-label={`Testimonial ${k + 1}`}
                className={`h-2 rounded-full transition-all ${i === k ? "w-8 gradient-sun" : "w-2 bg-[color:var(--color-line)]"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
const FAQS = [
  { q: "How much does a rooftop solar system cost?", a: "A typical 3kW residential system costs ₹1.8–2.2 lakh before subsidy. Government subsidy can reduce this by up to ₹78,000." },
  { q: "How long does installation take?", a: "For residential systems, installation is usually completed in 2–4 working days after site readiness." },
  { q: "What is the ROI on rooftop solar?", a: "Most systems pay back in 4–6 years and continue generating for 25+ years — meaning 20+ years of free electricity." },
  { q: "Do you help with government subsidy paperwork?", a: "Yes. We handle end-to-end documentation for PM Surya Ghar Yojana and net-metering approvals." },
  { q: "What warranty do panels and inverters carry?", a: "Solar panels come with 25-year performance and 12-year product warranty. Inverters carry 5–10 year warranty depending on brand." },
  { q: "Will solar work during power cuts?", a: "Grid-tied systems shut off during outages for safety. With battery backup or hybrid inverters, you can keep essentials running." },
  { q: "What maintenance does a solar system need?", a: "Only periodic cleaning and an annual health check. Our AMC plans cover all servicing needs." },
  { q: "Which brands of panels & inverters do you use?", a: "We use Tier-1 MNRE-approved panels and premium inverters. Brand selection is finalised based on your budget and system size." },
  { q: "Do you provide service across all of Andhra Pradesh?", a: "Yes — we install and service across major districts in Andhra Pradesh including Vijayawada, Guntur, Vizag, Tirupati and more." },
  { q: "Can I sell excess power to the grid?", a: "Absolutely. Net-metering lets you export surplus power and get credited on your electricity bill." },
];
function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="section bg-[color:var(--color-cloud)]">
      <div className="mx-auto max-w-4xl">
        <Reveal className="text-center">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[color:var(--color-solar)]">
            FAQ
          </span>
          <h2 className="font-display mt-3 text-3xl md:text-5xl font-extrabold text-[color:var(--color-royal-deep)]">
            Frequently asked <span className="text-gradient-royal">questions</span>
          </h2>
        </Reveal>
        <div className="mt-12 space-y-3">
          {FAQS.map((f, idx) => {
            const isOpen = open === idx;
            return (
              <Reveal key={f.q}>
                <div
                  className={`rounded-2xl border transition-all ${isOpen
                    ? "bg-white border-[color:var(--color-royal)] shadow-[var(--shadow-soft)]"
                    : "bg-white border-[color:var(--color-line)]"
                    }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-display font-semibold text-[color:var(--color-royal-deep)]">
                      {f.q}
                    </span>
                    <span
                      className={`grid place-items-center h-8 w-8 rounded-full shrink-0 transition-all ${isOpen ? "gradient-sun text-white rotate-180" : "bg-[color:var(--color-cloud)] text-[color:var(--color-royal)]"
                        }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-[color:var(--color-muted-ink)] leading-relaxed">
                          {f.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="section relative">
      <div className="mx-auto max-w-7xl grid lg:grid-cols-[1fr_1.1fr] gap-8">
        <Reveal variants={fadeLeft} className="relative rounded-3xl overflow-hidden gradient-royal text-white p-8 md:p-10">
          <div className="absolute inset-0 hero-pattern opacity-60" />
          <div className="relative">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[color:var(--color-gold)]">
              Get in touch
            </span>
            <h2 className="font-display mt-3 text-3xl md:text-4xl font-extrabold">
              Let's power your <br />
              <span className="bg-gradient-to-r from-[color:var(--color-gold)] to-[color:var(--color-solar)] bg-clip-text text-transparent">
                next project
              </span>
            </h2>
            <p className="mt-4 text-white/80">
              Free site visit and quote across Andhra Pradesh. Our advisor will get back within 24 hours.
            </p>
            <div className="mt-8 space-y-4">
              {[
                { icon: Phone, l: "Phone", v: "+91 90000 00000" },
                { icon: Mail, l: "Email", v: "hello@adityasolar.in" },
                { icon: MapPin, l: "Address", v: "Andhra Pradesh, India" },
                { icon: Clock, l: "Working Hours", v: "Mon–Sat · 9:00 AM – 7:00 PM" },
              ].map(({ icon: Icon, l, v }) => (
                <div key={l} className="flex items-start gap-4">
                  <div className="grid place-items-center h-11 w-11 rounded-xl gradient-sun shrink-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-[0.2em] text-white/60">{l}</div>
                    <div className="font-semibold truncate">{v}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-2xl overflow-hidden border border-white/20">
              <iframe
                title="Aditya Solar location"
                src="https://www.google.com/maps?q=Vijayawada,%20Andhra%20Pradesh&output=embed"
                width="100%"
                height="220"
                loading="lazy"
                style={{ border: 0 }}
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </Reveal>

        <Reveal variants={fadeRight}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              setTimeout(() => setSent(false), 4000);
              (e.target as HTMLFormElement).reset();
            }}
            className="rounded-3xl bg-white border border-[color:var(--color-line)] p-8 md:p-10 shadow-[var(--shadow-soft)] h-full flex flex-col"
          >
            <h3 className="font-display text-2xl md:text-3xl font-extrabold text-[color:var(--color-royal-deep)]">
              Request a free quote
            </h3>
            <p className="text-sm text-[color:var(--color-muted-ink)] mt-2">
              Tell us a little about your requirement — we'll take it from there.
            </p>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <Field label="Full Name" name="name" required />
              <Field label="Phone" name="phone" type="tel" required />
              <Field label="Email" name="email" type="email" />
              <Field label="City" name="city" />
            </div>
            <label className="mt-4 block">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-muted-ink)]">
                Message
              </span>
              <textarea
                name="message"
                rows={4}
                required
                className="mt-2 w-full rounded-xl border border-[color:var(--color-line)] bg-[color:var(--color-cloud)] px-4 py-3 outline-none focus:border-[color:var(--color-royal)] focus:bg-white transition-colors resize-none"
                placeholder="Roof size, monthly bill, timeline…"
              />
            </label>
            <button
              type="submit"
              className="mt-6 group inline-flex items-center justify-center gap-2 rounded-full gradient-royal text-white font-semibold px-6 py-4 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-glow)] transition-shadow"
            >
              {sent ? (
                <>
                  <Check className="h-4 w-4" /> Thanks — we'll be in touch
                </>
              ) : (
                <>
                  Send Enquiry <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
            <p className="mt-4 text-xs text-[color:var(--color-muted-ink)]">
              By submitting, you agree to be contacted about your solar enquiry.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", required = false }: any) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-muted-ink)]">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full rounded-xl border border-[color:var(--color-line)] bg-[color:var(--color-cloud)] px-4 py-3 outline-none focus:border-[color:var(--color-royal)] focus:bg-white transition-colors"
      />
    </label>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="relative bg-[color:var(--color-royal-deep)] text-white pt-20 pb-8 overflow-hidden">
      <div className="absolute inset-0 hero-pattern opacity-50" />
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="grid lg:grid-cols-4 gap-10">
          <div className="lg:col-span-2 max-w-md">
            <div className="inline-flex items-center rounded-2xl bg-white/95 px-4 py-3 shadow-lg">
              <img
                src={logo}
                alt="Aditya Solar Solution"
                className="
    h-10
    w-auto
    object-contain
    transition-all
    duration-300
    group-hover:scale-105

    sm:h-14
    md:h-16
    lg:h-16
  "
              />

            </div>
            <p className="mt-5 text-white/70 leading-relaxed">
              Powering homes and businesses across Andhra Pradesh with premium
              solar EPC solutions since 2025. 25+ years of combined industry
              experience. MNRE approved.
            </p>
          </div>
          <div>
            <h4 className="font-display font-bold uppercase text-sm tracking-[0.2em] text-[color:var(--color-gold)]">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2 text-white/70">
              {NAV.slice(0, 6).map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className="hover:text-[color:var(--color-gold)] transition-colors">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold uppercase text-sm tracking-[0.2em] text-[color:var(--color-gold)]">
              Contact
            </h4>
            <ul className="mt-4 space-y-3 text-white/70 text-sm">
              <li className="flex items-start gap-2"><Phone className="h-4 w-4 mt-0.5 text-[color:var(--color-gold)]" /> +91 90000 00000</li>
              <li className="flex items-start gap-2"><Mail className="h-4 w-4 mt-0.5 text-[color:var(--color-gold)]" /> hello@adityasolar.in</li>
              <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 text-[color:var(--color-gold)]" /> Andhra Pradesh, India</li>
            </ul>
            <div className="mt-5 flex gap-2">
              {["F", "in", "X", "IG"].map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={s}
                  className="grid place-items-center h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60">
          <span>© {new Date().getFullYear()} Aditya Solar Solution. All rights reserved.</span>
          <span>Designed for a greener tomorrow · Andhra Pradesh, India</span>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Floating Actions ---------- */
function FloatingActions() {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const on = () => setShowTop(window.scrollY > 600);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <>
      <div className="fixed z-[55] right-4 bottom-4 flex flex-col gap-3">
        <a
          href="https://wa.me/919000000000"
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp"
          className="group grid place-items-center h-14 w-14 rounded-full bg-[#25D366] text-white shadow-lg hover:scale-110 transition-transform"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="absolute inset-0 rounded-full animate-ping bg-[#25D366] opacity-30" />
        </a>
        <a
          href="tel:+919000000000"
          aria-label="Call"
          className="grid place-items-center h-14 w-14 rounded-full gradient-royal text-white shadow-lg hover:scale-110 transition-transform"
        >
          <PhoneCall className="h-6 w-6" />
        </a>
      </div>
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll to top"
            className="fixed z-[55] left-4 bottom-4 grid place-items-center h-12 w-12 rounded-full gradient-sun text-white shadow-lg hover:scale-110 transition-transform"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------- Page ---------- */
function Home() {
  return (
    <main className="overflow-x-hidden">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Stats />
      <Services />
      <Projects />
      <WhyUs />
      <SolarCalculator />
      <Subsidy />
      <Process />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
      <FloatingActions />
    </main>
  );
}
