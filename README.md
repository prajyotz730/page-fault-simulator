# Page Fault Simulator

An interactive web application for visualizing page replacement algorithms in operating system virtual memory management.

## Live Demo

[**Try it here**](https://dist-djhipbpy.devinapps.com)

## Features

- **4 Page Replacement Algorithms**: FIFO, LRU, Optimal (Bélády's), and Clock (Second Chance)
- **Step-by-Step Simulation**: Walk through each page reference one at a time
- **Auto-Play Mode**: Watch the simulation run automatically with adjustable speed
- **Visual Page Frames**: See pages loaded into frames with color-coded hit/fault indicators
- **Clock Algorithm Details**: Reference bits and clock pointer visualization
- **Step-by-Step Tables**: Detailed tabular view of every step
- **Statistics & Comparison**: Side-by-side algorithm performance comparison with bar charts
- **Theory Panel**: Built-in explanations of each algorithm
- **Quick Presets**: Pre-configured reference strings for common scenarios
- **Random Generator**: Generate random reference strings for experimentation
- **Responsive Design**: Works on desktop and mobile

## Tech Stack

- **React 19** — UI framework
- **Vite 8** — Build tool
- **Tailwind CSS 4** — Utility-first styling

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Lint
npm run lint
```

## Project Structure

```
src/
├── algorithms/         # Page replacement algorithm implementations
│   ├── fifo.js        # First-In, First-Out
│   ├── lru.js         # Least Recently Used
│   ├── optimal.js     # Bélády's Optimal Algorithm
│   ├── clock.js       # Clock (Second Chance)
│   └── index.js       # Algorithm registry
├── components/         # React UI components
│   ├── InputPanel.jsx     # Configuration & input controls
│   ├── SimulationView.jsx # Interactive simulation visualization
│   ├── StepTable.jsx      # Tabular step-by-step view
│   ├── Statistics.jsx     # Comparison & statistics dashboard
│   └── TheoryPanel.jsx    # Algorithm theory explanations
├── App.jsx            # Main application component
├── main.jsx           # Entry point
└── index.css          # Tailwind CSS imports
```

## Algorithms

| Algorithm | Description | Complexity |
|-----------|-------------|------------|
| **FIFO** | Replaces the page that has been in memory the longest | O(1) |
| **LRU** | Replaces the page that hasn't been used for the longest time | O(n) |
| **Optimal** | Replaces the page that won't be used for the longest time in future | O(n×m) |
| **Clock** | Approximation of LRU using reference bits in a circular buffer | O(n) |

## License

MIT
