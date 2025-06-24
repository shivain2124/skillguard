export function calculateSkillDecay(
  initialProficiency: number,
  decayRate: number,
  lastPracticed: Date
): number {
  const daysSinceLastPractice = Math.floor(
    (Date.now() - new Date(lastPracticed).getTime()) / (1000 * 60 * 60 * 24)
  );

  const decayedProficiency =
    initialProficiency * Math.exp(-decayRate * daysSinceLastPractice);

  return Math.max(Math.round(decayedProficiency * 100) / 100, 0);
}

export function getHealthStatus(current: number, initial: number) {
  const percentage = Math.round((current / initial) * 100);

  if (percentage > 70) {
    return {
      status: "healthy",
      color: "healthy",
      emoji: "🟢",
      percentage,
      message: "Skill is in good shape!",
    };
  }
  if (percentage > 40) {
    return {
      status: "declining",
      color: "declining",
      emoji: "🟡",
      percentage,
      message: "Consider practicing soon",
    };
  }
  return {
    status: "critical",
    color: "critical",
    emoji: "🔴",
    percentage,
    message: "Urgent practice needed!",
  };
}
