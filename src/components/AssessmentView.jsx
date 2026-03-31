import React, { useState } from 'react';
import { aiService } from '../services/aiService';
import { useProgress } from '../store/ProgressContext';
import { CheckCircle2, XCircle, ArrowRight, Loader2 } from 'lucide-react';

export const AssessmentView = ({ worksheet, onComplete }) => {
  const { recordAssessment } = useProgress();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  
  const question = worksheet.questions[currentIndex];
  const isAnswered = feedback[currentIndex] !== undefined;
  const isCorrect = feedback[currentIndex]?.isCorrect;

  const handleOptionSelect = (option) => {
    if (isAnswered) return;
    setAnswers({ ...answers, [currentIndex]: option });
    const correct = option === question.correctAnswer;
    setFeedback({ ...feedback, [currentIndex]: { isCorrect: correct, text: question.explanation, score: correct ? 1 : 0 } });
  };

  const handleTextSubmit = async () => {
    if (isAnswered || !answers[currentIndex]) return;
    setIsEvaluating(true);
    try {
      const result = await aiService.evaluateOpenEndedResponse(question, answers[currentIndex]);
      setFeedback({ ...feedback, [currentIndex]: result });
    } catch (e) {
      console.error(e);
    } finally {
      setIsEvaluating(false);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < worksheet.questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      finishAssessment();
    }
  };

  const finishAssessment = () => {
    // Calculate total score
    let totalScore = 0;
    let maxScore = 0;
    
    worksheet.questions.forEach((q, idx) => {
      maxScore += q.type === 'OEQ' ? 2 : 1;
      totalScore += feedback[idx]?.score || 0;
    });

    const percentage = Math.round((totalScore / maxScore) * 100);
    recordAssessment(worksheet.themeId, percentage, { questions: worksheet.questions, feedback });
    setIsFinished(true);
  };

  if (isFinished) {
    // Calculate percentage
    let totalScore = 0;
    let maxScore = 0;
    worksheet.questions.forEach((q, idx) => {
      maxScore += q.type === 'OEQ' ? 2 : 1;
      totalScore += feedback[idx]?.score || 0;
    });
    const percentage = Math.round((totalScore / maxScore) * 100);

    return (
      <div className="glass-card animate-fade-in flex flex-col items-center justify-center p-8 text-center" style={{ minHeight: '50vh', maxWidth: '600px', margin: '2rem auto', padding: '3rem 2rem' }}>
        <CheckCircle2 color="var(--success-color)" size={64} style={{ marginBottom: '1rem' }} />
        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Assessment Complete!</h2>
        <p style={{ fontSize: '1.25rem', color: percentage > 70 ? 'var(--success-color)' : 'var(--warning-color)' }}>
          You scored {percentage}%
        </p>
        <p style={{ color: 'var(--text-secondary)', marginTop: '1rem', marginBottom: '2rem' }}>
          Your proficiency mastery has been updated. Keep up the great work!
        </p>
        <button className="btn btn-primary" onClick={onComplete}>Back to Dashboard</button>
      </div>
    );
  }

  return (
    <div className="assessment-container animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
      <div className="flex justify-between items-center" style={{ marginBottom: '2rem' }}>
        <div>
          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--primary-color)' }}>{question.theme} &middot; {question.topic}</span>
          <h2 style={{ fontSize: '1.5rem', marginTop: '0.25rem' }}>Question {currentIndex + 1} of {worksheet.questions.length}</h2>
        </div>
        <div style={{ padding: '0.5rem 1rem', background: 'var(--surface-color)', borderRadius: '99px', fontSize: '0.875rem', fontWeight: 'bold' }}>
          Difficulty: {question.difficulty}
        </div>
      </div>

      <div className="glass-card" style={{ padding: '2rem' }}>
        <p style={{ fontSize: '1.25rem', marginBottom: '2rem', lineHeight: 1.6 }}>{question.text}</p>
        
        {question.type === 'MCQ' ? (
          <div className="flex flex-col" style={{ gap: '1rem' }}>
            {question.options.map(opt => {
              let btnClass = 'btn-secondary';
              if (isAnswered) {
                if (opt === question.correctAnswer) btnClass = 'btn-primary';
                else if (answers[currentIndex] === opt) btnClass = 'btn-primary btn-incorrect'; // Custom style
              } else if (answers[currentIndex] === opt) {
                btnClass = 'btn-primary';
              }

              return (
                <button 
                  key={opt}
                  className={`btn ${btnClass}`}
                  style={{ 
                    justifyContent: 'flex-start', 
                    padding: '1rem 1.5rem', 
                    fontSize: '1rem',
                    backgroundColor: isAnswered && opt === question.correctAnswer ? 'var(--success-color)' : (isAnswered && answers[currentIndex] === opt ? 'var(--error-color)' : ''),
                    borderColor: isAnswered ? 'transparent' : 'currentcolor',
                    color: isAnswered && (opt === question.correctAnswer || answers[currentIndex] === opt) ? 'white' : ''
                  }}
                  onClick={() => handleOptionSelect(opt)}
                  disabled={isAnswered}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col" style={{ gap: '1rem' }}>
            <textarea 
              className="input-field textarea-field" 
              placeholder="Type your explanation here..."
              value={answers[currentIndex] || ''}
              onChange={(e) => {
                if (!isAnswered && !isEvaluating) {
                  setAnswers({...answers, [currentIndex]: e.target.value});
                }
              }}
              disabled={isAnswered || isEvaluating}
            />
            {!isAnswered && (
              <button 
                className="btn btn-primary" 
                onClick={handleTextSubmit}
                disabled={!answers[currentIndex] || isEvaluating}
                style={{ alignSelf: 'flex-end' }}
              >
                {isEvaluating ? <><Loader2 className="animate-pulse" size={18} /> Evaluating...</> : 'Submit Answer'}
              </button>
            )}
          </div>
        )}

        {isAnswered && feedback[currentIndex] && (
          <div className="animate-fade-in" style={{ 
            marginTop: '2rem', 
            padding: '1.5rem', 
            borderRadius: '8px', 
            backgroundColor: isCorrect ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            border: `1px solid ${isCorrect ? 'var(--success-color)' : 'var(--error-color)'}`
          }}>
            <div className="flex items-center" style={{ gap: '0.5rem', marginBottom: '0.5rem', color: isCorrect ? 'var(--success-color)' : 'var(--error-color)', fontWeight: 'bold' }}>
              {isCorrect ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
              <span>{isCorrect ? 'Correct!' : 'Needs Improvement'}</span>
            </div>
            <p style={{ color: 'var(--text-primary)' }}>{feedback[currentIndex].text || feedback[currentIndex].feedback}</p>
            
            <div className="flex justify-end" style={{ marginTop: '1.5rem' }}>
              <button className="btn btn-primary" onClick={nextQuestion}>
                {currentIndex < worksheet.questions.length - 1 ? 'Next Question' : 'Finish Assessment'} <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
