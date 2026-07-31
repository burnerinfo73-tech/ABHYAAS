import React, { useState, useEffect } from "react";
import { TargetExam } from "../types";
import { 
  Bot, 
  Sparkles, 
  Send, 
  X, 
  Zap, 
  BookOpen, 
  Lightbulb, 
  AlertTriangle, 
  HelpCircle,
  Loader2
} from "lucide-react";

interface AITutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeExam: TargetExam;
  initialQuery?: string;
  initialSubject?: string;
}

export const AITutorModal: React.FC<AITutorModalProps> = ({
  isOpen,
  onClose,
  activeExam,
  initialQuery = "",
  initialSubject = "Physics",
}) => {
  const [question, setQuestion] = useState<string>(initialQuery);
  const [subject, setSubject] = useState<string>(initialSubject);
  const [responseMarkdown, setResponseMarkdown] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (initialQuery) {
      setQuestion(initialQuery);
    }
  }, [initialQuery]);

  if (!isOpen) return null;

  const presets = [
    { title: "Lenz's Law Shortcut", subject: "Physics", prompt: "Explain Lenz's law and how to quickly determine induced current direction using Lenz rule shortcuts in NEET/JEE." },
    { title: "General Organic Reaction Mechanisms", subject: "Chemistry", prompt: "Explain SN1 vs SN2 reaction mechanisms with carbocation stability and steric hindrance tricks." },
    { title: "Genetics Pedigree Chart Rules", subject: "Biology", prompt: "Give me the step-by-step 4-rule algorithm to solve any pedigree chart question in NEET Biology in under 30 seconds." },
    { title: "JEE Definite Integration King's Rule", subject: "Mathematics", prompt: "Explain King's Property in definite integrals with 2 solved JEE Main PYQ examples." },
  ];

  const handleSolve = async (promptToUse?: string) => {
    const finalQuestion = promptToUse || question;
    if (!finalQuestion.trim()) return;

    setIsLoading(true);
    setErrorMessage(null);
    setResponseMarkdown(null);

    try {
      const res = await fetch("/api/gemini/solve-doubt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: finalQuestion,
          subject,
          exam: activeExam,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to solve doubt via AI");
      }

      setResponseMarkdown(data.answer);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err?.message || "An error occurred while communicating with Gemini AI.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        
        {/* Header */}
        <div className="p-4 sm:p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-indigo-600 to-sky-500 text-white shadow-md shadow-indigo-500/20">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-100">AI Mentor & Doubt Resolver</h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-950 text-indigo-300 border border-indigo-800/50">
                  Gemini 3.6 Flash
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Instant step-by-step breakdown & NEET/JEE exam tricks
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1">
          
          {/* Preset Chips */}
          <div>
            <span className="text-xs font-semibold text-slate-400 mb-2 block">Quick High-Yield Presets:</span>
            <div className="flex flex-wrap gap-2">
              {presets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSubject(preset.subject);
                    setQuestion(preset.prompt);
                    handleSolve(preset.prompt);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-indigo-950 text-slate-300 hover:text-indigo-200 border border-slate-800 hover:border-indigo-700/50 text-xs font-medium transition-all"
                >
                  ✨ {preset.title}
                </button>
              ))}
            </div>
          </div>

          {/* Prompt Form */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center gap-3">
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="bg-slate-900 text-slate-200 border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-semibold outline-none focus:border-indigo-500"
              >
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
                <option value="Mathematics">Mathematics</option>
              </select>
              <span className="text-xs text-slate-400 font-mono">Target: {activeExam}</span>
            </div>

            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your question, concept doubt, or paste a problem statement here..."
              rows={3}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 outline-none focus:border-indigo-500 resize-none"
            />

            <div className="flex justify-end">
              <button
                onClick={() => handleSolve()}
                disabled={isLoading || !question.trim()}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-600 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/20 hover:brightness-110 active:scale-95 disabled:opacity-50 transition-all"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analyzing Concept...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Solve Doubt with AI</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Loading state */}
          {isLoading && (
            <div className="p-8 text-center space-y-3 bg-slate-950/60 rounded-xl border border-indigo-900/40 animate-pulse">
              <Sparkles className="w-8 h-8 text-indigo-400 mx-auto animate-spin" />
              <p className="text-xs text-indigo-300 font-semibold">Consulting AI Knowledge Base for NEET/JEE...</p>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs">
              <div className="font-bold mb-1 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>Error generating AI explanation</span>
              </div>
              <p>{errorMessage}</p>
            </div>
          )}

          {/* Response Output */}
          {responseMarkdown && (
            <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-900/50 space-y-3">
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider border-b border-slate-800 pb-2">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span>AI Tutor Detailed Solution & Hacks</span>
              </div>

              <div className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line font-sans">
                {responseMarkdown}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
