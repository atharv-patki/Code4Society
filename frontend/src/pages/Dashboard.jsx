import { useContext } from "react";
import { CarbonContext } from "../context/CarbonContext";

export default function Dashboard() {
  const { history } = useContext(CarbonContext);
  console.log("Dashboard render, history length=", history.length);

  return (
    <div className="container">
      <h1>📊 Dashboard</h1>
      <p style={{ textAlign: "center", color: "#9ca3af", marginBottom: "32px" }}>
        Your carbon footprint calculation history
      </p>

      {/* History Section */}
      {history.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "48px 24px" }}>
          <div style={{ fontSize: "64px", marginBottom: "16px" }}>📋</div>
          <h3 style={{ color: "#6b7280", fontWeight: 600, marginBottom: "8px" }}>No calculations yet</h3>
          <p style={{ color: "#9ca3af" }}>Start by calculating your carbon footprint on the Home page</p>
        </div>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {history.map((item, index) => (
            <li key={index} className="card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <strong style={{ fontSize: "18px", color: "#1f2937" }}>Result #{index + 1}</strong>
                <span className={`status-badge status-${item.carbon_score?.toLowerCase()}`}>
                  {item.carbon_score}
                </span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "16px" }}>
                <div>
                  <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "4px" }}>Annual CO₂ Emissions</p>
                  <p style={{ fontSize: "24px", fontWeight: "700", color: "#10b981" }}>{item.total_co2} kg</p>
                </div>
                <div>
                  <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "4px" }}>Trees to Offset</p>
                  <p style={{ fontSize: "24px", fontWeight: "700", color: "#059669" }}>{item.trees_required} 🌳</p>
                </div>
              </div>
              {item.breakdown && (
                <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid #e5e7eb" }}>
                  <p style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "8px" }}>Breakdown:</p>
                  <div style={{ display: "flex", gap: "12px", fontSize: "13px" }}>
                    <span>🚗 {item.breakdown.transport} kg</span>
                    <span>🍽️ {item.breakdown.diet} kg</span>
                    <span>⚡ {item.breakdown.energy} kg</span>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
