import React from 'react';
import { CheckSquare, ChevronRight } from 'lucide-react';
import { PATIENTS } from '../data/mockData.js';
import { PatientSummaryCard } from '../components/PatientSummaryCard.jsx';
import { DataConflictCard } from '../components/DataConflictCard.jsx';
import { SourceTimeline } from '../components/SourceTimeline.jsx';

export function Member360Page({ 
  selectedPatientId, 
  onSelectPatient, 
  onOpenOutreach, 
  onOpenTasks,
  onOpenMethodology,
  tasks = /** @type {any[]} */ ([])
}) {
  const patient = PATIENTS.find(p => p.id === selectedPatientId) || PATIENTS[0];

  const memberTasks = tasks.filter(t => t.patientId === patient.id);

  return (
    <div className="space-y-6">
      {/* Patient Switcher Tabs */}
      <div className="bg-white rounded-xl border border-slate-200 p-2 shadow-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 shrink-0">
            Cohort Member:
          </span>
          {PATIENTS.map((p, idx) => {
            const isSelected = p.id === patient.id;
            return (
              <button
                key={p.id}
                onClick={() => onSelectPatient(p.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>#{idx + 1} {p.name}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {p.workflowScore}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Member 360 Header & Demographics Summary Card */}
      <PatientSummaryCard
        patient={patient}
        onOpenOutreach={onOpenOutreach}
        onOpenTasks={onOpenTasks}
        onOpenMethodology={onOpenMethodology}
      />

      {/* Side-by-Side Medication Reconciliation Panel */}
      <DataConflictCard patient={patient} />

      {/* Active Care Plan Tasks for this Member */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Active Care Plan Tasks for {patient.name} ({memberTasks.length})
            </h3>
          </div>
          <button
            onClick={onOpenTasks}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <span>Open All Tasks</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {memberTasks.map((t) => (
            <div 
              key={t.id} 
              className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className={`font-bold px-2 py-0.2 rounded-full border text-[10px] ${
                    t.priority === 'High' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}>
                    {t.priority} Priority
                  </span>
                  <span className="font-mono text-slate-500">Due: {t.dueDate}</span>
                </div>
                <div className="font-semibold text-xs text-slate-900 leading-snug">
                  {t.title}
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Signal: {t.reason}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                <span className="text-slate-600">Owner: <strong>{t.owner}</strong></span>
                <span className="font-semibold text-blue-700">{t.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Multi-System Source Feeds Timeline (10 categories) */}
      <SourceTimeline 
        records={patient.records} 
        patientName={patient.name} 
      />
    </div>
  );
}

export default Member360Page;
