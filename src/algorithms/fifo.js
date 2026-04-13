/**
 * FIFO (First-In, First-Out) Page Replacement Algorithm
 * Replaces the page that has been in memory the longest.
 */
export function simulateFIFO(referenceString, frameCount) {
  const steps = [];
  const frames = new Array(frameCount).fill(null);
  const queue = []; // tracks insertion order
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
        queue.push(page);
        replacedIndex = emptyIndex;
      } else {
        const oldest = queue.shift();
        replacedIndex = frames.indexOf(oldest);
        replacedPage = oldest;
        frames[replacedIndex] = page;
        queue.push(page);
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
          ? `Page ${page} replaced page ${replacedPage} (oldest in memory) — FAULT`
          : `Page ${page} loaded into empty frame — FAULT`,
    });
  }

  return { steps, totalFaults: faults, totalHits: hits, algorithm: 'FIFO' };
}
