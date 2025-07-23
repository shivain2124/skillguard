import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDB from "@/lib/mongodb";
import Skill from "@/lib/models/Skill";
import User from "@/lib/models/User";
import { PipelineStage, Types } from "mongoose";

async function GET(request: NextRequest) {
  try {
    // auth
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // database connection
    await connectDB();
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // get search params
    const searchParams = request.nextUrl.searchParams;
    const searchTerm = searchParams.get("q") || "";
    const category = searchParams.get("category") || "";

    // build aggregation pipeline
    const pipeline = buildSearchPipeline(user._id, searchTerm, category);

    // execute aggregation
    const skills = await Skill.aggregate(pipeline);

    return NextResponse.json({
      success: true,
      skills: skills,
      count: skills.length,
      filters: {
        searchTerm: searchTerm || null,
        category: category || null,
      },
    });
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}

function buildSearchPipeline(
  userId: Types.ObjectId,
  searchTerm: string,
  category: string
): PipelineStage[] {
  const pipeline: PipelineStage[] = [];

  // Stage 1: Filter by user
  pipeline.push({
    $match: {
      userId: userId,
    },
  });

  // Stage 2: Text search (conditional)
  if (searchTerm.trim()) {
    pipeline.push({
      $match: {
        name: {
          $regex: searchTerm.trim(),
          $options: "i",
        },
      },
    });
  }

  // Stage 3: Category filter (conditional)
  if (category.trim()) {
    pipeline.push({
      $match: {
        category: category.trim(),
      },
    });
  }

  // Stage 4: Sort by name
  pipeline.push({
    $sort: {
      name: 1,
    },
  });

  return pipeline;
}

export { GET };
