import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Pressable,
  Modal,
  Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTimers } from '../../hooks/useTimers';
import { CategoryGroup } from '../../components/CategoryGroup';
import { CreateTimerModal } from '../../components/CreateTimerModal';
import { Timer } from '../../types/timer';

export default function TimersScreen() {
  const {
    timers,
    addTimer,
    startTimer,
    pauseTimer,
    resetTimer,
    completeTimer,
    updateTimer,
  } = useTimers();
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [completedTimer, setCompletedTimer] = useState<Timer | null>(null);

  // Group timers by category
  const timersByCategory = timers.reduce((acc, timer) => {
    if (!acc[timer.category]) {
      acc[timer.category] = [];
    }
    acc[timer.category].push(timer);
    return acc;
  }, {} as Record<string, Timer[]>);

  // Get unique categories
  const categories = Object.keys(timersByCategory);

  useEffect(() => {
    const interval = setInterval(() => {
      timers.forEach(timer => {
        if (timer.status === 'running' && timer.remainingTime > 0) {
          const newRemainingTime = timer.remainingTime - 1;

          if (newRemainingTime === 0) {
            completeTimer(timer.id);
            setCompletedTimer(timer);
            setShowCompletionModal(true);
          } else if (timer.halfwayAlert && newRemainingTime === Math.floor(timer.duration / 2)) {
            // Show halfway alert
            alert(`${timer.name} is halfway done!`);
          }

          updateTimer(timer.id, { remainingTime: newRemainingTime });
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timers, completeTimer, updateTimer]);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  const handleStartAll = (category: string) => {
    timersByCategory[category].forEach(timer => {
      if (timer.status !== 'completed') {
        startTimer(timer.id);
      }
    });
  };

  const handlePauseAll = (category: string) => {
    timersByCategory[category].forEach(timer => {
      if (timer.status === 'running') {
        pauseTimer(timer.id);
      }
    });
  };

  const handleResetAll = (category: string) => {
    timersByCategory[category].forEach(timer => {
      resetTimer(timer.id);
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {categories.map(category => (
          <CategoryGroup
            key={category}
            category={category}
            timers={timersByCategory[category]}
            expanded={expandedCategories.has(category)}
            onToggle={() => toggleCategory(category)}
            onStartAll={() => handleStartAll(category)}
            onPauseAll={() => handlePauseAll(category)}
            onResetAll={() => handleResetAll(category)}
            onTimerStart={startTimer}
            onTimerPause={pauseTimer}
            onTimerReset={resetTimer}
          />
        ))}
      </ScrollView>

      <Pressable
        style={styles.fab}
        onPress={() => setShowCreateModal(true)}>
        <Ionicons name="add" size={24} color="#FFFFFF" />
      </Pressable>

      <CreateTimerModal
        visible={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={addTimer}
        categories={categories}
      />

      <Modal
        visible={showCompletionModal}
        transparent={true}
        animationType="fade">
        <View style={styles.completionModalContainer}>
          <View style={styles.completionModalContent}>
            <Ionicons name="checkmark-circle" size={64} color="#34C759" />
            <Text style={styles.completionModalTitle}>Timer Complete!</Text>
            {completedTimer && (
              <Text style={styles.completionModalText}>
                {completedTimer.name} has finished
              </Text>
            )}
            <Pressable
              style={styles.completionModalButton}
              onPress={() => setShowCompletionModal(false)}>
              <Text style={styles.completionModalButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  completionModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  completionModalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    gap: 16,
  },
  completionModalTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
  },
  completionModalText: {
    fontSize: 16,
    color: '#8E8E93',
  },
  completionModalButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  completionModalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});