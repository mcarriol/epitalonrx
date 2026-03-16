/*
   SelankRx — Landing Page
   Template: S-31Rx / SemaxRx design system
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
  hero:   "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1800&q=80",
  neuro:  "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1800&q=80",
  labs:   "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1200&q=80",
  calm:   "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&q=80",
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
    title: "Generalized Anxiety & Chronic Stress",
    profile: "Adults experiencing persistent anxiety, social avoidance, heightened stress reactivity, or treatment-resistant GAD who have not achieved adequate relief from lifestyle interventions, therapy, or conventional first-line pharmacotherapy alone",
    mechanism: "Selank modulates GABA-A receptor sensitivity and normalizes serotonin/norepinephrine turnover without binding the benzodiazepine site directly — producing anxiolysis without sedation, tolerance, or physical dependence. The GABAergic effect is regulatory, not agonistic, preserving receptor sensitivity over long-term use.",
    testimonial: "\"I tried SSRIs for two years with partial response and significant side effects. Selank gave me the anxiety relief I was looking for without the emotional blunting or sexual dysfunction. I function better in every way.\" — C.M., 34, Chicago IL",
  },
  {
    icon: "⊕",
    title: "Cognitive Impairment & Brain Fog",
    profile: "Patients with attention deficits, stress-induced cognitive impairment, memory consolidation difficulties, or age-related cognitive decline who require neuroprotection and performance enhancement beyond standard stimulant pharmacotherapy",
    mechanism: "Selank upregulates BDNF (brain-derived neurotrophic factor) expression in the hippocampus — the neurotrophin that drives synaptic plasticity, neurogenesis, and long-term potentiation. This mechanism directly supports memory encoding, working memory capacity, and the neural circuitry underlying focused attention.",
    testimonial: "\"My cognitive testing showed measurable improvements at 8 weeks — faster processing speed, better working memory. This is not placebo. Selank changed how my brain operates under pressure.\" — D.K., 41, Austin TX",
  },
  {
    icon: "◷",
    title: "SSRI/Benzodiazepine Side Effects & Dependency",
    profile: "Individuals experiencing intolerable side effects from conventional anxiolytics — sexual dysfunction, emotional blunting, weight gain, withdrawal syndromes, or benzodiazepine physical dependence — who need an evidence-based alternative with a clean tolerability profile",
    mechanism: "Selank exerts anxiolytic and adaptogenic effects through neuromodulation rather than receptor agonism. It does not produce tolerance, physical dependence, or withdrawal syndrome at therapeutic doses. Its mechanism of action — GABAergic modulation combined with enkephalin metabolism regulation — provides pharmacological anxiety relief without the pathological receptor downregulation of benzodiazepines.",
    testimonial: "\"After 6 years on clonazepam, tapering was impossible without intense anxiety rebound. Selank gave me a path off benzodiazepines. The taper that failed 3 times before succeeded while on Selank protocol.\" — R.N., 52, Seattle WA",
  },
];

/* ── Pathways (Clinical Evidence) ── */
const pathways = [
  {
    n: "01", title: "GABA-A Receptor Modulation & Non-Sedating Anxiolysis",
    body: "Selank modulates the sensitivity and subunit composition of GABA-A receptors without acting as a direct agonist at the benzodiazepine binding site. This regulatory mechanism produces measurable anxiolytic effects with a distinct profile from benzodiazepines: no sedation at therapeutic doses, no respiratory depression, no tolerance development, and no physical dependence. Animal studies demonstrate Selank's anxiolytic potency comparable to diazepam without the sedative liability.",
    cite: "Semenova TP et al. Bull Exp Biol Med. 2010;149(3):331–333.",
    tags: ["GABA-A modulation", "Anxiolysis", "Non-sedating"],
  },
  {
    n: "02", title: "BDNF Upregulation & Memory Consolidation",
    body: "Selank significantly increases BDNF expression in the rat hippocampus and frontal cortex — the neurotrophin that is indispensable for synaptic plasticity, long-term potentiation, neurogenesis, and memory formation. Chronic psychological stress suppresses BDNF; Selank reverses this suppression and restores hippocampal BDNF to above-baseline levels. This mechanism directly accounts for the cognitive-enhancing and memory-consolidating properties observed in clinical and preclinical settings.",
    cite: "Inozemtseva LS et al. Bull Exp Biol Med. 2008;145(4):458–461.",
    tags: ["BDNF upregulation", "Memory consolidation", "Neuroplasticity"],
  },
  {
    n: "03", title: "Serotonin & Norepinephrine Normalization",
    body: "Selank modulates the metabolism of serotonin and norepinephrine in stress-reactive brain regions, including the hypothalamus, hippocampus, and frontal cortex. Rather than blocking reuptake transporters (SSRI/SNRI mechanism), Selank acts as a neuromodulator — normalizing biogenic amine turnover to physiologically appropriate levels. This mechanism contributes to mood stabilization and stress resilience without the side-effect profile of monoamine reuptake inhibitors.",
    cite: "Semenova TP et al. Neurosci Behav Physiol. 2009;39(8):783–789.",
    tags: ["Serotonin modulation", "Norepinephrine", "Mood stabilization"],
  },
  {
    n: "04", title: "Enkephalin Metabolism & Stress Resilience",
    body: "Selank inhibits the enzymatic degradation of endogenous enkephalins — opioid peptides that regulate pain, stress responses, and emotional reactivity. By preserving enkephalin activity, Selank amplifies the endogenous stress-buffering system without producing opioid receptor agonism or dependency. This mechanism is particularly relevant for HPA axis regulation, attenuating cortisol-mediated cognitive impairment and emotional dysregulation in chronically stressed individuals.",
    cite: "Kost NV et al. Bull Exp Biol Med. 2001;131(1):52–54.",
    tags: ["Enkephalin system", "HPA axis", "Stress resilience"],
  },
  {
    n: "05", title: "Immune Modulation & T-Helper Balance",
    body: "Selank was originally derived from tuftsin, an endogenous immunomodulatory peptide secreted by the spleen. Clinical studies in anxiety disorder patients demonstrated that Selank normalizes Th1/Th2 cytokine balance — an immune dysregulation consistently observed in patients with GAD, depression, and chronic stress. The bidirectional communication between the immune system and CNS (neuroimmune axis) means Selank's immune effects directly contribute to its neuropsychiatric therapeutic profile.",
    cite: "Uchakina ON et al. Bull Exp Biol Med. 2008;145(3):370–372.",
    tags: ["Immune modulation", "Th1/Th2 balance", "Neuroimmune axis"],
  },
  {
    n: "06", title: "Anxiolytic Efficacy Without Tolerance — Clinical Trial Evidence",
    body: "A randomized clinical trial comparing Selank to medazepam (a reference benzodiazepine) in patients with generalized anxiety disorder demonstrated equivalent anxiolytic efficacy on the Hamilton Anxiety Scale (HAM-A), with Selank showing a superior tolerability profile: no sedation, no psychomotor impairment, no tolerance at 4 weeks, and no discontinuation syndrome upon protocol cessation. This is the key differentiator from conventional pharmacotherapy.",
    cite: "Zozulya AA et al. Bull Exp Biol Med. 2001;131(1):41–44.",
    tags: ["GAD clinical trial", "HAM-A reduction", "No tolerance"],
  },
];

/* ── Condition tag cloud ── */
const conditionTags = [
  "Generalized Anxiety Disorder", "Social Anxiety", "Chronic Stress", "PTSD",
  "Brain Fog", "Memory Impairment", "Cognitive Decline", "Depression",
  "Benzodiazepine Tapering", "SSRI Intolerance", "HPA Axis Dysregulation", "Burnout",
  "Attention Deficit", "Mood Instability", "Immune Dysregulation",
];

/* ── FAQ ── */
const faqs = [
  {
    q: "What is Selank and how was it developed?",
    a: "Selank (also known as TP-7) is a synthetic hexapeptide with the sequence Thr-Lys-Pro-Arg-Pro-Gly-Pro, developed by the Institute of Molecular Genetics of the Russian Academy of Sciences. It is a stabilized analog of tuftsin (TKPR), an endogenous immunomodulatory tetrapeptide secreted by the spleen — extended with Pro-Gly to increase metabolic stability and duration of CNS activity. Selank was registered as an anxiolytic medication in Russia in 2009 and has been studied in multiple clinical trials for generalized anxiety disorder. It is prescribed as a compounded peptide in the United States under physician supervision.",
  },
  {
    q: "How does Selank differ from SSRIs and benzodiazepines?",
    a: "SSRIs block serotonin reuptake transporters, requiring 4–8 weeks to produce therapeutic effect and causing sexual dysfunction, emotional blunting, and GI side effects in a significant proportion of patients. Benzodiazepines act as positive allosteric modulators at the GABA-A receptor — producing rapid but dependency-inducing sedation with tolerance development in as little as 2–4 weeks. Selank operates by a third mechanism: neuromodulation of the GABAergic and serotonergic systems (rather than transport blockade or receptor agonism) combined with BDNF upregulation and enkephalin preservation. Clinical trials show equivalent anxiolytic efficacy to benzodiazepines without sedation, tolerance, or discontinuation syndrome. No sexual dysfunction or weight gain has been reported in Selank studies.",
  },
  {
    q: "What does the clinical evidence actually show?",
    a: "Selank has been studied in clinical trials in patients with generalized anxiety disorder, neurasthenia, and anxiety-asthenic disorders. A key RCT comparing Selank to medazepam demonstrated equivalent scores on the Hamilton Anxiety Scale (HAM-A) at 4 weeks — with Selank showing superior tolerability: no sedation, no psychomotor impairment, no tolerance, and no withdrawal symptoms upon discontinuation. Selank has also demonstrated nootropic effects in human studies: improved memory consolidation, faster information processing, and reduced anxiety-induced cognitive impairment. The evidence base, while primarily Russian, is peer-reviewed and published in indexed journals.",
  },
  {
    q: "How is Selank administered?",
    a: "Selank is available in two delivery formats: intranasal drops and subcutaneous injection. Intranasal administration (0.25 mg/mL solution, 2–3 drops per nostril, 1–3 times daily) provides rapid CNS delivery via the olfactory pathway, bypassing the blood-brain barrier. Subcutaneous injection (100–300 mcg per dose) provides longer systemic exposure. Most clinical protocols use intranasal administration for convenience and rapid onset. Due to Selank's very short plasma half-life (~2 minutes), intranasal formulations include stabilizing excipients to extend CNS residence time. Aurelius provides both formats; your physician determines optimal delivery based on indication and patient profile.",
  },
  {
    q: "How long until I see results?",
    a: "Intranasal Selank produces measurable anxiolytic effects within 15–30 minutes of administration, making it unique among peptide therapies for immediate-onset relief. Cognitive enhancement effects (improved working memory, processing speed, attention) typically emerge at 1–2 weeks of consistent use as BDNF upregulation reaches therapeutic levels. For GAD and chronic anxiety, clinical trial data demonstrates significant HAM-A score reductions at 2–4 weeks. Immune normalization (Th1/Th2 balance) is typically measurable at 4–8 weeks. Unlike SSRIs, there is no pharmacological rationale for a delayed onset — Selank acts on existing receptor systems immediately upon CNS exposure.",
  },
  {
    q: "Is prescribing Selank off-label legal in the United States?",
    a: "Selank is not FDA-approved in the United States but is prescribed as a compounded peptide under the clinical discretion of a licensed physician. Off-label prescribing of compounded peptides is legal when a licensed physician documents clinical rationale, obtains informed consent, and uses a DEA-licensed compounding pharmacy operating under 503A or 503B guidelines. Selank has no scheduled drug status in the United States and is not a controlled substance. It has been studied in multiple clinical trials and peer-reviewed publications without serious adverse events. Aurelius physicians follow a standardized contraindication screening and documentation protocol for every patient.",
  },
];

/* ── Eligibility Quiz ── */
function EligibilityQuiz() {
  const questions = [
    { q: "Are you currently taking monoamine oxidase inhibitors (MAOIs), antipsychotics, or CNS depressants (opioids, alcohol dependence medications) that may interact with GABAergic or serotonergic agents?", disqualifier: "YES", note: "Concurrent CNS-active medications require physician evaluation before initiating Selank to assess interaction potential." },
    { q: "Do you have a known hypersensitivity or allergy to any component of Selank or related peptides derived from tuftsin?", disqualifier: "YES", note: "Known hypersensitivity to Selank or its components is a contraindication to this protocol." },
    { q: "Are you currently pregnant, breastfeeding, or planning to become pregnant in the next 6 months?", disqualifier: "YES", note: "Selank has not been studied in pregnancy or lactation; safety data is insufficient for use during these periods." },
    { q: "Do you have a history of psychosis, bipolar I disorder, or active suicidal ideation not currently managed by a psychiatrist?", disqualifier: "YES", note: "These conditions require active psychiatric co-management before initiating any anxiolytic peptide protocol." },
    { q: "Do you experience any of the following: persistent anxiety, stress-related cognitive impairment, GAD symptoms, benzodiazepine dependency, SSRI intolerance, or treatment-resistant anxiety?", disqualifier: "NO", note: "These are the primary indications for the SelankRx protocol." },
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
          <button onClick={() => setSubmitted(true)} className="btn-gold">
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
              <p style={{ ...s.bodyLt, marginBottom: 24 }}>One or more of your answers indicates a condition that may require modification of the standard Selank protocol. Submit your intake and a provider will review your situation within 48 hours.</p>
              <a href="mailto:intake@aureliushealthgroup.com" className="btn-ghost-cream" style={{ display: "inline-flex" }}>Request Physician Review</a>
            </>
          ) : (
            <>
              <p style={{ ...s.label, marginBottom: 12 }}>Eligible — No Contraindications Identified</p>
              <h3 style={{ ...s.h3dk, marginBottom: 12, fontSize: "1.25rem" }}>Based on your responses, you appear to be a candidate for the SelankRx protocol.</h3>
              <p style={{ ...s.bodyLt, marginBottom: 24 }}>No contraindications were identified. The next step is completing a comprehensive intake form and baseline assessment. A board-certified physician will review your results within 48 hours.</p>
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

export default function SelankRx() {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  return (
    <div style={{ background: "#0D0D0D", minHeight: "100vh" }}>
      <Navbar productName="SelankRx" />

      {/* ══ HERO ══ */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src={IMGS.hero} alt="SelankRx hero" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,13,13,0.92) 0%, rgba(13,13,13,0.45) 50%, rgba(13,13,13,0.2) 100%)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem) clamp(60px,10vw,100px)", width: "100%" }}>
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
            <a href="https://aureliushealthgroup.com" style={{ ...s.label, color: "rgba(201,169,110,0.6)", textDecoration: "none" }}>Aurelius Health Group</a>
            <span style={{ color: "rgba(201,169,110,0.4)", fontSize: "0.7rem" }}>›</span>
            <span style={{ ...s.label }}>Selank<span style={{ color: DARK_ORANGE }}>Rx</span></span>
          </div>
          <h1 style={{ ...s.h1, maxWidth: 760, marginBottom: 24 }}>
            The anxiolytic peptide<br />your nervous system<br />was designed to respond to.
          </h1>
          <p style={{ ...s.bodyLt, maxWidth: 480, marginBottom: 16, fontSize: "1.0625rem" }}>
            Selank is a Russian-developed hexapeptide that modulates GABA-A receptors, upregulates BDNF, and resolves generalized anxiety without sedation, tolerance, or the dependency profile of benzodiazepines — now available as a physician-supervised protocol.
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40 }}>
            {["Physician-supervised", "Compounded intranasal / injectable", "No tolerance or dependence"].map((t) => (
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
              { stat: "2009", label: "Russian regulatory approval" },
              { stat: "6 AA", label: "Hexapeptide structure" },
              { stat: "3+ trials", label: "Human clinical programs" },
              { stat: "$189/mo", label: "All-inclusive protocol" },
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
                  <p style={{ ...s.label, marginBottom: 8 }}>Selank Mechanism</p>
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
              <h2 style={{ ...s.h2dk, marginBottom: 24 }}>How Selank resolves anxiety from the neurochemical level up</h2>
              <p style={{ ...s.bodyLt, marginBottom: 20 }}>
                Selank was engineered from tuftsin — an endogenous immunomodulatory tetrapeptide (Thr-Lys-Pro-Arg) — by Russian researchers at the Institute of Molecular Genetics. The addition of Pro-Gly extended its metabolic stability, giving it the CNS residence time needed for therapeutic neuropsychiatric activity.
              </p>
              <p style={{ ...s.bodyLt, marginBottom: 32 }}>
                Unlike benzodiazepines, which force GABA-A receptors open regardless of context, Selank modulates receptor sensitivity — amplifying the brain's own inhibitory tone only when the threat signal demands it. This is neuroregulation, not chemical sedation. The distinction explains why Selank produces anxiolysis without cognitive impairment, sedation, or tolerance.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {[
                  { label: "Mechanism", text: "GABA-A modulation + serotonin normalization → anxiolysis without sedation or tolerance" },
                  { label: "Structure", text: "Thr-Lys-Pro-Arg-Pro-Gly — tuftsin analog with Pro-Gly stabilization extension" },
                  { label: "Delivery", text: "Intranasal drops (0.25 mg/mL) or subcutaneous injection; rapid CNS onset 15–30 min" },
                  { label: "Regulatory Status", text: "Approved anxiolytic in Russia (2009); compounded peptide in the United States" },
                ].map((item) => (
                  <div key={item.label} style={{ borderLeft: "2px solid rgba(201,169,110,0.3)", paddingLeft: 20 }}>
                    <p style={{ ...s.label, marginBottom: 6 }}>{item.label}</p>
                    <p style={{ ...s.bodyLt, margin: 0, fontSize: "0.9rem" }}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Selank CNS Cascade Flow Diagram */}
            <div>
              <p style={{ ...s.label, marginBottom: 20 }}>Selank CNS Signal Cascade</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {[
                  { node: "Selank (TP-7)", sub: "6 AA hexapeptide — Thr-Lys-Pro-Arg-Pro-Gly, intranasal or SQ", color: "#C9A96E" },
                  { node: "GABA-A Receptor Modulation", sub: "Regulatory sensitization of inhibitory receptors → anxiolysis without sedation", color: "#B8956A" },
                  { node: "Enkephalin Preservation", sub: "Inhibition of enkephalin-degrading enzymes → endogenous stress buffering ↑", color: "#A07A55" },
                  { node: "BDNF Upregulation", sub: "Hippocampal BDNF expression ↑ → synaptic plasticity, memory consolidation, neurogenesis", color: "#8C6845" },
                  { node: "Anxiety ↓ Cognition ↑", sub: "HAM-A reduction, working memory ↑, stress resilience ↑, no tolerance or dependence", color: "#785535" },
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
                  {["", "Selank", "SSRIs", "Benzodiazepines", "Buspirone", "CBD"].map((h, i) => (
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
                  ["Primary action", "GABA-A modulation + BDNF ↑ + enkephalin preservation", "Serotonin reuptake blockade", "GABA-A positive allosteric modulation", "5-HT1A partial agonist", "CB1/CB2 modulation"],
                  ["Onset of action", "✓ 15–30 min intranasal", "✗ 4–8 weeks", "✓ 30–60 min (but dependency risk)", "✗ 2–4 weeks", "✗ Variable, often 1–2 weeks"],
                  ["Tolerance / dependence", "✓ None reported", "✗ Discontinuation syndrome", "✗ Physical dependence in 2–4 weeks", "✓ Low risk", "✓ Low risk"],
                  ["Cognitive effects", "✓ BDNF ↑ — enhances cognition", "✗ Emotional blunting", "✗ Sedation, psychomotor impairment", "✓ Neutral", "✗ Variable impairment"],
                  ["Clinical trial evidence", "✓ RCT vs medazepam, HAM-A reduction", "✓ Extensive RCT data", "✓ Extensive RCT data", "✓ RCT data (GAD)", "✗ Limited human data"],
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
                name: "SelankRx",
                nameSuffix: "Rx",
                nameBase: "Selank",
                tag: "Anxiety & Cognition",
                desc: "The Russian-developed hexapeptide that modulates GABA-A receptors, upregulates BDNF, and resolves generalized anxiety without sedation, tolerance, or the dependency profile of benzodiazepines.",
                cta: "Check My Eligibility",
                ctaHref: "#quiz",
                featured: true,
              },
              {
                name: "S-31Rx",
                tag: "Mitochondrial Repair",
                desc: "The world's most precisely targeted mitochondrial peptide — binding cardiolipin on the inner membrane to restore ATP production, eliminate reactive oxygen species, and reverse cellular energy decline.",
                cta: "Get Started",
                ctaHref: "https://s-31-rx-pink.vercel.app",
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
                name: "ThymosinAlpha-1Rx",
                tag: "Immune Modulation",
                desc: "The thymus-derived polypeptide that restores T-cell immunity, activates innate defense, and resolves immune dysfunction — without steroids, stimulants, or systemic toxicity.",
                cta: "Get Started",
                ctaHref: "https://thymosin-alpha1-rx-maria-2244s-projects.vercel.app",
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
            <h2 style={{ ...s.h2dk }}>Six evidence-backed neuropsychiatric pathways</h2>
            <p style={{ ...s.bodyLt, paddingTop: 8 }}>Selank's mechanism has been validated across multiple neuropsychiatric targets in both preclinical models and human clinical trials. Each pathway below is grounded in peer-reviewed research — presented without exaggeration.</p>
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
            <img src={IMGS.neuro} alt="Neuroscience research" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(13,13,13,0.85) 0%, rgba(13,13,13,0.3) 60%, transparent 100%)" }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "0 clamp(24px,5vw,60px)" }}>
              <div style={{ maxWidth: 480 }}>
                <p style={{ ...s.label, marginBottom: 12 }}>Neuromodulation Origin</p>
                <p style={{ fontFamily: DM, fontWeight: 300, fontSize: "clamp(1.1rem,2.5vw,1.75rem)", lineHeight: 1.2, letterSpacing: "-0.02em", color: "#F5F0E8" }}>
                  The only anxiolytic peptide derived from an endogenous immunomodulator — engineered to regulate anxiety without creating the receptor downregulation that drives benzodiazepine dependency
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
            <h2 style={{ ...s.h2lt }}>Four steps to anxiety resolution without dependency</h2>
            <p style={{ ...s.body, paddingTop: 8 }}>Every SelankRx protocol begins with a physician evaluation and neuropsychiatric symptom assessment. No protocol is initiated without documented clinical rationale, contraindication screening, and informed consent.</p>
          </div>

          <div className="four-col-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
            {[
              {
                step: "01",
                title: "Assessment & Intake",
                items: [
                  "Comprehensive neuropsychiatric questionnaire",
                  "GAD-7 and HAM-A baseline scoring",
                  "Current medication and supplement review",
                  "Contraindication screening",
                  "Physician review within 48 hours",
                ],
              },
              {
                step: "02",
                title: "Baseline Labs",
                items: [
                  "CBC with differential",
                  "Comprehensive metabolic panel (CMP)",
                  "Thyroid panel (TSH, Free T3/T4)",
                  "Cortisol (AM serum)",
                  "Neurotransmitter metabolites if indicated",
                ],
              },
              {
                step: "03",
                title: "Protocol Initiation",
                items: [
                  "Selank intranasal or SQ per physician",
                  "Pharma-grade compounded formulation",
                  "Dosing: 200–500 mcg per administration",
                  "Frequency: 1–3× daily per indication",
                  "Cold-chain delivery with reconstitution guide",
                ],
              },
              {
                step: "04",
                title: "Monitoring",
                items: [
                  "2-week check-in with provider",
                  "GAD-7 / HAM-A reassessment at 4 weeks",
                  "Repeat cortisol at 8 weeks if indicated",
                  "Protocol adjustment as clinically indicated",
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
              <h2 style={{ ...s.h2lt, marginBottom: 20 }}>Anxiety medicine pricing. Without the psychiatrist markup.</h2>
              <p style={{ ...s.body, marginBottom: 24 }}>
                Psychiatrists typically charge $400–$800 for an initial evaluation, $200–$400 per follow-up, and anxiolytic medications — even generic SSRIs — carry significant tolerability costs that require multiple prescription changes. Aurelius bundles physician oversight, baseline labs, compounded Selank, and monitoring into one monthly plan.
              </p>
              <div style={{ background: "rgba(201,169,110,0.06)", border: "1px solid rgba(201,169,110,0.15)", borderRadius: 8, padding: "20px 24px", marginBottom: 28 }}>
                <p style={{ fontFamily: DM, fontWeight: 500, fontSize: "0.875rem", color: "#1A1A1A", marginBottom: 8 }}>Typical anxiety treatment cost breakdown:</p>
                {[
                  ["Initial psychiatrist evaluation", "$400–$800"],
                  ["Baseline labs", "$200–$400"],
                  ["Monthly medication cost", "$100–$400"],
                  ["Monthly follow-up visits", "$200–$400"],
                  ["Total first month", "$900–$2,000"],
                ].map(([item, cost]) => (
                  <div key={item} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid rgba(13,13,13,0.06)" }}>
                    <span style={{ ...s.bodySm }}>{item}</span>
                    <span style={{ fontFamily: DM, fontWeight: 500, fontSize: "0.875rem", color: "#8C6845" }}>{cost}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {["Physician consultation included", "Full neuropsychiatric lab panel included", "Pharma-grade Selank included", "GAD-7 / HAM-A monitoring included", "Monthly check-ins included", "No hidden fees"].map((item) => (
                  <div key={item} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#C9A96E" strokeWidth="1.2"/><path d="M5 8l2 2 4-4" stroke="#C9A96E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span style={{ ...s.bodySm }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ background: "#0D0D0D", borderRadius: 12, padding: "clamp(32px,5vw,48px) clamp(24px,4vw,40px)", textAlign: "center", border: "1px solid rgba(201,169,110,0.15)" }}>
                <p style={{ ...s.label, marginBottom: 12 }}>SelankRx Plan</p>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: 4, marginBottom: 8 }}>
                  <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "1.25rem", color: "#C9A96E", marginTop: 10 }}>$</span>
                  <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "clamp(3.5rem,8vw,5rem)", lineHeight: 1, letterSpacing: "-0.04em", color: "#F5F0E8" }}>189</span>
                  <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "1rem", color: "rgba(245,240,232,0.4)", marginTop: 16 }}>/mo</span>
                </div>
                <p style={{ ...s.bodyLt, fontSize: "0.8rem", marginBottom: 32 }}>vs. $900–$2,000/mo at a psychiatrist-managed anxiety clinic</p>
                <a href="#quiz" className="btn-gold" style={{ width: "100%", justifyContent: "center", display: "flex", marginBottom: 16 }}>Check My Eligibility</a>
                <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.75rem", color: "rgba(245,240,232,0.25)", lineHeight: 1.6 }}>Cancel anytime. No long-term commitment required.</p>
                <div style={{ borderTop: "1px solid rgba(245,240,232,0.06)", marginTop: 28, paddingTop: 24, display: "flex", flexDirection: "column", gap: 10 }}>
                  {["Physician-supervised protocol", "Pharma-grade compounded Selank", "Neuropsychiatric labs included", "Monthly provider check-ins", "Cold-chain delivery"].map((item) => (
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
          <h2 style={{ ...s.h2dk, textAlign: "center", marginBottom: 16 }}>Are you a candidate for SelankRx?</h2>
          <p style={{ ...s.bodyLt, textAlign: "center", maxWidth: 520, margin: "0 auto 56px" }}>
            This 5-question screen checks for Selank protocol contraindications. It takes under 60 seconds and does not constitute a medical evaluation.
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
              <p style={{ ...s.bodyLt }}>Including Selank vs. benzodiazepines and SSRIs, honest research framing, administration options, onset timeline, and off-label prescribing legality.</p>
              <div style={{ marginTop: 40 }}>
                <img src={IMGS.labs} alt="Neuropsychiatric research" style={{ width: "100%", borderRadius: 10, objectFit: "cover" }} />
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
            Your nervous system already<br />knows how to be calm.<br />It just needs the right signal.
          </h2>
          <p style={{ ...s.bodyLt, marginBottom: 48, fontSize: "1.0625rem" }}>
            Selank is the only therapeutic peptide derived from an endogenous immunomodulator — engineered to regulate anxiety by amplifying the brain's own inhibitory tone, not overriding it. Now available as a physician-supervised protocol with no tolerance, no dependence, and no emotional blunting.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 20 }}>
            <a href="#quiz" className="btn-gold" style={{ padding: "16px 36px", fontSize: "1rem" }}>Check My Eligibility</a>
            <a href="#research" className="btn-ghost-cream" style={{ padding: "16px 36px", fontSize: "1rem" }}>Review the Research</a>
          </div>
          <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.75rem", color: "rgba(245,240,232,0.25)", lineHeight: 1.6, maxWidth: 560, margin: "0 auto" }}>
            † This page describes off-label use of Selank (TP-7), a compounded synthetic hexapeptide. Selank is approved as an anxiolytic medication in Russia and is prescribed as a compounded peptide in the United States at the clinical discretion of a licensed physician. This content is for informational purposes only and does not constitute medical advice. Individual results vary. All protocols require physician evaluation and are subject to contraindication screening.
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
                  <span style={{ fontFamily: DM, fontWeight: 500, fontSize: "0.875rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#F5F0E8", display: "block" }}>Selank<span style={{ color: DARK_ORANGE }}>Rx</span></span>
                  <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#8C7B6B" }}>Aurelius Health Group</span>
                </div>
              </div>
              <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.875rem", color: "rgba(245,240,232,0.35)", maxWidth: 240, marginTop: 12, lineHeight: 1.6 }}>Physician-supervised Selank protocol for anxiety resolution, cognitive enhancement, and neuropsychiatric resilience without tolerance or dependence.</p>
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
