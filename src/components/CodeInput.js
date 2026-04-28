import { useState } from "react";
import { explainCode } from "../services/api";

const LANGUAGES = ["java", "python", "javascript", "typescript", "c++", "go", "rust", "php"];

const CodeInput = ({ setResult }) => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("java");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!code.trim()) return;
    setLoading(true);
    try {
      const res = await explainCode({ code, language });
      setResult(res.data);
    } catch (err) {
      setResult({ success: false, error: "Failed to reach backend", message: err.message });
    }
    setLoading(false);
  };

  return (
    <div className="input-card">
      <div className="card-label">📝 Input</div>

      <select
        className="lang-select"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        {LANGUAGES.map((l) => (
          <option key={l} value={l}>{l.toUpperCase()}</option>
        ))}
      </select>

      <textarea
        className="code-textarea"
        placeholder="Paste your code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
        spellCheck={false}
      />

      <button
        className="explain-btn"
        onClick={handleSubmit}
        disabled={loading || !code.trim()}
      >
        {loading ? "⏳ Analyzing..." : "🔍 Explain Code"}
      </button>
    </div>
  );
};

export default CodeInput;