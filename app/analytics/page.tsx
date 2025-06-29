import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Navbar from "@/app/_components/navbar/navbar";
import SmartChart from "@/app/_components/analytics/smart-chart";

export default async function AnalyticsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

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
        </div>
      </div>
    </div>
  );
}
