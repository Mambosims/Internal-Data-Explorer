import React, { useState, useRef } from "react";
import Papa from "papaparse";

/*export default function FileUploader({onDataParsed}) {
  const [file, setFile] = useState(null);
   const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);


  const handleFile = (e) => {
    const selectedfile = e.target.files[0];
    
    if (!selectedfile) return;

    setFile(selectedfile);

     Papa.parse(selectedfile, {
      header: true,
      complete: (results) => {
        console.log("Parsed data:", results.data);
        onDataParsed(results.data, file.name);
      },
      error: (err) => {
        console.error("Error parsing file:", err);
      },
    });
  }; 

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

   const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-200 text-center ${
        isDragging 
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
          : 'border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-gray-400 dark:hover:border-slate-600'
      }`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}>


       <input 
        type="file" 
        ref={fileInputRef}
        onChange={onFileChange}
        accept=".csv"
        className="hidden" 
      />
        <div className="flex flex-col items-center">
           <svg className="w-12 h-12 text-gray-400 dark:text-slate-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
           </svg>
           <p className="text-lg font-medium text-gray-700 dark:text-slate-200">Click to upload or drag and drop</p>
              <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">CSV files only (Max 10MB recommended)</p>
               <button 
          onClick={() => fileInputRef.current?.click()}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm font-medium"
        >
         Select File
        </button>
        </div>
     
    </div>
  );
}*/





const FileUploader = ({ onDataParsed }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    if (file && (file.type === 'text/csv' || file.name.endsWith('.csv'))) {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => {
          onDataParsed(results.data, file.name);
        },
      });
    } else {
      alert("Please upload a valid CSV file.");
    }
  };

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div 
      className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-200 text-center ${
        isDragging 
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
          : 'border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-gray-400 dark:hover:border-slate-600'
      }`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={onFileChange}
        accept=".csv"
        className="hidden" 
      />
      <div className="flex flex-col items-center">
        <svg className="w-12 h-12 text-gray-400 dark:text-slate-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <p className="text-lg font-medium text-gray-700 dark:text-slate-200">Click to upload or drag and drop</p>
        <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">CSV files only (Max 10MB recommended)</p>
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm font-medium"
        >
          Select File
        </button>
      </div>
    </div>
  );
};

export default FileUploader;


