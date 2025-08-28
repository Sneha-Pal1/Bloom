// Central mapping from pose/exercise IDs to GIF file paths
// Place your .gif files in `public/gifs/` and reference them here.

export const poseGifs: Record<string, string> = {
  // Yoga poses - Files that exist
  "cat-cow": "/gifs/cat-cow-pose.mp4",
  "bridge-pose": "/gifs/bridge-pose.mp4",

  "warrior-flow": "/gifs/warrior-two.jpeg",
  "warrior-ii": "/gifs/warrior-two.jpeg",
  "downward-dog": "/gifs/forward-fold.jpeg",
  "tree-pose": "/gifs/tree-pose.jpeg",
  "childs-pose": "/gifs/child-pose.mp4",
  "supine-twist": "/gifs/gentle-spinal-twists.jpeg",
  "happy-baby": "/gifs/happy-baby-pose.mp4",
  "goddess-pose": "/gifs/goddess-pose.jpeg",
  "butterfly-pose": "/gifs/butterfly.jpeg",
  "seated-forward-fold": "/gifs/seated-forward-fold.jpeg",
  "legs-up-wall": "/gifs/legs-up-the-wall.jpeg",
  "camel-pose": "/gifs/camel-pose.jpeg",
  "cobra-pose": "/gifs/cobra-pose.mp4",
  "sun-salutation": "/gifs/sun-salutation.mp4",
  "bow-pose": "/gifs/bow-pose.jpeg",
  meditation: "/gifs/butterfly.jpeg",
  "forward-fold": "/gifs/forward-fold.jpeg",
  "restorative-pose": "/gifs/savasana.jpeg",

  // Exercises - uncomment when you add the files
  "modified-planks": "/gifs/plank.mp4",
  lunges: "/gifs/side-lunges.mp4",
  "pelvic-tilts": "/gifs/bridge-pose.mp4",
  "split-squat": "/gifs/foot-elevated-split-squat.mp4",
  "hip-circles": "/gifs/hip-circle.jpeg",
  "gentle-twists": "/gifs/gentle-spinal-twists.jpeg",

  // "glute-bridges": "/gifs/glute-bridges.gif",
  squats: "/gifs/squats.mp4",
  "mountain-climbers": "/gifs/mountain-climber.mp4",
  "side-leg-raise": "/gifs/side-leg-raises.mp4",
  // "resistance-band": "/gifs/resistance-band.gif",
  // "pelvic-rocks": "/gifs/pelvic-rocks.gif",
  "knee-to-chest": "/gifs/gentle-stretching.jpeg",
  // "heat-therapy": "/gifs/heat-therapy.gif",
  "gentle-backbend": "/gifs/gentle-heart-opener.mp4",
};

// Function to get the gif path for a pose/exercise ID
export function getGifForPose(poseId: string): string | undefined {
  return poseGifs[poseId];
}
