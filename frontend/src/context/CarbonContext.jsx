import { createContext, useState, useEffect } from "react";

export const CarbonContext = createContext({
  result: null,
  setResult: () => {},
  history: []
});

export function CarbonProvider({ children }) {
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  // load history from localStorage once
  useEffect(() => {
    const stored = localStorage.getItem("carbonHistory");
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch {}
    }
  }, []);

  // whenever result changes, push to history and persist
  useEffect(() => {
    if (result) {
      setHistory((prev) => {
        const updated = [...prev, result];
        localStorage.setItem("carbonHistory", JSON.stringify(updated));
        return updated;
      });
    }
  }, [result]);

  return (
    <CarbonContext.Provider value={{ result, setResult, history }}>
      {children}
    </CarbonContext.Provider>
  );
}
