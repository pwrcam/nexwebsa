import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

type NavLink = { label: string; href: string; description?: string };

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Desktop hover states
  const [navHovered, setNavHovered] = useState(false); // hover on the whole pill
  const [openGroup, setOpenGroup] = useState<string | null>(null); // hover on a link

  const closeTimer = useRef<number | null>(null);

  const NAV_GROUPS = useMemo(
    () =>
      [
        {
          label: "Products",
          items: [
            {
              label: "Services",
              href: "#services",
              description: "What we offer",
            },
            {
              label: "Portfolio",
              href: "#portfolio",
              description: "Recent work",
            },
          ] satisfies NavLink[],
        },
        {
          label: "Solutions",
          items: [
            {
              label: "Our Process",
              href: "#process",
              description: "How we deliver",
            },
            { label: "Contact", href: "#contact", description: "Talk to us" },
          ] satisfies NavLink[],
        },
        {
          label: "Company",
          items: [
            { label: "About Us", href: "#about", description: "Who we are" },
            {
              label: "Meet the Team",
              href: "#team",
              description: "The people",
            },
          ] satisfies NavLink[],
        },
        {
          label: "Resources",
          items: [{ label: "Home", href: "#home", description: "Back to top" }],
        },
      ] as const,
    [],
  );

  useEffect(() => {
    // ✅ switch as soon as you start scrolling
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    };
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    setOpenGroup(null);

    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const cancelClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };

  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenGroup(null), 120);
  };

  const trayActive = navHovered || !!openGroup; // state 2 + 3
  const megaOpen = !!openGroup; // state 3 only (hover link)

  // --- Motion variants ---
  const trayVariants = {
    idle: {
      height: 80,
      borderRadius: 999,
      y: 0,
      backgroundColor: "rgba(0,0,0,0.35)",
      borderColor: "rgba(255,255,255,0.10)",
    },
    active: {
      height: 80,
      borderRadius: 999,
      y: -1,
      backgroundColor: "rgba(255,255,255,1)",
      borderColor: "rgba(0,0,0,0.10)",
    },
    mega: {
      height: 360,
      borderRadius: 42,
      y: -1,
      backgroundColor: "rgba(255,255,255,1)",
      borderColor: "rgba(0,0,0,0.10)",
    },
  } as const;

  const linksWrapVariants = {
    hidden: { opacity: 0, y: -6, transition: { duration: 0.12 } },
    shown: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.18,
        when: "beforeChildren",
        staggerChildren: 0.04,
      },
    },
  } as const;

  const linkItemVariants = {
    hidden: { opacity: 0, y: -6 },
    shown: { opacity: 1, y: 0, transition: { duration: 0.18 } },
  } as const;

  const megaVariants = {
    hidden: { opacity: 0, y: 10 },
    shown: { opacity: 1, y: 0, transition: { duration: 0.18 } },
    exit: { opacity: 0, y: 10, transition: { duration: 0.12 } },
  } as const;

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className={`pt-4 transition-all ${isScrolled ? "pt-3" : "pt-4"}`}>
        <div className="container-wide px-6 md:px-12 lg:px-24">
          {/* Desktop */}
          <div className="hidden lg:block">
            {/* TOP OF PAGE: simple header bar */}
            {!isScrolled ? (
              <div className="h-20 flex items-center justify-between">
                {/* Logo */}
                <a
                  href="#home"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("#home");
                  }}
                  className="text-2xl font-bold tracking-tight text-white"
                >
                  NexWeb
                </a>

                {/* Links visible at top */}
                <div className="flex items-center gap-10">
                  {NAV_GROUPS.map((group) => {
                    const first = group.items[0]?.href ?? "#home";
                    return (
                      <a
                        key={group.label}
                        href={first}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(first);
                        }}
                        className="text-base font-medium text-white/80 hover:text-white transition"
                      >
                        {group.label}
                      </a>
                    );
                  })}
                </div>

                {/* CTA (white on dark top background) */}
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("#contact");
                  }}
                  className="rounded-full px-7 py-3 text-sm font-semibold bg-white text-black hover:bg-white/90 transition"
                >
                  CONTACT SALES
                </a>
              </div>
            ) : (
              /* SCROLLED: Stitch-style floating tray */
              <motion.div
                onMouseEnter={() => {
                  cancelClose();
                  setNavHovered(true);
                }}
                onMouseLeave={() => {
                  setNavHovered(false);
                  scheduleClose();
                  window.setTimeout(() => setOpenGroup(null), 140);
                }}
                animate={megaOpen ? "mega" : trayActive ? "active" : "idle"}
                variants={trayVariants}
                transition={{ type: "spring", stiffness: 260, damping: 28 }}
                style={{
                  backdropFilter: trayActive ? "none" : "blur(18px)",
                  WebkitBackdropFilter: trayActive ? "none" : "blur(18px)",
                }}
                className={[
                  "relative overflow-hidden border",
                  "shadow-[0_20px_80px_-45px_rgba(0,0,0,.45)]",
                ].join(" ")}
              >
                {/* Top row */}
                <div className="h-20 px-8 flex items-center justify-between">
                  {/* Logo */}
                  <a
                    href="#home"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick("#home");
                    }}
                    className={[
                      "text-2xl font-bold tracking-tight transition-colors duration-200",
                      trayActive ? "text-black" : "text-white",
                    ].join(" ")}
                  >
                    NexWeb
                  </a>

                  {/* Center links reveal on hover */}
                  <motion.div
                    initial={false}
                    animate={trayActive ? "shown" : "hidden"}
                    variants={linksWrapVariants}
                    className={[
                      "flex items-center gap-10",
                      trayActive
                        ? "pointer-events-auto"
                        : "pointer-events-none",
                    ].join(" ")}
                  >
                    {NAV_GROUPS.map((group) => {
                      const isOpen = openGroup === group.label;
                      return (
                        <motion.button
                          key={group.label}
                          variants={linkItemVariants}
                          type="button"
                          onMouseEnter={() => {
                            cancelClose();
                            setOpenGroup(group.label); // mega opens ONLY here
                          }}
                          onMouseLeave={scheduleClose}
                          onFocus={() => setOpenGroup(group.label)}
                          className="inline-flex items-center gap-2 text-base font-medium text-black/80 hover:text-black transition"
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
                  </motion.div>

                  {/* CTA (swaps based on trayActive) */}
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick("#contact");
                    }}
                    className={`rounded-full px-7 py-3 text-sm font-semibold transition-colors duration-200 ${
                      trayActive
                        ? "bg-black text-white hover:bg-black/90"
                        : "bg-white text-black hover:bg-white/90"
                    }`}
                  >
                    CONTACT SALES
                  </a>
                </div>

                {/* Mega dropdown */}
                <AnimatePresence>
                  {megaOpen && (
                    <motion.div
                      key="mega"
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
                        {(
                          NAV_GROUPS.find((g) => g.label === openGroup)
                            ?.items ?? []
                        ).map((item) => (
                          <a
                            key={item.href}
                            href={item.href}
                            onClick={(e) => {
                              e.preventDefault();
                              handleNavClick(item.href);
                            }}
                            className="group rounded-2xl bg-black/5 hover:bg-black/10 transition p-6 min-h-[140px]"
                          >
                            <div className="text-base font-semibold text-black">
                              {item.label}{" "}
                              <span className="text-orange-500">→</span>
                            </div>
                            {item.description && (
                              <div className="mt-2 text-sm text-black/60">
                                {item.description}
                              </div>
                            )}
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </div>

          {/* Mobile */}
          <div className="lg:hidden">
            <div className="rounded-2xl border border-black/10 bg-white/90 backdrop-blur-xl px-4">
              <div className="h-16 flex items-center justify-between">
                <a
                  href="#home"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("#home");
                  }}
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
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavClick(item.href);
                          }}
                          className="block px-3 py-3 rounded-xl hover:bg-black/5 transition"
                        >
                          <div className="text-sm font-semibold">
                            {item.label}
                          </div>
                          {item.description && (
                            <div className="text-xs text-black/60 mt-0.5">
                              {item.description}
                            </div>
                          )}
                        </a>
                      ))}

                      <a
                        href="#contact"
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick("#contact");
                        }}
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
      </div>
    </header>
  );
}
