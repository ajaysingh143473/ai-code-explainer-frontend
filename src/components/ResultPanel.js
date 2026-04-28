const ResultPanel = ({ result }) => {
  if (!result) {
    return (
      <div className="result-card">
        <div className="result-placeholder">
          <span>🤖</span>
          <p>Your analysis will appear here</p>
        </div>
      </div>
    );
  }

  if (!result.success) {
    return (
      <div className="result-card">
        <div className="error-block">
          <strong>❌ {result.error}</strong>
          <p style={{ fontSize: "0.85rem", marginTop: "6px" }}>{result.message}</p>
        </div>
      </div>
    );
  }

  const sections = parseExplanation(result.explanation);

  return (
    <div className="result-card">
      <div className="meta-bar">
        <span className="meta-lang">{result.language}</span>
        <span className="meta-time">
          {result.timestamp ? new Date(result.timestamp).toLocaleTimeString() : ""}
        </span>
      </div>

      <div style={{ overflowY: "auto", maxHeight: "70vh" }}>
        {sections.map((s, i) => (
          <div className="section-block" key={i}>
            <div className="section-title">{s.title}</div>
            <pre className="section-body">{s.body}</pre>
          </div>
        ))}
      </div>
    </div>
  );
};

function parseExplanation(text) {
  if (!text) return [{ title: "Explanation", body: text }];
  const parts = text.split(/(?=###\s)/);
  return parts
    .filter((p) => p.trim())
    .map((p) => {
      const lines = p.trim().split("\n");
      const title = lines[0].replace(/^###\s*/, "").trim();
      const body = lines.slice(1).join("\n").trim();
      return { title, body };
    });
}

export default ResultPanel;