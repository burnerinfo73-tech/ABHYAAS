import React, { useState } from "react";
import { Question, SubjectId, TargetExam } from "../types";
import { 
  FileQuestion, 
  CheckCircle2, 
  XCircle, 
  Bookmark, 
  Sparkles, 
  Filter, 
  BookOpen, 
  RotateCcw,
  Plus,
  HelpCircle
} from "lucide-react";

interface PracticeBankProps {
  questions: Question[];
  activeExam: TargetExam;
  savedQuestions: string[];
  onToggleBookmark: (qId: string) => void;
  onGenerateAiQuestions: (subject: string, chapter: string) => Promise<Question[]>;
}

export const PracticeBank: React.FC<PracticeBankProps> = ({
  questions,
  activeExam,
  savedQuestions,
  onToggleBookmark,
  onGenerateAiQuestions,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectId | "ALL">("ALL");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("ALL");
  const [onlySaved, setOnlySaved] = useState<boolean>(false);

  // Selected option state for each question { [questionId]: optionIndex }
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [showSolution, setShowSolution] = useState<Record<string, boolean>>({});

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [extraAiQuestions, setExtraAiQuestions] = useState<Question[]>([]);

  const allQuestions = [...questions, ...extraAiQuestions];

  const filteredQuestions = allQuestions.filter((q) => {
    if (selectedSubject !== "ALL" && q.subjectId !== selectedSubject) return false;
    if (difficultyFilter !== "ALL" && q.difficulty !== difficultyFilter) return false;
    if (onlySaved && !savedQuestions.includes(q.id)) return false;
    return true;
  });

  const handleSelectOption = (qId: string, optionIdx: number) => {
    setUserAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
    setShowSolution((prev) => ({ ...prev, [qId]: true }));
  };

  const handleGenerateMore = async () => {
    setIsGenerating(true);
    try {
      const sub = selectedSubject === "ALL" ? "physics" : selectedSubject;
      const generated = await onGenerateAiQuestions(sub, "General Practice");
      setExtraAiQuestions((prev) => [...prev, ...generated]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 border border-emerald-900/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-medium mb-2">
            <FileQuestion className="w-3.5 h-3.5 text-emerald-400" />
            <span>NTA Pattern MCQs & PYQ Question Bank</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-100">Practice Question Bank</h1>
          <p className="text-sm text-slate-400 max-w-2xl mt-1">
            Solve topic-wise standard questions with step-by-step explanations and NCERT citations.
          </p>
        </div>

        <button
          onClick={handleGenerateMore}
          disabled={isGenerating}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-600 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{isGenerating ? "Generating Questions..." : "Generate AI Questions"}</span>
        </button>
      </div>

      {/* Filter Controls */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-slate-400 font-semibold flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            Subject:
          </span>
          {["ALL", "physics", "chemistry", "biology", "mathematics"].map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubject(sub as any)}
              className={`px-3 py-1.5 rounded-lg font-medium capitalize transition-all ${
                selectedSubject === sub
                  ? "bg-emerald-600 text-white font-bold"
                  : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200"
              }`}
            >
              {sub}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setOnlySaved(!onlySaved)}
            className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-all ${
              onlySaved
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                : "bg-slate-950 text-slate-400 border border-slate-800"
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Bookmarked ({savedQuestions.length})</span>
          </button>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="p-12 text-center bg-slate-900/60 rounded-2xl border border-slate-800 space-y-3">
            <HelpCircle className="w-10 h-10 text-slate-600 mx-auto" />
            <p className="text-slate-300 font-medium">No questions matched the selected filter.</p>
            <button
              onClick={() => {
                setSelectedSubject("ALL");
                setDifficultyFilter("ALL");
                setOnlySaved(false);
              }}
              className="px-4 py-2 bg-slate-800 text-xs text-slate-300 rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredQuestions.map((q, qIndex) => {
            const isBookmarked = savedQuestions.includes(q.id);
            const userSelected = userAnswers[q.id];
            const isAnswered = userSelected !== undefined;
            const isCorrect = userSelected === q.correctIndex;

            return (
              <div
                key={q.id}
                className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all space-y-4 shadow-sm"
              >
                {/* Header info */}
                <div className="flex items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-mono text-slate-400 font-bold">Q{qIndex + 1}.</span>
                    <span className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 font-semibold uppercase border border-indigo-800/40">
                      {q.subjectId}
                    </span>
                    {q.isPYQ && (
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                        PYQ {q.pyqYear || "NEET/JEE"}
                      </span>
                    )}
                    {q.ncertReference && (
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                        {q.ncertReference}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => onToggleBookmark(q.id)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      isBookmarked
                        ? "text-amber-400 bg-amber-500/10 border border-amber-500/30"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                    }`}
                  >
                    <Bookmark className="w-4 h-4 fill-current" />
                  </button>
                </div>

                {/* Question Statement */}
                <p className="text-sm font-semibold text-slate-100 leading-relaxed whitespace-pre-line">
                  {q.question}
                </p>

                {/* Options List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {q.options.map((opt, optIdx) => {
                    const isOptionSelected = userSelected === optIdx;
                    const isOptionCorrect = q.correctIndex === optIdx;

                    let btnStyle = "bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800/60";

                    if (isAnswered) {
                      if (isOptionCorrect) {
                        btnStyle = "bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold ring-1 ring-emerald-500/40";
                      } else if (isOptionSelected) {
                        btnStyle = "bg-rose-950/80 border-rose-500 text-rose-200 font-bold";
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        disabled={isAnswered}
                        className={`p-3.5 rounded-xl border text-left text-xs font-medium transition-all flex items-start gap-2.5 ${btnStyle}`}
                      >
                        <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center font-mono text-[10px] flex-shrink-0">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="leading-tight pt-0.5">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Solution Box */}
                {showSolution[q.id] && (
                  <div
                    className={`p-4 rounded-xl border space-y-2 text-xs leading-relaxed animate-fadeIn ${
                      isCorrect
                        ? "bg-emerald-950/30 border-emerald-800/60 text-emerald-200"
                        : "bg-rose-950/30 border-rose-800/60 text-rose-200"
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-sm">
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Correct Answer! (+4 Marks)</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-rose-400" />
                          <span>Incorrect (-1 Mark). Correct Option: {String.fromCharCode(65 + q.correctIndex)}</span>
                        </>
                      )}
                    </div>

                    <div className="pt-2 border-t border-slate-800/60 text-slate-300">
                      <span className="font-bold text-slate-100 block mb-1">Detailed Explanation:</span>
                      <p className="whitespace-pre-line">{q.explanation}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
