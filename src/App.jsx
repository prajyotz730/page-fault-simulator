import { useState } from 'react';
import { ALGORITHMS } from './algorithms';
import InputPanel from './components/InputPanel';
import SimulationView from './components/SimulationView';
import StepTable from './components/StepTable';
import Statistics from './components/Statistics';
import TheoryPanel from './components/TheoryPanel';

function App() {
  const [results, setResults] = useState([]);
  const [referenceString, setReferenceString] = useState([]);
  const [showTables, setShowTables] = useState(false);
  const [activeTab, setActiveTab] = useState('simulation');

  const handleSimulate = (refString, frameCount, selectedAlgorithms) => {
    const newResults = selectedAlgorithms.map((algoKey) => {
      const algo = ALGORITHMS[algoKey];
      return algo.simulate(refString, frameCount);
    });
    setReferenceString(refString);
    setResults(newResults);
    setActiveTab('simulation');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Page Fault Simulator</h1>
                <p className="text-xs text-gray-500">OS Process Management — Virtual Memory</p>
              </div>
            </div>
            {results.length > 0 && (
              <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('simulation')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    activeTab === 'simulation'
                      ? 'bg-white text-indigo-700 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Simulation
                </button>
                <button
                  onClick={() => setActiveTab('statistics')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    activeTab === 'statistics'
                      ? 'bg-white text-indigo-700 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Statistics
                </button>
                <button
                  onClick={() => setActiveTab('theory')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    activeTab === 'theory'
                      ? 'bg-white text-indigo-700 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Theory
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Panel: Config */}
          <div className="lg:col-span-4 xl:col-span-3 space-y-6">
            <InputPanel onSimulate={handleSimulate} disabled={false} />
            {results.length === 0 && <TheoryPanel />}
          </div>

          {/* Right Panel: Results */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-6">
            {results.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-12 h-12 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Ready to Simulate</h2>
                <p className="text-gray-500 max-w-md">
                  Configure your reference string, frame count, and algorithms in the panel, then click
                  &quot;Run Simulation&quot; to visualize page replacement.
                </p>
                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-lg">
                  {[
                    { label: 'FIFO', desc: 'Queue-based' },
                    { label: 'LRU', desc: 'Recency-based' },
                    { label: 'Optimal', desc: 'Future knowledge' },
                    { label: 'Clock', desc: 'Ref bit sweep' },
                  ].map((a) => (
                    <div key={a.label} className="bg-white rounded-xl p-4 border border-gray-200 text-center">
                      <div className="text-sm font-bold text-indigo-700">{a.label}</div>
                      <div className="text-xs text-gray-500 mt-1">{a.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {activeTab === 'simulation' && (
                  <>
                    <div className="space-y-6">
                      {results.map((result) => (
                        <SimulationView
                          key={result.algorithm}
                          result={result}
                          referenceString={referenceString}
                        />
                      ))}
                    </div>

                    {/* Toggle Tables */}
                    <div className="flex justify-center">
                      <button
                        onClick={() => setShowTables(!showTables)}
                        className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                      >
                        {showTables ? 'Hide' : 'Show'} Step-by-Step Tables
                      </button>
                    </div>

                    {showTables && (
                      <div className="space-y-6">
                        {results.map((result) => (
                          <StepTable
                            key={result.algorithm}
                            result={result}
                            referenceString={referenceString}
                          />
                        ))}
                      </div>
                    )}
                  </>
                )}

                {activeTab === 'statistics' && (
                  <Statistics results={results} referenceString={referenceString} />
                )}

                {activeTab === 'theory' && <TheoryPanel />}
              </>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/60 border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 text-center text-sm text-gray-500">
          Page Fault Simulator — Operating Systems Virtual Memory Visualization
        </div>
      </footer>
    </div>
  );
}

export default App;
