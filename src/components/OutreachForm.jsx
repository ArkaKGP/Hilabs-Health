import React, { useState } from 'react';
import { 
  Phone, CheckCircle2, AlertTriangle, ShieldAlert, 
  Sparkles, UserCheck, MessageSquare, History, Plus 
} from 'lucide-react';
import { generateStructuredDraftNote } from '../utils/aiAssist.js';

export function OutreachForm({ 
  patient, 
  onSaveNote, 
  onAcceptTask, 
  _savedNotes = [],
  onOpenAiBoundaries 
}) {
  const { contactInfo } = patient;

  const [callStatus, setCallStatus] = useState("Call Prepared");
  const callerName = "Maria Hernandez · RN Case Manager";
  const [callNotesLog, setCallNotesLog] = useState("");
  const [activeNote, setActiveNote] = useState(() => generateStructuredDraftNote(patient, callerName));
  const [isAiDrafted, setIsAiDrafted] = useState(true);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState("");
  const [localOutreachHistory, setLocalOutreachHistory] = useState(patient.recentOutreach || []);
  const [dismissedSuggestedTasks, setDismissedSuggestedTasks] = useState([]);

  // Generate or reset deterministic AI draft
  const handleDraftFromRecords = () => {
    const draft = generateStructuredDraftNote(patient, callerName);
    setActiveNote(draft);
    setIsAiDrafted(true);
    setSaveSuccessMsg("Draft refreshed from visible records! Review & edit below.");
    setTimeout(() => setSaveSuccessMsg(""), 4000);
  };

  // Log a call attempt locally
  const handleLogAttempt = (outcome) => {
    const newAttempt = {
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      channel: `Phone (${contactInfo.primaryPhone})`,
      caller: callerName,
      outcome,
      notes: callNotesLog || `Logged status: ${outcome}`
    };
    setLocalOutreachHistory([newAttempt, ...localOutreachHistory]);
    setCallStatus(outcome);
    setCallNotesLog("");
    setSaveSuccessMsg(`Call attempt logged as: "${outcome}"`);
    setTimeout(() => setSaveSuccessMsg(""), 3500);
  };

  // Save the structured note
  const handleSaveStructuredNote = (e) => {
    e.preventDefault();
    const finalNote = {
      ...activeNote,
      id: `NOTE-${Date.now()}`,
      savedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      isDraft: false,
      callOutcome: callStatus
    };
    onSaveNote(finalNote);
    setIsAiDrafted(false);
    setSaveSuccessMsg("Note validated & saved locally to member's case file!");
    setTimeout(() => setSaveSuccessMsg(""), 4500);
  };

  const visibleSuggestedTasks = (patient.suggestedTasks || []).filter(
    st => !dismissedSuggestedTasks.includes(st.id)
  );

  return (
    <div className="space-y-6">
      {/* Top Protocol & Verification Notice */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Contact Guardrails & Safety (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-900">
                Member Outreach Preferences & Safety Protocol
              </h3>
            </div>
            <button
              onClick={onOpenAiBoundaries}
              className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 underline"
            >
              Consent Rules
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <span className="text-slate-500 block">Phone & Verification:</span>
              <div className="font-mono font-bold text-slate-900 text-sm">{contactInfo.primaryPhone}</div>
              <div className="flex items-center gap-1.5 mt-1">
                {contactInfo.phoneVerified ? (
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified ({contactInfo.verifiedDate})
                  </span>
                ) : (
                  <span className="text-red-700 font-bold flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> Unverified / Cousin's Phone?
                  </span>
                )}
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <span className="text-slate-500 block">Preferred Call Window:</span>
              <div className="font-bold text-slate-900">{contactInfo.preferredWindow}</div>
              <div className="text-slate-600">Language: <strong>{contactInfo.preferredLanguage}</strong></div>
            </div>
          </div>

          {/* Privacy warning specific to patient */}
          {patient.id === "P-1003" && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-900 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <strong>Privacy Rule for Luis Ramirez:</strong> Voicemails reached a number possibly belonging to cousin Carlos. 
                Do NOT disclose diagnosis, ED visits, or clinical details until Luis's identity and direct consent are verified.
              </div>
            </div>
          )}

          {patient.id === "P-1004" && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Sensitive Safe Contact Rule:</strong> Address is a transitional P.O. Box only. Safe contact preference has not been confirmed. Do not leave sensitive behavioral health details on unverified voicemail.
              </div>
            </div>
          )}

          {patient.id === "P-1005" && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Caregiver Authorization Guardrail:</strong> Daughter Sarah requested calls after 17:00, but signed HIPAA Authorized Representative status is not yet indexed. Confirm Evelyn's verbal consent during joint call.
              </div>
            </div>
          )}

          {/* Call Logging Buttons */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">Quick Interaction State:</span>
              <span className="font-mono text-slate-500">Current: {callStatus}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Connected', 'Voicemail', 'No voicemail left (Safety)', 'Needs verification', 'Unanswered'].map((status) => (
                <button
                  key={status}
                  onClick={() => handleLogAttempt(status)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    callStatus === status
                      ? 'bg-blue-600 text-white border-blue-600 shadow-2xs font-semibold'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Prior Outreach History Panel (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-slate-500" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Outreach History ({localOutreachHistory.length})
                </h3>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Real-time log</span>
            </div>

            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {localOutreachHistory.length === 0 ? (
                <p className="text-xs text-slate-400 py-3 text-center">No outreach attempts logged yet.</p>
              ) : (
                localOutreachHistory.map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs space-y-1">
                    <div className="flex items-center justify-between font-mono text-[10px] text-slate-500">
                      <span>{item.date}</span>
                      <span className={`px-1.5 py-0.2 rounded font-semibold ${
                        item.outcome.toLowerCase().includes('connected') 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-slate-200 text-slate-700'
                      }`}>
                        {item.outcome}
                      </span>
                    </div>
                    <div className="font-semibold text-slate-800">{item.channel}</div>
                    <p className="text-slate-600 text-[11px] leading-snug">{item.notes}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-400">
            * Local prototype simulation. No real calls or SMS are dispatched.
          </div>
        </div>
      </div>

      {/* Save Success Banner */}
      {saveSuccessMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs font-medium text-emerald-900 flex items-center justify-between shadow-xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{saveSuccessMsg}</span>
          </div>
          <span className="text-[10px] text-emerald-700 font-mono">Saved in local state</span>
        </div>
      )}

      {/* Suggested Tasks Generator (Human in the loop approval) */}
      {visibleSuggestedTasks.length > 0 && (
        <div className="bg-slate-50 border border-blue-200 rounded-xl p-4 sm:p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                AI Suggested Next Tasks (Grounded in Connected Feeds)
              </h3>
            </div>
            <span className="text-[10px] text-blue-700 bg-blue-100/60 px-2 py-0.5 rounded-full font-medium">
              Requires Nurse Approval
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {visibleSuggestedTasks.map((task) => (
              <div 
                key={task.id}
                className="p-3 bg-white rounded-lg border border-slate-200 flex flex-col justify-between shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                    <span className="font-semibold text-blue-700">{task.priority} Priority</span>
                    <span className="text-slate-400 font-mono">Suggested Owner: {task.owner}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 leading-snug mb-1">
                    {task.title}
                  </h4>
                  <p className="text-[11px] text-slate-600">
                    <span className="font-semibold">Signal:</span> {task.reason}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button
                    onClick={() => setDismissedSuggestedTasks([...dismissedSuggestedTasks, task.id])}
                    className="text-[11px] px-2.5 py-1 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded"
                  >
                    Dismiss
                  </button>
                  <button
                    onClick={() => {
                      onAcceptTask({
                        id: `T-${Date.now()}`,
                        patientId: patient.id,
                        patientName: patient.name,
                        title: task.title,
                        owner: task.owner,
                        priority: task.priority,
                        dueDate: "2026-11-04",
                        status: "Not started",
                        reason: task.reason,
                        category: "Care Coordination"
                      });
                      setDismissedSuggestedTasks([...dismissedSuggestedTasks, task.id]);
                      setSaveSuccessMsg(`Task accepted: "${task.title}" added to Care Plan!`);
                      setTimeout(() => setSaveSuccessMsg(""), 4000);
                    }}
                    className="text-[11px] px-3 py-1 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 shadow-2xs flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Accept Task</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Structured Note Editor Form */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        {/* Editor Toolbar */}
        <div className="p-4 border-b border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-blue-100 text-blue-700 rounded-lg">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900">
                  Structured Clinical & Coordination Note
                </h3>
                {isAiDrafted && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                    AI-Assisted Draft — Review Before Saving
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">
                Author: <strong>{callerName}</strong> · Date: {activeNote.date}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              type="button"
              onClick={handleDraftFromRecords}
              className="px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Draft Note from Visible Records</span>
            </button>
          </div>
        </div>

        {/* Human in the loop guidance */}
        <div className="px-4 py-2 bg-slate-100 border-b border-slate-200 text-[11px] text-slate-600 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>
              <strong>Human-in-the-Loop Protocol:</strong> AI may summarize and pre-populate visible records; the nurse verifies facts, confirms consent, edits narrative, and signs note.
            </span>
          </span>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSaveStructuredNote} className="p-4 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Section 1: Reason for Contact */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                1. Reason for Contact & Clinical Transition:
              </label>
              <textarea
                rows={3}
                value={activeNote.reasonForContact}
                onChange={(e) => setActiveNote({ ...activeNote, reasonForContact: e.target.value })}
                className="w-full text-xs p-3 bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 font-sans"
              />
            </div>

            {/* Section 2: Member Reported Needs */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                2. Member-Reported Needs & Current Symptoms:
              </label>
              <textarea
                rows={3}
                value={activeNote.memberReportedNeeds}
                onChange={(e) => setActiveNote({ ...activeNote, memberReportedNeeds: e.target.value })}
                className="w-full text-xs p-3 bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 font-sans"
              />
            </div>
          </div>

          {/* Section 3: Clinical & Medication Discrepancies */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              3. Clinical Provenance & Medication Discrepancy Findings:
            </label>
            <textarea
              rows={3}
              value={activeNote.clinicalDiscrepancies}
              onChange={(e) => setActiveNote({ ...activeNote, clinicalDiscrepancies: e.target.value })}
              className="w-full text-xs p-3 bg-amber-50/40 border border-amber-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Section 4: Barriers Identified */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                4. Barriers Identified (Transport, Cost, Housing, Safe Channel):
              </label>
              <textarea
                rows={3}
                value={activeNote.barriersIdentified}
                onChange={(e) => setActiveNote({ ...activeNote, barriersIdentified: e.target.value })}
                className="w-full text-xs p-3 bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 font-sans"
              />
            </div>

            {/* Section 5: Agreed Interventions */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                5. Agreed Interventions & Next Care Plan Steps:
              </label>
              <textarea
                rows={3}
                value={activeNote.agreedInterventions}
                onChange={(e) => setActiveNote({ ...activeNote, agreedInterventions: e.target.value })}
                className="w-full text-xs p-3 bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 font-sans"
              />
            </div>
          </div>

          {/* Section 6: Follow-up Owner & Due Date */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">
                Follow-up Owner:
              </label>
              <input
                type="text"
                value={activeNote.followUpOwner}
                onChange={(e) => setActiveNote({ ...activeNote, followUpOwner: e.target.value })}
                className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">
                Target Follow-up Date:
              </label>
              <input
                type="date"
                value={activeNote.followUpDueDate}
                onChange={(e) => setActiveNote({ ...activeNote, followUpDueDate: e.target.value })}
                className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">
                Encounter Outcome:
              </label>
              <input
                type="text"
                readOnly
                value={callStatus}
                className="w-full text-xs p-2 bg-slate-100 border border-slate-200 rounded-lg text-slate-700 font-medium cursor-not-allowed"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-[11px] text-slate-500 italic">
              Changes persist in local demo state.
            </span>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                type="button"
                onClick={handleDraftFromRecords}
                className="px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Reset Draft
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-2xs flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Validate & Save Note Locally</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OutreachForm;
