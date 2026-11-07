import { useState } from 'react';
import { Sidebar } from './components/Sidebar.jsx';
import { TopBar } from './components/TopBar.jsx';
import { WorkQueuePage } from './pages/WorkQueuePage.jsx';
import { Member360Page } from './pages/Member360Page.jsx';
import { OutreachPage } from './pages/OutreachPage.jsx';
import { CarePlanPage } from './pages/CarePlanPage.jsx';
import { MethodologyModal } from './components/MethodologyModal.jsx';
import { MetricsModal } from './components/MetricsModal.jsx';
import { AiBoundariesModal } from './components/AiBoundariesModal.jsx';
import { PATIENTS, INITIAL_TASKS } from './data/mockData.js';
import { Menu } from 'lucide-react';

export function App() {
  const [currentTab, setCurrentTab] = useState<string>('workQueue');
  const [selectedPatientId, setSelectedPatientId] = useState<string>('P-1001'); // Default to Jordan Lee (rank #1)
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [tasks, setTasks] = useState<any[]>(INITIAL_TASKS);
  const [savedNotes, setSavedNotes] = useState<any[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Modals state
  const [isMethodologyOpen, setIsMethodologyOpen] = useState<boolean>(false);
  const [isMetricsOpen, setIsMetricsOpen] = useState<boolean>(false);
  const [isAiBoundariesOpen, setIsAiBoundariesOpen] = useState<boolean>(false);

  // Handlers
  const handleSelectPatient = (patientId: string) => {
    setSelectedPatientId(patientId);
  };

  const handleUpdateTaskStatus = (taskId: string, newStatus: string) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  };

  const handleUpdateTaskOwner = (taskId: string, newOwner: string) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, owner: newOwner } : t));
  };

  const handleAddTask = (newTask: any) => {
    setTasks(prev => [newTask, ...prev]);
  };

  const handleSaveNote = (newNote: any) => {
    setSavedNotes(prev => [newNote, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 overflow-x-hidden">
      <div className="flex-1 flex w-full min-w-0">
        {/* Left Persistent Sidebar */}
        <Sidebar
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          selectedPatientId={selectedPatientId}
          onSelectPatient={handleSelectPatient}
          isMobileOpen={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
          {/* Top Bar with Mobile Hamburger & Global Controls */}
          <div className="relative w-full">
            {/* Mobile menu trigger */}
            <div className="lg:hidden flex items-center justify-between px-4 py-2 bg-slate-900 text-white border-b border-slate-800">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
                aria-label="Open sidebar menu"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="font-bold text-sm">Care Workbench</div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-600 text-white font-medium">Demo</span>
            </div>

            <TopBar
              currentTab={currentTab}
              onSelectPatient={handleSelectPatient}
              selectedPatientId={selectedPatientId}
              onOpenMethodology={() => setIsMethodologyOpen(true)}
              onOpenMetrics={() => setIsMetricsOpen(true)}
              onOpenAiBoundaries={() => setIsAiBoundariesOpen(true)}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </div>

          {/* Dynamic Page Content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto min-w-0">
            {currentTab === 'workQueue' && (
              <WorkQueuePage
                patients={PATIENTS}
                onSelectPatient={(id: string) => {
                  handleSelectPatient(id);
                  setCurrentTab('member360');
                }}
                onOpenOutreach={() => setCurrentTab('outreach')}
                onOpenTasks={() => setCurrentTab('carePlan')}
                onOpenMethodology={() => setIsMethodologyOpen(true)}
                onOpenMetrics={() => setIsMetricsOpen(true)}
                selectedPatientId={selectedPatientId}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            )}

            {currentTab === 'member360' && (
              <Member360Page
                selectedPatientId={selectedPatientId}
                onSelectPatient={handleSelectPatient}
                onOpenOutreach={() => setCurrentTab('outreach')}
                onOpenTasks={() => setCurrentTab('carePlan')}
                onOpenMethodology={() => setIsMethodologyOpen(true)}
                tasks={tasks}
              />
            )}

            {currentTab === 'outreach' && (
              <OutreachPage
                selectedPatientId={selectedPatientId}
                onSelectPatient={handleSelectPatient}
                onSaveNote={handleSaveNote}
                onAcceptTask={handleAddTask}
                savedNotes={savedNotes}
                onOpenAiBoundaries={() => setIsAiBoundariesOpen(true)}
              />
            )}

            {currentTab === 'carePlan' && (
              <CarePlanPage
                tasks={tasks}
                onUpdateTaskStatus={handleUpdateTaskStatus}
                onUpdateTaskOwner={handleUpdateTaskOwner}
                onAddTask={handleAddTask}
                selectedPatientId={selectedPatientId}
                onSelectPatient={(id: string) => {
                  handleSelectPatient(id);
                  setCurrentTab('member360');
                }}
              />
            )}
          </main>

          {/* Persistent Footer */}
          <footer className="mt-auto border-t border-slate-200 bg-white py-3 px-4 sm:px-8 text-center text-xs text-slate-500">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto">
              <span className="font-medium text-slate-600">
                Care Workbench · <span className="font-normal italic">“A clearer next step for every member.”</span>
              </span>
              <span className="text-[11px] text-slate-400">
                Prototype only · Synthetic patient data · Not for clinical decision-making. HiLabs product concept.
              </span>
            </div>
          </footer>
        </div>
      </div>

      {/* Modals */}
      <MethodologyModal
        isOpen={isMethodologyOpen}
        onClose={() => setIsMethodologyOpen(false)}
      />

      <MetricsModal
        isOpen={isMetricsOpen}
        onClose={() => setIsMetricsOpen(false)}
      />

      <AiBoundariesModal
        isOpen={isAiBoundariesOpen}
        onClose={() => setIsAiBoundariesOpen(false)}
      />
    </div>
  );
}

export default App;
