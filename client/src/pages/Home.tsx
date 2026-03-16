/* Aurelius Health Group — Home Page
   Typography System (DM Sans — geometric sans-serif):
   ─────────────────────────────────────────────────────
   H1 / Hero:   weight 300, size clamp(2.75–5rem), tracking -0.03em, leading 1.08
   H2:          weight 300, size clamp(1.75–2.75rem), tracking -0.02em
   H3 / Product names / Feature titles: weight 600, size ~1.25–1.375rem
   Body:        weight 400, color #3D3D3D (soft charcoal, not pure black)
   Labels:      weight 500, uppercase, 0.1em tracking, gold color
   Buttons:     weight 500
   ─────────────────────────────────────────────────────
*/
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663301596594/CqJiJUXAtrZsnakBeSxRGN";
const ASSETS = {
  heroBg:        `${CDN}/hero_bg_d77e22e7.png`,
  heroWoman:     `${CDN}/hero_woman_0a6b2005.png`,
  bpc157:        `${CDN}/peptide_bpc157_e0fce36a.png`,
  semaglutide:   `${CDN}/peptide_semaglutide_92d17c3a.png`,
  sermorelin:    `${CDN}/peptide_sermorelin_16dbde7b.png`,
  tirzepatide:   `${CDN}/peptide_tirzepatide_2497eb66.png`,
};

const DM = "'DM Sans', system-ui, sans-serif";

/* ── Shared style helpers ── */
const s = {
  labelTag: {
    fontFamily: DM,
    fontSize: "0.7rem",
    fontWeight: 500,
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    color: "#C9A96E",
  },
  h1: {
    fontFamily: DM,
    fontWeight: 300,
    fontSize: "clamp(2.75rem, 6vw, 5rem)",
    lineHeight: 1.08,
    letterSpacing: "-0.03em",
    color: "#F5F0E8",
  },
  h2Dark: {
    fontFamily: DM,
    fontWeight: 300,
    fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
    lineHeight: 1.15,
    letterSpacing: "-0.02em",
    color: "#F5F0E8",
  },
  h2Light: {
    fontFamily: DM,
    fontWeight: 300,
    fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
    lineHeight: 1.15,
    letterSpacing: "-0.02em",
    color: "#1A1A1A",
  },
  h3: {
    fontFamily: DM,
    fontWeight: 600,
    fontSize: "1.25rem",
    lineHeight: 1.3,
    letterSpacing: "-0.01em",
  },
  body: {
    fontFamily: DM,
    fontWeight: 400,
    fontSize: "1rem",
    lineHeight: 1.65,
    color: "#3D3D3D",
  },
  bodySm: {
    fontFamily: DM,
    fontWeight: 400,
    fontSize: "0.875rem",
    lineHeight: 1.6,
    color: "#5A5A5A",
  },
  bodyLight: {
    fontFamily: DM,
    fontWeight: 300,
    fontSize: "1rem",
    lineHeight: 1.65,
    color: "rgba(245,240,232,0.65)",
  },
};

/* ── Peptide products data ── */
const peptides = [
  {
    name: "BPC-157",
    tag: "Recovery & Gut Health",
    desc: "Accelerate recovery, reduce inflammation, and restore gut integrity.",
    price: "$249",
    stock: "IN STOCK",
    img: ASSETS.bpc157,
  },
  {
    name: "Semaglutide",
    tag: "Weight Management",
    desc: "Clinically proven weight management and metabolic optimization protocol.",
    price: "$399",
    stock: "IN STOCK",
    img: ASSETS.semaglutide,
  },
  {
    name: "Sermorelin",
    tag: "Growth Hormone",
    desc: "Stimulate natural growth hormone release for recovery, sleep, and body composition.",
    price: "$299",
    stock: "LIMITED STOCK",
    img: ASSETS.sermorelin,
  },
  {
    name: "Tirzepatide",
    tag: "Metabolic Health",
    desc: "Next-generation dual-agonist for superior metabolic health and weight loss outcomes.",
    price: "$499",
    stock: "LIMITED STOCK",
    img: ASSETS.tirzepatide,
  },
];

/* ── Journey accordion data ── */
const journeyItems = [
  {
    title: "Break the cycle",
    body: "Instead of treating surface-level symptoms, our protocols go deeper to address the underlying factors affecting your health, performance, and longevity.",
  },
  {
    title: "Feel like yourself again",
    body: "Personalized peptide plans calibrated to your biology, lifestyle, and goals — so you feel and perform at your best.",
  },
  {
    title: "Live your life",
    body: "Ongoing physician support, dosage adjustments, and check-ins — all included, all online, at no additional cost.",
  },
  {
    title: "Improve your health",
    body: "Track measurable outcomes: energy, body composition, cognitive clarity, and recovery — all in one place.",
  },
];

/* ── Testimonials ── */
const testimonials = [
  {
    quote: "After 3 months on Sermorelin, my sleep quality improved dramatically and I dropped 12 lbs without changing my diet.",
    name: "Marcus T.",
    role: "Entrepreneur, 44",
    initials: "MT",
  },
  {
    quote: "The onboarding was seamless. My physician reviewed my labs within 24 hours and had a protocol ready the same week.",
    name: "Sarah K.",
    role: "Nurse Practitioner, 38",
    initials: "SK",
  },
  {
    quote: "BPC-157 resolved a knee injury I'd been managing for two years. I'm back to training five days a week.",
    name: "Derek O.",
    role: "CrossFit Coach, 31",
    initials: "DO",
  },
];

/* ── Stats ── */
const stats = [
  { value: "12k+", label: "Active members" },
  { value: "97%", label: "Patient satisfaction rate" },
  { value: "8+", label: "Peptide protocols available" },
  { value: "48h", label: "Average consultation turnaround" },
];

/* ── Why features ── */
const whyFeatures = [
  {
    icon: "◎",
    title: "Access to expert providers",
    desc: "Programs developed with industry specialists who have decades of experience in peptide and hormone optimization.",
  },
  {
    icon: "✓",
    title: "Prescription-grade treatments",
    desc: "Treatment plans tailored to your unique biology, so you have all the support you need to feel and perform at your best.",
  },
  {
    icon: "◷",
    title: "Ongoing support included",
    desc: "Check-ins, medication adjustments, and answers to questions — 100% online and at no additional cost.",
  },
  {
    icon: "◈",
    title: "Focused on all of you",
    desc: "Holistic care including nutritional principles, behavioral programs, and custom protocols in the Aurelius app.",
  },
];

/* ── Accordion item ── */
function AccordionItem({
  item,
  open,
  onToggle,
}: {
  item: (typeof journeyItems)[0];
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      style={{
        borderBottom: "1px solid rgba(245,240,232,0.12)",
        paddingBottom: open ? 20 : 0,
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "22px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          gap: 16,
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#C9A96E",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              ...s.h3,
              color: "#F5F0E8",
              textAlign: "left",
            }}
          >
            {item.title}
          </span>
        </span>
        <span
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            border: "1px solid rgba(245,240,232,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#F5F0E8",
            fontFamily: DM,
            fontWeight: 300,
            fontSize: "1.1rem",
            flexShrink: 0,
            transition: "transform 0.25s",
            transform: open ? "rotate(45deg)" : "none",
          }}
        >
          +
        </span>
      </button>
      <div
        style={{
          overflow: "hidden",
          maxHeight: open ? 200 : 0,
          transition: "max-height 0.35s ease",
          paddingLeft: 22,
        }}
      >
        <p style={{ ...s.bodyLight, paddingBottom: 8 }}>{item.body}</p>
      </div>
    </div>
  );
}

export default function Home() {
  const [openAccordion, setOpenAccordion] = useState(0);

  return (
    <div style={{ background: "#F5F0E8", minHeight: "100vh" }}>
      <Navbar />

      {/* ══════════════════════════════════════
          HERO — Full-bleed cinematic portrait
          H1: weight 300, tight tracking, large
      ══════════════════════════════════════ */}
      <section
        id="hero"
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "flex-end",
          overflow: "hidden",
          background: "#0D0D0D",
        }}
      >
        {/* Background image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${ASSETS.heroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center 20%",
            backgroundRepeat: "no-repeat",
          }}
        />
        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(13,13,13,0.88) 0%, rgba(13,13,13,0.55) 50%, rgba(13,13,13,0.15) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(13,13,13,0.6) 0%, transparent 50%)",
          }}
        />

        {/* Hero content */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 2.5rem 100px",
            width: "100%",
          }}
        >
          <p className="label-tag" style={{ marginBottom: 20 }}>
            Physician-Supervised Peptide Telehealth
          </p>

          {/* H1 — Light weight, very large, tight tracking */}
          <h1
            style={{
              ...s.h1,
              maxWidth: 640,
              marginBottom: 24,
            }}
          >
            Peptide treatments<br />tailored to<br />your biology.
          </h1>

          <p
            style={{
              ...s.bodyLight,
              maxWidth: 420,
              marginBottom: 40,
              fontSize: "1.0625rem",
            }}
          >
            Join thousands who have transformed their health with physician-designed
            peptide protocols. Personalized. Prescription-grade. Delivered to your door.
          </p>

          {/* Trust checklist */}
          <ul
            style={{
              listStyle: "none",
              margin: "0 0 40px",
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {[
              "Medical providers experienced in peptide optimization",
              "Doctor-trusted, prescription-grade treatment options",
              "Thousands of satisfied members — and growing",
            ].map((item) => (
              <li
                key={item}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  ...s.bodyLight,
                  fontSize: "0.9rem",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" stroke="#C9A96E" strokeWidth="1.2" />
                  <path d="M5 8l2 2 4-4" stroke="#C9A96E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item}
              </li>
            ))}
          </ul>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="#cta" className="btn-gold">Get Started</a>
            <a href="#peptides" className="btn-ghost-cream">See If You Qualify</a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          STATS STRIP
      ══════════════════════════════════════ */}
      <section
        style={{
          background: "#F5F0E8",
          borderBottom: "1px solid rgba(13,13,13,0.08)",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 2.5rem",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                padding: "36px 0",
                borderRight: i < 3 ? "1px solid rgba(13,13,13,0.08)" : "none",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: DM,
                  fontWeight: 300,
                  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                  letterSpacing: "-0.03em",
                  color: "#1A1A1A",
                  lineHeight: 1,
                  marginBottom: 6,
                }}
              >
                {stat.value}
              </div>
              <div style={{ ...s.bodySm, color: "#8C7B6B" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          WHY AURELIUS — Split layout
          H2: weight 300, H3 features: weight 600
      ══════════════════════════════════════ */}
      <section
        id="why"
        style={{ background: "#F5F0E8", padding: "100px 0" }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 2.5rem",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "center",
          }}
        >
          {/* Left — portrait image */}
          <div style={{ position: "relative" }}>
            <div
              style={{
                borderRadius: 8,
                overflow: "hidden",
                aspectRatio: "4/5",
              }}
            >
              <img
                src={ASSETS.heroWoman}
                alt="Aurelius patient"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            {/* Floating badge */}
            <div
              style={{
                position: "absolute",
                bottom: 24,
                left: 24,
                background: "rgba(13,13,13,0.88)",
                backdropFilter: "blur(12px)",
                borderRadius: 8,
                padding: "14px 18px",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span style={{ fontSize: "1.25rem" }}>★</span>
              <div>
                <div
                  style={{
                    fontFamily: DM,
                    fontWeight: 500,
                    fontSize: "0.875rem",
                    color: "#F5F0E8",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Physician-Supervised
                </div>
                <div style={{ ...s.bodySm, color: "#8C7B6B", fontSize: "0.75rem" }}>
                  Every protocol reviewed by a licensed provider
                </div>
              </div>
            </div>
          </div>

          {/* Right — content */}
          <div>
            <p className="label-tag" style={{ marginBottom: 16 }}>
              Why Aurelius
            </p>
            {/* H2 — Light weight, tight tracking */}
            <h2 style={{ ...s.h2Light, marginBottom: 20 }}>
              Why people choose Aurelius for their health journey
            </h2>
            <p style={{ ...s.body, marginBottom: 48, maxWidth: 440 }}>
              These personalized plans are based on your biology, lifestyle, and health
              goals — so you get the support you need to feel and perform at your best.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              {whyFeatures.map((feat) => (
                <div key={feat.title} style={{ display: "flex", gap: 16 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      border: "1px solid rgba(201,169,110,0.35)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#C9A96E",
                      fontSize: "0.875rem",
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  >
                    {feat.icon}
                  </div>
                  <div>
                    {/* H3 — Semibold for feature titles */}
                    <h3
                      style={{
                        ...s.h3,
                        color: "#1A1A1A",
                        marginBottom: 4,
                        fontSize: "1rem",
                      }}
                    >
                      {feat.title}
                    </h3>
                    <p style={{ ...s.bodySm, margin: 0 }}>{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          PEPTIDE PRODUCTS — Dark section
          H2: weight 300 (light), H3 product names: weight 600
      ══════════════════════════════════════ */}
      <section
        id="peptides"
        style={{ background: "#0D0D0D", padding: "100px 0" }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 2.5rem",
          }}
        >
          {/* Section header */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: 56,
              flexWrap: "wrap",
              gap: 24,
            }}
          >
            <div>
              <p className="label-tag" style={{ marginBottom: 14 }}>
                Our Protocols
              </p>
              {/* H2 — Light weight on dark background */}
              <h2 style={{ ...s.h2Dark, maxWidth: 520 }}>
                Prescription-grade ingredients for personalized performance.
              </h2>
            </div>
            <a
              href="#cta"
              className="btn-ghost-cream"
              style={{ flexShrink: 0, alignSelf: "flex-end" }}
            >
              View All Treatments
            </a>
          </div>

          {/* Product grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 20,
            }}
          >
            {peptides.map((p) => (
              <div
                key={p.name}
                style={{
                  background: "#141414",
                  borderRadius: 10,
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.06)",
                  transition: "transform 0.2s, border-color 0.2s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(201,169,110,0.3)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.06)";
                }}
              >
                {/* Product image */}
                <div
                  style={{
                    aspectRatio: "4/3",
                    overflow: "hidden",
                    background: "#1A1A1A",
                  }}
                >
                  <img
                    src={p.img}
                    alt={p.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>

                <div style={{ padding: "20px 20px 24px" }}>
                  {/* Stock badge */}
                  <span
                    style={{
                      display: "inline-block",
                      fontFamily: DM,
                      fontWeight: 500,
                      fontSize: "0.65rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: p.stock === "IN STOCK" ? "#C9A96E" : "#8C7B6B",
                      border: `1px solid ${p.stock === "IN STOCK" ? "rgba(201,169,110,0.4)" : "rgba(140,123,107,0.3)"}`,
                      borderRadius: 4,
                      padding: "3px 8px",
                      marginBottom: 12,
                    }}
                  >
                    {p.stock}
                  </span>

                  {/* H3 — Semibold for product name */}
                  <h3
                    style={{
                      ...s.h3,
                      color: "#F5F0E8",
                      marginBottom: 6,
                    }}
                  >
                    {p.name}
                  </h3>

                  {/* Tag — weight 400, muted */}
                  <p
                    style={{
                      fontFamily: DM,
                      fontWeight: 400,
                      fontSize: "0.75rem",
                      color: "#C9A96E",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      marginBottom: 10,
                    }}
                  >
                    {p.tag}
                  </p>

                  <p style={{ ...s.bodySm, color: "rgba(245,240,232,0.5)", marginBottom: 16 }}>
                    {p.desc}
                  </p>

                  <p
                    style={{
                      fontFamily: DM,
                      fontWeight: 300,
                      fontSize: "0.875rem",
                      color: "rgba(245,240,232,0.5)",
                      marginBottom: 16,
                    }}
                  >
                    Starting at{" "}
                    <span style={{ fontWeight: 500, color: "#F5F0E8" }}>{p.price}</span>
                    /mo
                  </p>

                  <a href="#cta" className="btn-gold" style={{ width: "100%", justifyContent: "center", padding: "12px 16px" }}>
                    Get Started
                  </a>

                  <p
                    style={{
                      textAlign: "center",
                      marginTop: 10,
                      fontFamily: DM,
                      fontWeight: 400,
                      fontSize: "0.7rem",
                      color: "rgba(245,240,232,0.3)",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    Important Safety Information
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          HOW IT WORKS — Dark cinematic bg
          H2: weight 300, step labels: weight 600
      ══════════════════════════════════════ */}
      <section
        id="how"
        style={{
          position: "relative",
          padding: "120px 0",
          background: "#0D0D0D",
          overflow: "hidden",
        }}
      >
        {/* Subtle background texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${ASSETS.heroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center 60%",
            opacity: 0.12,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(13,13,13,0.85)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 2.5rem",
            textAlign: "center",
          }}
        >
          <p className="label-tag" style={{ marginBottom: 16 }}>
            The Process
          </p>
          {/* H2 — Light weight */}
          <h2 style={{ ...s.h2Dark, marginBottom: 72 }}>
            How Aurelius helps you<br />command your biology
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 40,
              marginBottom: 64,
            }}
          >
            {[
              {
                n: "1",
                title: "Complete Your Assessment",
                desc: "Answer a comprehensive health questionnaire about your goals, history, and current biology.",
              },
              {
                n: "2",
                title: "Meet Your Provider",
                desc: "A board-certified physician reviews your profile and designs a personalized peptide protocol.",
              },
              {
                n: "3",
                title: "Receive Your Protocol",
                desc: "Your prescription-grade peptides are compounded and shipped directly to your door.",
              },
              {
                n: "4",
                title: "Track Your Results",
                desc: "Regular check-ins, dosage adjustments, and ongoing support — all included in your plan.",
              },
            ].map((step) => (
              <div key={step.n} style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    border: "1.5px solid rgba(201,169,110,0.45)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px",
                    fontFamily: DM,
                    fontWeight: 300,
                    fontSize: "1.125rem",
                    color: "#C9A96E",
                  }}
                >
                  {step.n}
                </div>
                {/* H3 — Semibold for step titles */}
                <h3
                  style={{
                    ...s.h3,
                    color: "#F5F0E8",
                    marginBottom: 12,
                    fontSize: "1.0625rem",
                  }}
                >
                  {step.title}
                </h3>
                <p style={{ ...s.bodyLight, fontSize: "0.9rem" }}>{step.desc}</p>
              </div>
            ))}
          </div>

          <a href="#cta" className="btn-gold">
            Start Your Assessment
          </a>
        </div>
      </section>

      {/* ══════════════════════════════════════
          JOURNEY ACCORDION — Dark + image
          H2: weight 300, accordion titles: weight 600
      ══════════════════════════════════════ */}
      <section
        id="journey"
        style={{
          background: "#0D0D0D",
          padding: "100px 0",
          borderTop: "1px solid rgba(245,240,232,0.06)",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 2.5rem",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "center",
          }}
        >
          {/* Left — accordion */}
          <div>
            <p className="label-tag" style={{ marginBottom: 16 }}>
              Your Transformation
            </p>
            {/* H2 — Light weight */}
            <h2 style={{ ...s.h2Dark, marginBottom: 48 }}>
              How Aurelius helps you in your wellness journey
            </h2>
            <p style={{ ...s.bodyLight, marginBottom: 40 }}>
              We don't treat surface-level symptoms. Our protocols go deeper to address
              the underlying factors affecting your health, performance, and longevity.
            </p>

            {journeyItems.map((item, i) => (
              <AccordionItem
                key={item.title}
                item={item}
                open={openAccordion === i}
                onToggle={() => setOpenAccordion(openAccordion === i ? -1 : i)}
              />
            ))}
          </div>

          {/* Right — sticky image */}
          <div style={{ position: "sticky", top: 100 }}>
            <div
              style={{
                borderRadius: 10,
                overflow: "hidden",
                aspectRatio: "3/4",
              }}
            >
              <img
                src={ASSETS.tirzepatide}
                alt="Aurelius protocol"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TRUST / QUALITY SECTION — Light
          H2: weight 300, feature titles: weight 600
      ══════════════════════════════════════ */}
      <section
        id="trust"
        style={{ background: "#F5F0E8", padding: "100px 0" }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 2.5rem",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "center",
          }}
        >
          {/* Left */}
          <div>
            <p className="label-tag" style={{ marginBottom: 16 }}>
              Our Standards
            </p>
            {/* H2 — Light weight */}
            <h2 style={{ ...s.h2Light, marginBottom: 48 }}>
              Treatments always quality-tested.
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {[
                {
                  title: "Trusted sexual health treatment",
                  desc: "Each treatment includes access to a Certificate of Analysis (COA) confirming consistency, quality, and potency.",
                },
                {
                  title: "Personalized dosage plans",
                  desc: "Dosage plans are tailored to your specific weight loss goals and preferences.",
                },
                {
                  title: "Unlimited access to providers",
                  desc: "Ongoing care comes from an Experienced Care Team and vetted physicians specializing in weight loss — at no extra cost.",
                },
              ].map((item) => (
                <div key={item.title} style={{ display: "flex", gap: 16 }}>
                  <div
                    style={{
                      width: 3,
                      borderRadius: 2,
                      background: "rgba(201,169,110,0.4)",
                      flexShrink: 0,
                      alignSelf: "stretch",
                    }}
                  />
                  <div>
                    {/* H3 — Semibold */}
                    <h3
                      style={{
                        ...s.h3,
                        color: "#1A1A1A",
                        marginBottom: 6,
                        fontSize: "1rem",
                      }}
                    >
                      {item.title}
                    </h3>
                    <p style={{ ...s.bodySm, margin: 0 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — COA badge + image stack */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              alignItems: "center",
            }}
          >
            {/* COA badge */}
            <div
              style={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                border: "2px solid rgba(13,13,13,0.15)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "#F5F0E8",
              }}
            >
              <span
                style={{
                  fontFamily: DM,
                  fontWeight: 600,
                  fontSize: "1.5rem",
                  color: "#1A1A1A",
                  letterSpacing: "-0.02em",
                }}
              >
                COA
              </span>
              <span
                style={{
                  fontFamily: DM,
                  fontWeight: 300,
                  fontSize: "0.6rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#8C7B6B",
                  marginTop: 4,
                }}
              >
                100% Trusted
              </span>
            </div>

            {/* Images */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
                width: "100%",
              }}
            >
              <div style={{ borderRadius: 8, overflow: "hidden", aspectRatio: "1" }}>
                <img
                  src={ASSETS.bpc157}
                  alt="BPC-157"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ borderRadius: 8, overflow: "hidden", aspectRatio: "1" }}>
                <img
                  src={ASSETS.semaglutide}
                  alt="Semaglutide"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TESTIMONIALS — Cream background
          H2: weight 300, names: weight 600
      ══════════════════════════════════════ */}
      <section
        id="testimonials"
        style={{
          background: "#F5F0E8",
          padding: "100px 0",
          borderTop: "1px solid rgba(13,13,13,0.08)",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 2.5rem",
          }}
        >
          <p className="label-tag" style={{ marginBottom: 16, textAlign: "center" }}>
            Real Results
          </p>
          {/* H2 — Light weight */}
          <h2
            style={{
              ...s.h2Light,
              textAlign: "center",
              marginBottom: 64,
            }}
          >
            What our members say
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 24,
            }}
          >
            {testimonials.map((t) => (
              <div
                key={t.name}
                style={{
                  background: "#fff",
                  borderRadius: 10,
                  padding: "32px 28px",
                  border: "1px solid rgba(13,13,13,0.07)",
                }}
              >
                {/* Stars */}
                <div
                  style={{
                    display: "flex",
                    gap: 3,
                    marginBottom: 20,
                    color: "#C9A96E",
                    fontSize: "0.875rem",
                  }}
                >
                  {"★★★★★".split("").map((s, i) => (
                    <span key={i}>{s}</span>
                  ))}
                </div>

                {/* Quote — body weight 400, soft charcoal */}
                <p
                  style={{
                    fontFamily: DM,
                    fontWeight: 400,
                    fontSize: "0.9375rem",
                    lineHeight: 1.65,
                    color: "#3D3D3D",
                    marginBottom: 24,
                    fontStyle: "italic",
                  }}
                >
                  "{t.quote}"
                </p>

                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: "#0D0D0D",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: DM,
                      fontWeight: 500,
                      fontSize: "0.75rem",
                      color: "#C9A96E",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    {/* Name — H3 weight 600 */}
                    <div
                      style={{
                        fontFamily: DM,
                        fontWeight: 600,
                        fontSize: "0.9375rem",
                        color: "#1A1A1A",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {t.name}
                    </div>
                    <div style={{ ...s.bodySm, fontSize: "0.8rem" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA — Dark full-width
          H1-scale: weight 300, tight tracking
      ══════════════════════════════════════ */}
      <section
        id="cta"
        style={{
          background: "#0D0D0D",
          padding: "120px 0",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 2.5rem" }}>
          <p className="label-tag" style={{ marginBottom: 20 }}>
            Get Started Today
          </p>
          {/* Large display heading — weight 300 */}
          <h2
            style={{
              fontFamily: DM,
              fontWeight: 300,
              fontSize: "clamp(2.25rem, 5vw, 4rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "#F5F0E8",
              marginBottom: 24,
            }}
          >
            Your best years are still ahead of you.
          </h2>
          <p style={{ ...s.bodyLight, marginBottom: 48, fontSize: "1.0625rem" }}>
            Take the 3-minute assessment and find out which Aurelius protocol is right
            for your biology.
          </p>
          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: 20,
            }}
          >
            <a href="#" className="btn-gold" style={{ padding: "16px 36px", fontSize: "1rem" }}>
              Start Your Assessment
            </a>
            <a href="#" className="btn-ghost-cream" style={{ padding: "16px 36px", fontSize: "1rem" }}>
              See If You Qualify
            </a>
          </div>
          <p style={{ ...s.bodySm, color: "rgba(245,240,232,0.3)", fontSize: "0.8rem" }}>
            No commitment required. Results may vary. All protocols are physician-supervised.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FOOTER
      ══════════════════════════════════════ */}
      <footer
        style={{
          background: "#0A0A0A",
          borderTop: "1px solid rgba(245,240,232,0.06)",
          padding: "64px 0 40px",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 2.5rem",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1fr",
              gap: 48,
              marginBottom: 56,
            }}
          >
            {/* Brand column */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
                  <path d="M24 4 L6 40 L14 40 L24 20 L34 40 L42 40 Z" fill="#C9A96E" />
                  <line x1="12" y1="28" x2="36" y2="28" stroke="#C9A96E" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="24" y1="20" x2="24" y2="44" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span
                  style={{
                    fontFamily: DM,
                    fontWeight: 500,
                    fontSize: "0.875rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#F5F0E8",
                  }}
                >
                  Aurelius
                </span>
              </div>
              <p style={{ ...s.bodySm, color: "rgba(245,240,232,0.4)", maxWidth: 220 }}>
                Physician-supervised peptide telehealth for people who refuse to accept
                decline as inevitable.
              </p>
            </div>

            {/* Link columns */}
            {[
              {
                heading: "Treatments",
                links: ["BPC-157", "Semaglutide", "Sermorelin", "Tirzepatide", "View All"],
              },
              {
                heading: "Company",
                links: ["About Us", "Our Physicians", "Our Standards", "Blog", "Careers"],
              },
              {
                heading: "Support",
                links: ["How It Works", "FAQ", "Contact Us", "Patient Portal"],
              },
            ].map((col) => (
              <div key={col.heading}>
                <p
                  style={{
                    fontFamily: DM,
                    fontWeight: 500,
                    fontSize: "0.75rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "rgba(245,240,232,0.35)",
                    marginBottom: 16,
                  }}
                >
                  {col.heading}
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        style={{
                          fontFamily: DM,
                          fontWeight: 400,
                          fontSize: "0.875rem",
                          color: "rgba(245,240,232,0.5)",
                          textDecoration: "none",
                          transition: "color 0.2s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#F5F0E8")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,240,232,0.5)")}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div
            style={{
              borderTop: "1px solid rgba(245,240,232,0.06)",
              paddingTop: 28,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <p
              style={{
                fontFamily: DM,
                fontWeight: 400,
                fontSize: "0.8rem",
                color: "rgba(245,240,232,0.25)",
              }}
            >
              © 2026 Aurelius Health Group. All rights reserved.
            </p>
            <div style={{ display: "flex", gap: 24 }}>
              {["Privacy Policy", "Terms of Service", "Medical Disclaimer"].map((link) => (
                <a
                  key={link}
                  href="#"
                  style={{
                    fontFamily: DM,
                    fontWeight: 400,
                    fontSize: "0.8rem",
                    color: "rgba(245,240,232,0.25)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(245,240,232,0.5)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,240,232,0.25)")}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
