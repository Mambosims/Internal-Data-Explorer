import React, { useState, useEffect } from "react";
import FileUploader from "./FileUploader.jsx";
import DataTable from "./DataTable.jsx";
import DataVisualizer from "./DataVisualizer.jsx";
import ReportSummary from "./Report.jsx";

 

function App() {
   const [data, setData] = useState([]);
   const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  const handleData = (d, name) => setData(d);

  const [csvData, setCsvData] = useState([]);
  console.log("CSV Data:", csvData);

  const [stats, setStats] = useState({
    totalRows: 0,
    totalColumns: 0,
    fileName: null
  });

   useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const handleDataParsed = (parsedData, name) => {
    setData(parsedData);
    setStats({
      totalRows: parsedData.length,
      totalColumns: parsedData.length > 0 ? Object.keys(parsedData[0]).length : 0,
      fileName: name
    });
  };


  return (
     <div>
      {/*<h1>CSV Upload and Table</h1>
      <FileUploader onDataParsed={setCsvData}/>
      <DataTable data={csvData} /> */}

      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300 flex flex-col">
         {/* Sidebar/Top Nav */}
           <nav className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 sticky top-0 z-20">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                   <div className="flex items-center space-x-3">

                     <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                       <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                       </svg>
                     </div>

                        <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">DataFlow Insights</h1>
                    </div> 

                     <div className="flex items-center space-x-4">
                        <button
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                aria-label="Toggle theme"
              >
                  {isDark ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
                     </div>
                </div>
             </div>
           </nav>

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
           <header className="mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Dashboard Overview</h2>
          <p className="mt-2 text-gray-600 dark:text-slate-400">Import your datasets to begin interactive analysis and visualization.</p>
        </header>

          {/* Stats Cards */}
           {data.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6 transition-all">
              <p className="text-sm font-medium text-gray-500 dark:text-slate-400 mb-1 uppercase tracking-wider">File Name</p>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white truncate">{stats.fileName}</h3>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6 transition-all">
              <p className="text-sm font-medium text-gray-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Total Rows</p>
              <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.totalRows.toLocaleString()}</h3>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6 transition-all">
              <p className="text-sm font-medium text-gray-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Attributes</p>
              <h3 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{stats.totalColumns}</h3>
            </div>
          </div>
        )}

         {/* Content */}
          <div className="space-y-8">
            <section> 
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-slate-200">Dataset Upload</h3>
                    {data.length > 0 && (
                <button 
                  onClick={() => setData([])}
                  className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium transition"
                >
                  Clear Dataset
                </button>
              )} 
                </div>
                  {data.length === 0 ? (
              <FileUploader onDataParsed={handleDataParsed} />
            ) : (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-4 flex items-center justify-between transition-all">
                   <div className="flex items-center space-x-3">
                     <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-lg">
                       <svg className="w-5 h-5 text-blue-600 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                     </div>
                     <div>
                    <p className="text-sm font-semibold text-blue-900 dark:text-blue-200">Success! Dataset is live.</p>
                    <p className="text-xs text-blue-700 dark:text-blue-300/80">You can now search, sort, and analyze your data below.</p>
                     <ReportSummary data={data} />
                  </div>
                   </div>
      
                </div>
            )}
            </section>

            {data.length > 0 && (
            <>
              {/*<section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <DataVisualizer data={data} />
              </section>*/}

              <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-slate-200 mb-4">Data Explorer</h3>
                <DataTable data={data} />
              </section>
            </>
          )}
          </div>
        </main>
        
        {/*Footer*/}
          <footer className="bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 py-6 mt-12 transition-colors">
             <div className="max-w-7xl mx-auto px-4 text-center">
               <p className="text-sm text-gray-500 dark:text-slate-400">
                   &copy; {new Date().getFullYear()} DataFlow Insights. Made by Mambo Simwawa.
               </p>
             </div>
          </footer>
      </div>
     
    </div>
  );
}

export default App;



