import React, { useState } from "react";
import { TargetExam, UserStats, Chapter } from "../types";
import { 
  Calendar, 
  Sparkles, 
  CheckSquare, 
  Clock, 
  Award, 
  TrendingUp, 
  Flame, 
  Target, 
  Send,
  Loader2,
  CheckCircle2
} from "lucide-react";

interface StudyPlannerProps {
  activeExam: TargetExam;
  stats: UserStats;
  chapters: Chapter[];
}

export const StudyPlanner: React.FC<StudyPlannerProps> = ({
  activeExam,
  stats,
  chapters,
}) => {
  const [daysRemaining, setDaysRemaining] = useState<number>(120);
  const [dailyHours, setDailyHours] = useState<number>(8);
  const [weakTopics, setWeakTopics] = useState<string>("Rotational Mechanics, Organic Mechanisms, Integration");
  const [generatedPlan, setGeneratedPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Daily Tasks
  const [tasks, setTasks] = useState<{ id: string; text: string; done: boolean }[]>([
    { id: "1", text: "Solve 25 Physics Kinematics & Mechanics MCQs", done: true },
    { id: "2", text: "Revise Organic Reaction Mechanisms & Inductive Effect", done: false },
    { id: "3", text: "Memorize p-Block Group 15 NCERT Lines & Trends", done: false },
    { id: "4", text: "Attempt 15-Min Speed Mock Test", done: false },
  ]);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const handleGeneratePlan = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/gemini/study-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetExam: activeExam,
          daysLeft: daysRemaining,
          dailyHours,
          weakTopics,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate plan");

      setGeneratedPlan(data.plan);
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const totalChapters = chapters.length;
  const masteredCount = chapters.filter((c) => c.status === "MASTERED").length;
  const masteryPercentage = totalChapters ? Math.round((masteredCount / totalChapters) * 100) : 0;

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 border border-rose-900/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/20 text-xs font-medium mb-2">
            <Calendar className="w-3.5 h-3.5 text-rose-400" />
            <span>Target Exam Strategy & Timetable</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-100">{activeExam.replace("_", " ")} Prep Command Center</h1>
          <p className="text-sm text-slate-400 max-w-2xl mt-1">
            Track daily study checklists, target countdowns, and generate personalized AI timetables.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-950/80 p-3 rounded-xl border border-slate-800 font-mono text-xs">
          <Target className="w-5 h-5 text-rose-400" />
          <div>
            <div className="text-slate-400">Target Countdown</div>
            <div className="text-lg font-bold text-slate-100">{daysRemaining} Days Left</div>
          </div>
        </div>
      </div>

      {/* Analytics Progress Bar Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-slate-400">Syllabus Mastery</span>
          <div className="text-xl font-bold text-rose-400">{masteryPercentage}%</div>
          <div className="text-[10px] text-slate-500">{masteredCount} of {totalChapters} Chapters Mastered</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-slate-400">Questions Solved</span>
          <div className="text-xl font-bold text-indigo-400">{stats.totalQuestionsSolved}</div>
          <div className="text-[10px] text-slate-500">Practice & PYQs combined</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-slate-400">Study Streak</span>
          <div className="text-xl font-bold text-amber-400 flex items-center gap-1">
            <Flame className="w-4 h-4 fill-amber-400" />
            <span>{stats.streakDays} Days</span>
          </div>
          <div className="text-[10px] text-slate-500">Keep up the daily momentum</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-slate-400">Tests Attempted</span>
          <div className="text-xl font-bold text-emerald-400">{stats.testHistory.length}</div>
          <div className="text-[10px] text-slate-500">NTA Mock Tests Completed</div>
        </div>
      </div>

      {/* Main Grid: Tasks & AI Strategy Generator */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Daily Tasks */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-base text-slate-100 flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-indigo-400" />
              <span>Today's High-Priority Tasks</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              {tasks.filter((t) => t.done).length}/{tasks.length} Completed
            </span>
          </div>

          <div className="space-y-2.5">
            {tasks.map((task) => (
              <button
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`w-full p-3.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between gap-3 ${
                  task.done
                    ? "bg-emerald-950/30 border-emerald-800/40 text-emerald-300 line-through opacity-80"
                    : "bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700"
                }`}
              >
                <span>{task.text}</span>
                <CheckCircle2
                  className={`w-4 h-4 flex-shrink-0 ${
                    task.done ? "text-emerald-400 fill-emerald-500/20" : "text-slate-600"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* AI Schedule Generator */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-base text-slate-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-rose-400" />
              <span>AI Custom Strategy Generator</span>
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-slate-300 font-medium block mb-1">Days Remaining to Exam:</label>
              <input
                type="number"
                value={daysRemaining}
                onChange={(e) => setDaysRemaining(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100 outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="text-slate-300 font-medium block mb-1">Daily Study Hours Available:</label>
              <input
                type="number"
                value={dailyHours}
                onChange={(e) => setDailyHours(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100 outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="text-slate-300 font-medium block mb-1">Current Weak Topics / Chapters:</label>
              <input
                type="text"
                value={weakTopics}
                onChange={(e) => setWeakTopics(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100 outline-none focus:border-rose-500"
              />
            </div>

            <button
              onClick={handleGeneratePlan}
              disabled={isLoading}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-rose-600/20 hover:brightness-110 disabled:opacity-50 transition-all"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Drafting Personalized Strategy...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Generate AI Timetable</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>

      {/* Generated Strategy View */}
      {generatedPlan && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-rose-900/50 space-y-3">
          <h3 className="font-bold text-base text-rose-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>AI Revision Strategy & Study Plan</span>
          </h3>

          <div className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line font-sans p-4 rounded-xl bg-slate-950 border border-slate-800">
            {generatedPlan}
          </div>
        </div>
      )}

    </div>
  );
};
