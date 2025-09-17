// import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Navbar from "@/app/_components/navbar/navbar";
import SkillsDashboard from "@/app/_components/skills/skill-dashboard";
import SmartChart from "@/app/_components/analytics/smart-chart";
import { AlertBanner } from "@/lib/notification/AlertBanner";
import Skill from "@/lib/models/Skill";
import User from "@/lib/models/User";
import connectDB from "@/lib/mongodb";
import { cookies } from "next/headers";

export default async function Dashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  console.log("Token:", token);

  if (!token) {
    redirect("/login");
  }
  // const session = await auth();

  // if (!session?.user) {
  //   redirect("/login");
  // }

  // const skills = await getUserSkills(session.user.email!);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Navbar user={session.user} />
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
      /> */}
    </div>
  );
}
