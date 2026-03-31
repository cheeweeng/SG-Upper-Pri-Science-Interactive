import React, { useState, useEffect } from 'react';
import { aiService } from '../services/aiService';
import { useProgress } from '../store/ProgressContext';
import { THEMES } from '../models/curriculum';
import { Loader2, ArrowLeft, Cpu } from 'lucide-react';

export const WorksheetGenerator = ({ initialThemeId, onWorksheetGenerated, onCancel }) => {
  const { proficiencies } = useProgress();
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(initialThemeId || THEMES[0].id);
  const [questionCount, setQuestionCount] = useState(10);
  const [level, setLevel] = useState('Primary 4');

  const startGeneration = async () => {
    setIsGenerating(true);
    try {
      const currentProficiency = proficiencies[selectedTheme] || 0;
      const worksheet = await aiService.generateWorksheet(selectedTheme, currentProficiency, questionCount, level);
      onWorksheetGenerated(worksheet);
    } catch (error) {
      console.error("Failed to generate worksheet", error);
      setIsGenerating(false);
    }
  };

  if (isGenerating) {
    return (
      <div className="generator-container animate-fade-in flex flex-col items-center justify-center glass-card" style={{ padding: '4rem', textAlign: 'center', minHeight: '60vh' }}>
        <Loader2 className="animate-pulse" size={64} color="var(--primary-color)" style={{ animation: 'spin 2s linear infinite' }} />
        <h2 style={{ marginTop: '2rem' }}>AI is crafting your worksheet...</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
          Analyzing your proficiency in {THEMES.find(t => t.id === selectedTheme)?.name.toLowerCase()} and selecting the best questions.
        </p>
        <style>{`
          @keyframes spin { 100% { transform: rotate(360deg); } }
        `}</style>
      </div>
    );
  }

  return (
    <div className="generator-container animate-fade-in">
      <button className="btn btn-outline" style={{ marginBottom: '1.5rem' }} onClick={onCancel}>
        <ArrowLeft size={16} /> Back to Dashboard
      </button>

      <div className="glass-card" style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
        <div className="flex items-center" style={{ gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ padding: '0.5rem', background: 'var(--primary-color)', borderRadius: '8px', color: 'white' }}>
            <Cpu size={24} />
          </div>
          <h2>Generate Adaptive Worksheet</h2>
        </div>
        
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Our AI analyzes your past performance to create questions tailored to your skill level. 
          Choose a theme to focus on.
        </p>

        <div className="input-group">
          <label className="input-label">Select Theme</label>
          <select 
            className="input-field" 
            value={selectedTheme} 
            onChange={(e) => setSelectedTheme(e.target.value)}
          >
            {THEMES.map(theme => (
              <option key={theme.id} value={theme.id}>
                {theme.name} (Proficiency: {proficiencies[theme.id]}%)
              </option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label className="input-label">Grade Level</label>
          <div className="flex" style={{ gap: '1rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
            {['Primary 4', 'Primary 5', 'Primary 6'].map(lvl => (
              <button 
                key={lvl}
                className={level === lvl ? 'btn btn-primary' : 'btn btn-secondary'}
                onClick={() => setLevel(lvl)}
                style={{ flex: 1 }}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        <div className="input-group">
          <label className="input-label">Number of Questions</label>
          <div className="flex" style={{ gap: '1rem', marginTop: '0.5rem' }}>
            {[10, 20, 30].map(num => (
              <button 
                key={num}
                className={questionCount === num ? 'btn btn-primary' : 'btn btn-secondary'}
                onClick={() => setQuestionCount(num)}
                style={{ flex: 1 }}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <button className="btn btn-primary" style={{ width: '100%', padding: '1rem' }} onClick={startGeneration}>
            <Cpu size={18} /> Generate Worksheet Path
          </button>
        </div>
      </div>
    </div>
  );
};
