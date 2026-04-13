import { useState, useEffect, useRef, useCallback } from 'react';

function SimulationViewInner({ result, referenceString }) {
  const [currentStep, setCurrentStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(800);
  const intervalRef = useRef(null);

  const { steps, algorithm } = result;

  const stopPlayback = useCallback(() => {
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= steps.length - 1) {
            stopPlayback();
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, speed, steps.length, stopPlayback]);

  const stepForward = () => {
    if (currentStep < steps.length - 1) setCurrentStep((s) => s + 1);
  };

  const stepBackward = () => {
    if (currentStep > -1) setCurrentStep((s) => s - 1);
  };

  const reset = () => {
    setCurrentStep(-1);
    stopPlayback();
  };

  const jumpToEnd = () => {
    setCurrentStep(steps.length - 1);
    stopPlayback();
  };

  const togglePlay = () => {
    if (currentStep >= steps.length - 1) {
      setCurrentStep(-1);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const currentStepData = currentStep >= 0 ? steps[currentStep] : null;
  const frameCount = steps[0]?.frames.length || 0;

  const algoColors = {
    FIFO: { bg: 'bg-blue-50', border: 'border-blue-200', accent: 'text-blue-700', badge: 'bg-blue-600' },
    LRU: { bg: 'bg-emerald-50', border: 'border-emerald-200', accent: 'text-emerald-700', badge: 'bg-emerald-600' },
    Optimal: { bg: 'bg-amber-50', border: 'border-amber-200', accent: 'text-amber-700', badge: 'bg-amber-600' },
    Clock: { bg: 'bg-rose-50', border: 'border-rose-200', accent: 'text-rose-700', badge: 'bg-rose-600' },
  };
  const colors = algoColors[algorithm] || algoColors.FIFO;

  return (
    <div className={`rounded-2xl shadow-lg border ${colors.border} overflow-hidden`}>
      {/* Header */}
      <div className={`px-6 py-3 ${colors.badge} flex items-center justify-between`}>
        <h3 className="text-lg font-bold text-white">{algorithm}</h3>
        <div className="flex items-center gap-3 text-white text-sm">
          <span>
            Faults: <strong>{currentStepData?.faults ?? 0}</strong>
          </span>
          <span className="opacity-50">|</span>
          <span>
            Hits: <strong>{currentStepData?.hits ?? 0}</strong>
          </span>
        </div>
      </div>

      <div className={`p-5 ${colors.bg}`}>
        {/* Reference String with highlight */}
        <div className="mb-4">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Reference String
          </div>
          <div className="flex flex-wrap gap-1.5">
            {referenceString.map((page, idx) => (
              <div
                key={idx}
                className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-bold transition-all duration-300 ${
                  idx === currentStep
                    ? 'bg-indigo-600 text-white scale-110 shadow-lg ring-2 ring-indigo-300'
                    : idx < currentStep
                      ? steps[idx].isHit
                        ? 'bg-green-100 text-green-800 border border-green-300'
                        : 'bg-red-100 text-red-800 border border-red-300'
                      : 'bg-white text-gray-400 border border-gray-200'
                }`}
              >
                {page}
              </div>
            ))}
          </div>
        </div>

        {/* Page Frames */}
        <div className="mb-4">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Page Frames
          </div>
          <div className="flex gap-3">
            {Array.from({ length: frameCount }).map((_, fIdx) => {
              const pageInFrame = currentStepData?.frames[fIdx] ?? null;
              const justLoaded =
                currentStepData && !currentStepData.isHit && currentStepData.replacedIndex === fIdx;
              return (
                <div
                  key={fIdx}
                  className={`w-16 h-16 flex flex-col items-center justify-center rounded-xl border-2 transition-all duration-300 ${
                    justLoaded
                      ? 'border-indigo-500 bg-indigo-100 scale-105 shadow-md'
                      : pageInFrame !== null
                        ? 'border-gray-300 bg-white'
                        : 'border-dashed border-gray-300 bg-gray-50'
                  }`}
                >
                  <span className="text-xs text-gray-400 font-medium">F{fIdx}</span>
                  <span
                    className={`text-lg font-bold ${
                      justLoaded
                        ? 'text-indigo-700'
                        : pageInFrame !== null
                          ? 'text-gray-800'
                          : 'text-gray-300'
                    }`}
                  >
                    {pageInFrame !== null ? pageInFrame : '—'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Clock-specific: reference bits */}
        {algorithm === 'Clock' && currentStepData?.refBits && (
          <div className="mb-4">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Reference Bits (Clock)
            </div>
            <div className="flex gap-3">
              {currentStepData.refBits.map((bit, idx) => (
                <div
                  key={idx}
                  className={`w-16 h-8 flex items-center justify-center rounded-lg text-sm font-bold ${
                    idx === currentStepData.clockPointer
                      ? 'bg-rose-200 text-rose-800 border-2 border-rose-400'
                      : 'bg-white text-gray-600 border border-gray-300'
                  }`}
                >
                  {bit}
                  {idx === currentStepData.clockPointer && (
                    <span className="ml-1 text-xs">&#9650;</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step Description */}
        {currentStepData && (
          <div
            className={`px-4 py-2.5 rounded-lg text-sm font-medium mb-4 ${
              currentStepData.isHit
                ? 'bg-green-100 text-green-800 border border-green-200'
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}
          >
            Step {currentStep + 1}: {currentStepData.description}
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={reset}
            className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
            title="Reset"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
          <button
            onClick={stepBackward}
            disabled={currentStep <= -1}
            className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-40 transition-colors"
            title="Step Back"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={togglePlay}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              isPlaying
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            {isPlaying ? 'Pause' : currentStep >= steps.length - 1 ? 'Replay' : 'Play'}
          </button>
          <button
            onClick={stepForward}
            disabled={currentStep >= steps.length - 1}
            className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-40 transition-colors"
            title="Step Forward"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button
            onClick={jumpToEnd}
            className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
            title="Jump to End"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </button>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs text-gray-500">Speed:</span>
            <select
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="px-2 py-1 text-xs border border-gray-300 rounded-lg bg-white"
            >
              <option value={1500}>Slow</option>
              <option value={800}>Normal</option>
              <option value={400}>Fast</option>
              <option value={150}>Very Fast</option>
            </select>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-3 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500 transition-all duration-300 rounded-full"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
        <div className="text-xs text-gray-500 mt-1 text-right">
          {currentStep + 1} / {steps.length} steps
        </div>
      </div>
    </div>
  );
}

// Wrapper that uses key to reset internal state when result changes
export default function SimulationView({ result, referenceString }) {
  return (
    <SimulationViewInner
      key={result.algorithm + '-' + result.totalFaults + '-' + result.steps.length}
      result={result}
      referenceString={referenceString}
    />
  );
}
