import { useState } from "react";

function JobInput({ onJobSubmit }) {
  const [jobDescription, setJobDescription] = useState("");

  const handleSubmit = async () => {
    const response = await fetch("http://localhost:8000/job-description", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `description=${jobDescription}`,
    });

    const data = await response.json();
    onJobSubmit(data.requirements);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-primary mb-4">Paste Job Description</h2>
      <textarea
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        rows={5}
        className="w-full p-2 border border-secondary rounded"
      />
      <button
        onClick={handleSubmit}
        className="w-full py-2 mt-2 bg-accent text-white font-semibold rounded hover:bg-opacity-90 transition"
      >
        Submit
      </button>
    </div>
  );
}

export default JobInput;
