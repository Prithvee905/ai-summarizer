import { useState } from "react";

type ResultType = {
  summary: string;
  keyPoints: string[];
  sentiment: string;
};

function App() {
  const [text, setText] = useState<string>("");
  const [result, setResult] = useState<ResultType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async () => {
    if (!text.trim()) {
      setError("Please enter some text");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult(null);

      const res = await fetch("http://localhost:5000/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Server not responding");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <h2>Text Summarizer</h2>

      <textarea
        rows={6}
        cols={60}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text here..."
      />

      <br /><br />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Analyzing..." : "Summarize"}
      </button>

      <br /><br />

      {/* ERROR */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* RESULT */}
      {result && result.keyPoints && (
        <div style={{ maxWidth: "600px", margin: "auto", textAlign: "left" }}>
          <h3>Summary</h3>
          <p>{result.summary}</p>

          <h3>Key Points</h3>
          <ul>
            {result.keyPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>

          <h3>Sentiment</h3>
          <p>{result.sentiment}</p>
        </div>
      )}
    </div>
  );
}

export default App;