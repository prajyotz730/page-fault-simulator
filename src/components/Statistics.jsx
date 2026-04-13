export default function Statistics({ results, referenceString }) {
  if (!results || results.length === 0) return null;

  const totalPages = referenceString.length;

  const stats = results.map((r) => ({
    algorithm: r.algorithm,
    faults: r.totalFaults,
    hits: r.totalHits,
    faultRate: ((r.totalFaults / totalPages) * 100).toFixed(1),
    hitRate: ((r.totalHits / totalPages) * 100).toFixed(1),
  }));

  const bestAlgo = stats.reduce((best, s) => (s.faults < best.faults ? s : best), stats[0]);
  const worstAlgo = stats.reduce((worst, s) => (s.faults > worst.faults ? s : worst), stats[0]);

  const algoBarColors = {
    FIFO: 'bg-blue-500',
    LRU: 'bg-emerald-500',
    Optimal: 'bg-amber-500',
    Clock: 'bg-rose-500',
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Comparison & Statistics
        </h2>
      </div>

      <div className="p-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {stats.map((s) => (
            <div
              key={s.algorithm}
              className={`rounded-xl p-4 border ${
                s.algorithm === bestAlgo.algorithm && stats.length > 1
                  ? 'border-green-300 bg-green-50 ring-2 ring-green-200'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {s.algorithm}
                {s.algorithm === bestAlgo.algorithm && stats.length > 1 && (
                  <span className="ml-1 text-green-600">Best</span>
                )}
              </div>
              <div className="text-3xl font-bold text-gray-800 mt-1">{s.faults}</div>
              <div className="text-xs text-gray-500">
                faults ({s.faultRate}%)
              </div>
              <div className="text-sm text-green-600 font-semibold mt-1">
                {s.hits} hits ({s.hitRate}%)
              </div>
            </div>
          ))}
        </div>

        {/* Bar Chart Comparison */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-gray-700 mb-3">Page Fault Comparison</h3>
          <div className="space-y-3">
            {stats.map((s) => (
              <div key={s.algorithm}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">{s.algorithm}</span>
                  <span className="text-gray-500">
                    {s.faults} faults / {totalPages} pages
                  </span>
                </div>
                <div className="h-6 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${algoBarColors[s.algorithm] || 'bg-indigo-500'} rounded-full transition-all duration-700 flex items-center justify-end pr-2`}
                    style={{ width: `${(s.faults / totalPages) * 100}%` }}
                  >
                    <span className="text-xs text-white font-bold">
                      {s.faultRate}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Analysis */}
        {stats.length > 1 && (
          <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200">
            <h3 className="text-sm font-bold text-indigo-800 mb-2">Analysis</h3>
            <ul className="text-sm text-indigo-700 space-y-1">
              <li>
                <strong>{bestAlgo.algorithm}</strong> performed best with only{' '}
                <strong>{bestAlgo.faults}</strong> page faults ({bestAlgo.faultRate}% fault rate).
              </li>
              <li>
                <strong>{worstAlgo.algorithm}</strong> had the most faults:{' '}
                <strong>{worstAlgo.faults}</strong> ({worstAlgo.faultRate}% fault rate).
              </li>
              <li>
                Difference: <strong>{worstAlgo.faults - bestAlgo.faults}</strong> fewer faults using{' '}
                {bestAlgo.algorithm} over {worstAlgo.algorithm}.
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
