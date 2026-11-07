import { X, UserCheck, Bot } from 'lucide-react';
import { AI_SAFETY_GUARDRAILS } from '../utils/aiAssist.js';

export function AiBoundariesModal({ isOpen, onClose }) {
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
            <div className="p-2 bg-indigo-100 text-indigo-800 rounded-lg">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900">AI Safety Boundaries & Clinical Guardrails</h3>
              <p className="text-xs text-slate-500">Deterministic workflow assists designed to empower nurse judgment, not replace it</p>
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
        <div className="p-6 overflow-y-auto space-y-4 text-sm text-slate-700">
          {/* Philosophy Banner */}
          <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-lg text-blue-900 text-xs leading-relaxed">
            <span className="font-semibold">Core Architectural Philosophy: </span>
            The Care Workbench uses <strong>deterministic rules and synthesis</strong> rather than an uncontrolled generative model. AI is strictly constrained to reading visible synthetic records, citing exact timestamps, drafting notes for nurse editing, and proposing draft tasks that require explicit human approval.
          </div>

          <div className="space-y-3">
            {AI_SAFETY_GUARDRAILS.map((guard, i) => (
              <div key={i} className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </div>
                  <h4 className="font-semibold text-slate-900 text-xs">{guard.rule}</h4>
                </div>
                <p className="text-xs text-slate-600 pl-7 leading-relaxed">{guard.detail}</p>
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-100 rounded-lg border border-slate-200 text-xs space-y-1.5">
            <div className="font-semibold text-slate-800 flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-emerald-600" />
              Human-in-the-Loop Verification Requirements:
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
              <li>Nurse verifies member identity, contact preferences, and legal consent before disclosure.</li>
              <li>Nurse reviews side-by-side medication discrepancies with prescribing physicians.</li>
              <li>Nurse reads, refines, and signs all drafted clinical outreach notes.</li>
              <li>Nurse approves all care coordination tasks before they are assigned.</li>
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-medium hover:bg-slate-800 transition-colors"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
}

export default AiBoundariesModal;
