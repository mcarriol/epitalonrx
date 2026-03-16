/*
   EpitalonRx — Landing Page
   Template: S-31Rx / SelankRx design system
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
  hero:  "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1800&q=80",
  dna:   "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1800&q=80",
  labs:  "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1200&q=80",
  aged:  "https://images.unsplash.com/photo-1576671081837-49000212a370?w=1200&q=80",
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

/* ── Problem cards ── */
const problems = [
  {
    icon: "◈",
    title: "Telomere Shortening & Cellular Senescence",
    profile: "Adults experiencing accelerated biological aging, chronic fatigue, immune decline, or age-related organ dysfunction — particularly those with measurable short telomere length on clinical testing or a family history of age-related disease",
    mechanism: "Epitalon activates telomerase (hTERT) — the enzyme that rebuilds telomeric DNA at chromosome ends — reversing the primary molecular clock of cellular aging. By elongating critically short telomeres, Epitalon delays the onset of replicative senescence, restores mitotic capacity in aged cells, and addresses the upstream cause of multi-system age-related decline.",
    testimonial: "\"My telomere testing showed biological age 9 years older than chronological. After two Epitalon cycles, repeat testing showed measurable telomere elongation. Nothing else in my protocol had moved that number.\" — B.R., 58, San Francisco CA",
  },
  {
    icon: "⊕",
    title: "Circadian Dysregulation & Pineal Decline",
    profile: "Individuals with sleep-onset insomnia, disrupted circadian rhythm, age-related melatonin insufficiency, shift-work disorder, or jet-lag intolerance whose sleep architecture has deteriorated without an adequate response to melatonin supplementation alone",
    mechanism: "Epitalon was derived from Epithalamin — a polypeptide extract of the pineal gland. It directly stimulates pinealocyte melatonin synthesis and restores the amplitude of the circadian melatonin peak that declines with age. Unlike exogenous melatonin, Epitalon rehabilitates the gland's endogenous secretory capacity, normalizing the full circadian hormone cycle rather than substituting for it.",
    testimonial: "\"My melatonin levels were barely detectable at night — documented by DUTCH testing. After my first Epitalon course, my sleep architecture changed within 2 weeks. Deep sleep returned. I hadn't slept like that in a decade.\" — K.L., 61, Miami FL",
  },
  {
    icon: "◷",
    title: "Immunosenescence & Age-Related Cancer Risk",
    profile: "Adults over 45 with documented immune decline, recurrent infections, abnormal NK cell activity, elevated inflammatory markers, or a personal or family history suggesting elevated cancer risk who require immune restoration beyond standard preventive care",
    mechanism: "Epitalon restores thymic function and T-cell output in aged subjects, reverses NK cell cytotoxic decline, and has demonstrated direct oncostatic effects in mammary and colon carcinoma models — inhibiting tumor growth by up to 2.5× compared to controls. Its anti-aging effect on immune surveillance represents a mechanistically distinct approach to cancer risk reduction.",
    testimonial: "\"My NK cell activity was in the bottom quartile for my age. After two Epitalon cycles, retesting showed NK function had restored to the range of someone 15 years younger. My oncologist was genuinely surprised.\" — S.T., 67, Boston MA",
  },
];

/* ── Pathways (Clinical Evidence) ── */
const pathways = [
  {
    n: "01", title: "Telomerase Activation & Telomere Elongation",
    body: "Epitalon (Ala-Glu-Asp-Gly) directly upregulates telomerase reverse transcriptase (hTERT) expression in human somatic cells, enabling the reconstruction of telomeric DNA sequences that erode with each cell division. Khavinson's group demonstrated measurable telomere elongation in cultured human fetal fibroblasts after Epitalon treatment — the first peptide shown to produce this effect in human cells. Telomere length is the most validated biomarker of biological age and replicative lifespan.",
    cite: "Khavinson VKh et al. Bull Exp Biol Med. 2003;135(5):590–592.",
    tags: ["Telomerase activation", "hTERT upregulation", "Telomere elongation"],
  },
  {
    n: "02", title: "Pineal Gland Restoration & Melatonin Synthesis",
    body: "Epitalon was isolated from Epithalamin — a native pineal gland polypeptide complex — by Khavinson and Morozov. It stimulates pinealocyte secretion of melatonin and restores the nocturnal melatonin surge that declines by 80–90% between age 20 and 70. Animal studies demonstrate that Epitalon-treated aged rats exhibit melatonin profiles indistinguishable from young controls. Melatonin governs not just sleep but immune function, antioxidant defense, circadian metabolism, and tumor suppression.",
    cite: "Anisimov VN et al. Neuro Endocrinol Lett. 2001;22(1):9–18.",
    tags: ["Pineal restoration", "Melatonin synthesis", "Circadian rhythm"],
  },
  {
    n: "03", title: "Antioxidant Defense & Lipid Peroxidation Reduction",
    body: "Epitalon significantly reduces lipid peroxidation products (MDA, diene conjugates) and increases superoxide dismutase (SOD) and catalase activity in aged animals and elderly human patients. In a clinical study of 14–16 year-old female subjects with polycystic ovary syndrome, Epitalon reduced LPO markers and normalized antioxidant enzyme levels within one treatment course. These antioxidant effects are consistent with telomerase activation reducing the oxidative stress that is both a cause and consequence of telomere shortening.",
    cite: "Khavinson VKh et al. Neuro Endocrinol Lett. 2004;25(6):441–447.",
    tags: ["Antioxidant", "Lipid peroxidation ↓", "SOD activation"],
  },
  {
    n: "04", title: "Lifespan Extension — Animal Studies",
    body: "Multiple Epitalon studies in mice and rats demonstrate statistically significant lifespan extension: 12–25% increase in mean lifespan in SHR rats, delayed onset of age-related pathologies, reduced incidence of spontaneous tumors, and preservation of estrous cycle regularity in aging female rats. Importantly, these effects were observed with intermittent administration courses — not continuous treatment — suggesting epigenetic reprogramming rather than pharmacological suppression of aging pathways.",
    cite: "Anisimov VN et al. Bull Exp Biol Med. 2003;135(6):590–592.",
    tags: ["Lifespan extension", "Tumor suppression", "Aging delay"],
  },
  {
    n: "05", title: "Immune Restoration & NK Cell Cytotoxicity",
    body: "Epitalon treatment in elderly patients restores T-lymphocyte proliferative response, normalizes CD4/CD8 ratios, and significantly increases NK cell cytotoxic activity against tumor targets. In a 3-year clinical study of elderly patients administered Epithalamin (Epitalon precursor), treated subjects showed 28% lower overall mortality and 50% lower cardiovascular mortality compared to controls. Immune restoration — particularly NK cell function — is mechanistically central to Epitalon's cancer risk reduction properties.",
    cite: "Morozov VG et al. Gerontology. 1997;43(1–2):28–34.",
    tags: ["NK cell activation", "T-cell restoration", "Immunosenescence reversal"],
  },
  {
    n: "06", title: "Oncostatic Effects & Tumor Growth Inhibition",
    body: "Epitalon inhibits the growth of transplanted mammary, cervical, and colon carcinoma in rodent models by 1.6–2.5× compared to controls. The mechanism involves both direct inhibition of tumor cell telomerase (paradoxically required for cancer cell immortality) and indirect anti-tumor effects mediated through restored NK cell cytotoxicity and normalized melatonin signaling. This dual oncostatic mechanism is unique among anti-aging interventions.",
    cite: "Anisimov VN et al. Carcinogenesis. 2002;23(12):1937–1944.",
    tags: ["Oncostatic", "Tumor inhibition", "Cancer risk ↓"],
  },
];

/* ── Condition tag cloud ── */
const conditionTags = [
  "Biological Aging", "Telomere Shortening", "Cellular Senescence", "Immunosenescence",
  "Sleep Disorders", "Circadian Dysregulation", "Melatonin Insufficiency", "Cancer Prevention",
  "Cardiovascular Aging", "Cognitive Decline", "Hormonal Aging", "Chronic Fatigue",
  "Oxidative Stress", "NK Cell Decline", "Longevity Optimization",
];

/* ── FAQ ── */
const faqs = [
  {
    q: "What is Epitalon and how was it developed?",
    a: "Epitalon (also known as Epithalon or AEDG peptide) is a synthetic tetrapeptide with the sequence Ala-Glu-Asp-Gly, developed by Vladimir Khavinson at the St. Petersburg Institute of Bioregulation and Gerontology of the Russian Academy of Sciences. It is the synthetic analog of Epithalamin — a polypeptide complex extracted from the pineal gland of young calves — which Khavinson's group had studied since the 1970s for anti-aging and geroprotective properties. Epitalon represents the bioactive core sequence of Epithalamin, stabilized for clinical use. It has been studied in over 100 peer-reviewed publications, including human clinical trials in elderly patients spanning 3–15 years.",
  },
  {
    q: "How does Epitalon activate telomerase, and why does this matter for aging?",
    a: "Telomeres are repetitive DNA sequences (TTAGGG) that cap chromosome ends and protect genomic integrity during cell division. With each division, 50–200 base pairs of telomeric DNA are lost — an irreversible countdown that limits cells to approximately 50 divisions (the Hayflick limit) before entering senescence or apoptosis. Telomerase (hTERT) is the enzyme that rebuilds telomeric DNA, but it is epigenetically silenced in most somatic cells after embryonic development. Epitalon upregulates hTERT gene expression, reactivating telomerase and enabling cells to rebuild telomeric DNA — effectively resetting the replicative clock. This is the only non-oncogenic mechanism known to measurably elongate telomeres in human somatic cells.",
  },
  {
    q: "What does the clinical evidence show?",
    a: "Epitalon has been studied in multiple human clinical trials conducted by Khavinson's group in St. Petersburg, primarily in elderly subjects (60–80 years). Key findings include: normalized melatonin secretion profiles in aged patients, restored T-cell proliferative response and NK cell cytotoxicity, measurable telomere elongation in human cell cultures, reduced oxidative stress biomarkers, and in the most significant study — 28% lower all-cause mortality and 50% lower cardiovascular mortality in elderly patients receiving Epithalamin (Epitalon precursor) over a 3-year period with 15-year follow-up. While the clinical evidence base is primarily Russian, it is peer-reviewed, indexed, and spans decades of research.",
  },
  {
    q: "How is Epitalon administered and what does a cycle look like?",
    a: "Epitalon is administered subcutaneously (SQ) or intranasally. The standard protocol is a course-based approach rather than continuous daily dosing: typically 10 mg per day (as 5 mg SQ twice daily) for 10–20 consecutive days, repeated 1–2 times per year. This intermittent course approach mirrors the dosing used in Khavinson's clinical studies and is believed to produce epigenetic reprogramming effects that persist after the course ends. Some protocols use intranasal delivery (10–20 mg/day intranasal for 20 days). Aurelius provides both formats; your physician determines the optimal delivery and course schedule based on your clinical profile and baseline telomere length testing.",
  },
  {
    q: "How long until I see results, and can I measure them?",
    a: "Subjective improvements in sleep quality and circadian rhythm normalization are typically reported within 1–2 weeks of the first course — consistent with Epitalon's direct effect on pineal melatonin synthesis. Energy, immune resilience, and general vitality improvements are commonly reported at 4–8 weeks. Objective biomarker changes — reduced oxidative stress markers, normalized NK cell function, improved hormonal profiles — are measurable at 8–12 weeks post-course. Telomere length itself is measurable via clinical testing (Life Length, Telomere Diagnostics) at baseline and after 2–3 treatment cycles. Aurelius includes baseline and follow-up biomarker panels to document objective response.",
  },
  {
    q: "Is prescribing Epitalon off-label legal in the United States?",
    a: "Epitalon is not FDA-approved in the United States but is prescribed as a compounded peptide under the clinical discretion of a licensed physician. It has no controlled substance scheduling. Off-label prescribing of compounded peptides is legal when a licensed physician documents clinical rationale, obtains informed consent, and uses a DEA-licensed compounding pharmacy. Epitalon has been studied in human subjects over 40+ years of research without serious adverse events — its safety profile is exceptionally well-characterized relative to its age as a research compound. Aurelius physicians follow a standardized protocol for every patient including contraindication screening, informed consent, and baseline biomarker documentation.",
  },
];

/* ── Eligibility Quiz ── */
function EligibilityQuiz() {
  const questions = [
    { q: "Do you have a current or recent diagnosis of any active cancer (other than fully excised basal cell carcinoma), or are you currently undergoing chemotherapy or radiation?", disqualifier: "YES", note: "Active malignancy requires oncologist co-management before initiating any telomerase-activating protocol. Telomerase activation is contraindicated in active cancer." },
    { q: "Are you taking immunosuppressive medications (e.g., for organ transplant, autoimmune disease) that may interact with immune-modulating peptides?", disqualifier: "YES", note: "Immunosuppressive therapy requires physician evaluation before initiating Epitalon due to its immune-restorative mechanism." },
    { q: "Are you currently pregnant, breastfeeding, or planning to become pregnant in the next 6 months?", disqualifier: "YES", note: "Epitalon has not been studied in pregnancy or lactation; safety data is insufficient for these periods." },
    { q: "Do you have a known hypersensitivity to Epitalon, Epithalamin, or related tetrapeptides?", disqualifier: "YES", note: "Known peptide hypersensitivity is a contraindication to this protocol." },
    { q: "Do you experience any of the following: signs of accelerated aging, sleep disruption, immune decline, chronic fatigue, elevated inflammatory markers, or interest in longevity optimization?", disqualifier: "NO", note: "These are the primary indications for the EpitalonRx protocol." },
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
                  const next = [...answers]; next[i] = opt;
                  setAnswers(next); setSubmitted(false);
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
          <button onClick={() => setSubmitted(true)} className="btn-gold">View My Results</button>
        </div>
      )}

      {submitted && (
        <div style={{ marginTop: 32, padding: "32px 36px", borderRadius: 10, border: `1px solid ${isDisqualified ? "rgba(201,169,110,0.25)" : "rgba(201,169,110,0.35)"}`, background: isDisqualified ? "rgba(201,169,110,0.04)" : "rgba(201,169,110,0.07)" }}>
          {isDisqualified ? (
            <>
              <p style={{ ...s.label, marginBottom: 12, color: "#C9A96E" }}>Physician Review Recommended</p>
              <h3 style={{ ...s.h3dk, marginBottom: 12, fontSize: "1.25rem" }}>One or more responses require physician evaluation before protocol initiation.</h3>
              <p style={{ ...s.bodyLt, marginBottom: 24 }}>One or more of your answers indicates a condition that requires physician evaluation before initiating Epitalon. Submit your intake and a provider will review your situation within 48 hours.</p>
              <a href="mailto:intake@aureliushealthgroup.com" className="btn-ghost-cream" style={{ display: "inline-flex" }}>Request Physician Review</a>
            </>
          ) : (
            <>
              <p style={{ ...s.label, marginBottom: 12 }}>Eligible — No Contraindications Identified</p>
              <h3 style={{ ...s.h3dk, marginBottom: 12, fontSize: "1.25rem" }}>Based on your responses, you appear to be a candidate for the EpitalonRx protocol.</h3>
              <p style={{ ...s.bodyLt, marginBottom: 24 }}>No contraindications were identified. The next step is a comprehensive intake and baseline biomarker panel including telomere length testing. A physician will review your results within 48 hours.</p>
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

export default function EpitalonRx() {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  return (
    <div style={{ background: "#0D0D0D", minHeight: "100vh" }}>
      <Navbar productName="EpitalonRx" />

      {/* ══ HERO ══ */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src={IMGS.hero} alt="EpitalonRx hero" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,13,13,0.92) 0%, rgba(13,13,13,0.45) 50%, rgba(13,13,13,0.2) 100%)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem) clamp(60px,10vw,100px)", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
            <a href="https://aureliushealthgroup.com" style={{ ...s.label, color: "rgba(201,169,110,0.6)", textDecoration: "none" }}>Aurelius Health Group</a>
            <span style={{ color: "rgba(201,169,110,0.4)", fontSize: "0.7rem" }}>›</span>
            <span style={{ ...s.label }}>Epitalon<span style={{ color: DARK_ORANGE }}>Rx</span></span>
          </div>
          <h1 style={{ ...s.h1, maxWidth: 760, marginBottom: 24 }}>
            The telomerase-activating peptide<br />your chromosomes were<br />designed to be rebuilt by.
          </h1>
          <p style={{ ...s.bodyLt, maxWidth: 480, marginBottom: 16, fontSize: "1.0625rem" }}>
            Epitalon is the only therapeutic peptide shown to activate telomerase in human somatic cells — elongating telomeres, restoring pineal melatonin synthesis, reversing immunosenescence, and addressing the molecular clock of aging at its source.
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40 }}>
            {["Physician-supervised", "Telomere length monitoring", "Course-based protocol"].map((t) => (
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
              { stat: "1980s", label: "Khavinson research origin" },
              { stat: "4 AA",  label: "Ala-Glu-Asp-Gly tetrapeptide" },
              { stat: "40+ yrs", label: "Peer-reviewed research" },
              { stat: "$219/mo", label: "All-inclusive protocol" },
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
                  <p style={{ ...s.label, marginBottom: 8 }}>Epitalon Mechanism</p>
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
            <div>
              <h2 style={{ ...s.h2dk, marginBottom: 24 }}>How Epitalon rebuilds the molecular clock of aging</h2>
              <p style={{ ...s.bodyLt, marginBottom: 20 }}>
                Epitalon was developed by Vladimir Khavinson from Epithalamin — a polypeptide extracted from the pineal glands of young calves that had demonstrated geroprotective properties in aged animals since the 1970s. The tetrapeptide Ala-Glu-Asp-Gly was identified as its bioactive core and synthesized for clinical use.
              </p>
              <p style={{ ...s.bodyLt, marginBottom: 32 }}>
                The pineal gland governs biological aging through melatonin — the master circadian regulator that also controls antioxidant defense, immune surveillance, and tumor suppression. As the pineal gland calcifies with age and melatonin output declines, every downstream system it governs deteriorates in parallel. Epitalon restores the gland's secretory capacity and simultaneously activates telomerase — addressing both the hormonal and genomic dimensions of aging.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {[
                  { label: "Primary Mechanism", text: "hTERT upregulation → telomerase activation → telomere elongation → replicative senescence reversal" },
                  { label: "Structure", text: "Ala-Glu-Asp-Gly — tetrapeptide derived from Epithalamin (pineal gland polypeptide)" },
                  { label: "Protocol", text: "Course-based SQ or intranasal: 10 mg/day × 10–20 days, 1–2 courses/year" },
                  { label: "Origin", text: "Khavinson VKh — Institute of Bioregulation and Gerontology, Russian Academy of Sciences" },
                ].map((item) => (
                  <div key={item.label} style={{ borderLeft: "2px solid rgba(201,169,110,0.3)", paddingLeft: 20 }}>
                    <p style={{ ...s.label, marginBottom: 6 }}>{item.label}</p>
                    <p style={{ ...s.bodyLt, margin: 0, fontSize: "0.9rem" }}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Cascade diagram */}
            <div>
              <p style={{ ...s.label, marginBottom: 20 }}>Epitalon Anti-Aging Cascade</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {[
                  { node: "Epitalon (AEDG)", sub: "4 AA tetrapeptide — Ala-Glu-Asp-Gly, SQ injection or intranasal", color: "#C9A96E" },
                  { node: "hTERT Upregulation", sub: "Telomerase reverse transcriptase gene activated → telomeric DNA reconstruction", color: "#B8956A" },
                  { node: "Pineal Restoration", sub: "Pinealocyte melatonin synthesis restored → circadian amplitude normalized", color: "#A07A55" },
                  { node: "Immune Reprogramming", sub: "NK cell cytotoxicity ↑, T-cell proliferation restored, Th1/Th2 balance normalized", color: "#8C6845" },
                  { node: "Biological Age Reversal", sub: "Telomere elongation, senescence reversal, lifespan extension, cancer risk ↓", color: "#785535" },
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
                  {["", "Epitalon", "NMN / NR", "Resveratrol", "Rapamycin", "Metformin"].map((h, i) => (
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
                  ["Primary action", "Telomerase activation + pineal restoration + immune reprogramming", "NAD+ precursor → sirtuin activation", "SIRT1 activator / antioxidant", "mTOR inhibition", "AMPK activation"],
                  ["Telomere elongation", "✓ Direct hTERT upregulation — measured in human cells", "✗ No direct telomere effect", "✗ No direct telomere effect", "✗ No direct telomere effect", "✗ No direct telomere effect"],
                  ["Pineal / melatonin", "✓ Direct pinealocyte restoration", "✗ None", "✗ None", "✗ None", "✗ None"],
                  ["Clinical trial evidence", "✓ Human trials — mortality reduction, immune restoration", "✗ Mostly preclinical", "✗ Poor human translation", "✓ Limited human data (off-label)", "✓ TAME trial ongoing"],
                  ["Side effect profile", "✓ Excellent — no serious AEs in 40 years of study", "✓ Generally safe", "✓ Generally safe", "✗ Immunosuppression risk", "✗ GI side effects, B12 depletion"],
                ].map((row, ri) => (
                  <tr key={ri} style={{ borderBottom: "1px solid rgba(245,240,232,0.05)" }}>
                    {row.map((cell, ci) => (
                      <td key={ci} style={{
                        padding: "14px 16px", fontSize: "0.875rem",
                        textAlign: ci === 0 ? "left" : "center",
                        color: ci === 0 ? "rgba(245,240,232,0.5)" : ci === 1 ? "#C9A96E" : cell.startsWith("✓") ? "rgba(245,240,232,0.75)" : "rgba(245,240,232,0.35)",
                        fontWeight: ci === 1 ? 500 : 400,
                        background: ci === 1 ? "rgba(201,169,100,0.04)" : "transparent",
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
          <div className="four-col-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24, marginBottom: 48 }}>
            {[
              {
                name: "EpitalonRx", nameBase: "Epitalon", nameSuffix: "Rx",
                tag: "Longevity & Telomere Health",
                desc: "The only therapeutic peptide shown to activate telomerase in human somatic cells — elongating telomeres, restoring pineal melatonin, reversing immunosenescence, and addressing the molecular clock of aging at its source.",
                cta: "Check My Eligibility", ctaHref: "#quiz", featured: true,
              },
              {
                name: "S-31Rx", tag: "Mitochondrial Repair",
                desc: "The world's most precisely targeted mitochondrial peptide — binding cardiolipin on the inner membrane to restore ATP production, eliminate reactive oxygen species, and reverse cellular energy decline.",
                cta: "Get Started", ctaHref: "https://s-31-rx-pink.vercel.app", featured: false,
              },
              {
                name: "SelankRx", tag: "Anxiety & Cognition",
                desc: "The Russian-developed hexapeptide that modulates GABA-A receptors, upregulates BDNF, and resolves generalized anxiety without sedation, tolerance, or the dependency profile of benzodiazepines.",
                cta: "Get Started", ctaHref: "https://selankrx.vercel.app", featured: false,
              },
              {
                name: "SemaxRx", tag: "Neuroprotection",
                desc: "The ACTH-derived heptapeptide that upregulates BDNF, sharpens neural circuits, and resolves neuroinflammation — restoring cognitive performance without stimulants or dependence.",
                cta: "Get Started", ctaHref: "https://semax-rx-maria-2244s-projects.vercel.app", featured: false,
              },
            ].map((peptide) => (
              <div key={peptide.name} style={{ background: peptide.featured ? "#1A1410" : "#1A1A1A", borderRadius: 10, padding: "28px 24px", display: "flex", flexDirection: "column", gap: 12, position: "relative", border: peptide.featured ? "1px solid rgba(201,169,110,0.3)" : "1px solid rgba(245,240,232,0.06)" }}>
                {peptide.featured && (
                  <div style={{ position: "absolute", top: -1, left: 20, background: "#C9A96E", color: "#0D0D0D", fontFamily: DM, fontWeight: 600, fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase" as const, padding: "3px 10px", borderRadius: "0 0 5px 5px" }}>Current Protocol</div>
                )}
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: peptide.featured ? 8 : 0 }}>
                  <span style={{ fontFamily: DM, fontWeight: 500, fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#C9A96E", background: "rgba(201,169,110,0.1)", padding: "3px 8px", borderRadius: 3, alignSelf: "flex-start" }}>{peptide.tag}</span>
                  <h3 style={{ ...s.h3dk, fontSize: "1.0625rem", margin: 0 }}>
                    {peptide.featured
                      ? <>{(peptide as any).nameBase}<span style={{ color: DARK_ORANGE }}>{(peptide as any).nameSuffix}</span></>
                      : peptide.name}
                  </h3>
                </div>
                <p style={{ ...s.bodyLt, fontSize: "0.875rem", flex: 1 }}>{peptide.desc}</p>
                <a href={peptide.ctaHref} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: DM, fontWeight: 500, fontSize: "0.8125rem", letterSpacing: "0.04em", padding: "12px 20px", borderRadius: 6, textDecoration: "none", transition: "all 0.2s", background: peptide.featured ? "#C9A96E" : "transparent", color: peptide.featured ? "#0D0D0D" : "rgba(245,240,232,0.5)", border: peptide.featured ? "none" : "1px solid rgba(245,240,232,0.15)" }}
                  onMouseEnter={e => { if (!peptide.featured) { e.currentTarget.style.color = "#F5F0E8"; e.currentTarget.style.borderColor = "rgba(245,240,232,0.35)"; } }}
                  onMouseLeave={e => { if (!peptide.featured) { e.currentTarget.style.color = "rgba(245,240,232,0.5)"; e.currentTarget.style.borderColor = "rgba(245,240,232,0.15)"; } }}
                >{peptide.cta}</a>
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
            <h2 style={{ ...s.h2dk }}>Six evidence-backed longevity pathways</h2>
            <p style={{ ...s.bodyLt, paddingTop: 8 }}>Epitalon's mechanism has been validated across multiple aging pathways in both preclinical models and human clinical trials spanning 40 years. Each pathway below is grounded in peer-reviewed research — presented without exaggeration.</p>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 48 }}>
            {conditionTags.map((tag) => (
              <button key={tag} onClick={() => setActiveTag(activeTag === tag ? null : tag)} style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.8rem", padding: "6px 14px", borderRadius: 20, cursor: "pointer", transition: "all 0.2s", background: activeTag === tag ? "rgba(201,169,110,0.15)" : "transparent", color: activeTag === tag ? "#C9A96E" : "rgba(245,240,232,0.4)", border: `1px solid ${activeTag === tag ? "rgba(201,169,110,0.4)" : "rgba(245,240,232,0.1)"}` }}>{tag}</button>
            ))}
          </div>

          <div className="pathway-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {pathways.map((pw) => (
              <div key={pw.n} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(245,240,232,0.06)", borderRadius: 10, padding: "clamp(24px,3vw,32px)" }}>
                <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "2rem", color: "rgba(201,169,110,0.25)", lineHeight: 1, display: "block", marginBottom: 16 }}>{pw.n}</span>
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

          <div style={{ marginTop: 64, borderRadius: 12, overflow: "hidden", position: "relative", height: "clamp(200px,30vw,380px)" }}>
            <img src={IMGS.dna} alt="Telomere research" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(13,13,13,0.85) 0%, rgba(13,13,13,0.3) 60%, transparent 100%)" }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "0 clamp(24px,5vw,60px)" }}>
              <div style={{ maxWidth: 480 }}>
                <p style={{ ...s.label, marginBottom: 12 }}>Telomerase Origin</p>
                <p style={{ fontFamily: DM, fontWeight: 300, fontSize: "clamp(1.1rem,2.5vw,1.75rem)", lineHeight: 1.2, letterSpacing: "-0.02em", color: "#F5F0E8" }}>
                  The only therapeutic peptide shown to elongate telomeres in human somatic cells — addressing the molecular countdown of biological aging at its chromosomal source
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
            <h2 style={{ ...s.h2lt }}>Four steps to measurable biological age reversal</h2>
            <p style={{ ...s.body, paddingTop: 8 }}>Every EpitalonRx protocol begins with baseline telomere length testing and a comprehensive aging biomarker panel. No protocol is initiated without documented clinical rationale and informed consent.</p>
          </div>
          <div className="four-col-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
            {[
              { step: "01", title: "Assessment & Intake", items: ["Comprehensive aging & longevity questionnaire", "Biological vs. chronological age assessment", "Medication and supplement review", "Contraindication screening", "Physician review within 48 hours"] },
              { step: "02", title: "Baseline Biomarkers", items: ["Telomere length testing (LifeLength or equivalent)", "CBC with differential + CMP", "Cortisol, DHEA-S, IGF-1", "NK cell activity panel", "Oxidative stress markers (8-OHdG, MDA)"] },
              { step: "03", title: "Protocol Initiation", items: ["Epitalon 10 mg/day SQ or intranasal", "Course duration: 10–20 consecutive days", "Pharma-grade lyophilized compound", "Cold-chain overnight delivery", "Dosing & administration guide included"] },
              { step: "04", title: "Monitoring & Repeat", items: ["4-week post-course check-in", "Repeat biomarkers at 12 weeks", "Telomere length retest after 2 cycles", "Protocol adjustment as indicated", "1–2 courses per year per physician plan"] },
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
              <h2 style={{ ...s.h2lt, marginBottom: 20 }}>Longevity medicine pricing. Without the longevity clinic markup.</h2>
              <p style={{ ...s.body, marginBottom: 24 }}>
                Longevity clinics and anti-aging specialists typically charge $500–$1,200 for an initial consultation, $400–$800 for telomere testing, and $600–$1,500/month for compounded peptide protocols. Aurelius bundles physician oversight, telomere and aging biomarker panels, Epitalon, and monitoring into one all-inclusive plan.
              </p>
              <div style={{ background: "rgba(201,169,110,0.06)", border: "1px solid rgba(201,169,110,0.15)", borderRadius: 8, padding: "20px 24px", marginBottom: 28 }}>
                <p style={{ fontFamily: DM, fontWeight: 500, fontSize: "0.875rem", color: "#1A1A1A", marginBottom: 8 }}>Typical longevity clinic cost breakdown:</p>
                {[["Initial longevity consultation", "$500–$1,200"], ["Telomere length testing", "$400–$800"], ["Monthly compound cost", "$600–$1,500"], ["Monthly follow-up visits", "$300–$600"], ["Total first month", "$1,800–$4,100"]].map(([item, cost]) => (
                  <div key={item} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid rgba(13,13,13,0.06)" }}>
                    <span style={{ ...s.bodySm }}>{item}</span>
                    <span style={{ fontFamily: DM, fontWeight: 500, fontSize: "0.875rem", color: "#8C6845" }}>{cost}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {["Physician consultation included", "Telomere length testing included", "Pharma-grade Epitalon included", "Full aging biomarker panel included", "Monthly check-ins included", "No hidden fees"].map((item) => (
                  <div key={item} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#C9A96E" strokeWidth="1.2"/><path d="M5 8l2 2 4-4" stroke="#C9A96E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span style={{ ...s.bodySm }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ background: "#0D0D0D", borderRadius: 12, padding: "clamp(32px,5vw,48px) clamp(24px,4vw,40px)", textAlign: "center", border: "1px solid rgba(201,169,110,0.15)" }}>
                <p style={{ ...s.label, marginBottom: 12 }}>EpitalonRx Plan</p>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: 4, marginBottom: 8 }}>
                  <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "1.25rem", color: "#C9A96E", marginTop: 10 }}>$</span>
                  <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "clamp(3.5rem,8vw,5rem)", lineHeight: 1, letterSpacing: "-0.04em", color: "#F5F0E8" }}>219</span>
                  <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "1rem", color: "rgba(245,240,232,0.4)", marginTop: 16 }}>/mo</span>
                </div>
                <p style={{ ...s.bodyLt, fontSize: "0.8rem", marginBottom: 32 }}>vs. $1,800–$4,100/mo at a longevity clinic</p>
                <a href="#quiz" className="btn-gold" style={{ width: "100%", justifyContent: "center", display: "flex", marginBottom: 16 }}>Check My Eligibility</a>
                <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.75rem", color: "rgba(245,240,232,0.25)", lineHeight: 1.6 }}>Cancel anytime. No long-term commitment required.</p>
                <div style={{ borderTop: "1px solid rgba(245,240,232,0.06)", marginTop: 28, paddingTop: 24, display: "flex", flexDirection: "column", gap: 10 }}>
                  {["Physician-supervised protocol", "Pharma-grade compounded Epitalon", "Telomere length testing included", "Full aging biomarker panel", "Cold-chain overnight delivery"].map((item) => (
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
          <h2 style={{ ...s.h2dk, textAlign: "center", marginBottom: 16 }}>Are you a candidate for EpitalonRx?</h2>
          <p style={{ ...s.bodyLt, textAlign: "center", maxWidth: 520, margin: "0 auto 56px" }}>
            This 5-question screen checks for Epitalon protocol contraindications. It takes under 60 seconds and does not constitute a medical evaluation.
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
              <p style={{ ...s.bodyLt }}>Including Epitalon vs. NMN, resveratrol and rapamycin, telomerase safety, administration, measurable timeline, and off-label prescribing legality.</p>
              <div style={{ marginTop: 40 }}>
                <img src={IMGS.labs} alt="Longevity research" style={{ width: "100%", borderRadius: 10, objectFit: "cover" }} />
              </div>
            </div>
            <div>
              {faqs.map((item) => <FaqItem key={item.q} item={item} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ══ CLOSING CTA ══ */}
      <section style={{ background: "#0D0D0D", padding: "clamp(60px,8vw,100px) 0", textAlign: "center", borderTop: "1px solid rgba(245,240,232,0.06)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem)" }}>
          <p style={{ ...s.label, marginBottom: 20 }}>Start Today</p>
          <h2 style={{ fontFamily: DM, fontWeight: 300, fontSize: "clamp(1.75rem, 4.5vw, 3.5rem)", lineHeight: 1.1, letterSpacing: "-0.03em", color: "#F5F0E8", marginBottom: 24 }}>
            Your chromosomes already<br />know how to stay young.<br />They just need the enzyme reactivated.
          </h2>
          <p style={{ ...s.bodyLt, marginBottom: 48, fontSize: "1.0625rem" }}>
            Epitalon is the only therapeutic peptide shown to measurably elongate telomeres in human somatic cells — addressing the molecular countdown of biological aging at its chromosomal source, restoring pineal function, and reversing immunosenescence. Now available as a physician-supervised protocol with baseline and follow-up telomere testing.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 20 }}>
            <a href="#quiz" className="btn-gold" style={{ padding: "16px 36px", fontSize: "1rem" }}>Check My Eligibility</a>
            <a href="#research" className="btn-ghost-cream" style={{ padding: "16px 36px", fontSize: "1rem" }}>Review the Research</a>
          </div>
          <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.75rem", color: "rgba(245,240,232,0.25)", lineHeight: 1.6, maxWidth: 560, margin: "0 auto" }}>
            † This page describes off-label use of Epitalon (AEDG tetrapeptide), a compounded synthetic peptide developed by Khavinson VKh at the Institute of Bioregulation and Gerontology, Russian Academy of Sciences. Epitalon is not FDA-approved. U.S. use is as a compounded peptide prescribed at the clinical discretion of a licensed physician. This content is for informational purposes only and does not constitute medical advice. Individual results vary. All protocols require physician evaluation and are subject to contraindication screening.
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
                  <span style={{ fontFamily: DM, fontWeight: 500, fontSize: "0.875rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#F5F0E8", display: "block" }}>Epitalon<span style={{ color: DARK_ORANGE }}>Rx</span></span>
                  <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#8C7B6B" }}>Aurelius Health Group</span>
                </div>
              </div>
              <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.875rem", color: "rgba(245,240,232,0.35)", maxWidth: 240, marginTop: 12, lineHeight: 1.6 }}>Physician-supervised Epitalon protocol for telomere elongation, biological age reversal, pineal restoration, and longevity optimization.</p>
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
