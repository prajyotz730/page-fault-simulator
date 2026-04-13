export default function StepTable({ result }) {
  const { steps, algorithm } = result;
  const frameCount = steps[0]?.frames.length || 0;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
        <h3 className="text-sm font-bold text-gray-700">{algorithm} — Step-by-Step Table</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600">Step</th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600">Page</th>
              {Array.from({ length: frameCount }).map((_, i) => (
                <th key={i} className="px-3 py-2 text-center text-xs font-semibold text-gray-600">
                  F{i}
                </th>
              ))}
              <th className="px-3 py-2 text-center text-xs font-semibold text-gray-600">Result</th>
              <th className="px-3 py-2 text-center text-xs font-semibold text-gray-600">Faults</th>
            </tr>
          </thead>
          <tbody>
            {steps.map((step, idx) => (
              <tr
                key={idx}
                className={`border-b border-gray-100 ${
                  step.isHit ? 'bg-green-50/50' : 'bg-red-50/50'
                }`}
              >
                <td className="px-3 py-2 text-gray-500 font-mono text-xs">{idx + 1}</td>
                <td className="px-3 py-2 font-bold text-gray-800">{step.page}</td>
                {step.frames.map((f, fIdx) => (
                  <td
                    key={fIdx}
                    className={`px-3 py-2 text-center font-mono ${
                      !step.isHit && step.replacedIndex === fIdx
                        ? 'text-indigo-700 font-bold bg-indigo-50'
                        : f !== null
                          ? 'text-gray-700'
                          : 'text-gray-300'
                    }`}
                  >
                    {f !== null ? f : '—'}
                  </td>
                ))}
                <td className="px-3 py-2 text-center">
                  <span
                    className={`inline-flex px-2 py-0.5 rounded-full text-xs font-bold ${
                      step.isHit ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {step.isHit ? 'HIT' : 'FAULT'}
                  </span>
                </td>
                <td className="px-3 py-2 text-center font-mono text-gray-600">{step.faults}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
