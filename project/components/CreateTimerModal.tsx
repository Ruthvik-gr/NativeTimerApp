import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CreateTimerModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    duration: number;
    category: string;
    halfwayAlert: boolean;
  }) => void;
  categories: string[];
}

export function CreateTimerModal({
  visible,
  onClose,
  onSubmit,
  categories,
}: CreateTimerModalProps) {
  const [name, setName] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [category, setCategory] = useState('');
  const [halfwayAlert, setHalfwayAlert] = useState(false);
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  const handleSubmit = () => {
    const duration = parseInt(minutes) * 60 + parseInt(seconds || '0');
    if (!name || !duration) return;

    onSubmit({
      name,
      duration,
      category: showNewCategory ? newCategory : category,
      halfwayAlert,
    });

    // Reset form
    setName('');
    setMinutes('');
    setSeconds('');
    setCategory('');
    setHalfwayAlert(false);
    setShowNewCategory(false);
    setNewCategory('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.header}>
            <Text style={styles.title}>Create Timer</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#8E8E93" />
            </Pressable>
          </View>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Timer Name</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter timer name"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Duration</Text>
              <View style={styles.durationInputs}>
                <TextInput
                  style={[styles.input, styles.durationInput]}
                  value={minutes}
                  onChangeText={setMinutes}
                  placeholder="minutes"
                  keyboardType="number-pad"
                  maxLength={2}
                />
                <Text style={styles.durationSeparator}>:</Text>
                <TextInput
                  style={[styles.input, styles.durationInput]}
                  value={seconds}
                  onChangeText={setSeconds}
                  placeholder="seconds"
                  keyboardType="number-pad"
                  maxLength={2}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Category</Text>
              {!showNewCategory ? (
                <>
                  <View style={styles.categoryList}>
                    {categories.map(cat => (
                      <Pressable
                        key={cat}
                        style={[
                          styles.categoryChip,
                          category === cat && styles.categoryChipSelected,
                        ]}
                        onPress={() => setCategory(cat)}>
                        <Text
                          style={[
                            styles.categoryChipText,
                            category === cat && styles.categoryChipTextSelected,
                          ]}>
                          {cat}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                  <Pressable
                    onPress={() => setShowNewCategory(true)}
                    style={styles.newCategoryButton}>
                    <Ionicons name="add" size={20} color="#007AFF" />
                    <Text style={styles.newCategoryButtonText}>
                      Add New Category
                    </Text>
                  </Pressable>
                </>
              ) : (
                <TextInput
                  style={styles.input}
                  value={newCategory}
                  onChangeText={setNewCategory}
                  placeholder="Enter new category name"
                />
              )}
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.switchRow}>
                <Text style={styles.label}>Halfway Alert</Text>
                <Switch
                  value={halfwayAlert}
                  onValueChange={setHalfwayAlert}
                  trackColor={{ false: '#D1D1D6', true: '#007AFF' }}
                />
              </View>
            </View>

            <Pressable
              style={[styles.button, !name || !minutes ? styles.buttonDisabled : null]}
              onPress={handleSubmit}
              disabled={!name || !minutes}>
              <Text style={styles.buttonText}>Create Timer</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  closeButton: {
    padding: 8,
  },
  form: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D1D6',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  durationInputs: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  durationInput: {
    flex: 1,
    textAlign: 'center',
  },
  durationSeparator: {
    fontSize: 24,
    fontWeight: '600',
  },
  categoryList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F2F2F7',
  },
  categoryChipSelected: {
    backgroundColor: '#007AFF',
  },
  categoryChipText: {
    fontSize: 14,
    color: '#000000',
  },
  categoryChipTextSelected: {
    color: '#FFFFFF',
  },
  newCategoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
  },
  newCategoryButtonText: {
    color: '#007AFF',
    fontSize: 14,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#D1D1D6',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});