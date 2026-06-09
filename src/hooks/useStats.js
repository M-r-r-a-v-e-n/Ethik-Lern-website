import { useState, useEffect } from 'react';

export function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [key, value]);

  return [value, setValue];
}

export function useStats() {
  const [stats, setStats] = useLocalStorage('ethik_stats_v2', {
    sessions: [],
    totalCorrect: 0,
    totalWrong: 0,
  });
  const [wrongIds, setWrongIds] = useLocalStorage('ethik_wrong_v2', []);
  const [learnedTopics, setLearnedTopics] = useLocalStorage('ethik_learned', []);

  function addSession(correct, wrong, mode) {
    const pct = correct + wrong > 0 ? Math.round(correct / (correct + wrong) * 100) : 0;
    setStats(prev => ({
      totalCorrect: (prev.totalCorrect || 0) + correct,
      totalWrong: (prev.totalWrong || 0) + wrong,
      sessions: [...(prev.sessions || []), {
        date: new Date().toLocaleDateString('de-DE'),
        correct, wrong, mode, pct,
        ts: Date.now(),
      }].slice(-20),
    }));
  }

  function updateWrongIds(newWrongIds, correctedIds) {
    setWrongIds(prev => {
      const merged = [...new Set([...prev, ...newWrongIds])];
      return merged.filter(id => !correctedIds.includes(id));
    });
  }

  function markTopicLearned(topicId) {
    setLearnedTopics(prev => prev.includes(topicId) ? prev : [...prev, topicId]);
  }

  function resetAll() {
    setStats({ sessions: [], totalCorrect: 0, totalWrong: 0 });
    setWrongIds([]);
    setLearnedTopics([]);
  }

  return { stats, wrongIds, learnedTopics, addSession, updateWrongIds, markTopicLearned, resetAll };
}
