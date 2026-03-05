"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

type NavLink = { label: string; href: string; description?: string };

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [navHovered, setNavHovered] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const closeTimer = useRef<number | null>(null);

  // 0 = top of page, 1 = scrolled into glass pill
  const progress = useMotionValue(0);

  // ── All useTransform calls unconditionally at top level ───────────────────
  const morphBorderRadius = useTransform(progress, [0, 1], [0, 999]);
  const morphY            = useTransform(progress, [0, 1], [0, 2]);
  const morphBg           = useTransform(progress, [0, 1], ["rgba(255,255,255,1)", "rgba(10,10,22,0.50)"]);
  const morphBorder       = useTransform(progress, [0, 1], ["rgba(0,0,0,0)", "rgba(255,255,255,0.15)"]);
  const morphShadow       = useTransform(progress, [0, 1], [
    "0 0px 0px rgba(0,0,0,0)",
    "0 8px 32px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.10)",
  ]);
  const morphShimmer      = useTransform(progress, [0, 1], [0, 1]);
  // Padding: 0 at top → shrinks into a narrower pill when scrolled
  const morphPaddingX     = useTransform(progress, [0, 1], [0, 72]);

  const trayActive = navHovered || !!openGroup;
  const megaOpen   = !!openGroup;

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
      animate(progress, scrolled ? 1 : 0, {
        duration: 0.55,
        ease: [0.32, 0.72, 0, 1],
      });
    };
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [progress]);

  useEffect(() => {
    return () => {
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    };
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    setOpenGroup(null);
    setNavHovered(false);
    cancelClose();
    // Defer scroll so mobile menu exit animation completes before scrolling
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const cancelClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };

  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenGroup(null), 120);
  };

  const NAV_GROUPS = useMemo(
    () =>
      [
        {
          label: "Products",
          items: [
            { label: "Services",  href: "#services",  description: "What we offer" },
            { label: "Portfolio", href: "#portfolio", description: "Recent work"   },
          ] satisfies NavLink[],
        },
        {
          label: "Solutions",
          items: [
            { label: "Our Process", href: "#process", description: "How we deliver" },
            { label: "Contact",     href: "#contact", description: "Talk to us"     },
          ] satisfies NavLink[],
        },
        {
          label: "Company",
          items: [
            { label: "About Us",      href: "#about", description: "Who we are" },
            { label: "Meet the Team", href: "#team",  description: "The people"  },
          ] satisfies NavLink[],
        },
        {
          label: "Resources",
          items: [{ label: "Home", href: "#home", description: "Back to top" }],
        },
      ] as const,
    [],
  );

  // ── Variants — only bg/border/borderRadius, NO height (height is auto always) ──
  // Height is controlled by content, not variants, so the mega panel is never clipped.
  const pillVariants = {
    idle: {
      backgroundColor: "rgba(10,10,22,0.50)",
      borderColor:     "rgba(255,255,255,0.15)",
      borderRadius:    999,
    },
    active: {
      backgroundColor: "rgba(255,255,255,1)",
      borderColor:     "rgba(0,0,0,0.10)",
      borderRadius:    999,
    },
    mega: {
      backgroundColor: "rgba(255,255,255,1)",
      borderColor:     "rgba(0,0,0,0.10)",
      borderRadius:    28,
    },
  } as const;

  const megaVariants = {
    hidden: { opacity: 0, y: 8  },
    shown:  { opacity: 1, y: 0, transition: { duration: 0.18 } },
    exit:   { opacity: 0, y: 8, transition: { duration: 0.12 } },
  } as const;

  const linkItemVariants = {
    hidden: { opacity: 0, y: -4 },
    shown:  { opacity: 1, y: 0, transition: { duration: 0.15 } },
  } as const;

  // ── Colour logic via CSS classes — font/weight never touched by framer ────
  // At top of page: always black text (white bg)
  // Scrolled + idle glass: white text
  // Scrolled + hovered (white pill): black text
  const isDarkGlass = isScrolled && !trayActive;
  const logoClass   = isDarkGlass ? "text-white"          : "text-black";
  const linkClass   = isDarkGlass ? "text-white/80 hover:text-white" : "text-black/80 hover:text-black";
  const ctaClass    = isDarkGlass
    ? "bg-white/12 text-white border-white/30 hover:bg-white/22"
    : "bg-black text-white border-transparent hover:bg-black/80";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-4">
      <div className="container-wide px-6 md:px-12 lg:px-24">

        {/* ── Desktop ──────────────────────────────────────────────────────── */}
        <div className="hidden lg:block">
          <motion.div
            onMouseEnter={() => { cancelClose(); setNavHovered(true); }}
            onMouseLeave={() => {
              setNavHovered(false);
              scheduleClose();
              window.setTimeout(() => setOpenGroup(null), 140);
            }}
            style={{
              // Morph values always drive shape — variants override bg/border once scrolled
              borderRadius: morphBorderRadius,
              paddingLeft:  morphPaddingX,
              paddingRight: morphPaddingX,
              translateY:   morphY,
              borderWidth:  1,
              borderStyle:  "solid",
              // Hand off bg/border to variants when scrolled; morph handles them before that
              backgroundColor: isScrolled ? undefined : morphBg,
              borderColor:     isScrolled ? undefined : morphBorder,
              boxShadow:       isScrolled ? undefined : morphShadow,
              // Blur only in dark-glass idle state
              backdropFilter:       isDarkGlass ? "blur(20px) saturate(1.5)" : "none",
              WebkitBackdropFilter: isDarkGlass ? "blur(20px) saturate(1.5)" : "none",
            }}
            animate={isScrolled ? (megaOpen ? "mega" : trayActive ? "active" : "idle") : undefined}
            variants={pillVariants}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            // No overflow-hidden here — it was clipping the mega dropdown
            className="relative"
          >
            {/* Inner clip wrapper — only clips the nav row, not the mega panel */}
            <div
              style={{ borderRadius: "inherit" }}
              className="overflow-hidden"
            >
              {/* Shimmer at top of glass pill */}
              <motion.div
                className="absolute inset-x-0 top-0 h-px pointer-events-none z-10"
                style={{
                  opacity:    trayActive ? 0 : morphShimmer,
                  background: "linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.5) 50%, transparent 90%)",
                }}
              />

              {/* Nav row */}
              <div className="h-[72px] flex items-center justify-between px-8">

                {/* Logo */}
                <a
                  href="#home"
                  onClick={(e) => { e.preventDefault(); handleNavClick("#home"); }}
                  className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${logoClass}`}
                >
                  NexWeb
                </a>

                {/* Center links — always pointer-events-auto so hover works at top too */}
                <div className="flex items-center gap-10">
                  {NAV_GROUPS.map((group) => {
                    const isOpen = openGroup === group.label;
                    return (
                      <motion.button
                        key={group.label}
                        variants={linkItemVariants}
                        type="button"
                        onMouseEnter={() => { cancelClose(); setOpenGroup(group.label); }}
                        onMouseLeave={scheduleClose}
                        onFocus={() => setOpenGroup(group.label)}
                        className={`inline-flex items-center gap-2 text-base font-medium transition-colors duration-300 ${linkClass}`}
                      >
                        {group.label}
                        <ChevronDown
                          size={16}
                          className={[
                            "transition-transform duration-200",
                            isOpen ? "rotate-180" : "rotate-0",
                          ].join(" ")}
                        />
                      </motion.button>
                    );
                  })}
                </div>

                {/* CTA */}
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
                  className={`rounded-full px-7 py-3 text-sm font-semibold border transition-all duration-300 ${ctaClass}`}
                >
                  CONTACT SALES
                </a>
              </div>
            </div>

            {/* Mega dropdown — sits outside the overflow-hidden wrapper so it's never clipped */}
            <AnimatePresence>
              {megaOpen && (
                <motion.div
                  key={openGroup}
                  initial="hidden"
                  animate="shown"
                  exit="exit"
                  variants={megaVariants}
                  className="px-8 pb-8"
                  onMouseEnter={cancelClose}
                  onMouseLeave={scheduleClose}
                >
                  <div className="h-px bg-black/10 mb-6" />
                  <div className="grid grid-cols-3 gap-6">
                    {(NAV_GROUPS.find((g) => g.label === openGroup)?.items ?? []).map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                        className="group rounded-2xl bg-black/5 hover:bg-black/10 transition p-6 min-h-[140px]"
                      >
                        <div className="text-base font-semibold text-black">
                          {item.label} <span className="text-orange-500">→</span>
                        </div>
                        {item.description && (
                          <div className="mt-2 text-sm text-black/60">{item.description}</div>
                        )}
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* ── Mobile ───────────────────────────────────────────────────────── */}
        <div className="lg:hidden">
          <div className="rounded-2xl border border-black/10 bg-white/90 backdrop-blur-xl px-4">
            <div className="h-16 flex items-center justify-between">
              <a
                href="#home"
                onClick={(e) => { e.preventDefault(); handleNavClick("#home"); }}
                className="text-xl font-bold"
              >
                NexWeb
              </a>
              <button
                onClick={() => setIsMobileMenuOpen((v) => !v)}
                className="p-2 rounded-xl hover:bg-black/5 transition"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>

            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden pb-4"
                >
                  <div className="space-y-2">
                    {NAV_GROUPS.flatMap((g) => g.items).map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                        className="block px-3 py-3 rounded-xl hover:bg-black/5 transition"
                      >
                        <div className="text-sm font-semibold">{item.label}</div>
                        {item.description && (
                          <div className="text-xs text-black/60 mt-0.5">{item.description}</div>
                        )}
                      </a>
                    ))}
                    <a
                      href="#contact"
                      onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
                      className="block text-center rounded-full px-5 py-3 text-sm font-semibold bg-orange-500 text-white hover:opacity-90 transition"
                    >
                      CONTACT SALES
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </header>
  );
}