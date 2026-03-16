/* BPC-157Rx — Standalone Navbar
   Typography: DM Sans (geometric sans-serif)
   Logo wordmark: weight 600, wide tracking
   Nav links: weight 400
   CTA buttons: weight 500

   Context-aware routing:
   - On "/" (main page): anchor links like #problem scroll within the page
   - On "/peptides": anchor links become "/#problem" to navigate back + scroll
*/
import { useEffect, useState } from "react";

const DARK_ORANGE = "#D2570A";

interface NavbarProps {
  productName?: string;
}

export default function Navbar({ productName }: NavbarProps = {}) {
  // Parse product name: split on last "Rx" for colored suffix
  const rxIdx = productName ? productName.lastIndexOf("Rx") : -1;
  const baseName = productName && rxIdx !== -1 ? productName.slice(0, rxIdx) : (productName || "Mitochondrial");
  const suffix = productName && rxIdx !== -1 ? "Rx" : "Rx";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Detect if we're on the peptides page
  const onPeptidesPage = typeof window !== "undefined" && window.location.pathname === "/peptides";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Build href: if on peptides page, prefix anchor links with "/"
  const href = (anchor: string) => onPeptidesPage ? `/${anchor}` : anchor;

  const navLinks = [
    { label: "The Problem", anchor: "#problem" },
    { label: "Mechanism",   anchor: "#mechanism" },
    { label: "Research",    anchor: "#research" },
    { label: "Pricing",     anchor: "#pricing" },
    { label: "FAQ",         anchor: "#faq" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "20px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "background 0.35s ease, backdrop-filter 0.35s ease, border-color 0.35s ease",
        background: scrolled ? "rgba(13,13,13,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(201,169,110,0.12)" : "1px solid transparent",
      }}
    >
      {/* Logo */}
      <a href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
        <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
          <path d="M24 4 L6 40 L14 40 L24 20 L34 40 L42 40 Z" fill="#C9A96E" />
          <line x1="12" y1="28" x2="36" y2="28" stroke="#C9A96E" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="24" y1="20" x2="24" y2="44" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <div style={{ lineHeight: 1 }}>
          <span style={{
            display: "block",
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontWeight: 600,
            fontSize: "0.9375rem",
            letterSpacing: "0.1em",
            color: "#F5F0E8",
            textTransform: "uppercase",
          }}>
            {baseName}<span style={{ color: DARK_ORANGE }}>{suffix}</span>
          </span>
          <span style={{
            display: "block",
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontWeight: 300,
            fontSize: "0.5625rem",
            letterSpacing: "0.12em",
            color: "#8C7B6B",
            textTransform: "uppercase",
            marginTop: 2,
          }}>Aurelius Health Group</span>
        </div>
      </a>

      {/* Desktop Nav Links — hidden on mobile */}
      <ul style={{
        display: "flex",
        alignItems: "center",
        gap: 28,
        listStyle: "none",
        margin: 0,
        padding: 0,
      }} className="hidden md:flex">
        {navLinks.map((link) => (
          <li key={link.label}>
            <a
              href={href(link.anchor)}
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: "0.875rem",
                fontWeight: 400,
                color: "rgba(245,240,232,0.72)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#F5F0E8")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,240,232,0.72)")}
            >
              {link.label}
            </a>
          </li>
        ))}
        {/* Discover Peptides — gold pill */}
        <li>
          <a
            href="/peptides"
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "0.875rem",
              fontWeight: 500,
              color: onPeptidesPage ? "#F5F0E8" : "#C9A96E",
              textDecoration: "none",
              transition: "color 0.2s, background 0.2s",
              border: "1px solid rgba(201,169,110,0.3)",
              borderRadius: 5,
              padding: "5px 12px",
              background: onPeptidesPage ? "rgba(201,169,110,0.15)" : "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#F5F0E8";
              e.currentTarget.style.background = "rgba(201,169,110,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = onPeptidesPage ? "#F5F0E8" : "#C9A96E";
              e.currentTarget.style.background = onPeptidesPage ? "rgba(201,169,110,0.15)" : "transparent";
            }}
          >
            Discover Peptides
          </a>
        </li>
      </ul>

      {/* CTA Buttons — hidden on mobile */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }} className="hidden md:flex">
        <a href={href("#quiz")} className="btn-ghost-cream" style={{ padding: "10px 20px", fontSize: "0.875rem" }}>
          Check Eligibility
        </a>
        <a href={href("#quiz")} className="btn-gold" style={{ padding: "10px 20px", fontSize: "0.875rem" }}>
          Get Started
        </a>
      </div>

      {/* Mobile Hamburger — only visible on mobile (hidden on md and above) */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 8,
          flexDirection: "column",
          gap: 5,
        }}
        className="flex md:hidden"
        aria-label="Toggle menu"
      >
        {[0, 1, 2].map((i) => (
          <span key={i} style={{
            display: "block",
            width: 24,
            height: 1.5,
            background: "#F5F0E8",
            borderRadius: 2,
            transition: "transform 0.2s",
          }} />
        ))}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: "fixed",
          top: 70,
          left: 0,
          right: 0,
          background: "rgba(13,13,13,0.97)",
          backdropFilter: "blur(16px)",
          padding: "24px 24px 32px",
          borderBottom: "1px solid rgba(201,169,110,0.15)",
          display: "flex",
          flexDirection: "column",
          gap: 20,
          zIndex: 99,
          overflowY: "auto",
        }}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={href(link.anchor)}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: "1.125rem",
                fontWeight: 400,
                color: "rgba(245,240,232,0.8)",
                textDecoration: "none",
                padding: "16px 0",
                borderBottom: "1px solid rgba(245,240,232,0.06)",
                display: "block",
              }}
            >
              {link.label}
            </a>
          ))}
          {/* Discover Peptides mobile link */}
          <a
            href="/peptides"
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "1.125rem",
              fontWeight: 500,
              color: "#C9A96E",
              textDecoration: "none",
              padding: "16px 0",
              borderBottom: "1px solid rgba(245,240,232,0.06)",
              display: "block",
            }}
          >
            Discover Peptides
          </a>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 32 }}>
            <a href={href("#quiz")} onClick={() => setMenuOpen(false)} className="btn-ghost-cream" style={{ justifyContent: "center", textAlign: "center" }}>
              Check Eligibility
            </a>
            <a href={href("#quiz")} onClick={() => setMenuOpen(false)} className="btn-gold" style={{ justifyContent: "center", textAlign: "center" }}>
              Get Started
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
