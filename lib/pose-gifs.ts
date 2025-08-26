// Central mapping from pose/exercise IDs to GIF file paths
// Place your .gif files in `public/gifs/` and reference them here.

export const poseGifs: Record<string, string> = {
  // Yoga poses - Files that exist
  "cat-cow": "/gifs/cat-cow-pose.mp4",
  "bridge-pose": "/gifs/bridge-pose.mp4",

  // These files don't exist yet - uncomment when you add the files
  // "warrior-ii": "/gifs/warrior-ii.gif",
  // "tree-pose": "/gifs/tree-pose.gif",
  // "childs-pose": "/gifs/childs-pose.gif",
  // "supine-twist": "/gifs/supine-twist.gif",
  // "happy-baby": "/gifs/happy-baby.gif",
  // "goddess-pose": "/gifs/goddess-pose.gif",

  // Exercises - uncomment when you add the files
  // "pelvic-tilts": "/gifs/pelvic-tilts.gif",
  // "wall-sits": "/gifs/wall-sits.gif",
  // "glute-bridges": "/gifs/glute-bridges.gif",
  // "squats": "/gifs/squats.gif",
  // "mountain-climbers": "/gifs/mountain-climbers.gif",
  // "resistance-band": "/gifs/resistance-band.gif",
  // "pelvic-rocks": "/gifs/pelvic-rocks.gif",
  // "knee-to-chest": "/gifs/knee-to-chest.gif",
  // "heat-therapy": "/gifs/heat-therapy.gif",
};

// Function to get the gif path for a pose/exercise ID
export function getGifForPose(poseId: string): string | undefined {
  return poseGifs[poseId];
}
