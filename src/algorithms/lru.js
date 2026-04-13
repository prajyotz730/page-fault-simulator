/**
 * LRU (Least Recently Used) Page Replacement Algorithm
 * Replaces the page that has not been used for the longest time.
 */
export function simulateLRU(referenceString, frameCount) {
  const steps = [];
  const frames = new Array(frameCount).fill(null);
  const lastUsed = new Map(); // page -> last access time
  let faults = 0;
  let hits = 0;

  for (let i = 0; i < referenceString.length; i++) {
    const page = referenceString[i];
    const isHit = frames.includes(page);
    let replacedPage = null;
    let replacedIndex = -1;

    if (isHit) {
      hits++;
      lastUsed.set(page, i);
    } else {
      faults++;
      const emptyIndex = frames.indexOf(null);
      if (emptyIndex !== -1) {
        frames[emptyIndex] = page;
        replacedIndex = emptyIndex;
      } else {
        // Find the least recently used page among frames
        let lruPage = null;
        let lruTime = Infinity;
        for (const f of frames) {
          if (f !== null && (lastUsed.get(f) ?? -1) < lruTime) {
            lruTime = lastUsed.get(f) ?? -1;
            lruPage = f;
          }
        }
        replacedIndex = frames.indexOf(lruPage);
        replacedPage = lruPage;
        frames[replacedIndex] = page;
        lastUsed.delete(lruPage);
      }
      lastUsed.set(page, i);
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
          ? `Page ${page} replaced page ${replacedPage} (least recently used) — FAULT`
          : `Page ${page} loaded into empty frame — FAULT`,
    });
  }

  return { steps, totalFaults: faults, totalHits: hits, algorithm: 'LRU' };
}
