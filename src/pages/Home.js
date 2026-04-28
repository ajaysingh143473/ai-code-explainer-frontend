import { useState } from "react";
import Header from "../components/Header";
import CodeInput from "../components/CodeInput";
import ResultPanel from "../components/ResultPanel";

const Home = () => {
  const [result, setResult] = useState(null);

  return (
    <div>
      <Header />
      <div className="main-layout">
        <div className="row g-4">
          <div className="col-12 col-lg-6">
            <CodeInput setResult={setResult} />
          </div>
          <div className="col-12 col-lg-6">
            <ResultPanel result={result} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;