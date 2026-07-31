import React, { useState, useEffect } from "react";
import { Question, TargetExam, TestResult } from "../types";
import { 
  Award, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Play, 
  RotateCcw, 
  Check, 
  HelpCircle,
  BarChart2,
  ChevronRight,
  ShieldCheck
} from "lucide-react";

interface MockTestEngineProps {
  questions: Question[];
  activeExam: TargetExam;
  onSaveTestResult: (result: TestResult) => void;
}

export const MockTestEngine: React.FC<MockTestEngineProps> = ({
  questions,
  activeExam,
  onSaveTestResult,
}) => {
  const [testMode, setTestMode] = useState<"IDLE" | "IN_PROGRESS" | "RESULT">("IDLE");
  const [selectedDuration, setSelectedDuration] = useState<number>(15); // minutes
  const [testQuestions, setTestQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // User selections { [qId]: optionIdx }
  const [answers, setAnswers] = useState<Record<string, number>>({});
  // Status { [qId]: 'VISITED' | 'ANSWERED' | 'MARKED' }
  const [questionStatus, setQuestionStatus] = useState<Record<string, "NOT_VISITED" | "ANSWERED" | "MARKED" | "UNANSWERED">>({});

  // Timer state
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(15 * 60);

  // Results
  const [finalResult, setFinalResult] = useState<TestResult | null>(null);

  useEffect(() => {
    let timer: any;
    if (testMode === "IN_PROGRESS" && timeLeftSeconds > 0) {
      timer = setInterval(() => {
        setTimeLeftSeconds((prev) => {
          if (prev <= 1) {
            handleSubmitTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [testMode, timeLeftSeconds]);

  const handleStartTest = (durationMins: number) => {
    setSelectedDuration(durationMins);
    setTimeLeftSeconds(durationMins * 60);

    // Shuffle and pick questions relevant to exam
    const eligible = questions.filter((q) => q.exam.includes(activeExam) || q.exam.length > 0);
    const selected = eligible.length > 0 ? eligible.slice(0, 10) : questions.slice(0, 10);

    setTestQuestions(selected);
    setCurrentIndex(0);
    setAnswers({});

    const initialStatus: Record<string, "NOT_VISITED" | "ANSWERED" | "MARKED" | "UNANSWERED"> = {};
    selected.forEach((q, idx) => {
      initialStatus[q.id] = idx === 0 ? "UNANSWERED" : "NOT_VISITED";
    });
    setQuestionStatus(initialStatus);

    setTestMode("IN_PROGRESS");
  };

  const handleSelectOption = (optIdx: number) => {
    const currentQ = testQuestions[currentIndex];
    if (!currentQ) return;

    setAnswers((prev) => ({ ...prev, [currentQ.id]: optIdx }));
    setQuestionStatus((prev) => ({ ...prev, [currentQ.id]: "ANSWERED" }));
  };

  const handleMarkForReview = () => {
    const currentQ = testQuestions[currentIndex];
    if (!currentQ) return;

    setQuestionStatus((prev) => ({ ...prev, [currentQ.id]: "MARKED" }));
    if (currentIndex < testQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleSaveAndNext = () => {
    if (currentIndex < testQuestions.length - 1) {
      const nextIdx = currentIndex + 1;
      const nextQ = testQuestions[nextIdx];
      setCurrentIndex(nextIdx);

      setQuestionStatus((prev) => {
        if (prev[nextQ.id] === "NOT_VISITED") {
          return { ...prev, [nextQ.id]: "UNANSWERED" };
        }
        return prev;
      });
    }
  };

  const handleSubmitTest = () => {
    let correct = 0;
    let incorrect = 0;
    let unattempted = 0;

    testQuestions.forEach((q) => {
      const userAns = answers[q.id];
      if (userAns === undefined) {
        unattempted++;
      } else if (userAns === q.correctIndex) {
        correct++;
      } else {
        incorrect++;
      }
    });

    const score = correct * 4 - incorrect * 1;
    const maxScore = testQuestions.length * 4;
    const accuracy = testQuestions.length - unattempted > 0 
      ? Math.round((correct / (correct + incorrect)) * 100) 
      : 0;

    const timeSpent = selectedDuration * 60 - timeLeftSeconds;

    const result: TestResult = {
      id: "res-" + Date.now(),
      date: new Date().toLocaleDateString(),
      examType: activeExam,
      title: `${activeExam} Speed Mock Test`,
      score,
      maxScore,
      totalQuestions: testQuestions.length,
      correct,
      incorrect,
      unattempted,
      accuracy,
      timeSpentSeconds: timeSpent,
      subjectScores: {
        physics: { score: score > 0 ? score : 0, max: maxScore },
        chemistry: { score: 0, max: 0 },
        biology: { score: 0, max: 0 },
        mathematics: { score: 0, max: 0 },
      },
    };

    setFinalResult(result);
    onSaveTestResult(result);
    setTestMode("RESULT");
  };

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Render IDLE state
  if (testMode === "IDLE") {
    return (
      <div className="space-y-6">
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 border border-amber-900/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-medium mb-2">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>NTA CBT Computer Based Test Engine</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-100">{activeExam.replace("_", " ")} Speed Mock Exam</h1>
            <p className="text-sm text-slate-400 max-w-2xl mt-1">
              Simulate actual exam conditions with countdown timers, NTA palette color coding, and instant marking scheme (+4 / -1).
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-bold">
              15m
            </div>
            <h3 className="font-bold text-base text-slate-100">10-Q Rapid Speed Quiz</h3>
            <p className="text-xs text-slate-400">10 High-Yield MCQs | 15 Minutes | Marking: +4 / -1</p>
            <button
              onClick={() => handleStartTest(15)}
              className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-all shadow-md shadow-amber-600/20"
            >
              Start 15-Min Test
            </button>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center font-bold">
              30m
            </div>
            <h3 className="font-bold text-base text-slate-100">Half-Length Subject Mock</h3>
            <p className="text-xs text-slate-400">20 High-Yield MCQs | 30 Minutes | Marking: +4 / -1</p>
            <button
              onClick={() => handleStartTest(30)}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/20"
            >
              Start 30-Min Test
            </button>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold">
              60m
            </div>
            <h3 className="font-bold text-base text-slate-100">Full Revision Exam</h3>
            <p className="text-xs text-slate-400">40 High-Yield MCQs | 60 Minutes | Marking: +4 / -1</p>
            <button
              onClick={() => handleStartTest(60)}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/20"
            >
              Start 60-Min Test
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render CBT IN_PROGRESS state
  if (testMode === "IN_PROGRESS") {
    const currentQ = testQuestions[currentIndex];

    return (
      <div className="space-y-4">
        {/* CBT Header */}
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-amber-400" />
            <div>
              <h2 className="font-bold text-sm text-slate-100">{activeExam} NTA CBT Test</h2>
              <p className="text-xs text-slate-400">Question {currentIndex + 1} of {testQuestions.length}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-amber-400 font-mono font-bold text-sm flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{formatTimer(timeLeftSeconds)}</span>
            </div>

            <button
              onClick={handleSubmitTest}
              className="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md shadow-rose-600/20 transition-all"
            >
              Submit Test
            </button>
          </div>
        </div>

        {/* Main Test Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          
          {/* Question View */}
          <div className="lg:col-span-3 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs">
              <span className="font-mono text-indigo-400 font-bold uppercase">
                Section: {currentQ.subjectId}
              </span>
              <span className="text-slate-400">Correct: +4 | Incorrect: -1</span>
            </div>

            <p className="text-sm font-semibold text-slate-100 leading-relaxed whitespace-pre-line">
              {currentQ.question}
            </p>

            <div className="space-y-2.5">
              {currentQ.options.map((opt, optIdx) => {
                const isSelected = answers[currentQ.id] === optIdx;

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full p-3.5 rounded-xl border text-left text-xs font-medium transition-all flex items-start gap-3 ${
                      isSelected
                        ? "bg-indigo-600/20 border-indigo-500 text-indigo-200 font-bold ring-1 ring-indigo-500/40"
                        : "bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800/60"
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center font-mono text-[10px] flex-shrink-0">
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="pt-0.5">{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={handleMarkForReview}
                className="px-4 py-2 rounded-xl bg-purple-950/80 text-purple-300 border border-purple-800/50 text-xs font-semibold"
              >
                Mark for Review & Next
              </button>

              <button
                onClick={handleSaveAndNext}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/20 flex items-center gap-1"
              >
                <span>Save & Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Palette Side Panel */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Question Palette</h4>

            <div className="grid grid-cols-5 gap-2">
              {testQuestions.map((q, idx) => {
                const status = questionStatus[q.id] || "NOT_VISITED";
                let style = "bg-slate-950 border-slate-800 text-slate-400";

                if (status === "ANSWERED") style = "bg-emerald-600 text-white font-bold border-emerald-500";
                if (status === "MARKED") style = "bg-purple-600 text-white font-bold border-purple-500";
                if (status === "UNANSWERED") style = "bg-rose-600 text-white font-bold border-rose-500";

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-9 rounded-lg border text-xs font-mono transition-all ${style} ${
                      currentIndex === idx ? "ring-2 ring-indigo-400 scale-105" : ""
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="space-y-1.5 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-emerald-600" />
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-purple-600" />
                <span>Marked for Review</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-rose-600" />
                <span>Unanswered</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // Render RESULT state
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Test Completed</span>
            <h2 className="text-2xl font-bold text-slate-100">{finalResult?.title} Scorecard</h2>
          </div>

          <button
            onClick={() => setTestMode("IDLE")}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Take Another Test</span>
          </button>
        </div>

        {/* Score Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-xs text-slate-400">Total Score</span>
            <div className="text-2xl font-bold text-emerald-400">{finalResult?.score} / {finalResult?.maxScore}</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-xs text-slate-400">Accuracy %</span>
            <div className="text-2xl font-bold text-sky-400">{finalResult?.accuracy}%</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-xs text-slate-400">Correct Qs</span>
            <div className="text-2xl font-bold text-emerald-400">{finalResult?.correct}</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-xs text-slate-400">Incorrect Qs</span>
            <div className="text-2xl font-bold text-rose-400">{finalResult?.incorrect}</div>
          </div>
        </div>

        {/* Detailed Solutions Review */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <h3 className="font-bold text-base text-slate-100">Detailed Solution Breakdown</h3>

          {testQuestions.map((q, idx) => {
            const userAns = answers[q.id];
            const isCorrect = userAns === q.correctIndex;

            return (
              <div key={q.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Q{idx + 1}. {q.subjectId.toUpperCase()}</span>
                  <span className={isCorrect ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>
                    {isCorrect ? "+4 Marks" : userAns !== undefined ? "-1 Mark" : "0 Marks"}
                  </span>
                </div>
                <p className="font-semibold text-slate-200">{q.question}</p>
                <div className="text-slate-300 pt-2 border-t border-slate-800/60">
                  <span className="font-bold text-emerald-400">Correct Option: {String.fromCharCode(65 + q.correctIndex)}</span>
                  <p className="mt-1 text-slate-400 leading-relaxed">{q.explanation}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
