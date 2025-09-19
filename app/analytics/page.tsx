import { getUser } from "@/lib/auth/getUser";
import { redirect } from "next/navigation";
import Navbar from "@/app/_components/navbar/navbar";
import SmartChart from "@/app/_components/analytics/smart-chart";
import DecayCurve from "@/app/_components/analytics/decay-curve";
import connectDB from "@/lib/mongodb";
import Skill from "@/lib/models/Skill";
import User from "@/lib/models/User";

export default async function AnalyticsPage() {
  const session = await getUser();

  if (!session?.user) {
    redirect("/login");
  }

  await connectDB();
  const user = await User.findOne({ email: session.user.email });

  if (!user) {
    return <div>User not found</div>;
  }

  const skillsFromDB = await Skill.find({ userId: user._id }).limit(5);

  const skills = skillsFromDB.map((skill) => ({
    _id: skill._id.toString(),
    name: skill.name,
    category: skill.category,
    initialProficiency: skill.initialProficiency,
    lastPracticed: skill.lastPracticed.toISOString(),
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={session.user} />

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Analytics Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Insights into your skill development and practice patterns
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <SmartChart
              title="Skill Health Distribution"
              type="pie"
              dataKey="healthDistribution"
            />

            <SmartChart
              title="Skills by Category"
              type="bar"
              dataKey="categoryDistribution"
            />
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Skill Decay Analysis
            </h2>
            <div className="grid gap-6">
              {skills.map((skill) => (
                <DecayCurve key={skill._id} skill={skill} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
