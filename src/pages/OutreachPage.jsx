import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { PATIENTS } from '../data/mockData.js';
import { OutreachForm } from '../components/OutreachForm.jsx';

export function OutreachPage({ 
  selectedPatientId, 
  onSelectPatient, 
  onSaveNote, 
  onAcceptTask, 
  savedNotes = /** @type {any[]} */ ([]),
  onOpenAiBoundaries 
}) {
  const patient = PATIENTS.find(p => p.id === selectedPatientId) || PATIENTS[0];

  const patientNotes = savedNotes.filter(n => n.patientId === patient.id);

  return (
    <div className="space-y-6">
      {/* Patient Switcher */}
      <div className="bg-white rounded-xl border border-slate-200 p-2 shadow-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 shrink-0">
            Outreach Target:
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

      {/* Main Outreach Console */}
      <OutreachForm
        patient={patient}
        onSaveNote={onSaveNote}
        onAcceptTask={onAcceptTask}
        savedNotes={patientNotes}
        onOpenAiBoundaries={onOpenAiBoundaries}
      />

      {/* Saved Notes Log for this Member */}
      {patientNotes.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Saved Local Clinical Notes for {patient.name} ({patientNotes.length})</span>
            </h3>
            <span className="text-[11px] text-slate-400 font-mono">Persisted in Session State</span>
          </div>

          <div className="space-y-3">
            {patientNotes.map((note) => (
              <div key={note.id} className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-2">
                <div className="flex items-center justify-between text-slate-500 pb-2 border-b border-slate-200">
                  <span className="font-semibold text-slate-800">Author: {note.author}</span>
                  <span className="font-mono text-[11px]">{note.savedAt}</span>
                </div>
                <div>
                  <strong className="text-slate-900">Reason: </strong>
                  <span className="text-slate-700">{note.reasonForContact}</span>
                </div>
                <div>
                  <strong className="text-slate-900">Agreed Interventions: </strong>
                  <p className="text-slate-700 whitespace-pre-line mt-0.5">{note.agreedInterventions}</p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-[11px] text-slate-500">
                  <span>Follow-up: <strong>{note.followUpOwner}</strong> by <strong>{note.followUpDueDate}</strong></span>
                  <span className="font-mono font-semibold text-blue-700">{note.callOutcome}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default OutreachPage;
