import React, { useState, useEffect, useRef } from "react";
import { 
  FlaskConical, 
  Atom, 
  RotateCw, 
  Zap, 
  Sliders, 
  Play, 
  Pause,
  RotateCcw, 
  Activity, 
  Sparkles,
  Info,
  ChevronRight,
  Eye,
  Waves,
  Sun,
  Layers,
  Compass,
  ArrowRight,
  HelpCircle
} from "lucide-react";

type SimTab = 
  | "organic_reactions"
  | "projectile"
  | "atwood"
  | "friction"
  | "vertical_circle"
  | "rolling_race"
  | "shm"
  | "standing_waves"
  | "electrostatics"
  | "circuit"
  | "cyclotron"
  | "faraday"
  | "optics"
  | "ydse"
  | "photoelectric"
  | "periodic";

interface OrganicReaction {
  id: string;
  title: string;
  category: string;
  summary: string;
  steps: {
    title: string;
    description: string;
    ncertTip: string;
  }[];
}

const ORGANIC_REACTIONS: OrganicReaction[] = [
  {
    id: "sn2",
    title: "SN2 Nucleophilic Substitution (Walden Inversion)",
    category: "Haloalkanes & Haloarenes",
    summary: "Bimolecular single-step substitution with backside attack of nucleophile and 100% stereochemical inversion (Walden Inversion).",
    steps: [
      {
        title: "Step 1: Backside Attack",
        description: "The nucleophile (OH⁻) approaches methyl bromide (CH₃Br) from 180° opposite to the leaving group (-Br).",
        ncertTip: "Rate = k[R-X][Nu⁻]. Order = 2. Substrate reactivity: Methyl > 1° > 2° >> 3° (due to steric hindrance)."
      },
      {
        title: "Step 2: Transition State (sp² Hybridized)",
        description: "A pentacoordinate transition state forms with partial bonds C---OH and C---Br. Planar geometry around carbon.",
        ncertTip: "No intermediate forms in SN2. High activation energy state with umbrella planar inversion."
      },
      {
        title: "Step 3: Departure & Inversion",
        description: "Br⁻ departs as leaving group. Hydrogen bonds invert like an umbrella turned inside out in high wind.",
        ncertTip: "Inversion of Configuration (Walden Inversion) occurs completely."
      }
    ]
  },
  {
    id: "sn1",
    title: "SN1 Nucleophilic Substitution (Carbocation Intermediate)",
    category: "Haloalkanes & Haloarenes",
    summary: "Two-step unimolecular substitution via planar carbocation formation leading to racemization (50% retention, 50% inversion).",
    steps: [
      {
        title: "Step 1: Leaving Group Departure (Slow, Rate Determining)",
        description: "Heterolytic cleavage of C-Br bond in tert-butyl bromide forms a planar sp² carbocation intermediate.",
        ncertTip: "Rate = k[R-X]. Order = 1. Substrate reactivity: 3° > 2° > 1° (governed by carbocation stability)."
      },
      {
        title: "Step 2: Front/Back Nucleophilic Attack (Fast)",
        description: "The nucleophile (H₂O/OH⁻) can attack the planar carbocation equally from top or bottom face.",
        ncertTip: "Produces a Racemic Mixture (d + l forms) with partial inversion predominance due to ion-pairing."
      }
    ]
  },
  {
    id: "markovnikov",
    title: "Electrophilic Addition to Alkenes (Markovnikov's Rule)",
    category: "Hydrocarbons & Alkenes",
    summary: "Addition of HBr to unsymmetrical alkene (propene). H⁺ adds to carbon with more hydrogens to form the more stable carbocation.",
    steps: [
      {
        title: "Step 1: Electrophilic Attack of H⁺",
        description: "π-electron cloud of C=C attacks H⁺ from HBr. Proton attaches to CH₂ end to generate secondary carbocation CH₃-CH⁺-CH₃.",
        ncertTip: "Markovnikov's Rule: Negative part of addendum gets attached to carbon having fewer hydrogen atoms."
      },
      {
        title: "Step 2: Nucleophilic Attack of Br⁻",
        description: "Bromide ion Br⁻ attacks the 2° carbocation to form 2-bromopropane as the major product.",
        ncertTip: "Carbocation rearrangements (1,2-hydride or methyl shifts) can occur if a more stable 3° carbocation can be formed."
      }
    ]
  },
  {
    id: "aldol",
    title: "Aldol Condensation & Dehydration",
    category: "Aldehydes & Ketones",
    summary: "Carbonyl compounds containing α-hydrogens undergo base-catalyzed self-addition to form β-hydroxy aldehydes followed by α,β-unsaturated carbonyls.",
    steps: [
      {
        title: "Step 1: Enolate Formation",
        description: "OH⁻ base abstracts acidic α-hydrogen from acetaldehyde to form resonance-stabilized enolate ion.",
        ncertTip: "Alpha hydrogens are acidic due to strong -I effect and resonance stabilization of enolate by carbonyl group."
      },
      {
        title: "Step 2: Nucleophilic Addition",
        description: "Enolate attacks carbonyl carbon of second acetaldehyde molecule to yield β-hydroxybutyraldehyde (Aldol).",
        ncertTip: "Nucleophilic addition to carbonyl carbon."
      },
      {
        title: "Step 3: Heating & Elimination of H₂O",
        description: "On heating, dehydration occurs spontaneously to yield Crotonaldehyde (But-2-enal).",
        ncertTip: "Conjugated double bond with carbonyl provides thermodynamic driving force for dehydration."
      }
    ]
  },
  {
    id: "esterification",
    title: "Fischer Esterification Mechanism",
    category: "Carboxylic Acids",
    summary: "Acid-catalyzed reversible condensation of carboxylic acid and alcohol to yield ester and water.",
    steps: [
      {
        title: "Step 1: Protonation of Carbonyl Oxygen",
        description: "H⁺ protonates carbonyl oxygen, making carbonyl carbon highly electrophilic.",
        ncertTip: "Concentrated H₂SO₄ acts as catalyst and dehydrating agent to shift equilibrium forward."
      },
      {
        title: "Step 2: Nucleophilic Attack by Alcohol",
        description: "Ethanol oxygen lone pair attacks carbonyl carbon, forming a tetrahedral intermediate.",
        ncertTip: "Isotopic labeling with ¹⁸O proves that oxygen in ester originates from the alcohol, not carboxylic acid!"
      },
      {
        title: "Step 3: Water Elimination & Deprotonation",
        description: "Proton transfer followed by loss of H₂O restores C=O double bond to yield Ethyl Acetate.",
        ncertTip: "Reversible process; excess alcohol or removal of water drives yield via Le Chatelier's Principle."
      }
    ]
  },
  {
    id: "nitration",
    title: "Electrophilic Aromatic Substitution (Nitration of Benzene)",
    category: "Amines & Aromatic Compounds",
    summary: "Benzene reacts with nitrating mixture (Conc. HNO₃ + Conc. H₂SO₄) to form nitrobenzene via NO₂⁺ nitronium ion.",
    steps: [
      {
        title: "Step 1: Generation of Electrophile NO₂⁺",
        description: "Conc. H₂SO₄ protonates HNO₃, releasing H₂O and generating strong nitronium electrophile (NO₂⁺).",
        ncertTip: "HNO₃ acts as a BASE toward stronger acid H₂SO₄ in this generation step."
      },
      {
        title: "Step 2: Formation of Arenium Ion (Sigma Complex)",
        description: "NO₂⁺ attacks π-cloud of benzene ring, forming resonance-stabilized non-aromatic Arenium ion.",
        ncertTip: "Loss of aromaticity in sigma complex makes this step slow and rate-determining."
      },
      {
        title: "Step 3: Deprotonation & Aromaticity Restoration",
        description: "HSO₄⁻ abstracts H⁺ from the sp³ carbon, restoring aromatic stabilization to yield Nitrobenzene.",
        ncertTip: "Aromaticity drives fast completion of deprotonation."
      }
    ]
  }
];

export const InteractiveSimulations: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SimTab>("organic_reactions");

  // Organic Reaction State
  const [selectedReactionIndex, setSelectedReactionIndex] = useState<number>(0);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlayingReaction, setIsPlayingReaction] = useState<boolean>(false);
  const [reactionProgress, setReactionProgress] = useState<number>(0);

  // Canvas Refs
  const organicCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const projectileRef = useRef<HTMLCanvasElement | null>(null);
  const atwoodRef = useRef<HTMLCanvasElement | null>(null);
  const frictionRef = useRef<HTMLCanvasElement | null>(null);
  const vertCircleRef = useRef<HTMLCanvasElement | null>(null);
  const rollingRef = useRef<HTMLCanvasElement | null>(null);
  const shmRef = useRef<HTMLCanvasElement | null>(null);
  const wavesRef = useRef<HTMLCanvasElement | null>(null);
  const electroRef = useRef<HTMLCanvasElement | null>(null);
  const circuitRef = useRef<HTMLCanvasElement | null>(null);
  const cyclotronRef = useRef<HTMLCanvasElement | null>(null);
  const faradayRef = useRef<HTMLCanvasElement | null>(null);
  const opticsRef = useRef<HTMLCanvasElement | null>(null);
  const ydseRef = useRef<HTMLCanvasElement | null>(null);
  const photoRef = useRef<HTMLCanvasElement | null>(null);

  // --- Projectile State ---
  const [projVelocity, setProjVelocity] = useState<number>(30);
  const [projAngle, setProjAngle] = useState<number>(45);
  const [projTime, setProjTime] = useState<number>(0);
  const [isProjAnimating, setIsProjAnimating] = useState<boolean>(false);

  // --- Atwood Pulley State ---
  const [m1, setM1] = useState<number>(8);
  const [m2, setM2] = useState<number>(4);
  const [atwoodPos, setAtwoodPos] = useState<number>(0);

  // --- Friction Incline State ---
  const [inclineAngle, setInclineAngle] = useState<number>(30);
  const [muStatic, setMuStatic] = useState<number>(0.4);

  // --- Vertical Circle State ---
  const [vertVelocity, setVertVelocity] = useState<number>(7); // m/s at bottom
  const [radiusR, setRadiusR] = useState<number>(2); // meters

  // --- Rolling Race State ---
  const [rollingDist, setRollingDist] = useState<number>(0);
  const [isRolling, setIsRolling] = useState<boolean>(false);

  // --- SHM State ---
  const [shmAmplitude, setShmAmplitude] = useState<number>(60);
  const [shmFreq, setShmFreq] = useState<number>(1.5);

  // --- Standing Waves State ---
  const [harmonicN, setHarmonicN] = useState<number>(3);

  // --- Electrostatics Charge State ---
  const [charge1, setCharge1] = useState<number>(1);
  const [charge2, setCharge2] = useState<number>(-1);

  // --- Circuit State ---
  const [voltage, setVoltage] = useState<number>(12);
  const [resistance, setResistance] = useState<number>(10);

  // --- Cyclotron State ---
  const [bField, setBField] = useState<number>(1.2);
  const [particleVel, setParticleVel] = useState<number>(15);

  // --- Faraday Induction State ---
  const [magnetPos, setMagnetPos] = useState<number>(50);

  // --- Optics State ---
  const [focalLength, setFocalLength] = useState<number>(100);
  const [objectDist, setObjectDist] = useState<number>(160);

  // --- YDSE Wave Optics State ---
  const [wavelength, setWavelength] = useState<number>(600); // nm
  const [slitDistance, setSlitDistance] = useState<number>(0.2); // mm

  // --- Photoelectric State ---
  const [lightFreq, setLightFreq] = useState<number>(8.5); // 10^14 Hz
  const [workFunction, setWorkFunction] = useState<number>(2.3); // eV (Sodium)

  // ==========================================
  // 1. ANIMATED ORGANIC CHEMISTRY LINE MECHANISM
  // ==========================================
  useEffect(() => {
    if (activeTab !== "organic_reactions") return;
    const canvas = organicCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const activeReaction = ORGANIC_REACTIONS[selectedReactionIndex];

    const renderOrganic = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background styling
      ctx.fillStyle = "#020617";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid background
      ctx.strokeStyle = "#0f172a";
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Draw based on reaction id
      if (activeReaction.id === "sn2") {
        // SN2 Backside attack line structure
        const p = reactionProgress; // 0 to 1

        // Central Carbon
        const cX = centerX;
        const cY = centerY;

        // Nu Attack from Left (OH-)
        const nuX = cX - 180 + p * 90;
        ctx.fillStyle = "#38bdf8";
        ctx.font = "bold 16px monospace";
        ctx.fillText("HO⁻", nuX, cY + 5);

        // Electron pair curved arrow
        if (p < 0.6) {
          ctx.strokeStyle = "#fbbf24";
          ctx.lineWidth = 2.5;
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.arc(cX - 80, cY - 20, 40, Math.PI * 0.8, Math.PI * 0.2, true);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Carbon Center
        ctx.fillStyle = "#f8fafc";
        ctx.font = "bold 18px sans-serif";
        ctx.fillText("C", cX - 6, cY + 6);

        // Hydrogens umbrella flipping
        const flipAngle = (p - 0.5) * Math.PI * 0.6; // umbrella angle

        // H top
        const hTopX = cX + Math.sin(flipAngle) * 40;
        const hTopY = cY - 50;
        ctx.strokeStyle = "#94a3b8";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(cX, cY - 10);
        ctx.lineTo(hTopX, hTopY);
        ctx.stroke();
        ctx.fillStyle = "#cbd5e1";
        ctx.font = "bold 14px sans-serif";
        ctx.fillText("H", hTopX - 5, hTopY - 5);

        // H bottom
        const hBotX = cX + Math.sin(flipAngle) * 40;
        const hBotY = cY + 50;
        ctx.beginPath();
        ctx.moveTo(cX, cY + 10);
        ctx.lineTo(hBotX, hBotY);
        ctx.stroke();
        ctx.fillText("H", hBotX - 5, hBotY + 15);

        // H wedge/dash (Methyl group)
        const hMidX = cX + Math.sin(flipAngle) * 50;
        const hMidY = cY;
        ctx.fillText("CH₃", hMidX + 10, hMidY + 5);

        // Leaving Group Br on Right
        const brX = cX + 90 + p * 80;
        ctx.strokeStyle = p > 0.5 ? "rgba(244,63,94,0.4)" : "#f43f5e";
        ctx.setLineDash(p > 0.4 && p < 0.7 ? [5, 5] : []);
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(cX + 12, cY);
        ctx.lineTo(brX - 10, cY);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = "#f43f5e";
        ctx.font = "bold 16px sans-serif";
        ctx.fillText("Br", brX, cY + 5);

        if (p > 0.4 && p < 0.7) {
          ctx.strokeStyle = "#a855f7";
          ctx.strokeRect(cX - 110, cY - 75, 220, 150);
          ctx.fillStyle = "#a855f7";
          ctx.font = "bold 12px monospace";
          ctx.fillText("[ Transition State: ‡ ]", cX - 70, cY - 85);
        }
      } else if (activeReaction.id === "sn1") {
        // SN1 Carbocation planar intermediate
        const p = reactionProgress;

        if (p < 0.5) {
          // Leaving group departing
          ctx.fillStyle = "#818cf8";
          ctx.font = "bold 18px monospace";
          ctx.fillText("(CH₃)₃C — Br  ━━━━▶  (CH₃)₃C⁺  +  Br⁻", centerX - 180, centerY);
          ctx.fillStyle = "#fbbf24";
          ctx.font = "12px sans-serif";
          ctx.fillText("Heterolytic cleavage (Slow Step)", centerX - 100, centerY + 30);
        } else {
          // Planar carbocation attack
          ctx.fillStyle = "#38bdf8";
          ctx.font = "bold 18px monospace";
          ctx.fillText("Front & Back attack on planar sp² carbocation", centerX - 190, centerY - 40);

          ctx.strokeStyle = "#a855f7";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.ellipse(centerX, centerY, 60, 20, 0, 0, Math.PI * 2);
          ctx.stroke();
          ctx.fillStyle = "#f8fafc";
          ctx.fillText("C⁺", centerX - 10, centerY + 6);

          ctx.fillStyle = "#34d399";
          ctx.font = "bold 14px sans-serif";
          ctx.fillText("Nu⁻ (Top Attack 50%) ↓", centerX - 80, centerY - 50);
          ctx.fillText("Nu⁻ (Bottom Attack 50%) ↑", centerX - 90, centerY + 60);
        }
      } else if (activeReaction.id === "markovnikov") {
        // Markovnikov addition
        ctx.fillStyle = "#38bdf8";
        ctx.font = "bold 18px monospace";
        ctx.fillText("CH₃—CH═CH₂  +  H—Br  ━━━━▶  CH₃—CH(Br)—CH₃", centerX - 220, centerY - 30);

        ctx.fillStyle = "#fbbf24";
        ctx.font = "13px sans-serif";
        ctx.fillText("Major Product: 2-Bromopropane (via 2° Carbocation)", centerX - 160, centerY + 20);

        // Line representation
        ctx.strokeStyle = "#818cf8";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(centerX - 100, centerY + 60);
        ctx.lineTo(centerX - 40, centerY + 60);
        ctx.lineTo(centerX, centerY + 90);
        ctx.moveTo(centerX - 40, centerY + 54);
        ctx.lineTo(centerX - 100, centerY + 54);
        ctx.stroke();

        ctx.fillStyle = "#f43f5e";
        ctx.font = "bold 14px sans-serif";
        ctx.fillText("+ HBr", centerX + 20, centerY + 70);
      } else {
        // Default generic mechanism presentation
        ctx.fillStyle = "#f8fafc";
        ctx.font = "bold 18px monospace";
        ctx.fillText(activeReaction.title, centerX - 200, centerY - 20);

        ctx.fillStyle = "#a855f7";
        ctx.font = "13px sans-serif";
        ctx.fillText("Animated Line Bond Breaking & Arrow Pushing Mechanism", centerX - 180, centerY + 20);
      }

      if (isPlayingReaction) {
        setReactionProgress((prev) => (prev + 0.008) % 1);
      }

      animId = requestAnimationFrame(renderOrganic);
    };

    renderOrganic();
    return () => cancelAnimationFrame(animId);
  }, [activeTab, selectedReactionIndex, isPlayingReaction, reactionProgress]);

  // ==========================================
  // 2. PHYSICS CHAPTER EXPERIMENTS ANIMATIONS
  // ==========================================

  // --- Projectile Motion ---
  useEffect(() => {
    if (activeTab !== "projectile") return;
    const canvas = projectileRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const g = 9.81;
    const rad = (projAngle * Math.PI) / 180;
    const vx0 = projVelocity * Math.cos(rad);
    const vy0 = projVelocity * Math.sin(rad);
    const tTotal = (2 * vy0) / g;

    const renderProj = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Ground
      ctx.strokeStyle = "#475569";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(40, 220);
      ctx.lineTo(660, 220);
      ctx.stroke();

      // Trajectory curve
      ctx.strokeStyle = "rgba(99, 102, 241, 0.4)";
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      const scaleX = 8;
      const scaleY = 3;
      for (let t = 0; t <= tTotal; t += 0.05) {
        const x = 50 + vx0 * t * scaleX;
        const y = 220 - (vy0 * t - 0.5 * g * t * t) * scaleY;
        if (t === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Current ball position
      const curT = Math.min(projTime, tTotal);
      const currX = 50 + vx0 * curT * scaleX;
      const currY = 220 - (vy0 * curT - 0.5 * g * curT * curT) * scaleY;

      // Ball
      ctx.fillStyle = "#38bdf8";
      ctx.beginPath();
      ctx.arc(currX, currY, 8, 0, Math.PI * 2);
      ctx.fill();

      // Velocity vectors
      ctx.strokeStyle = "#f43f5e";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(currX, currY);
      ctx.lineTo(currX + vx0 * 1.5, currY);
      ctx.stroke();

      ctx.strokeStyle = "#34d399";
      ctx.beginPath();
      ctx.moveTo(currX, currY);
      ctx.lineTo(currX, currY - (vy0 - g * curT) * 1.5);
      ctx.stroke();

      if (isProjAnimating && projTime < tTotal) {
        setProjTime((prev) => prev + 0.03);
      }

      animId = requestAnimationFrame(renderProj);
    };

    renderProj();
    return () => cancelAnimationFrame(animId);
  }, [activeTab, projVelocity, projAngle, projTime, isProjAnimating]);

  // --- Atwood Pulley ---
  useEffect(() => {
    if (activeTab !== "atwood") return;
    const canvas = atwoodRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Pulley
    const pX = 350;
    const pY = 60;
    const pR = 30;

    ctx.fillStyle = "#334155";
    ctx.beginPath();
    ctx.arc(pX, pY, pR, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#64748b";
    ctx.lineWidth = 4;
    ctx.stroke();

    // Ropes
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 2;

    const y1 = 140 + atwoodPos;
    const y2 = 140 - atwoodPos;

    ctx.beginPath();
    ctx.moveTo(pX - pR, pY);
    ctx.lineTo(pX - pR, y1);
    ctx.moveTo(pX + pR, pY);
    ctx.lineTo(pX + pR, y2);
    ctx.stroke();

    // Mass 1
    ctx.fillStyle = "#6366f1";
    ctx.fillRect(pX - pR - 20, y1, 40, 40);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 12px sans-serif";
    ctx.fillText(`${m1}kg`, pX - pR - 12, y1 + 24);

    // Mass 2
    ctx.fillStyle = "#f59e0b";
    ctx.fillRect(pX + pR - 20, y2, 40, 40);
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`${m2}kg`, pX + pR - 12, y2 + 24);
  }, [activeTab, m1, m2, atwoodPos]);

  // --- Rolling Race ---
  useEffect(() => {
    if (activeTab !== "rolling_race") return;
    const canvas = rollingRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const renderRolling = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Incline Ramp
      ctx.strokeStyle = "#475569";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(50, 60);
      ctx.lineTo(650, 210);
      ctx.lineTo(650, 220);
      ctx.stroke();

      // Sphere (Solid Sphere k²/R² = 2/5 = 0.4) -> a = g sinθ / 1.4
      const dSphere = rollingDist * 1.2;
      const xSphere = 80 + dSphere * 5;
      const ySphere = 60 + dSphere * 1.25;

      ctx.fillStyle = "#38bdf8";
      ctx.beginPath();
      ctx.arc(xSphere, ySphere - 15, 15, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#f8fafc";
      ctx.font = "10px sans-serif";
      ctx.fillText("Sphere", xSphere - 15, ySphere - 22);

      // Cylinder (Solid Cylinder k²/R² = 1/2 = 0.5) -> a = g sinθ / 1.5
      const dCyl = rollingDist * 1.05;
      const xCyl = 80 + dCyl * 5;
      const yCyl = 60 + dCyl * 1.25;

      ctx.fillStyle = "#34d399";
      ctx.beginPath();
      ctx.arc(xCyl, yCyl - 15, 15, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillText("Cylinder", xCyl - 18, yCyl - 22);

      // Ring (Hollow Ring k²/R² = 1.0) -> a = g sinθ / 2.0
      const dRing = rollingDist * 0.8;
      const xRing = 80 + dRing * 5;
      const yRing = 60 + dRing * 1.25;

      ctx.strokeStyle = "#f43f5e";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(xRing, yRing - 15, 13, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = "#f43f5e";
      ctx.fillText("Ring", xRing - 10, yRing - 22);

      if (isRolling && rollingDist < 100) {
        setRollingDist((prev) => prev + 0.5);
      }

      animId = requestAnimationFrame(renderRolling);
    };

    renderRolling();
    return () => cancelAnimationFrame(animId);
  }, [activeTab, rollingDist, isRolling]);

  // Calculations
  const atwoodAcc = Math.abs(((m1 - m2) * 9.81) / (m1 + m2)).toFixed(2);
  const criticalVertVel = Math.sqrt(5 * 9.81 * radiusR).toFixed(2);

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-900/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-medium mb-2">
            <FlaskConical className="w-3.5 h-3.5 text-indigo-400" />
            <span>Interactive Experiments Suite</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-100">Visual Science Experiments & Organic Line Animations</h1>
          <p className="text-sm text-slate-400 max-w-2xl mt-1">
            Step-by-step animated organic chemistry reaction mechanisms & physics chapter visual lab simulations.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-indigo-300 bg-indigo-950/60 px-3 py-2 rounded-xl border border-indigo-800/50">
          <Activity className="w-4 h-4 text-indigo-400 animate-pulse" />
          <span>High-FPS Physics & Reaction Renderer</span>
        </div>
      </div>

      {/* Navigation Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setActiveTab("organic_reactions")}
          className={`px-4 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition-all flex items-center gap-2 ${
            activeTab === "organic_reactions"
              ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-indigo-600/30"
              : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200"
          }`}
        >
          <FlaskConical className="w-4 h-4 text-purple-400" />
          <span>Organic Reaction Line Mechanisms</span>
        </button>

        <button
          onClick={() => setActiveTab("projectile")}
          className={`px-3.5 py-2 rounded-xl font-medium text-xs whitespace-nowrap transition-all ${
            activeTab === "projectile"
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 font-bold"
              : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200"
          }`}
        >
          Kinematics & Projectile
        </button>

        <button
          onClick={() => setActiveTab("atwood")}
          className={`px-3.5 py-2 rounded-xl font-medium text-xs whitespace-nowrap transition-all ${
            activeTab === "atwood"
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 font-bold"
              : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200"
          }`}
        >
          Atwood Pulley System
        </button>

        <button
          onClick={() => setActiveTab("rolling_race")}
          className={`px-3.5 py-2 rounded-xl font-medium text-xs whitespace-nowrap transition-all ${
            activeTab === "rolling_race"
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 font-bold"
              : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200"
          }`}
        >
          Rolling Motion Race
        </button>
      </div>

      {/* ==================================================== */}
      {/* SECTION 1: ANIMATED ORGANIC CHEMISTRY LINE MECHANISMS */}
      {/* ==================================================== */}
      {activeTab === "organic_reactions" && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-purple-900/40 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">NCERT & JEE Advanced Organic Suite</span>
              <h2 className="text-xl font-bold text-slate-100">
                {ORGANIC_REACTIONS[selectedReactionIndex].title}
              </h2>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlayingReaction(!isPlayingReaction)}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-purple-600/20"
              >
                {isPlayingReaction ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isPlayingReaction ? "Pause Motion" : "Play Mechanism"}</span>
              </button>

              <button
                onClick={() => setReactionProgress(0)}
                className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Reaction Selector Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {ORGANIC_REACTIONS.map((rxn, idx) => (
              <button
                key={rxn.id}
                onClick={() => {
                  setSelectedReactionIndex(idx);
                  setCurrentStepIndex(0);
                  setReactionProgress(0);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedReactionIndex === idx
                    ? "bg-purple-950 text-purple-200 border border-purple-600 font-bold"
                    : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200"
                }`}
              >
                {rxn.title.split(" ")[0]} {rxn.title.split(" ")[1]}
              </button>
            ))}
          </div>

          {/* Animated Line Structure Canvas */}
          <div className="flex justify-center bg-slate-950 p-4 rounded-2xl border border-purple-900/30 overflow-x-auto">
            <canvas ref={organicCanvasRef} width={700} height={260} className="max-w-full rounded-xl" />
          </div>

          {/* Step Breakdown Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ORGANIC_REACTIONS[selectedReactionIndex].steps.map((step, sIdx) => (
              <div
                key={sIdx}
                className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between text-purple-400 font-bold">
                  <span>{step.title}</span>
                  <span className="w-5 h-5 rounded-full bg-purple-950 flex items-center justify-center font-mono text-[10px]">
                    {sIdx + 1}
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed">{step.description}</p>
                <div className="p-2.5 rounded-lg bg-amber-950/30 border border-amber-800/40 text-amber-200 text-[11px] mt-2">
                  <span className="font-bold">NCERT / JEE Hack:</span> {step.ncertTip}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* SECTION 2: PROJECTILE MOTION LAB                     */}
      {/* ==================================================== */}
      {activeTab === "projectile" && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-100">2D Projectile Motion Trajectory</h2>
              <p className="text-xs text-slate-400">R = (u² sin 2θ)/g | H_max = (u² sin² θ)/2g | T = (2u sin θ)/g</p>
            </div>

            <button
              onClick={() => {
                setProjTime(0);
                setIsProjAnimating(true);
              }}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              <span>Launch Projectile</span>
            </button>
          </div>

          <div className="flex justify-center bg-slate-950 p-4 rounded-2xl border border-slate-800 overflow-x-auto">
            <canvas ref={projectileRef} width={700} height={250} className="max-w-full rounded-xl" />
          </div>

          <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs">
            <div>
              <label className="font-semibold text-slate-300 block mb-1">
                Launch Velocity (u): <span className="text-indigo-400">{projVelocity} m/s</span>
              </label>
              <input
                type="range"
                min={10}
                max={50}
                value={projVelocity}
                onChange={(e) => setProjVelocity(Number(e.target.value))}
                className="w-full accent-indigo-500"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-300 block mb-1">
                Launch Angle (θ): <span className="text-indigo-400">{projAngle}°</span>
              </label>
              <input
                type="range"
                min={15}
                max={75}
                value={projAngle}
                onChange={(e) => setProjAngle(Number(e.target.value))}
                className="w-full accent-indigo-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* SECTION 3: ATWOOD PULLEY LAB                        */}
      {/* ==================================================== */}
      {activeTab === "atwood" && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-100">Atwood Machine & Acceleration</h2>
              <p className="text-xs text-slate-400">Net Acceleration a = (m₁ - m₂)g / (m₁ + m₂) | Tension T = 2m₁m₂g / (m₁ + m₂)</p>
            </div>
          </div>

          <div className="flex justify-center bg-slate-950 p-4 rounded-2xl border border-slate-800 overflow-x-auto">
            <canvas ref={atwoodRef} width={700} height={250} className="max-w-full rounded-xl" />
          </div>

          <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs">
            <div>
              <label className="font-semibold text-slate-300 block mb-1">
                Mass 1 (m₁): <span className="text-indigo-400">{m1} kg</span>
              </label>
              <input
                type="range"
                min={1}
                max={15}
                value={m1}
                onChange={(e) => setM1(Number(e.target.value))}
                className="w-full accent-indigo-500"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-300 block mb-1">
                Mass 2 (m₂): <span className="text-amber-400">{m2} kg</span>
              </label>
              <input
                type="range"
                min={1}
                max={15}
                value={m2}
                onChange={(e) => setM2(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center font-mono text-xs">
            System Acceleration (a): <span className="text-emerald-400 font-bold">{atwoodAcc} m/s²</span>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* SECTION 4: ROLLING MOTION RACE                      */}
      {/* ==================================================== */}
      {activeTab === "rolling_race" && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-100">Rolling Without Slipping Incline Race</h2>
              <p className="text-xs text-slate-400">a = g sin θ / (1 + k²/R²). Solid Sphere (2/5) &gt; Solid Cylinder (1/2) &gt; Ring (1.0)</p>
            </div>

            <button
              onClick={() => {
                setRollingDist(0);
                setIsRolling(true);
              }}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              <span>Start Rolling Race</span>
            </button>
          </div>

          <div className="flex justify-center bg-slate-950 p-4 rounded-2xl border border-slate-800 overflow-x-auto">
            <canvas ref={rollingRef} width={700} height={250} className="max-w-full rounded-xl" />
          </div>
        </div>
      )}

    </div>
  );
};
