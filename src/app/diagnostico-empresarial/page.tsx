"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import s from "./diagnostico.module.css";

const DIMENSIONS = [
  { id: "team", name: "Equipo y talento", cat: "Capacidad" },
  { id: "process", name: "Proceso de diseño", cat: "Capacidad" },
  { id: "strategy", name: "Diseño en la estrategia", cat: "Integración" },
  { id: "culture", name: "Cultura organizacional", cat: "Integración" },
  { id: "ops", name: "Operaciones y governance", cat: "Escala" },
  { id: "impact", name: "Medición de impacto", cat: "Escala" },
];

const QUESTIONS_FOUNDER = [
  { dim: "team", cat: "Equipo y talento", text: "¿Cómo está conformada la función de diseño en tu empresa hoy?", context: "Esto nos ayuda a entender tu punto de partida.", options: [
    { text: "No tenemos diseñador. El producto lo definen engineering o producto.", score: 1 },
    { text: "Tenemos 1-2 diseñadores pero no hay liderazgo de diseño.", score: 2 },
    { text: "Hay un equipo pequeño con un lead, pero sin dirección estratégica formal.", score: 3 },
    { text: "Hay un equipo de diseño con liderazgo senior y roles diferenciados.", score: 4 },
  ]},
  { dim: "team", cat: "Equipo y talento", text: "¿Cómo contratas y evalúas talento de diseño?", options: [
    { text: "No tenemos criterio claro. Contratamos cuando hay dolor evidente.", score: 1 },
    { text: 'Buscamos perfiles generalistas que "sepan de todo un poco".', score: 2 },
    { text: "Tenemos roles definidos pero no career paths ni growth frameworks.", score: 3 },
    { text: "Roles claros, career paths, y un proceso de evaluación estructurado.", score: 4 },
  ]},
  { dim: "process", cat: "Proceso de diseño", text: "¿Cómo se toman las decisiones sobre qué construir y cómo?", context: "Piensa en el último feature o producto que lanzaron.", options: [
    { text: "Los founders o stakeholders deciden qué y cómo. Se ejecuta directo.", score: 1 },
    { text: "Producto define el qué, diseño hace wireframes o mockups del cómo.", score: 2 },
    { text: "Hay discovery con research y diseño antes de definir la solución.", score: 3 },
    { text: "Diseño co-lidera discovery, prototipa, valida con usuarios, e itera post-launch.", score: 4 },
  ]},
  { dim: "process", cat: "Proceso de diseño", text: "¿Qué pasa cuando un diseño no funciona como se esperaba post-lanzamiento?", options: [
    { text: "No lo sabemos. No medimos el impacto de decisiones de diseño.", score: 1 },
    { text: "A veces nos enteramos por feedback de soporte o quejas.", score: 2 },
    { text: "Revisamos métricas post-launch pero no siempre iteramos.", score: 3 },
    { text: "Hay ciclos de medición e iteración continua con ownership de diseño.", score: 4 },
  ]},
  { dim: "strategy", cat: "Diseño en la estrategia", text: "¿Diseño tiene voz en las decisiones estratégicas del producto?", options: [
    { text: "No. Las decisiones estratégicas son de founders y/o producto.", score: 1 },
    { text: "Se consulta a diseño ocasionalmente, pero no tiene voto.", score: 2 },
    { text: "Diseño participa en planning y roadmap con voz activa.", score: 3 },
    { text: "Diseño co-define la visión de producto y prioridades estratégicas.", score: 4 },
  ]},
  { dim: "strategy", cat: "Diseño en la estrategia", text: "¿Cómo se conecta el trabajo de diseño con los objetivos de negocio?", options: [
    { text: "No hay conexión explícita. Diseño entrega pantallas.", score: 1 },
    { text: "Hay métricas de usabilidad pero no se vinculan a revenue o growth.", score: 2 },
    { text: "Algunas iniciativas de diseño se miden contra KPIs de negocio.", score: 3 },
    { text: "Diseño tiene OKRs propios vinculados directamente a resultados de negocio.", score: 4 },
  ]},
  { dim: "culture", cat: "Cultura organizacional", text: "¿Cómo ven engineering y producto al equipo de diseño?", context: "Piensa en la dinámica real del día a día, no en lo que se dice en all-hands.", options: [
    { text: '"Hacen que se vea bien". Diseño es cosmético.', score: 1 },
    { text: "Respetan el trabajo pero no entienden bien el valor estratégico.", score: 2 },
    { text: "Valoran a diseño y lo involucran temprano en la mayoría de proyectos.", score: 3 },
    { text: "Diseño es considerado par estratégico. No se toman decisiones de producto sin diseño.", score: 4 },
  ]},
  { dim: "culture", cat: "Cultura organizacional", text: "¿Qué pasa cuando diseño y negocio/producto tienen perspectivas diferentes?", options: [
    { text: "Gana negocio/producto. Siempre.", score: 1 },
    { text: "Se escucha a diseño pero la decisión final es de negocio.", score: 2 },
    { text: "Se busca evidencia (research, datos) para resolver el desacuerdo.", score: 3 },
    { text: "Hay un framework de decisión donde la evidencia de usuario tiene peso real.", score: 4 },
  ]},
  { dim: "ops", cat: "Operaciones y governance", text: "¿Tienen un design system o componentes compartidos?", options: [
    { text: "No. Cada proyecto empieza de cero.", score: 1 },
    { text: "Hay componentes sueltos pero sin sistema ni governance.", score: 2 },
    { text: "Hay un design system con documentación pero adopción parcial.", score: 3 },
    { text: "Design system maduro, adoptado por engineering, con governance y ownership.", score: 4 },
  ]},
  { dim: "ops", cat: "Operaciones y governance", text: "¿Cómo se coordina el trabajo de diseño con el resto de la organización?", options: [
    { text: "Cada diseñador se coordina por su cuenta con su squad o PM.", score: 1 },
    { text: "Hay reuniones esporádicas de diseño pero sin estructura.", score: 2 },
    { text: "Hay rituales definidos (crits, reviews, syncs) con cadencia regular.", score: 3 },
    { text: "Design Ops formalizado: rituales, playbooks, governance, mejora continua.", score: 4 },
  ]},
  { dim: "impact", cat: "Medición de impacto", text: "¿Puedes articular cuánto valor genera (o ahorra) el equipo de diseño?", context: "Piensa en si podrías defender el presupuesto de diseño con números.", options: [
    { text: "No. No medimos el impacto de diseño en métricas de negocio.", score: 1 },
    { text: "Tenemos intuición de que agrega valor pero no datos concretos.", score: 2 },
    { text: "Algunas iniciativas tienen métricas de impacto claras.", score: 3 },
    { text: "Podemos reportar impacto de diseño en revenue, retention, o cost savings.", score: 4 },
  ]},
  { dim: "impact", cat: "Medición de impacto", text: "¿Cómo evalúas si tu inversión en diseño está dando resultados?", options: [
    { text: "No lo evalúo. Es un costo que asumimos.", score: 1 },
    { text: "Evalúo si los entregables se ven bien y si el equipo cumple deadlines.", score: 2 },
    { text: "Mido calidad de producto (NPS, usabilidad) pero no ROI directo.", score: 3 },
    { text: "Tengo métricas claras de ROI de diseño que reporto a board/leadership.", score: 4 },
  ]},
];

const QUESTIONS_CPO = QUESTIONS_FOUNDER.map((q) => ({ ...q }));
QUESTIONS_CPO[0] = { ...QUESTIONS_CPO[0], text: "¿Cómo está estructurada la función de diseño dentro de tu organización de producto?" };
QUESTIONS_CPO[4] = { ...QUESTIONS_CPO[4], text: "¿Cómo se integra diseño en tu proceso de planning y priorización?" };
QUESTIONS_CPO[10] = { ...QUESTIONS_CPO[10], text: "¿Puedes articular el ROI de tu equipo de diseño ante el board o C-suite?", context: "Piensa en tu último board review o budget conversation." };

const READINESS_LEVELS = [
  { min: 1, max: 1.5, name: "Pre-diseño", desc: "La función de diseño es inexistente o puramente reactiva. El producto se construye sin proceso de diseño formal." },
  { min: 1.5, max: 2.2, name: "Diseño táctico", desc: "Hay diseñadores pero sin dirección, sin proceso consistente, y sin conexión con la estrategia de negocio." },
  { min: 2.2, max: 3.0, name: "Diseño en transición", desc: "La organización reconoce el valor del diseño y está construyendo capacidad, pero falta consistencia y escala." },
  { min: 3.0, max: 3.6, name: "Diseño integrado", desc: "Diseño tiene proceso, voz, y métricas. El reto es escalar sin perder calidad ni velocidad." },
  { min: 3.6, max: 4.01, name: "Design-driven", desc: "Diseño es parte integral de la estrategia. La organización compite con diseño como ventaja." },
];

function getLevel(score: number) {
  return READINESS_LEVELS.find((l) => score >= l.min && score < l.max) || READINESS_LEVELS[READINESS_LEVELS.length - 1];
}

function getDimInsight(id: string, score: number) {
  const insights: Record<string, Record<string, string>> = {
    team: { low: "No hay estructura de diseño. El primer paso es definir qué tipo de diseñador necesitas (no \"alguien de UI\") y qué problema de negocio va a resolver.", mid: "Tienes talento pero sin dirección. Necesitas alguien senior que defina roles, expectativas, y crecimiento del equipo.", high: "Equipo estructurado. El siguiente paso es asegurar que el liderazgo de dise��o tenga influence real en la dirección de producto." },
    process: { low: "Sin proceso, cada proyecto es improvisación. Establece un flujo mínimo: entender el problema → explorar → validar → construir → medir.", mid: "Hay proceso pero inconsistente. Documenta lo que funciona y hazlo el estándar. Un design review semanal puede ser transformador.", high: "Proceso sólido. Mide ahora la eficiencia: tiempo de ciclo, cuánto rework se genera, y satisfacción del equipo con el proceso." },
    strategy: { low: "Diseño no tiene voz en la estrategia. Si quieres que diseño genere impacto de negocio, necesita estar presente cuando se definen las prioridades.", mid: "Diseño tiene voz parcial. Formaliza su participación: que tenga un asiento permanente en planning, no invitaciones esporádicas.", high: "Diseño es estratégico. Mantén eso con métricas de impacto visibles y comunicación regular a leadership." },
    culture: { low: "Diseño se percibe como cosmético. Esto se cambia con resultados medibles, no con evangelización. Muestra impacto en números que le importan al negocio.", mid: "Hay respeto pero no integración profunda. Invita a otros equipos al proceso de diseño (research, reviews) para construir entendimiento.", high: "Cultura design-aware. Esto es frágil: documéntalo, institucionalízalo, y protégelo de cambios de liderazgo." },
    ops: { low: "Sin governance ni sistemas compartidos. Empieza con un design system mínimo (10 componentes) y 1 ritual semanal.", mid: "Hay piezas pero no sistema. Conecta design system + rituales + procesos en un loop coherente con ownership claro.", high: "Ops maduro. Automatiza lo repetitivo y mide la eficiencia operativa del equipo de diseño." },
    impact: { low: "No se mide el impacto de diseño. Empieza retroactivamente: identifica 2-3 decisiones de diseño recientes y conecta con métricas de negocio.", mid: "Hay intuición de valor pero no datos. Establece un sistema simple: para cada iniciativa de diseño, define el metric que debería mover ANTES de diseñar.", high: "Impacto medible. Usa estos datos para hacer el caso de inversión en diseño y expandir el equipo." },
  };
  const lev = score < 2 ? "low" : score < 3 ? "mid" : "high";
  return insights[id]?.[lev] || "";
}

function getRoadmap(sorted: { id: string }[]) {
  const steps: Record<string, { title: string; desc: string }> = {
    team: { title: "Estructura tu equipo de diseño", desc: "Define roles claros, establece expectativas por nivel, y contrata con intención. Si no tienes presupuesto para un líder full-time, considera un modelo fraccional." },
    process: { title: "Formaliza tu proceso de diseño", desc: "Implementa un flujo de 4 pasos (discovery → diseño → validación → iteración) y establece design reviews semanales." },
    strategy: { title: "Dale a diseño un asiento en la mesa", desc: "Incluye a diseño en planning desde el inicio. Que presente insights de usuario y propuestas de dirección, no solo mockups terminados." },
    culture: { title: "Construye credibilidad con resultados", desc: "Elige 1-2 proyectos donde diseño pueda demostrar impacto medible en métricas de negocio. Comunica los resultados ampliamente." },
    ops: { title: "Establece governance de diseño básico", desc: "Crea un design system starter, define ownership, y establece rituales de calidad (crits, reviews). Sin esto, escalar es imposible." },
    impact: { title: "Conecta diseño con métricas de negocio", desc: "Para cada iniciativa, define el KPI de negocio que debería mover antes de empezar. Post-launch, mide y reporta." },
  };
  return sorted.slice(0, 3).map((d) => steps[d.id]);
}

function drawRadarChart(canvas: HTMLCanvasElement, answers: Record<number, number>, questions: typeof QUESTIONS_FOUNDER) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const W = 300, H = 300, cx = W / 2, cy = H / 2, R = 105;
  canvas.width = W * 2; canvas.height = H * 2;
  canvas.style.width = W + "px"; canvas.style.height = H + "px";
  ctx.scale(2, 2);
  const dimScores: Record<string, { total: number; count: number }> = {};
  DIMENSIONS.forEach((d) => { dimScores[d.id] = { total: 0, count: 0 }; });
  Object.keys(answers).forEach((qi) => {
    const q = questions[Number(qi)];
    dimScores[q.dim].total += q.options[answers[Number(qi)]].score;
    dimScores[q.dim].count++;
  });
  const scores = DIMENSIONS.map((d) => dimScores[d.id].count > 0 ? dimScores[d.id].total / dimScores[d.id].count : 0);
  const n = scores.length;
  for (let lv = 1; lv <= 4; lv++) {
    ctx.beginPath();
    for (let i = 0; i <= n; i++) {
      const a = (Math.PI * 2 * (i % n)) / n - Math.PI / 2;
      const r = (lv / 4) * R;
      i === 0 ? ctx.moveTo(cx + r * Math.cos(a), cy + r * Math.sin(a)) : ctx.lineTo(cx + r * Math.cos(a), cy + r * Math.sin(a));
    }
    ctx.closePath(); ctx.strokeStyle = lv === 4 ? "#E0DCD5" : "#F0EDE8"; ctx.lineWidth = 1; ctx.stroke();
  }
  for (let i = 0; i < n; i++) {
    const a = (Math.PI * 2 * i) / n - Math.PI / 2;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + R * Math.cos(a), cy + R * Math.sin(a));
    ctx.strokeStyle = "#E0DCD5"; ctx.lineWidth = 1; ctx.stroke();
  }
  ctx.beginPath();
  scores.forEach((sc, i) => {
    const a = (Math.PI * 2 * i) / n - Math.PI / 2; const r = (sc / 4) * R;
    i === 0 ? ctx.moveTo(cx + r * Math.cos(a), cy + r * Math.sin(a)) : ctx.lineTo(cx + r * Math.cos(a), cy + r * Math.sin(a));
  });
  ctx.closePath(); ctx.fillStyle = "rgba(196,155,26,0.12)"; ctx.fill();
  ctx.strokeStyle = "#C49B1A"; ctx.lineWidth = 2; ctx.stroke();
  scores.forEach((sc, i) => {
    const a = (Math.PI * 2 * i) / n - Math.PI / 2; const r = (sc / 4) * R;
    ctx.beginPath(); ctx.arc(cx + r * Math.cos(a), cy + r * Math.sin(a), 4, 0, Math.PI * 2);
    ctx.fillStyle = "#C49B1A"; ctx.fill();
  });
  ctx.font = '500 11px "DM Sans", sans-serif'; ctx.textAlign = "center";
  DIMENSIONS.forEach((d, i) => {
    const a = (Math.PI * 2 * i) / n - Math.PI / 2; const lr = R + 30;
    const x = cx + lr * Math.cos(a), y = cy + lr * Math.sin(a);
    ctx.fillStyle = "#C49B1A";
    const words = d.name.split(" ");
    if (words.length > 2) { const mid = Math.ceil(words.length / 2); ctx.fillText(words.slice(0, mid).join(" "), x, y - 6); ctx.fillText(words.slice(mid).join(" "), x, y + 8); }
    else ctx.fillText(d.name, x, y + 3);
  });
}

export default function DiagnosticoEmpresarial() {
  const [step, setStep] = useState<"role" | "intro" | "question" | "results">("role");
  const [role, setRole] = useState<"founder" | "cpo" | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [unlocked, setUnlocked] = useState(false);

  const questions = role === "cpo" ? QUESTIONS_CPO : QUESTIONS_FOUNDER;

  const doDrawRadar = useCallback(() => {
    const canvas = document.getElementById("radarCanvas") as HTMLCanvasElement | null;
    if (canvas) drawRadarChart(canvas, answers, questions);
  }, [answers, questions]);

  useEffect(() => {
    if (step === "results") setTimeout(doDrawRadar, 50);
  }, [step, unlocked, doDrawRadar]);

  function selectOption(i: number) { setAnswers({ ...answers, [currentQ]: i }); }
  function next() {
    if (answers[currentQ] === undefined) return;
    if (currentQ < questions.length - 1) { setCurrentQ(currentQ + 1); window.scrollTo(0, 0); }
    else { setStep("results"); window.scrollTo(0, 0); }
  }
  function prev() { if (currentQ > 0) { setCurrentQ(currentQ - 1); window.scrollTo(0, 0); } }
  function restart() { setAnswers({}); setCurrentQ(0); setUnlocked(false); setStep("role"); setRole(null); window.scrollTo(0, 0); }

  // Compute
  const dimScores: Record<string, { total: number; count: number; avg: number }> = {};
  DIMENSIONS.forEach((d) => { dimScores[d.id] = { total: 0, count: 0, avg: 0 }; });
  Object.keys(answers).forEach((qi) => {
    const q = questions[Number(qi)];
    dimScores[q.dim].total += q.options[answers[Number(qi)]].score;
    dimScores[q.dim].count++;
  });
  DIMENSIONS.forEach((d) => { dimScores[d.id].avg = dimScores[d.id].count > 0 ? dimScores[d.id].total / dimScores[d.id].count : 0; });
  const overall = DIMENSIONS.reduce((sum, d) => sum + dimScores[d.id].avg, 0) / DIMENSIONS.length;
  const level = getLevel(overall);
  const sorted = DIMENSIONS.map((d) => ({ ...d, score: dimScores[d.id].avg })).sort((a, b) => a.score - b.score);
  const needsFractional = overall < 3.0 && dimScores["strategy"].avg < 2.5;

  return (
    <>
      <div className={s.dgHeader}>
        <div className={s.inner}>
          <div className={s.headerTag}>Diagnóstico para empresas</div>
          <h1 className={s.headerTitle}>¿Qué tan lista está tu empresa para <span className={s.headerTitleAccent}>escalar diseño</span>?</h1>
          <p className={s.headerDesc}>Evalúa la madurez de diseño de tu organización y descubre qué necesitas para convertir diseño en una ventaja competitiva real.</p>
        </div>
      </div>

      {step === "role" && (
        <div className={s.container}><div className={s.roleSection}>
          <h2 className={s.roleTitle}>Antes de empezar</h2>
          <p className={s.roleSubtitle}>Las preguntas se adaptan a tu contexto. ¿Cuál describe mejor tu rol?</p>
          <div className={s.roleCards}>
            <div className={`${s.roleCard} ${role === "founder" ? s.roleCardSelected : ""}`} onClick={() => setRole("founder")}>
              <div className={s.roleCardIcon}>🚀</div>
              <div className={s.roleCardTitle}>Founder / CEO</div>
              <div className={s.roleCardDesc}>Estoy evaluando si necesito invertir en diseño o cómo escalar lo que tengo.</div>
            </div>
            <div className={`${s.roleCard} ${role === "cpo" ? s.roleCardSelected : ""}`} onClick={() => setRole("cpo")}>
              <div className={s.roleCardIcon}>📊</div>
              <div className={s.roleCardTitle}>CPO / VP Producto</div>
              <div className={s.roleCardDesc}>Ya tengo equipo de diseño y quiero evaluar su madurez y potencial de escala.</div>
            </div>
          </div>
          <div style={{ marginTop: 36 }}>
            <button className={`${s.btn} ${s.btnGold}`} disabled={!role} onClick={() => { setStep("intro"); window.scrollTo(0, 0); }}>Continuar</button>
          </div>
        </div></div>
      )}

      {step === "intro" && (
        <div className={s.container}><div className={s.introSection}>
          <h2 className={s.introTitle}>¿Cómo funciona?</h2>
          <p className={s.introText}>{role === "founder" ? "Como founder/CEO" : "Como líder de producto"}, vas a responder 12 preguntas sobre 6 dimensiones de madurez de diseño. Toma ~5 minutos.</p>
          <div className={s.introDims}>
            {[["Equipo", "Talento, roles, y estructura"], ["Proceso", "Cómo se diseña y decide"], ["Estrategia", "Diseño en decisiones clave"], ["Cultura", "Cómo se percibe diseño"], ["Operaciones", "Sistemas, governance, ops"], ["Impacto", "Medición y ROI"]].map(([label, desc]) => (
              <div className={s.introDim} key={label}><div className={s.introDimLabel}>{label}</div><div className={s.introDimDesc}>{desc}</div></div>
            ))}
          </div>
          <p className={s.introText}>Al final recibes tu nivel de Design Readiness con un análisis de cada dimensión y recomendaciones de siguientes pasos.</p>
          <div className={s.introNote}>Creado por Diana Perez, Strategic Product Design Leader con 10+ años construyendo y escalando funciones de diseño en fintech y mercados emergentes.</div>
          <div style={{ marginTop: 36 }}>
            <button className={`${s.btn} ${s.btnGold}`} onClick={() => { setStep("question"); setCurrentQ(0); window.scrollTo(0, 0); }}>Comenzar evaluación</button>
          </div>
        </div></div>
      )}

      {step === "question" && (
        <>
          <div className={s.progressWrap}><div className={s.container}>
            <div className={s.progressBarBg}><div className={s.progressBarFill} style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }} /></div>
            <div className={s.progressInfo}>
              <span className={s.progressStep}>Pregunta {currentQ + 1} de {questions.length}</span>
              <span>{questions[currentQ].cat}</span>
            </div>
          </div></div>
          <div className={s.container}><div className={s.questionSection}>
            <div className={s.questionCategory}>{questions[currentQ].cat}</div>
            <h2 className={s.questionText}>{questions[currentQ].text}</h2>
            {questions[currentQ].context && <div className={s.questionContext}>{questions[currentQ].context}</div>}
            <div className={s.options}>
              {questions[currentQ].options.map((opt, i) => (
                <div key={i} className={`${s.option} ${answers[currentQ] === i ? s.optionSelected : ""}`} onClick={() => selectOption(i)}>
                  <div className={s.optionRadio}>{answers[currentQ] === i && <div className={s.optionRadioFill} />}</div>
                  <div className={s.optionText}>{opt.text}</div>
                </div>
              ))}
            </div>
            <div className={s.navButtons}>
              <button className={`${s.btn} ${s.btnSecondary}`} onClick={prev} style={{ visibility: currentQ === 0 ? "hidden" : "visible" }}>← Anterior</button>
              <button className={`${s.btn} ${s.btnGold}`} onClick={next} disabled={answers[currentQ] === undefined}>{currentQ === questions.length - 1 ? "Ver resultados" : "Siguiente →"}</button>
            </div>
          </div></div>
        </>
      )}

      {step === "results" && (
        <div className={s.container}><div className={s.resultsSection}>
          <div className={`${s.resultsBox} ${!unlocked ? s.resultsLocked : ""}`}>
            <div className={s.resultsOverall}>
              <div className={s.readinessLabel}>Design Readiness Score</div>
              <div className={s.readinessScore}>{overall.toFixed(1)}</div>
              <div className={s.readinessName}>{level.name}</div>
              <div className={s.readinessDesc}>{level.desc}</div>
            </div>
            <div className={s.dimsGrid}>
              {DIMENSIONS.map((d) => (
                <div className={s.dimCard} key={d.id}>
                  <div className={s.dimScore}>{dimScores[d.id].avg.toFixed(1)}</div>
                  <div className={s.dimName}>{d.name}</div>
                </div>
              ))}
            </div>
            <div className={s.radarWrap}><canvas id="radarCanvas" width={300} height={300} style={{ width: "100%", height: "100%" }} /></div>

            {unlocked && (
              <div className={s.resultsFull}>
                <h3 className={s.resultsRoadmapTitle}>Análisis por dimensión</h3>
                {DIMENSIONS.map((d) => (
                  <div className={s.resultsDimDetail} key={d.id}>
                    <h4>{d.name}</h4>
                    <div className={s.scoreLine}>{dimScores[d.id].avg.toFixed(1)} / 4.0 — {d.cat}</div>
                    <p>{getDimInsight(d.id, dimScores[d.id].avg)}</p>
                  </div>
                ))}
                <div className={s.resultsRoadmap}>
                  <h3 className={s.resultsRoadmapTitle}>Tu roadmap: próximos 3 pasos</h3>
                  {getRoadmap(sorted).map((st, i) => (
                    <div className={s.roadmapStep} key={i}>
                      <div className={s.roadmapNum}>{i + 1}</div>
                      <div className={s.roadmapContent}><h4>{st.title}</h4><p>{st.desc}</p></div>
                    </div>
                  ))}
                </div>
                <div className={s.fractionalCta}>
                  <div className={s.fractionalCtaContent}>
                    <div className={s.fractionalCtaLabel}>{needsFractional ? "Una opción a considerar" : "¿Necesitas ayuda para implementar esto?"}</div>
                    <h4>{needsFractional ? "Head of Design Fraccional" : "Advisory estratégico en diseño"}</h4>
                    <p>{needsFractional ? "Si tu organización necesita dirección estratégica de diseño pero no está lista para un Head of Design full-time, un modelo fraccional puede cubrir ese gap." : "Si quieres acelerar la evolución de tu función de diseño con alguien que ya ha hecho este camino en fintech y mercados emergentes, podemos explorar un formato de advisory."}</p>
                  </div>
                  <Link href="/contact" className={`${s.btn} ${s.btnGold} ${s.fractionalCtaBtn}`}>Conversemos →</Link>
                </div>
                <div className={s.retakeCenter}>
                  <button className={`${s.btn} ${s.btnDark}`} onClick={restart}>Hacer el diagnóstico de nuevo</button>
                </div>
              </div>
            )}

            {!unlocked && (
              <div className={s.lockedOverlay}>
                <h3>Desbloquea tu diagnóstico completo</h3>
                <p>Obtén el análisis detallado por dimensión, tu gap analysis, roadmap de acción, y recomendaciones de inversión en diseño.</p>
                <div className={s.lockedIncludes}>
                  <span className={s.lockedInclude}>Análisis × 6 dimensiones</span>
                  <span className={s.lockedInclude}>Gap analysis</span>
                  <span className={s.lockedInclude}>Roadmap de acción</span>
                  <span className={s.lockedInclude}>Recomendación de inversión</span>
                </div>
                <div className={s.lockedPrice}>$45 USD</div>
                <button className={`${s.btn} ${s.btnGold}`} onClick={() => { setUnlocked(true); window.scrollTo(0, 0); }} style={{ marginRight: 12 }}>Desbloquear diagnóstico</button>
                <button className={`${s.btn} ${s.btnSecondary}`} onClick={restart}>Volver a hacer</button>
              </div>
            )}
          </div>
        </div></div>
      )}
    </>
  );
}
