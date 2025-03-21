import { useState } from "react";

function Recommendations({ resumeText, jobDescription }) {
  const [recommendations, setRecommendations] = useState("");

  const getRecommendations = async () => {
    const formData = new URLSearchParams();
    formData.append("resume", resumeText);
    formData.append("job_description", jobDescription);

    const response = await fetch("http://localhost:8000/recommendations", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData,
    });

    const data = await response.json();
    setRecommendations(data.improvement);
  };

  return (
    <div className="mt-6">
      <button onClick={getRecommendations} className="py-2 px-4 bg-accent text-white rounded">
        Optimize Resume
      </button>
      {recommendations && (
        <div className="mt-4 p-4 bg-gray-50 border border-secondary rounded">
          <h2 className="text-lg font-semibold text-primary">Optimized Resume & Suggestions:</h2>
          <p>{recommendations}</p>
        </div>
      )}
    </div>
  );
}

export default Recommendations;
