// Central mapping from exercise/pose names to Lottie JSON asset paths.
// Place your .json files in `public/lottie/` and reference them here.

export const exerciseToLottie: Record<string, string> = {
  // Yoga / mobility
  "Cat-Cow Stretch": "/lottie/cat-cow.json",
  "Child's Pose": "/lottie/child-pose.json",
  "Gentle Twists": "/lottie/gentle-twist.json",
  "Mountain Pose": "/lottie/mountain-pose.json",
  "Legs Up Wall": "/lottie/legs-up-wall.json",
  "Gentle Hip Circles": "/lottie/hip-circles.json",
  "Seated Meditation": "/lottie/meditation.json",
  "Gratitude Practice": "/lottie/gratitude.json",
  "Tai Chi Flow": "/lottie/taichi.json",
  "Walking Meditation": "/lottie/walking-meditation.json",
  "Breath Awareness": "/lottie/breath-awareness.json",
  "Body Scan": "/lottie/body-scan.json",
  "Gentle Stretching": "/lottie/gentle-stretch.json",
  "Supported Child's Pose": "/lottie/supported-child.json",
  "Breathing Exercises": "/lottie/breathing.json",

  // Strength
  "Bodyweight Squats": "/lottie/squat.json",
  "Modified Push-ups": "/lottie/pushup-modified.json",
  "Glute Bridges": "/lottie/glute-bridge.json",
  "Wall Sits": "/lottie/wall-sit.json",
  "Core Breathing": "/lottie/core-breath.json",

  // Energizing
  "Sun Salutations": "/lottie/sun-salutation.json",
  "Warrior Poses": "/lottie/warrior.json",
  "Backbends": "/lottie/backbend.json",
  "Twists": "/lottie/twist.json",
  "Energizing Breath": "/lottie/energizing-breath.json",
};

export function getLottieForExercise(exerciseName?: string): string | undefined {
  if (!exerciseName) return undefined;
  return exerciseToLottie[exerciseName];
}


