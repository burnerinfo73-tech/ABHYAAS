import { Chapter, Question, Formula, TargetExam } from "../types";

export const CHAPTERS: Chapter[] = [
  // --- PHYSICS ---
  {
    id: "phy-11-kinematics",
    name: "Kinematics & Motion in 2D",
    subjectId: "physics",
    classLevel: 11,
    weightage: "HIGH",
    ncertChapter: "Class 11 Physics Ch 3 & 4",
    keyConcepts: [
      "Equations of Motion under Constant Acceleration",
      "Relative Motion in 1D & 2D (Rain-Man & River-Swimmer)",
      "Projectile Motion on Horizontal & Inclined Planes",
      "Uniform and Non-Uniform Circular Motion"
    ],
    summaryNotes: "Master projectile range max at 45°, velocity at top point v = u cos(θ). River swimmer minimum time t = d/v_m, shortest path sin(θ) = v_r/v_m.",
    questionCount: 18,
    status: "IN_PROGRESS"
  },
  {
    id: "phy-11-nlm",
    name: "Laws of Motion & Friction",
    subjectId: "physics",
    classLevel: 11,
    weightage: "HIGH",
    ncertChapter: "Class 11 Physics Ch 5",
    keyConcepts: [
      "Newton's 2nd & 3rd Laws in Inertial & Non-Inertial Frames",
      "Pseudo Force & Tension in Strings/Pulleys",
      "Static vs Kinetic Friction (Angle of Repose)",
      "Banking of Curved Roads"
    ],
    summaryNotes: "Angle of friction tan(λ) = μ. Maximum safe speed on banked road without friction v_max = √(r g tan θ). Pseudo force F_p = -m*a_frame.",
    questionCount: 15,
    status: "MASTERED"
  },
  {
    id: "phy-11-work-energy",
    name: "Work, Power & Energy",
    subjectId: "physics",
    classLevel: 11,
    weightage: "HIGH",
    ncertChapter: "Class 11 Physics Ch 6",
    keyConcepts: [
      "Work-Energy Theorem (W_net = ΔKE)",
      "Conservative vs Non-Conservative Forces",
      "Potential Energy Curves & Stability Equilibrium",
      "Vertical Circular Motion (Minimum velocity at lowest point = √(5gR))"
    ],
    summaryNotes: "W = ∫ F · dr. Conservative force F = -dU/dx. Stable equilibrium corresponds to d²U/dx² > 0 (minimum potential energy).",
    questionCount: 14,
    status: "IN_PROGRESS"
  },
  {
    id: "phy-11-rotation",
    name: "Rotational Dynamics",
    subjectId: "physics",
    classLevel: 11,
    weightage: "HIGH",
    ncertChapter: "Class 11 Physics Ch 7",
    keyConcepts: [
      "Center of Mass & Linear Momentum Conservation",
      "Moment of Inertia (Parallel & Perpendicular Axis Theorems)",
      "Torque (τ = I α) & Angular Momentum (L = I ω)",
      "Rolling Motion without Slipping (v_cm = R ω)"
    ],
    summaryNotes: "I_disk = 1/2 M R², I_ring = M R², I_sphere = 2/5 M R². Angular momentum is conserved when net external torque = 0.",
    questionCount: 22,
    status: "NOT_STARTED"
  },
  {
    id: "phy-12-electrostatics",
    name: "Electrostatics & Capacitance",
    subjectId: "physics",
    classLevel: 12,
    weightage: "HIGH",
    ncertChapter: "Class 12 Physics Ch 1 & 2",
    keyConcepts: [
      "Coulomb's Law & Electric Dipole Torque/PE",
      "Gauss's Law Applications (Spheres, Shells, Sheets)",
      "Electric Potential & Equipotential Surfaces",
      "Parallel Plate Capacitors with Dielectrics"
    ],
    summaryNotes: "Dipole Torque τ = p × E, PE = -p · E. Capacitance with dielectric slab C = ε₀ A / (d - t + t/k). Field inside thin conducting shell = 0.",
    questionCount: 20,
    status: "IN_PROGRESS"
  },
  {
    id: "phy-12-optics",
    name: "Ray & Wave Optics",
    subjectId: "physics",
    classLevel: 12,
    weightage: "HIGH",
    ncertChapter: "Class 12 Physics Ch 9 & 10",
    keyConcepts: [
      "Lens Formula (1/v - 1/u = 1/f) & Prism Dispersion",
      "Total Internal Reflection & Critical Angle",
      "Young's Double Slit Experiment (Fringe width β = λD/d)",
      "Brewster's Law & Polarization"
    ],
    summaryNotes: "Prism deviation δ = i + e - A. Critical angle sin(θ_c) = 1/μ. YDSE fringe width β = λ D / d. Lens maker formula 1/f = (μ-1)(1/R1 - 1/R2).",
    questionCount: 25,
    status: "REVISED"
  },

  // --- CHEMISTRY ---
  {
    id: "chem-11-bonding",
    name: "Chemical Bonding & Molecular Structure",
    subjectId: "chemistry",
    classLevel: 11,
    weightage: "HIGH",
    ncertChapter: "Class 11 Chemistry Ch 4",
    keyConcepts: [
      "VSEPR Theory & Molecular Geometry",
      "Hybridization (sp, sp2, sp3, sp3d, sp3d2)",
      "Molecular Orbital Theory (MOT) & Bond Order",
      "Dipole Moment & Fajan's Rules"
    ],
    summaryNotes: "Bond Order = 0.5 * (N_b - N_a). Molecules with BO = 0 do not exist. O2 is paramagnetic (unpaired e- in π*2p orbitals). Fajan's rule: smaller cation + larger anion = higher covalent character.",
    questionCount: 20,
    status: "MASTERED"
  },
  {
    id: "chem-11-goc",
    name: "General Organic Chemistry (GOC)",
    subjectId: "chemistry",
    classLevel: 11,
    weightage: "HIGH",
    ncertChapter: "Class 11 Chemistry Ch 12",
    keyConcepts: [
      "Inductive, Resonance & Hyperconjugation Effects",
      "Carbocation, Carbanion & Free Radical Stability",
      "Aromaticity (Hückel's Rule: 4n + 2 π e-)",
      "Electrophiles vs Nucleophiles"
    ],
    summaryNotes: "Carbocation stability: 3° > 2° > 1° > Methyl (stabilized by hyperconjugation & +I). Resonance takes precedence over inductive effect.",
    questionCount: 24,
    status: "IN_PROGRESS"
  },
  {
    id: "chem-12-coordination",
    name: "Coordination Compounds",
    subjectId: "chemistry",
    classLevel: 12,
    weightage: "HIGH",
    ncertChapter: "Class 12 Chemistry Ch 9",
    keyConcepts: [
      "IUPAC Nomenclature & Isomerism",
      "Werner's Theory (Primary & Secondary Valence)",
      "Valence Bond Theory (VBT) & Crystal Field Theory (CFT)",
      "Spectrochemical Series & Magnetic Moments μ = √(n(n+2)) BM"
    ],
    summaryNotes: "Strong field ligands (CN-, CO, en, NH3) cause pairing of electrons resulting in inner orbital low-spin complexes. Octahedral crystal field splitting Δ_o > P.",
    questionCount: 18,
    status: "REVISED"
  },
  {
    id: "chem-12-electrochem",
    name: "Electrochemistry & Kinetics",
    subjectId: "chemistry",
    classLevel: 12,
    weightage: "HIGH",
    ncertChapter: "Class 12 Chemistry Ch 3 & 4",
    keyConcepts: [
      "Nernst Equation (E_cell = E°_cell - (0.0591/n) log Q)",
      "Kohlrausch Law & Conductance",
      "First Order Reaction Kinetics (t_1/2 = 0.693/k)",
      "Arrhenius Equation (k = A e^(-Ea/RT))"
    ],
    summaryNotes: "ΔG° = -n F E°_cell. For 1st order reaction, half life t_1/2 is independent of initial concentration. Arrhenius slope = -Ea/R.",
    questionCount: 16,
    status: "NOT_STARTED"
  },

  // --- BIOLOGY (NEET) ---
  {
    id: "bio-11-genetics",
    name: "Principles of Inheritance & Variation",
    subjectId: "biology",
    classLevel: 12,
    weightage: "HIGH",
    ncertChapter: "Class 12 Biology Ch 5",
    keyConcepts: [
      "Mendel's Laws (Monohybrid 3:1 & Dihybrid 9:3:3:1)",
      "Incomplete Dominance & Co-dominance (ABO Blood Group)",
      "Sex Determination & Linkage (Morgan's Drosophila experiments)",
      "Genetic Disorders (Haemophilia, Sickle Cell Anaemia, Down Syndrome)"
    ],
    summaryNotes: "Linkage frequency is inversely proportional to distance between genes. Sickle cell anaemia is an autosomal recessive disorder caused by GAG to GUG point mutation at 6th position of β-globin chain.",
    questionCount: 30,
    status: "MASTERED"
  },
  {
    id: "bio-12-molecular-genetics",
    name: "Molecular Basis of Inheritance",
    subjectId: "biology",
    classLevel: 12,
    weightage: "HIGH",
    ncertChapter: "Class 12 Biology Ch 6",
    keyConcepts: [
      "Structure of DNA & RNA (Chargaff's Rule: A=T, G≡C)",
      "Semiconservative DNA Replication (Meselson & Stahl)",
      "Transcription, Lac Operon & Genetic Code",
      "Human Genome Project (HGP) & DNA Fingerprinting"
    ],
    summaryNotes: "Lac operon is negatively regulated by repressor protein encoded by 'i' gene. Genetic code is degenerate, unambiguous, and universal (AUG codes for Methionine).",
    questionCount: 28,
    status: "IN_PROGRESS"
  },
  {
    id: "bio-11-plant-physio",
    name: "Plant Physiology & Photosynthesis",
    subjectId: "biology",
    classLevel: 11,
    weightage: "HIGH",
    ncertChapter: "Class 11 Biology Ch 13 & 14",
    keyConcepts: [
      "Light Reactions (Z-Scheme, Cyclic vs Non-Cyclic Photophosphorylation)",
      "Calvin Cycle (C3) & Hatch-Slack Pathway (C4 Plants)",
      "Photorespiration (C2 Cycle) & Kranz Anatomy",
      "Glycolysis & Krebs Cycle (ATP yield)"
    ],
    summaryNotes: "C4 plants exhibit Kranz anatomy and lack photorespiration, having high photosynthetic efficiency at high temperature. Primary CO2 acceptor in C4 is PEP (Phosphoenolpyruvate).",
    questionCount: 22,
    status: "REVISED"
  },

  // --- MATHEMATICS (JEE) ---
  {
    id: "math-11-calculus-limits",
    name: "Limits, Continuity & Differentiation",
    subjectId: "mathematics",
    classLevel: 11,
    weightage: "HIGH",
    ncertChapter: "Class 11 & 12 Mathematics",
    keyConcepts: [
      "L'Hopital's Rule for 0/0 and ∞/∞ indeterminate forms",
      "Standard Limits (lim x->0 sin x / x = 1, lim x->0 (1+x)^(1/x) = e)",
      "Continuity conditions & Differentiability tests",
      "Chain Rule & Implicit Differentiation"
    ],
    summaryNotes: "L'Hopital Rule applies when direct substitution gives 0/0 or ∞/∞. Function is continuous if LHL = RHL = f(a). Differentiability implies continuity.",
    questionCount: 20,
    status: "MASTERED"
  },
  {
    id: "math-12-integration",
    name: "Indefinite & Definite Integrals",
    subjectId: "mathematics",
    classLevel: 12,
    weightage: "HIGH",
    ncertChapter: "Class 12 Mathematics Ch 7",
    keyConcepts: [
      "Integration by Parts (ILATE Rule)",
      "King's Property: ∫_a^b f(x)dx = ∫_a^b f(a+b-x)dx",
      "Definite Integral as Limit of a Sum",
      "Area Under Curves (Bounded Regions)"
    ],
    summaryNotes: "King's property is the single most tested property in JEE Main! For symmetry around origin, ∫_-a^a f(x)dx = 0 if f is odd, 2∫_0^a f(x)dx if f is even.",
    questionCount: 24,
    status: "IN_PROGRESS"
  },
  {
    id: "math-12-vectors-3d",
    name: "Vectors & 3D Geometry",
    subjectId: "mathematics",
    classLevel: 12,
    weightage: "HIGH",
    ncertChapter: "Class 12 Mathematics Ch 10 & 11",
    keyConcepts: [
      "Dot Product (a · b = |a||b| cos θ) & Cross Product",
      "Scalar Triple Product [a b c] & Vector Triple Product",
      "Shortest Distance between Skew Lines: d = |(b1 × b2) · (a2 - a1)| / |b1 × b2|",
      "Line & Plane Equations in 3D"
    ],
    summaryNotes: "Two vectors are perpendicular if a · b = 0, parallel if a × b = 0. Scalar triple product represents volume of parallelepiped.",
    questionCount: 26,
    status: "NOT_STARTED"
  }
];

export const MOCK_QUESTIONS: Question[] = [
  // --- PHYSICS QUESTIONS ---
  {
    id: "q-phy-1",
    subjectId: "physics",
    chapterId: "phy-11-kinematics",
    exam: ["NEET", "JEE_MAIN"],
    question: "A projectile is thrown with an initial velocity of u = (6 î + 8 ĵ) m/s. Taking acceleration due to gravity g = 10 m/s², what is the horizontal range of the projectile?",
    options: ["4.8 m", "9.6 m", "12.0 m", "19.2 m"],
    correctIndex: 1,
    explanation: "Here u_x = 6 m/s and u_y = 8 m/s.\nTime of flight T = 2 u_y / g = 2 * 8 / 10 = 1.6 s.\nHorizontal Range R = u_x * T = 6 * 1.6 = 9.6 m.",
    ncertReference: "Class 11 Physics NCERT Ch 4 - Sec 4.10",
    difficulty: "EASY",
    isPYQ: true,
    pyqYear: 2023
  },
  {
    id: "q-phy-2",
    subjectId: "physics",
    chapterId: "phy-12-electrostatics",
    exam: ["JEE_MAIN", "JEE_ADVANCED"],
    question: "A parallel plate capacitor with plate area A and separation d is filled with two dielectrics of dielectric constants k1 and k2, each occupying half the area (A/2) across the full thickness d. What is the effective capacitance?",
    options: [
      "C = (ε₀ A / d) * (k1 + k2) / 2",
      "C = (ε₀ A / d) * (2 k1 k2 / (k1 + k2))",
      "C = (ε₀ A / d) * (k1 k2)",
      "C = (ε₀ A / d) * (k1 + k2)"
    ],
    correctIndex: 0,
    explanation: "When dielectrics split the area A into two equal halves across distance d, it acts like two capacitors C1 and C2 in parallel.\nC1 = k1 ε₀ (A/2) / d\nC2 = k2 ε₀ (A/2) / d\nC_equivalent = C1 + C2 = (ε₀ A / 2d) (k1 + k2) = (ε₀ A / d) * (k1 + k2) / 2.",
    ncertReference: "Class 12 Physics NCERT Ch 2 - Sec 2.12",
    difficulty: "MEDIUM",
    isPYQ: true,
    pyqYear: 2022
  },

  // --- CHEMISTRY QUESTIONS ---
  {
    id: "q-chem-1",
    subjectId: "chemistry",
    chapterId: "chem-11-bonding",
    exam: ["NEET", "JEE_MAIN"],
    question: "Which of the following species has a bond order of 2.5 and exhibits paramagnetic nature?",
    options: ["O₂⁺", "N₂⁺", "O₂⁻", "N₂²⁻"],
    correctIndex: 0,
    explanation: "For O₂⁺ (15 electrons):\nMOT configuration: σ1s² σ*1s² σ2s² σ*2s² σ2pz² π2px²=π2py² π*2px¹=π*2py⁰.\nBond order = (10 - 5) / 2 = 2.5.\nSince there is 1 unpaired electron in π*2px, it is paramagnetic.",
    ncertReference: "Class 11 Chemistry NCERT Ch 4 - Sec 4.7",
    difficulty: "MEDIUM",
    isPYQ: true,
    pyqYear: 2021
  },
  {
    id: "q-chem-2",
    subjectId: "chemistry",
    chapterId: "chem-12-coordination",
    exam: ["JEE_MAIN", "JEE_ADVANCED"],
    question: "The spin-only magnetic moment of [Fe(CN)₆]³⁻ complex ion is approximately:",
    options: ["1.73 BM", "2.83 BM", "4.90 BM", "5.92 BM"],
    correctIndex: 0,
    explanation: "In [Fe(CN)₆]³⁻, iron is in +3 oxidation state -> Fe³⁺ (3d⁵).\nSince CN⁻ is a strong field ligand, it causes electron pairing in t2g orbitals -> t2g⁵ eg⁰.\nNumber of unpaired electrons n = 1.\nSpin-only magnetic moment μ = √(n(n+2)) = √(1*3) = √3 = 1.73 BM.",
    ncertReference: "Class 12 Chemistry NCERT Ch 9 - Sec 9.5",
    difficulty: "EASY",
    isPYQ: true,
    pyqYear: 2020
  },

  // --- BIOLOGY QUESTIONS ---
  {
    id: "q-bio-1",
    subjectId: "biology",
    chapterId: "bio-11-genetics",
    exam: ["NEET"],
    question: "A person with blood group A (genotype I^A i) marries a person with blood group B (genotype I^B i). What is the probability that their first child will have blood group O?",
    options: ["25%", "50%", "75%", "0%"],
    correctIndex: 0,
    explanation: "Cross between (I^A i) and (I^B i):\nPossible offspring genotypes:\n1) I^A I^B (Group AB)\n2) I^A i (Group A)\n3) I^B i (Group B)\n4) i i (Group O)\nEach outcome has 1/4 probability = 25%.",
    ncertReference: "Class 12 Biology NCERT Ch 5 - Sec 5.2",
    difficulty: "EASY",
    isPYQ: true,
    pyqYear: 2022
  },

  // --- MATHEMATICS QUESTIONS ---
  {
    id: "q-math-1",
    subjectId: "mathematics",
    chapterId: "math-12-integration",
    exam: ["JEE_MAIN", "JEE_ADVANCED"],
    question: "Evaluate the definite integral: I = ∫₀^(π/2) (√sin x) / (√sin x + √cos x) dx",
    options: ["π / 4", "π / 2", "π / 8", "0"],
    correctIndex: 0,
    explanation: "Using King's property ∫_a^b f(x) dx = ∫_a^b f(a+b-x) dx:\nI = ∫₀^(π/2) (√sin(π/2 - x)) / (√sin(π/2 - x) + √cos(π/2 - x)) dx\nI = ∫₀^(π/2) (√cos x) / (√cos x + √sin x) dx\nAdding both integrals:\n2I = ∫₀^(π/2) [(√sin x + √cos x) / (√sin x + √cos x)] dx = ∫₀^(π/2) 1 dx = π/2.\nTherefore, I = π / 4.",
    ncertReference: "Class 12 Mathematics NCERT Ch 7 - Sec 7.9",
    difficulty: "MEDIUM",
    isPYQ: true,
    pyqYear: 2023
  }
];

export const MOCK_FORMULAS: Formula[] = [
  {
    id: "f-1",
    subjectId: "physics",
    chapterId: "phy-11-kinematics",
    title: "Horizontal Range of Projectile",
    formula: "R = (u² sin 2θ) / g",
    variables: [
      { symbol: "u", meaning: "Initial velocity", unit: "m/s" },
      { symbol: "θ", meaning: "Projection angle with horizontal", unit: "deg" },
      { symbol: "g", meaning: "Acceleration due to gravity", unit: "m/s²" }
    ],
    keyTrick: "Maximum range occurs at θ = 45°. Complementary angles θ and (90°-θ) give equal ranges!"
  },
  {
    id: "f-2",
    subjectId: "physics",
    chapterId: "phy-12-electrostatics",
    title: "Capacitance with Dielectric Slab",
    formula: "C = (ε₀ A) / [d - t + (t / K)]",
    variables: [
      { symbol: "A", meaning: "Plate area", unit: "m²" },
      { symbol: "d", meaning: "Plate separation", unit: "m" },
      { symbol: "t", meaning: "Slab thickness", unit: "m" },
      { symbol: "K", meaning: "Dielectric constant" }
    ],
    keyTrick: "If conducting slab inserted (K = ∞), C = ε₀ A / (d - t)."
  },
  {
    id: "f-3",
    subjectId: "chemistry",
    chapterId: "chem-12-electrochem",
    title: "Nernst Equation for Cell EMF",
    formula: "E_cell = E°_cell - (0.0591 / n) log Q",
    variables: [
      { symbol: "E°_cell", meaning: "Standard cell potential", unit: "V" },
      { symbol: "n", meaning: "Number of moles of e⁻ transferred" },
      { symbol: "Q", meaning: "Reaction quotient at temp 298K" }
    ],
    keyTrick: "At equilibrium, E_cell = 0, so E°_cell = (0.0591/n) log K_eq."
  },
  {
    id: "f-4",
    subjectId: "mathematics",
    chapterId: "math-12-integration",
    title: "King's Property of Definite Integral",
    formula: "∫_a^b f(x) dx = ∫_a^b f(a + b - x) dx",
    variables: [
      { symbol: "a, b", meaning: "Lower and upper limits of integration" },
      { symbol: "f(x)", meaning: "Integrand function" }
    ],
    keyTrick: "Use whenever integrand contains symmetric terms like sin(x)/(sin(x)+cos(x)) or ln(1+tan x) between 0 and π/4!"
  }
];
