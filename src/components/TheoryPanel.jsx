const concepts = [
  {
    title: 'What is a Page Fault?',
    content:
      'A page fault occurs when a process accesses a page that is not currently in physical memory (RAM). The operating system must then load the required page from secondary storage (disk) into a free frame in memory. If no free frame is available, a page replacement algorithm decides which existing page to evict.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    ),
  },
  {
    title: 'FIFO (First-In, First-Out)',
    content:
      'The simplest page replacement algorithm. It maintains a queue of pages in the order they were loaded. When a replacement is needed, it evicts the page that has been in memory the longest, regardless of how recently or frequently it was used. Simple but can suffer from Bélády\'s anomaly.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>
    ),
  },
  {
    title: 'LRU (Least Recently Used)',
    content:
      'Replaces the page that has not been accessed for the longest period of time. It uses the principle of temporal locality — pages used recently are likely to be used again soon. LRU generally performs well but requires tracking access history, which can be expensive in hardware.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Optimal (Bélády's Algorithm)",
    content:
      'Replaces the page that will not be used for the longest period in the future. This gives the absolute minimum number of page faults but is impossible to implement in practice since it requires future knowledge. It serves as a theoretical benchmark to evaluate other algorithms.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: 'Clock (Second Chance)',
    content:
      'An efficient approximation of LRU that uses a circular buffer with reference bits. Each page has a reference bit set on access. When looking for a victim page, the algorithm sweeps the clock hand — pages with bit=1 get a "second chance" (bit cleared to 0), while pages with bit=0 are evicted.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
];

export default function TheoryPanel() {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          Theory & Concepts
        </h2>
      </div>
      <div className="p-6 space-y-4">
        {concepts.map((concept) => (
          <details key={concept.title} className="group">
            <summary className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors list-none">
              <span className="text-indigo-600">{concept.icon}</span>
              <span className="font-semibold text-gray-800 text-sm">{concept.title}</span>
              <svg
                className="w-4 h-4 text-gray-400 ml-auto transition-transform group-open:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-11 pb-3 text-sm text-gray-600 leading-relaxed">
              {concept.content}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
