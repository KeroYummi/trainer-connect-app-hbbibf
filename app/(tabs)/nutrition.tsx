
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Platform, Pressable, TextInput, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/IconSymbol";
import { colors } from "@/styles/commonStyles";
import { Stack } from "expo-router";

interface Meal {
  id: string;
  name: string;
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export default function NutritionScreen() {
  const dailyGoals = {
    calories: 2200,
    protein: 150,
    carbs: 250,
    fat: 70,
  };

  const [meals, setMeals] = useState<Meal[]>([
    {
      id: '1',
      name: 'Breakfast - Oatmeal & Eggs',
      time: '8:00 AM',
      calories: 450,
      protein: 25,
      carbs: 55,
      fat: 12,
    },
    {
      id: '2',
      name: 'Lunch - Grilled Chicken Salad',
      time: '12:30 PM',
      calories: 520,
      protein: 45,
      carbs: 35,
      fat: 18,
    },
    {
      id: '3',
      name: 'Snack - Protein Shake',
      time: '3:00 PM',
      calories: 180,
      protein: 30,
      carbs: 8,
      fat: 3,
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newMealName, setNewMealName] = useState('');
  const [newCalories, setNewCalories] = useState('');
  const [newProtein, setNewProtein] = useState('');
  const [newCarbs, setNewCarbs] = useState('');
  const [newFat, setNewFat] = useState('');

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
  const totalProtein = meals.reduce((sum, meal) => sum + meal.protein, 0);
  const totalCarbs = meals.reduce((sum, meal) => sum + meal.carbs, 0);
  const totalFat = meals.reduce((sum, meal) => sum + meal.fat, 0);

  const caloriesPercentage = Math.min((totalCalories / dailyGoals.calories) * 100, 100);
  const proteinPercentage = Math.min((totalProtein / dailyGoals.protein) * 100, 100);
  const carbsPercentage = Math.min((totalCarbs / dailyGoals.carbs) * 100, 100);
  const fatPercentage = Math.min((totalFat / dailyGoals.fat) * 100, 100);

  const handleAddMeal = () => {
    if (!newMealName || !newCalories || !newProtein || !newCarbs || !newFat) {
      return;
    }

    const newMeal: Meal = {
      id: Date.now().toString(),
      name: newMealName,
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      calories: parseInt(newCalories),
      protein: parseInt(newProtein),
      carbs: parseInt(newCarbs),
      fat: parseInt(newFat),
    };

    setMeals([...meals, newMeal]);
    setShowAddModal(false);
    setNewMealName('');
    setNewCalories('');
    setNewProtein('');
    setNewCarbs('');
    setNewFat('');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "Nutrition",
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
          <Text style={styles.title}>Nutrition Tracker</Text>
          <Pressable
            style={({ pressed }) => [
              styles.addButton,
              pressed && styles.addButtonPressed
            ]}
            onPress={() => setShowAddModal(true)}
          >
            <IconSymbol name="plus.circle.fill" size={24} color="#ffffff" />
            <Text style={styles.addButtonText}>Add Meal</Text>
          </Pressable>
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.caloriesSummary}>
            <Text style={styles.caloriesValue}>{totalCalories}</Text>
            <Text style={styles.caloriesLabel}>/ {dailyGoals.calories} cal</Text>
          </View>
          <View style={styles.caloriesProgress}>
            <View style={[styles.caloriesProgressBar, { width: `${caloriesPercentage}%` }]} />
          </View>
          <Text style={styles.caloriesRemaining}>
            {dailyGoals.calories - totalCalories} calories remaining
          </Text>
        </View>

        <View style={styles.macrosContainer}>
          <View style={styles.macroCard}>
            <View style={[styles.macroIcon, { backgroundColor: colors.primary + '20' }]}>
              <IconSymbol name="flame.fill" size={20} color={colors.primary} />
            </View>
            <Text style={styles.macroValue}>{totalProtein}g</Text>
            <Text style={styles.macroLabel}>Protein</Text>
            <View style={styles.macroProgress}>
              <View style={[styles.macroProgressBar, { width: `${proteinPercentage}%`, backgroundColor: colors.primary }]} />
            </View>
            <Text style={styles.macroGoal}>Goal: {dailyGoals.protein}g</Text>
          </View>

          <View style={styles.macroCard}>
            <View style={[styles.macroIcon, { backgroundColor: colors.secondary + '20' }]}>
              <IconSymbol name="leaf.fill" size={20} color={colors.secondary} />
            </View>
            <Text style={styles.macroValue}>{totalCarbs}g</Text>
            <Text style={styles.macroLabel}>Carbs</Text>
            <View style={styles.macroProgress}>
              <View style={[styles.macroProgressBar, { width: `${carbsPercentage}%`, backgroundColor: colors.secondary }]} />
            </View>
            <Text style={styles.macroGoal}>Goal: {dailyGoals.carbs}g</Text>
          </View>

          <View style={styles.macroCard}>
            <View style={[styles.macroIcon, { backgroundColor: colors.accent + '20' }]}>
              <IconSymbol name="drop.fill" size={20} color={colors.accent} />
            </View>
            <Text style={styles.macroValue}>{totalFat}g</Text>
            <Text style={styles.macroLabel}>Fat</Text>
            <View style={styles.macroProgress}>
              <View style={[styles.macroProgressBar, { width: `${fatPercentage}%`, backgroundColor: colors.accent }]} />
            </View>
            <Text style={styles.macroGoal}>Goal: {dailyGoals.fat}g</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Today&apos;s Meals</Text>

        {meals.map((meal) => (
          <View key={meal.id} style={styles.mealCard}>
            <View style={styles.mealHeader}>
              <View style={[styles.mealIcon, { backgroundColor: colors.secondary + '20' }]}>
                <IconSymbol name="fork.knife" size={20} color={colors.secondary} />
              </View>
              <View style={styles.mealInfo}>
                <Text style={styles.mealName}>{meal.name}</Text>
                <Text style={styles.mealTime}>{meal.time}</Text>
              </View>
              <View style={styles.caloriesBadge}>
                <Text style={styles.caloriesBadgeText}>{meal.calories} cal</Text>
              </View>
            </View>

            <View style={styles.macrosRow}>
              <View style={styles.macroItem}>
                <Text style={styles.macroItemLabel}>Protein</Text>
                <Text style={styles.macroItemValue}>{meal.protein}g</Text>
              </View>
              <View style={styles.macroItem}>
                <Text style={styles.macroItemLabel}>Carbs</Text>
                <Text style={styles.macroItemValue}>{meal.carbs}g</Text>
              </View>
              <View style={styles.macroItem}>
                <Text style={styles.macroItemLabel}>Fat</Text>
                <Text style={styles.macroItemValue}>{meal.fat}g</Text>
              </View>
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
              <Text style={styles.modalTitle}>Add New Meal</Text>
              <Pressable onPress={() => setShowAddModal(false)}>
                <IconSymbol name="xmark.circle.fill" size={28} color={colors.textSecondary} />
              </Pressable>
            </View>

            <ScrollView style={styles.modalForm} showsVerticalScrollIndicator={false}>
              <Text style={styles.inputLabel}>Meal Name</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Grilled Chicken & Rice"
                placeholderTextColor={colors.textSecondary}
                value={newMealName}
                onChangeText={setNewMealName}
              />

              <Text style={styles.inputLabel}>Calories</Text>
              <TextInput
                style={styles.input}
                placeholder="450"
                placeholderTextColor={colors.textSecondary}
                keyboardType="numeric"
                value={newCalories}
                onChangeText={setNewCalories}
              />

              <View style={styles.inputRow}>
                <View style={styles.inputColumn}>
                  <Text style={styles.inputLabel}>Protein (g)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="30"
                    placeholderTextColor={colors.textSecondary}
                    keyboardType="numeric"
                    value={newProtein}
                    onChangeText={setNewProtein}
                  />
                </View>

                <View style={styles.inputColumn}>
                  <Text style={styles.inputLabel}>Carbs (g)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="45"
                    placeholderTextColor={colors.textSecondary}
                    keyboardType="numeric"
                    value={newCarbs}
                    onChangeText={setNewCarbs}
                  />
                </View>

                <View style={styles.inputColumn}>
                  <Text style={styles.inputLabel}>Fat (g)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="12"
                    placeholderTextColor={colors.textSecondary}
                    keyboardType="numeric"
                    value={newFat}
                    onChangeText={setNewFat}
                  />
                </View>
              </View>

              <Pressable
                style={({ pressed }) => [
                  styles.saveButton,
                  pressed && styles.saveButtonPressed
                ]}
                onPress={handleAddMeal}
              >
                <Text style={styles.saveButtonText}>Save Meal</Text>
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
    backgroundColor: colors.secondary,
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
  summaryCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  caloriesSummary: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    marginBottom: 12,
  },
  caloriesValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.primary,
  },
  caloriesLabel: {
    fontSize: 18,
    color: colors.textSecondary,
    marginLeft: 8,
  },
  caloriesProgress: {
    height: 8,
    backgroundColor: colors.background,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  caloriesProgressBar: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  caloriesRemaining: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  macrosContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  macroCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  macroIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  macroValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 2,
  },
  macroLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  macroProgress: {
    width: '100%',
    height: 4,
    backgroundColor: colors.background,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 4,
  },
  macroProgressBar: {
    height: '100%',
    borderRadius: 2,
  },
  macroGoal: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  mealCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  mealHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  mealIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  mealInfo: {
    flex: 1,
  },
  mealName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  mealTime: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  caloriesBadge: {
    backgroundColor: colors.primary + '30',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  caloriesBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  macrosRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  macroItem: {
    alignItems: 'center',
  },
  macroItemLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  macroItemValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
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
    backgroundColor: colors.secondary,
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
