/*
   S31Rx — Landing Page
   Template: SemaxRx / ThymosinAlpha-1Rx design system
   ─────────────────────────────────────────────────────
   Typography System (DM Sans — geometric sans-serif):
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
  hero:   "https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=1800&q=80",
  cells:  "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1800&q=80",
  labs:   "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1200&q=80",
  energy: "https://images.unsplash.com/photo-1576671081837-49000212a370?w=1200&q=80",
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
    icon: "◈",
    title: "Mitochondrial Dysfunction & Chronic Fatigue",
    profile: "Adults experiencing persistent fatigue, reduced cellular energy, exercise intolerance, or age-related decline in physical and cognitive performance that has not responded to lifestyle interventions alone",
    mechanism: "SS-31 binds cardiolipin on the inner mitochondrial membrane, stabilizing cristae architecture and restoring electron transport chain efficiency — directly increasing ATP production and reducing mitochondrial reactive oxygen species at their source.",
    testimonial: "\"After six months of unexplained fatigue that nothing touched, SS-31 was the first thing that actually changed my energy at a cellular level. The difference was measurable within weeks.\" — R.T., 49, Denver CO",
  },
  {
    icon: "⊕",
    title: "Heart Failure & Cardiac Mitochondrial Injury",
    profile: "Patients with heart failure, reduced ejection fraction, cardiac ischemia-reperfusion injury, or chemotherapy-induced cardiomyopathy who need mitochondrial repair beyond standard cardiac pharmacotherapy",
    mechanism: "SS-31 improves mitochondrial bioenergetics in failing cardiac tissue, reduces oxidative damage, and has demonstrated improvements in 6-minute walk distance and quality of life in Phase 2 clinical trials of heart failure patients with preserved ejection fraction.",
    testimonial: "\"My cardiologist was tracking my functional capacity closely. After three months on SS-31, my 6-minute walk test improved significantly and my fatigue scores dropped substantially.\" — M.H., 63, Boston MA",
  },
  {
    icon: "◷",
    title: "Neurodegenerative Disease & Cognitive Decline",
    profile: "Adults with early Alzheimer's disease, Parkinson's disease, age-related cognitive decline, or post-anesthesia cognitive dysfunction who need mitochondrial neuroprotection beyond standard neurological care",
    mechanism: "SS-31 inhibits the mitochondrial permeability transition pore (mPTP) opening implicated in neuronal death, reduces amyloid-beta accumulation in Alzheimer's models, and restores hippocampal mitochondrial function — protecting the cellular energy infrastructure of cognition.",
    testimonial: "\"My neurologist added SS-31 to my protocol after my cognitive testing showed early decline. Six months later, my follow-up testing was noticeably better and my energy during mental tasks improved.\" — J.K., 57, Seattle WA",
  },
];

/* ── Pathways (Clinical Evidence) ── */
const pathways = [
  {
    n: "01", title: "Cardiolipin Binding & Cristae Stabilization",
    body: "SS-31 selectively accumulates in the inner mitochondrial membrane where it binds cardiolipin — the signature phospholipid of mitochondria — with high affinity. This interaction stabilizes cristae architecture, maintains cytochrome c as an electron carrier rather than a peroxidase, and restores electron transport chain efficiency. The result is increased ATP synthesis and reduced reactive oxygen species generation.",
    cite: "Chavez JD et al. Proc Natl Acad Sci USA. 2020;117(26):15363–15373.",
    tags: ["Cardiolipin binding", "Cristae stabilization", "ATP production"],
  },
  {
    n: "02", title: "Heart Failure — PROGRESS-HF & ReCLAIM Trials",
    body: "In the PROGRESS-HF Phase 2 trial, SS-31 (elamipretide) administered subcutaneously to heart failure patients with reduced ejection fraction significantly improved 6-minute walk distance and quality-of-life scores. The ReCLAIM trial demonstrated improvements in cardiac mitochondrial function and exercise capacity in heart failure with preserved ejection fraction — the most common and treatment-resistant form of heart failure.",
    cite: "Sabbah HN. Eur J Heart Fail. 2025; doi:10.1002/ejhf.3636.",
    tags: ["Heart failure", "PROGRESS-HF", "Ejection fraction"],
  },
  {
    n: "03", title: "Alzheimer's Disease & Amyloid-Beta Reduction",
    body: "In Alzheimer's mouse models, SS-31 intraperitoneal administration significantly decreased amyloid-beta levels, preserved mitochondrial structure in hippocampal neurons, and maintained cognitive function. SS-31 also inhibits mPTP opening — a key mechanism of neuronal death — providing neuroprotection independent of amyloid cascade targeting.",
    cite: "Tarantini S et al. J Cereb Blood Flow Metab. 2018;38(11):1884–1897.",
    tags: ["Alzheimer's", "Amyloid-beta", "Neuroprotection"],
  },
  {
    n: "04", title: "Renal Protection & Glomerular Preservation",
    body: "SS-31 treatment in aged mice reversed mitochondrial dysfunction in glomerular podocytes, reduced senescence markers (p16, SA-β-Gal), and improved glomerular architecture. In models of ischemia-reperfusion kidney injury and diabetic nephropathy, SS-31 reduced oxidative stress, apoptosis, and fibrosis by restoring mitochondrial dynamics.",
    cite: "Sweetwyne MT et al. Kidney Int. 2017;91(5):1126–1145.",
    tags: ["Kidney protection", "Glomerular health", "Renal aging"],
  },
  {
    n: "05", title: "Skeletal Muscle & Age-Related Sarcopenia",
    body: "Prolonged SS-31 treatment in aged mice reversed energetic deficits in skeletal muscle mitochondria, restored resting and dynamic mitochondrial ATP production, and improved muscle function. The MMPOWER-3 trial studied SS-31 in primary mitochondrial myopathy, demonstrating improvements in fatigue and physical performance in patients with inherited mitochondrial disease.",
    cite: "Siegel MP et al. Aging Cell. 2019;18(3):e12975.",
    tags: ["Sarcopenia", "Muscle energy", "MMPOWER-3"],
  },
  {
    n: "06", title: "Reactive Oxygen Species Scavenging & Anti-Aging",
    body: "SS-31 functions as a potent mitochondrial antioxidant by scavenging reactive oxygen species at their primary site of generation — the inner mitochondrial membrane. It activates autophagy pathways that clear damaged mitochondria (mitophagy), reduces oxidative damage to mtDNA and mitochondrial proteins, and has demonstrated reversal of aging-related mitochondrial dysfunction across multiple organ systems.",
    cite: "Tung C et al. Int J Mol Sci. 2025;26(3):944.",
    tags: ["ROS scavenging", "Mitophagy", "Anti-aging"],
  },
];

/* ── Condition tag cloud ── */
const conditionTags = [
  "Chronic Fatigue", "Heart Failure", "Alzheimer's Disease", "Parkinson's Disease",
  "Kidney Disease", "Sarcopenia", "Mitochondrial Myopathy", "Ischemia-Reperfusion Injury",
  "Post-Anesthesia Cognitive Decline", "Diabetic Nephropathy", "Cardiomyopathy", "Atherosclerosis",
  "Age-Related Decline", "Exercise Intolerance", "Barth Syndrome",
];

/* ── FAQ ── */
const faqs = [
  {
    q: "What is SS-31 and where does it come from?",
    a: "SS-31 (also known as elamipretide, MTP-131, or Bendavia) is a synthetic tetrapeptide with the sequence D-Arg-Dmt-Lys-Phe-NH2, developed by Hazel Szeto and Peter Schiller at Weill Cornell Medical College. It was designed specifically to target the inner mitochondrial membrane by binding cardiolipin — a phospholipid unique to mitochondria. Unlike most peptides, SS-31 does not require a membrane potential to accumulate in mitochondria, making it effective even in severely dysfunctional mitochondria. It is currently being developed by Stealth BioTherapeutics under the trademark Elamipretide and has been studied in multiple Phase 2 and Phase 3 clinical trials.",
  },
  {
    q: "How does SS-31 differ from conventional antioxidants or mitochondrial supplements?",
    a: "Conventional antioxidants (e.g., CoQ10, MitoQ, NAC) work in the cytoplasm or non-specifically throughout the cell. SS-31 is uniquely targeted to the inner mitochondrial membrane — the precise location where reactive oxygen species are generated and where cardiolipin-dependent electron transport occurs. This specificity makes SS-31 orders of magnitude more potent per molecule than conventional antioxidants. Additionally, SS-31 does not simply neutralize ROS — it addresses the upstream structural cause of mitochondrial dysfunction by stabilizing cristae architecture and restoring electron transport chain geometry. No supplement achieves this mechanistic depth.",
  },
  {
    q: "What does the clinical evidence actually show?",
    a: "SS-31 (elamipretide) has been studied in four major clinical trial programs: PROGRESS-HF (heart failure with reduced ejection fraction), ReCLAIM (heart failure with preserved ejection fraction), MMPOWER-3 (primary mitochondrial myopathy), and TAZPOWER (Barth syndrome — a rare mitochondrial cardiomyopathy). TAZPOWER demonstrated significant improvements in 6-minute walk distance and fatigue in Barth syndrome patients. PROGRESS-HF showed improvements in cardiac function and quality of life. The evidence base is unusually robust for a compounded peptide, with multiple Phase 2 and Phase 3 human trials. Aurelius protocols are grounded in this peer-reviewed evidence base.",
  },
  {
    q: "How is SS-31 administered?",
    a: "SS-31 is administered subcutaneously (under the skin) via injection, typically once daily. Standard dosing in clinical trials has ranged from 0.25 mg/kg to 4 mg/kg; compounded protocols typically use fixed doses of 10–40 mg per injection based on physician assessment. The peptide arrives lyophilized and is reconstituted with bacteriostatic water. Reconstituted vials are stored refrigerated and used within 30 days. Injection sites are rotated (abdomen, thigh, upper arm). Aurelius provides a nurse onboarding session to certify proper administration technique before protocol initiation.",
  },
  {
    q: "How long until I see results?",
    a: "Objective mitochondrial function improvements — reduced oxidative stress markers, improved cellular energy metabolism — are typically measurable at 4–8 weeks of consistent protocol use. Subjective improvements in energy, exercise tolerance, and cognitive clarity are commonly reported at 3–6 weeks. For cardiac applications, functional capacity improvements (6-minute walk distance, fatigue scores) were observed at 4–16 weeks in clinical trials. Long-term mitochondrial restoration benefits accumulate over 12–24 weeks of consistent protocol use.",
  },
  {
    q: "Is prescribing SS-31 off-label legal in the United States?",
    a: "Elamipretide has received FDA Orphan Drug Designation for Barth syndrome and is under active Phase 3 investigation. Outside approved indications, SS-31 is prescribed as a compounded peptide under the clinical judgment of a licensed physician. Off-label prescribing of compounded peptides is legal in the United States when a licensed physician documents clinical rationale and obtains informed consent. SS-31 has an established safety profile from multiple human clinical trials with no serious adverse events reported beyond mild injection-site reactions. Aurelius physicians follow this protocol for every patient.",
  },
];

/* ── Eligibility Quiz ── */
function EligibilityQuiz() {
  const questions = [
    { q: "Are you currently taking medications that significantly impair mitochondrial function (e.g., metformin at high doses, certain antiretrovirals, or aminoglycoside antibiotics) without physician oversight?", disqualifier: "YES", note: "Mitochondrial-affecting medications require physician evaluation before initiating SS-31 to assess interaction potential and optimize dosing." },
    { q: "Do you have a known hypersensitivity or allergy to any component of SS-31 (elamipretide) or related synthetic peptides?", disqualifier: "YES", note: "Known hypersensitivity is a contraindication to SS-31 therapy." },
    { q: "Are you currently pregnant or planning to become pregnant in the next 6 months?", disqualifier: "YES", note: "SS-31 has not been studied in pregnancy; safety data is insufficient for use during pregnancy." },
    { q: "Do you have end-stage organ failure (ESRD, decompensated cirrhosis, or terminal heart failure NYHA Class IV) without active specialist management?", disqualifier: "YES", note: "End-stage organ failure requires specialist co-management before initiating mitochondrial peptide protocols." },
    { q: "Do you experience any of the following: chronic fatigue, reduced exercise tolerance, cognitive decline, heart failure symptoms, age-related energy decline, or a diagnosed mitochondrial condition?", disqualifier: "NO", note: "These are the primary indications for S-31Rx protocol consideration." },
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
              <p style={{ ...s.bodyLt, marginBottom: 24 }}>One or more of your answers indicates a condition that may require modification of the standard SS-31 protocol. Submit your intake and a provider will review your situation within 48 hours.</p>
              <a href="mailto:intake@aureliushealthgroup.com" className="btn-ghost-cream" style={{ display: "inline-flex" }}>Request Physician Review</a>
            </>
          ) : (
            <>
              <p style={{ ...s.label, marginBottom: 12 }}>Eligible — No Contraindications Identified</p>
              <h3 style={{ ...s.h3dk, marginBottom: 12, fontSize: "1.25rem" }}>Based on your responses, you appear to be a candidate for the S-31Rx protocol.</h3>
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

export default function S31Rx() {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  return (
    <div style={{ background: "#0D0D0D", minHeight: "100vh" }}>
      <Navbar productName="S-31Rx" />

      {/* ══ HERO ══ */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src={IMGS.hero} alt="S-31Rx hero" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,13,13,0.92) 0%, rgba(13,13,13,0.45) 50%, rgba(13,13,13,0.2) 100%)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem) clamp(60px,10vw,100px)", width: "100%" }}>
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
            <a href="https://aureliushealthgroup.com" style={{ ...s.label, color: "rgba(201,169,110,0.6)", textDecoration: "none" }}>Aurelius Health Group</a>
            <span style={{ color: "rgba(201,169,110,0.4)", fontSize: "0.7rem" }}>›</span>
            <span style={{ ...s.label }}>S-31<span style={{ color: DARK_ORANGE }}>Rx</span></span>
          </div>
          <h1 style={{ ...s.h1, maxWidth: 760, marginBottom: 24 }}>
            The mitochondrial peptide<br />your cells were designed<br />to run on.
          </h1>
          <p style={{ ...s.bodyLt, maxWidth: 480, marginBottom: 16, fontSize: "1.0625rem" }}>
            SS-31 is the world's most precisely targeted mitochondrial peptide — binding cardiolipin on the inner membrane to restore ATP production, eliminate reactive oxygen species, and reverse the cellular energy deficit at the root of aging, heart failure, and neurodegeneration.
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40 }}>
            {["Physician-supervised", "Pharma-grade compounded", "Subcutaneous delivery"].map((t) => (
              <span key={t} style={{ ...s.label, color: "rgba(201,169,110,0.55)", border: "1px solid rgba(201,169,110,0.2)", padding: "5px 12px", borderRadius: 3 }}>{t}</span>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="#quiz" className="btn-gold">Check My Eligibility</a>
            <a href="#research" className="btn-ghost-cream">Review the Research</a>
          </div>
        </div>
      </section>

      {/* ══ STATS STRIP ══ */}
      <section style={{ background: "#111", borderTop: "1px solid rgba(201,169,110,0.12)", borderBottom: "1px solid rgba(201,169,110,0.12)", padding: "clamp(28px,4vw,40px) 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem)" }}>
          <div className="stats-strip" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
            {[
              { stat: "2002", label: "SS-31 first synthesized" },
              { stat: "4 AA", label: "Tetrapeptide structure" },
              { stat: "4 trials", label: "Phase 2–3 clinical programs" },
              { stat: "$249/mo", label: "All-inclusive protocol" },
            ].map((item) => (
              <div key={item.stat} style={{ textAlign: "center" }}>
                <p style={{ fontFamily: DM, fontWeight: 300, fontSize: "clamp(1.5rem,3vw,2.25rem)", letterSpacing: "-0.03em", color: "#F5F0E8", marginBottom: 4 }}>{item.stat}</p>
                <p style={{ ...s.label, color: "rgba(201,169,110,0.55)" }}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ THE PROBLEM ══ */}
      <section style={{ background: "#0D0D0D", padding: "clamp(60px,8vw,100px) 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem)" }}>
          <p style={{ ...s.label, marginBottom: 16 }}>The Problem</p>
          <div className="problem-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {problems.map((p) => (
              <div key={p.title} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(245,240,232,0.06)", borderRadius: 10, padding: "clamp(24px,3vw,36px)" }}>
                <span style={{ fontSize: "1.5rem", color: "#C9A96E", display: "block", marginBottom: 16 }}>{p.icon}</span>
                <h3 style={{ ...s.h3dk, marginBottom: 16 }}>{p.title}</h3>
                <div style={{ marginBottom: 16 }}>
                  <p style={{ ...s.label, marginBottom: 8 }}>Target Patient</p>
                  <p style={{ ...s.bodyLt, fontSize: "0.875rem" }}>{p.profile}</p>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <p style={{ ...s.label, marginBottom: 8 }}>SS-31 Mechanism</p>
                  <p style={{ ...s.bodyLt, fontSize: "0.875rem" }}>{p.mechanism}</p>
                </div>
                <p style={{ ...s.cite }}>{p.testimonial}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ THE MECHANISM ══ */}
      <section id="research" style={{ background: "#111", padding: "clamp(60px,8vw,100px) 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem)" }}>
          <p style={{ ...s.label, marginBottom: 16 }}>The Mechanism</p>
          <div className="two-col-mech" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, marginBottom: 64 }}>
            {/* Origin story */}
            <div>
              <h2 style={{ ...s.h2dk, marginBottom: 24 }}>How SS-31 repairs mitochondria from the inside out</h2>
              <p style={{ ...s.bodyLt, marginBottom: 20 }}>
                SS-31 was designed by Hazel Szeto and Peter Schiller at Weill Cornell Medical College with a single purpose: to reach the inner mitochondrial membrane and bind cardiolipin — the phospholipid that anchors the electron transport chain complexes and determines whether cytochrome c acts as an energy producer or a cell-death signal.
              </p>
              <p style={{ ...s.bodyLt, marginBottom: 32 }}>
                When cardiolipin is oxidized by reactive oxygen species, cristae collapse, electron transport efficiency falls, ATP production drops, and the cell enters a state of bioenergetic crisis. SS-31 intercepts this cascade at its origin — stabilizing cardiolipin, restoring cristae geometry, and returning the mitochondrion to full energy production.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {[
                  { label: "Mechanism", text: "Cardiolipin binding → cristae stabilization → ETC restoration → ATP ↑, ROS ↓" },
                  { label: "Structure", text: "D-Arg-Dmt-Lys-Phe-NH2 — alternating aromatic-cationic tetrapeptide" },
                  { label: "Targeting", text: "Electrostatic attraction to negatively charged cardiolipin; membrane-potential independent" },
                  { label: "Clinical Names", text: "SS-31 / Elamipretide / MTP-131 / Bendavia (Stealth BioTherapeutics)" },
                ].map((item) => (
                  <div key={item.label} style={{ borderLeft: "2px solid rgba(201,169,110,0.3)", paddingLeft: 20 }}>
                    <p style={{ ...s.label, marginBottom: 6 }}>{item.label}</p>
                    <p style={{ ...s.bodyLt, margin: 0, fontSize: "0.9rem" }}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* SS-31 Mitochondrial Cascade Flow Diagram */}
            <div>
              <p style={{ ...s.label, marginBottom: 20 }}>SS-31 Mitochondrial Repair Cascade</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {[
                  { node: "SS-31 (Elamipretide)", sub: "4 AA synthetic tetrapeptide — D-Arg-Dmt-Lys-Phe-NH2", color: "#C9A96E" },
                  { node: "Cardiolipin Binding (IMM)", sub: "Selective accumulation on inner mitochondrial membrane → cristae stabilization", color: "#B8956A" },
                  { node: "Cytochrome c Redirection", sub: "CL-bound cyt c → electron carrier (not peroxidase) → ETC efficiency ↑", color: "#A07A55" },
                  { node: "ATP Synthesis Restored", sub: "Complex I–IV activity ↑, mitochondrial membrane potential restored, ROS ↓", color: "#8C6845" },
                  { node: "Cellular Energy & Repair", sub: "Fatigue ↓, cardiac function ↑, neuroprotection ↑, organ preservation", color: "#785535" },
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
                  {["", "SS-31", "CoQ10 / MitoQ", "NAC / Glutathione", "Metformin", "NMN / NR"].map((h, i) => (
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
                  ["Primary action", "IMM cardiolipin binding + ETC restoration", "Electron carrier / ROS scavenger", "Cytoplasmic antioxidant", "AMPK activation / Complex I inhibition", "NAD+ precursor"],
                  ["Mitochondrial targeting", "✓ Inner membrane — cardiolipin specific", "Partial (membrane accumulation)", "✗ Cytoplasmic only", "✗ Complex I inhibition", "✗ NAD+ pathway only"],
                  ["Cristae stabilization", "✓ Direct cardiolipin binding", "✗ No", "✗ No", "✗ No", "✗ No"],
                  ["Clinical trial evidence", "✓ Phase 2–3 RCTs (PROGRESS-HF, TAZPOWER)", "✗ Observational only", "✗ No RCT for mitochondria", "Partial (metabolic)", "✗ Limited human data"],
                  ["Side effect profile", "✓ Injection site only — no systemic toxicity", "✓ Generally safe", "✓ Generally safe", "✗ GI side effects, lactic acidosis risk", "✓ Generally safe"],
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

      {/* ══ DISCOVER PEPTIDES ══ */}
      <section id="discover-peptides" style={{ background: "#F5F0E8", padding: "clamp(60px,8vw,100px) 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem)" }}>
          <div className="two-col-header" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 60, alignItems: "start", marginBottom: 56 }}>
            <h2 style={{ ...s.h2lt }}>Discover Peptides</h2>
            <p style={{ ...s.body, paddingTop: 8 }}>Explore the full range of physician-supervised peptide protocols available through Aurelius Health Group — each designed around peer-reviewed evidence, pharma-grade compounds, and measurable outcomes.</p>
          </div>

          {/* 4-card grid */}
          <div className="four-col-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24, marginBottom: 48 }}>
            {[
              {
                name: "S-31Rx",
                nameSuffix: "Rx",
                nameBase: "S-31",
                tag: "Mitochondrial Repair",
                desc: "The world's most precisely targeted mitochondrial peptide — binding cardiolipin on the inner membrane to restore ATP production, eliminate reactive oxygen species, and reverse cellular energy decline.",
                cta: "Check My Eligibility",
                ctaHref: "#quiz",
                featured: true,
              },
              {
                name: "ThymosinAlpha-1Rx",
                tag: "Immune Modulation",
                desc: "The thymus-derived polypeptide that restores T-cell immunity, activates innate defense, and resolves immune dysfunction — without steroids, stimulants, or systemic toxicity.",
                cta: "Get Started",
                ctaHref: "https://thymosin-alpha1-rx-maria-2244s-projects.vercel.app",
                featured: false,
              },
              {
                name: "SemaxRx",
                tag: "Neuroprotection",
                desc: "The ACTH-derived heptapeptide that upregulates BDNF, sharpens neural circuits, and resolves neuroinflammation — restoring cognitive performance without stimulants or dependence.",
                cta: "Get Started",
                ctaHref: "https://semax-rx-maria-2244s-projects.vercel.app",
                featured: false,
              },
              {
                name: "Kisspeptin-10Rx",
                tag: "Reproductive Health",
                desc: "The KISS1-encoded neuropeptide that activates the HPG axis, restores testosterone, and resolves sexual desire disorders — without exogenous hormones or axis suppression.",
                cta: "Get Started",
                ctaHref: "https://kisspeptin-10-rx-maria-2244s-projects.vercel.app",
                featured: false,
              },
            ].map((peptide) => (
              <div
                key={peptide.name}
                style={{
                  background: peptide.featured ? "#1A1410" : "#1A1A1A",
                  borderRadius: 10,
                  padding: "28px 24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  position: "relative",
                  border: peptide.featured ? "1px solid rgba(201,169,110,0.3)" : "1px solid rgba(245,240,232,0.06)",
                }}
              >
                {peptide.featured && (
                  <div style={{
                    position: "absolute", top: -1, left: 20,
                    background: "#C9A96E", color: "#0D0D0D",
                    fontFamily: DM, fontWeight: 600, fontSize: "0.6rem",
                    letterSpacing: "0.12em", textTransform: "uppercase" as const,
                    padding: "3px 10px", borderRadius: "0 0 5px 5px",
                  }}>Current Protocol</div>
                )}
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: peptide.featured ? 8 : 0 }}>
                  <span style={{
                    fontFamily: DM, fontWeight: 500, fontSize: "0.65rem",
                    letterSpacing: "0.1em", textTransform: "uppercase" as const,
                    color: "#C9A96E", background: "rgba(201,169,110,0.1)",
                    padding: "3px 8px", borderRadius: 3, alignSelf: "flex-start",
                  }}>{peptide.tag}</span>
                  <h3 style={{ ...s.h3dk, fontSize: "1.0625rem", margin: 0 }}>
                    {peptide.featured
                      ? <>{peptide.nameBase}<span style={{ color: DARK_ORANGE }}>{peptide.nameSuffix}</span></>
                      : peptide.name
                    }
                  </h3>
                </div>
                <p style={{ ...s.bodyLt, fontSize: "0.875rem", flex: 1 }}>{peptide.desc}</p>
                <a
                  href={peptide.ctaHref}
                  style={{
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    fontFamily: DM, fontWeight: 500, fontSize: "0.8125rem", letterSpacing: "0.04em",
                    padding: "12px 20px", borderRadius: 6, textDecoration: "none", transition: "all 0.2s",
                    background: peptide.featured ? "#C9A96E" : "transparent",
                    color: peptide.featured ? "#0D0D0D" : "rgba(245,240,232,0.5)",
                    border: peptide.featured ? "none" : "1px solid rgba(245,240,232,0.15)",
                  }}
                  onMouseEnter={e => { if (!peptide.featured) { e.currentTarget.style.color = "#F5F0E8"; e.currentTarget.style.borderColor = "rgba(245,240,232,0.35)"; } }}
                  onMouseLeave={e => { if (!peptide.featured) { e.currentTarget.style.color = "rgba(245,240,232,0.5)"; e.currentTarget.style.borderColor = "rgba(245,240,232,0.15)"; } }}
                >
                  {peptide.cta}
                </a>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center" }}>
            <a href="/peptides" style={{ ...s.label, color: "#8C7B6B", textDecoration: "none", borderBottom: "1px solid rgba(140,123,107,0.3)", paddingBottom: 2 }}>Discover More Peptides →</a>
          </div>
        </div>
      </section>

      {/* ══ CLINICAL EVIDENCE ══ */}
      <section id="research" style={{ background: "#0D0D0D", padding: "clamp(60px,8vw,100px) 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem)" }}>
          <p style={{ ...s.label, marginBottom: 16 }}>Clinical Evidence</p>
          <div className="two-col-header" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 60, alignItems: "start", marginBottom: 56 }}>
            <h2 style={{ ...s.h2dk }}>Six evidence-backed mitochondrial pathways</h2>
            <p style={{ ...s.bodyLt, paddingTop: 8 }}>SS-31's mechanism has been validated across multiple organ systems in both preclinical models and human clinical trials. Each pathway below is grounded in peer-reviewed research — presented without exaggeration.</p>
          </div>

          {/* Condition tag cloud */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 48 }}>
            {conditionTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                style={{
                  fontFamily: DM, fontWeight: 400, fontSize: "0.8rem",
                  padding: "6px 14px", borderRadius: 20, cursor: "pointer", transition: "all 0.2s",
                  background: activeTag === tag ? "rgba(201,169,110,0.15)" : "transparent",
                  color: activeTag === tag ? "#C9A96E" : "rgba(245,240,232,0.4)",
                  border: `1px solid ${activeTag === tag ? "rgba(201,169,110,0.4)" : "rgba(245,240,232,0.1)"}`,
                }}
              >{tag}</button>
            ))}
          </div>

          {/* Pathway cards */}
          <div className="pathway-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {pathways.map((pw) => (
              <div key={pw.n} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(245,240,232,0.06)", borderRadius: 10, padding: "clamp(24px,3vw,32px)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "2rem", color: "rgba(201,169,110,0.25)", lineHeight: 1 }}>{pw.n}</span>
                </div>
                <h3 style={{ ...s.h3dk, marginBottom: 12 }}>{pw.title}</h3>
                <p style={{ ...s.bodyLt, fontSize: "0.875rem", marginBottom: 16 }}>{pw.body}</p>
                <p style={{ ...s.cite, marginBottom: 16 }}>Source: {pw.cite}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {pw.tags.map((tag) => (
                    <span key={tag} style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.7rem", color: "rgba(201,169,110,0.6)", border: "1px solid rgba(201,169,110,0.2)", padding: "3px 8px", borderRadius: 3 }}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Mid-page image break */}
          <div style={{ marginTop: 64, borderRadius: 12, overflow: "hidden", position: "relative", height: "clamp(200px,30vw,380px)" }}>
            <img src={IMGS.cells} alt="Mitochondria cellular biology" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(13,13,13,0.85) 0%, rgba(13,13,13,0.3) 60%, transparent 100%)" }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "0 clamp(24px,5vw,60px)" }}>
              <div style={{ maxWidth: 480 }}>
                <p style={{ ...s.label, marginBottom: 12 }}>Cardiolipin Origin</p>
                <p style={{ fontFamily: DM, fontWeight: 300, fontSize: "clamp(1.1rem,2.5vw,1.75rem)", lineHeight: 1.2, letterSpacing: "-0.02em", color: "#F5F0E8" }}>
                  The only therapeutic peptide designed to reach the inner mitochondrial membrane and bind the phospholipid that controls cellular energy
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ PROTOCOL ══ */}
      <section id="protocol" style={{ background: "#F5F0E8", padding: "clamp(60px,8vw,100px) 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem)" }}>
          <p style={{ ...s.label, marginBottom: 16 }}>The Protocol</p>
          <div className="two-col-header" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 60, alignItems: "start", marginBottom: 56 }}>
            <h2 style={{ ...s.h2lt }}>Four steps to mitochondrial restoration</h2>
            <p style={{ ...s.body, paddingTop: 8 }}>Every S-31Rx protocol begins with a physician evaluation and baseline mitochondrial health assessment. No protocol is initiated without documented clinical rationale and informed consent.</p>
          </div>

          <div className="four-col-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
            {[
              {
                step: "01",
                title: "Assessment & Intake",
                items: [
                  "Comprehensive health questionnaire",
                  "Mitochondrial symptom mapping",
                  "Medication and supplement review",
                  "Physician review within 48 hours",
                  "Contraindication screening",
                ],
              },
              {
                step: "02",
                title: "Baseline Labs",
                items: [
                  "CBC with differential",
                  "Comprehensive metabolic panel (CMP)",
                  "Lactate / pyruvate ratio",
                  "CoQ10 serum level",
                  "Oxidative stress markers (8-OHdG)",
                ],
              },
              {
                step: "03",
                title: "Protocol Initiation",
                items: [
                  "SS-31 10–40 mg SQ daily",
                  "Pharma-grade lyophilized compound",
                  "Nurse onboarding session",
                  "Cold-chain overnight delivery",
                  "Injection technique certification",
                ],
              },
              {
                step: "04",
                title: "Monitoring",
                items: [
                  "4-week check-in with provider",
                  "Repeat oxidative stress labs at 8–12 weeks",
                  "Functional capacity reassessment",
                  "Protocol adjustment as indicated",
                  "Ongoing physician oversight",
                ],
              },
            ].map((step) => (
              <div key={step.step} style={{ background: "#0D0D0D", borderRadius: 10, padding: "clamp(24px,3vw,32px)", border: "1px solid rgba(201,169,110,0.1)" }}>
                <p style={{ fontFamily: DM, fontWeight: 300, fontSize: "2.5rem", color: "rgba(201,169,110,0.2)", lineHeight: 1, marginBottom: 16 }}>{step.step}</p>
                <h3 style={{ ...s.h3dk, marginBottom: 20 }}>{step.title}</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {step.items.map((item) => (
                    <li key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span style={{ color: "#C9A96E", fontSize: "0.6rem", marginTop: 5, flexShrink: 0 }}>◆</span>
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
              <h2 style={{ ...s.h2lt, marginBottom: 20 }}>Mitochondrial medicine pricing. Without the specialist markup.</h2>
              <p style={{ ...s.body, marginBottom: 24 }}>
                Mitochondrial medicine specialists and functional cardiologists typically charge $500–$1,000 per consultation, $400–$700 per follow-up, and $500–$1,000/month for compounded peptides — billed separately. Aurelius bundles physician oversight, mitochondrial labs, compound, and monitoring into one monthly plan.
              </p>
              <div style={{ background: "rgba(201,169,110,0.06)", border: "1px solid rgba(201,169,110,0.15)", borderRadius: 8, padding: "20px 24px", marginBottom: 28 }}>
                <p style={{ fontFamily: DM, fontWeight: 500, fontSize: "0.875rem", color: "#1A1A1A", marginBottom: 8 }}>Typical mitochondrial medicine cost breakdown:</p>
                {[
                  ["Initial specialist consult", "$500–$1,000"],
                  ["Comprehensive mitochondrial labs", "$400–$700"],
                  ["Monthly compound cost", "$500–$1,000"],
                  ["Monthly follow-up visits", "$300–$500"],
                  ["Total first month", "$1,700–$3,200"],
                ].map(([item, cost]) => (
                  <div key={item} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid rgba(13,13,13,0.06)" }}>
                    <span style={{ ...s.bodySm }}>{item}</span>
                    <span style={{ fontFamily: DM, fontWeight: 500, fontSize: "0.875rem", color: "#8C6845" }}>{cost}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {["Physician consultation included", "Full mitochondrial lab panel included", "Pharma-grade SS-31 included", "Nurse onboarding included", "Monthly check-ins included", "No hidden fees"].map((item) => (
                  <div key={item} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#C9A96E" strokeWidth="1.2"/><path d="M5 8l2 2 4-4" stroke="#C9A96E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span style={{ ...s.bodySm }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ background: "#0D0D0D", borderRadius: 12, padding: "clamp(32px,5vw,48px) clamp(24px,4vw,40px)", textAlign: "center", border: "1px solid rgba(201,169,110,0.15)" }}>
                <p style={{ ...s.label, marginBottom: 12 }}>S-31Rx Plan</p>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: 4, marginBottom: 8 }}>
                  <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "1.25rem", color: "#C9A96E", marginTop: 10 }}>$</span>
                  <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "clamp(3.5rem,8vw,5rem)", lineHeight: 1, letterSpacing: "-0.04em", color: "#F5F0E8" }}>249</span>
                  <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "1rem", color: "rgba(245,240,232,0.4)", marginTop: 16 }}>/mo</span>
                </div>
                <p style={{ ...s.bodyLt, fontSize: "0.8rem", marginBottom: 32 }}>vs. $1,700–$3,200/mo at a mitochondrial medicine clinic</p>
                <a href="#quiz" className="btn-gold" style={{ width: "100%", justifyContent: "center", display: "flex", marginBottom: 16 }}>Check My Eligibility</a>
                <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.75rem", color: "rgba(245,240,232,0.25)", lineHeight: 1.6 }}>Cancel anytime. No long-term commitment required.</p>
                <div style={{ borderTop: "1px solid rgba(245,240,232,0.06)", marginTop: 28, paddingTop: 24, display: "flex", flexDirection: "column", gap: 10 }}>
                  {["Physician-supervised protocol", "Pharma-grade compounded SS-31", "Mitochondrial labs at 8–12 weeks", "Monthly provider check-ins", "Cold-chain overnight delivery"].map((item) => (
                    <div key={item} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#C9A96E" strokeWidth="1.2"/><path d="M5 8l2 2 4-4" stroke="#C9A96E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      <span style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.8rem", color: "rgba(245,240,232,0.45)" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ ELIGIBILITY QUIZ ══ */}
      <section id="quiz" style={{ background: "#0D0D0D", padding: "clamp(60px,8vw,100px) 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem)" }}>
          <p style={{ ...s.label, marginBottom: 16, textAlign: "center" }}>Eligibility Screening</p>
          <h2 style={{ ...s.h2dk, textAlign: "center", marginBottom: 16 }}>Are you a candidate for S-31Rx?</h2>
          <p style={{ ...s.bodyLt, textAlign: "center", maxWidth: 520, margin: "0 auto 56px" }}>
            This 5-question screen checks for SS-31 protocol contraindications. It takes under 60 seconds and does not constitute a medical evaluation.
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
              <p style={{ ...s.bodyLt }}>Including SS-31 vs. conventional antioxidants and supplements, honest research framing, administration, timeline, and off-label prescribing legality.</p>
              <div style={{ marginTop: 40 }}>
                <img src={IMGS.labs} alt="Mitochondrial research" style={{ width: "100%", borderRadius: 10, objectFit: "cover" }} />
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
            Your mitochondria already<br />know how to produce energy.<br />They just need the right signal.
          </h2>
          <p style={{ ...s.bodyLt, marginBottom: 48, fontSize: "1.0625rem" }}>
            SS-31 is the only therapeutic peptide designed to reach the inner mitochondrial membrane and bind cardiolipin — restoring the cellular energy infrastructure that underlies every system in your body, now available as a physician-supervised protocol.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 20 }}>
            <a href="#quiz" className="btn-gold" style={{ padding: "16px 36px", fontSize: "1rem" }}>Check My Eligibility</a>
            <a href="#research" className="btn-ghost-cream" style={{ padding: "16px 36px", fontSize: "1rem" }}>Review the Research</a>
          </div>
          <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.75rem", color: "rgba(245,240,232,0.25)", lineHeight: 1.6, maxWidth: 560, margin: "0 auto" }}>
            † This page describes off-label use of SS-31 (elamipretide), a compounded peptide. Elamipretide has received FDA Orphan Drug Designation for Barth syndrome and is under active Phase 3 clinical investigation. U.S. use outside approved indications is as a compounded peptide prescribed at the clinical discretion of a licensed physician. This content is for informational purposes only and does not constitute medical advice. Individual results vary. All protocols require physician evaluation and are subject to contraindication screening.
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
                  <span style={{ fontFamily: DM, fontWeight: 500, fontSize: "0.875rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#F5F0E8", display: "block" }}>S-31<span style={{ color: DARK_ORANGE }}>Rx</span></span>
                  <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#8C7B6B" }}>Aurelius Health Group</span>
                </div>
              </div>
              <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.875rem", color: "rgba(245,240,232,0.35)", maxWidth: 240, marginTop: 12, lineHeight: 1.6 }}>Physician-supervised SS-31 protocol for mitochondrial repair, cellular energy restoration, and age-related decline reversal.</p>
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
                <a key={link} href="#" style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.75rem", color: "rgba(245,240,232,0.25)", textDecoration: "none" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "rgba(245,240,232,0.6)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,232,0.25)")}
                >{link}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
