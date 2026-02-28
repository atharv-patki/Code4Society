export default function OffsetCard({ trees }) {
  return (
    <div className="card" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f0f9ff 100%)' }}>
      <h2>🌳 Offset Recommendation</h2>
      <div style={{ marginTop: "20px" }}>
        <div style={{ fontSize: "48px", fontWeight: "700", color: "#059669", marginBottom: "10px" }}>
          {trees}
        </div>
        <p style={{ color: "#6b7280", fontSize: "16px", marginBottom: "12px" }}>
          trees needed to offset your annual CO₂ emissions
        </p>
        <p style={{ color: "#888", fontSize: "13px" }}>
          🌱 One tree absorbs ~21kg of CO₂ over 10 years
        </p>
      </div>
    </div>
  );
}
