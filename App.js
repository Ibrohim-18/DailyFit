import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Easing,
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
    {
      name: 'Arm Circles',
      detail: '30 sec',
      type: 'Warm-up',
      target: 'Shoulders · Upper arms',
      demo: 'arm-circles',
      how: [
        'Stand tall with your arms out to the sides.',
        'Make smooth circles without shrugging your shoulders.',
        'Keep your core gently engaged.',
      ],
      mistakes: ['Moving too fast', 'Shrugging the shoulders'],
    },
    {
      name: 'High Knees',
      detail: '30 sec',
      type: 'Warm-up',
      target: 'Legs · Cardio · Core',
      demo: 'high-knees',
      how: [
        'Stand tall and lift one knee at a time.',
        'Move your arms naturally as you alternate legs.',
        'Land softly and keep a steady rhythm.',
      ],
      mistakes: ['Leaning too far back', 'Landing too hard'],
    },
    {
      name: 'Bodyweight Squats',
      detail: '10 reps',
      type: 'Warm-up',
      target: 'Legs · Glutes',
      demo: 'squat',
      how: [
        'Place your feet about shoulder-width apart.',
        'Push your hips back and bend your knees.',
        'Keep your chest lifted and stand up with control.',
      ],
      mistakes: ['Rounding the back', 'Knees collapsing inward'],
    },
    {
      name: 'Squats',
      detail: '3 sets × 10 reps',
      type: 'Strength',
      target: 'Quads · Glutes · Hamstrings',
      demo: 'squat',
      how: [
        'Keep both feet flat on the floor.',
        'Lower only as far as you can with good control.',
        'Drive through your feet to return to standing.',
      ],
      mistakes: ['Lifting the heels', 'Rushing the movement'],
    },
    {
      name: 'Push-ups',
      detail: '3 sets × 8 reps',
      type: 'Strength',
      target: 'Chest · Shoulders · Triceps',
      demo: 'push-up',
      how: [
        'Place your hands slightly wider than your shoulders.',
        'Keep your body in one straight line.',
        'Lower with control, then push the floor away.',
      ],
      mistakes: ['Dropping the hips', 'Flaring the elbows too wide'],
    },
    {
      name: 'Lunges',
      detail: '3 sets × 8 each leg',
      type: 'Strength',
      target: 'Legs · Glutes · Balance',
      demo: 'lunge',
      how: [
        'Step forward and keep your torso tall.',
        'Lower both knees with control.',
        'Push through the front foot to return.',
      ],
      mistakes: ['Leaning too far forward', 'Front knee falling inward'],
    },
    {
      name: 'Plank',
      detail: '3 sets × 30 sec',
      type: 'Core',
      target: 'Core · Shoulders',
      demo: 'plank',
      how: [
        'Place your forearms on the floor.',
        'Keep your body in a straight line.',
        'Brace your core and breathe steadily.',
      ],
      mistakes: ['Hips too high', 'Lower back sinking'],
    },
    {
      name: 'Cool Down',
      detail: '2 min',
      type: 'Recovery',
      target: 'Mobility · Recovery',
      demo: 'cool-down',
      how: [
        'Breathe slowly and let your heart rate settle.',
        'Stretch gently without forcing the range.',
        'Relax your shoulders, hips, and legs.',
      ],
      mistakes: ['Bouncing during stretches', 'Forcing a painful range'],
    },
  ],
};

function useExerciseLoop(duration = 850) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(progress, {
          toValue: 1,
          duration,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(progress, {
          toValue: 0,
          duration,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    loop.start();
    return () => loop.stop();
  }, [duration, progress]);

  return progress;
}

function VerticalFigure({ mode, compact = false }) {
  const progress = useExerciseLoop(mode === 'arm-circles' ? 700 : 900);

  const bodyY =
    mode === 'squat'
      ? progress.interpolate({ inputRange: [0, 1], outputRange: [0, 34] })
      : mode === 'high-knees'
      ? progress.interpolate({ inputRange: [0, 1], outputRange: [0, -8] })
      : 0;

  const bodyX =
    mode === 'lunge'
      ? progress.interpolate({ inputRange: [0, 1], outputRange: [-10, 14] })
      : 0;

  const bodyRotate =
    mode === 'cool-down'
      ? progress.interpolate({ inputRange: [0, 1], outputRange: ['-3deg', '3deg'] })
      : '0deg';

  const leftArmRotate =
    mode === 'arm-circles'
      ? progress.interpolate({ inputRange: [0, 1], outputRange: ['-65deg', '105deg'] })
      : mode === 'cool-down'
      ? progress.interpolate({ inputRange: [0, 1], outputRange: ['-35deg', '-125deg'] })
      : '-18deg';

  const rightArmRotate =
    mode === 'arm-circles'
      ? progress.interpolate({ inputRange: [0, 1], outputRange: ['65deg', '-105deg'] })
      : mode === 'cool-down'
      ? progress.interpolate({ inputRange: [0, 1], outputRange: ['35deg', '125deg'] })
      : '18deg';

  const leftLegRotate =
    mode === 'high-knees'
      ? progress.interpolate({ inputRange: [0, 1], outputRange: ['-6deg', '52deg'] })
      : mode === 'squat'
      ? progress.interpolate({ inputRange: [0, 1], outputRange: ['-7deg', '24deg'] })
      : mode === 'lunge'
      ? progress.interpolate({ inputRange: [0, 1], outputRange: ['-7deg', '42deg'] })
      : '-7deg';

  const rightLegRotate =
    mode === 'high-knees'
      ? progress.interpolate({ inputRange: [0, 1], outputRange: ['42deg', '-8deg'] })
      : mode === 'squat'
      ? progress.interpolate({ inputRange: [0, 1], outputRange: ['7deg', '-24deg'] })
      : mode === 'lunge'
      ? progress.interpolate({ inputRange: [0, 1], outputRange: ['10deg', '-24deg'] })
      : '7deg';

  const canvasScale = compact ? 0.72 : 1;

  return (
    <View style={[styles.figureCanvas, compact && styles.figureCanvasCompact]}>
      <View style={styles.demoFloor} />
      <Animated.View
        style={[
          styles.verticalPerson,
          {
            transform: [
              { translateY: bodyY },
              { translateX: bodyX },
              { rotate: bodyRotate },
              { scale: canvasScale },
            ],
          },
        ]}
      >
        <View style={styles.head} />
        <View style={styles.neck} />
        <View style={styles.torso}>
          <View style={styles.torsoAccent} />
        </View>
        <Animated.View
          style={[
            styles.arm,
            styles.leftArm,
            { transform: [{ rotate: leftArmRotate }] },
          ]}
        />
        <Animated.View
          style={[
            styles.arm,
            styles.rightArm,
            { transform: [{ rotate: rightArmRotate }] },
          ]}
        />
        <Animated.View
          style={[
            styles.leg,
            styles.leftLeg,
            { transform: [{ rotate: leftLegRotate }] },
          ]}
        />
        <Animated.View
          style={[
            styles.leg,
            styles.rightLeg,
            { transform: [{ rotate: rightLegRotate }] },
          ]}
        />
      </Animated.View>
    </View>
  );
}

function HorizontalFigure({ mode, compact = false }) {
  const progress = useExerciseLoop(mode === 'push-up' ? 900 : 1300);

  const bodyY =
    mode === 'push-up'
      ? progress.interpolate({ inputRange: [0, 1], outputRange: [0, 22] })
      : progress.interpolate({ inputRange: [0, 1], outputRange: [0, 3] });

  const pulse =
    mode === 'plank'
      ? progress.interpolate({ inputRange: [0, 1], outputRange: [1, 1.018] })
      : 1;

  return (
    <View style={[styles.figureCanvas, compact && styles.figureCanvasCompact]}>
      <View style={styles.demoFloorHorizontal} />
      <Animated.View
        style={[
          styles.horizontalPerson,
          {
            transform: [
              { translateY: bodyY },
              { scale: compact ? 0.78 : pulse },
            ],
          },
        ]}
      >
        <View style={styles.horizontalHead} />
        <View style={styles.horizontalTorso}>
          <View style={styles.horizontalAccent} />
        </View>
        <View style={[styles.horizontalLimb, styles.frontArm]} />
        <View style={[styles.horizontalLimb, styles.backArm]} />
        <View style={[styles.horizontalLimb, styles.frontLeg]} />
        <View style={[styles.horizontalLimb, styles.backLeg]} />
      </Animated.View>
    </View>
  );
}

function ExerciseDemo({ exercise, compact = false }) {
  const horizontal = exercise.demo === 'push-up' || exercise.demo === 'plank';

  return (
    <View style={[styles.demoCard, compact && styles.demoCardCompact]}>
      {!compact && (
        <View style={styles.demoTopRow}>
          <View style={styles.livePill}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>ANIMATED DEMO</Text>
          </View>
          <Text style={styles.demoHint}>Follow the movement</Text>
        </View>
      )}
      {horizontal ? (
        <HorizontalFigure mode={exercise.demo} compact={compact} />
      ) : (
        <VerticalFigure mode={exercise.demo} compact={compact} />
      )}
    </View>
  );
}

function MetricPill({ label }) {
  return (
    <View style={styles.metricPill}>
      <Text style={styles.metricPillText}>{label}</Text>
    </View>
  );
}

function HomeScreen({ completed, onStart }) {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <View style={styles.brandRow}>
        <View>
          <Text style={styles.brandText}>DAILYFIT</Text>
          <Text style={styles.todayLabel}>TODAY · DAY 1</Text>
        </View>
        <View style={styles.dayCircle}>
          <Text style={styles.dayCircleSmall}>DAY</Text>
          <Text style={styles.dayCircleNumber}>1</Text>
        </View>
      </View>

      <Text style={styles.homeTitle}>Today’s workout</Text>
      <Text style={styles.homeSubtitle}>Full Body Beginner</Text>

      <View style={styles.metricRow}>
        <MetricPill label="20 min" />
        <MetricPill label="8 exercises" />
        <MetricPill label="Beginner" />
      </View>

      <View style={styles.featureCard}>
        <View style={styles.featureTop}>
          <View style={styles.featureCopy}>
            <View style={styles.readyBadge}>
              <Text style={styles.readyBadgeText}>{completed ? 'COMPLETED' : 'READY TO START'}</Text>
            </View>
            <Text style={styles.featureTitle}>Day 1</Text>
            <Text style={styles.featureDescription}>
              A guided full-body session with an animated demo for every movement.
            </Text>
          </View>
          <ExerciseDemo exercise={dayOne.exercises[3]} compact />
        </View>

        <Pressable
          style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
          onPress={onStart}
        >
          <Text style={styles.primaryButtonText}>
            {completed ? 'Repeat Day 1' : 'Start Day 1'}
          </Text>
          <Text style={styles.buttonArrow}>→</Text>
        </Pressable>
      </View>

      <View style={styles.sectionHeadingRow}>
        <Text style={styles.sectionTitle}>What you’ll do</Text>
        <Text style={styles.sectionMeta}>8 moves</Text>
      </View>

      <View style={styles.exerciseListCard}>
        {dayOne.exercises.slice(0, 4).map((exercise, index) => (
          <View key={exercise.name} style={[styles.exerciseRow, index === 3 && styles.exerciseRowLast]}>
            <View style={styles.exerciseIndex}>
              <Text style={styles.exerciseIndexText}>{String(index + 1).padStart(2, '0')}</Text>
            </View>
            <View style={styles.exerciseRowCopy}>
              <Text style={styles.exerciseRowName}>{exercise.name}</Text>
              <Text style={styles.exerciseRowTarget}>{exercise.target}</Text>
            </View>
            <Text style={styles.exerciseRowDetail}>{exercise.detail}</Text>
          </View>
        ))}
        <View style={styles.moreRow}>
          <Text style={styles.moreText}>+ 4 more exercises in Day 1</Text>
        </View>
      </View>

      <View style={styles.beginnerNote}>
        <View style={styles.beginnerIcon}><Text style={styles.beginnerIconText}>i</Text></View>
        <View style={styles.beginnerCopy}>
          <Text style={styles.beginnerTitle}>First workout?</Text>
          <Text style={styles.beginnerText}>
            Watch each animation first. Move at a comfortable range and stop if you feel sharp pain.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

function DaysScreen({ completed, onStart }) {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <Text style={styles.pageKicker}>PROGRAM</Text>
      <Text style={styles.pageTitle}>Training days</Text>
      <Text style={styles.pageSubtitle}>Build consistency one guided day at a time.</Text>

      <Pressable style={styles.activeDayCard} onPress={onStart}>
        <View style={styles.activeDayTop}>
          <View style={styles.activeDayBadge}><Text style={styles.activeDayBadgeText}>DAY 1</Text></View>
          <Text style={styles.activeDayState}>{completed ? 'Completed ✓' : 'Ready'}</Text>
        </View>
        <Text style={styles.activeDayTitle}>Full Body Beginner</Text>
        <Text style={styles.activeDayMeta}>20 min · 8 exercises · Animated guidance</Text>
        <View style={styles.activeDayAction}>
          <Text style={styles.activeDayActionText}>{completed ? 'Train again' : 'Start workout'}</Text>
          <Text style={styles.activeDayActionArrow}>→</Text>
        </View>
      </Pressable>

      <Text style={styles.nextDaysLabel}>NEXT DAYS</Text>

      {[2, 3, 4, 5, 6, 7].map((day) => (
        <View key={day} style={styles.lockedDayCard}>
          <View style={styles.lockedDayNumber}>
            <Text style={styles.lockedDayNumberText}>{String(day).padStart(2, '0')}</Text>
          </View>
          <View style={styles.dayListInfo}>
            <Text style={styles.lockedTitle}>Coming Soon</Text>
            <Text style={styles.dayListMeta}>Your next guided workout</Text>
          </View>
          <View style={styles.lockBubble}><Text style={styles.lockBubbleText}>•</Text></View>
        </View>
      ))}
    </ScrollView>
  );
}

function ProgressScreen({ completed }) {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <Text style={styles.pageKicker}>YOUR JOURNEY</Text>
      <Text style={styles.pageTitle}>Progress</Text>
      <Text style={styles.pageSubtitle}>Day 1 is the start. Consistency comes next.</Text>

      <View style={styles.progressHero}>
        <View style={styles.progressCircle}>
          <Text style={styles.progressPercent}>{completed ? '100%' : '0%'}</Text>
          <Text style={styles.progressCircleLabel}>Day 1</Text>
        </View>
        <View style={styles.progressHeroCopy}>
          <Text style={styles.progressHeroTitle}>{completed ? 'Great start.' : 'Ready when you are.'}</Text>
          <Text style={styles.progressHeroText}>
            {completed
              ? 'Your first workout is complete. Day 2 will appear when we add it.'
              : 'Complete Day 1 to begin building your training history.'}
          </Text>
        </View>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{completed ? '1' : '0'}</Text>
          <Text style={styles.statLabel}>Workouts</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{completed ? '20' : '0'}</Text>
          <Text style={styles.statLabel}>Minutes</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{completed ? '1' : '0'}</Text>
          <Text style={styles.statLabel}>Day streak</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>1/7</Text>
          <Text style={styles.statLabel}>Plan days</Text>
        </View>
      </View>
    </ScrollView>
  );
}

function ProfileRow({ label, value, last = false }) {
  return (
    <View style={[styles.profileRow, last && styles.profileRowLast]}>
      <Text style={styles.profileRowLabel}>{label}</Text>
      <View style={styles.profileRowRight}>
        <Text style={styles.profileRowValue}>{value}</Text>
        <Text style={styles.profileChevron}>›</Text>
      </View>
    </View>
  );
}

function ProfileScreen({ completed }) {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <Text style={styles.pageKicker}>ACCOUNT</Text>
      <Text style={styles.pageTitle}>Profile</Text>

      <View style={styles.profileHero}>
        <View style={styles.profileAvatarWrap}>
          <View style={styles.bigAvatar}>
            <Text style={styles.bigAvatarText}>DF</Text>
          </View>
          <View style={styles.levelDot} />
        </View>
        <View style={styles.profileHeroCopy}>
          <Text style={styles.profileName}>DailyFit Athlete</Text>
          <Text style={styles.profileLevel}>Beginner · Day 1 program</Text>
        </View>
      </View>

      <View style={styles.profileStatsRow}>
        <View style={styles.profileStat}>
          <Text style={styles.profileStatValue}>{completed ? '1' : '0'}</Text>
          <Text style={styles.profileStatLabel}>Workouts</Text>
        </View>
        <View style={styles.profileStatDivider} />
        <View style={styles.profileStat}>
          <Text style={styles.profileStatValue}>{completed ? '20' : '0'}</Text>
          <Text style={styles.profileStatLabel}>Minutes</Text>
        </View>
        <View style={styles.profileStatDivider} />
        <View style={styles.profileStat}>
          <Text style={styles.profileStatValue}>{completed ? '1' : '0'}</Text>
          <Text style={styles.profileStatLabel}>Streak</Text>
        </View>
      </View>

      <View style={styles.currentPlanCard}>
        <View style={styles.currentPlanTop}>
          <View>
            <Text style={styles.currentPlanKicker}>CURRENT PLAN</Text>
            <Text style={styles.currentPlanTitle}>Beginner · 7 Days</Text>
          </View>
          <View style={styles.planProgressPill}>
            <Text style={styles.planProgressText}>1 / 7</Text>
          </View>
        </View>
        <View style={styles.planTrack}>
          <View style={styles.planTrackFill} />
        </View>
        <Text style={styles.currentPlanCaption}>Day 1 available now · New days will be added progressively.</Text>
      </View>

      <View style={styles.goalCard}>
        <View style={styles.goalIcon}><Text style={styles.goalIconText}>◎</Text></View>
        <View style={styles.goalCopy}>
          <Text style={styles.goalLabel}>YOUR GOAL</Text>
          <Text style={styles.goalText}>Build a consistent workout habit</Text>
        </View>
      </View>

      <Text style={styles.settingsTitle}>Preferences</Text>
      <View style={styles.settingsCard}>
        <ProfileRow label="Training level" value="Beginner" />
        <ProfileRow label="Language" value="English" />
        <ProfileRow label="Workout reminders" value="Coming soon" />
        <ProfileRow label="App version" value="1.1.0" last />
      </View>
    </ScrollView>
  );
}

function InstructionCard({ title, items, warning = false }) {
  return (
    <View style={[styles.instructionCard, warning && styles.warningCard]}>
      <Text style={[styles.instructionTitle, warning && styles.warningTitle]}>{title}</Text>
      {items.map((item, index) => (
        <View key={item} style={styles.instructionRow}>
          <View style={[styles.instructionBullet, warning && styles.warningBullet]}>
            <Text style={[styles.instructionBulletText, warning && styles.warningBulletText]}>
              {warning ? '!' : index + 1}
            </Text>
          </View>
          <Text style={styles.instructionText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

function WorkoutScreen({ onClose, onComplete }) {
  const [index, setIndex] = useState(0);
  const exercise = dayOne.exercises[index];
  const percent = Math.round(((index + 1) / dayOne.exercises.length) * 100);
  const buttonLabel = index === dayOne.exercises.length - 1 ? 'Complete Day 1' : 'Next Exercise';

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
        <Pressable onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeText}>×</Text>
        </Pressable>
        <View style={styles.workoutHeaderCenter}>
          <Text style={styles.workoutHeaderKicker}>DAY 1</Text>
          <Text style={styles.workoutHeaderTitle}>Full Body Beginner</Text>
        </View>
        <Text style={styles.stepText}>{index + 1}/{dayOne.exercises.length}</Text>
      </View>

      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: String(percent) + '%' }]} />
      </View>

      <ScrollView
        style={styles.workoutScroll}
        contentContainerStyle={styles.workoutScrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.exerciseHeadlineRow}>
          <View style={styles.typePill}><Text style={styles.typePillText}>{exercise.type.toUpperCase()}</Text></View>
          <Text style={styles.targetText}>{exercise.target}</Text>
        </View>

        <Text style={styles.activeExerciseName}>{exercise.name}</Text>
        <Text style={styles.activeExerciseDetail}>{exercise.detail}</Text>

        <ExerciseDemo exercise={exercise} />

        <InstructionCard title="How to do it" items={exercise.how} />
        <InstructionCard title="Avoid these mistakes" items={exercise.mistakes} warning />

        <Text style={styles.safetyLine}>
          Move within a comfortable range. Stop if you feel sharp or unusual pain.
        </Text>
      </ScrollView>

      <View style={styles.workoutFooter}>
        {index > 0 && (
          <Pressable
            style={styles.secondaryButton}
            onPress={() => setIndex((current) => current - 1)}
          >
            <Text style={styles.secondaryButtonText}>Back</Text>
          </Pressable>
        )}
        <Pressable style={[styles.primaryButton, styles.workoutNextButton]} onPress={next}>
          <Text style={styles.primaryButtonText}>{buttonLabel}</Text>
          <Text style={styles.buttonArrow}>→</Text>
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
    if (tab === 'Days') {
      return <DaysScreen completed={completed} onStart={() => setInWorkout(true)} />;
    }
    if (tab === 'Progress') return <ProgressScreen completed={completed} />;
    if (tab === 'Profile') return <ProfileScreen completed={completed} />;
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
              <View style={[styles.navIconWrap, active && styles.navIconWrapActive]}>
                <Text style={[styles.navIcon, active && styles.navIconActive]}>{icon}</Text>
              </View>
              <Text style={[styles.navText, active && styles.navTextActive]}>{name}</Text>
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#F3F6F4',
    paddingTop: RNStatusBar.currentHeight || 0,
  },
  content: { flex: 1 },
  scrollContent: { padding: 20, paddingBottom: 34 },

  brandRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandText: {
    color: '#173D2C',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 2.2,
  },
  todayLabel: {
    marginTop: 7,
    color: '#7B8B83',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.1,
  },
  dayCircle: {
    width: 58,
    height: 58,
    borderRadius: 21,
    backgroundColor: '#12271E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCircleSmall: {
    color: '#7F968A',
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 1,
  },
  dayCircleNumber: {
    color: '#71E5A6',
    fontSize: 23,
    fontWeight: '900',
    lineHeight: 25,
  },
  homeTitle: {
    marginTop: 30,
    color: '#10251B',
    fontSize: 34,
    lineHeight: 39,
    fontWeight: '900',
    letterSpacing: -0.8,
  },
  homeSubtitle: {
    color: '#4E6359',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 5,
  },
  metricRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 18,
  },
  metricPill: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E3EAE6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  metricPillText: {
    color: '#52655C',
    fontSize: 12,
    fontWeight: '700',
  },

  featureCard: {
    backgroundColor: '#11271D',
    borderRadius: 30,
    padding: 18,
    marginTop: 24,
    marginBottom: 28,
  },
  featureTop: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 170,
  },
  featureCopy: {
    flex: 1,
    paddingRight: 8,
  },
  readyBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#214734',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  readyBadgeText: {
    color: '#7BE4AA',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
  },
  featureTitle: {
    marginTop: 14,
    color: '#FFFFFF',
    fontSize: 31,
    fontWeight: '900',
  },
  featureDescription: {
    marginTop: 7,
    color: '#A9BAB1',
    fontSize: 13,
    lineHeight: 19,
    maxWidth: 185,
  },

  primaryButton: {
    minHeight: 56,
    borderRadius: 18,
    backgroundColor: '#69E39F',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  primaryButtonText: {
    color: '#0B2919',
    fontSize: 16,
    fontWeight: '900',
  },
  buttonArrow: {
    color: '#0B2919',
    fontSize: 20,
    fontWeight: '900',
    marginLeft: 10,
    marginTop: -1,
  },
  pressed: { opacity: 0.85 },

  sectionHeadingRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: '#10251B',
    fontSize: 20,
    fontWeight: '900',
  },
  sectionMeta: {
    color: '#85938C',
    fontSize: 12,
    fontWeight: '700',
  },
  exerciseListCard: {
    marginTop: 13,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 15,
    overflow: 'hidden',
  },
  exerciseRow: {
    minHeight: 72,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ECF0EE',
  },
  exerciseRowLast: { borderBottomWidth: 0 },
  exerciseIndex: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: '#E7F7EE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  exerciseIndexText: {
    color: '#20784D',
    fontSize: 11,
    fontWeight: '900',
  },
  exerciseRowCopy: {
    flex: 1,
    paddingHorizontal: 12,
  },
  exerciseRowName: {
    color: '#172A21',
    fontSize: 14,
    fontWeight: '800',
  },
  exerciseRowTarget: {
    marginTop: 3,
    color: '#8A9790',
    fontSize: 10,
    fontWeight: '600',
  },
  exerciseRowDetail: {
    color: '#50635A',
    fontSize: 11,
    fontWeight: '800',
    maxWidth: 88,
    textAlign: 'right',
  },
  moreRow: {
    paddingVertical: 14,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#EEF2F0',
  },
  moreText: {
    color: '#3E7459',
    fontSize: 12,
    fontWeight: '800',
  },
  beginnerNote: {
    marginTop: 18,
    borderRadius: 22,
    backgroundColor: '#E7F5ED',
    padding: 16,
    flexDirection: 'row',
  },
  beginnerIcon: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: '#CFF0DE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  beginnerIconText: {
    color: '#1C7048',
    fontWeight: '900',
  },
  beginnerCopy: { flex: 1 },
  beginnerTitle: {
    color: '#18392A',
    fontSize: 14,
    fontWeight: '900',
  },
  beginnerText: {
    color: '#597066',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4,
  },

  pageKicker: {
    color: '#258155',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.6,
  },
  pageTitle: {
    color: '#10251B',
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: -0.7,
    marginTop: 6,
  },
  pageSubtitle: {
    color: '#73827B',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 7,
    marginBottom: 24,
  },

  activeDayCard: {
    borderRadius: 28,
    backgroundColor: '#11271D',
    padding: 20,
    marginBottom: 22,
  },
  activeDayTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activeDayBadge: {
    backgroundColor: '#67E09C',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  activeDayBadgeText: {
    color: '#0B2A19',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  activeDayState: {
    color: '#A9BAB1',
    fontSize: 12,
    fontWeight: '700',
  },
  activeDayTitle: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '900',
    marginTop: 22,
  },
  activeDayMeta: {
    color: '#94A89E',
    fontSize: 13,
    marginTop: 6,
  },
  activeDayAction: {
    marginTop: 22,
    minHeight: 48,
    borderRadius: 16,
    backgroundColor: '#1D392B',
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  activeDayActionText: {
    color: '#DDF5E8',
    fontSize: 13,
    fontWeight: '800',
  },
  activeDayActionArrow: {
    color: '#6CE09E',
    fontSize: 20,
    fontWeight: '900',
  },
  nextDaysLabel: {
    color: '#7E8C85',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  lockedDayCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    minHeight: 74,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  lockedDayNumber: {
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: '#EFF2F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockedDayNumberText: {
    color: '#909C96',
    fontSize: 13,
    fontWeight: '900',
  },
  dayListInfo: {
    flex: 1,
    paddingHorizontal: 13,
  },
  lockedTitle: {
    color: '#66766E',
    fontSize: 14,
    fontWeight: '800',
  },
  dayListMeta: {
    color: '#A0AAA5',
    fontSize: 11,
    marginTop: 3,
  },
  lockBubble: {
    width: 30,
    height: 30,
    borderRadius: 12,
    backgroundColor: '#F1F3F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockBubbleText: {
    color: '#A7B0AB',
    fontSize: 18,
    marginTop: -7,
  },

  progressHero: {
    backgroundColor: '#11271D',
    borderRadius: 28,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressCircle: {
    width: 112,
    height: 112,
    borderRadius: 56,
    borderWidth: 10,
    borderColor: '#69E39F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressPercent: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '900',
  },
  progressCircleLabel: {
    color: '#8DA49A',
    fontSize: 10,
    fontWeight: '700',
    marginTop: 2,
  },
  progressHeroCopy: {
    flex: 1,
    marginLeft: 18,
  },
  progressHeroTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '900',
  },
  progressHeroText: {
    color: '#A1B2AA',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 7,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 16,
  },
  statCard: {
    width: '48.5%',
    minHeight: 112,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    padding: 17,
    justifyContent: 'center',
  },
  statValue: {
    color: '#14281E',
    fontSize: 30,
    fontWeight: '900',
  },
  statLabel: {
    color: '#85938C',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 5,
  },

  profileHero: {
    backgroundColor: '#11271D',
    borderRadius: 28,
    padding: 20,
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileAvatarWrap: {
    position: 'relative',
  },
  bigAvatar: {
    width: 72,
    height: 72,
    borderRadius: 25,
    backgroundColor: '#68E09C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigAvatarText: {
    color: '#0A2A19',
    fontSize: 22,
    fontWeight: '900',
  },
  levelDot: {
    position: 'absolute',
    right: -3,
    bottom: -3,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#F3F6F4',
    borderWidth: 5,
    borderColor: '#11271D',
  },
  profileHeroCopy: {
    flex: 1,
    paddingLeft: 16,
  },
  profileName: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
  },
  profileLevel: {
    color: '#99ACA3',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 5,
  },
  profileStatsRow: {
    minHeight: 90,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  profileStat: {
    flex: 1,
    alignItems: 'center',
  },
  profileStatValue: {
    color: '#13271D',
    fontSize: 22,
    fontWeight: '900',
  },
  profileStatLabel: {
    color: '#8B9691',
    fontSize: 10,
    fontWeight: '700',
    marginTop: 4,
  },
  profileStatDivider: {
    width: 1,
    height: 36,
    backgroundColor: '#E7ECE9',
  },
  currentPlanCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 17,
    marginTop: 12,
  },
  currentPlanTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  currentPlanKicker: {
    color: '#278359',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  currentPlanTitle: {
    color: '#182B22',
    fontSize: 16,
    fontWeight: '900',
    marginTop: 4,
  },
  planProgressPill: {
    backgroundColor: '#E5F6ED',
    borderRadius: 999,
    paddingHorizontal: 11,
    paddingVertical: 7,
  },
  planProgressText: {
    color: '#277A52',
    fontSize: 11,
    fontWeight: '900',
  },
  planTrack: {
    height: 7,
    borderRadius: 99,
    backgroundColor: '#E9EEEB',
    overflow: 'hidden',
    marginTop: 17,
  },
  planTrackFill: {
    width: '14.3%',
    height: '100%',
    backgroundColor: '#62D996',
  },
  currentPlanCaption: {
    color: '#84918B',
    fontSize: 11,
    lineHeight: 16,
    marginTop: 10,
  },
  goalCard: {
    backgroundColor: '#E6F5EC',
    borderRadius: 22,
    padding: 16,
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  goalIcon: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: '#CDEDDC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  goalIconText: {
    color: '#1E754D',
    fontSize: 22,
    fontWeight: '900',
  },
  goalCopy: {
    flex: 1,
    marginLeft: 13,
  },
  goalLabel: {
    color: '#428065',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1.1,
  },
  goalText: {
    color: '#17392A',
    fontSize: 14,
    fontWeight: '800',
    marginTop: 3,
  },
  settingsTitle: {
    color: '#162A20',
    fontSize: 18,
    fontWeight: '900',
    marginTop: 24,
    marginBottom: 10,
  },
  settingsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    paddingHorizontal: 16,
  },
  profileRow: {
    minHeight: 58,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF1EF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileRowLast: { borderBottomWidth: 0 },
  profileRowLabel: {
    color: '#31473C',
    fontSize: 13,
    fontWeight: '700',
  },
  profileRowRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileRowValue: {
    color: '#8D9993',
    fontSize: 12,
    fontWeight: '600',
  },
  profileChevron: {
    color: '#AFB8B3',
    fontSize: 20,
    marginLeft: 7,
  },

  bottomNav: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E8ECEA',
    flexDirection: 'row',
    paddingTop: 8,
    paddingBottom: 7,
  },
  navItem: {
    flex: 1,
    minHeight: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIconWrap: {
    width: 30,
    height: 25,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIconWrapActive: {
    backgroundColor: '#E1F5EA',
  },
  navIcon: {
    color: '#A0AAA5',
    fontSize: 17,
    fontWeight: '800',
  },
  navIconActive: {
    color: '#21774E',
  },
  navText: {
    color: '#A0AAA5',
    fontSize: 9,
    fontWeight: '800',
    marginTop: 2,
  },
  navTextActive: {
    color: '#21774E',
  },

  workoutScreen: {
    flex: 1,
    backgroundColor: '#10251B',
  },
  workoutHeader: {
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 13,
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#1A3929',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    color: '#FFFFFF',
    fontSize: 27,
    lineHeight: 29,
  },
  workoutHeaderCenter: {
    flex: 1,
    alignItems: 'center',
  },
  workoutHeaderKicker: {
    color: '#6EDC9D',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  workoutHeaderTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
    marginTop: 2,
  },
  stepText: {
    width: 42,
    color: '#9AAEA4',
    textAlign: 'right',
    fontSize: 12,
    fontWeight: '800',
  },
  progressTrack: {
    height: 4,
    marginHorizontal: 20,
    borderRadius: 99,
    backgroundColor: '#254334',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 99,
    backgroundColor: '#67DF9B',
  },
  workoutScroll: {
    flex: 1,
    backgroundColor: '#F4F7F5',
    marginTop: 15,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  workoutScrollContent: {
    padding: 20,
    paddingBottom: 28,
  },
  exerciseHeadlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  typePill: {
    backgroundColor: '#DDF4E7',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  typePillText: {
    color: '#267B52',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.9,
  },
  targetText: {
    color: '#819087',
    fontSize: 11,
    fontWeight: '700',
  },
  activeExerciseName: {
    color: '#10251B',
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '900',
    marginTop: 16,
    letterSpacing: -0.6,
  },
  activeExerciseDetail: {
    color: '#4F645A',
    fontSize: 17,
    fontWeight: '800',
    marginTop: 5,
  },

  demoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    padding: 14,
    marginTop: 20,
    overflow: 'hidden',
  },
  demoCardCompact: {
    width: 132,
    height: 145,
    padding: 0,
    marginTop: 0,
    backgroundColor: '#DFF3E7',
    borderRadius: 24,
  },
  demoTopRow: {
    minHeight: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
  },
  livePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E4F6EC',
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 999,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#36B977',
    marginRight: 6,
  },
  liveText: {
    color: '#26794F',
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  demoHint: {
    color: '#93A098',
    fontSize: 10,
    fontWeight: '700',
  },

  figureCanvas: {
    height: 250,
    marginTop: 4,
    borderRadius: 20,
    backgroundColor: '#EAF4EE',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  figureCanvasCompact: {
    flex: 1,
    height: 145,
    marginTop: 0,
    borderRadius: 24,
    backgroundColor: '#DFF3E7',
  },
  demoFloor: {
    position: 'absolute',
    bottom: 29,
    width: 170,
    height: 7,
    borderRadius: 99,
    backgroundColor: '#D2E4D9',
  },
  demoFloorHorizontal: {
    position: 'absolute',
    bottom: 30,
    width: 190,
    height: 7,
    borderRadius: 99,
    backgroundColor: '#D2E4D9',
  },
  verticalPerson: {
    width: 180,
    height: 210,
    position: 'relative',
  },
  head: {
    position: 'absolute',
    top: 10,
    left: 72,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#173A2A',
  },
  neck: {
    position: 'absolute',
    top: 45,
    left: 83,
    width: 16,
    height: 16,
    borderRadius: 7,
    backgroundColor: '#173A2A',
  },
  torso: {
    position: 'absolute',
    top: 57,
    left: 63,
    width: 57,
    height: 82,
    borderRadius: 22,
    backgroundColor: '#173A2A',
    overflow: 'hidden',
  },
  torsoAccent: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 23,
    backgroundColor: '#58D491',
  },
  arm: {
    position: 'absolute',
    top: 69,
    width: 15,
    height: 82,
    borderRadius: 8,
    backgroundColor: '#173A2A',
  },
  leftArm: {
    left: 48,
  },
  rightArm: {
    right: 45,
  },
  leg: {
    position: 'absolute',
    top: 131,
    width: 18,
    height: 78,
    borderRadius: 9,
    backgroundColor: '#173A2A',
  },
  leftLeg: {
    left: 68,
  },
  rightLeg: {
    right: 65,
  },

  horizontalPerson: {
    width: 235,
    height: 155,
    position: 'relative',
  },
  horizontalHead: {
    position: 'absolute',
    left: 20,
    top: 48,
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: '#173A2A',
  },
  horizontalTorso: {
    position: 'absolute',
    left: 53,
    top: 60,
    width: 126,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#173A2A',
    overflow: 'hidden',
    transform: [{ rotate: '5deg' }],
  },
  horizontalAccent: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 43,
    backgroundColor: '#58D491',
  },
  horizontalLimb: {
    position: 'absolute',
    width: 15,
    height: 77,
    borderRadius: 8,
    backgroundColor: '#173A2A',
  },
  frontArm: {
    left: 71,
    top: 75,
    transform: [{ rotate: '25deg' }],
  },
  backArm: {
    left: 94,
    top: 76,
    transform: [{ rotate: '17deg' }],
  },
  frontLeg: {
    right: 31,
    top: 71,
    transform: [{ rotate: '-56deg' }],
  },
  backLeg: {
    right: 52,
    top: 72,
    transform: [{ rotate: '-49deg' }],
  },

  instructionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 17,
    marginTop: 13,
  },
  warningCard: {
    backgroundColor: '#FFF6ED',
  },
  instructionTitle: {
    color: '#183027',
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 12,
  },
  warningTitle: {
    color: '#7D4A22',
  },
  instructionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  instructionBullet: {
    width: 24,
    height: 24,
    borderRadius: 9,
    backgroundColor: '#E2F3E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  warningBullet: {
    backgroundColor: '#F8DDC2',
  },
  instructionBulletText: {
    color: '#26764F',
    fontSize: 10,
    fontWeight: '900',
  },
  warningBulletText: {
    color: '#9A5E28',
  },
  instructionText: {
    flex: 1,
    color: '#5B6D64',
    fontSize: 12,
    lineHeight: 19,
    paddingTop: 2,
  },
  safetyLine: {
    color: '#84918B',
    fontSize: 10,
    lineHeight: 16,
    textAlign: 'center',
    marginTop: 17,
    paddingHorizontal: 14,
  },
  workoutFooter: {
    backgroundColor: '#F4F7F5',
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 15,
    flexDirection: 'row',
    gap: 10,
  },
  secondaryButton: {
    minWidth: 88,
    minHeight: 56,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#D6DFDA',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  secondaryButtonText: {
    color: '#41554B',
    fontSize: 14,
    fontWeight: '900',
  },
  workoutNextButton: {
    flex: 1,
  },
});
