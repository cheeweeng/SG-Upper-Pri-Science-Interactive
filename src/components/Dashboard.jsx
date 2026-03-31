import React from 'react';
import { useProgress } from '../store/ProgressContext';
import { THEMES } from '../models/curriculum';
import { Target, TrendingUp, BookOpen, Activity, PlayCircle } from 'lucide-react';

const icons = {
  diversity: <BookOpen className="icon" size={24} />,
  cycles: <Activity className="icon" size={24} />,
  systems: <Target className="icon" size={24} />,
  energy: <TrendingUp className="icon" size={24} />,
  interactions: <PlayCircle className="icon" size={24} />,
};

const WheelProgress = ({ score, name, icon }) => {
  // Simple circle math
  const radius = 43.75;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  
  // Decide color based on score
  let color = 'var(--error-color)';
  if (score > 70) color = 'var(--success-color)';
  else if (score > 45) color = 'var(--warning-color)';

  return (
    <div className="wheel-container">
      <div className="wheel-svg-wrapper">
        <svg width="125" height="125" className="wheel-svg">
          <circle
            cx="62.5"
            cy="62.5"
            r={radius}
            stroke="#e2e8f0"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="62.5"
            cy="62.5"
            r={radius}
            stroke={color}
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90 62.5 62.5)"
            style={{ transition: 'stroke-dashoffset 1s ease-out' }}
          />
        </svg>
        <div className="wheel-center">
          <span className="wheel-score">{score}%</span>
        </div>
      </div>
      <div className="wheel-info">
        <h4 className="wheel-title">{name}</h4>
        <div className="wheel-icon" style={{ color }}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export const Dashboard = ({ onStartWorksheet }) => {
  const { proficiencies } = useProgress();

  return (
    <div className="dashboard-container animate-fade-in">
      <header className="dashboard-header flex justify-between items-center glass-card">
        <div>
          <h2>Welcome back, Scientist! 🔬</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Ready to explore the universe?</p>
        </div>
        <button className="btn btn-primary" onClick={() => onStartWorksheet()}>
          <PlayCircle size={18} /> Generate New Worksheet
        </button>
      </header>
      
      <div className="dashboard-content grid-cols-2">
        <div className="glass-card mastery-section">
          <h3>Your Theme Mastery</h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            Based on MOE Upper Primary Science Syllabus
          </p>
          <div className="wheels-grid">
            {THEMES.map(theme => (
              <WheelProgress 
                key={theme.id}
                name={theme.name}
                score={proficiencies[theme.id] || 0}
                icon={icons[theme.id]}
              />
            ))}
          </div>
        </div>

        <div className="glass-card focus-section">
          <h3>Focus Areas</h3>
          <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            AI-identified areas for improvement
          </p>
          
          <div className="focus-cards">
            {THEMES.sort((a, b) => proficiencies[a.id] - proficiencies[b.id]).slice(0, 2).map((theme, i) => (
              <div key={theme.id} className="focus-card" style={{ 
                borderLeft: `4px solid ${i===0 ? 'var(--error-color)' : 'var(--warning-color)'}`,
                padding: '1rem',
                backgroundColor: 'var(--background-color)',
                borderRadius: '8px',
                marginBottom: '1rem'
              }}>
                <h4 style={{ marginBottom: '0.25rem' }}>{theme.name}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Current mastery is {proficiencies[theme.id]}%. Let's work on {theme.description.toLowerCase()} together.
                </p>
                <button className="btn btn-secondary" style={{ marginTop: '0.75rem', padding: '0.4rem 0.8rem', fontSize: '0.75rem' }} onClick={() => onStartWorksheet(theme.id)}>
                  Practice {theme.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style>{`
        .dashboard-container { padding: 2rem 0; display: flex; flex-direction: column; gap: 2rem; }
        .dashboard-header { padding: 1.5rem 2rem; }
        .mastery-section, .focus-section { padding: 2rem; }
        .wheels-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 1.5rem; }
        .wheel-container { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 0.5rem; }
        .wheel-svg-wrapper { position: relative; width: 125px; height: 125px; }
        .wheel-center { position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }
        .wheel-score { font-weight: 700; font-size: 1.1rem; color: var(--text-primary); }
        .wheel-title { font-size: 0.9rem; margin-bottom: 0.25rem; }
        .wheel-icon { margin-top: 0.25rem; display: flex; justify-content: center; }
      `}</style>
    </div>
  );
};
