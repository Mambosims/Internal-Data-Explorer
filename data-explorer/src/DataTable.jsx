import React, {useState, useEffect} from "react";

export default function DataTable({ data }) {
     console.log("Data received by DataTable:", data); 
     const [searchTerm, setSearchTerm] = useState("");
     const [sortColumn, setSortColumn] = useState(null);
     const [sortDirection, setSortDirection] = useState("asc");

    const [currentPage, setCurrentpage] = useState(1);
    const rowsPerPage = 10;
     
  if (!data || data.length === 0) {
    return <div>No data to display</div>;
  }

  // Get table headers dynamically from the first row
  const headers = Object.keys(data[0]);
//Filter data based on search term
  const filteredData = data.filter((row) => 
    headers.some((column) =>
      String(row[column]).toLowerCase().includes(searchTerm.toLowerCase())
)
);
//Sort data based on selected column and direction
const sortedData = [...filteredData].sort((a, b) => {
if (!sortColumn) return 0;

const valueA = a[sortColumn];
const valueB = b[sortColumn];


if (!isNaN(valueA) && !isNaN(valueB)){
  return sortDirection === "asc" ? valueA - valueB : valueB - valueA;
}


return sortDirection === "asc" ? String(valueA) : String(valueB);
});

//Dataset summary
const totalRows = data.length;
const visibleRows = sortedData.length;
const totalColumns = headers.length;


  const getIndicator = (column) => {
    if (sortColumn !== column) return "";
    return sortDirection === "asc" ? " 🔼" : " 🔽";
  }

  //pagnation calculations
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginate = sortedData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  useEffect(() => {
    if (currentPage > totalPages){
    setCurrentpage(1);
  }
  }, [currentPage, totalPages]);
  

  const currentRow = paginate.length;
  const nextPage = () => {
    if (currentPage < totalPages){
      setCurrentpage((prev) => prev + 1);

    }
  };

  const prevPage = () => {
    if (currentPage > 1){
      setCurrentpage((prev) => prev - 1);
    }
  }

    return( 
      <div>

        <div>
           <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 transition-colors">
             <div className="relative flex-1 max-w-sm">
               <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                 <svg className="h-5 w-5 text-gray-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   {/*<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />*/}
                  
                 </svg>
               </span>
              </div>  
            </div>
           </div>
        </div>
        <div style = {{ marginBottom: "10px"  }}>
        {/*Dataset summary*/}
       {/* <strong>Dataset Summary:</strong>
        <strong>Total Rows: </strong> {visibleRows} / {totalRows};
        <strong> Total Columns: </strong> {totalColumns}; */}

        </div>

        <input
        type = "text"
        placeHolder = "Search"
        value = {searchTerm}
        onChange = {(e) => setSearchTerm(e.target.value)}
        style = {{ marginBottom: "10px", padding: "5px"}}
         className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-slate-700 rounded-lg leading-5 bg-white dark:bg-slate-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition"/>

       <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-slate-400">
         <span>Showing <strong>{paginate.length}</strong> of <strong>{sortedData.length}</strong> records</span>
       </div> 


    <div className="overflow-x-auto bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 transition-colors">
          
    <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
        <thead className="bg-gray-50 dark:bg-slate-900/50">
          <tr>
            {headers.map((header) => (
              <th 
              key={header}{...getIndicator(header)} style={{padding: "5px"}}
              onClick={() => {
                if (sortColumn === header) {
                  setSortDirection(sortDirection === "asc" ? "desc" : "asc");
                } else {
                  setSortColumn(header);
                  setSortDirection("asc");
                }
              }}
                className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700 transition">
                 <div className="flex items-center space-x-1">
                     <span>{header}</span>
                      {sortColumn === header && (
                      <span className="text-blue-500 dark:text-blue-400">
                        {sortDirection === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                </div>
                </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
          {paginate.map((row, rowIndex) => (
            <tr key={rowIndex}  className="hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
              {headers.map((header) => (
                <td key={header} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-slate-300">
        
                  {row[header]}

                  </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      {/*pagination controls*/}
      <div  className="flex items-center justify-between px-2">

        <button onClick={prevPage} disabled={currentPage === 1}
        className="px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg text-sm font-medium text-gray-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-sm"
        >
          Previous
          </button>
         <span className="text-sm text-gray-600 dark:text-slate-400 font-medium">
            Page {currentPage} of {totalPages}
          </span> 

          <button onClick={nextPage} disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg text-sm font-medium text-gray-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-sm"
            >
            Next </button>
      </div>
    </div>
    );
     
};
