import React, { useState, useEffect } from "react";
import { 
  TargetExam, 
  Chapter, 
  Question, 
  Formula, 
  UserStats, 
  StudyStatus, 
  TestResult 
} from "./types";
import { CHAPTERS, MOCK_QUESTIONS, MOCK_FORMULAS } from "./data/mockData";
import { Navbar } from "./components/Navbar";
import { SubjectExplorer } from "./components/SubjectExplorer";
import { InteractiveSimulations } from "./components/InteractiveSimulations";
import { PracticeBank } from "./components/PracticeBank";
import { AITutorModal } from "./components/AITutorModal";
import { MockTestEngine } from "./components/MockTestEngine";
import { FormulaDeck } from "./components/FormulaDeck";
import { StudyPlanner } from "./components/StudyPlanner";

export default function App() {
  const [activeExam, setActiveExam] = useState<TargetExam>("NEET");
  const [activeTab, setActiveTab] = useState<string>("subject_explorer");

  // Local storage persisted state
  const [chapters, setChapters] = useState<Chapter[]>(() => {
    const saved = localStorage.getItem("neet_jee_chapters");
    return saved ? JSON.parse(saved) : CHAPTERS;
  });

  const [questions, setQuestions] = useState<Question[]>(() => {
    const saved = localStorage.getItem("neet_jee_questions");
    return saved ? JSON.parse(saved) : MOCK_QUESTIONS;
  });

  const [formulas, setFormulas] = useState<Formula[]>(() => {
    const saved = localStorage.getItem("neet_jee_formulas");
    return saved ? JSON.parse(saved) : MOCK_FORMULAS;
  });

  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem("neet_jee_stats");
    return saved
      ? JSON.parse(saved)
      : {
          totalQuestionsSolved: 12,
          correctCount: 9,
          streakDays: 7,
          studyHoursTotal: 18,
          savedQuestions: ["q-phy-1"],
          starredFormulas: ["f-1"],
          chapterStatus: {},
          testHistory: [],
        };
  });

  // AI Tutor Modal
  const [isAiTutorOpen, setIsAiTutorOpen] = useState<boolean>(false);
  const [aiTutorQuery, setAiTutorQuery] = useState<string>("");
  const [aiTutorSubject, setAiTutorSubject] = useState<string>("Physics");

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem("neet_jee_chapters", JSON.stringify(chapters));
  }, [chapters]);

  useEffect(() => {
    localStorage.setItem("neet_jee_questions", JSON.stringify(questions));
  }, [questions]);

  useEffect(() => {
    localStorage.setItem("neet_jee_formulas", JSON.stringify(formulas));
  }, [formulas]);

  useEffect(() => {
    localStorage.setItem("neet_jee_stats", JSON.stringify(stats));
  }, [stats]);

  // Handlers
  const handleUpdateChapterStatus = (chapterId: string, status: StudyStatus) => {
    setChapters((prev) =>
      prev.map((c) => (c.id === chapterId ? { ...c, status } : c))
    );
  };

  const handleToggleBookmarkQuestion = (qId: string) => {
    setStats((prev) => {
      const exists = prev.savedQuestions.includes(qId);
      const newSaved = exists
        ? prev.savedQuestions.filter((id) => id !== qId)
        : [...prev.savedQuestions, qId];
      return { ...prev, savedQuestions: newSaved };
    });
  };

  const handleToggleStarFormula = (fId: string) => {
    setStats((prev) => {
      const exists = prev.starredFormulas.includes(fId);
      const newStarred = exists
        ? prev.starredFormulas.filter((id) => id !== fId)
        : [...prev.starredFormulas, fId];
      return { ...prev, starredFormulas: newStarred };
    });
  };

  const handleSaveTestResult = (result: TestResult) => {
    setStats((prev) => ({
      ...prev,
      totalQuestionsSolved: prev.totalQuestionsSolved + result.totalQuestions,
      correctCount: prev.correctCount + result.correct,
      testHistory: [result, ...prev.testHistory],
    }));
  };

  const handleOpenAiForTopic = (topicName: string, subjectName: string) => {
    setAiTutorSubject(subjectName);
    setAiTutorQuery(`Explain the key concepts, core formulas, NCERT highlights, and NEET/JEE exam traps for: ${topicName}`);
    setIsAiTutorOpen(true);
  };

  const handleGenerateAiQuestions = async (subject: string, chapter: string) => {
    const res = await fetch("/api/gemini/generate-questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subject,
        chapter,
        exam: activeExam,
        count: 3,
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to generate AI questions");

    const newQs: Question[] = (data.questions || []).map((q: any) => ({
      ...q,
      subjectId: subject.toLowerCase() as any,
      chapterId: "custom-ai",
      exam: [activeExam],
      difficulty: "MEDIUM" as const,
    }));

    setQuestions((prev) => [...newQs, ...prev]);
    return newQs;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-indigo-500 selection:text-white">
      
      {/* Navbar */}
      <Navbar
        activeExam={activeExam}
        onExamChange={setActiveExam}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        streakDays={stats.streakDays}
        onOpenAiTutor={() => {
          setAiTutorQuery("");
          setIsAiTutorOpen(true);
        }}
      />

      {/* Main Workspace Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === "subject_explorer" && (
          <SubjectExplorer
            chapters={chapters}
            activeExam={activeExam}
            onUpdateChapterStatus={handleUpdateChapterStatus}
            onSelectChapterForPractice={(chId) => {
              setActiveTab("practice");
            }}
            onOpenAiForTopic={handleOpenAiForTopic}
          />
        )}

        {activeTab === "simulations" && <InteractiveSimulations />}

        {activeTab === "practice" && (
          <PracticeBank
            questions={questions}
            activeExam={activeExam}
            savedQuestions={stats.savedQuestions}
            onToggleBookmark={handleToggleBookmarkQuestion}
            onGenerateAiQuestions={handleGenerateAiQuestions}
          />
        )}

        {activeTab === "mock_test" && (
          <MockTestEngine
            questions={questions}
            activeExam={activeExam}
            onSaveTestResult={handleSaveTestResult}
          />
        )}

        {activeTab === "formulas" && (
          <FormulaDeck
            formulas={formulas}
            starredFormulas={stats.starredFormulas}
            onToggleStarFormula={handleToggleStarFormula}
          />
        )}

        {activeTab === "planner" && (
          <StudyPlanner
            activeExam={activeExam}
            stats={stats}
            chapters={chapters}
          />
        )}
      </main>

      {/* AI Tutor Modal */}
      <AITutorModal
        isOpen={isAiTutorOpen}
        onClose={() => setIsAiTutorOpen(false)}
        activeExam={activeExam}
        initialQuery={aiTutorQuery}
        initialSubject={aiTutorSubject}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <p>NEET & JEE Study Companion • Powered by Gemini 3.6 Flash & NCERT Syllabus Standards</p>
      </footer>
    </div>
  );
}
