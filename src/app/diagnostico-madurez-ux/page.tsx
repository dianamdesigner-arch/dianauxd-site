"use client";

import { useState, useEffect, useCallback } from "react";
import s from "./diagnostico.module.css";

const DIMENSIONS = [
  { id: "strategy", name: "Estrategia de diseño", category: "Madurez UX" },
  { id: "process", name: "Proceso y metodología", category: "Madurez UX" },
  { id: "culture", name: "Cultura de diseño", category: "Madurez UX" },
  { id: "ops", name: "Design Ops y governance", category: "Madurez UX" },
  { id: "influence", name: "Influencia en decisiones", category: "Nivel de Influencia" },
  { id: "scope", name: "Alcance del impacto", category: "Nivel de Influencia" },
];

const QUESTIONS = [
  { dim: "strategy", category: "Estrategia de diseño", text: "¿Cómo se involucra el diseño en las decisiones estratégicas de producto?", options: [
    { text: "Diseño no participa en decisiones de producto. Recibimos requerimientos ya definidos.", score: 1 },
    { text: "Nos invitan ocasionalmente a dar feedback, pero las decisiones ya están tomadas.", score: 2 },
    { text: "Diseño tiene voz en la definición del roadmap, pero no siempre voto.", score: 3 },
    { text: "Diseño co-lidera la estrategia de producto junto con PM y engineering.", score: 4 },
  ]},
  { dim: "strategy", category: "Estrategia de diseño", text: "¿Cómo se mide el impacto del trabajo de diseño en tu organización?", options: [
    { text: "No se mide. El éxito se asume si no hay quejas.", score: 1 },
    { text: "Se miden métricas de usabilidad básicas (NPS, satisfaction scores).", score: 2 },
    { text: "Se trackean métricas de producto que diseño influye (conversion, retention, task completion).", score: 3 },
    { text: "Diseño tiene métricas propias vinculadas a OKRs de negocio (revenue, growth, cost reduction).", score: 4 },
  ]},
  { dim: "process", category: "Proceso y metodología", text: "¿Cómo se estructura la investigación de usuario en tu equipo?", options: [
    { text: "No hacemos research. Diseñamos basándonos en requerimientos de stakeholders.", score: 1 },
    { text: "Hacemos research ad-hoc cuando hay tiempo o presupuesto.", score: 2 },
    { text: "Research es parte del proceso, pero no de todos los proyectos.", score: 3 },
    { text: "Research es continuo, programático, y alimenta directamente decisiones de producto.", score: 4 },
  ]},
  { dim: "process", category: "Proceso y metodología", text: "¿Cómo manejan la iteración y el feedback de diseño?", options: [
    { text: "Entregamos diseños y se implementan tal cual (o con cambios arbitrarios de dev).", score: 1 },
    { text: "Hay una ronda de revisión con stakeholders antes de implementar.", score: 2 },
    { text: "Iteramos basados en datos y feedback de users después del release.", score: 3 },
    { text: "Ciclos cortos de diseño, prototipo, test, release, y medición continua.", score: 4 },
  ]},
  { dim: "culture", category: "Cultura de diseño", text: '¿Cómo perciben el diseño otros equipos (engineering, producto, negocio)?', options: [
    { text: 'Como un servicio de producción visual. "Hazlo bonito."', score: 1 },
    { text: "Reconocen que aporta valor, pero no entienden bien qué hacemos.", score: 2 },
    { text: "Valoran el diseño como disciplina y buscan involucrarnos temprano.", score: 3 },
    { text: "El diseño es parte integral del pensamiento de producto en toda la organización.", score: 4 },
  ]},
  { dim: "culture", category: "Cultura de diseño", text: "¿Existe inversión formal en el crecimiento del equipo de diseño?", options: [
    { text: "No hay presupuesto ni plan para desarrollo del equipo de diseño.", score: 1 },
    { text: "Hay herramientas (Figma, etc.) pero no inversión en growth o capacitación.", score: 2 },
    { text: "Hay career paths definidos y oportunidades de mentoría.", score: 3 },
    { text: "Hay programa formal de crecimiento, conferencias, budget de aprendizaje, y liderazgo de diseño senior.", score: 4 },
  ]},
  { dim: "ops", category: "Design Ops y governance", text: "¿Tienen un design system o componentes compartidos?", options: [
    { text: "Cada diseñador arma sus propios componentes.", score: 1 },
    { text: "Hay una librería básica pero no se mantiene activamente.", score: 2 },
    { text: "Hay design system documentado con adopción parcial en engineering.", score: 3 },
    { text: "Design system maduro, adoptado, con governance, versionado, y ownership claro.", score: 4 },
  ]},
  { dim: "ops", category: "Design Ops y governance", text: "¿Cómo se coordinan los rituales y formas de trabajo del equipo de diseño?", options: [
    { text: "Cada quien trabaja por su cuenta. No hay rituales compartidos.", score: 1 },
    { text: "Hay standups o syncs, pero sin estructura clara.", score: 2 },
    { text: "Hay crits, reviews, y ceremonies definidas con cadencia regular.", score: 3 },
    { text: "Design Ops formalizado con rituales, templates, playbooks, y mejora continua de procesos.", score: 4 },
  ]},
  { dim: "influence", category: "Influencia en decisiones", text: "¿En qué momento del proceso de un feature o iniciativa te involucran?", options: [
    { text: 'Al final, para "diseñar" lo que ya se decidió.', score: 1 },
    { text: "En la fase de solución, cuando el problema ya está enmarcado.", score: 2 },
    { text: "Desde el discovery, participando en enmarcar el problema.", score: 3 },
    { text: "Desde la visión estratégica, definiendo qué problemas atacar.", score: 4 },
  ]},
  { dim: "influence", category: "Influencia en decisiones", text: '¿Puedes decir "no" o cambiar la dirección de un proyecto basándote en evidencia de diseño?', options: [
    { text: "No. Las decisiones vienen de arriba y se ejecutan.", score: 1 },
    { text: "Puedo expresar preocupaciones pero rara vez cambian algo.", score: 2 },
    { text: "Con evidencia sólida puedo influir en el alcance y enfoque.", score: 3 },
    { text: "Soy parte del grupo que decide dirección. Mi evidencia tiene el mismo peso que datos de negocio.", score: 4 },
  ]},
  { dim: "scope", category: "Alcance del impacto", text: "¿Cuántos equipos, productos o mercados impacta tu trabajo de diseño?", options: [
    { text: "Un solo feature o flujo dentro de un producto.", score: 1 },
    { text: "Un producto completo o un área funcional.", score: 2 },
    { text: "Múltiples productos o la experiencia cross-funcional.", score: 3 },
    { text: "La plataforma completa, múltiples mercados, o la organización.", score: 4 },
  ]},
  { dim: "scope", category: "Alcance del impacto", text: "¿Tu trabajo de diseño tiene métricas de impacto vinculadas a resultados de negocio?", options: [
    { text: "No tengo visibilidad de métricas de negocio.", score: 1 },
    { text: "Conozco las métricas pero mi trabajo no se mide contra ellas.", score: 2 },
    { text: "Algunas iniciativas de diseño se miden contra KPIs de producto.", score: 3 },
    { text: "Mi trabajo tiene impacto medible en revenue, growth, o cost savings que puedo reportar.", score: 4 },
  ]},
];

const MATURITY_LEVELS = [
  { min: 1, max: 1.5, name: "Ausente", desc: "El diseño UX no existe formalmente o es puramente reactivo y cosmético." },
  { min: 1.5, max: 2.2, name: "Limitado", desc: "Hay diseñadores pero sin proceso, sin research, sin voz en decisiones." },
  { min: 2.2, max: 3.0, name: "Emergente", desc: "El diseño tiene proceso y empieza a ganar credibilidad, pero no es consistente." },
  { min: 3.0, max: 3.6, name: "Estructurado", desc: "Diseño tiene lugar en la mesa, procesos definidos, y métricas. Falta escala." },
  { min: 3.6, max: 4.01, name: "Integrado", desc: "Diseño es parte integral de la estrategia. Cultura design-driven con ops maduros." },
];

const INFLUENCE_LEVELS = [
  { min: 1, max: 1.5, name: "Ejecutor", desc: "Recibes tareas definidas y las ejecutas. Tu impacto es el pixel." },
  { min: 1.5, max: 2.2, name: "Contribuidor", desc: "Aportas ideas pero no defines dirección. Tu impacto es el feature." },
  { min: 2.2, max: 3.0, name: "Facilitador", desc: "Facilitas decisiones de diseño y empujas por research y evidencia." },
  { min: 3.0, max: 3.6, name: "Estratega", desc: "Co-defines dirección de producto. Tu impacto trasciende screens." },
  { min: 3.6, max: 4.01, name: "Líder sistémico", desc: "Defines sistemas, no features. Tu impacto es organizacional y multi-mercado." },
];

type Level = { min: number; max: number; name: string; desc: string };
function getLevel(score: number, levels: Level[]) {
  return levels.find((l) => score >= l.min && score < l.max) || levels[levels.length - 1];
}

function getDimensionInsight(dimId: string, score: number) {
  const insights: Record<string, Record<string, string>> = {
    strategy: { low: "El diseño no tiene presencia estratégica. Empieza documentando cómo tus decisiones de diseño impactaron métricas (aunque sea retroactivamente) para construir el caso.", mid: "Hay potencial de participación estratégica. Identifica 1-2 decisiones de producto donde puedas aportar evidencia de usuario antes de que se tomen.", high: "Diseño tiene voz estratégica. Mantén esa posición formalizando cómo diseño contribuye a OKRs y hazlo visible para leadership." },
    process: { low: "Sin proceso de diseño, cada proyecto es un reinicio. Empieza con un flujo mínimo: brief → exploración → decisión → implementación con checkpoints.", mid: "Hay proceso pero no es consistente. Documenta lo que funciona en los proyectos exitosos y hazlo replicable.", high: "Proceso sólido. El siguiente paso es medir la eficiencia del proceso mismo (tiempo de ciclo, rework, satisfacción del equipo)." },
    culture: { low: "El diseño es visto como producción visual. Necesitas educar sin ser condescendiente: muestra resultados de negocio, no solo artefactos de diseño.", mid: "Hay respeto pero no entendimiento profundo. Invita a otros equipos a research sessions y design reviews para que vean el proceso.", high: "Cultura design-aware. Protege esto: es frágil y se pierde rápido con cambios de liderazgo. Documenta y formaliza." },
    ops: { low: "Sin governance de diseño, la consistencia es imposible. Empieza con un design system mínimo y 1 ritual compartido semanal.", mid: "Hay piezas pero no sistema. Conecta el design system con rituales y procesos para crear un loop completo.", high: "Design Ops maduro. Mide la eficiencia operativa y busca automatizar lo repetitivo para que el equipo se enfoque en lo estratégico." },
    influence: { low: "Tu influencia se limita a la ejecución. No esperes a que te den permiso: presenta datos de usuario en espacios donde se toman decisiones.", mid: "Puedes influir con evidencia. Formaliza eso: crea un ritual de \"design insights\" que alimente decisiones de producto regularmente.", high: "Tienes influencia real. Úsala para elevar al equipo, no solo a ti. Abre espacios para que otros diseñadores también tengan voz." },
    scope: { low: "Tu impacto es local (un feature, un flujo). Mapea cómo tu trabajo se conecta con métricas más amplias para empezar a ampliar el alcance.", mid: "Impactas un producto o área. El salto es conectar tu trabajo con impacto cross-funcional: ¿cómo lo que diseñas afecta a otros equipos o mercados?", high: "Tu impacto es sistémico. Documéntalo con números. Eso es lo que te posiciona para roles de liderazgo y es lo que convence a leadership." },
  };
  const level = score < 2 ? "low" : score < 3 ? "mid" : "high";
  return insights[dimId]?.[level] || "";
}

function getRoadmapSteps(dimScores: Record<string, { avg: number }>) {
  const sorted = DIMENSIONS.map((d) => ({ id: d.id, score: dimScores[d.id].avg })).sort((a, b) => a.score - b.score);
  const steps: Record<string, { title: string; desc: string }> = {
    strategy: { title: "Construye tu caso estratégico", desc: "Documenta 3 decisiones de diseño recientes y su impacto en métricas de negocio. Preséntalo en el próximo quarterly review." },
    process: { title: "Formaliza tu proceso mínimo", desc: "Define un flujo de diseño de 4 pasos (brief, exploración, validación, entrega) y úsalo consistentemente durante 1 mes." },
    culture: { title: "Haz visible el trabajo de diseño", desc: 'Organiza un "Design Show & Tell" mensual abierto a toda la organización. Muestra proceso, no solo resultados.' },
    ops: { title: "Establece governance básico", desc: "Crea un design system starter con los 10 componentes más usados y un ritual semanal de design review." },
    influence: { title: "Gana un asiento en la mesa", desc: 'Identifica la próxima decisión de producto importante y prepara un "design brief" con datos de usuario antes de que se defina.' },
    scope: { title: "Conecta tu trabajo con impacto amplio", desc: "Para tu proyecto actual, mapea cómo afecta métricas beyond tu feature (retention, revenue, NPS del producto completo)." },
  };
  return sorted.slice(0, 3).map((w) => steps[w.id]);
}

function getCrossInsight(maturity: string, influence: string) {
  if (maturity === "Ausente" || maturity === "Limitado") {
    if (influence === "Ejecutor" || influence === "Contribuidor") return "Hay una alineación (no positiva) entre la madurez de la org y tu influencia. El primer paso es construir credibilidad con victorias pequeñas y medibles.";
    return "Tienes más capacidad de influencia de la que tu organización aprovecha. Eso es una oportunidad: puedes ser el catalizador del cambio si juegas estratégicamente.";
  }
  if (maturity === "Integrado") {
    if (influence === "Estratega" || influence === "Líder sistémico") return "Estás en el escenario ideal: organización madura + influencia alta. El reto ahora es escalar y no convertirte en bottleneck.";
    return "Tu organización está lista para más, pero tu influencia aún no escala al nivel que la org permite. Es momento de ampliar tu alcance.";
  }
  return "Estás en un punto de inflexión. La organización reconoce el valor del diseño pero aún no lo integra completamente. Tu rol es empujar la frontera con evidencia y resultados.";
}

function drawRadar(canvas: HTMLCanvasElement, answers: Record<number, number>) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const W = 280, H = 280, cx = W / 2, cy = H / 2, R = 100;
  canvas.width = W * 2; canvas.height = H * 2;
  canvas.style.width = W + "px"; canvas.style.height = H + "px";
  ctx.scale(2, 2);
  const dimScores: Record<string, { total: number; count: number }> = {};
  DIMENSIONS.forEach((d) => { dimScores[d.id] = { total: 0, count: 0 }; });
  Object.keys(answers).forEach((qi) => {
    const q = QUESTIONS[Number(qi)];
    dimScores[q.dim].total += q.options[answers[Number(qi)]].score;
    dimScores[q.dim].count += 1;
  });
  const scores = DIMENSIONS.map((d) => dimScores[d.id].count > 0 ? dimScores[d.id].total / dimScores[d.id].count : 0);
  const n = scores.length;
  for (let level = 1; level <= 4; level++) {
    ctx.beginPath();
    for (let i = 0; i <= n; i++) {
      const angle = (Math.PI * 2 * (i % n)) / n - Math.PI / 2;
      const r = (level / 4) * R;
      const x = cx + r * Math.cos(angle), y = cy + r * Math.sin(angle);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle = level === 4 ? "#E0DCD5" : "#F0EDE8";
    ctx.lineWidth = 1; ctx.stroke();
  }
  for (let i = 0; i < n; i++) {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    ctx.beginPath(); ctx.moveTo(cx, cy);
    ctx.lineTo(cx + R * Math.cos(angle), cy + R * Math.sin(angle));
    ctx.strokeStyle = "#E0DCD5"; ctx.lineWidth = 1; ctx.stroke();
  }
  ctx.beginPath();
  scores.forEach((sc, i) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    const r = (sc / 4) * R;
    i === 0 ? ctx.moveTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle)) : ctx.lineTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle));
  });
  ctx.closePath();
  ctx.fillStyle = "rgba(232,112,8,0.12)"; ctx.fill();
  ctx.strokeStyle = "#E87008"; ctx.lineWidth = 2; ctx.stroke();
  scores.forEach((sc, i) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    const r = (sc / 4) * R;
    ctx.beginPath(); ctx.arc(cx + r * Math.cos(angle), cy + r * Math.sin(angle), 4, 0, Math.PI * 2);
    ctx.fillStyle = "#E87008"; ctx.fill();
  });
  ctx.font = '500 11px "DM Sans", sans-serif'; ctx.textAlign = "center";
  DIMENSIONS.forEach((d, i) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    const lr = R + 28;
    const x = cx + lr * Math.cos(angle), y = cy + lr * Math.sin(angle);
    ctx.fillStyle = i < 4 ? "#E87008" : "#C49B1A";
    const words = d.name.split(" ");
    if (words.length > 2) {
      const mid = Math.ceil(words.length / 2);
      ctx.fillText(words.slice(0, mid).join(" "), x, y - 6);
      ctx.fillText(words.slice(mid).join(" "), x, y + 8);
    } else {
      ctx.fillText(d.name, x, y + 3);
    }
  });
}

export default function DiagnosticoMadurezUX() {
  const [step, setStep] = useState<"intro" | "question" | "results">("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [unlocked, setUnlocked] = useState(false);

  const doDrawRadar = useCallback(() => {
    const canvas = document.getElementById("radarCanvas") as HTMLCanvasElement | null;
    if (canvas) drawRadar(canvas, answers);
  }, [answers]);

  useEffect(() => {
    if (step === "results") setTimeout(doDrawRadar, 50);
  }, [step, unlocked, doDrawRadar]);

  function selectOption(i: number) { setAnswers({ ...answers, [currentQ]: i }); }
  function next() {
    if (answers[currentQ] === undefined) return;
    if (currentQ < QUESTIONS.length - 1) { setCurrentQ(currentQ + 1); window.scrollTo(0, 0); }
    else { setStep("results"); window.scrollTo(0, 0); }
  }
  function prev() { if (currentQ > 0) { setCurrentQ(currentQ - 1); window.scrollTo(0, 0); } }
  function retake() { setAnswers({}); setCurrentQ(0); setUnlocked(false); setStep("intro"); window.scrollTo(0, 0); }

  // Compute results
  const dimScores: Record<string, { total: number; count: number; avg: number }> = {};
  DIMENSIONS.forEach((d) => { dimScores[d.id] = { total: 0, count: 0, avg: 0 }; });
  Object.keys(answers).forEach((qi) => {
    const q = QUESTIONS[Number(qi)];
    dimScores[q.dim].total += q.options[answers[Number(qi)]].score;
    dimScores[q.dim].count += 1;
  });
  DIMENSIONS.forEach((d) => { dimScores[d.id].avg = dimScores[d.id].count > 0 ? dimScores[d.id].total / dimScores[d.id].count : 0; });
  const maturityAvg = ["strategy", "process", "culture", "ops"].reduce((sum, d) => sum + dimScores[d].avg, 0) / 4;
  const influenceAvg = ["influence", "scope"].reduce((sum, d) => sum + dimScores[d].avg, 0) / 2;
  const maturityLevel = getLevel(maturityAvg, MATURITY_LEVELS);
  const influenceLevel = getLevel(influenceAvg, INFLUENCE_LEVELS);

  return (
    <>
      <div className={s.diagnosticHeader}>
        <div className={s.container}>
          <div className={s.headerTag}>Diagnóstico interactivo</div>
          <h1 className={s.headerTitle}>Madurez UX × <span className={s.headerTitleAccent}>Niveles de Influencia</span></h1>
          <p className={s.headerDesc}>Evalúa la madurez de diseño de tu organización y descubre el nivel de influencia real que tienes como diseñador o líder de diseño.</p>
        </div>
      </div>

      {step === "intro" && (
        <div className={s.container}>
          <div className={s.introSection}>
            <h2 className={s.introTitle}>¿Cómo funciona?</h2>
            <p className={s.introText}>12 preguntas que evalúan tu organización en 6 dimensiones. Toma ~5 minutos. Al final recibes tu diagnóstico cruzando dos ejes:</p>
            <div className={s.introDimensions}>
              <div className={s.introDim}>
                <div className={`${s.introDimLabel} ${s.introDimLabelOrange}`}>Madurez UX</div>
                <div className={s.introDimDesc}>Qué tan madura es la práctica de diseño en tu organización (basado en el modelo de NN/g).</div>
              </div>
              <div className={s.introDim}>
                <div className={`${s.introDimLabel} ${s.introDimLabelGold}`}>Nivel de Influencia</div>
                <div className={s.introDimDesc}>Qué tanto impacto y capacidad de decisión tienes realmente como diseñador o líder.</div>
              </div>
            </div>
            <p className={s.introText}>Las primeras preguntas son gratuitas. El resultado completo con recomendaciones personalizadas y roadmap tiene un costo de $35 USD.</p>
            <div className={s.introNote}>Basado en el cruce original del modelo de madurez de NN/g con niveles de influencia observados en la práctica profesional por Diana Perez.</div>
            <div style={{ marginTop: 36 }}>
              <button className={`${s.btn} ${s.btnPrimary}`} onClick={() => { setStep("question"); setCurrentQ(0); window.scrollTo(0, 0); }}>Comenzar diagnóstico</button>
            </div>
          </div>
        </div>
      )}

      {step === "question" && (
        <>
          <div className={s.progressWrap}>
            <div className={s.container}>
              <div className={s.progressBarBg}><div className={s.progressBarFill} style={{ width: `${((currentQ + 1) / QUESTIONS.length) * 100}%` }} /></div>
              <div className={s.progressInfo}>
                <span className={s.progressStep}>Pregunta {currentQ + 1} de {QUESTIONS.length}</span>
                <span>{QUESTIONS[currentQ].category}</span>
              </div>
            </div>
          </div>
          <div className={s.container}>
            <div className={s.questionSection}>
              <div className={s.questionCategory}>{QUESTIONS[currentQ].category}</div>
              <h2 className={s.questionText}>{QUESTIONS[currentQ].text}</h2>
              <div className={s.options}>
                {QUESTIONS[currentQ].options.map((opt, i) => (
                  <div key={i} className={`${s.option} ${answers[currentQ] === i ? s.optionSelected : ""}`} onClick={() => selectOption(i)}>
                    <div className={s.optionRadio}>{answers[currentQ] === i && <div className={s.optionRadioFill} />}</div>
                    <div className={s.optionText}>{opt.text}</div>
                  </div>
                ))}
              </div>
              <div className={s.navButtons}>
                <button className={`${s.btn} ${s.btnSecondary}`} onClick={prev} style={{ visibility: currentQ === 0 ? "hidden" : "visible" }}>← Anterior</button>
                <button className={`${s.btn} ${s.btnPrimary}`} onClick={next} disabled={answers[currentQ] === undefined}>{currentQ === QUESTIONS.length - 1 ? "Ver resultados" : "Siguiente →"}</button>
              </div>
            </div>
          </div>
        </>
      )}

      {step === "results" && (
        <div className={s.container}>
          <div className={s.resultsSection}>
            <div className={`${s.resultsPreview} ${!unlocked ? s.resultsLocked : ""}`}>
              <div className={s.resultsScores}>
                <div className={s.resultsScoreCard}>
                  <div className={`${s.resultsScoreLabel} ${s.resultsScoreLabelOrange}`}>Madurez UX</div>
                  <div className={s.resultsScoreValue}>{maturityAvg.toFixed(1)}</div>
                  <div className={s.resultsScoreName}>{maturityLevel.name}</div>
                  <div className={s.resultsScoreDesc}>{maturityLevel.desc}</div>
                </div>
                <div className={s.resultsScoreCard}>
                  <div className={`${s.resultsScoreLabel} ${s.resultsScoreLabelGold}`}>Nivel de Influencia</div>
                  <div className={`${s.resultsScoreValue} ${s.resultsScoreValueGold}`}>{influenceAvg.toFixed(1)}</div>
                  <div className={s.resultsScoreName}>{influenceLevel.name}</div>
                  <div className={s.resultsScoreDesc}>{influenceLevel.desc}</div>
                </div>
              </div>
              <div className={s.radarWrap}><canvas id="radarCanvas" width={280} height={280} style={{ width: "100%", height: "100%" }} /></div>
              <h3 className={s.resultsHeadline}>{maturityLevel.name} × {influenceLevel.name}</h3>
              <p className={s.resultsSummary}>Tu organización tiene una madurez de diseño nivel &ldquo;{maturityLevel.name}&rdquo; y tu nivel de influencia como diseñador/líder es &ldquo;{influenceLevel.name}&rdquo;. {getCrossInsight(maturityLevel.name, influenceLevel.name)}</p>

              {unlocked && (
                <div className={s.resultsFull}>
                  <h3 className={s.resultsRoadmapTitle}>Análisis por dimensión</h3>
                  {DIMENSIONS.map((d) => (
                    <div className={s.resultsDimension} key={d.id}>
                      <h4>{d.name}</h4>
                      <div className={s.resultsDimensionScore}>{dimScores[d.id].avg.toFixed(1)} / 4.0 — {d.category}</div>
                      <p>{getDimensionInsight(d.id, dimScores[d.id].avg)}</p>
                    </div>
                  ))}
                  <div className={s.resultsRoadmap}>
                    <h3 className={s.resultsRoadmapTitle}>Tu roadmap: 3 pasos concretos</h3>
                    {getRoadmapSteps(dimScores).map((st, i) => (
                      <div className={s.roadmapStep} key={i}>
                        <div className={s.roadmapNumber}>{i + 1}</div>
                        <div className={s.roadmapContent}><h4>{st.title}</h4><p>{st.desc}</p></div>
                      </div>
                    ))}
                  </div>
                  <div className={s.retakeCenter}>
                    <button className={`${s.btn} ${s.btnDark}`} onClick={retake}>Hacer el diagnóstico de nuevo</button>
                  </div>
                </div>
              )}

              {!unlocked && (
                <div className={s.lockedOverlay}>
                  <h3>Desbloquea tu diagnóstico completo</h3>
                  <p>Obtén el análisis detallado por dimensión, tu gap analysis, y un roadmap personalizado con siguientes pasos concretos.</p>
                  <div className={s.lockedIncludes}>
                    <span className={s.lockedInclude}>Análisis por dimensión</span>
                    <span className={s.lockedInclude}>Gap analysis visual</span>
                    <span className={s.lockedInclude}>Roadmap de 3 pasos</span>
                    <span className={s.lockedInclude}>PDF descargable</span>
                  </div>
                  <div className={s.lockedPrice}>$35 USD</div>
                  <button className={`${s.btn} ${s.btnPrimary}`} onClick={() => { setUnlocked(true); window.scrollTo(0, 0); }} style={{ marginRight: 12 }}>Desbloquear resultado completo</button>
                  <button className={`${s.btn} ${s.btnSecondary}`} onClick={retake}>Volver a hacer</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
