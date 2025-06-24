"use client";

interface Skill {
  _id: string;
  name: string;
  category: string;
  initialProficiency: number;
  currentProficiency: number;
  lastPracticed: string;
  healthStatus?: {
    status: "healthy" | "declining" | "critical";
    percentage: number;
    emoji: string;
    message: string;
  };
}

interface SkillCardProps {
  skill: Skill;
  onUpdate: () => void;
}

export default function SkillCard({ skill, onUpdate }: SkillCardProps) {
  const handlePractice = async () => {
    try {
      const response = await fetch(`/api/skills/${skill._id}/practice`, {
        method: "POST",
      });

      if (response.ok) {
        onUpdate();
      }
    } catch (error) {
      console.error("Error practicing skill:", error);
    }
  };

  const getHealthColor = (status?: string) => {
    switch (status) {
      case "healthy":
        return "bg-healthy";
      case "declining":
        return "bg-declining";
      case "critical":
        return "bg-critical";
      default:
        return "bg-gray-500";
    }
  };

  const proficiencyPercentage =
    (skill.currentProficiency / skill.initialProficiency) * 100;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{skill.name}</h3>
          <p className="text-sm text-gray-600">{skill.category}</p>
        </div>
        <div
          className={`px-2 py-1 rounded-full text-xs text-white ${getHealthColor(
            skill.healthStatus?.status
          )}`}
        >
          {skill.healthStatus?.emoji} {Math.round(proficiencyPercentage)}%
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Proficiency</span>
          <span>
            {skill.currentProficiency.toFixed(1)}/{skill.initialProficiency}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${getHealthColor(
              skill.healthStatus?.status
            )}`}
            style={{ width: `${Math.min(proficiencyPercentage, 100)}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-xs text-gray-500">
          Last practiced: {new Date(skill.lastPracticed).toLocaleDateString()}
        </p>
        {skill.healthStatus?.message && (
          <p className="text-xs text-gray-600 mt-1">
            {skill.healthStatus.message}
          </p>
        )}
      </div>

      <button
        onClick={handlePractice}
        className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/80 transition-colors"
      >
        Mark as Practiced
      </button>
    </div>
  );
}
