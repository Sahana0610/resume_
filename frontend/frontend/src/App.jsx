import React from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import FileUpload from "./components/FileUpload";
import JobInput from "./components/JobInput";
import "./index.css";
import Recommendation from "./components/Recommendation";


function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-100 p-6"> {/* Use bg-gray-100 if bg-background fails */}
        <h1 className="text-3xl font-bold text-blue-600 mb-6"> {/* Use text-blue-600 if text-primary fails */}
          Resume Optimization Tool
        </h1>
        <div className="space-y-6">
          <FileUpload />
          <JobInput />
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
