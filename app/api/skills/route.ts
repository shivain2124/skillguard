import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDB from "@/lib/mongodb";
import Skill from "@/lib/models/Skill";
import { calculateSkillDecay, getHealthStatus } from "@/lib/skill-decay";
import User from "@/lib/models/User";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const skills = await Skill.find({ userId: user._id });

    const skillsWithDecay = skills.map((skill) => {
      const currentProficiency = calculateSkillDecay(
        skill.initialProficiency,
        skill.decayRate,
        skill.lastPracticed
      );

      const healthStatus = getHealthStatus(
        currentProficiency,
        skill.initialProficiency
      );

      return {
        ...skill.toObject(),
        currentProficiency,
        healthStatus,
      };
    });

    return NextResponse.json(skillsWithDecay);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, category, initialProficiency } = await request.json();

    if (!name || !category || !initialProficiency) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectDB();
    const user = await User.findOne({ email: session.user.email });

    const decayRates = {
      Programming: 0.03,
      Language: 0.05,
      Physical: 0.08,
      Creative: 0.06,
    };

    const skill = new Skill({
      userId: user._id,
      name: name.trim(),
      category,
      initialProficiency,
      currentProficiency: initialProficiency,
      decayRate: decayRates[category as keyof typeof decayRates] || 0.05,
      lastPracticed: new Date(),
    });

    console.log("Category:", category);
    console.log(
      "Decay rate for category:",
      decayRates[category as keyof typeof decayRates]
    );

    await skill.save();
    return NextResponse.json(skill);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
