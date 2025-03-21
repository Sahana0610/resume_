import React, { useState } from "react";

function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload");
      return;
    }

    setLoading(true);
    setError("");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("File upload failed");
      }

      const data = await response.json();
      setSuggestions(data.suggestions || []);
    } catch (error) {
      setError("Error uploading file. Please try again.");
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-primary mb-4">Upload Resume</h2>
      <input
        type="file"
        onChange={handleFileChange}
        className="w-full p-2 border border-secondary rounded"
      />
      <button
        onClick={handleUpload}
        disabled={loading}
        className={`w-full py-2 mt-2 rounded text-white font-semibold transition ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-accent hover:bg-opacity-90"
        }`}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

      {error && <p className="text-red-600 mt-2">{error}</p>}

      {suggestions.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-primary">Optimization Suggestions:</h3>
          <ul className="mt-2 space-y-2">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="text-secondary">
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ResumeUpload;
