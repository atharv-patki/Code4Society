import React from "react";

export default function About() {
  return (
    <div style={{ padding: "40px 20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>About Carbon Footprint Calculator</h1>
      <p>
        The Carbon Footprint Calculator helps you understand and track your environmental impact.
      </p>
      
      <h2>How It Works</h2>
      <ul>
        <li><strong>Transport:</strong> Calculate emissions based on your daily commute</li>
        <li><strong>Diet:</strong> Track carbon impact of your food choices</li>
        <li><strong>Energy:</strong> Monitor household electricity consumption</li>
      </ul>

      <h2>Emissions Factors</h2>
      <table style={{ borderCollapse: "collapse", width: "100%", marginTop: "20px" }}>
        <tbody>
          <tr style={{ borderBottom: "1px solid #ddd" }}>
            <td style={{ padding: "10px", fontWeight: "bold" }}>Car</td>
            <td style={{ padding: "10px" }}>0.21 kg CO₂/km</td>
          </tr>
          <tr style={{ borderBottom: "1px solid #ddd" }}>
            <td style={{ padding: "10px", fontWeight: "bold" }}>Bus</td>
            <td style={{ padding: "10px" }}>0.089 kg CO₂/km</td>
          </tr>
          <tr style={{ borderBottom: "1px solid #ddd" }}>
            <td style={{ padding: "10px", fontWeight: "bold" }}>Bike</td>
            <td style={{ padding: "10px" }}>0.05 kg CO₂/km</td>
          </tr>
          <tr style={{ borderBottom: "1px solid #ddd" }}>
            <td style={{ padding: "10px", fontWeight: "bold" }}>Electricity</td>
            <td style={{ padding: "10px" }}>0.233 kg CO₂/kWh</td>
          </tr>
        </tbody>
      </table>

      <h2>Goals</h2>
      <p>
        Our mission is to raise awareness about personal carbon emissions and empower people
        to make sustainable choices. Every small change counts toward a healthier planet!
      </p>

      <h2>Tree Offsetting</h2>
      <p>
        One mature tree absorbs approximately 21 kg of CO₂ per year. Use this calculator
        to understand how many trees you would need to plant to offset your annual emissions.
      </p>
    </div>
  );
}
