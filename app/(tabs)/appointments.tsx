
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Platform, Pressable, Modal, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/IconSymbol";
import { colors } from "@/styles/commonStyles";
import { Stack } from "expo-router";

interface Appointment {
  id: string;
  date: string;
  time: string;
  type: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  notes?: string;
}

export default function AppointmentsScreen() {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      date: 'Tomorrow',
      time: '10:00 AM',
      type: 'Personal Training Session',
      status: 'upcoming',
      notes: 'Focus on upper body strength',
    },
    {
      id: '2',
      date: 'Friday, Jan 12',
      time: '2:00 PM',
      type: 'Nutrition Consultation',
      status: 'upcoming',
      notes: 'Review meal plan progress',
    },
    {
      id: '3',
      date: 'Yesterday',
      time: '9:00 AM',
      type: 'Personal Training Session',
      status: 'completed',
      notes: 'Lower body workout completed',
    },
  ]);

  const [showBookModal, setShowBookModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [notes, setNotes] = useState('');

  const availableSlots = [
    { date: 'Monday, Jan 15', times: ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'] },
    { date: 'Tuesday, Jan 16', times: ['10:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
    { date: 'Wednesday, Jan 17', times: ['9:00 AM', '12:00 PM', '2:00 PM', '4:00 PM'] },
  ];

  const sessionTypes = [
    'Personal Training Session',
    'Nutrition Consultation',
    'Progress Check-In',
    'Workout Plan Review',
  ];

  const handleBookAppointment = () => {
    if (!selectedDate || !selectedTime || !selectedType) {
      return;
    }

    const newAppointment: Appointment = {
      id: Date.now().toString(),
      date: selectedDate,
      time: selectedTime,
      type: selectedType,
      status: 'upcoming',
      notes: notes,
    };

    setAppointments([newAppointment, ...appointments]);
    setShowBookModal(false);
    setSelectedDate('');
    setSelectedTime('');
    setSelectedType('');
    setNotes('');
  };

  const upcomingAppointments = appointments.filter(apt => apt.status === 'upcoming');
  const pastAppointments = appointments.filter(apt => apt.status === 'completed');

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "Appointments",
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
          <Text style={styles.title}>Appointments</Text>
          <Pressable
            style={({ pressed }) => [
              styles.bookButton,
              pressed && styles.bookButtonPressed
            ]}
            onPress={() => setShowBookModal(true)}
          >
            <IconSymbol name="calendar.badge.plus" size={24} color="#ffffff" />
            <Text style={styles.bookButtonText}>Book Session</Text>
          </Pressable>
        </View>

        <View style={styles.trainerCard}>
          <View style={styles.trainerAvatar}>
            <IconSymbol name="person.fill" size={32} color="#ffffff" />
          </View>
          <View style={styles.trainerInfo}>
            <Text style={styles.trainerName}>Your Trainer</Text>
            <Text style={styles.trainerTitle}>Certified Personal Trainer</Text>
            <Text style={styles.trainerContact}>Available Mon-Fri, 9 AM - 6 PM</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Upcoming Sessions</Text>

        {upcomingAppointments.length === 0 ? (
          <View style={styles.emptyState}>
            <IconSymbol name="calendar" size={48} color={colors.textSecondary} />
            <Text style={styles.emptyStateText}>No upcoming appointments</Text>
            <Text style={styles.emptyStateSubtext}>Book a session to get started</Text>
          </View>
        ) : (
          upcomingAppointments.map((appointment) => (
            <View key={appointment.id} style={styles.appointmentCard}>
              <View style={styles.appointmentHeader}>
                <View style={[styles.appointmentIcon, { backgroundColor: colors.primary + '20' }]}>
                  <IconSymbol name="calendar" size={24} color={colors.primary} />
                </View>
                <View style={styles.appointmentInfo}>
                  <Text style={styles.appointmentType}>{appointment.type}</Text>
                  <Text style={styles.appointmentDateTime}>
                    {appointment.date} at {appointment.time}
                  </Text>
                </View>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>Upcoming</Text>
                </View>
              </View>
              {appointment.notes && (
                <View style={styles.notesContainer}>
                  <IconSymbol name="note.text" size={16} color={colors.textSecondary} />
                  <Text style={styles.notesText}>{appointment.notes}</Text>
                </View>
              )}
            </View>
          ))
        )}

        {pastAppointments.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Past Sessions</Text>
            {pastAppointments.map((appointment) => (
              <View key={appointment.id} style={[styles.appointmentCard, styles.pastAppointmentCard]}>
                <View style={styles.appointmentHeader}>
                  <View style={[styles.appointmentIcon, { backgroundColor: colors.textSecondary + '20' }]}>
                    <IconSymbol name="checkmark.circle.fill" size={24} color={colors.success} />
                  </View>
                  <View style={styles.appointmentInfo}>
                    <Text style={styles.appointmentType}>{appointment.type}</Text>
                    <Text style={styles.appointmentDateTime}>
                      {appointment.date} at {appointment.time}
                    </Text>
                  </View>
                </View>
                {appointment.notes && (
                  <View style={styles.notesContainer}>
                    <IconSymbol name="note.text" size={16} color={colors.textSecondary} />
                    <Text style={styles.notesText}>{appointment.notes}</Text>
                  </View>
                )}
              </View>
            ))}
          </>
        )}
      </ScrollView>

      <Modal
        visible={showBookModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowBookModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Book a Session</Text>
              <Pressable onPress={() => setShowBookModal(false)}>
                <IconSymbol name="xmark.circle.fill" size={28} color={colors.textSecondary} />
              </Pressable>
            </View>

            <ScrollView style={styles.modalForm} showsVerticalScrollIndicator={false}>
              <Text style={styles.inputLabel}>Session Type</Text>
              <View style={styles.typeSelector}>
                {sessionTypes.map((type) => (
                  <Pressable
                    key={type}
                    style={({ pressed }) => [
                      styles.typeOption,
                      selectedType === type && styles.typeOptionSelected,
                      pressed && styles.typeOptionPressed
                    ]}
                    onPress={() => setSelectedType(type)}
                  >
                    <Text style={[
                      styles.typeOptionText,
                      selectedType === type && styles.typeOptionTextSelected
                    ]}>
                      {type}
                    </Text>
                  </Pressable>
                ))}
              </View>

              <Text style={styles.inputLabel}>Available Dates & Times</Text>
              {availableSlots.map((slot) => (
                <View key={slot.date} style={styles.dateSlot}>
                  <Text style={styles.dateLabel}>{slot.date}</Text>
                  <View style={styles.timeSlots}>
                    {slot.times.map((time) => (
                      <Pressable
                        key={time}
                        style={({ pressed }) => [
                          styles.timeSlot,
                          selectedDate === slot.date && selectedTime === time && styles.timeSlotSelected,
                          pressed && styles.timeSlotPressed
                        ]}
                        onPress={() => {
                          setSelectedDate(slot.date);
                          setSelectedTime(time);
                        }}
                      >
                        <Text style={[
                          styles.timeSlotText,
                          selectedDate === slot.date && selectedTime === time && styles.timeSlotTextSelected
                        ]}>
                          {time}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                </View>
              ))}

              <Text style={styles.inputLabel}>Notes (Optional)</Text>
              <TextInput
                style={styles.textArea}
                placeholder="Any specific goals or areas to focus on?"
                placeholderTextColor={colors.textSecondary}
                multiline
                numberOfLines={4}
                value={notes}
                onChangeText={setNotes}
              />

              <Pressable
                style={({ pressed }) => [
                  styles.confirmButton,
                  (!selectedDate || !selectedTime || !selectedType) && styles.confirmButtonDisabled,
                  pressed && styles.confirmButtonPressed
                ]}
                onPress={handleBookAppointment}
                disabled={!selectedDate || !selectedTime || !selectedType}
              >
                <Text style={styles.confirmButtonText}>Confirm Booking</Text>
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
  bookButton: {
    backgroundColor: colors.accent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 12,
    gap: 8,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  bookButtonPressed: {
    opacity: 0.8,
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  trainerCard: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  trainerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  trainerInfo: {
    flex: 1,
  },
  trainerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  trainerTitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 4,
  },
  trainerContact: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  emptyState: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
    marginBottom: 20,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginTop: 12,
    marginBottom: 4,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  appointmentCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  pastAppointmentCard: {
    opacity: 0.7,
  },
  appointmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appointmentIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  appointmentInfo: {
    flex: 1,
  },
  appointmentType: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  appointmentDateTime: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  statusBadge: {
    backgroundColor: colors.highlight + '50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.accent,
  },
  notesContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: 8,
  },
  notesText: {
    flex: 1,
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
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
    maxHeight: '85%',
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
    marginBottom: 12,
    marginTop: 16,
  },
  typeSelector: {
    gap: 8,
  },
  typeOption: {
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 14,
  },
  typeOptionSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
  },
  typeOptionPressed: {
    opacity: 0.7,
  },
  typeOptionText: {
    fontSize: 15,
    color: colors.text,
    textAlign: 'center',
  },
  typeOptionTextSelected: {
    fontWeight: '600',
    color: colors.primary,
  },
  dateSlot: {
    marginBottom: 16,
  },
  dateLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  timeSlots: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  timeSlot: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  timeSlotSelected: {
    borderColor: colors.accent,
    backgroundColor: colors.accent + '20',
  },
  timeSlotPressed: {
    opacity: 0.7,
  },
  timeSlotText: {
    fontSize: 14,
    color: colors.text,
  },
  timeSlotTextSelected: {
    fontWeight: '600',
    color: colors.accent,
  },
  textArea: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    color: colors.text,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  confirmButton: {
    backgroundColor: colors.accent,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  confirmButtonDisabled: {
    opacity: 0.5,
  },
  confirmButtonPressed: {
    opacity: 0.8,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});
