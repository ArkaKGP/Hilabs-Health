import React from 'react';
import { CheckCircle2, AlertTriangle, AlertOctagon, HelpCircle } from 'lucide-react';
import { formatDataFreshness } from '../utils/workflowScore.js';

export function DataFreshnessBadge({ freshness, label, caveat }) {
  const meta = formatDataFreshness(freshness);

  const Icon = freshness?.toLowerCase() === 'high' 
    ? CheckCircle2 
    : freshness?.toLowerCase() === 'medium' 
    ? AlertTriangle 
    : freshness?.toLowerCase() === 'low' 
    ? AlertOctagon 
    : HelpCircle;

  return (
    <span 
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium border ${meta.badgeClass}`}
      title={caveat ? `Data caveat: ${caveat}` : meta.label}
    >
      <Icon className={`w-3 h-3 ${meta.iconColor}`} />
      <span>{label || meta.label}</span>
    </span>
  );
}

export function TagBadge({ label, level = "slate" }) {
  let style = "bg-slate-100 text-slate-700 border-slate-200";
  if (level === "red") style = "bg-red-50 text-red-700 border-red-200";
  if (level === "amber") style = "bg-amber-50 text-amber-800 border-amber-200";
  if (level === "teal") style = "bg-emerald-50 text-emerald-800 border-emerald-200";
  if (level === "blue") style = "bg-blue-50 text-blue-700 border-blue-200";

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border ${style}`}>
      {label}
    </span>
  );
}

export default DataFreshnessBadge;

