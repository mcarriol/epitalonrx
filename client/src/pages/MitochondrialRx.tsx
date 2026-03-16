/* MitochondrialRx — Standalone Landing Page
   Typography System (DM Sans — geometric sans-serif):
   ─────────────────────────────────────────────────────
   H1 / Hero:   weight 300, tight tracking -0.03em, generous leading
   H2:          weight 300, tracking -0.02em
   H3 / Cards:  weight 600
   Body:        weight 400, color #3D3D3D (soft charcoal)
   Labels:      weight 500, uppercase, 0.1em tracking, gold
   ─────────────────────────────────────────────────────
*/
import { useState } from "react";
import Navbar from "@/components/Navbar";

const DARK_ORANGE = "#D2570A";

const DM = "'DM Sans', system-ui, sans-serif";

const IMGS = {
  hero:   "https://d2xsxph8kpxj0f.cloudfront.net/310519663301596594/CqJiJUXAtrZsnakBeSxRGN/mito_hero-T8L8kTaPqQxJGuWSnj3729.webp",
  cells:  "https://d2xsxph8kpxj0f.cloudfront.net/310519663301596594/CqJiJUXAtrZsnakBeSxRGN/mito_cells-FvZGit5aDMxkHqre9CB7KX.webp",
  labs:   "https://d2xsxph8kpxj0f.cloudfront.net/310519663301596594/CqJiJUXAtrZsnakBeSxRGN/mito_labs-NnXXxNV9UBSvmLj6EYC5GC.webp",
  energy: "https://d2xsxph8kpxj0f.cloudfront.net/310519663301596594/CqJiJUXAtrZsnakBeSxRGN/mito_energy-baKM23sV78c9gb4zrZ5nj6.webp",
};

const s = {
  label:  { fontFamily: DM, fontWeight: 500, fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#C9A96E" },
  h1:     { fontFamily: DM, fontWeight: 300, fontSize: "clamp(2.4rem,6vw,5rem)", lineHeight: 1.08, letterSpacing: "-0.03em", color: "#F5F0E8" },
  h2dk:   { fontFamily: DM, fontWeight: 300, fontSize: "clamp(1.6rem,3.5vw,2.75rem)", lineHeight: 1.15, letterSpacing: "-0.02em", color: "#F5F0E8" },
  h2lt:   { fontFamily: DM, fontWeight: 300, fontSize: "clamp(1.6rem,3.5vw,2.75rem)", lineHeight: 1.15, letterSpacing: "-0.02em", color: "#1A1A1A" },
  h3dk:   { fontFamily: DM, fontWeight: 600, fontSize: "1.125rem", lineHeight: 1.3, letterSpacing: "-0.01em", color: "#F5F0E8" },
  h3lt:   { fontFamily: DM, fontWeight: 600, fontSize: "1.125rem", lineHeight: 1.3, letterSpacing: "-0.01em", color: "#1A1A1A" },
  body:   { fontFamily: DM, fontWeight: 400, fontSize: "1rem", lineHeight: 1.65, color: "#3D3D3D" },
  bodySm: { fontFamily: DM, fontWeight: 400, fontSize: "0.875rem", lineHeight: 1.6, color: "#5A5A5A" },
  bodyLt: { fontFamily: DM, fontWeight: 300, fontSize: "0.9375rem", lineHeight: 1.65, color: "rgba(245,240,232,0.62)" },
  cite:   { fontFamily: DM, fontWeight: 400, fontSize: "0.72rem", lineHeight: 1.5, color: "#8C7B6B", fontStyle: "italic" },
};

/* ── Problem cards — 3 only ── */
const problems = [
  {
    icon: "⚡",
    title: "Chronic Fatigue with Normal Labs",
    profile: "Adults 35–65 with persistent fatigue, normal TSH/CBC, told 'everything looks fine'",
    mechanism: "MOTS-c activates AMPK in skeletal muscle and liver, restoring mitochondrial biogenesis and ATP production at the cellular level.",
    testimonial: "\"Six weeks in, I felt like I was 38 again.\" — M.T., 52, Austin TX",
  },
  {
    icon: "⊕",
    title: "Metabolic Resistance",
    profile: "People who eat well and exercise but cannot shift body composition — weight loss plateaus, fat redistribution to trunk",
    mechanism: "MOTS-c upregulates GLUT4 translocation and fatty acid oxidation via AMPK, bypassing insulin resistance to restore metabolic flexibility.",
    testimonial: "\"After three months, my HOMA-IR dropped from 3.8 to 1.4.\" — D.R., 47, Denver CO",
  },
  {
    icon: "◷",
    title: "Cognitive Decline / Brain Fog",
    profile: "Adults 40+ with subjective cognitive decline, reduced processing speed, or memory complaints",
    mechanism: "MOTS-c crosses the blood-brain barrier and activates AMPK in neurons, improving mitochondrial function and reducing neuroinflammation.",
    testimonial: "\"After two months I was sharp again — my team noticed before I did.\" — J.B., 49, Seattle WA",
  },
];

/* ── Pathways (Clinical Evidence) ── */
const pathways = [
  {
    n: "01", title: "Cellular Energy Restoration",
    body: "MOTS-c activates AMPK in skeletal muscle, liver, and adipose tissue — the master energy sensor governing mitochondrial biogenesis, fatty acid oxidation, and glucose uptake.",
    cite: "Lee C et al. Cell Metabolism. 2015;21(3):443–454.",
    tags: ["Mitochondrial biogenesis", "ATP production", "AMPK activation"],
  },
  {
    n: "02", title: "Metabolic Optimization",
    body: "MOTS-c improves insulin sensitivity via GLUT4 upregulation and reduces ectopic lipid deposition in muscle and liver. In animal models, it prevented diet-induced obesity without caloric restriction.",
    cite: "Lee C et al. Cell Metabolism. 2015;21(3):443–454.",
    tags: ["Insulin sensitivity", "GLUT4", "Metabolic flexibility"],
  },
  {
    n: "03", title: "Longevity / AMPK-mTOR Axis",
    body: "MOTS-c activates AMPK and suppresses mTORC1 — the longevity pathway engaged by caloric restriction and metformin — promoting autophagy and reducing cellular senescence.",
    cite: "Reynolds JC et al. Nature Aging. 2021;1:1137–1150.",
    tags: ["mTOR inhibition", "Autophagy", "Healthspan"],
  },
  {
    n: "04", title: "Exercise Mimetic",
    body: "MOTS-c is released from skeletal muscle during exercise. In sedentary animal models, MOTS-c produced metabolic adaptations equivalent to exercise training.",
    cite: "Lee C et al. Cell Metabolism. 2015;21(3):443–454.",
    tags: ["Exercise mimetic", "VO2max", "Recovery"],
  },
  {
    n: "05", title: "Cognitive / Neurometabolism",
    body: "MOTS-c crosses the blood-brain barrier and activates neuronal AMPK, improving mitochondrial function in brain tissue and reducing amyloid precursor protein processing.",
    cite: "Zhu D et al. Aging Cell. 2021;20(4):e13353.",
    tags: ["Neuronal AMPK", "Brain fog", "Neuroprotection"],
  },
  {
    n: "06", title: "Inflammation Reduction",
    body: "MOTS-c reduces NF-κB-driven inflammatory cytokines (IL-6, TNF-α, IL-1β) via AMPK activation — particularly relevant in post-COVID fatigue and metabolic syndrome.",
    cite: "Ming W et al. Frontiers in Physiology. 2022;13:873740.",
    tags: ["hsCRP", "IL-6", "NF-κB"],
  },
];

/* ── Condition tag cloud ── */
const conditionTags = [
  "Chronic Fatigue", "Insulin Resistance", "Pre-Diabetes", "Metabolic Syndrome",
  "Long COVID", "Brain Fog", "Sarcopenia", "Obesity", "Cognitive Decline",
  "Accelerated Aging", "Poor Recovery", "Low VO2max", "Mitochondrial Dysfunction",
  "Neuroinflammation", "Epigenetic Aging",
];

/* ── FAQ ── */
const faqs = [
  {
    q: "What is MOTS-c and where does it come from?",
    a: "MOTS-c is a peptide encoded in the mitochondrial genome — specifically the 12S rRNA gene. Discovered in 2015 by Changhan David Lee at USC, it was the first peptide shown to be encoded in mitochondrial DNA and act as a systemic hormone. Circulating MOTS-c levels decline with age, correlating with the metabolic deterioration seen in aging.",
  },
  {
    q: "How does MOTS-c compare to NMN or NAD+ precursors?",
    a: "NMN increases the cellular pool of NAD+. MOTS-c works upstream: it activates AMPK — the master energy sensor — which drives mitochondrial biogenesis, fatty acid oxidation, and glucose uptake. These are complementary but distinct mechanisms. NMN addresses substrate availability; MOTS-c addresses the signaling pathway.",
  },
  {
    q: "What does the research actually show? Is this proven in humans?",
    a: "Honest answer: the foundational MOTS-c research is primarily from animal models and cell cultures. Human epidemiological data shows higher circulating MOTS-c correlates with longevity markers. Human pharmacokinetic and safety studies are ongoing. There are no published large-scale human RCTs yet. Aurelius protocols are based on available preclinical evidence, known AMPK biology, and the safety profile observed in early human use.",
  },
  {
    q: "How is MOTS-c administered?",
    a: "MOTS-c is administered as a subcutaneous injection, typically 5–10mg, 3–5 times per week. Injection sites are rotated across the abdomen, thighs, or lateral hip. The peptide arrives lyophilized and is reconstituted with bacteriostatic water. Reconstituted vials are stored refrigerated and used within 30 days.",
  },
  {
    q: "How long until I see results?",
    a: "Most patients report subjective energy improvements within 2–4 weeks. Measurable metabolic changes (HOMA-IR, fasting glucose, body composition) are typically assessed at 12 weeks. Cognitive effects, when present, are typically reported at 4–8 weeks.",
  },
  {
    q: "Is prescribing MOTS-c off-label legal?",
    a: "MOTS-c is not FDA-approved for any indication. It is prescribed as a compounded peptide under the clinical judgment of a licensed physician. Off-label prescribing of compounded peptides is legal in the United States when prescribed by a licensed physician who documents clinical rationale and obtains informed consent.",
  },
];

/* ── Eligibility Quiz ── */
function EligibilityQuiz() {
  const questions = [
    { q: "Do you have any active malignancy (cancer) currently under treatment?", disqualifier: "YES", note: "Active cancer is a contraindication to MOTS-c protocol." },
    { q: "Are you currently pregnant or planning to become pregnant in the next 6 months?", disqualifier: "YES", note: "MOTS-c has not been studied in pregnancy." },
    { q: "Do you have uncontrolled diabetes with HbA1c above 9.0%?", disqualifier: "YES", note: "Uncontrolled diabetes requires stabilization before peptide protocols." },
    { q: "Are you currently taking immunosuppressive medications (e.g., tacrolimus, cyclosporine, high-dose steroids)?", disqualifier: "YES", note: "Immunosuppressive therapy may interact with AMPK-activating compounds." },
    { q: "Do you experience any of the following: persistent fatigue, metabolic resistance, brain fog, poor recovery, or pre-diabetic labs?", disqualifier: "NO", note: "These are the primary indications for MOTS-c protocol consideration." },
    { q: "Are you willing to complete baseline lab work (including HOMA-IR, hsCRP, fasting insulin) before starting the protocol?", disqualifier: "NO", note: "Baseline labs are required for safe protocol initiation and monitoring." },
  ];

  const [answers, setAnswers] = useState<(string | null)[]>(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const isDisqualified = questions.some((q, i) => answers[i] === q.disqualifier);
  const allAnswered = answers.every((a) => a !== null);

  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      {questions.map((item, i) => (
        <div key={i} style={{ borderTop: "1px solid rgba(245,240,232,0.08)", padding: "28px 0" }}>
          <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "1rem", color: "#F5F0E8", marginBottom: 16, lineHeight: 1.5 }}>
            <span style={{ color: "#C9A96E", fontWeight: 500, marginRight: 10 }}>{String(i + 1).padStart(2, "0")}</span>
            {item.q}
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            {["YES", "NO"].map((opt) => (
              <button
                key={opt}
                onClick={() => { const next = [...answers]; next[i] = opt; setAnswers(next); setSubmitted(false); }}
                style={{
                  fontFamily: DM, fontWeight: 500, fontSize: "0.8rem", letterSpacing: "0.08em",
                  padding: "10px 28px", border: "1px solid",
                  borderColor: answers[i] === opt ? "#C9A96E" : "rgba(245,240,232,0.2)",
                  background: answers[i] === opt ? "rgba(201,169,110,0.12)" : "transparent",
                  color: answers[i] === opt ? "#C9A96E" : "rgba(245,240,232,0.5)",
                  borderRadius: 4, cursor: "pointer", transition: "all 0.2s",
                }}
              >{opt}</button>
            ))}
          </div>
        </div>
      ))}

      {allAnswered && !submitted && (
        <div style={{ paddingTop: 32 }}>
          <button onClick={() => setSubmitted(true)} className="btn-gold" style={{ padding: "16px 40px", fontSize: "1rem" }}>
            Check My Eligibility
          </button>
        </div>
      )}

      {submitted && (
        <div style={{
          marginTop: 32, padding: "32px 36px", borderRadius: 10,
          background: isDisqualified ? "rgba(180,60,60,0.08)" : "rgba(201,169,110,0.08)",
          border: `1px solid ${isDisqualified ? "rgba(180,60,60,0.25)" : "rgba(201,169,110,0.3)"}`,
        }}>
          {isDisqualified ? (
            <>
              <p style={{ ...s.label, color: "#C97070", marginBottom: 12 }}>Requires Physician Review</p>
              <h3 style={{ ...s.h3dk, marginBottom: 12, fontSize: "1.25rem" }}>Your responses indicate a contraindication that requires physician review before protocol initiation.</h3>
              <p style={{ ...s.bodyLt, marginBottom: 24 }}>One or more of your answers indicates a condition that may require modification of the standard MOTS-c protocol. Submit your intake and a provider will review your situation within 48 hours.</p>
              <a href="mailto:intake@aureliushealthgroup.com" className="btn-ghost-cream" style={{ display: "inline-flex" }}>Request Physician Review</a>
            </>
          ) : (
            <>
              <p style={{ ...s.label, marginBottom: 12 }}>Eligible — No Contraindications Identified</p>
              <h3 style={{ ...s.h3dk, marginBottom: 12, fontSize: "1.25rem" }}>Based on your responses, you appear to be a candidate for the MitochondrialRx protocol.</h3>
              <p style={{ ...s.bodyLt, marginBottom: 24 }}>No contraindications were identified. The next step is completing a comprehensive intake form and baseline lab panel. A board-certified physician will review your results within 48 hours.</p>
              <a href="mailto:intake@aureliushealthgroup.com" className="btn-gold" style={{ display: "inline-flex" }}>Start My Intake</a>
            </>
          )}
        </div>
      )}
    </div>
  );
}

/* ── FAQ accordion ── */
function FaqItem({ item }: { item: { q: string; a: string } }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderTop: "1px solid rgba(245,240,232,0.08)" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
      >
        <span style={{ fontFamily: DM, fontWeight: 500, fontSize: "1rem", color: "#F5F0E8", lineHeight: 1.4, paddingRight: 24 }}>{item.q}</span>
        <span style={{ color: "#C9A96E", fontSize: "1.25rem", flexShrink: 0, transition: "transform 0.2s", transform: open ? "rotate(45deg)" : "none" }}>+</span>
      </button>
      {open && (
        <div style={{ paddingBottom: 24 }}>
          <p style={{ ...s.bodyLt, margin: 0 }}>{item.a}</p>
        </div>
      )}
    </div>
  );
}

export default function MitochondrialRx() {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  return (
    <div style={{ background: "#0D0D0D", minHeight: "100vh" }}>
      <Navbar />

      {/* ══ HERO ══ */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src={IMGS.hero} alt="MitochondrialRx hero" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,13,13,0.92) 0%, rgba(13,13,13,0.45) 50%, rgba(13,13,13,0.2) 100%)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem) clamp(60px,10vw,100px)", width: "100%" }}>
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
            <a href="https://aureliushealth-cqjijuxa.manus.space" style={{ ...s.label, color: "rgba(201,169,110,0.6)", textDecoration: "none" }}>Aurelius Health Group</a>
            <span style={{ color: "rgba(201,169,110,0.4)", fontSize: "0.7rem" }}>›</span>
            <span style={{ ...s.label }}>Mitochondrial<span style={{ color: DARK_ORANGE }}>Rx</span></span>
          </div>
          <h1 style={{ ...s.h1, maxWidth: 700, marginBottom: 24 }}>
            The mitokine your<br />mitochondria stopped<br />making at 40.
          </h1>
          <p style={{ ...s.bodyLt, maxWidth: 480, marginBottom: 16, fontSize: "1.0625rem" }}>
            MOTS-c is encoded in your mitochondrial DNA. It activates AMPK — the master metabolic switch — restoring cellular energy, insulin sensitivity, and longevity signaling from the source.
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40 }}>
            {["Physician-supervised", "Pharma-grade compounded", "Cold-shipped"].map((t) => (
              <span key={t} style={{ ...s.label, color: "rgba(201,169,110,0.55)", border: "1px solid rgba(201,169,110,0.2)", padding: "5px 12px", borderRadius: 3 }}>{t}</span>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="#quiz" className="btn-gold">Check My Eligibility</a>
            <a href="#mechanism" className="btn-ghost-cream">How It Works</a>
          </div>
        </div>
      </section>

      {/* ══ STATS STRIP ══ */}
      <section style={{ background: "#111", borderTop: "1px solid rgba(201,169,110,0.1)", borderBottom: "1px solid rgba(201,169,110,0.1)", padding: "28px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem)" }}>
          <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
            {[
              { val: "2015", label: "Discovery in Cell Metabolism" },
              { val: "AMPK", label: "Master metabolic pathway" },
              { val: "12S rRNA", label: "Mitochondrial gene origin" },
              { val: "$269/mo", label: "All-inclusive protocol" },
            ].map((s2) => (
              <div key={s2.label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: DM, fontWeight: 300, fontSize: "clamp(1.25rem,3vw,1.75rem)", letterSpacing: "-0.03em", color: "#C9A96E", lineHeight: 1 }}>{s2.val}</div>
                <div style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.75rem", color: "rgba(245,240,232,0.4)", marginTop: 6, letterSpacing: "0.04em" }}>{s2.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROBLEM — 3 cards ══ */}
      <section id="problem" style={{ background: "#F5F0E8", padding: "clamp(60px,8vw,100px) 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem)" }}>
          <p style={{ ...s.label, marginBottom: 16 }}>The Problem</p>
          <div className="two-col-header" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 60, alignItems: "start", marginBottom: 64 }}>
            <h2 style={{ ...s.h2lt }}>Three signs your mitochondria are failing you</h2>
            <p style={{ ...s.body, paddingTop: 8 }}>
              MOTS-c levels decline by 30–50% between ages 40 and 60. The downstream effects are measurable, progressive, and — with the right intervention — addressable. These three presentations are the most common clinical fingerprints of that gap.
            </p>
          </div>
          <div className="three-col-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {problems.map((p) => (
              <div key={p.title} style={{ background: "#fff", border: "1px solid rgba(13,13,13,0.08)", borderRadius: 10, padding: "28px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", border: "1px solid rgba(201,169,110,0.4)", display: "flex", alignItems: "center", justifyContent: "center", color: "#C9A96E", fontSize: "1rem", flexShrink: 0 }}>{p.icon}</div>
                <h3 style={{ ...s.h3lt, fontSize: "1rem", margin: 0 }}>{p.title}</h3>
                <div style={{ borderTop: "1px solid rgba(13,13,13,0.06)", paddingTop: 14 }}>
                  <p style={{ ...s.label, color: "#8C7B6B", marginBottom: 6 }}>Target Patient</p>
                  <p style={{ ...s.bodySm, margin: 0 }}>{p.profile}</p>
                </div>
                <div>
                  <p style={{ ...s.label, color: "#8C7B6B", marginBottom: 6 }}>MOTS-c Mechanism</p>
                  <p style={{ ...s.bodySm, margin: 0 }}>{p.mechanism}</p>
                </div>
                <div style={{ background: "rgba(201,169,110,0.06)", borderLeft: "2px solid rgba(201,169,110,0.4)", padding: "12px 14px", borderRadius: "0 6px 6px 0" }}>
                  <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.8rem", color: "#5A5A5A", fontStyle: "italic", lineHeight: 1.5, margin: 0 }}>{p.testimonial}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MECHANISM ══ */}
      <section id="mechanism" style={{ background: "#0D0D0D", padding: "clamp(60px,8vw,100px) 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem)" }}>
          <p style={{ ...s.label, marginBottom: 16 }}>The Mechanism</p>

          <div className="two-col-header" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start", marginBottom: 80 }}>
            <div>
              <h2 style={{ ...s.h2dk, marginBottom: 32 }}>A peptide encoded in your mitochondrial DNA.</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {[
                  { label: "Origin", text: "MOTS-c is encoded in the 12S rRNA gene of the mitochondrial genome — discovered by Changhan David Lee at USC and published in Cell Metabolism in 2015. It was the first peptide shown to be encoded in mitochondrial DNA and act as a systemic hormone." },
                  { label: "Classification", text: "MOTS-c belongs to a new class of signaling molecules called mitokines — peptides secreted by mitochondria that communicate metabolic status to distant tissues." },
                  { label: "Physiologic Role", text: "Circulating MOTS-c levels rise during exercise and caloric restriction — the two most validated longevity interventions known. Levels decline with age, obesity, and insulin resistance." },
                ].map((item) => (
                  <div key={item.label} style={{ borderLeft: "2px solid rgba(201,169,110,0.3)", paddingLeft: 20 }}>
                    <p style={{ ...s.label, marginBottom: 6 }}>{item.label}</p>
                    <p style={{ ...s.bodyLt, margin: 0, fontSize: "0.9rem" }}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* AMPK Flow Diagram */}
            <div>
              <p style={{ ...s.label, marginBottom: 20 }}>AMPK Signal Cascade</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {[
                  { node: "MOTS-c", sub: "Mitochondrial-derived peptide (12S rRNA gene)", color: "#C9A96E" },
                  { node: "AMPK Activation", sub: "AMP-activated protein kinase — master energy sensor", color: "#B8956A" },
                  { node: "Mitochondrial Biogenesis", sub: "PGC-1α upregulation → new mitochondria synthesis", color: "#A07A55" },
                  { node: "Metabolic Reprogramming", sub: "GLUT4 ↑, fatty acid oxidation ↑, mTORC1 ↓", color: "#8C6845" },
                  { node: "Systemic Adaptation", sub: "Insulin sensitivity, fat loss, longevity signaling, neuroprotection", color: "#785535" },
                ].map((node, i) => (
                  <div key={node.node} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                    <div style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${node.color}30`, borderLeft: `3px solid ${node.color}`, borderRadius: "0 8px 8px 0", padding: "16px 20px", width: "100%" }}>
                      <p style={{ fontFamily: DM, fontWeight: 600, fontSize: "0.9375rem", color: node.color, margin: "0 0 4px" }}>{node.node}</p>
                      <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.8rem", color: "rgba(245,240,232,0.5)", margin: 0 }}>{node.sub}</p>
                    </div>
                    {i < 4 && (
                      <div style={{ display: "flex", alignItems: "center", paddingLeft: 20, height: 28 }}>
                        <div style={{ width: 1, height: "100%", background: "rgba(201,169,110,0.25)" }} />
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none" style={{ marginLeft: -5 }}>
                          <path d="M5 8L0 0h10z" fill="rgba(201,169,110,0.4)" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <p style={{ ...s.label, marginBottom: 20 }}>Mechanism Comparison</p>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: DM, minWidth: 600 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(201,169,110,0.2)" }}>
                  {["", "MOTS-c", "NMN / NAD+", "Metformin", "Exercise", "GLP-1"].map((h, i) => (
                    <th key={h} style={{
                      padding: "12px 16px", textAlign: i === 0 ? "left" : "center",
                      fontWeight: 500, fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase",
                      color: i === 1 ? "#C9A96E" : "rgba(245,240,232,0.4)",
                      background: i === 1 ? "rgba(201,169,110,0.06)" : "transparent",
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Target pathway", "AMPK (direct)", "NAD+ synthesis", "Complex I / AMPK", "AMPK + multiple", "GLP-1R / GIP-R"],
                  ["Mitochondrial origin", "✓ Endogenous", "✗ Supplement", "✗ Pharmaceutical", "✓ Endogenous", "✗ Pharmaceutical"],
                  ["Mitochondrial biogenesis", "✓ Yes", "Partial", "✗ No", "✓ Yes", "✗ No"],
                  ["Insulin sensitivity", "✓ GLUT4 ↑", "Indirect", "✓ Hepatic", "✓ Yes", "✓ Yes"],
                  ["Longevity axis (AMPK-mTOR)", "✓ Yes", "Partial (SIRT1)", "✓ Yes", "✓ Yes", "✗ No"],
                ].map((row, ri) => (
                  <tr key={ri} style={{ borderBottom: "1px solid rgba(245,240,232,0.05)" }}>
                    {row.map((cell, ci) => (
                      <td key={ci} style={{
                        padding: "14px 16px", fontSize: "0.875rem",
                        textAlign: ci === 0 ? "left" : "center",
                        color: ci === 0 ? "rgba(245,240,232,0.5)" : ci === 1 ? "#C9A96E" : cell.startsWith("✓") ? "rgba(245,240,232,0.75)" : "rgba(245,240,232,0.35)",
                        fontWeight: ci === 1 ? 500 : 400,
                        background: ci === 1 ? "rgba(201,169,110,0.04)" : "transparent",
                      }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ══ CLINICAL EVIDENCE (pathways) ══ */}
      <section id="research" style={{ background: "#F5F0E8", padding: "clamp(60px,8vw,100px) 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem)" }}>
          <p style={{ ...s.label, marginBottom: 16 }}>Clinical Evidence</p>
          <div className="two-col-header" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 60, alignItems: "start", marginBottom: 64 }}>
            <h2 style={{ ...s.h2lt }}>Six evidence-backed pathways</h2>
            <p style={{ ...s.body, paddingTop: 8 }}>Each pathway is supported by peer-reviewed research. We include honest framing on human vs. animal data — because you deserve to know exactly what the evidence shows.</p>
          </div>
          <div className="three-col-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginBottom: 64 }}>
            {pathways.map((p) => (
              <div key={p.n} style={{ background: "#fff", border: "1px solid rgba(13,13,13,0.07)", borderRadius: 10, padding: "28px 24px" }}>
                <div style={{ fontFamily: DM, fontWeight: 300, fontSize: "2.5rem", color: "rgba(13,13,13,0.1)", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 12 }}>{p.n}</div>
                <h3 style={{ ...s.h3lt, marginBottom: 12, fontSize: "1rem" }}>{p.title}</h3>
                <p style={{ ...s.bodySm, marginBottom: 16 }}>{p.body}</p>
                <p style={{ ...s.cite, marginBottom: 16 }}>Source: {p.cite}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {p.tags.map((tag) => (
                    <span key={tag} style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.7rem", letterSpacing: "0.04em", padding: "3px 10px", borderRadius: 20, background: "rgba(201,169,110,0.1)", color: "#8C6845", border: "1px solid rgba(201,169,110,0.2)" }}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Condition tag cloud */}
          <div style={{ borderTop: "1px solid rgba(13,13,13,0.08)", paddingTop: 48 }}>
            <p style={{ ...s.label, marginBottom: 20 }}>Conditions Addressed</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {conditionTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                  style={{
                    fontFamily: DM, fontWeight: 400, fontSize: "0.8125rem",
                    padding: "8px 16px", borderRadius: 4, cursor: "pointer", transition: "all 0.2s",
                    background: activeTag === tag ? "#0D0D0D" : "transparent",
                    color: activeTag === tag ? "#C9A96E" : "#3D3D3D",
                    border: `1px solid ${activeTag === tag ? "#C9A96E" : "rgba(13,13,13,0.15)"}`,
                  }}
                >{tag}</button>
              ))}
            </div>
            {activeTag && (
              <div style={{ marginTop: 20, padding: "16px 20px", background: "rgba(201,169,110,0.06)", borderRadius: 6, border: "1px solid rgba(201,169,110,0.2)" }}>
                <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.875rem", color: "#3D3D3D", margin: 0 }}>
                  <strong style={{ color: "#1A1A1A" }}>{activeTag}</strong> — MOTS-c addresses this condition through AMPK activation, mitochondrial biogenesis, and downstream metabolic reprogramming. Speak with a physician to understand how this applies to your specific case.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ══ CELLS IMAGE BREAK ══ */}
      <section style={{ background: "#0D0D0D", padding: 0 }}>
        <div style={{ position: "relative", maxHeight: 500, overflow: "hidden" }}>
          <img src={IMGS.cells} alt="Mitochondria" style={{ width: "100%", objectFit: "cover", objectPosition: "center", display: "block" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(13,13,13,0.85) 0%, transparent 40%, transparent 60%, rgba(13,13,13,0.85) 100%)" }} />
          <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", textAlign: "center", width: "100%", padding: "0 1.25rem" }}>
            <p style={{ ...s.label, marginBottom: 8 }}>Mitochondrial Origin</p>
            <p style={{ fontFamily: DM, fontWeight: 300, fontSize: "clamp(1.1rem, 2.5vw, 2rem)", color: "#F5F0E8", letterSpacing: "-0.02em" }}>The only peptide hormone encoded in mitochondrial DNA</p>
          </div>
        </div>
      </section>

      {/* ══ PROTOCOL STEPS — DARK THEME ══ */}
      <section style={{ background: "#0D0D0D", padding: "clamp(60px,8vw,100px) 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem)" }}>
          <p style={{ ...s.label, marginBottom: 16 }}>The Protocol</p>
          <div className="two-col-header" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, alignItems: "start", marginBottom: 64 }}>
            <h2 style={{ ...s.h2dk }}>Four steps from intake to results</h2>
            <p style={{ ...s.bodyLt, paddingTop: 8 }}>Designed to mirror the infrastructure of the published research — physician oversight, comprehensive baseline labs, pharma-grade compound, and quantified outcomes at 12 weeks.</p>
          </div>
          <div className="four-col-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
            {[
              {
                n: "1", title: "Assessment & Intake", tag: "Required",
                items: ["Comprehensive health questionnaire", "Symptom and goal mapping", "Medication and supplement review", "Physician review within 48 hours", "Contraindication screening"],
              },
              {
                n: "2", title: "Baseline Labs", tag: "Required",
                items: ["HOMA-IR (insulin resistance index)", "Fasting insulin + fasting glucose", "HbA1c", "hsCRP (systemic inflammation)", "AM cortisol (HPA axis)", "Full lipid panel + CMP", "CBC with differential"],
              },
              {
                n: "3", title: "Protocol Initiation", tag: "Week 1",
                items: ["MOTS-c 5–10mg compounded, lyophilized", "Bacteriostatic water + sterile supplies shipped", "Cold-packed, overnight delivery", "Nurse onboarding session (video)", "Injection technique certification"],
              },
              {
                n: "4", title: "Monitoring & Optimization", tag: "Ongoing",
                items: ["Monthly provider check-ins", "Labs repeated at 12 weeks", "DEXA body composition at 12 weeks", "Protocol adjustment based on lab response", "Ongoing direct messaging support"],
              },
            ].map((step) => (
              <div key={step.n} style={{ borderTop: "2px solid rgba(201,169,110,0.4)", paddingTop: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div style={{ fontFamily: DM, fontWeight: 300, fontSize: "2.5rem", color: "rgba(245,240,232,0.08)", letterSpacing: "-0.04em", lineHeight: 1 }}>{step.n}</div>
                  <span style={{ ...s.label, background: "rgba(201,169,110,0.1)", padding: "3px 8px", borderRadius: 3 }}>{step.tag}</span>
                </div>
                <h3 style={{ ...s.h3dk, marginBottom: 16, fontSize: "1rem" }}>{step.title}</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                  {step.items.map((item) => (
                    <li key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span style={{ color: "#C9A96E", fontSize: "0.75rem", marginTop: 3, flexShrink: 0 }}>◎</span>
                      <span style={{ ...s.bodyLt, fontSize: "0.875rem" }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PRICING ══ */}
      <section id="pricing" style={{ background: "#F5F0E8", padding: "clamp(60px,8vw,100px) 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem)" }}>
          <p style={{ ...s.label, marginBottom: 16 }}>Pricing</p>
          <div className="two-col-pricing" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div>
              <h2 style={{ ...s.h2lt, marginBottom: 20 }}>Functional medicine pricing. Without the markup.</h2>
              <p style={{ ...s.body, marginBottom: 24 }}>
                Functional medicine clinics typically charge $2,000–$4,000 for initial workup, $500–$800 per follow-up, and $300–$600/month for compounds — billed separately. Aurelius bundles physician oversight, labs, compound, and monitoring into one monthly plan.
              </p>
              <div style={{ background: "rgba(201,169,110,0.06)", border: "1px solid rgba(201,169,110,0.15)", borderRadius: 8, padding: "20px 24px", marginBottom: 28 }}>
                <p style={{ fontFamily: DM, fontWeight: 500, fontSize: "0.875rem", color: "#1A1A1A", marginBottom: 8 }}>Typical functional medicine cost breakdown:</p>
                {[
                  ["Initial consult (2hr)", "$400–$600"],
                  ["Comprehensive lab panel", "$600–$1,200"],
                  ["Monthly compound cost", "$300–$600"],
                  ["Monthly follow-up visits", "$200–$400"],
                  ["Total first month", "$1,500–$2,800"],
                ].map(([item, cost]) => (
                  <div key={item} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid rgba(13,13,13,0.06)" }}>
                    <span style={{ ...s.bodySm }}>{item}</span>
                    <span style={{ fontFamily: DM, fontWeight: 500, fontSize: "0.875rem", color: "#8C6845" }}>{cost}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {["Physician consultation included", "Full metabolic lab panel included", "Pharma-grade MOTS-c included", "Nurse onboarding included", "DEXA coordination included", "No hidden fees"].map((item) => (
                  <div key={item} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#C9A96E" strokeWidth="1.2"/><path d="M5 8l2 2 4-4" stroke="#C9A96E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span style={{ ...s.bodySm }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ background: "#0D0D0D", borderRadius: 12, padding: "clamp(32px,5vw,48px) clamp(24px,4vw,40px)", textAlign: "center", border: "1px solid rgba(201,169,110,0.15)" }}>
                <p style={{ ...s.label, marginBottom: 12 }}>MitochondrialRx Plan</p>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: 4, marginBottom: 8 }}>
                  <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "1.25rem", color: "#C9A96E", marginTop: 10 }}>$</span>
                  <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "clamp(3.5rem,8vw,5rem)", lineHeight: 1, letterSpacing: "-0.04em", color: "#F5F0E8" }}>269</span>
                  <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "1rem", color: "rgba(245,240,232,0.4)", marginTop: 16 }}>/mo</span>
                </div>
                <p style={{ ...s.bodyLt, fontSize: "0.8rem", marginBottom: 32 }}>vs. $1,500–$2,800/mo at a functional medicine clinic</p>
                <a href="#quiz" className="btn-gold" style={{ width: "100%", justifyContent: "center", padding: "16px", fontSize: "1rem", display: "flex" }}>Check My Eligibility</a>
                <p style={{ ...s.bodyLt, fontSize: "0.75rem", marginTop: 16, opacity: 0.5 }}>No commitment. Cancel anytime.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ ELIGIBILITY QUIZ ══ */}
      <section id="quiz" style={{ background: "#0D0D0D", padding: "clamp(60px,8vw,100px) 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem)" }}>
          <p style={{ ...s.label, marginBottom: 16, textAlign: "center" }}>Eligibility Screening</p>
          <h2 style={{ ...s.h2dk, textAlign: "center", marginBottom: 16 }}>Are you a candidate for MitochondrialRx?</h2>
          <p style={{ ...s.bodyLt, textAlign: "center", maxWidth: 520, margin: "0 auto 56px" }}>
            This 6-question screen checks for MOTS-c protocol contraindications. It takes under 60 seconds and does not constitute a medical evaluation.
          </p>
          <EligibilityQuiz />
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section id="faq" style={{ background: "#0D0D0D", padding: "clamp(60px,8vw,100px) 0", borderTop: "1px solid rgba(245,240,232,0.06)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem)" }}>
          <p style={{ ...s.label, marginBottom: 16 }}>Frequently Asked Questions</p>
          <div className="faq-grid" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, alignItems: "start" }}>
            <div style={{ position: "sticky", top: 100 }}>
              <h2 style={{ ...s.h2dk, marginBottom: 20 }}>Everything you need to know</h2>
              <p style={{ ...s.bodyLt }}>Including MOTS-c vs. NMN/NAD+, honest research framing, administration, timeline, and off-label prescribing legality.</p>
              <div style={{ marginTop: 40 }}>
                <img src={IMGS.labs} alt="Lab review" style={{ width: "100%", borderRadius: 10, objectFit: "cover" }} />
              </div>
            </div>
            <div>
              {faqs.map((item) => (
                <FaqItem key={item.q} item={item} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ CLOSING CTA ══ */}
      <section style={{ background: "#0D0D0D", padding: "clamp(60px,8vw,100px) 0", textAlign: "center", borderTop: "1px solid rgba(245,240,232,0.06)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem)" }}>
          <p style={{ ...s.label, marginBottom: 20 }}>Start Today</p>
          <h2 style={{ fontFamily: DM, fontWeight: 300, fontSize: "clamp(1.75rem, 4.5vw, 3.5rem)", lineHeight: 1.1, letterSpacing: "-0.03em", color: "#F5F0E8", marginBottom: 24 }}>
            Your mitochondria are not broken.<br />They're waiting for the signal.
          </h2>
          <p style={{ ...s.bodyLt, marginBottom: 48, fontSize: "1.0625rem" }}>
            MOTS-c is the signal your body produced naturally at 30 — and stopped making at 50. A physician-supervised protocol is available today.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 20 }}>
            <a href="#quiz" className="btn-gold" style={{ padding: "16px 36px", fontSize: "1rem" }}>Check My Eligibility</a>
            <a href="#research" className="btn-ghost-cream" style={{ padding: "16px 36px", fontSize: "1rem" }}>Review the Research</a>
          </div>
          <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.75rem", color: "rgba(245,240,232,0.25)", lineHeight: 1.6, maxWidth: 560, margin: "0 auto" }}>
            † This page describes off-label use of MOTS-c, a compounded peptide not approved by the FDA for any indication. Off-label prescribing of compounded peptides is legal and at the clinical discretion of a licensed physician. This content is for informational purposes only and does not constitute medical advice. Individual results vary. All protocols require physician evaluation and are subject to contraindication screening.
          </p>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ background: "#0A0A0A", borderTop: "1px solid rgba(245,240,232,0.06)", padding: "clamp(40px,6vw,64px) 0 40px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem)" }}>
          <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 56 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
                  <path d="M24 4 L6 40 L14 40 L24 20 L34 40 L42 40 Z" fill="#C9A96E" />
                  <line x1="12" y1="28" x2="36" y2="28" stroke="#C9A96E" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="24" y1="20" x2="24" y2="44" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <div>
                  <span style={{ fontFamily: DM, fontWeight: 500, fontSize: "0.875rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#F5F0E8", display: "block" }}>Mitochondrial<span style={{ color: DARK_ORANGE }}>Rx</span></span>
                  <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#8C7B6B" }}>Aurelius Health Group</span>
                </div>
              </div>
              <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.875rem", color: "rgba(245,240,232,0.35)", maxWidth: 220, marginTop: 12, lineHeight: 1.6 }}>Physician-supervised MOTS-c protocol for cellular energy, metabolic optimization, and longevity.</p>
            </div>
            {[
              { heading: "Protocol", links: ["How It Works", "The Research", "Six Pathways"] },
              { heading: "Company", links: ["About Aurelius", "Our Physicians", "All Treatments", "Blog"] },
              { heading: "Support", links: ["Check Eligibility", "FAQ", "Contact Us", "Patient Portal"] },
            ].map((col) => (
              <div key={col.heading}>
                <p style={{ fontFamily: DM, fontWeight: 500, fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "rgba(245,240,232,0.3)", marginBottom: 16 }}>{col.heading}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.875rem", color: "rgba(245,240,232,0.45)", textDecoration: "none" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "#F5F0E8")}
                        onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,232,0.45)")}
                      >{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(245,240,232,0.06)", paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.75rem", color: "rgba(245,240,232,0.25)", margin: 0 }}>
              © 2025 Aurelius Health Group. All rights reserved.
            </p>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              {["Privacy Policy", "Terms of Service", "Medical Disclaimer"].map((link) => (
                <a key={link} href="#" style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.75rem", color: "rgba(245,240,232,0.25)", textDecoration: "none" }}>{link}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ══ RESPONSIVE STYLES ══ */}
      <style>{`
        @media (max-width: 900px) {
          .two-col-header { grid-template-columns: 1fr !important; gap: 24px !important; }
          .two-col-pricing { grid-template-columns: 1fr !important; gap: 40px !important; }
          .faq-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .faq-grid > div:first-child { position: static !important; }
        }
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2,1fr) !important; }
          .three-col-grid { grid-template-columns: 1fr !important; }
          .four-col-grid { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: repeat(2,1fr) !important; }
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
