import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/lib/auth/getUser";
import connectDB from "@/lib/mongodb";
import Skill from "@/lib/models/Skill";
import User from "@/lib/models/User";
import { calculateSkillDecay } from "@/lib/skill-decay";

export async function POST(request: NextRequest) {
  try {
    const session = await getUser();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const user = await User.findOne({ email: session.user.email });

    // get id from URL
    const { pathname } = request.nextUrl;
    const segments = pathname.split("/");
    const skillId = segments[segments.length - 2];

    const skill = await Skill.findOne({
      _id: skillId,
      userId: user._id,
    });

    if (!skill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    const proficiencyBefore = calculateSkillDecay(
      skill.initialProficiency,
      skill.decayRate,
      skill.lastPracticed
    );

    const proficiencyAfter = skill.initialProficiency;

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
