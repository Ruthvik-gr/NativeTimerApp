import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Timer } from '../types/timer';
import { TimerCard } from './TimerCard';

interface CategoryGroupProps {
  category: string;
  timers: Timer[];
  expanded: boolean;
  onToggle: () => void;
  onStartAll: () => void;
  onPauseAll: () => void;
  onResetAll: () => void;
  onTimerStart: (id: string) => void;
  onTimerPause: (id: string) => void;
  onTimerReset: (id: string) => void;
}

export function CategoryGroup({
  category,
  timers,
  expanded,
  onToggle,
  onStartAll,
  onPauseAll,
  onResetAll,
  onTimerStart,
  onTimerPause,
  onTimerReset,
}: CategoryGroupProps) {
  const hasRunningTimers = timers.some(timer => timer.status === 'running');

  return (
    <View style={styles.container}>
      <Pressable onPress={onToggle} style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons
            name={expanded ? 'chevron-down' : 'chevron-forward'}
            size={20}
            color="#8E8E93"
          />
          <Text style={styles.title}>{category}</Text>
          <Text style={styles.count}>({timers.length})</Text>
        </View>
        <View style={styles.actions}>
          {hasRunningTimers ? (
            <Pressable onPress={onPauseAll} style={styles.actionButton}>
              <Ionicons name="pause" size={20} color="#007AFF" />
            </Pressable>
          ) : (
            <Pressable onPress={onStartAll} style={styles.actionButton}>
              <Ionicons name="play" size={20} color="#007AFF" />
            </Pressable>
          )}
          <Pressable onPress={onResetAll} style={styles.actionButton}>
            <Ionicons name="refresh" size={20} color="#8E8E93" />
          </Pressable>
        </View>
      </Pressable>

      {expanded && (
        <View style={styles.timers}>
          {timers.map(timer => (
            <TimerCard
              key={timer.id}
              timer={timer}
              onStart={() => onTimerStart(timer.id)}
              onPause={() => onTimerPause(timer.id)}
              onReset={() => onTimerReset(timer.id)}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    marginHorizontal: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  count: {
    fontSize: 14,
    color: '#8E8E93',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    padding: 4,
  },
  timers: {
    marginTop: 8,
  },
});