export function gradePercent(correct, total) {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
}

export function percentToLevel(pct) {
  if (pct <= 40) return "beginner";
  if (pct <= 55) return "pre-intermediate";
  if (pct <= 70) return "intermediate";
  if (pct <= 85) return "upper-intermediate";
  return "advanced";
}

export function recommendationsFromWrong(questions, answers) {
  const topicFails = {};
  questions.forEach(q => {
    const chosen = answers[q.id];
    const correct = q.answer;
    if (chosen === undefined) return;
    if (chosen !== correct) {
      (q.topics || []).forEach(t => topicFails[t] = (topicFails[t] || 0) + 1);
    }
  });
  return Object.entries(topicFails).sort((a,b)=>b[1]-a[1]).map(t=>t[0]);
}
