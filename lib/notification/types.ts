interface PracticeSession {
  date: Date;
  proficiencyBefore: number;
  proficiencyAfter: number;
}

interface Skill {
  _id: string;
  userId: string;
  name: string;
  category: string;
  initialProficiency: number;
  currentProficiency: number;
  lastPracticed: Date;
  decayRate: number;
  totalPracticeSessions: number;
  practiceHistory: PracticeSession[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  healthStatus?: {
    status: string;
    color: string;
    emoji: string;
    percentage: number;
    message: string;
  };
}

interface AlertMessage {
  skillId: string;
  skillName: string;
  message: string;
  daysSinceLastPractice: number;
}

export type { PracticeSession, Skill, AlertMessage };
