export { simulateFIFO } from './fifo';
export { simulateLRU } from './lru';
export { simulateOptimal } from './optimal';
export { simulateClock } from './clock';

export const ALGORITHMS = {
  FIFO: { name: 'FIFO', description: 'First-In, First-Out', simulate: null },
  LRU: { name: 'LRU', description: 'Least Recently Used', simulate: null },
  Optimal: { name: 'Optimal', description: "Bélády's Algorithm", simulate: null },
  Clock: { name: 'Clock', description: 'Second Chance', simulate: null },
};

// Lazy bind to avoid circular imports
import { simulateFIFO } from './fifo';
import { simulateLRU } from './lru';
import { simulateOptimal } from './optimal';
import { simulateClock } from './clock';

ALGORITHMS.FIFO.simulate = simulateFIFO;
ALGORITHMS.LRU.simulate = simulateLRU;
ALGORITHMS.Optimal.simulate = simulateOptimal;
ALGORITHMS.Clock.simulate = simulateClock;
