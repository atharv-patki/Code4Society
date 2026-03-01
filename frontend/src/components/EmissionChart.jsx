import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from "recharts";

export default function EmissionChart({ breakdown }) {
  const data = [
    { name: "Transport", value: breakdown?.transport || 0 },
    { name: "Diet", value: breakdown?.diet || 0 },
    { name: "Energy", value: breakdown?.energy || 0 }
  ];

  const COLORS = ["#06b6d4", "#10b981", "#f59e0b"];

  return (
    <div className="card">
      <h2>📊 Emission Breakdown</h2>
      <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "20px" }}>
        Where your carbon emissions come from
      </p>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <PieChart width={400} height={300}>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={100}
            label={{ fill: "#374151", fontSize: 12, fontWeight: 600 }}
            paddingAngle={2}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: "#fff",
              border: "2px solid #e5e7eb",
              borderRadius: "8px",
              padding: "8px 12px",
              fontSize: "13px"
            }}
            formatter={(value) => `${value.toFixed(2)} kg CO₂`}
          />
          <Legend
            wrapperStyle={{ paddingTop: "20px", fontSize: "13px" }}
            iconType="square"
          />
        </PieChart>
      </div>
    </div>
  );
}
