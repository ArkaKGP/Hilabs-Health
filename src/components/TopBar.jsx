import { useState } from 'react';
import { 
  Search, Bell, BookOpen, BarChart3, 
  AlertCircle, ShieldCheck, ChevronDown 
} from 'lucide-react';
import { DEMO_USER, PATIENTS } from '../data/mockData.js';

export function TopBar({ 
  currentTab, 
  onSelectPatient, 
  selectedPatientId,
  onOpenMethodology,
  onOpenMetrics,
  onOpenAiBoundaries,
  searchQuery,
  onSearchChange
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showPatientMenu, setShowPatientMenu] = useState(false);

  const activePatient = PATIENTS.find(p => p.id === selectedPatientId) || PATIENTS[0];

  const notifications = [
    { id: 1, title: "Delayed ADT Alert (~20h)", patient: "Jordan Lee (P-1001)", time: "31 Oct 14:00", type: "amber", unread: true },
    { id: 2, title: "Medication Regimen Conflict (Furosemide 40mg vs 20mg)", patient: "Jordan Lee (P-1001)", time: "30 Oct 18:20", type: "red", unread: true },
    { id: 3, title: "Missed Home-Support Shift Unsynced", patient: "Evelyn Carter (P-1005)", time: "30 Oct 17:00", type: "amber", unread: true },
    { id: 4, title: "Uncertain Phone Ownership (Cousin)", patient: "Luis Ramirez (P-1003)", time: "31 Oct 16:20", type: "red", unread: false }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const tabTitles = {
    workQueue: "Work Queue — Monday 8:00 AM Triage",
    member360: `Member 360 — ${activePatient.name} (${activePatient.id})`,
    outreach: `Outreach & Clinical Notes — ${activePatient.name}`,
    carePlan: "Care Plan & Actionable Tasks"
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 w-full overflow-hidden">
      <div className="px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2 sm:gap-4 max-w-full">
        {/* Left: Title & Subtitle */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 overflow-hidden">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base md:text-lg font-semibold text-slate-900 tracking-tight truncate">
                {tabTitles[currentTab] || "Care Workbench"}
              </h1>
              <span className="hidden xl:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200 shrink-0">
                Demo data
              </span>
            </div>
            <p className="hidden md:block text-xs text-slate-500 truncate mt-0.5">
              {currentTab === 'workQueue' && "Grounded Monday queue sequenced by workflow barriers, medication signals & transition risks."}
              {currentTab === 'member360' && "Timely, trustworthy, holistic view with side-by-side reconciliation."}
              {currentTab === 'outreach' && "Verified contact preferences, prior call history & AI-assisted draft notes."}
              {currentTab === 'carePlan' && "Accountable task orchestration preventing unassigned or orphaned workflows."}
            </p>
          </div>
        </div>

        {/* Center / Right: Global Search, Quick Tools, Notifications & User */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Global Search Bar */}
          <div className="relative w-28 sm:w-44 md:w-56 lg:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search member/ID..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-8 pr-6 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white transition-colors"
            />
            {searchQuery && (
              <button 
                onClick={() => onSearchChange('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                ×
              </button>
            )}
          </div>

          {/* Quick Member Selector */}
          <div className="relative hidden xl:block">
            <button
              onClick={() => setShowPatientMenu(!showPatientMenu)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <span className="text-slate-500">Member:</span>
              <span className="font-semibold text-slate-900 truncate max-w-[100px]">{activePatient.name}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showPatientMenu && (
              <div 
                className="absolute right-0 mt-1 w-64 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-40 text-xs"
                onMouseLeave={() => setShowPatientMenu(false)}
              >
                <div className="px-3 py-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  Switch Active Member (5 Profiles)
                </div>
                {PATIENTS.map(p => (
                  <button
                    key={p.id}
                    onClick={() => {
                      onSelectPatient(p.id);
                      setShowPatientMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 transition-colors ${p.id === selectedPatientId ? 'bg-blue-50/70 font-semibold text-blue-900' : 'text-slate-700'}`}
                  >
                    <div>
                      <div className="font-medium text-slate-900">{p.name}</div>
                      <div className="text-[10px] text-slate-400">{p.id} · {p.scenario}</div>
                    </div>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold ${p.workflowScore >= 70 ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'}`}>
                      {p.workflowScore}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Methodology Trigger */}
          <button
            onClick={onOpenMethodology}
            title="View Workflow Scoring Methodology"
            className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden 2xl:inline">Scoring Formula</span>
          </button>

          {/* Pilot Metrics Trigger */}
          <button
            onClick={onOpenMetrics}
            title="View Pilot Measurement Plan & Time ROI"
            className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-colors"
          >
            <BarChart3 className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden 2xl:inline">Pilot Targets</span>
          </button>

          {/* AI Boundaries Trigger */}
          <button
            onClick={onOpenAiBoundaries}
            title="Inspect AI Safety Boundaries & Clinical Guardrails"
            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-blue-700 bg-blue-50/70 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline">AI Guardrails</span>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              title="Recent Inbound Clinical & Data Alerts"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-600 rounded-full ring-2 ring-white"></span>
              )}
            </button>

            {showNotifications && (
              <div 
                className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in duration-100"
                onMouseLeave={() => setShowNotifications(false)}
              >
                <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-800">Inbound Feed Alerts</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-red-50 text-red-700 rounded-full font-medium">
                    {unreadCount} unread
                  </span>
                </div>
                <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                  {notifications.map(n => (
                    <div 
                      key={n.id} 
                      className={`p-3 text-xs hover:bg-slate-50 cursor-pointer ${n.unread ? 'bg-slate-50/50' : ''}`}
                      onClick={() => {
                        const pat = PATIENTS.find(p => n.patient.includes(p.id));
                        if (pat) onSelectPatient(pat.id);
                        setShowNotifications(false);
                      }}
                    >
                      <div className="flex items-start gap-2">
                        <AlertCircle className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${n.type === 'red' ? 'text-red-600' : 'text-amber-600'}`} />
                        <div className="space-y-0.5 flex-1 min-w-0">
                          <p className="font-semibold text-slate-900 leading-tight">{n.title}</p>
                          <p className="text-slate-600 text-[11px] truncate">{n.patient}</p>
                          <p className="text-slate-400 text-[10px]">{n.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Pill */}
          <div className="flex items-center gap-2 pl-1.5 sm:pl-2 border-l border-slate-200 shrink-0">
            <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold shrink-0">
              M
            </div>
            <div className="hidden 2xl:block text-left">
              <div className="text-xs font-semibold text-slate-900 leading-none">
                {DEMO_USER.badge}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5 leading-none">
                {DEMO_USER.caseload} active cases
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default TopBar;
