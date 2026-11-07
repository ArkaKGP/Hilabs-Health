import React, { useState } from 'react';
import { AlertTriangle, ShieldAlert, CheckCircle2, Stethoscope } from 'lucide-react';

export function DataConflictCard({ patient }) {
  const { medicationReconciliation } = patient;
  const [reconciliationStatus, setReconciliationStatus] = useState("Pending Clinician Review");
  const [nurseReconNote, setNurseReconNote] = useState("");
  const [showNoteInput, setShowNoteInput] = useState(false);

  if (!medicationReconciliation) return null;

  return (
    <div className={`rounded-xl border overflow-hidden shadow-xs transition-all ${
      medicationReconciliation.hasConflict 
        ? 'border-amber-300 bg-amber-50/20' 
        : 'border-slate-200 bg-white'
    }`}>
      {/* Banner / Header */}
      <div className={`p-4 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
        medicationReconciliation.hasConflict
          ? 'bg-amber-100/70 border-amber-200 text-amber-950'
          : 'bg-slate-50 border-slate-200 text-slate-800'
      }`}>
        <div className="flex items-start gap-2.5">
          {medicationReconciliation.hasConflict ? (
            <div className="p-1.5 bg-amber-200 text-amber-900 rounded-lg shrink-0 mt-0.5">
              <AlertTriangle className="w-4 h-4 text-amber-800" />
            </div>
          ) : (
            <div className="p-1.5 bg-slate-200 text-slate-700 rounded-lg shrink-0 mt-0.5">
              <CheckCircle2 className="w-4 h-4 text-slate-600" />
            </div>
          )}
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-bold tracking-tight">
                {medicationReconciliation.title}
              </h3>
              {medicationReconciliation.hasConflict && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-200/80 text-amber-900 border border-amber-300">
                  Needs Clinician Reconciliation
                </span>
              )}
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              {medicationReconciliation.urgency}
            </p>
          </div>
        </div>

        {/* Clinician Action Status */}
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
          <span className="text-[11px] font-medium text-slate-500">Status:</span>
          <select
            value={reconciliationStatus}
            onChange={(e) => setReconciliationStatus(e.target.value)}
            className="text-xs bg-white border border-amber-300 rounded-lg px-2.5 py-1 text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-amber-500 shadow-2xs"
          >
            <option value="Pending Clinician Review">Pending Clinician Review</option>
            <option value="Sent to Treating Physician">Sent to Treating Physician</option>
            <option value="Clinician Confirmed (40mg Daily)">Clinician Confirmed (40mg Daily)</option>
            <option value="Clinician Maintained (20mg Daily)">Clinician Maintained (20mg Daily)</option>
            <option value="Member Contact Needed">Member Contact Needed</option>
          </select>
        </div>
      </div>

      {/* Side-by-side Items */}
      <div className="p-4 sm:p-5 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {medicationReconciliation.items.map((item, idx) => (
            <div 
              key={idx}
              className="p-3.5 rounded-lg border border-slate-200 bg-white shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 pb-1.5 border-b border-slate-100 mb-2">
                  <span className="font-semibold text-slate-700">{item.source}</span>
                  <span className="font-mono text-[10px]">{item.date}</span>
                </div>
                <div className="text-xs font-bold text-slate-900 leading-snug mb-1.5">
                  {item.detail}
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  {item.notes}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                  {item.badge}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Safety Boundary Callout */}
        <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-lg flex items-start gap-2.5 text-xs text-amber-900 leading-relaxed">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold">{medicationReconciliation.safetyNotice}</p>
            <p className="text-[11px] text-amber-800">
              The workbench never automatically selects a "correct" medication strength or dose. A nurse case manager identifies the discrepancy and coordinates with the treating physician or PCP before patient counseling.
            </p>
          </div>
        </div>

        {/* Reconciliation Notes & Physician Routing Action */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <div className="text-xs text-slate-600 flex items-center gap-1.5">
            <Stethoscope className="w-4 h-4 text-blue-600" />
            <span>Assigned Clinician: <strong>{patient.pcp}</strong></span>
            {reconciliationStatus !== "Pending Clinician Review" && (
              <span className="ml-2 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-semibold">
                Updated: {reconciliationStatus}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowNoteInput(!showNoteInput)}
              className="text-xs px-3 py-1.5 font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              {showNoteInput ? 'Cancel Note' : 'Add Reconciliation Note'}
            </button>
            <button
              onClick={() => {
                setReconciliationStatus("Sent to Treating Physician");
                alert(`Reconciliation packet prepared for ${patient.pcp}. Sources: Hospital EHR (40mg) vs Plan record (20mg).`);
              }}
              className="text-xs px-3.5 py-1.5 font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-2xs"
            >
              Route to Provider Office
            </button>
          </div>
        </div>

        {showNoteInput && (
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2 animate-in fade-in duration-150">
            <label className="text-xs font-semibold text-slate-700 block">
              Nurse Reconciliation Note for Medical Record:
            </label>
            <textarea
              rows={2}
              value={nurseReconNote}
              onChange={(e) => setNurseReconNote(e.target.value)}
              placeholder="e.g., Contacted Dr. Rao's medical assistant. Confirmed discharge plan was to titrate to 40mg. Requesting verified script."
              className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-md text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  if (nurseReconNote.trim()) {
                    alert("Reconciliation note saved to local demo chart!");
                    setShowNoteInput(false);
                  }
                }}
                className="text-xs px-3 py-1 bg-slate-900 text-white rounded font-medium hover:bg-slate-800"
              >
                Save to Chart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DataConflictCard;
