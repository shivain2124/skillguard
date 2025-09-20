import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/lib/auth/getUser";
import connectDB from "@/lib/mongodb";
import Skill from "@/lib/models/Skill";
import User from "@/lib/models/User";

// PUT /api/skills/[id]
export async function PUT(request: NextRequest) {
  try {
    const session = await getUser();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const updates = await request.json();

    await connectDB();
    const user = await User.findOne({ email: session.user.email });

    // extract id from URL
    const { pathname } = request.nextUrl;
    const segments = pathname.split("/");
    const skillId = segments[segments.length - 1]; // last segment is [id]

    const skill = await Skill.findOneAndUpdate(
      { _id: skillId, userId: user._id },
      updates,
      { new: true }
    );

    if (!skill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    return NextResponse.json(skill);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/skills/[id]
export async function DELETE(request: NextRequest) {
  try {
    const session = await getUser();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const user = await User.findOne({ email: session.user.email });

    // extract id from URL
    const { pathname } = request.nextUrl;
    const segments = pathname.split("/");
    const skillId = segments[segments.length - 1];

    const skill = await Skill.findOneAndDelete({
      _id: skillId,
      userId: user._id,
    });

    if (!skill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Skill deleted successfully",
      deletedSkill: skill.name,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
