import React, { useState } from "react";

function FileUpload({ onUpload }) {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("File upload failed");

      const data = await response.json();
      setExtractedText(data.extractedText);
      setSuggestions(data.suggestions);
      onUpload(data.extractedText);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-primary">Upload Your Resume</h2>
      <input
        type="file"
        onChange={handleFileChange}
        className="w-full p-2 border border-secondary rounded focus:outline-none focus:ring-2 focus:ring-accent"
      />
      <button
        onClick={handleUpload}
        className="w-full py-2 bg-accent text-white font-semibold rounded hover:bg-opacity-90 transition mt-2"
      >
        Upload
      </button>

      {extractedText && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-primary">Extracted Resume Text:</h3>
          <textarea
            value={extractedText}
            readOnly
            rows={6}
            className="w-full p-2 border border-secondary rounded mt-2"
          />
        </div>
      )}

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

export default FileUpload;
