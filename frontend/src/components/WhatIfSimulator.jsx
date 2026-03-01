import { useState, useEffect } from "react";
import { simulateCarbon } from "../services/api";

export default function WhatIfSimulator({ baseData }) {
  const [transportReduction, setTransportReduction] = useState(0);
  const [dietChange, setDietChange] = useState(0);
  const [energyReduction, setEnergyReduction] = useState(0);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const runSimulation = async (transport, diet, energy) => {
    setLoading(true);

    try {
      const res = await simulateCarbon({
        base_data: baseData,
        adjustments: {
          transport_reduction_percent: transport,
          diet_veg_days_per_week: diet,
          energy_reduction_percent: energy
        }
      });
      setResult(res.data);
    } catch (err) {
      console.log("Simulation failed", err);
    } finally {
      setLoading(false);
    }
  };

  // Run simulation whenever any slider changes
  useEffect(() => {
    runSimulation(transportReduction, dietChange, energyReduction);
  }, [transportReduction, dietChange, energyReduction]);

  return (
    <div className="card">
      <h2>🧪 What-If Simulator</h2>
      <p style={{ color: "#6b7280", fontSize: "15px", marginBottom: "28px", lineHeight: "1.6" }}>
        Explore how lifestyle changes can reduce your carbon footprint
      </p>

      {/* Transport Reduction */}
      <div style={{ marginBottom: "32px" }}>
        <label style={{ marginBottom: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>🚗 Reduce transport usage</span>
          <span style={{ fontWeight: "800", fontSize: "18px", color: "#10b981" }}>{transportReduction}%</span>
        </label>
        <input
          type="range"
          min="0"
          max="50"
          value={transportReduction}
          onChange={(e) => setTransportReduction(+e.target.value)}
          disabled={loading}
          style={{ marginBottom: "12px" }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#9ca3af", marginTop: "8px" }}>
          <span>No reduction</span>
          <span>Maximum reduction (50%)</span>
        </div>
      </div>

      {/* Diet Change */}
      <div style={{ marginBottom: "32px" }}>
        <label style={{ marginBottom: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>🥗 Add vegetarian days per week</span>
          <span style={{ fontWeight: "800", fontSize: "18px", color: "#06b6d4" }}>{dietChange} days</span>
        </label>
        <input
          type="range"
          min="0"
          max="7"
          value={dietChange}
          onChange={(e) => setDietChange(+e.target.value)}
          disabled={loading}
          style={{ marginBottom: "12px" }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#9ca3af", marginTop: "8px" }}>
          <span>No change</span>
          <span>Full week vegetarian</span>
        </div>
      </div>

      {/* Energy Reduction */}
      <div style={{ marginBottom: "32px" }}>
        <label style={{ marginBottom: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>⚡ Reduce electricity usage</span>
          <span style={{ fontWeight: "800", fontSize: "18px", color: "#8b5cf6" }}>{energyReduction}%</span>
        </label>
        <input
          type="range"
          min="0"
          max="40"
          value={energyReduction}
          onChange={(e) => setEnergyReduction(+e.target.value)}
          disabled={loading}
          style={{ marginBottom: "12px" }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#9ca3af", marginTop: "8px" }}>
          <span>No reduction</span>
          <span>Maximum reduction (40%)</span>
        </div>
      </div>

      {loading && (
        <div style={{ padding: "20px", background: "#eff6ff", borderRadius: "12px", textAlign: "center", marginTop: "20px" }}>
          <p style={{ color: "#06b6d4", fontSize: "15px", fontWeight: "600" }}>
            🔄 Calculating simulation…
          </p>
        </div>
      )}

      {result && !loading && (
        <div style={{ marginTop: "24px", padding: "24px", background: "linear-gradient(135deg, #f0fdf4 0%, #f0f9ff 100%)", borderRadius: "16px", borderLeft: "5px solid #10b981" }}>
          <div style={{ marginBottom: "20px" }}>
            <p style={{ color: "#6b7280", fontSize: "13px", marginBottom: "6px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.3px" }}>New Annual Emissions</p>
            <p style={{ fontSize: "38px", fontWeight: "800", background: "linear-gradient(135deg, #10b981 0%, #06b6d4 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {result.new_total_co2} kg CO₂
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div style={{ padding: "16px", background: "white", borderRadius: "12px", textAlign: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
              <p style={{ color: "#6b7280", fontSize: "12px", marginBottom: "6px", fontWeight: "600", textTransform: "uppercase" }}>Reduction</p>
              <p style={{ fontSize: "28px", fontWeight: "800", color: "#10b981" }}>
                {result.reduction_percent}%
              </p>
            </div>
            <div style={{ padding: "16px", background: "white", borderRadius: "12px", textAlign: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
              <p style={{ color: "#6b7280", fontSize: "12px", marginBottom: "6px", fontWeight: "600", textTransform: "uppercase" }}>Trees Saved</p>
              <p style={{ fontSize: "28px", fontWeight: "800", color: "#059669" }}>
                {result.trees_saved} 🌳
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
