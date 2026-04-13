/**
 * Optimal (Bélády's) Page Replacement Algorithm
 * Replaces the page that will not be used for the longest time in the future.
 * This is a theoretical best-case algorithm used as a benchmark.
 */
export function simulateOptimal(referenceString, frameCount) {
  const steps = [];
  const frames = new Array(frameCount).fill(null);
  let faults = 0;
  let hits = 0;

  for (let i = 0; i < referenceString.length; i++) {
    const page = referenceString[i];
    const isHit = frames.includes(page);
    let replacedPage = null;
    let replacedIndex = -1;

    if (isHit) {
      hits++;
    } else {
      faults++;
      const emptyIndex = frames.indexOf(null);
      if (emptyIndex !== -1) {
        frames[emptyIndex] = page;
        replacedIndex = emptyIndex;
      } else {
        // Find the page that will be used farthest in the future
        let farthestPage = null;
        let farthestDist = -1;
        for (const f of frames) {
          const nextUse = referenceString.indexOf(f, i + 1);
          if (nextUse === -1) {
            // This page is never used again — best candidate
            farthestPage = f;
            farthestDist = Infinity;
            break;
          }
          if (nextUse > farthestDist) {
            farthestDist = nextUse;
            farthestPage = f;
          }
        }
        replacedIndex = frames.indexOf(farthestPage);
        replacedPage = farthestPage;
        frames[replacedIndex] = page;
      }
    }

    steps.push({
      page,
      frames: [...frames],
      isHit,
      faults,
      hits,
      replacedPage,
      replacedIndex,
      description: isHit
        ? `Page ${page} found in frame — HIT`
        : replacedPage !== null
          ? `Page ${page} replaced page ${replacedPage} (used farthest in future) — FAULT`
          : `Page ${page} loaded into empty frame — FAULT`,
    });
  }

  return { steps, totalFaults: faults, totalHits: hits, algorithm: 'Optimal' };
}
