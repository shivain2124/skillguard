export function calculateSkillDecay(
  initialProficiency: number,
  decayRate: number,
  lastPracticed: Date
): number {
  const daysSinceLastPractice = Math.floor(
    (Date.now() - new Date(lastPracticed).getTime()) / (1000 * 60 * 60 * 24)
  );
  
  const decayedProficiency = initialProficiency * 
    Math.exp(-decayRate * daysSinceLastPractice);
    
  return Math.max(Math.round(decayedProficiency * 100) / 100, 0);
}
