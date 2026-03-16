/*
   ThymosinAlpha1Rx — Landing Page
   Template: SemaxRx design system
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
  hero:   "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1800&q=80",
  cells:  "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1800&q=80",
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
    title: "Chronic Immune Dysfunction & Recurrent Infections",
    profile: "Adults experiencing frequent viral and bacterial infections, prolonged recovery times, or immune deficiency states who have not achieved adequate protection through standard interventions",
    mechanism: "Thymosin Alpha-1 activates Toll-like receptors (TLR-2 and TLR-9) on dendritic cells, driving T-cell maturation and CD4+/CD8+ differentiation — restoring the adaptive immune response at its cellular foundation.",
    testimonial: "\"After years of getting sick every few months, three months on TA-1 and I haven't had a single infection. My immune labs improved dramatically.\" — R.K., 52, Denver CO",
  },
  {
    icon: "⊕",
    title: "Cancer Adjunct & Chemotherapy Immunosuppression",
    profile: "Oncology patients experiencing chemotherapy-induced immunosuppression, reduced immune cell counts, or increased infection risk who need immune restoration alongside their primary cancer treatment",
    mechanism: "Thymosin Alpha-1 reduces chemotherapy-induced toxicity by restoring T-lymphocyte numbers and function, increasing CD4+ and CD8+ counts, and stimulating IL-2 and IFN-γ production — protecting immune integrity during treatment.",
    testimonial: "\"My oncologist was impressed by how well my immune markers held up during chemo. The TA-1 protocol made a measurable difference in my bloodwork.\" — S.M., 61, Boston MA",
  },
  {
    icon: "◷",
    title: "Sepsis, Severe Infection & Critical Immune Failure",
    profile: "Patients recovering from sepsis, severe systemic infections, or critical illness with residual immune dysfunction who need targeted immune reconstitution beyond standard supportive care",
    mechanism: "Thymosin Alpha-1 has demonstrated a 9% reduction in sepsis mortality in randomized controlled trials by restoring T-cell function, reducing multiple-organ failure, and modulating the cytokine storm that drives sepsis lethality.",
    testimonial: "\"After my sepsis hospitalization, I was immunologically depleted for months. TA-1 was the first intervention that actually moved my immune markers back toward normal.\" — J.T., 58, Chicago IL",
  },
];

/* ── Pathways (Clinical Evidence) ── */
const pathways = [
  {
    n: "01", title: "T-Cell Maturation & Adaptive Immunity",
    body: "Thymosin Alpha-1 drives the differentiation and maturation of T-cell progenitors into functional CD4+ helper and CD8+ cytotoxic T cells. It activates natural killer cells and enhances antigen presentation by dendritic cells — rebuilding the adaptive immune response from the thymic level.",
    cite: "Dominari A et al. World J Virol. 2020;9(5):67–78.",
    tags: ["T-cell differentiation", "CD4+/CD8+ activation", "NK cell stimulation"],
  },
  {
    n: "02", title: "Toll-Like Receptor Agonism & Innate Immunity",
    body: "Thymosin Alpha-1 functions as a TLR-2 and TLR-9 agonist in both myeloid and plasmacytoid dendritic cells, triggering innate immune signaling cascades that produce IL-2, IL-10, IL-12, IFN-α, and IFN-γ — the cytokines essential for antiviral and antibacterial defense.",
    cite: "King R et al. Expert Opin Biol Ther. 2016;16(8):1063–1070.",
    tags: ["TLR-2 agonism", "TLR-9 agonism", "Innate immunity"],
  },
  {
    n: "03", title: "Antiviral & Antifungal Defense",
    body: "Thymosin Alpha-1 enhances major histocompatibility complex I expression on virally infected cells, increases viral antigen presentation, and directly activates CD8+ cytotoxic T cells to eliminate infected cells. It also primes Th1 and Treg cells to generate antifungal responses against mold and fungal pathogens.",
    cite: "Antachopoulos C et al. Clin Infect Dis. 2012;54(10):1440–1448.",
    tags: ["Antiviral", "Antifungal", "MHC-I upregulation"],
  },
  {
    n: "04", title: "Cytokine Storm Modulation",
    body: "Thymosin Alpha-1 downregulates IL-1β and TNF-α while preserving protective immune function, preventing the cytokine storm responsible for organ failure in sepsis and severe viral infections. It restores dysregulated immune pathways without causing immunosuppression.",
    cite: "Shi C et al. Open Forum Infect Dis. 2021;8(1):ofaa588.",
    tags: ["TNF-α inhibition", "IL-1β reduction", "Cytokine balance"],
  },
  {
    n: "05", title: "Vaccine Immunogenicity Enhancement",
    body: "Thymosin Alpha-1 significantly improves vaccine response in elderly and immunocompromised patients by enhancing T-cell dependent antibody production and boosting immunogenicity of influenza and hepatitis B vaccines — making it a validated immune adjuvant.",
    cite: "Panatto D et al. Hum Vaccin. 2011;7(10):1083–1090.",
    tags: ["Vaccine adjuvant", "Antibody production", "Immunosenescence"],
  },
  {
    n: "06", title: "Antioxidant & Oxidative Stress Protection",
    body: "Thymosin Alpha-1 amplifies catalase, superoxide dismutase, and glutathione peroxidase activity, reducing reactive oxygen species and protecting hepatic and pancreatic tissue from oxidative damage — providing systemic antioxidant protection alongside its immune-modulating effects.",
    cite: "Armutcu F et al. Clin Biochem. 2011;44(16):1322–1327.",
    tags: ["Antioxidant", "ROS reduction", "Hepatoprotection"],
  },
];

/* ── Condition tag cloud ── */
const conditionTags = [
  "Recurrent Infections", "Immune Deficiency", "Chemotherapy Support", "Sepsis Recovery",
  "Chronic Fatigue", "Viral Illness", "Hepatitis B/C", "HIV Adjunct",
  "Mold Toxicity", "Vaccine Non-Response", "Cancer Adjunct", "Autoimmune Dysregulation",
  "Post-COVID Immune Dysfunction", "Fungal Infections", "Immunosenescence",
];

/* ── FAQ ── */
const faqs = [
  {
    q: "What is Thymosin Alpha-1 and where does it come from?",
    a: "Thymosin Alpha-1 (Tα1) is a 28-amino-acid peptide naturally produced by the thymus gland, first isolated from bovine thymus tissue in 1977. The synthetic form, thymalfasin (Zadaxin), is approved in over 35 countries for the treatment of hepatitis B and C and as an immune enhancer in immunocompromised states. It is one of the most clinically validated immunomodulatory peptides in existence, with decades of human clinical trial data across infectious disease, oncology, and immune deficiency applications.",
  },
  {
    q: "How does Thymosin Alpha-1 differ from conventional immunostimulants or immunosuppressants?",
    a: "Conventional immunostimulants (e.g., interferon, IL-2) broadly amplify immune activity and carry significant toxicity profiles. Immunosuppressants (e.g., corticosteroids, tacrolimus) blunt immune function globally. Thymosin Alpha-1 is an immune modulator — it restores immune balance rather than simply stimulating or suppressing. It activates deficient immune responses (T-cell maturation, NK cell activation) while simultaneously preventing cytokine storm and excessive inflammation. This bidirectional modulation is what makes it uniquely valuable across both immunodeficiency and hyperinflammatory conditions.",
  },
  {
    q: "What does the clinical evidence actually show?",
    a: "Thymosin Alpha-1 has an unusually robust human clinical evidence base for a peptide. It is approved in 35+ countries, has been studied in Phase 3 RCTs for hepatitis B and C, has demonstrated a 9% mortality reduction in sepsis in a multicenter RCT, and has been used clinically in China for COVID-19 since April 2020. A 2024 comprehensive review in PubMed concluded that Tα1 is 'a well-tolerated and effective immune modulator' with substantial evidence from clinical trials. Aurelius protocols are grounded in this peer-reviewed evidence base.",
  },
  {
    q: "How is Thymosin Alpha-1 administered?",
    a: "Thymosin Alpha-1 is administered subcutaneously (under the skin) via injection, typically 2–3 times per week. Standard dosing ranges from 1.6 mg to 3.2 mg per injection. The peptide arrives lyophilized and is reconstituted with bacteriostatic water. Reconstituted vials are stored refrigerated and used within 30 days. Injection sites are rotated (abdomen, thigh, upper arm). Aurelius provides a nurse onboarding session to certify proper administration technique before protocol initiation.",
  },
  {
    q: "How long until I see results?",
    a: "Immune marker improvements — increased CD4+/CD8+ counts, improved NK cell activity — are typically measurable at 4–8 weeks of consistent protocol use. Subjective improvements in energy, infection frequency, and recovery time are commonly reported at 3–6 weeks. For oncology adjunct applications, immune protection during chemotherapy is active from the first week of use. Long-term immune reconstitution benefits accumulate over 12–24 weeks of consistent protocol use.",
  },
  {
    q: "Is prescribing Thymosin Alpha-1 off-label legal in the United States?",
    a: "Thymalfasin (Zadaxin) received FDA orphan drug designation for DiGeorge syndrome. Outside that indication, Thymosin Alpha-1 is prescribed as a compounded peptide under the clinical judgment of a licensed physician. Off-label prescribing of compounded peptides is legal in the United States when a licensed physician documents clinical rationale and obtains informed consent. Thymosin Alpha-1 has an established safety profile from over 35 countries of approved clinical use. Aurelius physicians follow this protocol for every patient.",
  },
];

/* ── Eligibility Quiz ── */
function EligibilityQuiz() {
  const questions = [
    { q: "Are you currently taking immunosuppressive medications (e.g., tacrolimus, cyclosporine, mycophenolate) following an organ transplant?", disqualifier: "YES", note: "Immunosuppressive therapy post-transplant may interact with Thymosin Alpha-1's immune-activating effects. Physician evaluation required." },
    { q: "Do you have an active autoimmune condition currently being treated with biological agents (e.g., TNF inhibitors, anti-IL agents)?", disqualifier: "YES", note: "Active autoimmune therapy requires careful physician evaluation before initiating immune-modulating peptides." },
    { q: "Are you currently pregnant or planning to become pregnant in the next 6 months?", disqualifier: "YES", note: "Thymosin Alpha-1 has not been studied in pregnancy; safety data is insufficient." },
    { q: "Do you have a known hypersensitivity or allergy to thymosin alpha-1 or any thymic peptide preparation?", disqualifier: "YES", note: "Known hypersensitivity is a contraindication to Thymosin Alpha-1 therapy." },
    { q: "Do you experience any of the following: recurrent infections, immune deficiency, poor vaccine response, post-chemotherapy immune suppression, or chronic fatigue with immune dysfunction?", disqualifier: "NO", note: "These are the primary indications for ThymosinAlpha-1Rx protocol consideration." },
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
              <p style={{ ...s.bodyLt, marginBottom: 24 }}>One or more of your answers indicates a condition that may require modification of the standard Thymosin Alpha-1 protocol. Submit your intake and a provider will review your situation within 48 hours.</p>
              <a href="mailto:intake@aureliushealthgroup.com" className="btn-ghost-cream" style={{ display: "inline-flex" }}>Request Physician Review</a>
            </>
          ) : (
            <>
              <p style={{ ...s.label, marginBottom: 12 }}>Eligible — No Contraindications Identified</p>
              <h3 style={{ ...s.h3dk, marginBottom: 12, fontSize: "1.25rem" }}>Based on your responses, you appear to be a candidate for the ThymosinAlpha-1Rx protocol.</h3>
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

export default function ThymosinAlpha1Rx() {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  return (
    <div style={{ background: "#0D0D0D", minHeight: "100vh" }}>
      <Navbar productName="ThymosinAlpha-1Rx" />

      {/* ══ HERO ══ */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src={IMGS.hero} alt="ThymosinAlpha-1Rx hero" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,13,13,0.92) 0%, rgba(13,13,13,0.45) 50%, rgba(13,13,13,0.2) 100%)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem) clamp(60px,10vw,100px)", width: "100%" }}>
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
            <a href="https://aureliushealthgroup.com" style={{ ...s.label, color: "rgba(201,169,110,0.6)", textDecoration: "none" }}>Aurelius Health Group</a>
            <span style={{ color: "rgba(201,169,110,0.4)", fontSize: "0.7rem" }}>›</span>
            <span style={{ ...s.label }}>ThymosinAlpha-1<span style={{ color: DARK_ORANGE }}>Rx</span></span>
          </div>
          <h1 style={{ ...s.h1, maxWidth: 760, marginBottom: 24 }}>
            The immune peptide your<br />thymus was designed<br />to produce.
          </h1>
          <p style={{ ...s.bodyLt, maxWidth: 480, marginBottom: 16, fontSize: "1.0625rem" }}>
            Thymosin Alpha-1 is your body's own thymic hormone — the master regulator of T-cell immunity. It restores immune competence, resolves immune dysfunction, and protects against infection without stimulants, steroids, or systemic side effects.
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40 }}>
            {["Physician-supervised", "Pharma-grade compounded", "Subcutaneous delivery"].map((t) => (
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
              { val: "1977", label: "Isolated from thymus" },
              { val: "28 AA", label: "Polypeptide structure" },
              { val: "35+ countries", label: "Approved clinical use" },
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
            <h2 style={{ ...s.h2lt }}>Three signs your immune system's master regulator is failing</h2>
            <p style={{ ...s.body, paddingTop: 8 }}>
              Thymosin Alpha-1 is the most clinically validated immunomodulatory peptide in existence — approved in over 35 countries. Its effects span immune reconstitution, infection defense, and cancer adjunct therapy. These three presentations are the most common clinical indications for Thymosin Alpha-1 protocol consideration.
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
                  <p style={{ ...s.label, color: "#8C7B6B", marginBottom: 6 }}>TA-1 Mechanism</p>
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
              <h2 style={{ ...s.h2dk, marginBottom: 32 }}>A peptide derived from the body's own thymic immune regulation system.</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                {[
                  { label: "Origin", text: "Thymosin Alpha-1 is a 28-amino-acid peptide naturally produced by the thymus gland, first isolated from bovine thymus tissue in 1977. The synthetic form, thymalfasin, is produced via solid-phase chemical synthesis and is the only method accepted for clinical use. It is approved in over 35 countries for hepatitis B, hepatitis C, and immune enhancement." },
                  { label: "Classification", text: "Thymosin Alpha-1 is a polypeptide with a distorted helical configuration — featuring an alpha-helix from residues 14–26 and two beta turns at the N-terminal. It is a TLR-2 and TLR-9 agonist with pleiotropic effects across both innate and adaptive immunity, antiviral defense, antifungal response, and antitumor activity." },
                  { label: "Physiologic Role", text: "Thymosin Alpha-1 drives T-cell maturation and CD4+/CD8+ differentiation, activates natural killer cells and dendritic cells, upregulates IL-2, IL-12, IFN-α, and IFN-γ, and modulates cytokine balance to prevent both immunodeficiency and cytokine storm — making it uniquely effective across immune deficiency, infection, and oncology applications." },
                ].map((item) => (
                  <div key={item.label} style={{ borderLeft: "2px solid rgba(201,169,110,0.3)", paddingLeft: 20 }}>
                    <p style={{ ...s.label, marginBottom: 6 }}>{item.label}</p>
                    <p style={{ ...s.bodyLt, margin: 0, fontSize: "0.9rem" }}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Immune Cascade Flow Diagram */}
            <div>
              <p style={{ ...s.label, marginBottom: 20 }}>Thymosin Alpha-1 Immune Cascade</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {[
                  { node: "Thymosin Alpha-1", sub: "28 AA polypeptide derived from the thymus gland (thymalfasin)", color: "#C9A96E" },
                  { node: "TLR-2 / TLR-9 Activation", sub: "Toll-like receptor agonism on dendritic cells → innate immune signaling", color: "#B8956A" },
                  { node: "T-Cell Maturation & Differentiation", sub: "CD4+ helper T cells ↑, CD8+ cytotoxic T cells ↑, NK cells ↑", color: "#A07A55" },
                  { node: "Cytokine Optimization", sub: "IL-2 ↑, IL-12 ↑, IFN-α ↑, IFN-γ ↑, TNF-α ↓, IL-1β ↓", color: "#8C6845" },
                  { node: "Immune Competence Restored", sub: "Infection defense, cancer surveillance, vaccine response, cytokine balance", color: "#785535" },
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
                  {["", "Thymosin Alpha-1", "Corticosteroids", "Interferon", "IV Immunoglobulin", "Conventional Antibiotics"].map((h, i) => (
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
                  ["Primary action", "Immune modulation + T-cell restoration", "Broad immunosuppression", "Antiviral signaling", "Passive antibody transfer", "Bacterial target only"],
                  ["Restores T-cell function", "✓ CD4+/CD8+ activation", "✗ Suppresses T cells", "Partial (NK cells)", "✗ No", "✗ No"],
                  ["Cytokine balance", "✓ Bidirectional modulation", "✗ Broad suppression", "✗ Pro-inflammatory", "Partial", "✗ No effect"],
                  ["Antiviral activity", "✓ TLR-9 + MHC-I upregulation", "✗ Increases viral risk", "✓ Direct antiviral", "Partial", "✗ No"],
                  ["Side effect profile", "✓ Minimal — injection site only", "✗ High systemic toxicity", "✗ Significant toxicity", "✗ Infusion reactions", "✗ Resistance risk"],
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
              ["Primary action",        "Immune modulation + T-cell restoration", "Broad immunosuppression",  "Antiviral signaling",     "Passive antibody transfer", "Bacterial target only"],
              ["Restores T-cell function", "✓ CD4+/CD8+ activation",             "✗ Suppresses T cells",    "Partial (NK cells)",      "✗ No",                     "✗ No"],
              ["Cytokine balance",      "✓ Bidirectional modulation",             "✗ Broad suppression",     "✗ Pro-inflammatory",      "Partial",                  "✗ No effect"],
              ["Antiviral activity",    "✓ TLR-9 + MHC-I upregulation",          "✗ Increases viral risk",  "✓ Direct antiviral",      "Partial",                  "✗ No"],
              ["Side effect profile",   "✓ Minimal — injection site only",        "✗ High systemic toxicity","✗ Significant toxicity",  "✗ Infusion reactions",     "✗ Resistance risk"],
            ] as string[][]).map((row, ri) => {
              const cols = ["Thymosin Alpha-1", "Corticosteroids", "Interferon", "IV Immunoglobulin", "Conventional Antibiotics"];
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
                name: "ThymosinAlpha-1Rx",
                nameSuffix: "Rx",
                nameBase: "ThymosinAlpha-1",
                tag: "Immune Modulation",
                desc: "The thymus-derived polypeptide that restores T-cell immunity, activates innate defense, and resolves immune dysfunction — without steroids, stimulants, or systemic toxicity.",
                cta: "Check My Eligibility",
                ctaHref: "#quiz",
                featured: true,
              },
              {
                name: "SemaxRx",
                tag: "Neuroprotection",
                desc: "The ACTH-derived heptapeptide that upregulates BDNF, sharpens neural circuits, and resolves neuroinflammation — restoring cognitive performance without stimulants or dependence.",
                cta: "Get Started",
                ctaHref: "/semax",
                featured: false,
              },
              {
                name: "MOTS-c",
                tag: "Mitochondrial Health",
                desc: "The first peptide encoded in mitochondrial DNA. Activates AMPK — the master metabolic switch — restoring cellular energy, insulin sensitivity, and longevity signaling from the source.",
                cta: "Get Started",
                ctaHref: "#",
                featured: false,
              },
              {
                name: "Tesamorelin",
                tag: "Visceral Fat",
                desc: "An FDA-studied GHRH analogue that reduces visceral adipose tissue and improves metabolic markers. The only peptide with Phase 3 RCT data for abdominal fat reduction.",
                cta: "Get Started",
                ctaHref: "#",
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
                    ...(peptide.featured
                      ? { background: "#C9A96E", color: "#0D0D0D", border: "1px solid #C9A96E" }
                      : { background: "transparent", color: "rgba(245,240,232,0.6)", border: "1px solid rgba(245,240,232,0.15)" }
                    ),
                  }}
                  onMouseEnter={(e) => {
                    if (!peptide.featured) {
                      e.currentTarget.style.borderColor = "rgba(201,169,110,0.4)";
                      e.currentTarget.style.color = "#C9A96E";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!peptide.featured) {
                      e.currentTarget.style.borderColor = "rgba(245,240,232,0.15)";
                      e.currentTarget.style.color = "rgba(245,240,232,0.6)";
                    }
                  }}
                >
                  {peptide.cta}
                </a>
              </div>
            ))}
          </div>

          {/* Discover More link */}
          <div style={{ textAlign: "center" }}>
            <a
              href="/peptides"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                fontFamily: DM, fontWeight: 500, fontSize: "0.875rem", letterSpacing: "0.04em",
                color: "#1A1A1A", textDecoration: "none",
                border: "1px solid rgba(13,13,13,0.2)", padding: "14px 28px", borderRadius: 6,
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#C9A96E"; e.currentTarget.style.color = "#C9A96E"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(13,13,13,0.2)"; e.currentTarget.style.color = "#1A1A1A"; }}
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
            <h2 style={{ ...s.h2lt }}>Six evidence-backed immune pathways</h2>
            <p style={{ ...s.body, paddingTop: 8 }}>Each pathway is supported by peer-reviewed clinical research and over four decades of global clinical experience. Thymosin Alpha-1 is approved in 35+ countries — its evidence base is among the strongest of any therapeutic peptide in clinical use.</p>
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
                  <strong style={{ color: "#1A1A1A" }}>{activeTag}</strong> — Thymosin Alpha-1 addresses this condition through its multi-pathway immune cascade: TLR activation, T-cell maturation, cytokine optimization, and antioxidant protection. Speak with a physician to understand how this applies to your specific case.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ══ CELLS IMAGE BREAK ══ */}
      <section style={{ background: "#0D0D0D", padding: 0 }}>
        <div style={{ position: "relative", maxHeight: 500, overflow: "hidden" }}>
          <img src={IMGS.cells} alt="Immune cells" style={{ width: "100%", objectFit: "cover", objectPosition: "center", display: "block" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(13,13,13,0.85) 0%, transparent 40%, transparent 60%, rgba(13,13,13,0.85) 100%)" }} />
          <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", textAlign: "center", width: "100%", padding: "0 1.25rem" }}>
            <p style={{ ...s.label, marginBottom: 8 }}>Thymic Origin</p>
            <p style={{ fontFamily: DM, fontWeight: 300, fontSize: "clamp(1.1rem, 2.5vw, 2rem)", color: "#F5F0E8", letterSpacing: "-0.02em" }}>The only immune peptide derived from the body's own master regulator of T-cell immunity — approved in 35+ countries</p>
          </div>
        </div>
      </section>

      {/* ══ PROTOCOL STEPS — DARK THEME ══ */}
      <section style={{ background: "#0D0D0D", padding: "clamp(60px,8vw,100px) 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,2.5rem)" }}>
          <p style={{ ...s.label, marginBottom: 16 }}>The Protocol</p>
          <div className="two-col-header" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, alignItems: "start", marginBottom: 64 }}>
            <h2 style={{ ...s.h2dk }}>Four steps from intake to results</h2>
            <p style={{ ...s.bodyLt, paddingTop: 8 }}>Designed to mirror the infrastructure of the published research — physician oversight, comprehensive baseline immune labs, pharma-grade compound, and quantified immune outcomes at 8–12 weeks.</p>
          </div>
          <div className="four-col-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
            {[
              {
                n: "1", title: "Assessment & Intake", tag: "Required",
                items: ["Comprehensive health questionnaire", "Immune symptom and history mapping", "Medication and supplement review", "Physician review within 48 hours", "Contraindication screening"],
              },
              {
                n: "2", title: "Baseline Immune Labs", tag: "Required",
                items: ["CBC with differential (lymphocyte subsets)", "CD4+/CD8+ T-cell panel", "NK cell activity assessment", "Comprehensive metabolic panel (CMP)", "Immunoglobulin levels (IgG, IgA, IgM)", "Inflammatory markers (CRP, ESR)"],
              },
              {
                n: "3", title: "Protocol Initiation", tag: "Week 1",
                items: ["Thymosin Alpha-1 1.6–3.2 mg compounded, lyophilized", "Bacteriostatic water + sterile supplies shipped", "Cold-packed, overnight delivery", "Nurse onboarding session (video)", "Subcutaneous injection certification"],
              },
              {
                n: "4", title: "Monitoring & Optimization", tag: "Ongoing",
                items: ["Monthly provider check-ins", "Immune labs repeated at 8–12 weeks", "CD4+/CD8+ outcome assessment", "Protocol adjustment based on response", "Ongoing direct messaging support"],
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
              <h2 style={{ ...s.h2lt, marginBottom: 20 }}>Immunology pricing. Without the specialist markup.</h2>
              <p style={{ ...s.body, marginBottom: 24 }}>
                Immunology and infectious disease specialists typically charge $400–$900 per consultation, $300–$600 per follow-up, and $400–$800/month for compounded peptides — billed separately. Aurelius bundles physician oversight, immune labs, compound, and monitoring into one monthly plan.
              </p>
              <div style={{ background: "rgba(201,169,110,0.06)", border: "1px solid rgba(201,169,110,0.15)", borderRadius: 8, padding: "20px 24px", marginBottom: 28 }}>
                <p style={{ fontFamily: DM, fontWeight: 500, fontSize: "0.875rem", color: "#1A1A1A", marginBottom: 8 }}>Typical immunology cost breakdown:</p>
                {[
                  ["Initial immunology consult", "$400–$900"],
                  ["Comprehensive immune lab panel", "$400–$700"],
                  ["Monthly compound cost", "$400–$800"],
                  ["Monthly follow-up visits", "$200–$400"],
                  ["Total first month", "$1,400–$2,800"],
                ].map(([item, cost]) => (
                  <div key={item} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid rgba(13,13,13,0.06)" }}>
                    <span style={{ ...s.bodySm }}>{item}</span>
                    <span style={{ fontFamily: DM, fontWeight: 500, fontSize: "0.875rem", color: "#8C6845" }}>{cost}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {["Physician consultation included", "Full immune lab panel included", "Pharma-grade Thymosin Alpha-1 included", "Nurse onboarding included", "Monthly check-ins included", "No hidden fees"].map((item) => (
                  <div key={item} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#C9A96E" strokeWidth="1.2"/><path d="M5 8l2 2 4-4" stroke="#C9A96E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span style={{ ...s.bodySm }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ background: "#0D0D0D", borderRadius: 12, padding: "clamp(32px,5vw,48px) clamp(24px,4vw,40px)", textAlign: "center", border: "1px solid rgba(201,169,110,0.15)" }}>
                <p style={{ ...s.label, marginBottom: 12 }}>ThymosinAlpha-1Rx Plan</p>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: 4, marginBottom: 8 }}>
                  <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "1.25rem", color: "#C9A96E", marginTop: 10 }}>$</span>
                  <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "clamp(3.5rem,8vw,5rem)", lineHeight: 1, letterSpacing: "-0.04em", color: "#F5F0E8" }}>249</span>
                  <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "1rem", color: "rgba(245,240,232,0.4)", marginTop: 16 }}>/mo</span>
                </div>
                <p style={{ ...s.bodyLt, fontSize: "0.8rem", marginBottom: 32 }}>vs. $1,400–$2,800/mo at an immunology clinic</p>
                <a href="#quiz" className="btn-gold" style={{ width: "100%", justifyContent: "center", display: "flex", marginBottom: 16 }}>Check My Eligibility</a>
                <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.75rem", color: "rgba(245,240,232,0.25)", lineHeight: 1.6 }}>Cancel anytime. No long-term commitment required.</p>
                <div style={{ borderTop: "1px solid rgba(245,240,232,0.06)", marginTop: 28, paddingTop: 24, display: "flex", flexDirection: "column", gap: 10 }}>
                  {["Physician-supervised protocol", "Pharma-grade compounded TA-1", "Immune lab panel at 8–12 weeks", "Monthly provider check-ins", "Cold-chain overnight delivery"].map((item) => (
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
          <h2 style={{ ...s.h2dk, textAlign: "center", marginBottom: 16 }}>Are you a candidate for ThymosinAlpha-1Rx?</h2>
          <p style={{ ...s.bodyLt, textAlign: "center", maxWidth: 520, margin: "0 auto 56px" }}>
            This 5-question screen checks for Thymosin Alpha-1 protocol contraindications. It takes under 60 seconds and does not constitute a medical evaluation.
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
              <p style={{ ...s.bodyLt }}>Including Thymosin Alpha-1 vs. conventional immunotherapy, honest research framing, administration, timeline, and off-label prescribing legality.</p>
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
            Your immune system already<br />knows how to protect you.<br />It just needs the right signal.
          </h2>
          <p style={{ ...s.bodyLt, marginBottom: 48, fontSize: "1.0625rem" }}>
            Thymosin Alpha-1 is the peptide your thymus produces naturally to regulate and restore immune function — now available as a physician-supervised protocol designed for the immune conditions that haven't responded to anything else.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 20 }}>
            <a href="#quiz" className="btn-gold" style={{ padding: "16px 36px", fontSize: "1rem" }}>Check My Eligibility</a>
            <a href="#research" className="btn-ghost-cream" style={{ padding: "16px 36px", fontSize: "1rem" }}>Review the Research</a>
          </div>
          <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.75rem", color: "rgba(245,240,232,0.25)", lineHeight: 1.6, maxWidth: 560, margin: "0 auto" }}>
            † This page describes off-label use of Thymosin Alpha-1, a compounded peptide. The synthetic form (thymalfasin/Zadaxin) is approved in 35+ countries; U.S. use is as a compounded peptide prescribed at the clinical discretion of a licensed physician. This content is for informational purposes only and does not constitute medical advice. Individual results vary. All protocols require physician evaluation and are subject to contraindication screening.
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
                  <span style={{ fontFamily: DM, fontWeight: 500, fontSize: "0.875rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#F5F0E8", display: "block" }}>ThymosinAlpha-1<span style={{ color: DARK_ORANGE }}>Rx</span></span>
                  <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#8C7B6B" }}>Aurelius Health Group</span>
                </div>
              </div>
              <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.875rem", color: "rgba(245,240,232,0.35)", maxWidth: 240, marginTop: 12, lineHeight: 1.6 }}>Physician-supervised Thymosin Alpha-1 protocol for immune restoration, infection defense, and cancer adjunct therapy.</p>
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
          .comparison-table-wrap table { display: none !important; }
          .comparison-table-cards { display: flex !important; }
        }
        @media (min-width: 701px) {
          .comparison-table-cards { display: none !important; }
        }

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
