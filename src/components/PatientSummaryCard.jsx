import React from 'react';
import { 
  Phone, Sparkles, CheckCircle2, AlertCircle 
} from 'lucide-react';
import { PriorityBadge } from './PriorityBadge.jsx';

export function PatientSummaryCard({ 
  patient, 
  onOpenOutreach, 
  onOpenTasks, 
  onOpenMethodology 
}) {
  const { contactInfo, scoreBreakdown } = patient;

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
      {/* Top Banner: Member Demographics */}
      <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/50">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Identity & Core Info */}
          <div className="flex items-start gap-3.5 min-w-0 flex-1">
            <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-xs shrink-0">
              {patient.name.charAt(0)}
            </div>
            <div className="space-y-1 min-w-0 flex-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  {patient.name}
                </h2>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-200/80 text-slate-700 font-semibold">
                  {patient.id}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-medium">
                  {patient.plan}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-600 flex-wrap">
                <span>Age <strong>{patient.age}</strong> ({patient.gender})</span>
                <span>•</span>
                <span>Program: <strong className="text-slate-800">{patient.program}</strong></span>
                <span>•</span>
                <span>PCP: <strong>{patient.pcp}</strong></span>
                <span>•</span>
                <span>Preferred Language: <strong>{patient.language}</strong></span>
              </div>
            </div>
          </div>

          {/* Workflow Triage Score & Breakdown */}
          <div className="flex flex-col items-start lg:items-end gap-1.5 shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">Workflow Score:</span>
              <PriorityBadge 
                score={patient.workflowScore} 
                onClick={onOpenMethodology}
                size="lg"
              />
            </div>
            {scoreBreakdown && (
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-mono">
                <span title="Acute Event Points">Acute:{scoreBreakdown.acuteEvent}</span> + 
                <span title="Medication Signal">Med:{scoreBreakdown.medicationSignal}</span> + 
                <span title="Outreach Difficulty">Outreach:{scoreBreakdown.outreachDifficulty}</span> + 
                <span title="Social / Coordination Barrier">Social:{scoreBreakdown.socialBarrier}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Grid: What Matters Today & Contact Verification Status */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
        {/* Left: What Matters Today (7 cols) */}
        <div className="lg:col-span-7 p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                What Matters Today (Monday 8:00 AM)
              </h3>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
              {patient.scenario}
            </span>
          </div>

          <p className="text-xs text-slate-800 font-medium leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200">
            {patient.holisticSummary}
          </p>

          <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-lg space-y-1">
            <span className="text-xs font-bold text-blue-950 block">Recommended Action:</span>
            <p className="text-xs text-blue-900 leading-relaxed">
              {patient.mondayAction}
            </p>
          </div>

          <div>
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Key Grounded Signals
            </div>
            <ul className="space-y-1 text-xs text-slate-700">
              {patient.signals.map((sig, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-blue-500 font-bold shrink-0 mt-0.5">•</span>
                  <span>{sig}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: Contact Preferences & Privacy Guardrails (5 cols) */}
        <div className="lg:col-span-5 p-4 sm:p-5 space-y-3 bg-slate-50/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-600" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Contact & Verification Status
              </h3>
            </div>
            {contactInfo.phoneVerified ? (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Verified Phone
              </span>
            ) : (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> Verification Needed
              </span>
            )}
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-lg bg-white border border-slate-200 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Primary Phone:</span>
                <span className="font-mono font-bold text-slate-900">{contactInfo.primaryPhone}</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Phone Type:</span>
                <span className="text-slate-700 font-medium">{contactInfo.phoneType}</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Safe Channel:</span>
                <span className={contactInfo.safeChannelConfirmed ? "text-emerald-700 font-semibold" : "text-amber-700 font-semibold"}>
                  {contactInfo.safeChannelConfirmed ? "Confirmed Safe" : "Consent Unverified"}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Best Call Window:</span>
                <span className="text-blue-700 font-semibold">{contactInfo.preferredWindow}</span>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-white border border-slate-200 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Address on File:</span>
                <span className="text-[11px] font-medium text-slate-800">{contactInfo.addressType}</span>
              </div>
              <p className="text-slate-900 font-medium">{contactInfo.address}</p>
              <p className="text-slate-600 text-[11px]">{contactInfo.cityStateZip}</p>
            </div>

            {contactInfo.caregiverName && contactInfo.caregiverName !== "None" && contactInfo.caregiverName !== "None listed / Independent" && (
              <div className="p-2.5 rounded-lg bg-white border border-slate-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Reported Caregiver:</span>
                  <span className="font-semibold text-slate-900">{contactInfo.caregiverName}</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">HIPAA Authorization:</span>
                  <span className={contactInfo.caregiverAuthorized ? "text-emerald-700 font-bold" : "text-red-700 font-bold"}>
                    {contactInfo.caregiverAuthorized ? "Verified on File" : "NOT Confirmed — Do Not Disclose"}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Quick CTA to Outreach */}
          <div className="pt-2 flex items-center gap-2">
            <button
              onClick={onOpenOutreach}
              className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Launch Outreach Console</span>
            </button>
            <button
              onClick={onOpenTasks}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-colors"
            >
              Tasks ({patient.tasks.length})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientSummaryCard;
