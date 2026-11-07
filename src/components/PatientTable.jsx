import React, { useState } from 'react';
import { 
  Sparkles, Filter, ChevronRight, Info, AlertTriangle, 
  PhoneForwarded, CheckSquare, Eye, SlidersHorizontal, BarChart3 
} from 'lucide-react';
import { PriorityBadge } from './PriorityBadge.jsx';
import { TagBadge } from './DataFreshnessBadge.jsx';

export function PatientTable({ 
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
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [programFilter, setProgramFilter] = useState('All');
  const [dataQualityFilter, setDataQualityFilter] = useState('All');

  // Filter patients
  const filteredPatients = patients.filter((patient) => {
    // Search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match = 
        patient.name.toLowerCase().includes(q) ||
        patient.id.toLowerCase().includes(q) ||
        patient.program.toLowerCase().includes(q) ||
        patient.scenario.toLowerCase().includes(q) ||
        patient.pcp.toLowerCase().includes(q);
      if (!match) return false;
    }

    // Priority filter
    if (priorityFilter !== 'All' && patient.priority !== priorityFilter) {
      return false;
    }

    // Program filter
    if (programFilter !== 'All' && patient.program !== programFilter) {
      return false;
    }

    // Data quality flag filter
    if (dataQualityFilter !== 'All') {
      const badgesStr = patient.dataQualityBadges.map(b => b.label.toLowerCase()).join(' ');
      if (dataQualityFilter === 'Medication conflict' && !badgesStr.includes('medication')) return false;
      if (dataQualityFilter === 'ADT delayed' && !badgesStr.includes('adt')) return false;
      if (dataQualityFilter === 'Stale claims' && !badgesStr.includes('claims')) return false;
      if (dataQualityFilter === 'Contact / Phone' && !badgesStr.includes('phone') && !badgesStr.includes('safe') && !badgesStr.includes('address')) return false;
      if (dataQualityFilter === 'Caregiver auth' && !badgesStr.includes('caregiver')) return false;
    }

    return true;
  });

  const programs = ['All', ...new Set(patients.map(p => p.program))];

  return (
    <div className="space-y-4">
      {/* Score Transparency Banner */}
      <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-blue-900">
        <div className="flex items-start gap-2.5">
          <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-blue-950">Explainable Triage Model: </span>
            Scores reflect <em>operational workflow friction & transition urgency</em> (Acute 0–30 + Med 0–25 + Outreach 0–20 + Social 0–25), 
            <strong> not a medical diagnosis or clinical risk score</strong>.
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 shrink-0">
          {onOpenMetrics && (
            <button
              onClick={onOpenMetrics}
              className="font-medium text-emerald-700 hover:text-emerald-900 underline underline-offset-2 flex items-center gap-1"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Pilot Targets (ROI)</span>
            </button>
          )}
          <button
            onClick={onOpenMethodology}
            className="font-medium text-blue-700 hover:text-blue-900 underline underline-offset-2 flex items-center gap-1"
          >
            <span>Scoring Formula</span> <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-3 sm:p-4 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1 mr-1">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Filters:
            </span>

            {/* Priority Filter */}
            <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-xs">
              {['All', 'High', 'Medium'].map((p) => (
                <button
                  key={p}
                  onClick={() => setPriorityFilter(p)}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    priorityFilter === p
                      ? 'bg-white text-slate-900 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {p === 'All' ? 'All Priority' : `${p} Priority`}
                </button>
              ))}
            </div>

            {/* Program Dropdown */}
            <select
              value={programFilter}
              onChange={(e) => setProgramFilter(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="All">All Programs ({programs.length - 1})</option>
              {programs.filter(p => p !== 'All').map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>

            {/* Data Quality Flag Dropdown */}
            <select
              value={dataQualityFilter}
              onChange={(e) => setDataQualityFilter(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="All">All Data Imperfections</option>
              <option value="Medication conflict">Medication Conflict</option>
              <option value="ADT delayed">ADT Delayed</option>
              <option value="Stale claims">Stale Claims</option>
              <option value="Contact / Phone">Contact / Safe Channel Issue</option>
              <option value="Caregiver auth">Caregiver Auth Needed</option>
            </select>

            {/* Reset Filters button if any active */}
            {(priorityFilter !== 'All' || programFilter !== 'All' || dataQualityFilter !== 'All' || searchQuery) && (
              <button
                onClick={() => {
                  setPriorityFilter('All');
                  setProgramFilter('All');
                  setDataQualityFilter('All');
                  onSearchChange('');
                }}
                className="text-xs text-blue-600 hover:text-blue-800 font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors"
              >
                Reset filters
              </button>
            )}
          </div>

          {/* Result Count and Sort Indicator */}
          <div className="text-xs text-slate-500 flex items-center justify-between sm:justify-end gap-3 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
            <span>
              Showing <strong className="text-slate-900">{filteredPatients.length}</strong> of {patients.length} members
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-[11px]">
              Sorted: Workflow Urgency (High → Low)
            </span>
          </div>
        </div>
      </div>

      {/* Patient Table / Cards */}
      {filteredPatients.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-xs">
          <Filter className="w-8 h-8 text-slate-400 mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-slate-800">No members match your active filters</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your priority, program, or data quality search criteria.
          </p>
          <button
            onClick={() => {
              setPriorityFilter('All');
              setProgramFilter('All');
              setDataQualityFilter('All');
              onSearchChange('');
            }}
            className="mt-4 px-3.5 py-1.5 text-xs font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-xs"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredPatients.map((patient, index) => {
            const isSelected = patient.id === selectedPatientId;
            return (
              <div
                key={patient.id}
                className={`bg-white rounded-xl border transition-all duration-150 overflow-hidden shadow-xs hover:shadow-sm ${
                  isSelected 
                    ? 'border-blue-500 ring-2 ring-blue-500/20' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="p-4 sm:p-5">
                  {/* Row 1: Header (Rank, Name, Priority, Actions) */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 text-xs font-mono font-bold flex items-center justify-center shrink-0">
                        {index + 1}
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 
                            onClick={() => onSelectPatient(patient.id)}
                            className="text-base font-bold text-slate-900 hover:text-blue-600 cursor-pointer transition-colors"
                          >
                            {patient.name}
                          </h3>
                          <span className="font-mono text-xs text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                            {patient.id}
                          </span>
                          <span className="text-xs text-slate-500">
                            Age {patient.age} · {patient.gender} · {patient.plan}
                          </span>
                        </div>
                        <div className="text-xs text-slate-600 mt-0.5 flex items-center gap-2">
                          <span className="font-medium text-slate-700">{patient.program}</span>
                          <span className="text-slate-300">•</span>
                          <span>PCP: {patient.pcp}</span>
                          <span className="text-slate-300">•</span>
                          <span>Lang: {patient.language}</span>
                        </div>
                      </div>
                    </div>

                    {/* Priority & Score Badge */}
                    <div className="flex items-center gap-2 shrink-0">
                      <PriorityBadge 
                        score={patient.workflowScore} 
                        onClick={onOpenMethodology}
                        size="md"
                      />
                      <button
                        onClick={() => onSelectPatient(patient.id)}
                        className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors shadow-xs flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Open Member 360</span>
                      </button>
                    </div>
                  </div>

                  {/* Row 2: Scenario, Grounded Signals & Data Quality Tags */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 py-3">
                    {/* Left: Why Now? Grounded Signals (7 cols) */}
                    <div className="lg:col-span-7 space-y-1.5">
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-blue-500" />
                        Why Now? Grounded Signals ({patient.scenario})
                      </div>
                      <ul className="space-y-1 text-xs text-slate-700">
                        {patient.signals.map((signal, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-1.5">
                            <span className="text-blue-500 text-xs shrink-0 mt-0.5">•</span>
                            <span className="leading-snug">{signal}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Right: Data Quality & Freshness Badges (5 cols) */}
                    <div className="lg:col-span-5 space-y-1.5 lg:border-l lg:border-slate-100 lg:pl-4">
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-amber-500" />
                        Data Quality & Provenance Imperfections
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {patient.dataQualityBadges.map((badge, bIdx) => (
                          <TagBadge key={bIdx} label={badge.label} level={badge.level} />
                        ))}
                      </div>
                      <p className="text-[11px] text-slate-500 italic mt-1 leading-snug">
                        {patient.plantedImperfections}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Row 3: 8 AM Monday Action & Quick Workflows (Card Footer) */}
                <div className="border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-50/80 p-3 sm:px-5">
                  <div className="flex items-start gap-2 text-xs">
                    <span className="font-bold text-slate-900 shrink-0">8 AM Monday Action:</span>
                    <span className="text-slate-700 leading-snug">{patient.mondayAction}</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
                    <button
                      onClick={() => {
                        onSelectPatient(patient.id);
                        onOpenOutreach();
                      }}
                      className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-100 hover:text-slate-900 transition-colors flex items-center gap-1"
                      title="Prepare Outreach Call"
                    >
                      <PhoneForwarded className="w-3.5 h-3.5 text-slate-500" />
                      <span>Prep Call</span>
                    </button>

                    <button
                      onClick={() => {
                        onSelectPatient(patient.id);
                        onOpenTasks();
                      }}
                      className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-100 hover:text-slate-900 transition-colors flex items-center gap-1"
                      title="View & Assign Care Tasks"
                    >
                      <CheckSquare className="w-3.5 h-3.5 text-slate-500" />
                      <span>Tasks ({patient.tasks.length})</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default PatientTable;
