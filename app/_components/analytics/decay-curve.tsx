"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { calculateSkillDecay } from "@/lib/skill-decay";

const generateData = (skill: DecayCurveProps["skill"]) => {
  const data = [];
  const decayRate =
    DECAY_RATES[skill.category as keyof typeof DECAY_RATES] || 0.05;
  const lastPracticed = new Date(skill.lastPracticed);

  for (let i = 0; i <= 30; i++) {
    const futureDate = new Date(Date.now() + i * 24 * 60 * 60 * 1000);
    const daysSince = Math.floor(
      (futureDate.getTime() - lastPracticed.getTime()) / (1000 * 60 * 60 * 24)
    );
    const proficiency =
      skill.initialProficiency * Math.exp(-decayRate * daysSince);

    data.push({
      day: i,
      proficiency: Math.max(0, proficiency),
    });
  }

  return data;
};

export default function DecayCurve({ skill }: DecayCurveProps) {
  const data = generateData(skill);
  const current = calculateSkillDecay(
    skill.initialProficiency,
    DECAY_RATES[skill.category as keyof typeof DECAY_RATES] || 0.05,
    new Date(skill.lastPracticed)
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{skill.name}</h3>
      <p className="text-sm text-gray-500 mb-4">
        Current: {current.toFixed(1)}/10
      </p>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis dataKey="day" tick={{ fontSize: 12 }} />
          <YAxis domain={[0, 10]} tick={{ fontSize: 12 }} />
          <Tooltip
            formatter={(value: number) => [
              `${value.toFixed(1)}/10`,
              "Proficiency",
            ]}
          />
          <Line
            type="monotone"
            dataKey="proficiency"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

interface DecayCurveProps {
  skill: {
    name: string;
    category: string;
    initialProficiency: number;
    lastPracticed: string;
  };
}

const DECAY_RATES = {
  Programming: 0.03,
  Language: 0.05,
  Physical: 0.08,
  Creative: 0.06,
};
