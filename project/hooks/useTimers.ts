import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Timer, TimerLog } from '../types/timer';

const TIMERS_STORAGE_KEY = '@timers';
const LOGS_STORAGE_KEY = '@timer_logs';

export function useTimers() {
  const [timers, setTimers] = useState<Timer[]>([]);
  const [logs, setLogs] = useState<TimerLog[]>([]);

  useEffect(() => {
    loadTimers();
    loadLogs();
  }, []);

  const loadTimers = async () => {
    try {
      const stored = await AsyncStorage.getItem(TIMERS_STORAGE_KEY);
      if (stored) {
        setTimers(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading timers:', error);
    }
  };

  const loadLogs = async () => {
    try {
      const stored = await AsyncStorage.getItem(LOGS_STORAGE_KEY);
      if (stored) {
        setLogs(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading logs:', error);
    }
  };

  const saveTimers = async (newTimers: Timer[]) => {
    try {
      await AsyncStorage.setItem(TIMERS_STORAGE_KEY, JSON.stringify(newTimers));
      setTimers(newTimers);
    } catch (error) {
      console.error('Error saving timers:', error);
    }
  };

  const saveLogs = async (newLogs: TimerLog[]) => {
    try {
      await AsyncStorage.setItem(LOGS_STORAGE_KEY, JSON.stringify(newLogs));
      setLogs(newLogs);
    } catch (error) {
      console.error('Error saving logs:', error);
    }
  };

  const addTimer = useCallback((timer: Omit<Timer, 'id' | 'createdAt' | 'status' | 'remainingTime'>) => {
    const newTimer: Timer = {
      id: Date.now().toString(),
      createdAt: Date.now(),
      status: 'idle',
      remainingTime: timer.duration,
      ...timer,
    };
    saveTimers([...timers, newTimer]);
  }, [timers]);

  const updateTimer = useCallback((id: string, updates: Partial<Timer>) => {
    const newTimers = timers.map(timer => 
      timer.id === id ? { ...timer, ...updates } : timer
    );
    saveTimers(newTimers);
  }, [timers]);

  const deleteTimer = useCallback((id: string) => {
    saveTimers(timers.filter(timer => timer.id !== id));
  }, [timers]);

  const addLog = useCallback((timer: Timer) => {
    const log: TimerLog = {
      id: Date.now().toString(),
      timerId: timer.id,
      timerName: timer.name,
      category: timer.category,
      completedAt: Date.now(),
      duration: timer.duration,
    };
    saveLogs([...logs, log]);
  }, [logs]);

  const startTimer = useCallback((id: string) => {
    updateTimer(id, { status: 'running' });
  }, [updateTimer]);

  const pauseTimer = useCallback((id: string) => {
    updateTimer(id, { status: 'paused' });
  }, [updateTimer]);

  const resetTimer = useCallback((id: string) => {
    const timer = timers.find(t => t.id === id);
    if (timer) {
      updateTimer(id, { 
        status: 'idle',
        remainingTime: timer.duration,
        completedAt: undefined
      });
    }
  }, [timers, updateTimer]);

  const completeTimer = useCallback((id: string) => {
    const timer = timers.find(t => t.id === id);
    if (timer) {
      updateTimer(id, { 
        status: 'completed',
        remainingTime: 0,
        completedAt: Date.now()
      });
      addLog(timer);
    }
  }, [timers, updateTimer, addLog]);

  return {
    timers,
    logs,
    addTimer,
    updateTimer,
    deleteTimer,
    startTimer,
    pauseTimer,
    resetTimer,
    completeTimer,
  };
}