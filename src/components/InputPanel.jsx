import { useState } from 'react';

const PRESETS = [
  { name: 'Classic Example', string: '7,0,1,2,0,3,0,4,2,3,0,3,2,1,2,0,1,7,0,1', frames: 3 },
  { name: 'Simple Sequence', string: '1,2,3,4,1,2,5,1,2,3,4,5', frames: 3 },
  { name: 'Heavy Thrashing', string: '1,2,3,4,5,1,2,3,4,5,1,2,3,4,5', frames: 3 },
  { name: 'Locality Pattern', string: '1,2,3,2,1,4,5,4,5,1,2,3,2,1', frames: 4 },
  { name: 'Large Working Set', string: '0,1,2,3,0,1,4,0,1,2,3,4,0,1,2,3,4', frames: 4 },
];

export default function InputPanel({ onSimulate, disabled }) {
  const [refString, setRefString] = useState('7,0,1,2,0,3,0,4,2,3,0,3,2,1,2,0,1,7,0,1');
  const [frameCount, setFrameCount] = useState(3);
  const [selectedAlgorithms, setSelectedAlgorithms] = useState(['FIFO', 'LRU', 'Optimal', 'Clock']);
  const [error, setError] = useState('');

  const algorithms = [
    { id: 'FIFO', label: 'FIFO', desc: 'First-In, First-Out' },
    { id: 'LRU', label: 'LRU', desc: 'Least Recently Used' },
    { id: 'Optimal', label: 'Optimal', desc: "Bélády's Algorithm" },
    { id: 'Clock', label: 'Clock', desc: 'Second Chance' },
  ];

  const toggleAlgorithm = (id) => {
    setSelectedAlgorithms((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const generateRandom = () => {
    const length = Math.floor(Math.random() * 15) + 10;
    const maxPage = Math.floor(Math.random() * 6) + 4;
    const pages = Array.from({ length }, () => Math.floor(Math.random() * maxPage));
    setRefString(pages.join(','));
  };

  const handleSubmit = () => {
    setError('');
    const parsed = refString
      .split(/[\s,]+/)
      .filter((s) => s.length > 0)
      .map(Number);

    if (parsed.length === 0 || parsed.some(isNaN)) {
      setError('Please enter valid numbers separated by commas.');
      return;
    }
    if (parsed.some((n) => n < 0 || !Number.isInteger(n))) {
      setError('Page numbers must be non-negative integers.');
      return;
    }
    if (frameCount < 1 || frameCount > 10) {
      setError('Frame count must be between 1 and 10.');
      return;
    }
    if (selectedAlgorithms.length === 0) {
      setError('Please select at least one algorithm.');
      return;
    }

    onSimulate(parsed, frameCount, selectedAlgorithms);
  };

  const loadPreset = (preset) => {
    setRefString(preset.string);
    setFrameCount(preset.frames);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Configuration
        </h2>
      </div>

      <div className="p-6 space-y-5">
        {/* Presets */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Quick Presets</label>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((preset) => (
              <button
                key={preset.name}
                onClick={() => loadPreset(preset)}
                className="px-3 py-1.5 text-xs font-medium rounded-full bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors border border-indigo-200"
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        {/* Reference String */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Reference String
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={refString}
              onChange={(e) => setRefString(e.target.value)}
              placeholder="e.g., 7,0,1,2,0,3,0,4,2,3"
              className="min-w-0 flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm font-mono transition-shadow"
            />
            <button
              onClick={generateRandom}
              className="shrink-0 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium whitespace-nowrap"
              title="Generate random reference string"
            >
              Random
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Enter page numbers separated by commas (e.g., 7,0,1,2,0,3)
          </p>
        </div>

        {/* Frame Count */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Number of Frames: <span className="text-indigo-600 font-bold">{frameCount}</span>
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={frameCount}
            onChange={(e) => setFrameCount(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>1</span>
            <span>5</span>
            <span>10</span>
          </div>
        </div>

        {/* Algorithm Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Algorithms</label>
          <div className="grid grid-cols-2 gap-2">
            {algorithms.map((algo) => (
              <label
                key={algo.id}
                className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedAlgorithms.includes(algo.id)
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedAlgorithms.includes(algo.id)}
                  onChange={() => toggleAlgorithm(algo.id)}
                  className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                />
                <div>
                  <div className="text-sm font-semibold text-gray-800">{algo.label}</div>
                  <div className="text-xs text-gray-500">{algo.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={disabled}
          className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          Run Simulation
        </button>
      </div>
    </div>
  );
}
