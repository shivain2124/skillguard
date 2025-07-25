import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDB from "@/lib/mongodb";
import Skill from "@/lib/models/Skill";
import User from "@/lib/models/User";
import { calculateSkillDecay } from "@/lib/skill-decay";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const user = await User.findOne({ email: session.user.email });

    const skill = await Skill.findOne({
      _id: params.id,
      userId: user._id,
    });

    if (!skill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    // Calculate current proficiency before practice
    const proficiencyBefore = calculateSkillDecay(
      skill.initialProficiency,
      skill.decayRate,
      skill.lastPracticed
    );

    // Reset to initial proficiency after practice
    const proficiencyAfter = skill.initialProficiency;

    // Update skill
    skill.lastPracticed = new Date();
    skill.currentProficiency = proficiencyAfter;
    skill.practiceHistory.push({
      date: new Date(),
      proficiencyBefore,
      proficiencyAfter,
    });

    await skill.save();
    return NextResponse.json({
      ...skill.toObject(),
      practiceGain: proficiencyAfter - proficiencyBefore,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
