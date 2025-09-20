"use client";

import { useState, useEffect } from "react";
import SkillCard from "./skill-card";
import AddSkillForm from "./add-skill";

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

export default function SkillsDashboard() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  // const fetchSkills = async () => {
  //   try {
  //     const response = await fetch("/api/skills");
  //     const data = await response.json();
  //     setSkills(data);
  //   } catch (error) {
  //     console.error("Error fetching skills:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const fetchSkills = async () => {
    try {
      const response = await fetch("/api/skills");
      const data = await response.json();

      // Add debugging
      console.log("API Response:", data);
      console.log("Response status:", response.status);
      console.log("Is array?", Array.isArray(data));

      // Only set skills if data is an array
      if (Array.isArray(data)) {
        setSkills(data);
      } else {
        console.error("Expected array but got:", typeof data);
        setSkills([]); // Fallback to empty array
      }
    } catch (error) {
      console.error("Error fetching skills:", error);
      setSkills([]); // Fallback to empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="text-center">Loading your skills...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Your Skills</h1>
            <p className="text-gray-600">
              Track and maintain your skill proficiency
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/80 transition-colors"
          >
            Add New Skill
          </button>
        </div>

        {skills.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              No skills yet
            </h2>
            <p className="text-gray-600 mb-6">
              Start tracking your skills and monitor their decay over time
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/80"
            >
              Add Your First Skill
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill) => (
              <SkillCard key={skill._id} skill={skill} onUpdate={fetchSkills} />
            ))}
          </div>
        )}

        {showAddForm && (
          <AddSkillForm
            onClose={() => setShowAddForm(false)}
            onSuccess={() => {
              setShowAddForm(false);
              fetchSkills();
            }}
          />
        )}
      </div>
    </div>
  );
}
