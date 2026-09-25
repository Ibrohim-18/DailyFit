import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Pressable,
  StyleSheet,
  StatusBar as RNStatusBar,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const dayOne = {
  day: 1,
  title: 'Full Body Beginner',
  duration: '20 min',
  level: 'Beginner',
  exercises: [
    { name: 'Arm Circles', detail: '30 sec', type: 'Warm-up' },
    { name: 'High Knees', detail: '30 sec', type: 'Warm-up' },
    { name: 'Bodyweight Squats', detail: '10 reps', type: 'Warm-up' },
    { name: 'Squats', detail: '3 sets × 10 reps', type: 'Strength' },
    { name: 'Push-ups', detail: '3 sets × 8 reps', type: 'Strength' },
    { name: 'Lunges', detail: '3 sets × 8 each leg', type: 'Strength' },
    { name: 'Plank', detail: '3 sets × 30 sec', type: 'Core' },
    { name: 'Cool Down', detail: '2 min', type: 'Recovery' },
  ],
};

function ProgressRing({ value }) {
  return (
    <View style={styles.ringOuter}>
      <View style={styles.ringInner}>
        <Text style={styles.ringValue}>{value}%</Text>
        <Text style={styles.ringLabel}>complete</Text>
      </View>
    </View>
  );
}

function HomeScreen({ completed, onStart }) {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <View style={styles.heroRow}>
        <View>
          <Text style={styles.eyebrow}>YOUR TRAINING</Text>
          <Text style={styles.heroTitle}>Build your best self.</Text>
        </View>
        <View style={styles.avatar}><Text style={styles.avatarText}>DF</Text></View>
      </View>

      <View style={styles.streakCard}>
        <View>
          <Text style={styles.streakNumber}>{completed ? '1' : '0'} day</Text>
          <Text style={styles.streakLabel}>Current streak</Text>
        </View>
        <Text style={styles.streakIcon}>🔥</Text>
      </View>

      <Text style={styles.sectionTitle}>Today</Text>
      <View style={styles.workoutCard}>
        <View style={styles.workoutTopRow}>
          <View style={styles.dayBadge}><Text style={styles.dayBadgeText}>DAY 1</Text></View>
          <Text style={styles.duration}>◷ {dayOne.duration}</Text>
        </View>
        <Text style={styles.workoutTitle}>{dayOne.title}</Text>
        <Text style={styles.workoutSubtitle}>8 exercises · Full body · {dayOne.level}</Text>
        <View style={styles.exercisePreviewRow}>
          {['Squats', 'Push-ups', 'Lunges'].map((item) => (
            <View key={item} style={styles.exercisePill}><Text style={styles.exercisePillText}>{item}</Text></View>
          ))}
        </View>
        <Pressable style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]} onPress={onStart}>
          <Text style={styles.primaryButtonText}>{completed ? 'Do Workout Again' : 'Start Workout'}</Text>
        </Pressable>
      </View>

      <View style={styles.rowBetween}>
        <Text style={styles.sectionTitle}>This week</Text>
        <Text style={styles.mutedText}>1 of 7 days</Text>
      </View>
      <View style={styles.weekRow}>
        {[1, 2, 3, 4, 5, 6, 7].map((day) => (
          <View key={day} style={[styles.weekDay, day === 1 && styles.weekDayActive]}>
            <Text style={[styles.weekDayText, day === 1 && styles.weekDayTextActive]}>{day}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

function DaysScreen({ completed, onStart }) {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <Text style={styles.pageTitle}>Training Days</Text>
      <Text style={styles.pageSubtitle}>One focused workout at a time.</Text>

      <Pressable style={styles.dayListCard} onPress={onStart}>
        <View style={styles.dayNumberBox}><Text style={styles.dayNumberText}>01</Text></View>
        <View style={styles.dayListInfo}>
          <Text style={styles.dayListTitle}>Full Body Beginner</Text>
          <Text style={styles.dayListMeta}>20 min · 8 exercises</Text>
        </View>
        <Text style={styles.dayListState}>{completed ? '✓' : '›'}</Text>
      </Pressable>

      {[2, 3, 4, 5, 6, 7].map((day) => (
        <View key={day} style={[styles.dayListCard, styles.lockedCard]}>
          <View style={[styles.dayNumberBox, styles.dayNumberLocked]}>
            <Text style={styles.dayNumberLockedText}>{String(day).padStart(2, '0')}</Text>
          </View>
          <View style={styles.dayListInfo}>
            <Text style={styles.lockedTitle}>Coming Soon</Text>
            <Text style={styles.dayListMeta}>We will add this day next.</Text>
          </View>
          <Text style={styles.lockIcon}>🔒</Text>
        </View>
      ))}
    </ScrollView>
  );
}

function ProgressScreen({ completed }) {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <Text style={styles.pageTitle}>Progress</Text>
      <Text style={styles.pageSubtitle}>Small wins become strong habits.</Text>
      <View style={styles.progressCard}>
        <View style={styles.ringOuter}>
          <View style={styles.ringInner}>
            <Text style={styles.ringValue}>{completed ? 100 : 0}%</Text>
            <Text style={styles.ringLabel}>complete</Text>
          </View>
        </View>
        <View style={styles.progressStats}>
          <Text style={styles.progressBig}>{completed ? '1' : '0'}</Text>
          <Text style={styles.progressLabel}>workout completed</Text>
          <View style={styles.divider} />
          <Text style={styles.progressBig}>{completed ? '20' : '0'}</Text>
          <Text style={styles.progressLabel}>minutes trained</Text>
        </View>
      </View>
    </ScrollView>
  );
}

function ProfileScreen() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <Text style={styles.pageTitle}>Profile</Text>
      <Text style={styles.pageSubtitle}>Your training, your pace.</Text>
      <View style={styles.profileCard}>
        <View style={styles.bigAvatar}><Text style={styles.bigAvatarText}>DF</Text></View>
        <Text style={styles.profileName}>DailyFit Athlete</Text>
        <Text style={styles.profileLevel}>Beginner plan</Text>
      </View>
      <View style={styles.infoCard}>
        <Text style={styles.infoLabel}>Goal</Text>
        <Text style={styles.infoValue}>Build a daily training habit</Text>
      </View>
    </ScrollView>
  );
}

function WorkoutScreen({ onClose, onComplete }) {
  const [index, setIndex] = useState(0);
  const exercise = dayOne.exercises[index];
  const percent = Math.round(((index + 1) / dayOne.exercises.length) * 100);
  const buttonLabel = index === dayOne.exercises.length - 1 ? 'Complete Workout' : 'Next Exercise';

  const next = () => {
    if (index === dayOne.exercises.length - 1) {
      onComplete();
      return;
    }
    setIndex((current) => current + 1);
  };

  return (
    <SafeAreaView style={styles.workoutScreen}>
      <StatusBar style="light" />
      <View style={styles.workoutHeader}>
        <Pressable onPress={onClose} style={styles.closeButton}><Text style={styles.closeText}>×</Text></Pressable>
        <Text style={styles.workoutHeaderTitle}>Day 1</Text>
        <Text style={styles.stepText}>{index + 1}/{dayOne.exercises.length}</Text>
      </View>

      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${percent}%` }]} />
      </View>

      <View style={styles.workoutBody}>
        <View style={styles.typePill}><Text style={styles.typePillText}>{exercise.type}</Text></View>
        <Text style={styles.activeExerciseName}>{exercise.name}</Text>
        <Text style={styles.activeExerciseDetail}>{exercise.detail}</Text>
        <View style={styles.exerciseVisual}>
          <Text style={styles.exerciseVisualIcon}>{exercise.type === 'Recovery' ? '🧘' : '🏃'}</Text>
        </View>
        <Text style={styles.tipTitle}>Stay controlled</Text>
        <Text style={styles.tipText}>Focus on smooth movement, steady breathing, and good form. Stop if you feel sharp pain.</Text>
      </View>

      <View style={styles.workoutFooter}>
        {index > 0 && (
          <Pressable style={styles.secondaryButton} onPress={() => setIndex((current) => current - 1)}>
            <Text style={styles.secondaryButtonText}>Back</Text>
          </Pressable>
        )}
        <Pressable style={[styles.primaryButton, styles.workoutNextButton]} onPress={next}>
          <Text style={styles.primaryButtonText}>{buttonLabel}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  const [tab, setTab] = useState('Home');
  const [inWorkout, setInWorkout] = useState(false);
  const [completed, setCompleted] = useState(false);

  const currentScreen = useMemo(() => {
    if (tab === 'Days') return <DaysScreen completed={completed} onStart={() => setInWorkout(true)} />;
    if (tab === 'Progress') return <ProgressScreen completed={completed} />;
    if (tab === 'Profile') return <ProfileScreen />;
    return <HomeScreen completed={completed} onStart={() => setInWorkout(true)} />;
  }, [tab, completed]);

  if (inWorkout) {
    return (
      <WorkoutScreen
        onClose={() => setInWorkout(false)}
        onComplete={() => {
          setCompleted(true);
          setInWorkout(false);
          setTab('Progress');
        }}
      />
    );
  }

  const tabs = [
    ['Home', '⌂'],
    ['Days', '▦'],
    ['Progress', '◉'],
    ['Profile', '●'],
  ];

  return (
    <SafeAreaView style={styles.app}>
      <StatusBar style="dark" />
      <View style={styles.content}>{currentScreen}</View>
      <View style={styles.bottomNav}>
        {tabs.map(([name, icon]) => {
          const active = tab === name;
          return (
            <Pressable key={name} style={styles.navItem} onPress={() => setTab(name)}>
              <Text style={[styles.navIcon, active && styles.navIconActive]}>{icon}</Text>
              <Text style={[styles.navText, active && styles.navTextActive]}>{name}</Text>
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  app: { flex: 1, backgroundColor: '#F5F7F6', paddingTop: RNStatusBar.currentHeight || 0 },
  content: { flex: 1 },
  scrollContent: { padding: 20, paddingBottom: 28 },
  heroRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 22 },
  eyebrow: { fontSize: 12, fontWeight: '800', letterSpacing: 1.8, color: '#238A5A', marginBottom: 7 },
  heroTitle: { fontSize: 30, lineHeight: 35, fontWeight: '800', color: '#13241C', maxWidth: 280 },
  avatar: { width: 44, height: 44, borderRadius: 15, backgroundColor: '#13241C', alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#FFFFFF', fontWeight: '800', fontSize: 13 },
  streakCard: { backgroundColor: '#E3F5EB', borderRadius: 22, padding: 18, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 26 },
  streakNumber: { fontSize: 23, fontWeight: '800', color: '#163C2A' },
  streakLabel: { marginTop: 3, fontSize: 13, color: '#557064' },
  streakIcon: { fontSize: 30 },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: '#13241C', marginBottom: 12 },
  workoutCard: { backgroundColor: '#13241C', borderRadius: 28, padding: 20, marginBottom: 28 },
  workoutTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  dayBadge: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999, backgroundColor: '#5FDC98' },
  dayBadgeText: { fontSize: 11, fontWeight: '900', letterSpacing: 1, color: '#0B2A1A' },
  duration: { color: '#BFCBC5', fontSize: 13, fontWeight: '600' },
  workoutTitle: { color: '#FFFFFF', fontSize: 26, lineHeight: 31, fontWeight: '800', marginTop: 18 },
  workoutSubtitle: { color: '#AAB8B1', marginTop: 7, fontSize: 14 },
  exercisePreviewRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 18, marginBottom: 20 },
  exercisePill: { borderWidth: 1, borderColor: '#345045', borderRadius: 999, paddingHorizontal: 11, paddingVertical: 7 },
  exercisePillText: { color: '#DDE6E1', fontSize: 12, fontWeight: '600' },
  primaryButton: { backgroundColor: '#5FDC98', minHeight: 54, borderRadius: 17, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 },
  primaryButtonText: { color: '#0C2A1B', fontWeight: '900', fontSize: 16 },
  pressed: { opacity: 0.84 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  mutedText: { color: '#7C8B84', fontSize: 13 },
  weekRow: { flexDirection: 'row', justifyContent: 'space-between' },
  weekDay: { width: 39, height: 44, borderRadius: 14, backgroundColor: '#E6EBE8', alignItems: 'center', justifyContent: 'center' },
  weekDayActive: { backgroundColor: '#13241C' },
  weekDayText: { fontWeight: '700', color: '#6B7A73' },
  weekDayTextActive: { color: '#FFFFFF' },
  pageTitle: { fontSize: 32, fontWeight: '800', color: '#13241C' },
  pageSubtitle: { fontSize: 15, color: '#6D7D75', marginTop: 7, marginBottom: 24 },
  dayListCard: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 14, flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  lockedCard: { opacity: 0.66 },
  dayNumberBox: { width: 54, height: 54, borderRadius: 16, backgroundColor: '#DDF5E8', alignItems: 'center', justifyContent: 'center' },
  dayNumberText: { fontSize: 17, fontWeight: '900', color: '#237B52' },
  dayNumberLocked: { backgroundColor: '#EEF1EF' },
  dayNumberLockedText: { fontSize: 17, fontWeight: '900', color: '#98A49E' },
  dayListInfo: { flex: 1, paddingHorizontal: 14 },
  dayListTitle: { fontSize: 16, fontWeight: '800', color: '#17271F' },
  lockedTitle: { fontSize: 16, fontWeight: '700', color: '#6F7C76' },
  dayListMeta: { fontSize: 13, color: '#89958F', marginTop: 4 },
  dayListState: { fontSize: 26, fontWeight: '800', color: '#238A5A' },
  lockIcon: { fontSize: 17 },
  progressCard: { backgroundColor: '#FFFFFF', borderRadius: 26, padding: 22, flexDirection: 'row', alignItems: 'center' },
  ringOuter: { width: 126, height: 126, borderRadius: 63, borderWidth: 12, borderColor: '#5FDC98', alignItems: 'center', justifyContent: 'center' },
  ringInner: { alignItems: 'center' },
  ringValue: { fontSize: 28, fontWeight: '900', color: '#13241C' },
  ringLabel: { fontSize: 11, color: '#79877F' },
  progressStats: { flex: 1, marginLeft: 24 },
  progressBig: { fontSize: 26, fontWeight: '900', color: '#13241C' },
  progressLabel: { fontSize: 12, color: '#78867F', marginTop: 2 },
  divider: { height: 1, backgroundColor: '#E7ECE9', marginVertical: 13 },
  profileCard: { backgroundColor: '#13241C', borderRadius: 26, padding: 24, alignItems: 'center' },
  bigAvatar: { width: 82, height: 82, borderRadius: 28, backgroundColor: '#5FDC98', alignItems: 'center', justifyContent: 'center' },
  bigAvatarText: { color: '#0D2A1B', fontSize: 24, fontWeight: '900' },
  profileName: { color: '#FFFFFF', marginTop: 15, fontSize: 20, fontWeight: '800' },
  profileLevel: { color: '#AAB8B1', marginTop: 4 },
  infoCard: { backgroundColor: '#FFFFFF', borderRadius: 20, marginTop: 14, padding: 18 },
  infoLabel: { fontSize: 12, fontWeight: '800', color: '#7F8B85', textTransform: 'uppercase', letterSpacing: 1 },
  infoValue: { marginTop: 7, color: '#17271F', fontSize: 16, fontWeight: '700' },
  bottomNav: { backgroundColor: '#FFFFFF', flexDirection: 'row', paddingTop: 10, paddingBottom: 8, borderTopWidth: 1, borderTopColor: '#E8ECEA' },
  navItem: { flex: 1, alignItems: 'center', justifyContent: 'center', minHeight: 48 },
  navIcon: { fontSize: 20, color: '#9AA49F' },
  navIconActive: { color: '#238A5A' },
  navText: { fontSize: 10, fontWeight: '700', color: '#9AA49F', marginTop: 3 },
  navTextActive: { color: '#238A5A' },
  workoutScreen: { flex: 1, backgroundColor: '#10231A' },
  workoutHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18, paddingTop: 8, paddingBottom: 14 },
  closeButton: { width: 42, height: 42, borderRadius: 14, backgroundColor: '#1C3528', alignItems: 'center', justifyContent: 'center' },
  closeText: { color: '#FFFFFF', fontSize: 27, lineHeight: 29 },
  workoutHeaderTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: '800' },
  stepText: { color: '#9CB0A6', width: 42, textAlign: 'right', fontWeight: '700' },
  progressTrack: { height: 4, backgroundColor: '#244235', marginHorizontal: 20, borderRadius: 99, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#5FDC98' },
  workoutBody: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 28 },
  typePill: { backgroundColor: '#1D3A2B', paddingHorizontal: 13, paddingVertical: 7, borderRadius: 999 },
  typePillText: { color: '#6DE09F', fontWeight: '800', fontSize: 12, letterSpacing: 0.7 },
  activeExerciseName: { color: '#FFFFFF', fontSize: 34, lineHeight: 40, fontWeight: '900', textAlign: 'center', marginTop: 18 },
  activeExerciseDetail: { color: '#A8B8B0', fontSize: 18, fontWeight: '700', marginTop: 8 },
  exerciseVisual: { width: 170, height: 170, borderRadius: 52, backgroundColor: '#173126', alignItems: 'center', justifyContent: 'center', marginVertical: 30 },
  exerciseVisualIcon: { fontSize: 70 },
  tipTitle: { color: '#FFFFFF', fontWeight: '800', fontSize: 16 },
  tipText: { color: '#91A49B', textAlign: 'center', lineHeight: 20, marginTop: 8, maxWidth: 320 },
  workoutFooter: { flexDirection: 'row', gap: 10, paddingHorizontal: 20, paddingBottom: 18 },
  secondaryButton: { minWidth: 92, minHeight: 54, borderRadius: 17, borderWidth: 1, borderColor: '#345043', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 },
  secondaryButtonText: { color: '#D8E2DD', fontWeight: '800' },
  workoutNextButton: { flex: 1 },
});
