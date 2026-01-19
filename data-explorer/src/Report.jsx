
import React, { useState, useMemo } from 'react';


const ReportSummary = ({ data }) => {
  const [showModal, setShowModal] = useState(false);

  const stats = useMemo(() => {
    if (data.length === 0) return null;
    const columns = Object.keys(data[0]);
    const report= columns.map(col => {
      const values = data.map(row => row[col]).filter(v => v !== null && v !== undefined && v !== "");
      const missingCount = data.length - values.length;
      const uniqueValues = new Set(values);
      
      // Calculate frequency
      const freqMap = {};
      values.forEach(v => {
        const key = String(v);
        freqMap[key] = (freqMap[key] || 0) + 1;
      });
      const topValue = Object.entries(freqMap).sort((a, b) => b[1] - a[1])[0]?.[0];

      // Check if mostly numeric
      const numericValues = values.map(v => Number(v)).filter(v => !isNaN(v));
      const isNumeric = numericValues.length > values.length * 0.8;

      if (isNumeric && numericValues.length > 0) {
        const sum = numericValues.reduce((a, b) => a + b, 0);
        return {
          name: col,
          type: 'number',
          min: Math.min(...numericValues),
          max: Math.max(...numericValues),
          avg: sum / numericValues.length,
          sum,
          uniqueCount: uniqueValues.size,
          topValue,
          missingCount
        };
      }

      return {
        name: col,
        type: 'string',
        uniqueCount: uniqueValues.size,
        topValue,
        missingCount
      };
    });

    return report;
  }, [data]);

  if (!stats) return null;

  return (
    <>
      <button 
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-indigo-600 text-white rounded-lg hover:bg-slate-800 dark:hover:bg-indigo-700 transition-all font-medium text-sm shadow-sm"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Generate Data Summary
      </button>

      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-800 w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
            {/* Header */}
            <div className="p-6 border-b dark:border-slate-700 flex items-center justify-between bg-gray-50/50 dark:bg-slate-900/50">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Dataset Summary Report</h2>
                <p className="text-sm text-gray-500 dark:text-slate-400">Statistical breakdown of {data.length} records</p>
              </div>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-slate-200 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Executive Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                  <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">Total Observations</p>
                  <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{data.length.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800">
                  <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">Data Dimensions</p>
                  <p className="text-2xl font-bold text-indigo-900 dark:text-indigo-100">{Object.keys(data[0]).length} Columns</p>
                </div>
                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800">
                  <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">Cleanliness</p>
                  <p className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">
                    {Math.round((stats.filter(s => s.missingCount === 0).length / stats.length) * 100)}% Comp.
                  </p>
                </div>
              </div>

              {/* Detail Sections */}
              <div className="space-y-6">
                <section>
                  <h3 className="text-sm font-bold text-gray-400 uppercase mb-4">Numerical Analysis</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {stats.filter(s => s.type === 'number').map(s => (
                      <div key={s.name} className="p-4 bg-white dark:bg-slate-900 border dark:border-slate-700 rounded-xl shadow-sm">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-semibold text-gray-900 dark:text-white">{s.name}</h4>
                          <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-[10px] font-bold rounded uppercase">Numeric</span>
                        </div>
                        <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                          <div>
                            <p className="text-[10px] text-gray-500 dark:text-slate-400 uppercase">Average</p>
                            <p className="text-sm font-medium">{s.avg?.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-500 dark:text-slate-400 uppercase">Total Sum</p>
                            <p className="text-sm font-medium">{s.sum?.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-500 dark:text-slate-400 uppercase">Range (Min/Max)</p>
                            <p className="text-sm font-medium">{s.min?.toLocaleString()} — {s.max?.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-500 dark:text-slate-400 uppercase">Unique Values</p>
                            <p className="text-sm font-medium">{s.uniqueCount}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="text-sm font-bold text-gray-400 uppercase mb-4">Categorical Analysis</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {stats.filter(s => s.type === 'string').map(s => (
                      <div key={s.name} className="p-4 bg-white dark:bg-slate-900 border dark:border-slate-700 rounded-xl shadow-sm">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-semibold text-gray-900 dark:text-white">{s.name}</h4>
                          <span className="px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold rounded uppercase">String</span>
                        </div>
                        <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                          <div>
                            <p className="text-[10px] text-gray-500 dark:text-slate-400 uppercase">Unique Count</p>
                            <p className="text-sm font-medium">{s.uniqueCount}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-500 dark:text-slate-400 uppercase">Most Frequent</p>
                            <p className="text-sm font-medium truncate" title={String(s.topValue)}>{String(s.topValue)}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-500 dark:text-slate-400 uppercase">Missing Data</p>
                            <p className={`text-sm font-medium ${s.missingCount > 0 ? 'text-amber-500' : 'text-emerald-500'}`}>
                              {s.missingCount} cells
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t dark:border-slate-700 flex justify-end gap-3 bg-gray-50/50 dark:bg-slate-900/50">
              <button 
                onClick={() => window.print()} 
                className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-slate-300 border dark:border-slate-600 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition"
              >
                Print Report
              </button>
              <button 
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm font-semibold bg-slate-900 dark:bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition"
              >
                Close Summary
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReportSummary;
