import { useContext } from "react";
import InputForm from "../components/InputForm";
import CarbonScoreCard from "../components/CarbonScoreCard";
import OffsetCard from "../components/OffsetCard";
import WhatIfSimulator from "../components/WhatIfSimulator";
import EmissionChart from "../components/EmissionChart";
import RecommendationList from "../components/RecommendationList";
import { CarbonContext } from "../context/CarbonContext";

export default function Home() {
  const { result } = useContext(CarbonContext);
  console.log("Rendering Home, result=", result);

  return (
    <div className="container">
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1>🌍 AI Carbon Footprint Estimator</h1>
        <p style={{ fontSize: "16px", color: "#9ca3af", maxWidth: "600px", margin: "0 auto" }}>
          Discover your environmental impact and get personalized recommendations to live more sustainably
        </p>
      </div>

      <InputForm />

      {/* only render pieces when the data we expect actually exists to avoid runtime errors */}
      {result && (
        <>
          <CarbonScoreCard data={result} />

          {result.trees_required !== undefined && (
            <OffsetCard trees={result.trees_required} />
          )}

          {result.breakdown && <EmissionChart breakdown={result.breakdown} />}

          {result.recommendations && (
            <RecommendationList tips={result.recommendations} />
          )}

          {result.input_data && (
            <WhatIfSimulator baseData={result.input_data} />
          )}
        </>
      )}
    </div>
  );
}
