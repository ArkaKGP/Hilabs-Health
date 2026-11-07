import React, { useState } from 'react';
import { 
  Plus, Filter, Activity, ShieldCheck 
} from 'lucide-react';
import { PATIENTS } from '../data/mockData.js';

export function TaskList({ 
  tasks, 
  onUpdateTaskStatus, 
  onUpdateTaskOwner, 
  onAddTask,
  selectedPatientId,
  onSelectPatient 
}) {
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [patientFilter, setPatientFilter] = useState(selectedPatientId || 'All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [activityLog, setActivityLog] = useState([
    { id: 1, text: "Assigned Dr. Rao verification task to Maria · RN", time: "08:15 AM", type: "assign" },
    { id: 2, text: "Created home-support rescheduling task for Evelyn Carter", time: "08:05 AM", type: "create" },
    { id: 3, text: "Orphaned diabetes task claimed by Maria · RN", time: "07:50 AM", type: "claim" }
  ]);

  // New task form state
  const [newTask, setNewTask] = useState({
    title: "",
    patientId: selectedPatientId || "P-1001",
    owner: "Maria · RN",
    priority: "High",
    dueDate: "2026-11-04",
    category: "Care Coordination",
    reason: ""
  });

  const availableOwners = [
    "Maria · RN",
    "Clinic Coordinator",
    "Social Work Specialist",
    "Outreach Assistant",
    "Community Health Worker",
    "Compliance / Records",
    "Unassigned (Warning)"
  ];

  // Filter tasks
  const filteredTasks = tasks.filter(t => {
    if (statusFilter !== 'All' && t.status !== statusFilter) return false;
    if (priorityFilter !== 'All' && t.priority !== priorityFilter) return false;
    if (patientFilter !== 'All' && t.patientId !== patientFilter) return false;
    return true;
  });

  const handleStatusChange = (taskId, newStatus) => {
    onUpdateTaskStatus(taskId, newStatus);
    const target = tasks.find(t => t.id === taskId);
    setActivityLog([
      { 
        id: Date.now(), 
        text: `Updated "${target?.title?.slice(0, 32)}..." status to ${newStatus}`, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
        type: "status" 
      },
      ...activityLog.slice(0, 7)
    ]);
  };

  const handleOwnerChange = (taskId, newOwner) => {
    onUpdateTaskOwner(taskId, newOwner);
    const target = tasks.find(t => t.id === taskId);
    setActivityLog([
      { 
        id: Date.now(), 
        text: `Assigned "${target?.title?.slice(0, 32)}..." to ${newOwner}`, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
        type: "owner" 
      },
      ...activityLog.slice(0, 7)
    ]);
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    const patientObj = PATIENTS.find(p => p.id === newTask.patientId) || PATIENTS[0];

    const created = {
      id: `T-${Date.now()}`,
      title: newTask.title,
      patientId: patientObj.id,
      patientName: patientObj.name,
      owner: newTask.owner,
      priority: newTask.priority,
      dueDate: newTask.dueDate,
      status: "Not started",
      reason: newTask.reason || "Manual care management addition",
      category: newTask.category
    };

    onAddTask(created);
    setActivityLog([
      { 
        id: Date.now(), 
        text: `Created new task for ${patientObj.name}: "${newTask.title.slice(0, 30)}..."`, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
        type: "create" 
      },
      ...activityLog.slice(0, 7)
    ]);

    setShowAddModal(false);
    setNewTask({
      title: "",
      patientId: selectedPatientId || "P-1001",
      owner: "Maria · RN",
      priority: "High",
      dueDate: new Date().toISOString().split('T')[0],
      category: "Care Coordination",
      reason: ""
    });
  };

  const unassignedCount = tasks.filter(t => !t.owner || t.owner.includes("Unassigned") || t.owner.trim() === "").length;

  return (
    <div className="space-y-6">
      {/* Top Banner: Accountable Task Orchestration */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Metric Cards (8 cols) */}
        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-xs">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Total Open Tasks</span>
            <span className="text-2xl font-bold text-slate-900 tabular-nums">{tasks.length}</span>
            <span className="text-[11px] text-slate-500 block mt-0.5">Across 5 cohort members</span>
          </div>
          <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-xs">
            <span className="text-[10px] font-semibold text-red-600 uppercase tracking-wider block">High Priority</span>
            <span className="text-2xl font-bold text-red-700 tabular-nums">{tasks.filter(t => t.priority === 'High').length}</span>
            <span className="text-[11px] text-red-600/80 block mt-0.5">Due today / immediate</span>
          </div>
          <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-xs">
            <span className="text-[10px] font-semibold text-blue-600 uppercase tracking-wider block">In Progress</span>
            <span className="text-2xl font-bold text-blue-700 tabular-nums">{tasks.filter(t => t.status === 'In progress').length}</span>
            <span className="text-[11px] text-blue-600/80 block mt-0.5">Active clinician review</span>
          </div>
          <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-xs">
            <span className="text-[10px] font-semibold text-amber-600 uppercase tracking-wider block">Orphaned Tasks</span>
            <span className="text-2xl font-bold text-amber-700 tabular-nums">{unassignedCount}</span>
            <span className="text-[11px] text-amber-700 block mt-0.5">Ownerless alerts</span>
          </div>
        </div>

        {/* Real-time Activity Log (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-blue-600" />
                Live Workflow Audit Log
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Immediate State</span>
            </div>
            <div className="space-y-1.5 max-h-24 overflow-y-auto pr-1">
              {activityLog.map((act) => (
                <div key={act.id} className="text-[11px] text-slate-600 flex items-start justify-between gap-2 border-b border-slate-50 pb-1">
                  <span className="truncate">{act.text}</span>
                  <span className="text-[10px] text-slate-400 font-mono shrink-0">{act.time}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-100 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            <span>Prevents duplicate & orphan tasks</span>
          </div>
        </div>
      </div>

      {/* Filter and Action Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-3 sm:p-4 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>

            {/* Member Filter */}
            <select
              value={patientFilter}
              onChange={(e) => setPatientFilter(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="All">All Cohort Members ({PATIENTS.length})</option>
              {PATIENTS.map(p => (
                <option key={p.id} value={p.id}>{p.name} ({p.id})</option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="All">All Statuses</option>
              <option value="Not started">Not started</option>
              <option value="In progress">In progress</option>
              <option value="Waiting">Waiting</option>
              <option value="Done">Done</option>
            </select>

            {/* Priority Filter */}
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="All">All Priorities</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
            </select>

            {(statusFilter !== 'All' || priorityFilter !== 'All' || patientFilter !== 'All') && (
              <button
                onClick={() => {
                  setStatusFilter('All');
                  setPriorityFilter('All');
                  setPatientFilter('All');
                }}
                className="text-xs text-blue-600 hover:text-blue-800 font-medium px-2 py-1"
              >
                Reset filters
              </button>
            )}
          </div>

          {/* Add Task Button */}
          <div className="flex items-center gap-2 self-end lg:self-auto">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Care Plan Task</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tasks Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Task & Clinical Reason</th>
                <th className="py-3 px-4">Member</th>
                <th className="py-3 px-4">Owner (Accountable)</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTasks.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-slate-400">
                    No care plan tasks match the selected criteria.
                  </td>
                </tr>
              ) : (
                filteredTasks.map((t) => {
                  const isDone = t.status === "Done";
                  const isOrphan = !t.owner || t.owner.includes("Unassigned") || t.owner.trim() === "";

                  return (
                    <tr 
                      key={t.id} 
                      className={`hover:bg-slate-50/70 transition-colors ${
                        isDone ? 'bg-slate-50/40 opacity-75' : isOrphan ? 'bg-amber-50/30' : ''
                      }`}
                    >
                      {/* Task Title & Reason */}
                      <td className="py-3 px-4 max-w-md">
                        <div className="font-semibold text-slate-900 leading-snug flex items-center gap-2">
                          <span className={isDone ? 'line-through text-slate-400' : ''}>
                            {t.title}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-2">
                          <span className="text-slate-400 font-mono">[{t.category}]</span>
                          <span>Signal: {t.reason}</span>
                        </div>
                      </td>

                      {/* Member */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <button
                          onClick={() => onSelectPatient(t.patientId)}
                          className="font-medium text-slate-800 hover:text-blue-600 transition-colors flex items-center gap-1"
                        >
                          <span>{t.patientName}</span>
                          <span className="text-[10px] text-slate-400 font-mono">({t.patientId})</span>
                        </button>
                      </td>

                      {/* Accountable Owner Dropdown */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <select
                          value={t.owner}
                          onChange={(e) => handleOwnerChange(t.id, e.target.value)}
                          className={`text-xs rounded-md px-2 py-1 border font-medium focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                            isOrphan 
                              ? 'bg-red-50 text-red-700 border-red-300 font-bold' 
                              : 'bg-white text-slate-700 border-slate-200'
                          }`}
                        >
                          {availableOwners.map(o => (
                            <option key={o} value={o}>{o}</option>
                          ))}
                        </select>
                      </td>

                      {/* Priority */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                          t.priority === 'High' 
                            ? 'bg-red-50 text-red-700 border-red-200' 
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}>
                          {t.priority}
                        </span>
                      </td>

                      {/* Due Date */}
                      <td className="py-3 px-4 whitespace-nowrap font-mono text-slate-600 text-[11px]">
                        {t.dueDate}
                      </td>

                      {/* Status Dropdown */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <select
                          value={t.status}
                          onChange={(e) => handleStatusChange(t.id, e.target.value)}
                          className={`text-xs rounded-md px-2 py-1 border font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                            t.status === 'Done'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : t.status === 'In progress'
                              ? 'bg-blue-50 text-blue-800 border-blue-300'
                              : t.status === 'Waiting'
                              ? 'bg-amber-50 text-amber-800 border-amber-300'
                              : 'bg-slate-100 text-slate-700 border-slate-200'
                          }`}
                        >
                          <option value="Not started">Not started</option>
                          <option value="In progress">In progress</option>
                          <option value="Waiting">Waiting</option>
                          <option value="Done">Done</option>
                        </select>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div 
            className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-lg w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Add Accountable Care Plan Task</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-semibold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="p-6 space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Task Title:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Confirm furosemide 40mg script with Dr. Rao's office"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Assign to Member:</label>
                  <select
                    value={newTask.patientId}
                    onChange={(e) => setNewTask({ ...newTask, patientId: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    {PATIENTS.map(p => (
                      <option key={p.id} value={p.id}>{p.name} ({p.id})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Accountable Owner:</label>
                  <select
                    value={newTask.owner}
                    onChange={(e) => setNewTask({ ...newTask, owner: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    {availableOwners.filter(o => !o.includes('Unassigned')).map(o => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Priority:</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="High">High Priority</option>
                    <option value="Medium">Medium Priority</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Due Date:</label>
                  <input
                    type="date"
                    required
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Clinical / Interoperability Reason:</label>
                <input
                  type="text"
                  placeholder="e.g. Transition of care reconciliation protocol"
                  value={newTask.reason}
                  onChange={(e) => setNewTask({ ...newTask, reason: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3.5 py-1.5 text-slate-600 hover:text-slate-800 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 shadow-2xs"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskList;
