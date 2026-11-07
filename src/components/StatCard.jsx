import React from 'react';

export function StatCard({ title, value, subtitle, icon: Icon, color = "blue", badge = null, onClick = null }) {
  const colorMap = {
    blue: {
      bg: "bg-blue-50 text-blue-700",
      border: "border-slate-200 hover:border-blue-300",
      iconBg: "bg-blue-100 text-blue-700",
    },
    red: {
      bg: "bg-red-50 text-red-700",
      border: "border-slate-200 hover:border-red-300",
      iconBg: "bg-red-100 text-red-700",
    },
    amber: {
      bg: "bg-amber-50 text-amber-700",
      border: "border-slate-200 hover:border-amber-300",
      iconBg: "bg-amber-100 text-amber-700",
    },
    teal: {
      bg: "bg-emerald-50 text-emerald-700",
      border: "border-slate-200 hover:border-emerald-300",
      iconBg: "bg-emerald-100 text-emerald-700",
    },
    slate: {
      bg: "bg-slate-50 text-slate-700",
      border: "border-slate-200 hover:border-slate-300",
      iconBg: "bg-slate-100 text-slate-700",
    }
  };

  const scheme = colorMap[color] || colorMap.blue;

  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-lg border p-4 shadow-xs transition-all min-w-0 ${scheme.border} ${onClick ? 'cursor-pointer hover:shadow-sm' : ''}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-1 min-w-0 flex-1">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider truncate">{title}</p>
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-2xl font-bold tracking-tight text-slate-900 tabular-nums">{value}</span>
            {badge && (
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 shrink-0">
                {badge}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-slate-500 truncate">{subtitle}</p>
          )}
        </div>
        {Icon && (
          <div className={`p-2.5 rounded-lg shrink-0 ${scheme.iconBg}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
    </div>
  );
}

export default StatCard;

