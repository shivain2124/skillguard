import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDB from "@/lib/mongodb";
import Skill from "@/lib/models/Skill";
import { calculateSkillDecay } from "@/lib/skill-decay";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const skills = await Skill.find({ userId: session.user.id });
    
    // Calculate real-time decay for each skill
    const skillsWithDecay = skills.map(skill => ({
      ...skill.toObject(),
      currentProficiency: calculateSkillDecay(
        skill.initialProficiency,
        skill.decayRate,
        skill.lastPracticed
      )
    }));
    
    return NextResponse.json(skillsWithDecay);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
