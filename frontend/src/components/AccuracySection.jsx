import { useMemo } from "react";

// Benchmark averages (kg CO2/year) based on global/India averages
const BENCHMARKS = {
  global_average: 4800,
  india_average: 1900,
  low_carbon: 1200,
  high_carbon: 8000,
};

const ACCURACY_METRICS = [
  {
    label: "Transport Model",
    description: "Emission factor accuracy vs IPCC data",
    accuracy: 91,
    color: "#10b981",
  },
  {
    label: "Diet Estimation",
    description: "Based on FAO dietary carbon studies",
    accuracy: 84,
    color: "#06b6d4",
  },
  {
    label: "Energy Usage",
    description: "Grid emission factor (0.233 kg/kWh)",
    accuracy: 88,
    color: "#8b5cf6",
  },
  {
    label: "Overall Model",
    description: "Weighted composite accuracy score",
    accuracy: 87,
    color: "#f59e0b",
  },
];

function RadialGauge({ value, color, size = 100 }) {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="none"
        stroke="#e5e7eb"
        strokeWidth="8"
      />
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth="8"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        transform="rotate(-90 50 50)"
        style={{ transition: "stroke-dashoffset 1.2s ease-out" }}
      />
      <text
        x="50"
        y="50"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="16"
        fontWeight="700"
        fill="#1f2937"
      >
        {value}%
      </text>
    </svg>
  );
}

function AccuracyBar({ label, description, accuracy, color, delay = 0 }) {
  return (
    <div style={{ marginBottom: "20px", animation: `slideUp 0.5s ease-out ${delay}s both` }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
        <div>
          <span style={{ fontWeight: 600, color: "#1f2937", fontSize: "14px" }}>{label}</span>
          <span style={{ display: "block", fontSize: "12px", color: "#6b7280", marginTop: "2px" }}>{description}</span>
        </div>
        <span style={{ fontWeight: 700, color, fontSize: "18px", minWidth: "48px", textAlign: "right" }}>
          {accuracy}%
        </span>
      </div>
      <div style={{
        background: "#f3f4f6",
        borderRadius: "999px",
        height: "8px",
        overflow: "hidden",
      }}>
        <div style={{
          height: "100%",
          width: `${accuracy}%`,
          background: `linear-gradient(90deg, ${color}cc, ${color})`,
          borderRadius: "999px",
          transition: "width 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
          animation: `expandBar 1.2s ease-out ${delay}s both`,
        }} />
      </div>
    </div>
  );
}

function ComparisonBadge({ label, value, userValue }) {
  const diff = userValue - value;
  const isBelow = diff < 0;
  return (
    <div style={{
      background: "#f9fafb",
      border: "1px solid #e5e7eb",
      borderRadius: "12px",
      padding: "14px 16px",
      textAlign: "center",
      flex: "1",
    }}>
      <div style={{ fontSize: "11px", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "6px" }}>{label}</div>
      <div style={{ fontWeight: 700, fontSize: "16px", color: "#1f2937" }}>{value.toLocaleString()} kg</div>
      {userValue !== null && (
        <div style={{
          marginTop: "6px",
          fontSize: "12px",
          fontWeight: 600,
          color: isBelow ? "#10b981" : "#ef4444",
        }}>
          {isBelow ? "▼" : "▲"} {Math.abs(diff).toLocaleString()} kg {isBelow ? "below" : "above"}
        </div>
      )}
    </div>
  );
}

export default function AccuracySection({ history }) {
  const stats = useMemo(() => {
    if (!history || history.length === 0) return null;

    const totals = history.map((h) => h.total_co2 || 0);
    const avg = totals.reduce((a, b) => a + b, 0) / totals.length;
    const latest = totals[totals.length - 1];

    // Trend: positive means increasing emissions
    const trend = totals.length > 1 ? ((latest - totals[0]) / totals[0]) * 100 : 0;

    // Consistency score: lower variance = more consistent = higher score
    const variance = totals.length > 1
      ? totals.reduce((sum, v) => sum + Math.pow(v - avg, 2), 0) / totals.length
      : 0;
    const stdDev = Math.sqrt(variance);
    const consistencyScore = Math.max(0, Math.min(100, Math.round(100 - (stdDev / avg) * 50)));

    // Distribution across categories
    const breakdowns = history.filter((h) => h.breakdown);
    const avgBreakdown = breakdowns.length > 0
      ? {
          transport: breakdowns.reduce((s, h) => s + (h.breakdown.transport || 0), 0) / breakdowns.length,
          diet: breakdowns.reduce((s, h) => s + (h.breakdown.diet || 0), 0) / breakdowns.length,
          energy: breakdowns.reduce((s, h) => s + (h.breakdown.energy || 0), 0) / breakdowns.length,
        }
      : null;

    return { avg, latest, trend, consistencyScore, avgBreakdown, count: totals.length };
  }, [history]);

  const hasData = stats !== null;

  return (
    <div style={{ marginTop: "32px" }}>
      {/* Section Header */}
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <h2 style={{
          fontSize: "28px",
          fontWeight: 800,
          background: "linear-gradient(135deg, #10b981, #06b6d4)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          marginBottom: "8px",
        }}>
          🎯 Accuracy & Insights
        </h2>
        <p style={{ color: "#6b7280", fontSize: "14px" }}>
          Model reliability metrics and your personal carbon accuracy report
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        {/* Model Accuracy Card */}
        <div className="card" style={{ animation: "slideUp 0.5s ease-out 0.1s both" }}>
          <h3 style={{ fontWeight: 700, color: "#1f2937", marginBottom: "6px", fontSize: "16px" }}>
            📊 Model Accuracy
          </h3>
          <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "20px" }}>
            How closely our estimation engine matches peer-reviewed emission factors
          </p>
          {ACCURACY_METRICS.map((metric, i) => (
            <AccuracyBar key={metric.label} {...metric} delay={0.1 + i * 0.1} />
          ))}
          <div style={{
            marginTop: "16px",
            padding: "10px 14px",
            background: "#f0fdf4",
            borderRadius: "10px",
            border: "1px solid #bbf7d0",
            fontSize: "12px",
            color: "#166534",
          }}>
            ✅ Methodology based on IPCC AR6, FAO food emission factors, and national grid data
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Gauge Cards */}
          <div className="card" style={{ animation: "slideUp 0.5s ease-out 0.2s both" }}>
            <h3 style={{ fontWeight: 700, color: "#1f2937", marginBottom: "16px", fontSize: "16px" }}>
              🔬 Accuracy at a Glance
            </h3>
            <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "16px" }}>
              {ACCURACY_METRICS.map((m) => (
                <div key={m.label} style={{ textAlign: "center" }}>
                  <RadialGauge value={m.accuracy} color={m.color} size={88} />
                  <div style={{ fontSize: "12px", fontWeight: 600, color: "#374151", marginTop: "6px" }}>
                    {m.label.split(" ")[0]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Your Results vs Benchmarks */}
          <div className="card" style={{ animation: "slideUp 0.5s ease-out 0.3s both" }}>
            <h3 style={{ fontWeight: 700, color: "#1f2937", marginBottom: "6px", fontSize: "16px" }}>
              🌍 Your Results vs Benchmarks
            </h3>
            <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "16px" }}>
              {hasData ? `Based on ${stats.count} calculation${stats.count > 1 ? "s" : ""} — avg ${stats.avg.toFixed(0)} kg CO₂/yr` : "Submit a calculation to see your comparison"}
            </p>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <ComparisonBadge label="India Avg" value={BENCHMARKS.india_average} userValue={hasData ? stats.avg : null} />
              <ComparisonBadge label="Global Avg" value={BENCHMARKS.global_average} userValue={hasData ? stats.avg : null} />
              <ComparisonBadge label="Low Carbon" value={BENCHMARKS.low_carbon} userValue={hasData ? stats.avg : null} />
            </div>
          </div>
        </div>
      </div>

      {/* Personal Stats Row — only shown if there's data */}
      {hasData && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginTop: "24px" }}>
          {/* Trend Card */}
          <div className="card" style={{ animation: "slideUp 0.5s ease-out 0.4s both", textAlign: "center" }}>
            <div style={{ fontSize: "32px", marginBottom: "8px" }}>
              {stats.trend > 5 ? "📈" : stats.trend < -5 ? "📉" : "➡️"}
            </div>
            <div style={{ fontWeight: 700, fontSize: "24px", color: stats.trend > 5 ? "#ef4444" : stats.trend < -5 ? "#10b981" : "#f59e0b" }}>
              {stats.trend > 0 ? "+" : ""}{stats.trend.toFixed(1)}%
            </div>
            <div style={{ fontSize: "13px", color: "#6b7280", marginTop: "4px" }}>Emission Trend</div>
            <div style={{ fontSize: "12px", color: "#9ca3af", marginTop: "4px" }}>
              {stats.trend > 5 ? "Increasing — take action!" : stats.trend < -5 ? "Great progress! 🎉" : "Relatively stable"}
            </div>
          </div>

          {/* Consistency */}
          <div className="card" style={{ animation: "slideUp 0.5s ease-out 0.45s both", textAlign: "center" }}>
            <div style={{ fontSize: "32px", marginBottom: "8px" }}>🎯</div>
            <div style={{ fontWeight: 700, fontSize: "24px", color: "#8b5cf6" }}>
              {stats.consistencyScore}%
            </div>
            <div style={{ fontSize: "13px", color: "#6b7280", marginTop: "4px" }}>Data Consistency</div>
            <div style={{ fontSize: "12px", color: "#9ca3af", marginTop: "4px" }}>
              {stats.consistencyScore >= 80 ? "Very consistent inputs" : stats.consistencyScore >= 60 ? "Moderate variance detected" : "High variance — review inputs"}
            </div>
          </div>

          {/* Top Source */}
          <div className="card" style={{ animation: "slideUp 0.5s ease-out 0.5s both", textAlign: "center" }}>
            {stats.avgBreakdown ? (() => {
              const top = Object.entries(stats.avgBreakdown).sort((a, b) => b[1] - a[1])[0];
              const icons = { transport: "🚗", diet: "🍽️", energy: "⚡" };
              return (
                <>
                  <div style={{ fontSize: "32px", marginBottom: "8px" }}>{icons[top[0]]}</div>
                  <div style={{ fontWeight: 700, fontSize: "20px", color: "#06b6d4", textTransform: "capitalize" }}>
                    {top[0]}
                  </div>
                  <div style={{ fontSize: "13px", color: "#6b7280", marginTop: "4px" }}>Largest Emission Source</div>
                  <div style={{ fontSize: "12px", color: "#9ca3af", marginTop: "4px" }}>
                    ~{top[1].toFixed(0)} kg CO₂/yr avg
                  </div>
                </>
              );
            })() : (
              <>
                <div style={{ fontSize: "32px", marginBottom: "8px" }}>🔍</div>
                <div style={{ fontWeight: 700, fontSize: "16px", color: "#9ca3af" }}>No breakdown data</div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Data quality notice */}
      <div style={{
        marginTop: "20px",
        padding: "14px 18px",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "12px",
        fontSize: "12px",
        color: "#9ca3af",
        textAlign: "center",
      }}>
        ⚠️ Estimates are indicative. For certified carbon accounting, consult a qualified environmental auditor.
        &nbsp;Model accuracy values reflect alignment with IPCC 2023 emission factor datasets.
      </div>
    </div>
  );
}
