import React from 'react';
import { AlertCircle, AlertTriangle, Clock } from 'lucide-react';
import { getPriorityBand } from '../utils/workflowScore.js';

export function PriorityBadge({ score, showScore = true, size = "md", onClick = null }) {
  const band = getPriorityBand(score);

  const sizeClasses = size === "sm" 
    ? "px-2 py-0.5 text-xs gap-1" 
    : size === "lg" 
    ? "px-3 py-1.5 text-sm gap-2" 
    : "px-2.5 py-1 text-xs font-medium gap-1.5";

  const IconComponent = band.color === "red" 
    ? AlertCircle 
    : band.color === "amber" 
    ? AlertTriangle 
    : Clock;

  const content = (
    <span 
      className={`inline-flex items-center rounded-full border font-medium ${band.badgeClass} ${sizeClasses} ${onClick ? 'cursor-pointer hover:shadow-xs transition-shadow' : ''}`}
      onClick={onClick}
      title={`${band.label} (${score}/100) — Click to view workflow scoring methodology`}
    >
      <IconComponent className={size === "sm" ? "w-3 h-3 shrink-0" : "w-3.5 h-3.5 shrink-0"} />
      <span>{band.label}</span>
      {showScore && (
        <span className="font-semibold tabular-nums ml-0.5">
          {score}<span className="text-[10px] opacity-75 font-normal">/100</span>
        </span>
      )}
    </span>
  );

  return content;
}

export default PriorityBadge;

