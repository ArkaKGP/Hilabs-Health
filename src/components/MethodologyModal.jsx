import { X, ShieldAlert, Info } from 'lucide-react';
import { WORKFLOW_SCORE_FORMULA } from '../data/mockData.js';

export function MethodologyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-100 text-blue-800 rounded-lg">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900">Workflow Triage Scoring Methodology</h3>
              <p className="text-xs text-slate-500">Transparent operational formula for morning queue sequencing</p>
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
        <div className="p-6 overflow-y-auto space-y-5 text-sm text-slate-700">
          {/* Critical disclaimer alert */}
          <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3 text-amber-900 text-xs leading-relaxed">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Important Non-Clinical Safety Boundary: </span>
              The workflow score is an <strong>illustrative operational triage hypothesis</strong> designed to help a nurse case manager order their morning queue. It is <strong>NOT a medical diagnosis, clinical risk score, or substitute for professional nurse judgment</strong>.
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 mb-2">The 4-Component Scoring Formula (Max 100 Points)</h4>
            <div className="p-3 bg-slate-900 text-slate-100 rounded-lg font-mono text-xs mb-3 shadow-inner">
              Workflow score = Acute Event (0–30) + Medication Signal (0–25) + Outreach Difficulty (0–20) + Social/Coordination Barrier (0–25)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {WORKFLOW_SCORE_FORMULA.components.map((c, i) => (
                <div key={i} className="p-3 rounded-lg border border-slate-200 bg-slate-50/70">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-slate-900 text-xs">{c.name}</span>
                    <span className="text-xs font-semibold px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                      0–{c.max} pts
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">{c.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 mb-2">Priority Bands (Demonstration Assumptions)</h4>
            <div className="space-y-2">
              <div className="p-2.5 rounded-lg border border-red-200 bg-red-50/60 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-red-800">High Priority (70–100 pts)</span>
                  <p className="text-red-700 mt-0.5">Urgent Monday morning review: acute hospital discharge, contradictory high-risk meds, immediate handoff risk.</p>
                </div>
                <span className="font-mono font-bold text-red-900 text-sm ml-4 shrink-0">≥ 70</span>
              </div>
              <div className="p-2.5 rounded-lg border border-amber-200 bg-amber-50/60 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-amber-800">Medium Priority (45–69 pts)</span>
                  <p className="text-amber-700 mt-0.5">Active coordination needed: frequent ED visits, unconfirmed refill gaps, unverified phone/safe contact, or caregiver strain.</p>
                </div>
                <span className="font-mono font-bold text-amber-900 text-sm ml-4 shrink-0">45–69</span>
              </div>
              <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-800">Routine Priority (&lt; 45 pts)</span>
                  <p className="text-slate-600 mt-0.5">Scheduled ongoing case monitoring; no acute transition, medication discrepancy, or urgent outreach barrier.</p>
                </div>
                <span className="font-mono font-bold text-slate-700 text-sm ml-4 shrink-0">&lt; 45</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200 text-xs text-slate-500">
            <p>
              Thresholds and weights are prototype design assumptions intended to be validated and adjusted during clinical pilots with health plan nurse case managers.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-medium hover:bg-slate-800 transition-colors"
          >
            Close Methodology
          </button>
        </div>
      </div>
    </div>
  );
}

export default MethodologyModal;
