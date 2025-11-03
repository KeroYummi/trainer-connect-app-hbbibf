
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Platform, Pressable, TextInput, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/IconSymbol";
import { colors } from "@/styles/commonStyles";
import { Stack } from "expo-router";

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
}

interface Workout {
  id: string;
  date: string;
  type: string;
  duration: number;
  exercises: Exercise[];
}

export default function WorkoutsScreen() {
  const [workouts, setWorkouts] = useState<Workout[]>([
    {
      id: '1',
      date: 'Today',
      type: 'Upper Body',
      duration: 45,
      exercises: [
        { id: '1', name: 'Bench Press', sets: 3, reps: 10, weight: 135 },
        { id: '2', name: 'Shoulder Press', sets: 3, reps: 12, weight: 65 },
        { id: '3', name: 'Bicep Curls', sets: 3, reps: 15, weight: 30 },
      ],
    },
    {
      id: '2',
      date: 'Yesterday',
      type: 'Lower Body',
      duration: 50,
      exercises: [
        { id: '1', name: 'Squats', sets: 4, reps: 8, weight: 185 },
        { id: '2', name: 'Leg Press', sets: 3, reps: 12, weight: 270 },
        { id: '3', name: 'Calf Raises', sets: 3, reps: 20, weight: 90 },
      ],
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newWorkoutType, setNewWorkoutType] = useState('');
  const [newExerciseName, setNewExerciseName] = useState('');
  const [newSets, setNewSets] = useState('');
  const [newReps, setNewReps] = useState('');
  const [newWeight, setNewWeight] = useState('');

  const handleAddWorkout = () => {
    if (!newWorkoutType || !newExerciseName || !newSets || !newReps || !newWeight) {
      return;
    }

    const newWorkout: Workout = {
      id: Date.now().toString(),
      date: 'Today',
      type: newWorkoutType,
      duration: 0,
      exercises: [
        {
          id: '1',
          name: newExerciseName,
          sets: parseInt(newSets),
          reps: parseInt(newReps),
          weight: parseInt(newWeight),
        },
      ],
    };

    setWorkouts([newWorkout, ...workouts]);
    setShowAddModal(false);
    setNewWorkoutType('');
    setNewExerciseName('');
    setNewSets('');
    setNewReps('');
    setNewWeight('');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "Workouts",
            headerLargeTitle: true,
          }}
        />
      )}
      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.contentContainer,
          Platform.OS !== 'ios' && styles.contentContainerWithTabBar
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Workout Tracker</Text>
          <Pressable
            style={({ pressed }) => [
              styles.addButton,
              pressed && styles.addButtonPressed
            ]}
            onPress={() => setShowAddModal(true)}
          >
            <IconSymbol name="plus.circle.fill" size={24} color="#ffffff" />
            <Text style={styles.addButtonText}>Log Workout</Text>
          </Pressable>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{workouts.length}</Text>
            <Text style={styles.statLabel}>Total Workouts</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>4</Text>
            <Text style={styles.statLabel}>This Week</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>This Month</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Recent Workouts</Text>

        {workouts.map((workout) => (
          <View key={workout.id} style={styles.workoutCard}>
            <View style={styles.workoutHeader}>
              <View style={[styles.workoutIcon, { backgroundColor: colors.primary + '20' }]}>
                <IconSymbol name="figure.strengthtraining.traditional" size={24} color={colors.primary} />
              </View>
              <View style={styles.workoutInfo}>
                <Text style={styles.workoutType}>{workout.type}</Text>
                <Text style={styles.workoutDate}>{workout.date}</Text>
              </View>
              {workout.duration > 0 && (
                <View style={styles.durationBadge}>
                  <Text style={styles.durationText}>{workout.duration} min</Text>
                </View>
              )}
            </View>

            <View style={styles.exercisesContainer}>
              {workout.exercises.map((exercise) => (
                <View key={exercise.id} style={styles.exerciseRow}>
                  <Text style={styles.exerciseName}>{exercise.name}</Text>
                  <Text style={styles.exerciseDetails}>
                    {exercise.sets} × {exercise.reps} @ {exercise.weight}lbs
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>

      <Modal
        visible={showAddModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Log New Workout</Text>
              <Pressable onPress={() => setShowAddModal(false)}>
                <IconSymbol name="xmark.circle.fill" size={28} color={colors.textSecondary} />
              </Pressable>
            </View>

            <ScrollView style={styles.modalForm} showsVerticalScrollIndicator={false}>
              <Text style={styles.inputLabel}>Workout Type</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Upper Body, Cardio"
                placeholderTextColor={colors.textSecondary}
                value={newWorkoutType}
                onChangeText={setNewWorkoutType}
              />

              <Text style={styles.inputLabel}>Exercise Name</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Bench Press"
                placeholderTextColor={colors.textSecondary}
                value={newExerciseName}
                onChangeText={setNewExerciseName}
              />

              <View style={styles.inputRow}>
                <View style={styles.inputColumn}>
                  <Text style={styles.inputLabel}>Sets</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="3"
                    placeholderTextColor={colors.textSecondary}
                    keyboardType="numeric"
                    value={newSets}
                    onChangeText={setNewSets}
                  />
                </View>

                <View style={styles.inputColumn}>
                  <Text style={styles.inputLabel}>Reps</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="10"
                    placeholderTextColor={colors.textSecondary}
                    keyboardType="numeric"
                    value={newReps}
                    onChangeText={setNewReps}
                  />
                </View>

                <View style={styles.inputColumn}>
                  <Text style={styles.inputLabel}>Weight (lbs)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="135"
                    placeholderTextColor={colors.textSecondary}
                    keyboardType="numeric"
                    value={newWeight}
                    onChangeText={setNewWeight}
                  />
                </View>
              </View>

              <Pressable
                style={({ pressed }) => [
                  styles.saveButton,
                  pressed && styles.saveButtonPressed
                ]}
                onPress={handleAddWorkout}
              >
                <Text style={styles.saveButtonText}>Save Workout</Text>
              </Pressable>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  contentContainerWithTabBar: {
    paddingBottom: 100,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 12,
    gap: 8,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  addButtonPressed: {
    opacity: 0.8,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statBox: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  workoutCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  workoutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  workoutIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  workoutInfo: {
    flex: 1,
  },
  workoutType: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  workoutDate: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  durationBadge: {
    backgroundColor: colors.accent + '30',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  durationText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.accent,
  },
  exercisesContainer: {
    gap: 8,
  },
  exerciseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.background,
    borderRadius: 8,
  },
  exerciseName: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.text,
  },
  exerciseDetails: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.card,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 40,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
  },
  modalForm: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.text,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
  },
  inputColumn: {
    flex: 1,
  },
  saveButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  saveButtonPressed: {
    opacity: 0.8,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});
