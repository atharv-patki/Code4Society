export default function RecommendationList({ tips }) {
  return (
    <div className="card">
      <h2>🤖 AI Recommendations</h2>
      <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "20px" }}>
        Personalized tips to reduce your carbon footprint
      </p>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {tips?.map((tip, i) => (
          <li
            key={i}
            style={{
              padding: "12px 16px",
              marginBottom: "10px",
              background: "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)",
              borderRadius: "8px",
              borderLeft: "4px solid #10b981",
              color: "#374151",
              fontSize: "14px",
              lineHeight: "1.6"
            }}
          >
            ✓ {tip}
          </li>
        ))}
      </ul>
    </div>
  );
}
