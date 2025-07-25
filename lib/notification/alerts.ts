import {
  calculateSkillDecay,
  getDaysSinceLastPractice,
} from "@/lib/skill-decay";
import { Skill } from "./types";

export function getCriticalSkills(skills: Skill[]): Skill[] {
  return skills.filter((skill) => {
    const currentProficiency = calculateSkillDecay(
      skill.initialProficiency,
      skill.decayRate,
      skill.lastPracticed
    );

    const proficiencyLoss =
      (skill.initialProficiency - currentProficiency) /
      skill.initialProficiency;
    const daysSinceLastPractice = getDaysSinceLastPractice(skill.lastPracticed);

    return proficiencyLoss > 0.3 || daysSinceLastPractice > 14;
  });
}

export function generateAlertMessage(skill: Skill): string {
  const daysSinceLastPractice = getDaysSinceLastPractice(skill.lastPracticed);

  return `Your ${skill.name} skill is critical!
    ${daysSinceLastPractice} days without practice. Practice now or risk losing it.`;
}
