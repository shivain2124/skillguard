import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Navbar from "@/app/_components/navbar/navbar";

export default async function Dashboard() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={session.user} />

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Your Skills Dashboard
              </h2>
              <p className="text-gray-600 mb-6">
                Start tracking your skills and monitor their decay over time
              </p>
              <button className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700">
                Add Your First Skill
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
