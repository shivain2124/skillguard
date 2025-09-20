import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import Navbar from "@/app/_components/navbar/navbar";
import SkillsDashboard from "@/app/_components/skills/skill-dashboard";
import SmartChart from "@/app/_components/analytics/smart-chart";
import { AlertBanner } from "@/lib/notification/AlertBanner";
import Skill from "@/lib/models/Skill";
import User from "@/lib/models/User";
import connectDB from "@/lib/mongodb";

async function getUserSkills(userEmail: string) {
  await connectDB();
  const dbUser = await User.findOne({ email: userEmail });
  if (!dbUser) return [];
  const skills = await Skill.find({ userId: dbUser._id });
  return JSON.parse(JSON.stringify(skills));
}

export default async function Dashboard() {
  const session = await auth0.getSession();
  if (!session?.user) redirect("/login");
  const { user } = session;
  const skills = await getUserSkills(user.email!);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} />
      <AlertBanner skills={skills} />
      <SkillsDashboard />
      <SmartChart
        title="Skill Health Distribution"
        type="pie"
        dataKey="healthDistribution"
      />
      <SmartChart
        title="Skill by Category"
        type="bar"
        dataKey="categoryDistribution"
      />
    </div>
  );
}
