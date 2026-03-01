import { useContext } from "react";
import { CarbonContext } from "../context/CarbonContext";
import AccuracySection from "../components/AccuracySection";

export default function Dashboard() {
  const { history } = useContext(CarbonContext);
  console.log("Dashboard render, history length=", history.length);

  return (
    <div className="container">
      <h1>Dashboard</h1>

      {/* History Section */}
      {history.length === 0 ? (
        <p>No previous calculations yet. Try the form on the Home page.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {history.map((item, index) => (
            <li key={index} className="card">
              <strong>Result #{index + 1}</strong>
              <p>CO₂: {item.total_co2} kg ({item.carbon_score})</p>
              <p>Trees to offset: {item.trees_required}</p>
            </li>
          ))}
        </ul>
      )}

      {/* Accuracy Section */}
      <AccuracySection history={history} />
    </div>
  );
}
