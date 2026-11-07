import React, { useState } from 'react';
import { 
  Database, AlertTriangle, CheckCircle2, 
  ChevronDown, ChevronUp, Clock, Filter 
} from 'lucide-react';
import { DataFreshnessBadge } from './DataFreshnessBadge.jsx';

export function SourceTimeline({ records = [], _patientName = "" }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedRow, setExpandedRow] = useState(null);

  const categories = ['All', ...new Set(records.map(r => r.category))];

  const filteredRecords = selectedCategory === 'All'
    ? records
    : records.filter(r => r.category === selectedCategory);

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs space-y-0">
      {/* Header and Filter */}
      <div className="p-4 border-b border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Source Feeds & Multi-System Provenance ({filteredRecords.length} Records)
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            10 synthetic source feeds grounded in real health-plan interoperability imperfections.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-2xs"
          >
            {categories.map(c => (
              <option key={c} value={c}>
                {c === 'All' ? 'All Source Feeds (10)' : c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Interoperability Caveat Notice */}
      <div className="px-4 py-2.5 bg-blue-50/50 border-b border-slate-100 flex items-center justify-between text-[11px] text-blue-900">
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span>
            <strong>Missing is Not Negative:</strong> Absence of an ADT alert, claims record, or pharmacy fill must not be interpreted as proof that care did not occur.
          </span>
        </div>
      </div>

      {/* Record Rows */}
      <div className="divide-y divide-slate-100">
        {filteredRecords.map((r, index) => {
          const isExpanded = expandedRow === index;

          return (
            <div 
              key={index} 
              className={`p-4 transition-colors hover:bg-slate-50/80 ${
                isExpanded ? 'bg-slate-50/60' : ''
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-slate-900">
                      {r.category}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium border border-slate-200">
                      {r.sourceSystem}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Date: {r.recordDate}
                    </span>
                    <DataFreshnessBadge freshness={r.freshness} />
                  </div>

                  <p className="text-xs text-slate-800 font-medium leading-relaxed">
                    {r.record}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                  <button
                    onClick={() => setExpandedRow(isExpanded ? null : index)}
                    className="text-xs text-slate-500 hover:text-slate-800 px-2 py-1 rounded bg-slate-100/70 hover:bg-slate-200/70 transition-colors flex items-center gap-1 font-medium"
                  >
                    <span>{isExpanded ? 'Hide Details' : 'View Action'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Expandable Action & Guidance Panel */}
              {isExpanded && (
                <div className="mt-3 pt-3 border-t border-slate-200/80 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-white p-3 rounded-lg border border-slate-200 shadow-2xs animate-in fade-in duration-100">
                  <div className="space-y-1">
                    <div className="font-semibold text-amber-800 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      Data Quality Caveat / Imperfection:
                    </div>
                    <p className="text-slate-600 leading-relaxed pl-4">
                      {r.caveat}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="font-semibold text-blue-900 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                      What the Nurse Should Do With It:
                    </div>
                    <p className="text-slate-700 font-medium leading-relaxed pl-4">
                      {r.guidance}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SourceTimeline;
