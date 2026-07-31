export type TargetExam = "NEET" | "JEE_MAIN" | "JEE_ADVANCED";

export type SubjectId = "physics" | "chemistry" | "biology" | "mathematics";

export type ChapterWeightage = "HIGH" | "MEDIUM" | "STANDARD";

export type StudyStatus = "NOT_STARTED" | "IN_PROGRESS" | "REVISED" | "MASTERED";

export interface Chapter {
  id: string;
  name: string;
  subjectId: SubjectId;
  classLevel: 11 | 12;
  weightage: ChapterWeightage;
  ncertChapter: string;
  keyConcepts: string[];
  summaryNotes: string;
  questionCount: number;
  status: StudyStatus;
}

export interface Question {
  id: string;
  subjectId: SubjectId;
  chapterId: string;
  exam: TargetExam[];
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  ncertReference?: string;
  difficulty: "EASY" | "MEDIUM" | "HARD" | "ADVANCED";
  isPYQ?: boolean;
  pyqYear?: number;
}

export interface Formula {
  id: string;
  subjectId: SubjectId;
  chapterId: string;
  title: string;
  formula: string;
  variables: { symbol: string; meaning: string; unit?: string }[];
  keyTrick?: string;
  isFavorite?: boolean;
}

export interface TestResult {
  id: string;
  date: string;
  examType: TargetExam | "CHAPTER_QUIZ";
  title: string;
  score: number;
  maxScore: number;
  totalQuestions: number;
  correct: number;
  incorrect: number;
  unattempted: number;
  accuracy: number; // percentage
  timeSpentSeconds: number;
  subjectScores: Record<SubjectId, { score: number; max: number }>;
}

export interface UserStats {
  totalQuestionsSolved: number;
  correctCount: number;
  streakDays: number;
  studyHoursTotal: number;
  savedQuestions: string[]; // Question IDs
  starredFormulas: string[]; // Formula IDs
  chapterStatus: Record<string, StudyStatus>;
  testHistory: TestResult[];
}
