import { CheckSquare, ShieldCheck } from 'lucide-react';
import { TaskList } from '../components/TaskList.jsx';

export function CarePlanPage({ 
  tasks, 
  onUpdateTaskStatus, 
  onUpdateTaskOwner, 
  onAddTask,
  selectedPatientId,
  onSelectPatient 
}) {
  return (
    <div className="space-y-6">
      {/* Informational Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-blue-100 text-blue-700 rounded-xl shrink-0 mt-0.5">
            <CheckSquare className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Care Plan & Accountable Task Orchestration
            </h2>
            <p className="text-xs text-slate-500 mt-0.5 max-w-2xl">
              Eliminating orphan tasks and repeated handoff delays. Every clinical and social task has an assigned owner, clear due date, and visible clinical provenance.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto text-xs bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span className="font-semibold text-slate-800">Target: 95% Owned Tasks</span>
        </div>
      </div>

      {/* Main Task List Component */}
      <TaskList
        tasks={tasks}
        onUpdateTaskStatus={onUpdateTaskStatus}
        onUpdateTaskOwner={onUpdateTaskOwner}
        onAddTask={onAddTask}
        selectedPatientId={selectedPatientId}
        onSelectPatient={onSelectPatient}
      />
    </div>
  );
}

export default CarePlanPage;
