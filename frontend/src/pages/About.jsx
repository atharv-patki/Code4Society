import React from "react";

export default function About() {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <div className="about-header">
        <div style={{ display: "inline-block", padding: "8px 16px", background: "linear-gradient(135deg, #d1fae5 0%, #e0f2fe 100%)", borderRadius: "24px", marginBottom: "16px", fontSize: "14px", fontWeight: "600", color: "#059669" }}>
          🌍 Environmental Impact Tracking
        </div>
        <h1 className="about-title">About Carbon Footprint Calculator</h1>
        <p className="about-subtitle">
          Empowering individuals to understand, track, and reduce their environmental impact through data-driven insights and actionable recommendations.
        </p>
      </div>

      {/* Key Features Grid */}
      <div className="about-section" style={{ background: "linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)" }}>
        <h2 className="about-section-title">How It Works</h2>
        <p style={{ color: "#6b7280", marginBottom: "24px", fontSize: "15px" }}>
          Our calculator uses scientifically validated emission factors to provide accurate carbon footprint estimates across three key areas of your lifestyle.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
          <div className="feature-card">
            <div className="feature-card-icon" style={{ background: "linear-gradient(135deg, #10b981 0%, #059669 100%)" }}>
              🚗
            </div>
            <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#1f2937", marginBottom: "8px" }}>Transport</h3>
            <p style={{ color: "#6b7280", fontSize: "14px", lineHeight: "1.6" }}>
              Calculate emissions based on your daily commute, vehicle type, and distance traveled using IPCC-validated factors.
            </p>
            <div style={{ marginTop: "12px", padding: "8px 12px", background: "#f0fdf4", borderRadius: "8px", fontSize: "12px", color: "#059669", fontWeight: "600" }}>
              ✓ Real-time calculations
            </div>
          </div>
          
          <div className="feature-card">
            <div className="feature-card-icon" style={{ background: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)" }}>
              🍽️
            </div>
            <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#1f2937", marginBottom: "8px" }}>Diet</h3>
            <p style={{ color: "#6b7280", fontSize: "14px", lineHeight: "1.6" }}>
              Track the carbon impact of your food choices based on FAO dietary studies and consumption patterns.
            </p>
            <div style={{ marginTop: "12px", padding: "8px 12px", background: "#ecfeff", borderRadius: "8px", fontSize: "12px", color: "#0891b2", fontWeight: "600" }}>
              ✓ FAO-based data
            </div>
          </div>
          
          <div className="feature-card">
            <div className="feature-card-icon" style={{ background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)" }}>
              ⚡
            </div>
            <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#1f2937", marginBottom: "8px" }}>Energy</h3>
            <p style={{ color: "#6b7280", fontSize: "14px", lineHeight: "1.6" }}>
              Monitor household electricity consumption with accurate grid emission factors specific to your region.
            </p>
            <div style={{ marginTop: "12px", padding: "8px 12px", background: "#f5f3ff", borderRadius: "8px", fontSize: "12px", color: "#7c3aed", fontWeight: "600" }}>
              ✓ Grid-accurate
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", margin: "28px 0" }}>
        <div className="stat-card">
          <div style={{ fontSize: "36px", fontWeight: "800", background: "linear-gradient(135deg, #10b981 0%, #06b6d4 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>87%</div>
          <div style={{ fontSize: "14px", color: "#6b7280", marginTop: "4px" }}>Model Accuracy</div>
        </div>
        <div className="stat-card">
          <div style={{ fontSize: "36px", fontWeight: "800", background: "linear-gradient(135deg, #10b981 0%, #06b6d4 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>3</div>
          <div style={{ fontSize: "14px", color: "#6b7280", marginTop: "4px" }}>Key Categories</div>
        </div>
        <div className="stat-card">
          <div style={{ fontSize: "36px", fontWeight: "800", background: "linear-gradient(135deg, #10b981 0%, #06b6d4 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>21kg</div>
          <div style={{ fontSize: "14px", color: "#6b7280", marginTop: "4px" }}>CO₂/Tree/Year</div>
        </div>
        <div className="stat-card">
          <div style={{ fontSize: "36px", fontWeight: "800", background: "linear-gradient(135deg, #10b981 0%, #06b6d4 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>IPCC</div>
          <div style={{ fontSize: "14px", color: "#6b7280", marginTop: "4px" }}>Certified Data</div>
        </div>
      </div>

      {/* Emissions Factors Table */}
      <div className="about-section">
        <h2 className="about-section-title">Emission Factors</h2>
        <p style={{ color: "#6b7280", marginBottom: "20px", fontSize: "15px" }}>
          Our calculations are based on peer-reviewed scientific data from leading international environmental organizations.
        </p>
        <div className="emissions-table-wrapper">
          <table className="emissions-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Emission Rate</th>
                <th>Source</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="table-category">
                  <span className="category-icon">🚗</span>
                  <span>Car (Petrol)</span>
                </td>
                <td className="table-value">0.21 kg CO₂/km</td>
                <td style={{ padding: "18px 20px", fontSize: "13px", color: "#6b7280" }}>IPCC 2023</td>
              </tr>
              <tr>
                <td className="table-category">
                  <span className="category-icon">🚌</span>
                  <span>Public Bus</span>
                </td>
                <td className="table-value">0.089 kg CO₂/km</td>
                <td style={{ padding: "18px 20px", fontSize: "13px", color: "#6b7280" }}>IPCC 2023</td>
              </tr>
              <tr>
                <td className="table-category">
                  <span className="category-icon">🚴</span>
                  <span>Bicycle</span>
                </td>
                <td className="table-value">0.05 kg CO₂/km</td>
                <td style={{ padding: "18px 20px", fontSize: "13px", color: "#6b7280" }}>IPCC 2023</td>
              </tr>
              <tr>
                <td className="table-category">
                  <span className="category-icon">⚡</span>
                  <span>Grid Electricity</span>
                </td>
                <td className="table-value">0.233 kg CO₂/kWh</td>
                <td style={{ padding: "18px 20px", fontSize: "13px", color: "#6b7280" }}>IEA 2023</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Mission Section */}
      <div className="about-section about-goals" style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-50px", right: "-50px", fontSize: "200px", opacity: "0.05" }}>🎯</div>
        <h2 className="about-section-title">Our Mission</h2>
        <p className="about-text" style={{ fontSize: "16px", lineHeight: "1.8" }}>
          We believe that awareness is the first step toward change. Our mission is to democratize access to carbon footprint data, empowering individuals worldwide to understand their environmental impact and make informed, sustainable choices. Every small action contributes to a healthier planet, and together, we can drive meaningful change toward a carbon-neutral future.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "24px" }}>
          <div style={{ padding: "16px", background: "rgba(255,255,255,0.6)", borderRadius: "12px", border: "1px solid rgba(16, 185, 129, 0.2)" }}>
            <div style={{ fontSize: "24px", marginBottom: "8px" }}>🌱</div>
            <div style={{ fontSize: "14px", fontWeight: "600", color: "#059669", marginBottom: "4px" }}>Raise Awareness</div>
            <div style={{ fontSize: "13px", color: "#6b7280" }}>Educate about personal carbon emissions</div>
          </div>
          <div style={{ padding: "16px", background: "rgba(255,255,255,0.6)", borderRadius: "12px", border: "1px solid rgba(16, 185, 129, 0.2)" }}>
            <div style={{ fontSize: "24px", marginBottom: "8px" }}>💡</div>
            <div style={{ fontSize: "14px", fontWeight: "600", color: "#059669", marginBottom: "4px" }}>Empower Action</div>
            <div style={{ fontSize: "13px", color: "#6b7280" }}>Provide tools for sustainable living</div>
          </div>
        </div>
      </div>

      {/* Tree Offset Section */}
      <div className="about-section about-offset" style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-30px", right: "-30px", fontSize: "150px", opacity: "0.05" }}>🌳</div>
        <h2 className="about-section-title">Carbon Offsetting Through Trees</h2>
        <div className="offset-info">
          <div className="offset-icon">🌳</div>
          <div>
            <p className="about-text" style={{ marginBottom: "16px" }}>
              Trees are nature's carbon capture technology. A single mature tree absorbs approximately <strong>21 kg of CO₂ per year</strong> through photosynthesis. Our calculator helps you understand how many trees would be needed to offset your annual emissions, providing a tangible goal for carbon neutrality.
            </p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <div style={{ padding: "10px 16px", background: "#ecfdf5", borderRadius: "8px", fontSize: "13px", fontWeight: "600", color: "#059669" }}>
                ✓ Scientific basis
              </div>
              <div style={{ padding: "10px 16px", background: "#ecfdf5", borderRadius: "8px", fontSize: "13px", fontWeight: "600", color: "#059669" }}>
                ✓ Real impact
              </div>
              <div style={{ padding: "10px 16px", background: "#ecfdf5", borderRadius: "8px", fontSize: "13px", fontWeight: "600", color: "#059669" }}>
                ✓ Measurable results
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div style={{ 
        background: "linear-gradient(135deg, #10b981 0%, #059669 100%)", 
        padding: "48px 32px", 
        borderRadius: "20px", 
        textAlign: "center",
        color: "white",
        boxShadow: "0 20px 50px rgba(16, 185, 129, 0.3)"
      }}>
        <h2 style={{ fontSize: "28px", fontWeight: "800", marginBottom: "12px" }}>Ready to Make a Difference?</h2>
        <p style={{ fontSize: "16px", opacity: "0.9", marginBottom: "24px", maxWidth: "600px", margin: "0 auto 24px" }}>
          Start tracking your carbon footprint today and take the first step toward a more sustainable lifestyle.
        </p>
        <button onClick={() => window.location.href = "/"} style={{ 
          background: "white", 
          color: "#059669", 
          padding: "14px 32px",
          fontSize: "16px",
          fontWeight: "700",
          border: "none",
          borderRadius: "12px",
          cursor: "pointer",
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
          transition: "all 0.3s ease"
        }}>
          Calculate Your Footprint →
        </button>
      </div>
    </div>
  );
}
