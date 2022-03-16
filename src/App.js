import React, { useState, useCallback } from "react";
import "./App.css";
import EncodingBlock from "./components/EncodingBlock/EncodingBlock";
import DecodingBlock from "./components/DecodingBlock/DecodingBlock";

function App() {
  const [encodedResult, setEncodedResult] = useState("");

  const wrapperSetEncodedResult = useCallback(
    (val) => {
      setEncodedResult(val);
    },
    [setEncodedResult]
  );

  return (
    <div className="App">
      <div className="header">
        <div className="container">
          <h1 className="header__title">Rövarspråket</h1>
          <h2 className="header__subtitle">The Robber Language</h2>
        </div>
      </div>
      <div className="blocksWrapper">
        <EncodingBlock
          encodedResult={encodedResult}
          setEncodedResult={wrapperSetEncodedResult}
        />
        <hr className="divider" />
        <DecodingBlock encodedResult={encodedResult} />
      </div>
    </div>
  );
}

export default App;
