import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Navbar from "@/app/_components/navbar/navbar";
import SkillsDashboard from "@/app/_components/skills/skill-dashboard";

export default async function Dashboard() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={session.user} />
      <SkillsDashboard />
    </div>
  );
}
