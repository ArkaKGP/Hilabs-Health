import React from 'react';
import { 
  Users, AlertCircle, Clock, Calendar, ShieldCheck, 
  CheckCircle2, Activity 
} from 'lucide-react';
import { DASHBOARD_STATS } from '../data/mockData.js';
import { StatCard } from '../components/StatCard.jsx';
import { PatientTable } from '../components/PatientTable.jsx';

export function WorkQueuePage({ 
  patients, 
  onSelectPatient, 
  onOpenOutreach, 
  onOpenTasks, 
  onOpenMethodology,
  onOpenMetrics,
  selectedPatientId,
  searchQuery,
  onSearchChange
}) {
  return (
    <div className="space-y-6">
      {/* Top Banner Context */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/30 text-blue-300 border border-blue-400/30">
              Monday 8:00 AM Clinical Triage
            </span>
            <span className="text-slate-400 text-xs">November 2, 2026 Snapshot</span>
          </div>
          <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-white">
            Care Management Priority Queue
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Giving clinicians back their clinical judgment. Sequenced by real-time transition signals, medication conflicts, and coordination friction across 10 multi-system data feeds.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <CheckCircle2 className="w-4 h-4" /> 5 Fictional Members Sequenced
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-blue-300">
              <ShieldCheck className="w-4 h-4" /> Transparent Workflow Formula
            </span>
            <span>•</span>
            <span className="text-slate-400">
              RN Lead: <strong>Maria Hernandez</strong> (Caseload: 48)
            </span>
          </div>
        </div>

        {/* Decorative background shape */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-linear-to-l from-blue-600/10 to-transparent pointer-events-none" />
      </div>

      {/* Summary Stat Strip */}
      <div>
        <div className="flex items-center justify-between mb-2 px-1">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-blue-600" />
            Operational Queue Telemetry
          </div>
          <div className="text-[11px] text-slate-500 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-blue-600"></span>
            <span>Sample Caseload Vol (48) vs Fictional Prototype Cohort (5)</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-3">
          <StatCard
            title="Total Active Caseload"
            value={DASHBOARD_STATS.activeCases}
            subtitle="Full health plan panel"
            icon={Users}
            color="slate"
            badge="Caseload"
          />
          <StatCard
            title="New Discharges"
            value={DASHBOARD_STATS.newDischarges}
            subtitle="Weekend & 24h ADT alerts"
            icon={Clock}
            color="red"
            badge="Triage"
          />
          <StatCard
            title="Follow-Ups Due"
            value={DASHBOARD_STATS.followUpsDue}
            subtitle="Post-ED & clinic callbacks"
            icon={Calendar}
            color="blue"
            badge="Due Today"
          />
          <StatCard
            title="Med Conflicts"
            value={DASHBOARD_STATS.pendingReconciliations}
            subtitle="EHR vs PBM discrepancies"
            icon={AlertCircle}
            color="amber"
            badge="Safety"
          />
          <StatCard
            title="Cohort Members"
            value={DASHBOARD_STATS.demoPatientsCount}
            subtitle="Active synthetic profiles"
            icon={CheckCircle2}
            color="teal"
            badge="Demo Loaded"
          />
        </div>
      </div>

      {/* Main Work Queue Table */}
      <PatientTable
        patients={patients}
        onSelectPatient={onSelectPatient}
        onOpenOutreach={onOpenOutreach}
        onOpenTasks={onOpenTasks}
        onOpenMethodology={onOpenMethodology}
        onOpenMetrics={onOpenMetrics}
        selectedPatientId={selectedPatientId}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
      />
    </div>
  );
}

export default WorkQueuePage;
