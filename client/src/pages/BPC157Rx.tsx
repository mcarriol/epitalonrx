/* BPC-157Rx — Standalone Landing Page
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
  hero:   "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1800&q=80",
  cells:  "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1800&q=80",
  labs:   "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200&q=80",
  energy: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80",
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
    title: "Chronic Joint & Tendon Pain",
    profile: "Active adults 30–65 with persistent joint pain, tendinopathy, or post-surgical recovery who have plateaued with standard physical therapy",
    mechanism: "BPC-157 upregulates growth hormone receptors in tendon fibroblasts and stimulates VEGF-driven angiogenesis, accelerating collagen remodeling and tissue regeneration at the injury site.",
    testimonial: "\"My Achilles tendon was a constant problem for two years. Eight weeks in, I was back to full training.\" — R.M., 44, Phoenix AZ",
  },
  {
    icon: "⊕",
    title: "Gut Dysfunction & GI Inflammation",
    profile: "People with IBS, leaky gut, IBD, or NSAID-induced GI damage whose symptoms persist despite dietary intervention and standard gastroenterology care",
    mechanism: "BPC-157 was isolated from human gastric juice and directly repairs intestinal epithelial tight junctions, suppresses NF-κB-driven mucosal inflammation, and accelerates ulcer healing via nitric oxide pathways.",
    testimonial: "\"After years of GI issues, my gastroenterologist was surprised by how quickly my gut lining normalized.\" — S.K., 38, Chicago IL",
  },
  {
    icon: "◷",
    title: "Slow Recovery & Systemic Inflammation",
    profile: "Athletes and high-performers with poor recovery metrics, elevated hsCRP, or post-injury inflammation that limits training capacity and daily function",
    mechanism: "BPC-157 modulates the NO-cGMP pathway and downregulates pro-inflammatory cytokines (TNF-α, IL-6, IL-1β) while simultaneously promoting tissue repair — resolving inflammation without suppressing healing.",
    testimonial: "\"My recovery between sessions went from 72 hours to 36. My coaches noticed before I did.\" — J.T., 31, Denver CO",
  },
];

/* ── Pathways (Clinical Evidence) ── */
const pathways = [
  {
    n: "01", title: "Tendon & Ligament Regeneration",
    body: "BPC-157 significantly accelerates tendon-to-bone healing by upregulating growth hormone receptors in tenocytes and stimulating fibroblast proliferation. It has demonstrated efficacy in Achilles, rotator cuff, and ACL repair models.",
    cite: "Staresinic M et al. J Orthop Res. 2003;21(6):976–983.",
    tags: ["Tendon healing", "Collagen synthesis", "Fibroblast activity"],
  },
  {
    n: "02", title: "Gastrointestinal Mucosal Repair",
    body: "Derived from human gastric juice, BPC-157 repairs intestinal tight junctions, accelerates ulcer healing, and reverses NSAID- and alcohol-induced GI damage. It modulates the NO-cGMP pathway to restore mucosal integrity.",
    cite: "Sikiric P et al. Gut Liver. 2019;13(2):125–136.",
    tags: ["Leaky gut", "Ulcer healing", "Tight junction repair"],
  },
  {
    n: "03", title: "Angiogenesis & Blood Flow",
    body: "BPC-157 promotes VEGF upregulation and nitric oxide synthesis, driving new blood vessel formation at injury sites. This neovascularization is a primary mechanism behind its accelerated healing in avascular tissues like tendons and cartilage.",
    cite: "Tkalcevic VI et al. Eur J Pharmacol. 2007;570(1–3):212–221.",
    tags: ["VEGF", "Angiogenesis", "Nitric oxide"],
  },
  {
    n: "04", title: "Anti-Inflammatory Signaling",
    body: "BPC-157 downregulates NF-κB-driven inflammatory cytokines (TNF-α, IL-6, IL-1β) without suppressing the healing cascade. Unlike corticosteroids, it resolves inflammation while preserving — and enhancing — tissue regeneration.",
    cite: "Chang CH et al. J Appl Physiol. 2011;110(3):774–780.",
    tags: ["NF-κB inhibition", "Cytokine modulation", "Anti-inflammatory"],
  },
  {
    n: "05", title: "Neuroprotection & CNS Recovery",
    body: "BPC-157 crosses the blood-brain barrier and modulates dopaminergic and serotonergic systems. In preclinical models it has demonstrated recovery from traumatic brain injury, spinal cord damage, and peripheral nerve crush injuries.",
    cite: "Vukojevic J et al. Neural Regen Res. 2022;17(3):482–487.",
    tags: ["Neuroprotection", "Dopamine modulation", "CNS repair"],
  },
  {
    n: "06", title: "Muscle Healing & Performance Recovery",
    body: "BPC-157 accelerates muscle fiber regeneration after crush injury, reduces DOMS markers, and preserves muscle mass during immobilization. It acts synergistically with growth hormone signaling to restore contractile function.",
    cite: "Pevec D et al. Surg Today. 2010;40(7):655–663.",
    tags: ["Muscle repair", "GH receptor upregulation", "Recovery"],
  },
];

/* ── Condition tag cloud ── */
const conditionTags = [
  "Tendinopathy", "Rotator Cuff Injury", "ACL Recovery", "Leaky Gut",
  "IBS / IBD", "NSAID-Induced GI Damage", "Chronic Inflammation", "Post-Surgical Recovery",
  "Muscle Tears", "Cartilage Damage", "Peripheral Neuropathy", "Brain Fog",
  "Poor Athletic Recovery", "Joint Pain", "Ulcerative Colitis",
];

/* ── FAQ ── */
const faqs = [
  {
    q: "What is BPC-157 and where does it come from?",
    a: "BPC-157 (Body Protection Compound 157) is a synthetic pentadecapeptide — a chain of 15 amino acids — derived from a protein found in human gastric juice. It was first isolated and characterized by Croatian researcher Predrag Sikiric and colleagues in the 1990s. Unlike many peptides, BPC-157 is stable in gastric acid, which is why it can be administered both orally and via injection depending on the target tissue.",
  },
  {
    q: "How does BPC-157 compare to corticosteroids or NSAIDs for injury recovery?",
    a: "Corticosteroids and NSAIDs suppress inflammation but also impair tissue healing — a well-documented trade-off. BPC-157 resolves inflammation through NF-κB modulation while simultaneously upregulating growth factors and angiogenesis. The result is faster healing without the catabolic effects on collagen and cartilage seen with repeated steroid injections. It is not a pain medication; it is a healing accelerant.",
  },
  {
    q: "What does the research actually show? Is this proven in humans?",
    a: "Honest answer: the foundational BPC-157 research is primarily from animal models — rats and mice — with extensive preclinical data spanning over 30 years. There are no large-scale published human RCTs as of 2026. However, BPC-157 has been in a Phase II clinical trial for inflammatory bowel disease (PL-10, Pliva), demonstrating human safety. Aurelius protocols are based on the robust preclinical evidence, the known safety profile, and early clinical human use data.",
  },
  {
    q: "How is BPC-157 administered?",
    a: "BPC-157 is most commonly administered as a subcutaneous injection at doses of 200–500 mcg per day, typically once or twice daily. For GI conditions, oral capsule formulations are also used, as BPC-157 is stable in gastric acid. Injection sites are rotated across the abdomen or near the target tissue. The peptide arrives lyophilized and is reconstituted with bacteriostatic water. Reconstituted vials are stored refrigerated and used within 30 days.",
  },
  {
    q: "How long until I see results?",
    a: "For acute injuries, many patients report noticeable improvement within 2–4 weeks. Tendon and ligament injuries typically show measurable functional improvement at 6–12 weeks. GI symptoms — including leaky gut and IBS — often improve within 4–8 weeks of consistent use. Chronic conditions may require 12–16 weeks for full assessment.",
  },
  {
    q: "Is prescribing BPC-157 off-label legal?",
    a: "BPC-157 is not FDA-approved for any indication. It is prescribed as a compounded peptide under the clinical judgment of a licensed physician. Off-label prescribing of compounded peptides is legal in the United States when prescribed by a licensed physician who documents clinical rationale and obtains informed consent. Aurelius physicians follow this protocol for every patient.",
  },
];

/* ── Eligibility Quiz ── */
function EligibilityQuiz() {
  const questions = [
    { q: "Do you have any active malignancy (cancer) currently under treatment?", disqualifier: "YES", note: "Active cancer is a contraindication to BPC-157 protocol due to its pro-angiogenic effects." },
    { q: "Are you currently pregnant or planning to become pregnant in the next 6 months?", disqualifier: "YES", note: "BPC-157 has not been studied in pregnancy." },
    { q: "Do you have a history of vascular tumors or hemangiomas?", disqualifier: "YES", note: "Pro-angiogenic peptides require careful evaluation in patients with vascular lesions." },
    { q: "Are you currently taking immunosuppressive medications (e.g., tacrolimus, cyclosporine, high-dose steroids)?", disqualifier: "YES", note: "Immunosuppressive therapy may interact with BPC-157's healing cascade." },
    { q: "Do you experience any of the following: joint or tendon pain, GI dysfunction, poor recovery, chronic inflammation, or post-surgical healing challenges?", disqualifier: "NO", note: "These are the primary indications for BPC-157 protocol consideration." },
    { q: "Are you willing to complete baseline lab work (including hsCRP, CMP, CBC) before starting the protocol?", disqualifier: "NO", note: "Baseline labs are required for safe protocol initiation and monitoring." },
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
                onClick={() => {
                  const next = [...answers];
                  next[i] = opt;
                  setAnswers(next);
                  setSubmitted(false);
                }}
                style={{
                  fontFamily: DM, fontWeight: 500, fontSize: "0.8125rem", letterSpacing: "0.06em",
                  padding: "10px 28px", borderRadius: 5, cursor: "pointer", transition: "all 0.2s",
                  background: answers[i] === opt ? "#C9A96E" : "transparent",
                  color: answers[i] === opt ? "#0D0D0D" : "rgba(245,240,232,0.5)",
                  border: `1.5px solid ${answers[i] === opt ? "#C9A96E" : "rgba(245,240,232,0.15)"}`,
                }}
              >{opt}</button>
            ))}
          </div>
          {answers[i] === item.disqualifier && (
            <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.8rem", color: "rgba(201,169,110,0.7)", marginTop: 10, lineHeight: 1.5 }}>
              ⚠ {item.note}
            </p>
          )}
        </div>
      ))}

      {allAnswered && !submitted && (
        <div style={{ paddingTop: 24 }}>
          <button
            onClick={() => setSubmitted(true)}
            className="btn-gold"
          >
            View My Results
          </button>
        </div>
      )}

      {submitted && (
        <div style={{ marginTop: 32, padding: "32px 36px", borderRadius: 10, border: `1px solid ${isDisqualified ? "rgba(201,169,110,0.25)" : "rgba(201,169,110,0.35)"}`, background: isDisqualified ? "rgba(201,169,110,0.04)" : "rgba(201,169,110,0.07)" }}>
          {isDisqualified ? (
            <>
              <p style={{ ...s.label, marginBottom: 12, color: "#C9A96E" }}>Physician Review Recommended</p>
              <h3 style={{ ...s.h3dk, marginBottom: 12, fontSize: "1.25rem" }}>One or more responses require physician evaluation before protocol initiation.</h3>
              <p style={{ ...s.bodyLt, marginBottom: 24 }}>One or more of your answers indicates a condition that may require modification of the standard BPC-157 protocol. Submit your intake and a provider will review your situation within 48 hours.</p>
              <a href="mailto:intake@aureliushealthgroup.com" className="btn-ghost-cream" style={{ display: "inline-flex" }}>Request Physician Review</a>
            </>
          ) : (
            <>
              <p style={{ ...s.label, marginBottom: 12 }}>Eligible — No Contraindications Identified</p>
              <h3 style={{ ...s.h3dk, marginBottom: 12, fontSize: "1.25rem" }}>Based on your responses, you appear to be a candidate for the BPC-157Rx protocol.</h3>
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

export default function BPC157Rx() {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  return (
    <div style={{ background: "#0D0D0D", minHeight: "100vh" }}>
      <Navbar productName="BPC-157Rx" />

      {/* ══ HERO ══ */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src={IMGS.hero} alt="BPC-157Rx hero" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,13,13,0.92) 0%, rgba(13,13,13,0.45) 50%, rgba(13,13,13,0.2) 100%)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem) clamp(60px,10vw,100px)", width: "100%" }}>
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
            <a href="https://aureliushealthgroup.com" style={{ ...s.label, color: "rgba(201,169,110,0.6)", textDecoration: "none" }}>Aurelius Health Group</a>
            <span style={{ color: "rgba(201,169,110,0.4)", fontSize: "0.7rem" }}>›</span>
            <span style={{ ...s.label }}>BPC-157<span style={{ color: DARK_ORANGE }}>Rx</span></span>
          </div>
          <h1 style={{ ...s.h1, maxWidth: 700, marginBottom: 24 }}>
            The healing peptide<br />your body already<br />knows how to use.
          </h1>
          <p style={{ ...s.bodyLt, maxWidth: 480, marginBottom: 16, fontSize: "1.0625rem" }}>
            BPC-157 is derived from human gastric juice. It accelerates tendon, muscle, and gut repair by upregulating growth factors, driving angiogenesis, and resolving inflammation — without suppressing the healing cascade.
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
              { val: "1990s", label: "Discovery from gastric juice" },
              { val: "15 AA", label: "Pentadecapeptide structure" },
              { val: "30+ yrs", label: "Preclinical research history" },
              { val: "$249/mo", label: "All-inclusive protocol" },
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
            <h2 style={{ ...s.h2lt }}>Three signs your body's repair system is falling behind</h2>
            <p style={{ ...s.body, paddingTop: 8 }}>
              BPC-157 is the most studied healing peptide in preclinical medicine. Its effects span musculoskeletal repair, gastrointestinal restoration, and systemic inflammation resolution. These three presentations are the most common clinical indications for BPC-157 protocol consideration.
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
                  <p style={{ ...s.label, color: "#8C7B6B", marginBottom: 6 }}>BPC-157 Mechanism</p>
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
              <h2 style={{ ...s.h2dk, marginBottom: 32 }}>A peptide derived from the body's own gastric protection system.</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {[
                  { label: "Origin", text: "BPC-157 is a synthetic analogue of a 15-amino-acid sequence isolated from human gastric juice by Predrag Sikiric and colleagues at the University of Zagreb in the 1990s. It was identified as the active component of a naturally occurring gastric cytoprotective protein." },
                  { label: "Classification", text: "BPC-157 is a pentadecapeptide — a stable, orally active peptide that resists degradation in gastric acid. It belongs to a class of cytoprotective peptides with pleiotropic healing effects across multiple tissue types." },
                  { label: "Physiologic Role", text: "BPC-157 modulates the nitric oxide system, upregulates growth hormone receptors, promotes VEGF-driven angiogenesis, and suppresses NF-κB-mediated inflammation — making it uniquely effective across musculoskeletal, GI, and neurological repair." },
                ].map((item) => (
                  <div key={item.label} style={{ borderLeft: "2px solid rgba(201,169,110,0.3)", paddingLeft: 20 }}>
                    <p style={{ ...s.label, marginBottom: 6 }}>{item.label}</p>
                    <p style={{ ...s.bodyLt, margin: 0, fontSize: "0.9rem" }}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Healing Cascade Flow Diagram */}
            <div>
              <p style={{ ...s.label, marginBottom: 20 }}>BPC-157 Healing Cascade</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {[
                  { node: "BPC-157", sub: "Pentadecapeptide from human gastric juice (15 amino acids)", color: "#C9A96E" },
                  { node: "NO-cGMP Pathway Activation", sub: "Nitric oxide upregulation → vasodilation and tissue perfusion", color: "#B8956A" },
                  { node: "Growth Factor Upregulation", sub: "VEGF ↑, EGF ↑, GH receptor sensitization → angiogenesis + repair", color: "#A07A55" },
                  { node: "NF-κB Suppression", sub: "TNF-α ↓, IL-6 ↓, IL-1β ↓ → inflammation resolved without healing impairment", color: "#8C6845" },
                  { node: "Tissue Regeneration", sub: "Collagen remodeling, epithelial repair, muscle fiber restoration, neuroprotection", color: "#785535" },
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
          <div className="comparison-table-wrap" style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: DM, minWidth: 600 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(201,169,110,0.2)" }}>
                  {["", "BPC-157", "Corticosteroids", "NSAIDs", "PRP", "Surgery"].map((h, i) => (
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
                  ["Primary action", "Tissue regeneration", "Inflammation suppression", "COX inhibition", "Growth factor delivery", "Mechanical repair"],
                  ["Promotes healing", "✓ Yes", "✗ Impairs collagen", "✗ Impairs healing", "Partial", "✓ Structural only"],
                  ["Angiogenesis", "✓ VEGF upregulation", "✗ Suppresses", "✗ Suppresses", "Partial", "✗ No"],
                  ["GI protection", "✓ Mucosal repair", "✗ GI damage risk", "✗ GI damage risk", "✗ No", "✗ No"],
                  ["Neuroprotection", "✓ CNS & PNS", "✗ No", "✗ No", "✗ No", "✗ No"],
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

          {/* ── Mobile card layout (hidden on desktop via CSS) ── */}
          <div className="comparison-table-cards">
            {([
              ["Primary action",          "Tissue regeneration",  "Inflammation suppression", "COX inhibition",     "Growth factor delivery", "Mechanical repair"],
              ["Promotes healing",         "✓ Yes",               "✗ Impairs collagen",       "✗ Impairs healing",  "Partial",                "✓ Structural only"],
              ["Angiogenesis",             "✓ VEGF upregulation", "✗ Suppresses",             "✗ Suppresses",       "Partial",                "✗ No"],
              ["GI protection",            "✓ Mucosal repair",    "✗ GI damage risk",         "✗ GI damage risk",   "✗ No",                   "✗ No"],
              ["Neuroprotection",          "✓ CNS & PNS",         "✗ No",                     "✗ No",               "✗ No",                   "✗ No"],
            ] as string[][]).map((row, ri) => {
              const cols = ["BPC-157", "Corticosteroids", "NSAIDs", "PRP", "Surgery"];
              return (
                <div key={ri} className="ctc-row">
                  <div className="ctc-row-label">{row[0]}</div>
                  <div className="ctc-cells">
                    {cols.map((col, ci) => {
                      const val = row[ci + 1];
                      const cls = ci === 0 ? "gold" : val.startsWith("✓") ? "yes" : val.startsWith("✗") ? "no" : "";
                      return (
                        <div key={ci} className="ctc-cell">
                          <div className="ctc-cell-name">{col}</div>
                          <div className={`ctc-cell-val ${cls}`}>{val}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ DISCOVER PEPTIDES ══ */}
      <section id="discover-peptides" style={{ background: "#F5F0E8", padding: "clamp(60px,8vw,100px) 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem)" }}>
          <p style={{ ...s.label, marginBottom: 16 }}>Aurelius Health Group</p>
          <div className="two-col-header" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 60, alignItems: "start", marginBottom: 56 }}>
            <h2 style={{ ...s.h2lt }}>Discover Peptides</h2>
            <p style={{ ...s.body, paddingTop: 8 }}>Explore the full range of physician-supervised peptide protocols available through Aurelius Health Group — each designed around peer-reviewed evidence, pharma-grade compounds, and measurable outcomes.</p>
          </div>

          {/* 4-card grid */}
          <div className="four-col-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24, marginBottom: 48 }}>
            {[
              {
                name: "MOTS-c",
                tag: "Mitochondrial Health",
                desc: "The first peptide encoded in mitochondrial DNA. Activates AMPK — the master metabolic switch — restoring cellular energy, insulin sensitivity, and longevity signaling from the source.",
                href: "https://aureliushealthgroup.com/mitochondrial",
              },
              {
                name: "Ipamorelin",
                tag: "GH Secretion",
                desc: "A selective growth hormone secretagogue that stimulates your pituitary's own GH pulse — without cortisol or ACTH elevation. Supports body composition, recovery, and sleep quality.",
                href: "https://aureliushealthgroup.com/ipamorelin",
              },
              {
                name: "Tesamorelin",
                tag: "Visceral Fat",
                desc: "An FDA-studied GHRH analogue that reduces visceral adipose tissue and improves metabolic markers. The only peptide with Phase 3 RCT data for abdominal fat reduction.",
                href: "https://aureliushealthgroup.com/tesamorelin",
              },
              {
                name: "Cerebrolysin",
                tag: "Neuroprotection",
                desc: "A porcine brain-derived peptide preparation that mimics endogenous neurotrophic factors — BDNF and NGF — to support neuron survival, neuroplasticity, and cognitive performance.",
                href: "https://aureliushealthgroup.com/cerebrolysin",
              },
            ].map((peptide) => (
              <div key={peptide.name} className="peptide-card" style={{
                background: "#0D0D0D",
                borderRadius: 12,
                padding: "32px 28px",
                display: "flex",
                flexDirection: "column",
                gap: 16,
                border: "1px solid rgba(201,169,110,0.12)",
                transition: "border-color 0.25s, transform 0.25s",
              }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(201,169,110,0.4)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(201,169,110,0.12)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
                  <h3 style={{ ...s.h3dk, fontSize: "1.0625rem", margin: 0 }}>{peptide.name}</h3>
                  <span style={{
                    fontFamily: DM, fontWeight: 500, fontSize: "0.65rem",
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    color: "#C9A96E", background: "rgba(201,169,110,0.1)",
                    border: "1px solid rgba(201,169,110,0.25)",
                    borderRadius: 4, padding: "4px 8px", whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}>{peptide.tag}</span>
                </div>
                <p style={{ ...s.bodyLt, fontSize: "0.875rem", margin: 0, flex: 1 }}>{peptide.desc}</p>
                <a
                  href={peptide.href}
                  style={{
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    fontFamily: DM, fontWeight: 500, fontSize: "0.875rem",
                    letterSpacing: "0.04em", textDecoration: "none",
                    padding: "12px 20px", borderRadius: 6,
                    background: "#C9A96E", color: "#0D0D0D",
                    transition: "background 0.2s",
                    marginTop: "auto",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#B8956A")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#C9A96E")}
                >
                  Get Started
                </a>
              </div>
            ))}
          </div>

          {/* Discover More button */}
          <div style={{ textAlign: "center" }}>
            <a
              href="/peptides"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                fontFamily: DM, fontWeight: 500, fontSize: "0.9375rem",
                letterSpacing: "0.04em", textDecoration: "none",
                padding: "14px 36px", borderRadius: 6,
                border: "1.5px solid rgba(13,13,13,0.25)",
                color: "#1A1A1A", background: "transparent",
                transition: "border-color 0.2s, background 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "#1A1A1A";
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(13,13,13,0.05)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(13,13,13,0.25)";
                (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
              }}
            >
              Discover More Peptides
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ══ CLINICAL EVIDENCE (pathways) ══ */}
      <section id="research" style={{ background: "#F5F0E8", padding: "clamp(60px,8vw,100px) 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem)" }}>
          <p style={{ ...s.label, marginBottom: 16 }}>Clinical Evidence</p>
          <div className="two-col-header" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 60, alignItems: "start", marginBottom: 64 }}>
            <h2 style={{ ...s.h2lt }}>Six evidence-backed healing pathways</h2>
            <p style={{ ...s.body, paddingTop: 8 }}>Each pathway is supported by peer-reviewed preclinical research spanning over three decades. We include honest framing on human vs. animal data — because you deserve to know exactly what the evidence shows.</p>
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
                  <strong style={{ color: "#1A1A1A" }}>{activeTag}</strong> — BPC-157 addresses this condition through its multi-pathway healing cascade: NO-cGMP activation, growth factor upregulation, angiogenesis, and NF-κB suppression. Speak with a physician to understand how this applies to your specific case.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ══ CELLS IMAGE BREAK ══ */}
      <section style={{ background: "#0D0D0D", padding: 0 }}>
        <div style={{ position: "relative", maxHeight: 500, overflow: "hidden" }}>
          <img src={IMGS.cells} alt="Tissue healing" style={{ width: "100%", objectFit: "cover", objectPosition: "center", display: "block" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(13,13,13,0.85) 0%, transparent 40%, transparent 60%, rgba(13,13,13,0.85) 100%)" }} />
          <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", textAlign: "center", width: "100%", padding: "0 1.25rem" }}>
            <p style={{ ...s.label, marginBottom: 8 }}>Gastric Origin</p>
            <p style={{ fontFamily: DM, fontWeight: 300, fontSize: "clamp(1.1rem, 2.5vw, 2rem)", color: "#F5F0E8", letterSpacing: "-0.02em" }}>The only healing peptide derived from the body's own gastric protection system</p>
          </div>
        </div>
      </section>

      {/* ══ PROTOCOL STEPS — DARK THEME ══ */}
      <section style={{ background: "#0D0D0D", padding: "clamp(60px,8vw,100px) 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem)" }}>
          <p style={{ ...s.label, marginBottom: 16 }}>The Protocol</p>
          <div className="two-col-header" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, alignItems: "start", marginBottom: 64 }}>
            <h2 style={{ ...s.h2dk }}>Four steps from intake to results</h2>
            <p style={{ ...s.bodyLt, paddingTop: 8 }}>Designed to mirror the infrastructure of the published research — physician oversight, comprehensive baseline labs, pharma-grade compound, and quantified outcomes at 8–12 weeks.</p>
          </div>
          <div className="four-col-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
            {[
              {
                n: "1", title: "Assessment & Intake", tag: "Required",
                items: ["Comprehensive health questionnaire", "Injury and symptom mapping", "Medication and supplement review", "Physician review within 48 hours", "Contraindication screening"],
              },
              {
                n: "2", title: "Baseline Labs", tag: "Required",
                items: ["CBC with differential", "Comprehensive metabolic panel (CMP)", "hsCRP (systemic inflammation)", "Liver function panel", "Imaging review (MRI/X-ray if applicable)", "GI symptom scoring (if GI indication)"],
              },
              {
                n: "3", title: "Protocol Initiation", tag: "Week 1",
                items: ["BPC-157 200–500 mcg compounded, lyophilized", "Bacteriostatic water + sterile supplies shipped", "Cold-packed, overnight delivery", "Nurse onboarding session (video)", "Injection technique certification"],
              },
              {
                n: "4", title: "Monitoring & Optimization", tag: "Ongoing",
                items: ["Monthly provider check-ins", "Labs repeated at 8–12 weeks", "Functional outcome assessment", "Protocol adjustment based on response", "Ongoing direct messaging support"],
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
              <h2 style={{ ...s.h2lt, marginBottom: 20 }}>Regenerative medicine pricing. Without the clinic markup.</h2>
              <p style={{ ...s.body, marginBottom: 24 }}>
                Regenerative medicine clinics typically charge $500–$1,500 for PRP injections, $200–$400 per follow-up, and $400–$800/month for compounded peptides — billed separately. Aurelius bundles physician oversight, labs, compound, and monitoring into one monthly plan.
              </p>
              <div style={{ background: "rgba(201,169,110,0.06)", border: "1px solid rgba(201,169,110,0.15)", borderRadius: 8, padding: "20px 24px", marginBottom: 28 }}>
                <p style={{ fontFamily: DM, fontWeight: 500, fontSize: "0.875rem", color: "#1A1A1A", marginBottom: 8 }}>Typical regenerative medicine cost breakdown:</p>
                {[
                  ["Initial consult", "$300–$500"],
                  ["Comprehensive lab panel", "$400–$800"],
                  ["Monthly compound cost", "$400–$800"],
                  ["Monthly follow-up visits", "$200–$400"],
                  ["Total first month", "$1,300–$2,500"],
                ].map(([item, cost]) => (
                  <div key={item} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid rgba(13,13,13,0.06)" }}>
                    <span style={{ ...s.bodySm }}>{item}</span>
                    <span style={{ fontFamily: DM, fontWeight: 500, fontSize: "0.875rem", color: "#8C6845" }}>{cost}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {["Physician consultation included", "Full lab panel included", "Pharma-grade BPC-157 included", "Nurse onboarding included", "Monthly check-ins included", "No hidden fees"].map((item) => (
                  <div key={item} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#C9A96E" strokeWidth="1.2"/><path d="M5 8l2 2 4-4" stroke="#C9A96E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span style={{ ...s.bodySm }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ background: "#0D0D0D", borderRadius: 12, padding: "clamp(32px,5vw,48px) clamp(24px,4vw,40px)", textAlign: "center", border: "1px solid rgba(201,169,110,0.15)" }}>
                <p style={{ ...s.label, marginBottom: 12 }}>BPC-157Rx Plan</p>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: 4, marginBottom: 8 }}>
                  <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "1.25rem", color: "#C9A96E", marginTop: 10 }}>$</span>
                  <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "clamp(3.5rem,8vw,5rem)", lineHeight: 1, letterSpacing: "-0.04em", color: "#F5F0E8" }}>249</span>
                  <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "1rem", color: "rgba(245,240,232,0.4)", marginTop: 16 }}>/mo</span>
                </div>
                <p style={{ ...s.bodyLt, fontSize: "0.8rem", marginBottom: 32 }}>vs. $1,300–$2,500/mo at a regenerative medicine clinic</p>
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
          <h2 style={{ ...s.h2dk, textAlign: "center", marginBottom: 16 }}>Are you a candidate for BPC-157Rx?</h2>
          <p style={{ ...s.bodyLt, textAlign: "center", maxWidth: 520, margin: "0 auto 56px" }}>
            This 6-question screen checks for BPC-157 protocol contraindications. It takes under 60 seconds and does not constitute a medical evaluation.
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
              <p style={{ ...s.bodyLt }}>Including BPC-157 vs. corticosteroids, honest research framing, administration, timeline, and off-label prescribing legality.</p>
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
            Your body already knows<br />how to heal. It just needs<br />the right signal.
          </h2>
          <p style={{ ...s.bodyLt, marginBottom: 48, fontSize: "1.0625rem" }}>
            BPC-157 is the peptide your body produces naturally to protect and repair — now available as a physician-supervised protocol designed for the injuries and conditions that haven't responded to anything else.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 20 }}>
            <a href="#quiz" className="btn-gold" style={{ padding: "16px 36px", fontSize: "1rem" }}>Check My Eligibility</a>
            <a href="#research" className="btn-ghost-cream" style={{ padding: "16px 36px", fontSize: "1rem" }}>Review the Research</a>
          </div>
          <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.75rem", color: "rgba(245,240,232,0.25)", lineHeight: 1.6, maxWidth: 560, margin: "0 auto" }}>
            † This page describes off-label use of BPC-157, a compounded peptide not approved by the FDA for any indication. Off-label prescribing of compounded peptides is legal and at the clinical discretion of a licensed physician. This content is for informational purposes only and does not constitute medical advice. Individual results vary. All protocols require physician evaluation and are subject to contraindication screening.
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
                  <span style={{ fontFamily: DM, fontWeight: 500, fontSize: "0.875rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#F5F0E8", display: "block" }}>BPC-157<span style={{ color: DARK_ORANGE }}>Rx</span></span>
                  <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#8C7B6B" }}>Aurelius Health Group</span>
                </div>
              </div>
              <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.875rem", color: "rgba(245,240,232,0.35)", maxWidth: 220, marginTop: 12, lineHeight: 1.6 }}>Physician-supervised BPC-157 protocol for tissue repair, gut healing, and systemic recovery.</p>
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
          <div style={{ borderTop: "1px solid rgba(245,240,232,0.06)", paddingTop: 32, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.75rem", color: "rgba(245,240,232,0.2)" }}>© 2026 Aurelius Health Group. All rights reserved.</p>
            <div style={{ display: "flex", gap: 24 }}>
              {["Privacy Policy", "Terms of Service", "Medical Disclaimer"].map((link) => (
                <a key={link} href="#" style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.75rem", color: "rgba(245,240,232,0.2)", textDecoration: "none" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "rgba(245,240,232,0.5)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,232,0.2)")}
                >{link}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ══ RESPONSIVE STYLES ══ */}
      <style>{`
        /* Tablet */
        @media (max-width: 1024px) {
          .four-col-grid { grid-template-columns: repeat(2,1fr) !important; }
          .three-col-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 900px) {
          .two-col-header { grid-template-columns: 1fr !important; gap: 24px !important; }
          .two-col-pricing { grid-template-columns: 1fr !important; gap: 48px !important; }
          .faq-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
          .stats-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        /* Mobile */
        @media (max-width: 640px) {
          .three-col-grid { grid-template-columns: 1fr !important; }
          .four-col-grid { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        /* Touch targets */
        @media (max-width: 768px) {
          .btn-gold, .btn-ghost-cream { min-height: 48px; }
        }

        /* ── Comparison table: card layout on mobile ── */
        @media (max-width: 700px) {
          /* Hide the normal table */
          .comparison-table-wrap table { display: none !important; }

          /* Show card stack instead */
          .comparison-table-cards { display: flex !important; }
        }
        @media (min-width: 701px) {
          .comparison-table-cards { display: none !important; }
        }

        /* Card styles (always defined, visibility toggled above) */
        .comparison-table-cards {
          flex-direction: column;
          gap: 12px;
          margin-top: 0;
        }
        .ctc-row {
          border: 1px solid rgba(201,169,110,0.15);
          border-radius: 8px;
          overflow: hidden;
        }
        .ctc-row-label {
          background: rgba(201,169,110,0.06);
          padding: 10px 14px;
          font-size: 0.7rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.45);
          font-weight: 500;
          border-bottom: 1px solid rgba(201,169,110,0.12);
        }
        .ctc-cells {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
        }
        .ctc-cell {
          padding: 10px 14px;
          border-right: 1px solid rgba(245,240,232,0.05);
          border-bottom: 1px solid rgba(245,240,232,0.05);
        }
        .ctc-cell:nth-child(even) { border-right: none; }
        .ctc-cell-name {
          font-size: 0.65rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.35);
          margin-bottom: 4px;
        }
        .ctc-cell-val {
          font-size: 0.8rem;
          font-weight: 400;
          color: rgba(245,240,232,0.65);
        }
        .ctc-cell-val.gold { color: #C9A96E; font-weight: 500; }
        .ctc-cell-val.yes  { color: rgba(245,240,232,0.8); }
        .ctc-cell-val.no   { color: rgba(245,240,232,0.3); }
      `}</style>
    </div>
  );
}
