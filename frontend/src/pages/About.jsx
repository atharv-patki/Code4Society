import React from "react";

export default function About() {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1 className="about-title">About Carbon Footprint Calculator</h1>
        <p className="about-subtitle">
          The Carbon Footprint Calculator helps you understand and track your environmental impact.
        </p>
      </div>
      
      <div className="about-section">
        <h2 className="about-section-title">How It Works</h2>
        <ul className="about-feature-list">
          <li className="about-feature-item">
            <span className="feature-icon">🚗</span>
            <div>
              <strong>Transport:</strong> Calculate emissions based on your daily commute
            </div>
          </li>
          <li className="about-feature-item">
            <span className="feature-icon">🍽️</span>
            <div>
              <strong>Diet:</strong> Track carbon impact of your food choices
            </div>
          </li>
          <li className="about-feature-item">
            <span className="feature-icon">⚡</span>
            <div>
              <strong>Energy:</strong> Monitor household electricity consumption
            </div>
          </li>
        </ul>
      </div>

      <div className="about-section">
        <h2 className="about-section-title">Emissions Factors</h2>
        <div className="emissions-table-wrapper">
          <table className="emissions-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Emission Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="table-category">
                  <span className="category-icon">🚗</span>
                  <span>Car</span>
                </td>
                <td className="table-value">0.21 kg CO₂/km</td>
              </tr>
              <tr>
                <td className="table-category">
                  <span className="category-icon">🚌</span>
                  <span>Bus</span>
                </td>
                <td className="table-value">0.089 kg CO₂/km</td>
              </tr>
              <tr>
                <td className="table-category">
                  <span className="category-icon">🚴</span>
                  <span>Bike</span>
                </td>
                <td className="table-value">0.05 kg CO₂/km</td>
              </tr>
              <tr>
                <td className="table-category">
                  <span className="category-icon">⚡</span>
                  <span>Electricity</span>
                </td>
                <td className="table-value">0.233 kg CO₂/kWh</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="about-section about-goals">
        <h2 className="about-section-title">Our Goals</h2>
        <p className="about-text">
          Our mission is to raise awareness about personal carbon emissions and empower people
          to make sustainable choices. Every small change counts toward a healthier planet!
        </p>
      </div>

      <div className="about-section about-offset">
        <h2 className="about-section-title">Tree Offsetting</h2>
        <div className="offset-info">
          <div className="offset-icon">🌳</div>
          <p className="about-text">
            One mature tree absorbs approximately <strong>21 kg of CO₂ per year</strong>. 
            Use this calculator to understand how many trees you would need to plant to offset your annual emissions.
          </p>
        </div>
      </div>
    </div>
  );
}
