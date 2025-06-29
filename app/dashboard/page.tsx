import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Navbar from "@/app/_components/navbar/navbar";
import SkillsDashboard from "@/app/_components/skills/skill-dashboard";
import SmartChart from "@/app/_components/analytics/smart-chart";

export default async function Dashboard() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={session.user} />
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
