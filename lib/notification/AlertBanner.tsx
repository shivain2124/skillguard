"use client";

import { useState } from "react";
import { X } from "lucide-react";
import {
  getCriticalSkills,
  generateAlertMessage,
} from "@/lib/notification/alerts";
import { Skill } from "@/lib/notification/types";

export function AlertBanner({ skills }: { skills: Skill[] }) {
  const [dismissed, setDismissed] = useState(false);
  const criticalSkills = getCriticalSkills(skills);

  if (criticalSkills.length === 0 || dismissed) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-red-800 font-semibold mb-2 text-center">
            ⚠️ Critical Skills Alert
          </h3>
          {criticalSkills.map((skill) => (
            <div
              key={skill._id}
              className="text-red-700 text-sm mb-1 text-center"
            >
              {generateAlertMessage(skill)}
            </div>
          ))}
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-red-400 hover:text-red-600 ml-4 p-1"
          aria-label="Dismiss alert"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
