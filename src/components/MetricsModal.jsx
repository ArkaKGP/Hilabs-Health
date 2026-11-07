import { X, TrendingUp, Clock, Award } from 'lucide-react';
import { PILOT_METRICS, TIME_ALLOCATION } from '../data/mockData.js';

export function MetricsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900">MVP Measurement Plan & Assumptions</h3>
              <p className="text-xs text-slate-500">Pilot targets designed to quantify clinical time saved and outreach effectiveness</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700">
          {/* Target Metrics Table */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-2.5 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-600" />
              Core Pilot Metrics (Assumption-Led Targets)
            </h4>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Metric</th>
                    <th className="py-2.5 px-3">Baseline</th>
                    <th className="py-2.5 px-3">Target</th>
                    <th className="py-2.5 px-3">Impact</th>
                    <th className="py-2.5 px-3">Why It Matters</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {PILOT_METRICS.map((m, i) => (
                    <tr key={i} className="hover:bg-slate-50/70">
                      <td className="py-2.5 px-3 font-medium text-slate-900">{m.metric}</td>
                      <td className="py-2.5 px-3 text-slate-500">{m.baseline}</td>
                      <td className="py-2.5 px-3 font-semibold text-emerald-700">{m.target}</td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {m.improvement}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-slate-600 text-[11px]">{m.whyItMatters}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 8-Hour Case Manager Day Allocation */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-blue-600" />
              Illustrative 8-Hour Nurse Day Reallocation
            </h4>
            <p className="text-xs text-slate-500 mb-3">
              Currently, over 43% of a case manager's day (3.5 hours) is lost to disconnected data hunting across systems and redundant typing. The workbench gives clinicians back their time for actual patient care.
            </p>
            
            <div className="space-y-2">
              {TIME_ALLOCATION.map((item, i) => (
                <div key={i} className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/60">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-medium text-slate-800">{item.activity}</span>
                    <span className="font-mono font-semibold text-slate-700">{item.hours} hrs ({item.percent}%)</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full" 
                      style={{ width: `${item.percent}%`, backgroundColor: item.color }}
                    />
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1 flex justify-between">
                    <span>{item.current}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pilot Caveat */}
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900">
            <strong>Measurement Caveat:</strong> Baselines represent synthetic hypotheses grounded in published care-management time studies. Speed must never be prioritized over clinical thoroughness or compliance verification.
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-medium hover:bg-slate-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default MetricsModal;
