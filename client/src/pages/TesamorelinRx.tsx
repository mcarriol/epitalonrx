/* TesamorelinRx — Standalone Landing Page
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

const DM = "'DM Sans', system-ui, sans-serif";

const IMGS = {
  hero:  "https://d2xsxph8kpxj0f.cloudfront.net/310519663301596594/CqJiJUXAtrZsnakBeSxRGN/tesam_hero-HBiuXsB2fmgV6PeJWmbhjx.webp",
  vial:  "https://d2xsxph8kpxj0f.cloudfront.net/310519663301596594/CqJiJUXAtrZsnakBeSxRGN/tesam_vial-2CLiTHrmT2UofituE6PWbz.webp",
  labs:  "https://d2xsxph8kpxj0f.cloudfront.net/310519663301596594/CqJiJUXAtrZsnakBeSxRGN/tesam_labs-HCAwuTKzvpwMKzhARrKfRq.webp",
  body:  "https://d2xsxph8kpxj0f.cloudfront.net/310519663301596594/CqJiJUXAtrZsnakBeSxRGN/tesam_body-KeQaPwaePYyqXnr3nXPjjo.png",
};

/* ── shared style tokens ── */
const s = {
  label: { fontFamily: DM, fontWeight: 500, fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#C9A96E" },
  h1:    { fontFamily: DM, fontWeight: 300, fontSize: "clamp(2.75rem,6vw,5rem)", lineHeight: 1.08, letterSpacing: "-0.03em", color: "#F5F0E8" },
  h2dk:  { fontFamily: DM, fontWeight: 300, fontSize: "clamp(1.75rem,3.5vw,2.75rem)", lineHeight: 1.15, letterSpacing: "-0.02em", color: "#F5F0E8" },
  h2lt:  { fontFamily: DM, fontWeight: 300, fontSize: "clamp(1.75rem,3.5vw,2.75rem)", lineHeight: 1.15, letterSpacing: "-0.02em", color: "#1A1A1A" },
  h3dk:  { fontFamily: DM, fontWeight: 600, fontSize: "1.125rem", lineHeight: 1.3, letterSpacing: "-0.01em", color: "#F5F0E8" },
  h3lt:  { fontFamily: DM, fontWeight: 600, fontSize: "1.125rem", lineHeight: 1.3, letterSpacing: "-0.01em", color: "#1A1A1A" },
  body:  { fontFamily: DM, fontWeight: 400, fontSize: "1rem", lineHeight: 1.65, color: "#3D3D3D" },
  bodySm:{ fontFamily: DM, fontWeight: 400, fontSize: "0.875rem", lineHeight: 1.6, color: "#5A5A5A" },
  bodyLt:{ fontFamily: DM, fontWeight: 300, fontSize: "0.9375rem", lineHeight: 1.65, color: "rgba(245,240,232,0.62)" },
  cite:  { fontFamily: DM, fontWeight: 400, fontSize: "0.72rem", lineHeight: 1.5, color: "#8C7B6B", fontStyle: "italic" },
};

/* ── Problem cards ── */
const problems = [
  { icon: "⊕", title: "Belly fat that won't move", desc: "You've cleaned up your diet and train consistently. The visceral fat around your midsection ignores all of it. That's not a willpower problem — it's a GH-axis problem." },
  { icon: "◎", title: "Worsening cardiometabolic labs", desc: "Triglycerides creeping up. HDL drifting down. Fasting glucose trending toward pre-diabetic territory. Your labs are telling a story your doctor hasn't fully explained." },
  { icon: "↓", title: "Low IGF-1 with no plan", desc: "Your IGF-1 came back below range. Your physician noted it, maybe suggested a retest, and moved on. There's a protocol specifically designed for this. You haven't been offered it." },
  { icon: "⚡", title: "Energy and recovery decline", desc: "Recovery takes longer. Training feels harder at the same intensity. Sleep doesn't restore you the way it used to. These are downstream consequences of blunted GH pulsatility." },
  { icon: "◷", title: "Cognitive sharpening plateau", desc: "Mental clarity, working memory, and verbal fluency are measurable. They also decline with age-related GH deficiency — and respond to targeted intervention." },
  { icon: "◑", title: "Sleep architecture collapse", desc: "Slow-wave sleep — the stage where GH is primarily secreted — degrades with age. Less deep sleep means less GH. Less GH means less deep sleep. Tesamorelin interrupts this cycle." },
];

/* ── Five pathways ── */
const pathways = [
  {
    n: "01", title: "Visceral Fat Reduction",
    body: "In Phase 3 trials, Tesamorelin reduced visceral adipose tissue (VAT) by a mean of 15–18% at 26 weeks vs. placebo. Subcutaneous fat was preserved, distinguishing it from caloric restriction.",
    cite: "Falutz J et al. N Engl J Med. 2010;363(26):2543–2553.",
  },
  {
    n: "02", title: "Lean Mass Preservation",
    body: "Unlike GH secretagogues that nonselectively raise IGF-1, Tesamorelin's pulsatile mechanism preserves lean tissue while selectively mobilizing visceral lipid stores.",
    cite: "Falutz J et al. J Clin Endocrinol Metab. 2008;93(11):4265–4272.",
  },
  {
    n: "03", title: "Cardiometabolic Health",
    body: "Triglyceride reductions of 50–80 mg/dL were observed in treated subjects. HDL-C improved. Waist circumference decreased significantly, reducing a primary cardiovascular risk marker.",
    cite: "Grinspoon SK et al. J Clin Endocrinol Metab. 2010;95(9):4291–4301.",
  },
  {
    n: "04", title: "Cognitive Function",
    body: "In a landmark 20-week RCT, Tesamorelin improved verbal memory and executive function in older adults with mild cognitive impairment. IGF-1 elevation correlated with cognitive improvement.",
    cite: "Baker LD et al. JAMA Neurology. 2012;69(11):1420–1429.",
  },
  {
    n: "05", title: "Sleep Architecture",
    body: "GH is secreted predominantly during slow-wave sleep. Restoring pulsatile GH release via GHRH analog administration has been shown to increase slow-wave sleep duration and depth.",
    cite: "FDA Egrifta (tesamorelin) Prescribing Information. Theratechnologies Inc.",
  },
];

/* ── Research studies ── */
const studies = [
  {
    authors: "Falutz J et al.",
    journal: "N Engl J Med.",
    year: "2010",
    title: "Effects of Tesamorelin on Visceral Adiposity and Metabolic Abnormalities",
    finding: "26-week Phase 3 RCT. Tesamorelin reduced VAT by 15.2% vs. −0.4% placebo (p<0.001). Triglycerides fell 50 mg/dL. No significant lean mass loss.",
    tag: "Phase 3 RCT",
  },
  {
    authors: "Falutz J et al.",
    journal: "J Clin Endocrinol Metab.",
    year: "2008",
    title: "Metabolic Effects of a Growth Hormone-Releasing Factor in Patients with HIV",
    finding: "52-week extension trial. Sustained VAT reduction maintained at 1 year. Lean mass stable. IGF-1 normalized in 68% of subjects.",
    tag: "52-Week Extension",
  },
  {
    authors: "Baker LD et al.",
    journal: "JAMA Neurology.",
    year: "2012",
    title: "Effects of Growth Hormone–Releasing Hormone on Cognitive Function in Adults",
    finding: "20-week RCT in adults 55–87. Tesamorelin improved executive function and verbal memory. IGF-1 increase correlated with cognitive improvement (r=0.42, p=0.02).",
    tag: "Cognitive RCT",
  },
  {
    authors: "Falutz J et al.",
    journal: "Clin Infect Dis.",
    year: "2010",
    title: "Long-term Safety and Effects of Tesamorelin",
    finding: "Safety profile over 52 weeks. No increase in malignancy. Glucose elevations modest and reversible on discontinuation. Injection site reactions in 4.7%.",
    tag: "Long-Term Safety",
  },
  {
    authors: "Grinspoon SK et al.",
    journal: "J Clin Endocrinol Metab.",
    year: "2010",
    title: "Tesamorelin Reduces Carotid Intima-Media Thickness",
    finding: "Tesamorelin-treated subjects showed significant reduction in carotid IMT — a surrogate marker for atherosclerosis — vs. placebo at 26 weeks.",
    tag: "Cardiovascular",
  },
  {
    authors: "FDA Egrifta Prescribing Information",
    journal: "Theratechnologies Inc.",
    year: "2010",
    title: "Egrifta (Tesamorelin for Injection) — Full Prescribing Information",
    finding: "FDA-approved at 2mg/day subcutaneous injection. Contraindications: active malignancy, pituitary disorders, pregnancy. Monitor fasting glucose and IGF-1 at baseline and 3 months.",
    tag: "FDA Label",
  },
];

/* ── What's included ── */
const included = [
  { icon: "◎", title: "Board-Certified Physician", desc: "A licensed provider reviews your intake, labs, and history before prescribing. Every protocol is individualized." },
  { icon: "⊕", title: "Cardiometabolic Panel", desc: "Baseline labs including IGF-1, fasting glucose, HbA1c, lipid panel, and CMP — coordinated through our lab network." },
  { icon: "◈", title: "Pharma-Grade Compound", desc: "Tesamorelin 2mg compounded by a licensed 503B outsourcing facility. Cold-packed and shipped with sterile supplies." },
  { icon: "◷", title: "Telehealth Consultations", desc: "Asynchronous and synchronous visits with your provider. No waiting rooms, no commute." },
  { icon: "↗", title: "Body Composition Tracking", desc: "DEXA coordination at baseline, 12 weeks, and 26 weeks. Quantified visceral fat, lean mass, and bone density." },
  { icon: "✉", title: "Direct Messaging", desc: "Unlimited direct messaging with your care team. Questions answered within one business day." },
];

/* ── FAQ ── */
const faqs = [
  {
    q: "What is Tesamorelin and how is it different from HGH?",
    a: "Tesamorelin is a synthetic analog of Growth Hormone-Releasing Hormone (GHRH) — the upstream signal that instructs the pituitary to produce GH in natural pulses. Exogenous HGH bypasses this entirely, suppressing your pituitary's own production and delivering a non-physiologic flat-line GH level. Tesamorelin preserves pulsatility, which is how GH is meant to work. This distinction matters for both efficacy and long-term safety.",
  },
  {
    q: "How does Tesamorelin compare to MK-677?",
    a: "MK-677 (Ibutamoren) is a ghrelin mimetic — it stimulates GH release through a different receptor pathway (GHSR-1a) and tends to produce sustained, non-pulsatile GH elevation. It also significantly increases appetite and can worsen insulin sensitivity. Tesamorelin works at the GHRHR receptor, produces physiologic GH pulses, has a well-characterized Phase 3 safety profile, and is FDA-approved. MK-677 is not FDA-approved and lacks equivalent human trial data.",
  },
  {
    q: "Will Tesamorelin affect my blood sugar?",
    a: "GH is inherently insulin-antagonistic, so modest fasting glucose elevations are possible — particularly in individuals with pre-existing insulin resistance. In Phase 3 trials, HbA1c increases were small and reversible on discontinuation. We monitor fasting glucose and HbA1c at baseline, 3 months, and 6 months. Individuals with uncontrolled diabetes (HbA1c >8.0%) are not candidates for this protocol.",
  },
  {
    q: "Is prescribing Tesamorelin off-label legal?",
    a: "Tesamorelin (Egrifta) is FDA-approved for HIV-associated lipodystrophy. Prescribing it for age-related visceral adiposity, GH decline, or cognitive optimization is off-label. Off-label prescribing is legal, common, and well-established in U.S. medical practice — physicians exercise clinical judgment to prescribe approved drugs for non-approved indications when evidence supports it. All Aurelius protocols are prescribed by licensed physicians who document clinical rationale.",
  },
  {
    q: "How do I inject Tesamorelin?",
    a: "Tesamorelin is administered as a once-daily subcutaneous injection, typically into the abdomen, rotating sites. The needle is 28–31 gauge, 5/16 inch — comparable to an insulin pen. Your nurse onboarding session covers reconstitution, injection technique, site rotation, and sharps disposal. Most patients report the injection is nearly painless within the first week.",
  },
  {
    q: "How long until I see results?",
    a: "IGF-1 levels typically normalize within 4–6 weeks. Measurable visceral fat reduction on imaging is generally observed at 12 weeks, with the most significant changes at 26 weeks per Phase 3 trial data. Energy and sleep improvements are often reported within the first 4–8 weeks. Body composition retesting is scheduled at 12 and 26 weeks.",
  },
  {
    q: "What are the contraindications?",
    a: "Absolute contraindications include: active or suspected malignancy, pituitary tumor or structural pituitary disorder, active proliferative or severe non-proliferative diabetic retinopathy, pregnancy, and known hypersensitivity to Tesamorelin or mannitol. Relative contraindications include uncontrolled HbA1c >8.0% and recent major surgery. Your physician reviews all contraindications during the intake process.",
  },
  {
    q: "What happens if I stop the protocol?",
    a: "Visceral fat reduction is not permanent — studies show VAT returns toward baseline within 12 weeks of discontinuation. This is consistent with Tesamorelin's mechanism: it restores a signal, not a structure. Many patients cycle on for 26 weeks, take a break, and resume. Your physician will discuss maintenance strategies based on your 26-week body composition retest.",
  },
];

/* ── Eligibility quiz ── */
const quizQuestions = [
  { q: "Do you have a known pituitary tumor or structural pituitary disorder?", disqualify: "yes" },
  { q: "Have you been diagnosed with or treated for cancer in the past 5 years?", disqualify: "yes" },
  { q: "Is your most recent HbA1c above 8.0%?", disqualify: "yes" },
  { q: "Are you currently pregnant or planning to become pregnant?", disqualify: "yes" },
  { q: "Do you have active proliferative diabetic retinopathy?", disqualify: "yes" },
  { q: "Are you primarily concerned with visceral fat, low IGF-1, energy decline, or cardiometabolic health?", disqualify: "no" },
];

function EligibilityQuiz() {
  const [answers, setAnswers] = useState<(string | null)[]>(Array(quizQuestions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const allAnswered = answers.every((a) => a !== null);
  const disqualified = answers.some((a, i) => a === quizQuestions[i].disqualify);

  return (
    <div style={{ maxWidth: 680, margin: "0 auto" }}>
      {!submitted ? (
        <>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {quizQuestions.map((item, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(245,240,232,0.1)", borderRadius: 8, padding: "20px 24px" }}>
                <p style={{ ...s.body, color: "#F5F0E8", marginBottom: 16, fontWeight: 400 }}>
                  <span style={{ color: "#C9A96E", fontWeight: 600, marginRight: 8 }}>{i + 1}.</span>
                  {item.q}
                </p>
                <div style={{ display: "flex", gap: 12 }}>
                  {["yes", "no"].map((val) => (
                    <button
                      key={val}
                      onClick={() => {
                        const next = [...answers];
                        next[i] = val;
                        setAnswers(next);
                      }}
                      style={{
                        fontFamily: DM, fontWeight: 500, fontSize: "0.875rem",
                        letterSpacing: "0.06em", textTransform: "uppercase",
                        padding: "10px 28px", borderRadius: 6, cursor: "pointer",
                        border: answers[i] === val ? "1.5px solid #C9A96E" : "1.5px solid rgba(245,240,232,0.2)",
                        background: answers[i] === val ? "rgba(201,169,110,0.15)" : "transparent",
                        color: answers[i] === val ? "#C9A96E" : "rgba(245,240,232,0.5)",
                        transition: "all 0.2s",
                      }}
                    >
                      {val.charAt(0).toUpperCase() + val.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => setSubmitted(true)}
            disabled={!allAnswered}
            style={{
              marginTop: 32, width: "100%", padding: "16px", borderRadius: 6,
              fontFamily: DM, fontWeight: 500, fontSize: "1rem", cursor: allAnswered ? "pointer" : "not-allowed",
              background: allAnswered ? "#C9A96E" : "rgba(201,169,110,0.25)",
              color: allAnswered ? "#0D0D0D" : "rgba(245,240,232,0.3)",
              border: "none", transition: "all 0.2s",
            }}
          >
            Check My Eligibility
          </button>
        </>
      ) : disqualified ? (
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(245,240,232,0.12)", borderRadius: 10, padding: "40px 32px", textAlign: "center" }}>
          <div style={{ fontSize: "2rem", marginBottom: 16 }}>◎</div>
          <h3 style={{ ...s.h3dk, marginBottom: 12 }}>You may not be a candidate at this time</h3>
          <p style={{ ...s.bodyLt, marginBottom: 24 }}>
            Based on your responses, one or more Tesamorelin contraindications may apply. We recommend speaking with your primary care physician before proceeding. Our team is available to answer questions.
          </p>
          <a href="mailto:care@aureliushealthgroup.com" className="btn-ghost-cream" style={{ display: "inline-flex" }}>Contact Our Care Team</a>
        </div>
      ) : (
        <div style={{ background: "rgba(201,169,110,0.08)", border: "1px solid rgba(201,169,110,0.3)", borderRadius: 10, padding: "40px 32px", textAlign: "center" }}>
          <div style={{ fontSize: "2rem", marginBottom: 16, color: "#C9A96E" }}>✓</div>
          <h3 style={{ ...s.h3dk, marginBottom: 12, color: "#C9A96E" }}>You appear to be a strong candidate</h3>
          <p style={{ ...s.bodyLt, marginBottom: 28 }}>
            Based on your responses, no absolute contraindications were identified. The next step is a physician intake and baseline labs to confirm eligibility and design your protocol.
          </p>
          <a href="#cta" className="btn-gold" style={{ display: "inline-flex" }}>Start Your Assessment</a>
        </div>
      )}
    </div>
  );
}

function FaqItem({ item }: { item: { q: string; a: string } }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid rgba(245,240,232,0.1)" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "22px 0", background: "none", border: "none", cursor: "pointer", gap: 16,
        }}
      >
        <span style={{ ...s.h3dk, textAlign: "left", fontSize: "1rem" }}>{item.q}</span>
        <span style={{
          width: 28, height: 28, borderRadius: "50%", border: "1px solid rgba(245,240,232,0.2)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#F5F0E8", fontFamily: DM, fontWeight: 300, fontSize: "1.1rem", flexShrink: 0,
          transition: "transform 0.25s", transform: open ? "rotate(45deg)" : "none",
        }}>+</span>
      </button>
      <div style={{ overflow: "hidden", maxHeight: open ? 400 : 0, transition: "max-height 0.35s ease" }}>
        <p style={{ ...s.bodyLt, paddingBottom: 20, paddingRight: 44 }}>{item.a}</p>
      </div>
    </div>
  );
}

export default function TesamorelinRx() {
  return (
    <div style={{ background: "#F5F0E8", minHeight: "100vh" }}>
      <Navbar />

      {/* ══ HERO ══ */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "flex-end", overflow: "hidden", background: "#0D0D0D" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${IMGS.hero})`, backgroundSize: "cover", backgroundPosition: "center 25%", backgroundRepeat: "no-repeat" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(13,13,13,0.92) 0%, rgba(13,13,13,0.6) 55%, rgba(13,13,13,0.1) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,13,13,0.7) 0%, transparent 55%)" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto", padding: "0 2.5rem 100px", width: "100%" }}>
          {/* Sister brand breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <a href="https://aureliushealth-cqjijuxa.manus.space" style={{ ...s.label, color: "rgba(201,169,110,0.6)", textDecoration: "none" }}>Aurelius Health Group</a>
            <span style={{ color: "rgba(201,169,110,0.4)", fontSize: "0.7rem" }}>›</span>
            <span style={{ ...s.label }}>TesamorelinRx</span>
          </div>
          <h1 style={{ ...s.h1, maxWidth: 660, marginBottom: 24 }}>
            The only FDA-approved<br />GHRH analog for<br />visceral fat reduction.
          </h1>
          <p style={{ ...s.bodyLt, maxWidth: 440, marginBottom: 20, fontSize: "1.0625rem" }}>
            Tesamorelin doesn't suppress your pituitary. It restores the upstream signal — producing physiologic GH pulses that selectively mobilize visceral adipose tissue.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 40 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#C9A96E", display: "inline-block" }} />
            <span style={{ ...s.bodyLt, fontSize: "0.875rem" }}>Physician-supervised · Pharma-grade compounded · Cold-shipped</span>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="#quiz" className="btn-gold">Check My Eligibility</a>
            <a href="#mechanism" className="btn-ghost-cream">How It Works</a>
          </div>
        </div>
      </section>

      {/* ══ PROBLEM — 6 cards ══ */}
      <section id="problem" style={{ background: "#F5F0E8", padding: "100px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2.5rem" }}>
          <p style={{ ...s.label, marginBottom: 16 }}>The Problem</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 60, alignItems: "start", marginBottom: 64 }}>
            <h2 style={{ ...s.h2lt }}>Six signs your GH axis is failing you</h2>
            <p style={{ ...s.body, maxWidth: 520, paddingTop: 8 }}>
              Age-related decline in Growth Hormone-Releasing Hormone (GHRH) production begins in your 30s and accelerates through your 40s and 50s. The downstream effects are measurable, progressive, and — with the right intervention — addressable.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {problems.map((p) => (
              <div key={p.title} style={{ background: "#fff", border: "1px solid rgba(13,13,13,0.07)", borderRadius: 10, padding: "28px 24px", transition: "box-shadow 0.2s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(13,13,13,0.08)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", border: "1px solid rgba(201,169,110,0.35)", display: "flex", alignItems: "center", justifyContent: "center", color: "#C9A96E", fontSize: "1rem", marginBottom: 16 }}>{p.icon}</div>
                <h3 style={{ ...s.h3lt, marginBottom: 10, fontSize: "1rem" }}>{p.title}</h3>
                <p style={{ ...s.bodySm, margin: 0 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MECHANISM — flow diagram + comparison ══ */}
      <section id="mechanism" style={{ background: "#0D0D0D", padding: "100px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2.5rem" }}>
          <p style={{ ...s.label, marginBottom: 16 }}>The Mechanism</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
            <div>
              <h2 style={{ ...s.h2dk, marginBottom: 20 }}>The upstream signal itself.</h2>
              <p style={{ ...s.bodyLt, marginBottom: 40 }}>
                Most GH-related compounds work downstream — either injecting GH directly or stimulating its release through ghrelin pathways. Tesamorelin is different: it is a synthetic analog of GHRH, the hypothalamic hormone that initiates the entire cascade. This means your pituitary remains active, your feedback loops remain intact, and GH is released in natural pulses — not a pharmacologic flood.
              </p>

              {/* 5-node flow diagram */}
              <div style={{ marginBottom: 40 }}>
                <p style={{ ...s.label, marginBottom: 20 }}>Signal Cascade</p>
                {[
                  { node: "GHRH", sub: "Tesamorelin mimics this signal", arrow: true },
                  { node: "Pituitary GHRHR", sub: "Receptor activation", arrow: true },
                  { node: "GH Pulse", sub: "Physiologic pulsatile release", arrow: true },
                  { node: "IGF-1 Production", sub: "Hepatic synthesis, systemic delivery", arrow: true },
                  { node: "Lipolysis", sub: "Selective visceral fat mobilization", arrow: false },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{
                        background: i === 0 ? "#C9A96E" : "rgba(201,169,110,0.12)",
                        border: `1.5px solid ${i === 0 ? "#C9A96E" : "rgba(201,169,110,0.35)"}`,
                        borderRadius: 8, padding: "10px 18px", minWidth: 180,
                      }}>
                        <span style={{ fontFamily: DM, fontWeight: 600, fontSize: "0.9375rem", color: i === 0 ? "#0D0D0D" : "#F5F0E8" }}>{item.node}</span>
                      </div>
                      <span style={{ ...s.bodyLt, fontSize: "0.8rem" }}>{item.sub}</span>
                    </div>
                    {item.arrow && (
                      <div style={{ marginLeft: 24, width: 1.5, height: 20, background: "rgba(201,169,110,0.35)", margin: "4px 0 4px 24px" }} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Comparison table */}
            <div>
              <p style={{ ...s.label, marginBottom: 20 }}>Mechanism Comparison</p>
              <div style={{ border: "1px solid rgba(245,240,232,0.1)", borderRadius: 10, overflow: "hidden" }}>
                {/* Header */}
                <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(245,240,232,0.1)" }}>
                  {["", "Tesamorelin", "MK-677", "HGH"].map((h, i) => (
                    <div key={i} style={{ padding: "14px 16px", fontFamily: DM, fontWeight: i === 1 ? 600 : 400, fontSize: "0.8rem", color: i === 1 ? "#C9A96E" : "rgba(245,240,232,0.5)", letterSpacing: "0.04em", borderRight: i < 3 ? "1px solid rgba(245,240,232,0.08)" : "none" }}>{h}</div>
                  ))}
                </div>
                {[
                  ["Target receptor", "GHRHR", "GHSR-1a", "GHR (direct)"],
                  ["GH pulsatility", "✓ Preserved", "✗ Blunted", "✗ None"],
                  ["Pituitary active", "✓ Yes", "Partial", "✗ Suppressed"],
                  ["FDA approval", "✓ Yes", "✗ No", "✓ Rx only"],
                  ["Appetite increase", "Minimal", "Significant", "Minimal"],
                  ["Insulin resistance", "Modest", "Significant", "Moderate"],
                  ["Phase 3 human data", "✓ Extensive", "Limited", "✓ Yes"],
                  ["Visceral fat data", "✓ Primary endpoint", "Indirect", "✓ Yes"],
                ].map((row, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", borderBottom: i < 7 ? "1px solid rgba(245,240,232,0.06)" : "none" }}>
                    {row.map((cell, j) => (
                      <div key={j} style={{
                        padding: "12px 16px", fontFamily: DM, fontSize: "0.8rem",
                        fontWeight: j === 0 ? 400 : 400,
                        color: j === 0 ? "rgba(245,240,232,0.45)" : j === 1 ? (cell.startsWith("✓") ? "#C9A96E" : cell.startsWith("✗") ? "rgba(245,240,232,0.3)" : "#F5F0E8") : (cell.startsWith("✓") ? "rgba(245,240,232,0.6)" : cell.startsWith("✗") ? "rgba(245,240,232,0.25)" : "rgba(245,240,232,0.5)"),
                        borderRight: j < 3 ? "1px solid rgba(245,240,232,0.06)" : "none",
                        background: j === 1 ? "rgba(201,169,110,0.04)" : "transparent",
                      }}>{cell}</div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FIVE PATHWAYS ══ */}
      <section style={{ background: "#F5F0E8", padding: "100px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2.5rem" }}>
          <p style={{ ...s.label, marginBottom: 16 }}>Clinical Evidence</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 60, alignItems: "start", marginBottom: 64 }}>
            <h2 style={{ ...s.h2lt }}>Five evidence-backed pathways</h2>
            <p style={{ ...s.body, maxWidth: 520, paddingTop: 8 }}>
              Tesamorelin's effects are documented across peer-reviewed Phase 3 trials, randomized controlled studies, and FDA prescribing data. Each pathway below is supported by a specific citation.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {pathways.map((p, i) => (
              <div key={p.n} style={{
                display: "grid", gridTemplateColumns: "80px 1fr 1fr",
                gap: 40, padding: "36px 0",
                borderBottom: i < pathways.length - 1 ? "1px solid rgba(13,13,13,0.08)" : "none",
                alignItems: "start",
              }}>
                <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "2rem", color: "rgba(13,13,13,0.15)", letterSpacing: "-0.04em", lineHeight: 1 }}>{p.n}</span>
                <div>
                  <h3 style={{ ...s.h3lt, marginBottom: 10 }}>{p.title}</h3>
                  <p style={{ ...s.body, margin: 0 }}>{p.body}</p>
                </div>
                <div style={{ paddingTop: 4 }}>
                  <p style={{ ...s.cite }}>Source: {p.cite}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ RESEARCH — 6 studies ══ */}
      <section id="research" style={{ background: "#0D0D0D", padding: "100px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2.5rem" }}>
          <p style={{ ...s.label, marginBottom: 16 }}>Peer-Reviewed Evidence</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 60, alignItems: "start", marginBottom: 64 }}>
            <h2 style={{ ...s.h2dk }}>The research behind the protocol</h2>
            <p style={{ ...s.bodyLt, paddingTop: 8 }}>
              Tesamorelin has more Phase 3 human trial data than any other GHRH analog. These six studies form the evidentiary foundation of every Aurelius TesamorelinRx protocol.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {studies.map((st) => (
              <div key={st.title} style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "24px 22px", display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ ...s.label, fontSize: "0.65rem", border: "1px solid rgba(201,169,110,0.35)", borderRadius: 4, padding: "3px 8px" }}>{st.tag}</span>
                  <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "0.8rem", color: "rgba(245,240,232,0.3)" }}>{st.year}</span>
                </div>
                <h3 style={{ ...s.h3dk, fontSize: "0.9375rem", lineHeight: 1.4 }}>{st.title}</h3>
                <p style={{ fontFamily: DM, fontWeight: 300, fontSize: "0.75rem", color: "#C9A96E", letterSpacing: "0.02em" }}>{st.authors} <em style={{ color: "rgba(245,240,232,0.4)" }}>{st.journal}</em></p>
                <p style={{ ...s.bodyLt, fontSize: "0.85rem", margin: 0 }}>{st.finding}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4-STEP PROTOCOL ══ */}
      <section style={{ background: "#F5F0E8", padding: "100px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2.5rem" }}>
          <p style={{ ...s.label, marginBottom: 16 }}>The Protocol</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 60, alignItems: "start", marginBottom: 64 }}>
            <h2 style={{ ...s.h2lt }}>Four steps from intake to results</h2>
            <p style={{ ...s.body, paddingTop: 8 }}>Designed to mirror the infrastructure of the Phase 3 trials — physician oversight, baseline DEXA, pharma-grade compound, and quantified outcomes at 12 and 26 weeks.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32 }}>
            {[
              {
                n: "1", title: "Assessment & Intake",
                items: ["Comprehensive health questionnaire", "Symptom and goal mapping", "Physician review within 48 hours", "Contraindication screening"],
              },
              {
                n: "2", title: "Baseline Labs & DEXA",
                items: ["IGF-1, fasting glucose, HbA1c", "Full lipid panel + CMP", "DEXA body composition scan", "Waist circumference measurement"],
              },
              {
                n: "3", title: "Protocol Initiation",
                items: ["Cold-packed Tesamorelin 2mg shipped", "Sterile supplies included", "Nurse onboarding session (video)", "Injection technique certification"],
              },
              {
                n: "4", title: "Monitoring & Retest",
                items: ["Monthly provider check-ins", "Labs repeated at 3 months", "DEXA retest at 12 and 26 weeks", "Protocol adjustment as needed"],
              },
            ].map((step) => (
              <div key={step.n} style={{ borderTop: "2px solid rgba(201,169,110,0.4)", paddingTop: 24 }}>
                <div style={{ fontFamily: DM, fontWeight: 300, fontSize: "2.5rem", color: "rgba(13,13,13,0.12)", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 12 }}>{step.n}</div>
                <h3 style={{ ...s.h3lt, marginBottom: 16, fontSize: "1rem" }}>{step.title}</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                  {step.items.map((item) => (
                    <li key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span style={{ color: "#C9A96E", fontSize: "0.75rem", marginTop: 3, flexShrink: 0 }}>◎</span>
                      <span style={{ ...s.bodySm }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHAT'S INCLUDED ══ */}
      <section style={{ background: "#0D0D0D", padding: "100px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2.5rem" }}>
          <p style={{ ...s.label, marginBottom: 16 }}>What's Included</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 60, alignItems: "start", marginBottom: 64 }}>
            <h2 style={{ ...s.h2dk }}>Phase 3 trial infrastructure. Delivered to you.</h2>
            <p style={{ ...s.bodyLt, paddingTop: 8 }}>Every element of the Aurelius TesamorelinRx plan mirrors the monitoring and support infrastructure used in the clinical trials that generated the evidence base.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {included.map((item) => (
              <div key={item.title} style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "28px 24px" }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", border: "1px solid rgba(201,169,110,0.35)", display: "flex", alignItems: "center", justifyContent: "center", color: "#C9A96E", fontSize: "1rem", marginBottom: 16 }}>{item.icon}</div>
                <h3 style={{ ...s.h3dk, marginBottom: 8, fontSize: "1rem" }}>{item.title}</h3>
                <p style={{ ...s.bodyLt, fontSize: "0.875rem", margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PRICING ══ */}
      <section id="pricing" style={{ background: "#F5F0E8", padding: "100px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2.5rem" }}>
          <p style={{ ...s.label, marginBottom: 16 }}>Pricing</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div>
              <h2 style={{ ...s.h2lt, marginBottom: 20 }}>Specialist-level care. Without the specialist markup.</h2>
              <p style={{ ...s.body, marginBottom: 32 }}>
                Endocrinology clinic protocols for visceral fat and GH optimization typically run $1,500–$2,500/month when you factor in office visits, lab fees, and compound costs billed separately. Aurelius bundles everything into a single monthly plan.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {["Physician consultation included", "All baseline and monitoring labs included", "Pharma-grade compound included", "Nurse onboarding included", "DEXA coordination included", "No hidden fees"].map((item) => (
                  <div key={item} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#C9A96E" strokeWidth="1.2"/><path d="M5 8l2 2 4-4" stroke="#C9A96E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span style={{ ...s.bodySm }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ background: "#0D0D0D", borderRadius: 12, padding: "48px 40px", textAlign: "center", border: "1px solid rgba(201,169,110,0.15)" }}>
                <p style={{ ...s.label, marginBottom: 12 }}>TesamorelinRx Plan</p>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: 4, marginBottom: 8 }}>
                  <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "1.25rem", color: "#C9A96E", marginTop: 10 }}>$</span>
                  <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "5rem", lineHeight: 1, letterSpacing: "-0.04em", color: "#F5F0E8" }}>269</span>
                  <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "1rem", color: "rgba(245,240,232,0.4)", marginTop: 16 }}>/mo</span>
                </div>
                <p style={{ ...s.bodyLt, fontSize: "0.8rem", marginBottom: 32 }}>
                  vs. $1,500–$2,500/mo at an endocrinology clinic
                </p>
                <a href="#quiz" className="btn-gold" style={{ width: "100%", justifyContent: "center", padding: "16px", fontSize: "1rem" }}>Check My Eligibility</a>
                <p style={{ ...s.bodyLt, fontSize: "0.75rem", marginTop: 16, opacity: 0.5 }}>No commitment. Cancel anytime.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ BODY COMP IMAGE ══ */}
      <section style={{ background: "#0D0D0D", padding: "0" }}>
        <div style={{ position: "relative", maxHeight: 480, overflow: "hidden" }}>
          <img src={IMGS.body} alt="Body composition transformation" style={{ width: "100%", objectFit: "cover", objectPosition: "center 30%", display: "block" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(13,13,13,0.75) 0%, transparent 40%, transparent 60%, rgba(13,13,13,0.75) 100%)" }} />
          <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", textAlign: "center", width: "100%" }}>
            <p style={{ ...s.label, marginBottom: 8 }}>Phase 3 Trial Outcome</p>
            <p style={{ fontFamily: DM, fontWeight: 300, fontSize: "clamp(1.25rem, 2.5vw, 2rem)", color: "#F5F0E8", letterSpacing: "-0.02em" }}>Mean 15.2% visceral fat reduction at 26 weeks</p>
          </div>
        </div>
      </section>

      {/* ══ ELIGIBILITY QUIZ ══ */}
      <section id="quiz" style={{ background: "#0D0D0D", padding: "100px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2.5rem" }}>
          <p style={{ ...s.label, marginBottom: 16, textAlign: "center" }}>Eligibility Screening</p>
          <h2 style={{ ...s.h2dk, textAlign: "center", marginBottom: 16 }}>Are you a candidate for TesamorelinRx?</h2>
          <p style={{ ...s.bodyLt, textAlign: "center", marginBottom: 56, maxWidth: 520, margin: "0 auto 56px" }}>
            This 6-question screen checks for Tesamorelin-specific contraindications. It takes under 60 seconds and does not constitute a medical evaluation.
          </p>
          <EligibilityQuiz />
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section id="faq" style={{ background: "#0D0D0D", padding: "100px 0", borderTop: "1px solid rgba(245,240,232,0.06)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2.5rem" }}>
          <p style={{ ...s.label, marginBottom: 16 }}>Frequently Asked Questions</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, alignItems: "start" }}>
            <div style={{ position: "sticky", top: 100 }}>
              <h2 style={{ ...s.h2dk, marginBottom: 20 }}>Everything you need to know</h2>
              <p style={{ ...s.bodyLt }}>Including the Tesamorelin vs. MK-677 vs. HGH comparison, glucose monitoring, off-label prescribing, and injection technique.</p>
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
      <section id="cta" style={{ background: "#0D0D0D", padding: "120px 0", textAlign: "center", borderTop: "1px solid rgba(245,240,232,0.06)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 2.5rem" }}>
          <p style={{ ...s.label, marginBottom: 20 }}>Start Today</p>
          <h2 style={{ fontFamily: DM, fontWeight: 300, fontSize: "clamp(2rem, 4.5vw, 3.5rem)", lineHeight: 1.1, letterSpacing: "-0.03em", color: "#F5F0E8", marginBottom: 24 }}>
            The visceral fat your labs show is not inevitable.
          </h2>
          <p style={{ ...s.bodyLt, marginBottom: 48, fontSize: "1.0625rem" }}>
            Tesamorelin has more Phase 3 evidence behind it than any other GHRH analog. A physician-supervised protocol is available today. The question is whether you're a candidate.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 20 }}>
            <a href="#quiz" className="btn-gold" style={{ padding: "16px 36px", fontSize: "1rem" }}>Check My Eligibility</a>
            <a href="#mechanism" className="btn-ghost-cream" style={{ padding: "16px 36px", fontSize: "1rem" }}>Review the Research</a>
          </div>
          <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.75rem", color: "rgba(245,240,232,0.25)", lineHeight: 1.6, maxWidth: 560, margin: "0 auto" }}>
            † This page describes off-label use of Tesamorelin (Egrifta), which is FDA-approved for HIV-associated lipodystrophy. Off-label prescribing is legal and at the clinical discretion of a licensed physician. This content is for informational purposes only and does not constitute medical advice. Individual results vary. All protocols require physician evaluation and are subject to contraindication screening. Aurelius Health Group is not affiliated with Theratechnologies Inc.
          </p>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ background: "#0A0A0A", borderTop: "1px solid rgba(245,240,232,0.06)", padding: "64px 0 40px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 56 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
                  <path d="M24 4 L6 40 L14 40 L24 20 L34 40 L42 40 Z" fill="#C9A96E" />
                  <line x1="12" y1="28" x2="36" y2="28" stroke="#C9A96E" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="24" y1="20" x2="24" y2="44" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <div>
                  <span style={{ fontFamily: DM, fontWeight: 500, fontSize: "0.875rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#F5F0E8", display: "block" }}>TesamorelinRx</span>
                  <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#8C7B6B" }}>by Aurelius Health Group</span>
                </div>
              </div>
              <p style={{ ...s.bodySm, color: "rgba(245,240,232,0.35)", maxWidth: 220, marginTop: 12 }}>Physician-supervised GHRH analog therapy for visceral fat reduction and metabolic optimization.</p>
            </div>
            {[
              { heading: "Protocol", links: ["How It Works", "The Research", "Five Pathways", "What's Included"] },
              { heading: "Company", links: ["About Aurelius", "Our Physicians", "All Treatments", "Blog"] },
              { heading: "Support", links: ["Check Eligibility", "FAQ", "Contact Us", "Patient Portal"] },
            ].map((col) => (
              <div key={col.heading}>
                <p style={{ fontFamily: DM, fontWeight: 500, fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "rgba(245,240,232,0.3)", marginBottom: 16 }}>{col.heading}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.875rem", color: "rgba(245,240,232,0.45)", textDecoration: "none" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#F5F0E8")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,240,232,0.45)")}>{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(245,240,232,0.06)", paddingTop: 28, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.8rem", color: "rgba(245,240,232,0.22)" }}>© 2026 Aurelius Health Group. TesamorelinRx is an off-label telehealth protocol. All rights reserved.</p>
            <div style={{ display: "flex", gap: 24 }}>
              {["Privacy Policy", "Terms of Service", "Medical Disclaimer"].map((link) => (
                <a key={link} href="#" style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.8rem", color: "rgba(245,240,232,0.22)", textDecoration: "none" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(245,240,232,0.5)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,240,232,0.22)")}>{link}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
