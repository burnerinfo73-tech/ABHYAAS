import React, { useState } from "react";
import { Chapter, SubjectId, TargetExam, StudyStatus } from "../types";
import { 
  Atom, 
  FlaskRound as Flask, 
  Dna, 
  Binary, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Sparkles, 
  BookOpen, 
  ChevronRight, 
  ArrowRight,
  Zap,
  Layers,
  Filter
} from "lucide-react";

interface SubjectExplorerProps {
  chapters: Chapter[];
  activeExam: TargetExam;
  onUpdateChapterStatus: (chapterId: string, status: StudyStatus) => void;
  onSelectChapterForPractice: (chapterId: string) => void;
  onOpenAiForTopic: (topicName: string, subject: string) => void;
}

export const SubjectExplorer: React.FC<SubjectExplorerProps> = ({
  chapters,
  activeExam,
  onUpdateChapterStatus,
  onSelectChapterForPractice,
  onOpenAiForTopic,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectId>("physics");
  const [classFilter, setClassFilter] = useState<"ALL" | 11 | 12>("ALL");
  const [activeChapter, setActiveChapter] = useState<Chapter | null>(null);

  // Filter subjects based on target exam
  // NEET has Physics, Chemistry, Biology
  // JEE has Physics, Chemistry, Mathematics
  const subjects: { id: SubjectId; name: string; icon: any; color: string }[] = [
    { id: "physics", name: "Physics", icon: Atom, color: "from-sky-500 to-indigo-500" },
    { id: "chemistry", name: "Chemistry", icon: Flask, color: "from-emerald-500 to-teal-500" },
    ...(activeExam === "NEET" 
      ? [{ id: "biology" as SubjectId, name: "Biology", icon: Dna, color: "from-rose-500 to-pink-500" }] 
      : [{ id: "mathematics" as SubjectId, name: "Mathematics", icon: Binary, color: "from-amber-500 to-orange-500" }]),
  ];

  const filteredChapters = chapters.filter((ch) => {
    if (ch.subjectId !== selectedSubject) return false;
    if (classFilter !== "ALL" && ch.classLevel !== classFilter) return false;
    return true;
  });

  const getStatusBadge = (status: StudyStatus) => {
    switch (status) {
      case "MASTERED":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Mastered
          </span>
        );
      case "REVISED":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-500/15 text-sky-400 border border-sky-500/30">
            <Clock className="w-3.5 h-3.5" />
            Revised
          </span>
        );
      case "IN_PROGRESS":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <Zap className="w-3.5 h-3.5" />
            In Progress
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-400 border border-slate-700">
            Not Started
          </span>
        );
    }
  };

  const getWeightageBadge = (weightage: string) => {
    if (weightage === "HIGH") {
      return (
        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
          High Weightage (8-12%)
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-800 text-slate-300 border border-slate-700">
        Medium Weightage
      </span>
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-900/40 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-medium mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>NCERT Aligned Syllabus 2026-27</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-100">
              {activeExam === "NEET" ? "NEET (UG) Syllabus Tracker" : `${activeExam.replace("_", " ")} Chapter Guide`}
            </h1>
            <p className="text-sm text-slate-400 max-w-2xl mt-1">
              Structured topic-wise revision with high-yield concepts, NCERT chapter mappings, and instant problem solver.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800">
            <Filter className="w-4 h-4 text-slate-400 ml-2" />
            <span className="text-xs text-slate-400">Class:</span>
            <button
              onClick={() => setClassFilter("ALL")}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                classFilter === "ALL" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setClassFilter(11)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                classFilter === 11 ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Class 11
            </button>
            <button
              onClick={() => setClassFilter(12)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                classFilter === 12 ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Class 12
            </button>
          </div>
        </div>
      </div>

      {/* Subject Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {subjects.map((sub) => {
          const Icon = sub.icon;
          const isSelected = selectedSubject === sub.id;
          const subjectChapterCount = chapters.filter((c) => c.subjectId === sub.id).length;
          const masteredCount = chapters.filter((c) => c.subjectId === sub.id && c.status === "MASTERED").length;

          return (
            <button
              key={sub.id}
              onClick={() => setSelectedSubject(sub.id)}
              className={`p-4 rounded-xl border text-left transition-all ${
                isSelected
                  ? "bg-slate-800/90 border-indigo-500/60 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500/30"
                  : "bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/50 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2.5 rounded-lg bg-gradient-to-tr ${sub.color} text-white shadow-md`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-slate-400">
                  {masteredCount}/{subjectChapterCount} Mastered
                </span>
              </div>
              <h3 className="font-semibold text-sm text-slate-100">{sub.name}</h3>
              <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2 overflow-hidden">
                <div
                  className="bg-indigo-500 h-full rounded-full transition-all"
                  style={{ width: `${subjectChapterCount ? (masteredCount / subjectChapterCount) * 100 : 0}%` }}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Chapter Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredChapters.map((chapter) => (
          <div
            key={chapter.id}
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/90 hover:border-slate-700 transition-all space-y-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-indigo-400 border border-slate-700">
                    Class {chapter.classLevel}
                  </span>
                  {getWeightageBadge(chapter.weightage)}
                </div>
                <h3 className="font-bold text-base text-slate-100 mt-1">{chapter.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{chapter.ncertChapter}</p>
              </div>

              {getStatusBadge(chapter.status)}
            </div>

            {/* Key Concepts Preview */}
            <div className="space-y-1.5 pt-2 border-t border-slate-800/60">
              <p className="text-xs font-semibold text-slate-300">High-Yield Concepts:</p>
              <ul className="space-y-1">
                {chapter.keyConcepts.slice(0, 3).map((concept, idx) => (
                  <li key={idx} className="text-xs text-slate-400 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                    <span className="truncate">{concept}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800/60">
              {/* Status Select */}
              <select
                value={chapter.status}
                onChange={(e) => onUpdateChapterStatus(chapter.id, e.target.value as StudyStatus)}
                className="bg-slate-950 text-slate-300 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs outline-none focus:border-indigo-500"
              >
                <option value="NOT_STARTED">Not Started</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="REVISED">Revised</option>
                <option value="MASTERED">Mastered</option>
              </select>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenAiForTopic(chapter.name, selectedSubject)}
                  className="px-3 py-1.5 rounded-lg bg-indigo-950/80 hover:bg-indigo-900/80 text-indigo-300 border border-indigo-800/50 text-xs font-medium flex items-center gap-1.5 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span>AI Notes</span>
                </button>

                <button
                  onClick={() => setActiveChapter(chapter)}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1 transition-all"
                >
                  <span>Explore</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chapter Detail Modal */}
      {activeChapter && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider">
                  {activeChapter.ncertChapter}
                </span>
                <h2 className="text-xl font-bold text-slate-100">{activeChapter.name}</h2>
              </div>
              <button
                onClick={() => setActiveChapter(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            {/* Revision Notes Summary */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <span>Chapter Summary & Exam Hacks</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">{activeChapter.summaryNotes}</p>
            </div>

            {/* Key Concepts List */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Must-Know Topics & Formulas</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeChapter.keyConcepts.map((kc, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60 text-xs text-slate-200 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>{kc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => {
                  setActiveChapter(null);
                  onOpenAiForTopic(activeChapter.name, activeChapter.subjectId);
                }}
                className="px-4 py-2 rounded-xl bg-indigo-950 text-indigo-300 border border-indigo-700/50 text-xs font-medium flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>Ask AI Tutor for Detailed Notes</span>
              </button>

              <button
                onClick={() => {
                  const chId = activeChapter.id;
                  setActiveChapter(null);
                  onSelectChapterForPractice(chId);
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold text-xs flex items-center gap-2 shadow-md shadow-emerald-600/20"
              >
                <span>Practice Chapter Questions</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
