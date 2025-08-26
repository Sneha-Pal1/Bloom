// Central mapping from pose/exercise IDs to GIF file paths
// Place your .gif files in `public/gifs/` and reference them here.

export const poseGifs: Record<string, string> = {
  // Yoga poses - Files that exist
  "cat-cow": "/gifs/cat-cow-pose.mp4",
  "bridge-pose": "/gifs/bridge-pose.mp4",

  // "warrior-ii": "/gifs/warrior-ii.gif",
  // "tree-pose": "/gifs/tree-pose.gif",
  "childs-pose": "/gifs/child-pose.mp4",
  // "supine-twist": "/gifs/supine-twist.gif",
  "happy-baby": "/gifs/happy-baby-pose.mp4",
  // "goddess-pose": "/gifs/goddess-pose.gif",
  "butterfly-pose": "/gifs/butterfly.jpeg",
  "seated-forward-fold": "/gifs/seated-forward-fold.jpeg",
  "legs-up-wall": "/gifs/legs-up-the-wall.jpeg",
  "camel-pose": "/gifs/camel-pose.jpeg",

  // Exercises - uncomment when you add the files
  "modified-planks": "/gifs/plank.mp4",
  lunges: "/gifs/side-lunges.mp4",
  "pelvic-tilts": "/gifs/bridge-pose.mp4",
  "split-squat": "/gifs/foot-elevated-split-squat.mp4",
  // "glute-bridges": "/gifs/glute-bridges.gif",
  squats: "/gifs/squats.mp4",
  "mountain-climbers": "/gifs/mountain-climber.mp4",
  // "resistance-band": "/gifs/resistance-band.gif",
  // "pelvic-rocks": "/gifs/pelvic-rocks.gif",
  // "knee-to-chest": "/gifs/knee-to-chest.gif",
  // "heat-therapy": "/gifs/heat-therapy.gif",
  "gentle-backbend": "/gifs/gentle-heart-opener.mp4",
};

// Function to get the gif path for a pose/exercise ID
export function getGifForPose(poseId: string): string | undefined {
  return poseGifs[poseId];
}
