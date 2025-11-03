
import React from "react";
import { Stack } from "expo-router";
import { ScrollView, StyleSheet, View, Text, Platform, Pressable } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/styles/commonStyles";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  const quickStats = [
    { label: "Workouts This Week", value: "4", icon: "figure.strengthtraining.traditional", color: colors.primary },
    { label: "Calories Today", value: "1,850", icon: "flame.fill", color: colors.accent },
    { label: "Protein Today", value: "125g", icon: "fork.knife", color: colors.secondary },
    { label: "Next Appointment", value: "Tomorrow", icon: "calendar", color: colors.primary },
  ];

  const quickActions = [
    { label: "Log Workout", route: "/(tabs)/workouts", icon: "plus.circle.fill", color: colors.primary },
    { label: "Add Meal", route: "/(tabs)/nutrition", icon: "plus.circle.fill", color: colors.secondary },
    { label: "Book Session", route: "/(tabs)/appointments", icon: "calendar.badge.plus", color: colors.accent },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "FitTrack",
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
          <Text style={styles.greeting}>Welcome back!</Text>
          <Text style={styles.subtitle}>Here&apos;s your fitness overview</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today&apos;s Stats</Text>
          <View style={styles.statsGrid}>
            {quickStats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <View style={[styles.statIconContainer, { backgroundColor: stat.color + '20' }]}>
                  <IconSymbol name={stat.icon as any} size={24} color={stat.color} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsContainer}>
            {quickActions.map((action, index) => (
              <Pressable
                key={index}
                style={({ pressed }) => [
                  styles.actionButton,
                  { backgroundColor: action.color },
                  pressed && styles.actionButtonPressed
                ]}
                onPress={() => router.push(action.route as any)}
              >
                <IconSymbol name={action.icon as any} size={24} color="#ffffff" />
                <Text style={styles.actionButtonText}>{action.label}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityCard}>
            <View style={styles.activityHeader}>
              <View style={[styles.activityIcon, { backgroundColor: colors.primary + '20' }]}>
                <IconSymbol name="figure.strengthtraining.traditional" size={20} color={colors.primary} />
              </View>
              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>Upper Body Workout</Text>
                <Text style={styles.activityTime}>2 hours ago</Text>
              </View>
            </View>
            <Text style={styles.activityDetails}>45 minutes • 350 calories burned</Text>
          </View>

          <View style={styles.activityCard}>
            <View style={styles.activityHeader}>
              <View style={[styles.activityIcon, { backgroundColor: colors.secondary + '20' }]}>
                <IconSymbol name="fork.knife" size={20} color={colors.secondary} />
              </View>
              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>Lunch Logged</Text>
                <Text style={styles.activityTime}>4 hours ago</Text>
              </View>
            </View>
            <Text style={styles.activityDetails}>Grilled chicken salad • 450 calories</Text>
          </View>
        </View>
      </ScrollView>
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
    marginBottom: 24,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  actionsContainer: {
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  actionButtonPressed: {
    opacity: 0.8,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  activityCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  activityDetails: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 52,
  },
});
