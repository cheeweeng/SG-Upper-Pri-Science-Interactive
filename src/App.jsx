import React, { useState } from 'react';
import { ProgressProvider } from './store/ProgressContext';
import { Dashboard } from './components/Dashboard';
import { WorksheetGenerator } from './components/WorksheetGenerator';
import { AssessmentView } from './components/AssessmentView';
import { Sparkles, GraduationCap } from 'lucide-react';
import './App.css';

function AppContent() {
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard', 'generator', 'assessment'
  const [activeThemeId, setActiveThemeId] = useState(null);
  const [currentWorksheet, setCurrentWorksheet] = useState(null);

  const startWorksheetGeneration = (themeId = null) => {
    setActiveThemeId(themeId);
    setCurrentView('generator');
  };

  const handleWorksheetGenerated = (worksheet) => {
    setCurrentWorksheet(worksheet);
    setCurrentView('assessment');
  };

  const handleAssessmentComplete = () => {
    setCurrentWorksheet(null);
    setCurrentView('dashboard');
  };

  const handleCancel = () => {
    setCurrentView('dashboard');
    setActiveThemeId(null);
  };

  return (
    <div className="app-layout" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <nav className="glass" style={{
        padding: '1rem 2rem', 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div className="flex items-center" style={{ gap: '0.75rem', color: 'var(--primary-color)' }}>
          <GraduationCap size={28} />
          <h1 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 800 }}>Science Interactive AI</h1>
        </div>
        <div className="flex items-center" style={{ gap: '0.5rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
          <Sparkles size={16} /> MOE Upper Primary
        </div>
      </nav>

      <main className="container" style={{ flex: 1, padding: '2rem 1.5rem', width: '100%' }}>
        {currentView === 'dashboard' && (
          <Dashboard onStartWorksheet={startWorksheetGeneration} />
        )}
        
        {currentView === 'generator' && (
          <WorksheetGenerator 
            initialThemeId={activeThemeId}
            onWorksheetGenerated={handleWorksheetGenerated}
            onCancel={handleCancel}
          />
        )}

        {currentView === 'assessment' && currentWorksheet && (
          <AssessmentView 
            worksheet={currentWorksheet}
            onComplete={handleAssessmentComplete}
          />
        )}
      </main>
      
      <footer style={{
        padding: '2rem',
        textAlign: 'center',
        color: 'var(--text-secondary)',
        fontSize: '0.875rem',
        marginTop: 'auto'
      }}>
        <p>Built based on the Singapore MOE Science Syllabus &middot; Powered by AI</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <ProgressProvider>
      <AppContent />
    </ProgressProvider>
  );
}

export default App;
