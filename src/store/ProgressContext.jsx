import React, { createContext, useContext, useState, useEffect } from 'react';
import { THEMES } from '../models/curriculum';

const ProgressContext = createContext();

export const useProgress = () => useContext(ProgressContext);

export const ProgressProvider = ({ children }) => {
  // Initialize with some mock proficiency data for demonstration
  // Proficiency is a score between 0 and 100
  const [proficiencies, setProficiencies] = useState({
    diversity: 65,
    cycles: 80,
    systems: 40, // Needs improvement
    energy: 55,
    interactions: 70,
  });

  const [assessmentHistory, setAssessmentHistory] = useState([]);

  // Mock function to update progress after an assessment is completed
  const recordAssessment = (themeId, score, details) => {
    const newHistory = [...assessmentHistory, { themeId, score, details, date: new Date().toISOString() }];
    setAssessmentHistory(newHistory);

    // Simple moving average to update proficiency
    setProficiencies(prev => {
      const current = prev[themeId];
      // Move 20% toward the recent score
      const updated = Math.round(current * 0.8 + score * 0.2);
      return { ...prev, [themeId]: updated };
    });
  };

  return (
    <ProgressContext.Provider value={{
      proficiencies,
      assessmentHistory,
      recordAssessment
    }}>
      {children}
    </ProgressContext.Provider>
  );
};
