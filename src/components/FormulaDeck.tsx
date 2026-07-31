import React, { useState } from "react";
import { Formula, SubjectId } from "../types";
import { 
  Zap, 
  Search, 
  Star, 
  RotateCw, 
  Sparkles, 
  BookOpen, 
  Check,
  Brain,
  HelpCircle,
  Eye,
  CheckCircle2,
  XCircle,
  Loader2,
  X,
  ChevronRight,
  RotateCcw,
  Lightbulb
} from "lucide-react";

interface FormulaDeckProps {
  formulas: Formula[];
  starredFormulas: string[];
  onToggleStarFormula: (fId: string) => void;
}

interface Flashcard {
  id: string;
  formulaId: string;
  subject?: string;
  title?: string;
  question: string;
  answer: string;
  hint: string;
  conceptCheck?: string;
}

export const FormulaDeck: React.FC<FormulaDeckProps> = ({
  formulas,
  starredFormulas,
  onToggleStarFormula,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectId | "ALL">("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [onlyStarred, setOnlyStarred] = useState<boolean>(false);

  // Flipped card state { [formulaId]: boolean }
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});

  // AI Active Recall Test Mode
  const [isAiTestActive, setIsAiTestActive] = useState<boolean>(false);
  const [isGeneratingCards, setIsGeneratingCards] = useState<boolean>(false);
  const [generatedFlashcards, setGeneratedFlashcards] = useState<Flashcard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [userScore, setUserScore] = useState<{ mastered: number; review: number }>({ mastered: 0, review: 0 });
  const [isTestComplete, setIsTestComplete] = useState<boolean>(false);

  const filteredFormulas = formulas.filter((f) => {
    if (selectedSubject !== "ALL" && f.subjectId !== selectedSubject) return false;
    if (onlyStarred && !starredFormulas.includes(f.id)) return false;
    if (
      searchQuery &&
      !f.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !f.formula.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const toggleFlip = (id: string) => {
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleGenerateAiFlashcards = async () => {
    const targetFormulas = starredFormulas.length > 0
      ? formulas.filter((f) => starredFormulas.includes(f.id))
      : filteredFormulas;

    if (targetFormulas.length === 0) return;

    setIsGeneratingCards(true);
    try {
      const res = await fetch("/api/gemini/generate-flashcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formulas: targetFormulas }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate flashcards");

      setGeneratedFlashcards(data.flashcards || []);
      setCurrentCardIndex(0);
      setShowHint(false);
      setShowAnswer(false);
      setUserScore({ mastered: 0, review: 0 });
      setIsTestComplete(false);
      setIsAiTestActive(true);
    } catch (err: any) {
      console.error(err);
      alert(err?.message || "Error generating AI flashcards");
    } fontFinally: {
      setIsGeneratingCards(false);
    }
  };

  const handleAnswerCard = (knewIt: boolean) => {
    setUserScore((prev) => ({
      mastered: prev.mastered + (knewIt ? 1 : 0),
      review: prev.review + (knewIt ? 0 : 1),
    }));

    if (currentCardIndex < generatedFlashcards.length - 1) {
      setCurrentCardIndex((prev) => prev + 1);
      setShowHint(false);
      setShowAnswer(false);
    } else {
      setIsTestComplete(true);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 border border-purple-900/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 text-xs font-medium mb-2">
            <Zap className="w-3.5 h-3.5 text-purple-400" />
            <span>Rapid Revision Flashcard Deck</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-100">Formula & Concept Flashcards</h1>
          <p className="text-sm text-slate-400 max-w-2xl mt-1">
            Click cards to flip and inspect variable meanings, units, and high-yielding exam tricks.
          </p>
        </div>

        {/* AI Flashcard Test Trigger */}
        <button
          onClick={handleGenerateAiFlashcards}
          disabled={isGeneratingCards}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-purple-600/25 transition-all disabled:opacity-50"
        >
          {isGeneratingCards ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Creating AI Active Recall Cards...</span>
            </>
          ) : (
            <>
              <Brain className="w-4 h-4 text-purple-200" />
              <span>AI Active Recall Test ({starredFormulas.length > 0 ? `${starredFormulas.length} Starred` : "All"})</span>
            </>
          )}
        </button>
      </div>

      {/* AI Flashcard Test Modal */}
      {isAiTestActive && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-purple-900/50 rounded-2xl max-w-2xl w-full p-6 space-y-6 shadow-2xl relative">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-purple-950 text-purple-400 border border-purple-800/50">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-100">AI Active Recall Recall Test</h2>
                  <p className="text-xs text-slate-400">
                    {!isTestComplete 
                      ? `Card ${currentCardIndex + 1} of ${generatedFlashcards.length}`
                      : "Test Complete"}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsAiTestActive(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Test Content */}
            {!isTestComplete ? (
              <div className="space-y-4">
                {/* Question Box */}
                <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <span className="text-[10px] font-mono font-bold text-purple-400 uppercase bg-purple-950 px-2 py-0.5 rounded border border-purple-800/40">
                    {generatedFlashcards[currentCardIndex]?.title || "Active Recall Challenge"}
                  </span>
                  <p className="text-sm font-semibold text-slate-100 leading-relaxed">
                    {generatedFlashcards[currentCardIndex]?.question}
                  </p>
                </div>

                {/* Hint Button */}
                {generatedFlashcards[currentCardIndex]?.hint && (
                  <div>
                    {!showHint ? (
                      <button
                        onClick={() => setShowHint(true)}
                        className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-medium"
                      >
                        <Lightbulb className="w-3.5 h-3.5" />
                        <span>Need a hint?</span>
                      </button>
                    ) : (
                      <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-800/40 text-amber-200 text-xs">
                        <span className="font-bold">Hint:</span> {generatedFlashcards[currentCardIndex]?.hint}
                      </div>
                    )}
                  </div>
                )}

                {/* Answer Reveal Box */}
                {showAnswer ? (
                  <div className="p-5 rounded-xl bg-emerald-950/20 border border-emerald-800/40 space-y-3 animate-fadeIn">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                      Correct Formula & Explanation:
                    </span>
                    <p className="text-xs text-slate-200 font-mono leading-relaxed whitespace-pre-line">
                      {generatedFlashcards[currentCardIndex]?.answer}
                    </p>

                    {generatedFlashcards[currentCardIndex]?.conceptCheck && (
                      <div className="pt-2 border-t border-emerald-900/40 text-[11px] text-emerald-300">
                        <span className="font-bold">Concept Check:</span> {generatedFlashcards[currentCardIndex]?.conceptCheck}
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => setShowAnswer(true)}
                    className="w-full py-3 rounded-xl bg-slate-950 border border-indigo-900/40 hover:border-indigo-500 text-indigo-300 text-xs font-bold flex items-center justify-center gap-2 transition-all"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Reveal Formula & Answer</span>
                  </button>
                )}

                {/* Response Feedback Buttons */}
                {showAnswer && (
                  <div className="flex items-center gap-3 pt-3">
                    <button
                      onClick={() => handleAnswerCard(false)}
                      className="flex-1 py-2.5 rounded-xl bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-800/50 text-xs font-bold flex items-center justify-center gap-2 transition-all"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Needs Revision</span>
                    </button>

                    <button
                      onClick={() => handleAnswerCard(true)}
                      className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-600/20"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>I Mastered This!</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Test Complete Score Summary */
              <div className="text-center space-y-6 py-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-950 text-emerald-400 border border-emerald-800/60 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-100">Active Recall Session Complete!</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    You reviewed {generatedFlashcards.length} key formulas with AI generation.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto text-xs">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 block mb-1">Mastered</span>
                    <span className="text-2xl font-bold text-emerald-400">{userScore.mastered}</span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 block mb-1">Needs Revision</span>
                    <span className="text-2xl font-bold text-rose-400">{userScore.review}</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsAiTestActive(false)}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/20"
                >
                  Return to Deck
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Controls */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search formulas (e.g. Range, Nernst, Integrals)..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 outline-none focus:border-purple-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {["ALL", "physics", "chemistry", "mathematics"].map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubject(sub as any)}
              className={`px-3 py-1.5 rounded-lg font-medium capitalize transition-all ${
                selectedSubject === sub
                  ? "bg-purple-600 text-white font-bold"
                  : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200"
              }`}
            >
              {sub}
            </button>
          ))}

          <button
            onClick={() => setOnlyStarred(!onlyStarred)}
            className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-all ${
              onlyStarred
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                : "bg-slate-950 text-slate-400 border border-slate-800"
            }`}
          >
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>Starred ({starredFormulas.length})</span>
          </button>
        </div>
      </div>

      {/* Grid of Flashcards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredFormulas.map((f) => {
          const isStarred = starredFormulas.includes(f.id);
          const isFlipped = flipped[f.id];

          return (
            <div
              key={f.id}
              onClick={() => toggleFlip(f.id)}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-purple-500/50 cursor-pointer transition-all min-h-[180px] flex flex-col justify-between relative shadow-sm group"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-[10px] font-mono font-bold text-purple-400 uppercase bg-purple-950/80 px-2 py-0.5 rounded border border-purple-800/40">
                  {f.subjectId}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleStarFormula(f.id);
                  }}
                  className={`p-1.5 rounded-lg transition-colors ${
                    isStarred
                      ? "text-amber-400 bg-amber-500/10 border border-amber-500/30"
                      : "text-slate-500 hover:text-slate-200"
                  }`}
                >
                  <Star className="w-4 h-4 fill-current" />
                </button>
              </div>

              {/* Front vs Back */}
              {!isFlipped ? (
                <div className="my-4 text-center space-y-2">
                  <h3 className="text-sm font-bold text-slate-200">{f.title}</h3>
                  <div className="p-3 rounded-xl bg-slate-950 border border-purple-900/30 text-indigo-300 font-mono font-bold text-base sm:text-lg">
                    {f.formula}
                  </div>
                  <span className="text-[11px] text-slate-500 flex items-center justify-center gap-1 pt-1">
                    <RotateCw className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500" />
                    Click to flip & view variables/tricks
                  </span>
                </div>
              ) : (
                <div className="my-3 space-y-2 text-xs">
                  <div className="font-bold text-purple-300 uppercase text-[10px]">Variables Breakdown:</div>
                  <ul className="space-y-1 text-slate-300 font-mono">
                    {f.variables.map((v, vIdx) => (
                      <li key={vIdx} className="flex items-center justify-between">
                        <span className="text-indigo-400 font-bold">{v.symbol}:</span>
                        <span className="text-slate-400">{v.meaning} {v.unit ? `(${v.unit})` : ""}</span>
                      </li>
                    ))}
                  </ul>

                  {f.keyTrick && (
                    <div className="p-2.5 rounded-lg bg-amber-950/30 border border-amber-800/40 text-amber-200 text-[11px] mt-2">
                      <span className="font-bold">Exam Trick:</span> {f.keyTrick}
                    </div>
                  )}
                </div>
              )}

              <div className="text-[10px] text-slate-500 text-right">
                {isFlipped ? "Click to view formula" : "Click for details"}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
