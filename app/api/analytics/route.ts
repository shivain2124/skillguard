import { NextResponse } from "next/server";
import { getUser } from "@/lib/auth/getUser";
import connectDB from "@/lib/mongodb";
import Skill from "@/lib/models/Skill";
import User from "@/lib/models/User";
import { calculateSkillDecay, getHealthStatus } from "@/lib/skill-decay";

export async function GET() {
  try {
    const session = await getUser();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const skills = await Skill.find({ userId: user._id });

    const analytics: AnalyticsData = {
      totalSkills: skills.length,
      healthDistribution: { healthy: 0, declining: 0, critical: 0 },
      categoryDistribution: {
        Programming: 0,
        Language: 0,
        Physical: 0,
        Creative: 0,
      },
      averageProficiency: 0,
      skillsNeedingAttention: [],
      recentPracticeActivity: [],
    };

    let totalProficiency = 0;

    skills.forEach((skill) => {
      const currentProficiency = calculateSkillDecay(
        skill.initialProficiency,
        skill.decayRate,
        skill.lastPracticed
      );

      const healthStatus = getHealthStatus(
        currentProficiency,
        skill.initialProficiency
      );

      // Health distribution
      analytics.healthDistribution[
        healthStatus.status as keyof typeof analytics.healthDistribution
      ]++;

      // Category distribution
      analytics.categoryDistribution[
        skill.category as keyof typeof analytics.categoryDistribution
      ]++;

      // Average proficiency
      totalProficiency += currentProficiency;

      // Skills needing attention (critical or declining)
      if (healthStatus.status !== "healthy") {
        analytics.skillsNeedingAttention.push({
          name: skill.name,
          category: skill.category,
          currentProficiency: Math.round(currentProficiency * 10) / 10,
          healthStatus: healthStatus.status,
          daysSinceLastPractice: Math.floor(
            (Date.now() - new Date(skill.lastPracticed).getTime()) /
              (1000 * 60 * 60 * 24)
          ),
        });
      }

      // Recent practice activity (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      interface Practice {
        date: Date | string;
        proficiencyBefore: number;
        proficiencyAfter: number;
      }

      const recentPractices: Practice[] = skill.practiceHistory.filter(
        (practice: Practice) => new Date(practice.date) >= thirtyDaysAgo
      );

      recentPractices.forEach((practice) => {
        analytics.recentPracticeActivity.push({
          skillName: skill.name,
          category: skill.category,
          date: (typeof practice.date === "string"
            ? new Date(practice.date)
            : practice.date
          ).toISOString(),
          proficiencyGain:
            practice.proficiencyAfter - practice.proficiencyBefore,
        });
      });
    });

    analytics.averageProficiency =
      skills.length > 0
        ? Math.round((totalProficiency / skills.length) * 10) / 10
        : 0;

    // Sort recent activity by date
    analytics.recentPracticeActivity.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return NextResponse.json(analytics);
  } catch (error) {
    console.error("Analytics API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

type SkillNeedingAttention = {
  name: string;
  category: string;
  currentProficiency: number;
  healthStatus: string;
  daysSinceLastPractice: number;
};

type PracticeActivity = {
  skillName: string;
  category: string;
  date: string;
  proficiencyGain: number;
};

type AnalyticsData = {
  totalSkills: number;
  healthDistribution: { healthy: number; declining: number; critical: number };
  categoryDistribution: {
    Programming: number;
    Language: number;
    Physical: number;
    Creative: number;
  };
  averageProficiency: number;
  skillsNeedingAttention: SkillNeedingAttention[];
  recentPracticeActivity: PracticeActivity[];
};
