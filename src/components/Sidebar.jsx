import React from 'react';
import { 
  Inbox, UserCheck, PhoneCall, CheckSquare 
} from 'lucide-react';
import { PATIENTS } from '../data/mockData.js';

export function Sidebar({ 
  currentTab, 
  onSelectTab, 
  selectedPatientId, 
  onSelectPatient,
  isMobileOpen,
  onCloseMobile
}) {
  const navItems = [
    {
      id: 'workQueue',
      label: 'Work Queue',
      icon: Inbox,
      badge: '1 High · 4 Med',
      badgeClass: 'bg-red-500/20 text-red-200 border border-red-500/30'
    },
    {
      id: 'member360',
      label: 'Member 360',
      icon: UserCheck,
      badge: 'Holistic View',
      badgeClass: 'bg-blue-500/20 text-blue-200 border border-blue-500/30'
    },
    {
      id: 'outreach',
      label: 'Outreach & Notes',
      icon: PhoneCall,
      badge: 'AI Drafts',
      badgeClass: 'bg-emerald-500/20 text-emerald-200 border border-emerald-500/30'
    },
    {
      id: 'carePlan',
      label: 'Care Plan / Tasks',
      icon: CheckSquare,
      badge: 'Accountable',
      badgeClass: 'bg-slate-500/20 text-slate-300 border border-slate-500/30'
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar container */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 shrink-0 bg-slate-900 text-slate-200 flex flex-col border-r border-slate-800 transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:z-auto ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand / Header */}
        <div className="p-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-white text-base tracking-tight">Care Workbench</span>
              </div>
              <p className="text-[11px] text-slate-400 font-normal">A clearer next step for every member.</p>
            </div>
          </div>
          <div className="mt-2.5 flex items-center justify-between text-[10px]">
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium tracking-wide">
              HiLabs product concept
            </span>
            <span className="text-slate-400 font-mono">v1.0 MVP</span>
          </div>
        </div>

        {/* Primary Navigation */}
        <div className="p-3 space-y-1">
          <div className="px-3 py-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
            Navigation
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  if (onCloseMobile) onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-xs font-semibold' 
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${isActive ? 'bg-white/20 text-white' : item.badgeClass}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Member Quick Context */}
        <div className="px-3 py-2 border-t border-slate-800/80">
          <div className="flex items-center justify-between px-3 py-1">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              Cohort Members ({PATIENTS.length})
            </span>
            <span className="text-[10px] text-slate-400">Queue Order</span>
          </div>
          <div className="space-y-1 mt-1">
            {PATIENTS.map((p, idx) => {
              const isSelected = p.id === selectedPatientId;
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    onSelectPatient(p.id);
                    if (currentTab === 'workQueue') onSelectTab('member360');
                    if (onCloseMobile) onCloseMobile();
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex items-center justify-between ${
                    isSelected 
                      ? 'bg-slate-800 text-white ring-1 ring-blue-500/50' 
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono text-slate-400">#{idx + 1}</span>
                      <span className={`font-medium truncate ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                        {p.name}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 truncate mt-0.5">
                      {p.id} · {p.scenario.split(' ')[0]}...
                    </div>
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded shrink-0 ${
                    p.workflowScore >= 70 ? 'bg-red-500/20 text-red-300' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {p.workflowScore}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* System & Clinical Guardrails Pill */}
        <div className="mt-auto p-3 border-t border-slate-800/80 bg-slate-950/40">
          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] space-y-1">
            <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Synthetic Clinic Sandbox</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              5 synthetic patient records · 50 multi-source feeds · Monday 8 AM scenario.
            </p>
          </div>
          <div className="mt-2 text-[10px] text-slate-400 text-center leading-tight">
            Prototype only · Not for clinical decisions.
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
