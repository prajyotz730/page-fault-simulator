/**
 * Clock (Second Chance) Page Replacement Algorithm
 * A circular list approximation of LRU using reference bits.
 * Pages with reference bit = 1 get a "second chance" before eviction.
 */
export function simulateClock(referenceString, frameCount) {
  const steps = [];
  const frames = new Array(frameCount).fill(null);
  const refBits = new Array(frameCount).fill(0);
  let pointer = 0;
  let faults = 0;
  let hits = 0;

  for (let i = 0; i < referenceString.length; i++) {
    const page = referenceString[i];
    const frameIndex = frames.indexOf(page);
    const isHit = frameIndex !== -1;
    let replacedPage = null;
    let replacedIndex = -1;

    if (isHit) {
      hits++;
      refBits[frameIndex] = 1; // set reference bit on access
    } else {
      faults++;
      const emptyIndex = frames.indexOf(null);
      if (emptyIndex !== -1) {
        frames[emptyIndex] = page;
        refBits[emptyIndex] = 1;
        replacedIndex = emptyIndex;
      } else {
        // Clock algorithm: sweep until finding a page with refBit = 0
        while (refBits[pointer] === 1) {
          refBits[pointer] = 0; // give second chance
          pointer = (pointer + 1) % frameCount;
        }
        replacedPage = frames[pointer];
        replacedIndex = pointer;
        frames[pointer] = page;
        refBits[pointer] = 1;
        pointer = (pointer + 1) % frameCount;
      }
    }

    steps.push({
      page,
      frames: [...frames],
      refBits: [...refBits],
      clockPointer: pointer,
      isHit,
      faults,
      hits,
      replacedPage,
      replacedIndex,
      description: isHit
        ? `Page ${page} found in frame — HIT (ref bit set)`
        : replacedPage !== null
          ? `Page ${page} replaced page ${replacedPage} (clock hand swept) — FAULT`
          : `Page ${page} loaded into empty frame — FAULT`,
    });
  }

  return { steps, totalFaults: faults, totalHits: hits, algorithm: 'Clock' };
}
