/**
 * Explains and validates the workflow triage score.
 * Formula:
 * Workflow score = acute event points (0–30) + medication signal (0–25) + outreach difficulty (0–20) + social / coordination barrier (0–25)
 */
export function calculateWorkflowScore(breakdown) {
  const { acuteEvent = 0, medicationSignal = 0, outreachDifficulty = 0, socialBarrier = 0 } = breakdown;
  return Math.min(100, Math.max(0, acuteEvent + medicationSignal + outreachDifficulty + socialBarrier));
}

export function getPriorityBand(score) {
  if (score >= 70) {
    return {
      label: "High priority",
      color: "red",
      badgeClass: "bg-red-50 text-red-700 border-red-200 ring-1 ring-red-600/10",
      dotClass: "bg-red-500",
      description: "Immediate Monday morning review required. High risk of decompensation, transition gap, or acute handoff failure."
    };
  }
  if (score >= 45) {
    return {
      label: "Medium priority",
      color: "amber",
      badgeClass: "bg-amber-50 text-amber-700 border-amber-200 ring-1 ring-amber-600/10",
      dotClass: "bg-amber-500",
      description: "Review today. Active coordination barrier, medication verification need, or outreach obstacle present."
    };
  }
  return {
    label: "Routine priority",
    color: "slate",
    badgeClass: "bg-slate-50 text-slate-700 border-slate-200 ring-1 ring-slate-600/10",
    dotClass: "bg-slate-400",
    description: "Scheduled ongoing case monitoring; no acute barrier or transition event identified in current window."
  };
}

export function formatDataFreshness(freshness) {
  switch (freshness?.toLowerCase()) {
    case 'high':
      return {
        label: "Fresh / High confidence",
        badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
        iconColor: "text-emerald-600"
      };
    case 'medium':
      return {
        label: "Moderate / Check caveats",
        badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
        iconColor: "text-amber-600"
      };
    case 'low':
      return {
        label: "Stale / Lagged data",
        badgeClass: "bg-rose-50 text-rose-700 border-rose-200",
        iconColor: "text-rose-600"
      };
    default:
      return {
        label: "Standard Feed",
        badgeClass: "bg-slate-50 text-slate-700 border-slate-200",
        iconColor: "text-slate-600"
      };
  }
}
