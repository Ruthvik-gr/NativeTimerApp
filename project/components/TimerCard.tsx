import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
} from 'react-native-reanimated';
import { Timer } from '../types/timer';

interface TimerCardProps {
  timer: Timer;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

export function TimerCard({ timer, onStart, onPause, onReset }: TimerCardProps) {
  const progress = useSharedValue(timer.remainingTime / timer.duration);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    progress.value = timer.remainingTime / timer.duration;
  }, [timer.remainingTime, timer.duration]);

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{timer.name}</Text>
        <Text style={styles.category}>{timer.category}</Text>
      </View>

      <View style={styles.progressContainer}>
        <Animated.View style={[styles.progressBar, progressStyle]} />
      </View>

      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>
          {formatTime(timer.remainingTime)}
        </Text>
        <Text style={styles.totalTime}>
          / {formatTime(timer.duration)}
        </Text>
      </View>

      <View style={styles.controls}>
        {timer.status === 'running' ? (
          <Pressable onPress={onPause} style={styles.button}>
            <Ionicons name="pause" size={24} color="#007AFF" />
          </Pressable>
        ) : (
          <Pressable onPress={onStart} style={styles.button}>
            <Ionicons name="play" size={24} color="#007AFF" />
          </Pressable>
        )}
        <Pressable onPress={onReset} style={styles.button}>
          <Ionicons name="refresh" size={24} color="#8E8E93" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  category: {
    fontSize: 14,
    color: '#8E8E93',
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  progressContainer: {
    height: 4,
    backgroundColor: '#F2F2F7',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#007AFF',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  timeText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
  },
  totalTime: {
    fontSize: 16,
    color: '#8E8E93',
    marginLeft: 4,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  button: {
    padding: 8,
  },
});