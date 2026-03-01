import { useState, useContext } from "react";
import { CarbonContext } from "../context/CarbonContext";
import { calculateCarbon } from "../services/api";

export default function InputForm() {
  const { setResult } = useContext(CarbonContext);
  const [form, setForm] = useState({
    transport: { mode: "car", distance_per_day: 10, fuel_type: "petrol" },
    diet: { type: "veg", meals_per_week: 3 },
    energy: { monthly_units: 120, ac_hours_per_day: 2 }
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (section, field, value) => {
    setForm({
      ...form,
      [section]: { ...form[section], [field]: value }
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await calculateCarbon(form);
      setResult({ ...res.data, input_data: form });
    } catch (err) {
      console.error("calculateCarbon failed", err);
      alert("Calculation failed – check console/network and make sure the backend is running");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>📋 User Details</h2>
      <p style={{ color: "#6b7280", marginBottom: "24px", fontSize: "15px", lineHeight: "1.6" }}>
        Enter your lifestyle details to calculate your annual carbon footprint
      </p>

      <div className="form-row">
        <div>
          <label>🚗 Transport Mode</label>
          <select
            value={form.transport.mode}
            onChange={(e) =>
              handleChange("transport", "mode", e.target.value)
            }
          >
            <option value="car">🚙 Car</option>
            <option value="bus">🚌 Bus</option>
            <option value="train">🚆 Train</option>
          </select>

          <label>📏 Distance per day (km)</label>
          <input
            type="number"
            value={form.transport.distance_per_day}
            onChange={(e) =>
              handleChange("transport", "distance_per_day", +e.target.value)
            }
            min="0"
            max="1000"
          />
        </div>

        <div>
          <label>⚡ Monthly electricity units</label>
          <input
            type="number"
            value={form.energy.monthly_units}
            onChange={(e) =>
              handleChange("energy", "monthly_units", +e.target.value)
            }
            min="0"
            max="5000"
          />

          <label>❄️ AC usage (hours/day)</label>
          <input
            type="number"
            value={form.energy.ac_hours_per_day}
            onChange={(e) =>
              handleChange("energy", "ac_hours_per_day", +e.target.value)
            }
            min="0"
            max="24"
          />
        </div>
      </div>

      <div>
        <label>🍽️ Diet Type</label>
        <select
          value={form.diet.type}
          onChange={(e) => handleChange("diet", "type", e.target.value)}
        >
          <option value="veg">🥗 Vegetarian</option>
          <option value="vegan">🌱 Vegan</option>
          <option value="non-veg">🍖 Non-Vegetarian</option>
        </select>

        <label>🍴 Meat meals per week</label>
        <input
          type="number"
          value={form.diet.meals_per_week}
          onChange={(e) =>
            handleChange("diet", "meals_per_week", +e.target.value)
          }
          min="0"
          max="21"
        />
      </div>

      <button 
        onClick={handleSubmit} 
        disabled={loading} 
        style={{ width: "100%", marginTop: "28px" }}
      >
        {loading ? "🔄 Calculating..." : "✨ Calculate Carbon Footprint"}
      </button>
    </div>
  );
}
