
import React, { useState, useMemo } from 'react';
// @ts-ignore
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import DataTable  from './DataTable';

export default function DataVisualizer({ data }) {
  const [chartType, setChartType] = useState('bar');
  const cols = useMemo(() => (data.length ? Object.keys(data[0]) : []), [data]);
  const numCols = useMemo(() => cols.filter(c => data.some(r => typeof r[c] === 'number')), [cols, data]);
  
  const [xAxis, setXAxis] = useState(cols.find(c => !numCols.includes(c)) || cols[0]);
  const [yAxis, setYAxis] = useState(numCols[0] || cols[1]);

  const renderChart = () => {
    const props = { data: data.slice(0, 50), margin: { top: 10, right: 10, left: -20, bottom: 0 } };
    const color = '#3b82f6';

    const grid = <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-gray-200 dark:text-slate-700" />;
    const x = <XAxis dataKey={xAxis} fontSize={11} tickLine={false} axisLine={false} />;
    const y = <YAxis fontSize={11} tickLine={false} axisLine={false} />;
    const tool = <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', background: 'var(--tw-bg-opacity)' }} />;

    if (chartType === 'line') return <LineChart {...props}>{grid}{x}{y}{tool}<Legend /><Line type="monotone" dataKey={yAxis} stroke={color} strokeWidth={2} dot={{ r: 3 }} /></LineChart>;
    if (chartType === 'area') return <AreaChart {...props}>{grid}{x}{y}{tool}<Legend /><Area type="monotone" dataKey={yAxis} fill={color} fillOpacity={0.2} stroke={color} /></AreaChart>;
    return <BarChart {...props}>{grid}{x}{y}{tool}<Legend /><Bar dataKey={yAxis} fill={color} radius={[4, 4, 0, 0]} /></BarChart>;
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-100 dark:border-slate-700 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h3 className="font-bold text-gray-900 dark:text-white">Data Visualization</h3>
        <div className="flex gap-2">
          <select value={chartType} onChange={e => setChartType(e.target.value)} className="text-xs p-2 rounded border dark:bg-slate-900 dark:border-slate-700 dark:text-white">
            <option value="bar">Bar</option>
            <option value="line">Line</option>
            <option value="area">Area</option>
          </select>
          <select value={xAxis} onChange={e => setXAxis(e.target.value)} className="text-xs p-2 rounded border dark:bg-slate-900 dark:border-slate-700 dark:text-white">
            {cols.map(c => <option key={c} value={c}>X: {c}</option>)}
          </select>
          <select value={yAxis} onChange={e => setYAxis(e.target.value)} className="text-xs p-2 rounded border dark:bg-slate-900 dark:border-slate-700 dark:text-white">
            {(numCols.length ? numCols : cols).map(c => <option key={c} value={c}>Y: {c}</option>)}
          </select>
        </div>
      </div>
      <div className="h-72 w-full">{renderChart()}</div>
    </div>
  );
}
