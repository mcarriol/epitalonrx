/* SemaxRx — Standalone Landing Page
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
  hero:   "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1800&q=80",
  cells:  "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=1800&q=80",
  labs:   "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200&q=80",
  energy: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=1200&q=80",
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
    title: "Cognitive Decline & Brain Fog",
    profile: "Professionals and adults 30–65 experiencing memory lapses, reduced focus, mental fatigue, or early cognitive decline who have not responded to lifestyle interventions alone",
    mechanism: "Semax upregulates BDNF (brain-derived neurotrophic factor) and activates TrkB receptors in the hippocampus, enhancing synaptic plasticity, neurogenesis, and memory consolidation at the cellular level.",
    testimonial: "\"The mental clarity I experienced within three weeks was unlike anything I'd tried before. My focus during high-pressure work was completely transformed.\" — D.L., 47, Austin TX",
  },
  {
    icon: "⊕",
    title: "Neurological Recovery & Stroke Rehabilitation",
    profile: "Patients recovering from ischemic stroke, traumatic brain injury, or neurovascular events who need accelerated neurological rehabilitation and functional recovery beyond standard care",
    mechanism: "Semax modulates over 1,500 genes involved in neuroprotection and vascular repair, reduces infarct size through NF-κB suppression, and promotes cerebrovascular angiogenesis to restore blood flow to damaged neural tissue.",
    testimonial: "\"My neurologist was surprised by the speed of my cognitive recovery. Six weeks in, I was back to reading and complex problem-solving.\" — M.R., 58, Seattle WA",
  },
  {
    icon: "◷",
    title: "Attention Dysregulation & Executive Dysfunction",
    profile: "Adults with ADHD, attention difficulties, or executive function impairment whose symptoms limit professional performance and daily function despite behavioral and pharmacological interventions",
    mechanism: "Semax enhances dopaminergic and cholinergic neurotransmission — the two systems most implicated in attention and executive control — while simultaneously modulating GABA pathways to reduce cognitive noise without sedation.",
    testimonial: "\"I went from struggling to complete a single task to managing complex projects with ease. The difference in my executive function was measurable within a month.\" — K.T., 34, Chicago IL",
  },
];

/* ── Pathways (Clinical Evidence) ── */
const pathways = [
  {
    n: "01", title: "BDNF Upregulation & Neuroplasticity",
    body: "Semax significantly increases BDNF expression in the hippocampus and basal forebrain, activating TrkB receptors to drive synaptic strengthening, neurogenesis, and long-term potentiation — the cellular basis of learning and memory.",
    cite: "Dolotov OV et al. J Neurochem. 2006;97(2):486–494.",
    tags: ["BDNF", "TrkB activation", "Neuroplasticity"],
  },
  {
    n: "02", title: "Neuroprotection in Ischemic Injury",
    body: "Semax modulates over 1,500 genes in cerebral ischemia models, reducing infarct volume, suppressing secondary injury cascades, and accelerating neurological recovery. It has demonstrated efficacy in acute stroke treatment in Russian clinical practice.",
    cite: "Medvedeva EV et al. BMC Neurosci. 2014;15:49.",
    tags: ["Stroke recovery", "Infarct reduction", "Gene modulation"],
  },
  {
    n: "03", title: "Dopaminergic & Cholinergic Enhancement",
    body: "Semax enhances dopaminergic signaling in prefrontal circuits governing executive function and motivation, while simultaneously potentiating cholinergic transmission in memory-critical regions — producing broad cognitive enhancement without stimulant side effects.",
    cite: "Eremin KO et al. Bull Exp Biol Med. 2005;140(2):201–204.",
    tags: ["Dopamine", "Acetylcholine", "Executive function"],
  },
  {
    n: "04", title: "Neuroinflammation Suppression",
    body: "Semax downregulates TNF-α, IL-1β, and IL-6 in neural tissue while preserving the neuroprotective inflammatory response. Unlike corticosteroids, it resolves neuroinflammation without impairing the healing cascade or causing immunosuppression.",
    cite: "Filippenkov IB et al. Cells. 2020;9(11):2373.",
    tags: ["TNF-α inhibition", "Neuroinflammation", "Anti-inflammatory"],
  },
  {
    n: "05", title: "Cerebrovascular Protection",
    body: "Semax enhances endothelial function, blood-brain barrier integrity, and cerebral blood flow. It promotes angiogenesis in ischemic regions and protects against oxidative damage — making it uniquely effective for both acute and chronic cerebrovascular conditions.",
    cite: "Tsai SJ. Med Hypotheses. 2007;68(5):1144–1146.",
    tags: ["BBB integrity", "Angiogenesis", "Cerebral blood flow"],
  },
  {
    n: "06", title: "Serotonergic Modulation & Stress Resilience",
    body: "Semax modulates serotonergic pathways to improve mood regulation, stress resilience, and anxiety reduction. It activates GABA system balance to reduce cognitive noise, producing a state of calm, focused clarity without sedation or dependence.",
    cite: "Dolotov OV et al. Neurosci Lett. 2006;404(1–2):78–82.",
    tags: ["Serotonin", "GABA balance", "Stress resilience"],
  },
];

/* ── Condition tag cloud ── */
const conditionTags = [
  "Brain Fog", "Cognitive Decline", "ADHD / Attention", "Stroke Recovery",
  "Traumatic Brain Injury", "Memory Impairment", "Executive Dysfunction", "Neuroinflammation",
  "Anxiety & Stress", "Mood Dysregulation", "Post-COVID Cognitive Symptoms", "Neuropathy",
  "Poor Mental Stamina", "Focus & Concentration", "Neurodegeneration Prevention",
];

/* ── FAQ ── */
const faqs = [
  {
    q: "What is Semax and where does it come from?",
    a: "Semax (Met-Glu-His-Phe-Pro-Gly-Pro) is a synthetic heptapeptide — a chain of 7 amino acids — derived from the N-terminal fragment of adrenocorticotropic hormone (ACTH 4-10). It was developed through systematic peptide modification research in Russia in the 1980s and 1990s, specifically engineered to retain the neuroprotective and cognitive-enhancing properties of ACTH without its hormonal side effects. Semax is approved for clinical use in Russia for stroke and cognitive disorders, and has been used in Russian neurology for over three decades.",
  },
  {
    q: "How does Semax compare to nootropics, stimulants, or antidepressants for cognitive enhancement?",
    a: "Stimulants (Adderall, modafinil) enhance dopamine and norepinephrine acutely but do not repair or strengthen neural circuits — they borrow from tomorrow's capacity. Antidepressants modulate serotonin but rarely improve cognition directly. Semax works differently: it upregulates BDNF, the brain's primary growth factor, driving genuine neuroplasticity and synaptic strengthening. It enhances dopaminergic, cholinergic, and serotonergic systems simultaneously while reducing neuroinflammation — producing durable cognitive improvement rather than temporary stimulation.",
  },
  {
    q: "What does the research actually show? Is this proven in humans?",
    a: "Honest answer: the majority of Semax research is from preclinical models and Russian clinical studies, with limited large-scale Western RCTs as of 2026. However, Semax has been in approved clinical use in Russia for stroke and cerebrovascular insufficiency for over 20 years, providing substantial real-world human safety data. Key published studies include genomic analyses showing modulation of 1,500+ genes in cerebral ischemia models, BDNF upregulation studies in humans, and cognitive enhancement trials. Aurelius protocols are based on the robust preclinical evidence, the Russian clinical approval record, and the known safety profile.",
  },
  {
    q: "How is Semax administered?",
    a: "Semax is most commonly administered intranasally — as nasal drops — at doses of 300–600 mcg per day, typically in the morning. Intranasal delivery provides excellent CNS penetration with rapid onset. Subcutaneous injection is an alternative route for consistent systemic delivery. The peptide arrives lyophilized and is reconstituted with bacteriostatic water. Reconstituted vials are stored refrigerated and used within 30 days. Morning administration is optimal for cognitive benefits, with cycle protocols (e.g., 4–8 weeks on, 2–4 weeks off) recommended to prevent adaptation.",
  },
  {
    q: "How long until I see results?",
    a: "Cognitive enhancement effects — improved focus, mental clarity, and working memory — are often reported within the first 1–2 weeks of consistent use. For neurological recovery applications (stroke, TBI), measurable functional improvement typically occurs at 4–8 weeks. Mood stabilization and stress resilience improvements are commonly reported at 2–4 weeks. Long-term neuroplasticity benefits from BDNF upregulation accumulate over 8–16 weeks of consistent protocol use.",
  },
  {
    q: "Is prescribing Semax off-label legal?",
    a: "Semax is not FDA-approved for any indication in the United States. It is prescribed as a compounded peptide under the clinical judgment of a licensed physician. Off-label prescribing of compounded peptides is legal in the United States when prescribed by a licensed physician who documents clinical rationale and obtains informed consent. Semax has an established clinical safety record from over 20 years of approved use in Russia. Aurelius physicians follow this protocol for every patient.",
  },
];

/* ── Eligibility Quiz ── */
function EligibilityQuiz() {
  const questions = [
    { q: "Do you have any active malignancy (cancer) currently under treatment?", disqualifier: "YES", note: "Active cancer requires physician evaluation before initiating any peptide protocol." },
    { q: "Are you currently pregnant or planning to become pregnant in the next 6 months?", disqualifier: "YES", note: "Semax has not been studied in pregnancy; safety data is insufficient." },
    { q: "Do you have a history of active psychotic disorder or severe psychiatric instability?", disqualifier: "YES", note: "Dopaminergic and serotonergic modulation requires careful psychiatric evaluation in these patients." },
    { q: "Are you currently taking immunosuppressive medications (e.g., tacrolimus, cyclosporine, high-dose steroids)?", disqualifier: "YES", note: "Immunosuppressive therapy may interact with Semax's neuroinflammatory modulation." },
    { q: "Do you experience any of the following: brain fog, memory difficulties, cognitive decline, attention dysregulation, or neurological recovery needs?", disqualifier: "NO", note: "These are the primary indications for SemaxRx protocol consideration." },
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
              <p style={{ ...s.bodyLt, marginBottom: 24 }}>One or more of your answers indicates a condition that may require modification of the standard Semax protocol. Submit your intake and a provider will review your situation within 48 hours.</p>
              <a href="mailto:intake@aureliushealthgroup.com" className="btn-ghost-cream" style={{ display: "inline-flex" }}>Request Physician Review</a>
            </>
          ) : (
            <>
              <p style={{ ...s.label, marginBottom: 12 }}>Eligible — No Contraindications Identified</p>
              <h3 style={{ ...s.h3dk, marginBottom: 12, fontSize: "1.25rem" }}>Based on your responses, you appear to be a candidate for the SemaxRx protocol.</h3>
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

export default function SemaxRx() {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  return (
    <div style={{ background: "#0D0D0D", minHeight: "100vh" }}>
      <Navbar productName="SemaxRx" />

      {/* ══ HERO ══ */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src={IMGS.hero} alt="SemaxRx hero" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,13,13,0.92) 0%, rgba(13,13,13,0.45) 50%, rgba(13,13,13,0.2) 100%)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem) clamp(60px,10vw,100px)", width: "100%" }}>
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
            <a href="https://aureliushealthgroup.com" style={{ ...s.label, color: "rgba(201,169,110,0.6)", textDecoration: "none" }}>Aurelius Health Group</a>
            <span style={{ color: "rgba(201,169,110,0.4)", fontSize: "0.7rem" }}>›</span>
            <span style={{ ...s.label }}>Semax<span style={{ color: DARK_ORANGE }}>Rx</span></span>
          </div>
          <h1 style={{ ...s.h1, maxWidth: 700, marginBottom: 24 }}>
            The neuroprotective peptide<br />your brain was designed<br />to respond to.
          </h1>
          <p style={{ ...s.bodyLt, maxWidth: 480, marginBottom: 16, fontSize: "1.0625rem" }}>
            Semax is derived from ACTH — your body's own stress-response hormone. It amplifies BDNF, sharpens neural circuits, and resolves neuroinflammation — restoring cognitive performance without stimulants, dependence, or hormonal side effects.
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40 }}>
            {["Physician-supervised", "Pharma-grade compounded", "Intranasal delivery"].map((t) => (
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
              { val: "1980s", label: "Developed from ACTH research" },
              { val: "7 AA", label: "Heptapeptide structure" },
              { val: "20+ yrs", label: "Clinical use in Russia" },
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
            <h2 style={{ ...s.h2lt }}>Three signs your brain's repair system is falling behind</h2>
            <p style={{ ...s.body, paddingTop: 8 }}>
              Semax is the most studied neuroprotective peptide in Russian clinical medicine. Its effects span cognitive enhancement, neurological recovery, and neuroinflammation resolution. These three presentations are the most common clinical indications for Semax protocol consideration.
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
                  <p style={{ ...s.label, color: "#8C7B6B", marginBottom: 6 }}>Semax Mechanism</p>
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
              <h2 style={{ ...s.h2dk, marginBottom: 32 }}>A peptide derived from the body's own adrenocorticotropic hormone.</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                {[
                  { label: "Origin", text: "Semax is a synthetic analogue of a 7-amino-acid sequence derived from the N-terminal fragment of ACTH (4-10). It was developed by Russian researchers at the Institute of Molecular Genetics in the 1980s, specifically engineered to retain neuroprotective and cognitive-enhancing properties without the hormonal effects of native ACTH." },
                  { label: "Classification", text: "Semax is a heptapeptide — a stable, intranasally active peptide with exceptional CNS penetration. It belongs to a class of neuroprotective peptides with pleiotropic effects across neurotransmitter systems, gene expression regulation, and cerebrovascular protection." },
                  { label: "Physiologic Role", text: "Semax upregulates BDNF and TrkB signaling, enhances dopaminergic and cholinergic neurotransmission, suppresses neuroinflammatory cytokines, and promotes cerebrovascular angiogenesis — making it uniquely effective across cognitive, neurological, and psychiatric applications." },
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
              <p style={{ ...s.label, marginBottom: 20 }}>Semax Neurological Cascade</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {[
                  { node: "Semax", sub: "Heptapeptide derived from ACTH 4-10 (7 amino acids)", color: "#C9A96E" },
                  { node: "BDNF & TrkB Activation", sub: "Brain-derived neurotrophic factor ↑ → synaptic plasticity + neurogenesis", color: "#B8956A" },
                  { node: "Neurotransmitter Optimization", sub: "Dopamine ↑, Acetylcholine ↑, Serotonin ↑ → focus, memory, mood", color: "#A07A55" },
                  { node: "Neuroinflammation Suppression", sub: "TNF-α ↓, IL-1β ↓, IL-6 ↓ → inflammation resolved without healing impairment", color: "#8C6845" },
                  { node: "Cognitive & Neural Restoration", sub: "Memory consolidation, executive function, neuroprotection, cerebrovascular repair", color: "#785535" },
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
                  {["", "Semax", "Stimulants", "Antidepressants", "Racetams", "Cholinesterase Inhibitors"].map((h, i) => (
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
                  ["Primary action", "Neuroprotection + cognition", "Dopamine/NE release", "Serotonin modulation", "Membrane fluidity", "Acetylcholine preservation"],
                  ["Promotes neuroplasticity", "✓ BDNF upregulation", "✗ No", "Partial (chronic)", "Partial", "✗ No"],
                  ["Neuroprotection", "✓ Gene modulation", "✗ Neurotoxic risk", "✗ No", "✗ No", "Partial"],
                  ["Neuroinflammation", "✓ TNF-α/IL-6 ↓", "✗ No effect", "Partial", "✗ No", "✗ No"],
                  ["Dependence risk", "✓ None reported", "✗ High", "✗ Discontinuation", "✓ Low", "✓ Low"],
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
              ["Primary action",          "Neuroprotection + cognition",  "Dopamine/NE release",   "Serotonin modulation",  "Membrane fluidity",  "Acetylcholine preservation"],
              ["Promotes neuroplasticity", "✓ BDNF upregulation",          "✗ No",                  "Partial (chronic)",     "Partial",            "✗ No"],
              ["Neuroprotection",          "✓ Gene modulation",            "✗ Neurotoxic risk",     "✗ No",                  "✗ No",               "Partial"],
              ["Neuroinflammation",        "✓ TNF-α/IL-6 ↓",              "✗ No effect",           "Partial",               "✗ No",               "✗ No"],
              ["Dependence risk",          "✓ None reported",              "✗ High",                "✗ Discontinuation",     "✓ Low",              "✓ Low"],
            ] as string[][]).map((row, ri) => {
              const cols = ["Semax", "Stimulants", "Antidepressants", "Racetams", "Cholinesterase Inhibitors"];
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
          <div className="two-col-header" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 60, alignItems: "start", marginBottom: 56 }}>
            <h2 style={{ ...s.h2lt }}>Discover Peptides</h2>
            <p style={{ ...s.body, paddingTop: 8 }}>Explore the full range of physician-supervised peptide protocols available through Aurelius Health Group — each designed around peer-reviewed evidence, pharma-grade compounds, and measurable outcomes.</p>
          </div>

          {/* 4-card grid */}
          <div className="four-col-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24, marginBottom: 48 }}>
{[
              {
                name: "SemaxRx",
                nameSuffix: "Rx",
                nameBase: "Semax",
                tag: "Neuroprotection",
                desc: "The ACTH-derived heptapeptide that upregulates BDNF, sharpens neural circuits, and resolves neuroinflammation — restoring cognitive performance without stimulants, dependence, or hormonal side effects.",
                href: "#quiz",
                featured: true,
              },
              {
                name: "BPC-157",
                nameSuffix: "",
                nameBase: "BPC-157",
                tag: "Tissue Repair",
                desc: "The only healing peptide derived from the body's own gastric protection system. Accelerates tendon, muscle, and gut repair by upregulating growth factors, driving angiogenesis, and resolving inflammation.",
                href: "https://aureliushealthgroup.com/bpc-157rx",
                featured: false,
              },
              {
                name: "MOTS-c",
                nameSuffix: "",
                nameBase: "MOTS-c",
                tag: "Mitochondrial Health",
                desc: "The first peptide encoded in mitochondrial DNA. Activates AMPK — the master metabolic switch — restoring cellular energy, insulin sensitivity, and longevity signaling from the source.",
                href: "https://aureliushealthgroup.com/mitochondrial",
                featured: false,
              },
              {
                name: "Tesamorelin",
                nameSuffix: "",
                nameBase: "Tesamorelin",
                tag: "Visceral Fat",
                desc: "An FDA-studied GHRH analogue that reduces visceral adipose tissue and improves metabolic markers. The only peptide with Phase 3 RCT data for abdominal fat reduction.",
                href: "https://aureliushealthgroup.com/tesamorelin",
                featured: false,
              },
            ].map((peptide) => (
              <div key={peptide.name} className="peptide-card" style={{
                background: peptide.featured ? "#1A1208" : "#0D0D0D",
                borderRadius: 12,
                padding: "32px 28px",
                display: "flex",
                flexDirection: "column",
                gap: 16,
                border: peptide.featured ? "1.5px solid rgba(201,169,110,0.5)" : "1px solid rgba(201,169,110,0.12)",
                transition: "border-color 0.25s, transform 0.25s",
                position: "relative" as const,
              }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(201,169,110,0.7)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = peptide.featured ? "rgba(201,169,110,0.5)" : "rgba(201,169,110,0.12)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
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
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginTop: peptide.featured ? 8 : 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <h3 style={{ ...s.h3dk, fontSize: "1.0625rem", margin: 0 }}>
                      {peptide.featured
                        ? <>{peptide.nameBase}<span style={{ color: DARK_ORANGE }}>{peptide.nameSuffix}</span></>
                        : peptide.name
                      }
                    </h3>
                  </div>
                  <span style={{
                    fontFamily: DM, fontWeight: 500, fontSize: "0.65rem",
                    letterSpacing: "0.1em", textTransform: "uppercase" as const,
                    color: "#C9A96E", background: "rgba(201,169,110,0.1)",
                    border: "1px solid rgba(201,169,110,0.25)",
                    borderRadius: 4, padding: "4px 8px", whiteSpace: "nowrap" as const,
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
                    background: peptide.featured ? "#C9A96E" : "rgba(201,169,110,0.15)",
                    color: peptide.featured ? "#0D0D0D" : "#C9A96E",
                    border: peptide.featured ? "none" : "1px solid rgba(201,169,110,0.3)",
                    transition: "background 0.2s",
                    marginTop: "auto",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = peptide.featured ? "#B8956A" : "rgba(201,169,110,0.25)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = peptide.featured ? "#C9A96E" : "rgba(201,169,110,0.15)";
                  }}
                >
                  {peptide.featured ? "Check My Eligibility" : "Get Started"}
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
            <h2 style={{ ...s.h2lt }}>Six evidence-backed neurological pathways</h2>
            <p style={{ ...s.body, paddingTop: 8 }}>Each pathway is supported by peer-reviewed preclinical research and over two decades of Russian clinical experience. We include honest framing on human vs. animal data — because you deserve to know exactly what the evidence shows.</p>
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
                  <strong style={{ color: "#1A1A1A" }}>{activeTag}</strong> — Semax addresses this condition through its multi-pathway neurological cascade: BDNF upregulation, neurotransmitter optimization, neuroinflammation suppression, and cerebrovascular protection. Speak with a physician to understand how this applies to your specific case.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ══ CELLS IMAGE BREAK ══ */}
      <section style={{ background: "#0D0D0D", padding: 0 }}>
        <div style={{ position: "relative", maxHeight: 500, overflow: "hidden" }}>
          <img src={IMGS.cells} alt="Neural tissue" style={{ width: "100%", objectFit: "cover", objectPosition: "center", display: "block" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(13,13,13,0.85) 0%, transparent 40%, transparent 60%, rgba(13,13,13,0.85) 100%)" }} />
          <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", textAlign: "center", width: "100%", padding: "0 1.25rem" }}>
            <p style={{ ...s.label, marginBottom: 8 }}>ACTH Origin</p>
            <p style={{ fontFamily: DM, fontWeight: 300, fontSize: "clamp(1.1rem, 2.5vw, 2rem)", color: "#F5F0E8", letterSpacing: "-0.02em" }}>The only cognitive peptide derived from the body's own stress-response and neuroprotection system</p>
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
                items: ["Comprehensive health questionnaire", "Cognitive symptom mapping", "Medication and supplement review", "Physician review within 48 hours", "Contraindication screening"],
              },
              {
                n: "2", title: "Baseline Labs", tag: "Required",
                items: ["CBC with differential", "Comprehensive metabolic panel (CMP)", "Thyroid panel (TSH, free T3/T4)", "Liver function panel", "Neurological symptom scoring", "Cognitive baseline assessment"],
              },
              {
                n: "3", title: "Protocol Initiation", tag: "Week 1",
                items: ["Semax 300–600 mcg compounded, lyophilized", "Bacteriostatic water + sterile supplies shipped", "Cold-packed, overnight delivery", "Nurse onboarding session (video)", "Intranasal administration certification"],
              },
              {
                n: "4", title: "Monitoring & Optimization", tag: "Ongoing",
                items: ["Monthly provider check-ins", "Labs repeated at 8–12 weeks", "Cognitive outcome assessment", "Protocol adjustment based on response", "Ongoing direct messaging support"],
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
              <h2 style={{ ...s.h2lt, marginBottom: 20 }}>Neurological medicine pricing. Without the clinic markup.</h2>
              <p style={{ ...s.body, marginBottom: 24 }}>
                Neurology and cognitive medicine clinics typically charge $400–$800 per consultation, $200–$400 per follow-up, and $300–$600/month for compounded peptides — billed separately. Aurelius bundles physician oversight, labs, compound, and monitoring into one monthly plan.
              </p>
              <div style={{ background: "rgba(201,169,110,0.06)", border: "1px solid rgba(201,169,110,0.15)", borderRadius: 8, padding: "20px 24px", marginBottom: 28 }}>
                <p style={{ fontFamily: DM, fontWeight: 500, fontSize: "0.875rem", color: "#1A1A1A", marginBottom: 8 }}>Typical cognitive medicine cost breakdown:</p>
                {[
                  ["Initial neurology consult", "$400–$800"],
                  ["Comprehensive lab panel", "$300–$600"],
                  ["Monthly compound cost", "$300–$600"],
                  ["Monthly follow-up visits", "$200–$400"],
                  ["Total first month", "$1,200–$2,400"],
                ].map(([item, cost]) => (
                  <div key={item} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid rgba(13,13,13,0.06)" }}>
                    <span style={{ ...s.bodySm }}>{item}</span>
                    <span style={{ fontFamily: DM, fontWeight: 500, fontSize: "0.875rem", color: "#8C6845" }}>{cost}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {["Physician consultation included", "Full lab panel included", "Pharma-grade Semax included", "Nurse onboarding included", "Monthly check-ins included", "No hidden fees"].map((item) => (
                  <div key={item} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#C9A96E" strokeWidth="1.2"/><path d="M5 8l2 2 4-4" stroke="#C9A96E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span style={{ ...s.bodySm }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ background: "#0D0D0D", borderRadius: 12, padding: "clamp(32px,5vw,48px) clamp(24px,4vw,40px)", textAlign: "center", border: "1px solid rgba(201,169,110,0.15)" }}>
                <p style={{ ...s.label, marginBottom: 12 }}>SemaxRx Plan</p>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: 4, marginBottom: 8 }}>
                  <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "1.25rem", color: "#C9A96E", marginTop: 10 }}>$</span>
                  <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "clamp(3.5rem,8vw,5rem)", lineHeight: 1, letterSpacing: "-0.04em", color: "#F5F0E8" }}>249</span>
                  <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "1rem", color: "rgba(245,240,232,0.4)", marginTop: 16 }}>/mo</span>
                </div>
                <p style={{ ...s.bodyLt, fontSize: "0.8rem", marginBottom: 32 }}>vs. $1,200–$2,400/mo at a cognitive medicine clinic</p>
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
          <h2 style={{ ...s.h2dk, textAlign: "center", marginBottom: 16 }}>Are you a candidate for SemaxRx?</h2>
          <p style={{ ...s.bodyLt, textAlign: "center", maxWidth: 520, margin: "0 auto 56px" }}>
            This 5-question screen checks for Semax protocol contraindications. It takes under 60 seconds and does not constitute a medical evaluation.
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
              <p style={{ ...s.bodyLt }}>Including Semax vs. stimulants and antidepressants, honest research framing, administration, timeline, and off-label prescribing legality.</p>
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
            Your brain already knows<br />how to heal. It just needs<br />the right signal.
          </h2>
          <p style={{ ...s.bodyLt, marginBottom: 48, fontSize: "1.0625rem" }}>
            Semax is the peptide your body produces naturally to protect and repair neural tissue — now available as a physician-supervised protocol designed for the cognitive and neurological conditions that haven't responded to anything else.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 20 }}>
            <a href="#quiz" className="btn-gold" style={{ padding: "16px 36px", fontSize: "1rem" }}>Check My Eligibility</a>
            <a href="#research" className="btn-ghost-cream" style={{ padding: "16px 36px", fontSize: "1rem" }}>Review the Research</a>
          </div>
          <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.75rem", color: "rgba(245,240,232,0.25)", lineHeight: 1.6, maxWidth: 560, margin: "0 auto" }}>
            † This page describes off-label use of Semax, a compounded peptide not approved by the FDA for any indication. Off-label prescribing of compounded peptides is legal and at the clinical discretion of a licensed physician. This content is for informational purposes only and does not constitute medical advice. Individual results vary. All protocols require physician evaluation and are subject to contraindication screening.
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
                  <span style={{ fontFamily: DM, fontWeight: 500, fontSize: "0.875rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#F5F0E8", display: "block" }}>Semax<span style={{ color: DARK_ORANGE }}>Rx</span></span>
                  <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#8C7B6B" }}>Aurelius Health Group</span>
                </div>
              </div>
              <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.875rem", color: "rgba(245,240,232,0.35)", maxWidth: 220, marginTop: 12, lineHeight: 1.6 }}>Physician-supervised Semax protocol for cognitive enhancement, neuroprotection, and neurological recovery.</p>
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
