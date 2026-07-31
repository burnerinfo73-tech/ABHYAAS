import React from "react";
import { TargetExam } from "../types";
import { 
  BookOpen, 
  FlaskConical, 
  FileQuestion, 
  Award, 
  Sparkles, 
  Flame, 
  Calendar, 
  Bot,
  Brain,
  Zap
} from "lucide-react";

interface NavbarProps {
  activeExam: TargetExam;
  onExamChange: (exam: TargetExam) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  streakDays: number;
  onOpenAiTutor: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeExam,
  onExamChange,
  activeTab,
  onTabChange,
  streakDays,
  onOpenAiTutor,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onTabChange("subject_explorer")}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 p-0.5 shadow-lg shadow-indigo-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Brain className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-indigo-300 via-sky-200 to-emerald-300 bg-clip-text text-transparent">
                  NEET & JEE
                </span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-indigo-950/80 text-indigo-300 border border-indigo-700/50">
                  Mastery
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                NCERT Companion & AI Practice Engine
              </p>
            </div>
          </div>

          {/* Exam Selector Pills */}
          <div className="flex items-center bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
            <button
              onClick={() => onExamChange("NEET")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeExam === "NEET"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30 font-bold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              NEET (UG)
            </button>
            <button
              onClick={() => onExamChange("JEE_MAIN")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeExam === "JEE_MAIN"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-bold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              JEE Main
            </button>
            <button
              onClick={() => onExamChange("JEE_ADVANCED")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeExam === "JEE_ADVANCED"
                  ? "bg-sky-600 text-white shadow-md shadow-sky-600/30 font-bold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              JEE Adv
            </button>
          </div>

          {/* Actions & AI Tutor Trigger */}
          <div className="flex items-center gap-3">
            {/* Streak Counter */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-amber-400 text-xs font-semibold">
              <Flame className="w-4 h-4 fill-amber-400 text-amber-500 animate-pulse" />
              <span>{streakDays} Day Streak</span>
            </div>

            {/* AI Tutor Button */}
            <button
              onClick={onOpenAiTutor}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 via-sky-600 to-indigo-500 text-white font-medium text-xs sm:text-sm hover:brightness-110 shadow-md shadow-indigo-500/20 active:scale-95 transition-all"
            >
              <Bot className="w-4 h-4" />
              <span>Ask AI Tutor</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            </button>
          </div>
        </div>

        {/* Secondary Navigation Bar */}
        <nav className="flex items-center space-x-1 overflow-x-auto py-2 scrollbar-none border-t border-slate-800/60 text-xs font-medium text-slate-400">
          <button
            onClick={() => onTabChange("subject_explorer")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === "subject_explorer"
                ? "bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 font-semibold"
                : "hover:bg-slate-800 hover:text-slate-200"
            }`}
          >
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <span>Subjects & Syllabus</span>
          </button>

          <button
            onClick={() => onTabChange("simulations")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === "simulations"
                ? "bg-sky-500/15 text-sky-300 border border-sky-500/30 font-semibold"
                : "hover:bg-slate-800 hover:text-slate-200"
            }`}
          >
            <FlaskConical className="w-4 h-4 text-sky-400" />
            <span>Interactive Science Lab</span>
            <span className="px-1.5 py-0.2 rounded text-[10px] bg-sky-500/20 text-sky-300">11 Labs</span>
          </button>

          <button
            onClick={() => onTabChange("practice")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === "practice"
                ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-semibold"
                : "hover:bg-slate-800 hover:text-slate-200"
            }`}
          >
            <FileQuestion className="w-4 h-4 text-emerald-400" />
            <span>Question Bank & PYQ</span>
          </button>

          <button
            onClick={() => onTabChange("mock_test")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === "mock_test"
                ? "bg-amber-500/15 text-amber-300 border border-amber-500/30 font-semibold"
                : "hover:bg-slate-800 hover:text-slate-200"
            }`}
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span>NTA Mock Test CBT</span>
          </button>

          <button
            onClick={() => onTabChange("formulas")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === "formulas"
                ? "bg-purple-500/15 text-purple-300 border border-purple-500/30 font-semibold"
                : "hover:bg-slate-800 hover:text-slate-200"
            }`}
          >
            <Zap className="w-4 h-4 text-purple-400" />
            <span>Formula Deck & Flashcards</span>
          </button>

          <button
            onClick={() => onTabChange("planner")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === "planner"
                ? "bg-rose-500/15 text-rose-300 border border-rose-500/30 font-semibold"
                : "hover:bg-slate-800 hover:text-slate-200"
            }`}
          >
            <Calendar className="w-4 h-4 text-rose-400" />
            <span>AI Study Planner</span>
          </button>
        </nav>

      </div>
    </header>
  );
};
