import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // Initialize Gemini AI Client
  const getAiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not set in environment variables");
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  };

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // AI Doubt Solver / Problem Explainer Endpoint
  app.post("/api/gemini/solve-doubt", async (req, res) => {
    try {
      const { question, subject, exam, chapter, context } = req.body;
      if (!question) {
        return res.status(400).json({ error: "Question prompt is required." });
      }

      const ai = getAiClient();
      const prompt = `You are a world-class expert teacher and mentor for ${exam || "NEET/JEE"} preparation in India, specializing in ${subject || "Physics, Chemistry, Biology & Mathematics"}.
Chapter/Topic: ${chapter || "General"}
Student Question / Problem:
"${question}"
${context ? `Additional Context: ${context}` : ""}

Provide a clear, pedagogical, encouraging response formatted nicely in markdown:
1. **Core Concept & Principle**: Explain the foundational theory/formula.
2. **Step-by-Step Solution / Explanation**: Walk through the logic logically, showing clear steps and equations.
3. **NEET/JEE Exam Tip & Trap Warning**: Common mistakes students make in this topic during exams.
4. **Quick Summary / Key Formula to Remember**.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          systemInstruction:
            "You are an empathetic, top-ranker AI Tutor for NEET (UG) and JEE (Main & Advanced). Use markdown formatting, clear mathematical expressions, and concise bullet points.",
          temperature: 0.7,
        },
      });

      res.json({ answer: response.text || "No explanation could be generated." });
    } catch (error: any) {
      console.error("Error in solve-doubt:", error);
      res.status(500).json({ error: error?.message || "Failed to solve doubt via AI." });
    }
  });

  // AI Custom Question Generator Endpoint
  app.post("/api/gemini/generate-questions", async (req, res) => {
    try {
      const { subject, chapter, exam, difficulty, count = 3 } = req.body;
      const ai = getAiClient();

      const prompt = `Generate ${count} original, high-yield practice questions for ${exam || "NEET/JEE"} preparation.
Subject: ${subject}
Chapter: ${chapter}
Difficulty: ${difficulty || "Medium"}

Format strictly as JSON array where each question has:
- "id": string unique id
- "question": string
- "options": array of 4 strings (A, B, C, D)
- "correctIndex": number (0 to 3)
- "explanation": string detailing step-by-step solution
- "ncertReference": string (e.g. "Class 11 Physics NCERT Ch 3 - Sec 3.4")
- "conceptTag": string`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                question: { type: Type.STRING },
                options: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                correctIndex: { type: Type.INTEGER },
                explanation: { type: Type.STRING },
                ncertReference: { type: Type.STRING },
                conceptTag: { type: Type.STRING },
              },
              required: ["id", "question", "options", "correctIndex", "explanation"],
            },
          },
        },
      });

      const jsonText = response.text?.trim() || "[]";
      const questions = JSON.parse(jsonText);
      res.json({ questions });
    } catch (error: any) {
      console.error("Error generating questions:", error);
      res.status(500).json({ error: error?.message || "Failed to generate AI questions." });
    }
  });

  // AI Personalized Study Plan Endpoint
  app.post("/api/gemini/study-plan", async (req, res) => {
    try {
      const { targetExam, daysLeft, weakTopics, dailyHours } = req.body;
      const ai = getAiClient();

      const prompt = `Create a high-impact revision study strategy for a student preparing for ${targetExam}.
Days remaining: ${daysLeft || 90} days.
Daily study hours available: ${dailyHours || 8} hours.
Weak areas reported: ${weakTopics || "Mechanics, Organic Chemistry mechanisms, Organic Reaction Mechanisms"}.

Provide a markdown response containing:
1. **Strategic Weekly Focus**: Phase breakdown (Concepts vs PYQ Solving vs Mock Tests).
2. **Daily Schedule Template**: Time blocks for Physics, Chemistry, Biology/Math, and Revision.
3. **High Weightage Priority Topics**: Must-do chapters for maximum score boost.
4. **Pro Test Strategy**: Mindset, time allocation per section in CBT exam.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
      });

      res.json({ plan: response.text });
    } catch (error: any) {
      console.error("Error generating study plan:", error);
      res.status(500).json({ error: error?.message || "Failed to generate study plan." });
    }
  });

  // AI Flashcard Active Recall Generator Endpoint
  app.post("/api/gemini/generate-flashcards", async (req, res) => {
    try {
      const { formulas } = req.body; // Array of formula objects
      if (!formulas || !Array.isArray(formulas) || formulas.length === 0) {
        return res.status(400).json({ error: "At least one formula is required to generate flashcards." });
      }

      const ai = getAiClient();
      const prompt = `Convert the following list of study formulas into active-recall Question-Answer flashcards for NEET/JEE revision testing:

Formulas:
${JSON.stringify(formulas, null, 2)}

For each formula, generate an interactive active recall test question that tests the student's understanding of formula derivation, variable dependencies, units, or practical applications.
Return a JSON array of flashcard objects, where each object has:
- "id": string unique id
- "formulaId": string matching original formula id
- "subject": string
- "title": string (title of the concept)
- "question": string (challenging active recall question)
- "answer": string (detailed correct answer with formula)
- "hint": string (a subtle hint before revealing answer)
- "conceptCheck": string (a quick follow-up conceptual question)`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                formulaId: { type: Type.STRING },
                subject: { type: Type.STRING },
                title: { type: Type.STRING },
                question: { type: Type.STRING },
                answer: { type: Type.STRING },
                hint: { type: Type.STRING },
                conceptCheck: { type: Type.STRING },
              },
              required: ["id", "formulaId", "question", "answer", "hint"],
            },
          },
        },
      });

      const jsonText = response.text?.trim() || "[]";
      const flashcards = JSON.parse(jsonText);
      res.json({ flashcards });
    } catch (error: any) {
      console.error("Error generating flashcards:", error);
      res.status(500).json({ error: error?.message || "Failed to generate AI flashcards." });
    }
  });

  // Vite middleware setup for dev & static serving for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
