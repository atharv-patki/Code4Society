export default function CarbonScoreCard({ data }) {
  const getStatusClass = (status) => {
    const lower = status?.toLowerCase() || '';
    if (lower.includes('low')) return 'status-low';
    if (lower.includes('high')) return 'status-high';
    return 'status-moderate';
  };

  return (
    <div className="card">
      <h2>♻️ Carbon Score</h2>
      <h3>{data.total_co2} kg CO₂</h3>
      <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "12px" }}>
        Your annual carbon emissions
      </p>
      <span className={`status-badge ${getStatusClass(data.carbon_score)}`}>
        {data.carbon_score}
      </span>
    </div>
  );
}
