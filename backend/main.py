"""Flask backend for Carbon Footprint Calculator"""

import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from calculator import calculate_carbon, simulate_carbon

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Configure CORS
cors_origins = os.getenv("CORS_ORIGINS", "http://localhost:5173,http://localhost:3000").split(",")
CORS(app, resources={r"/api/*": {"origins": cors_origins}})

@app.route("/", methods=["GET"])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "ok",
        "message": "Carbon Footprint API is running",
        "version": "1.0.0",
    }), 200

@app.route("/api/health", methods=["GET"])
def detailed_health():
    """Detailed health check"""
    return jsonify({
        "status": "healthy",
        "service": "carbon-footprint-backend",
    }), 200

@app.route("/api/calculate", methods=["POST"])
def calculate():
    """Calculate carbon footprint based on user inputs"""
    try:
        data = request.get_json()
        
        transport = data.get("transport", {})
        diet = data.get("diet", {})
        energy = data.get("energy", {})
        
        result = calculate_carbon(
            transport_mode=transport.get("mode"),
            transport_distance=transport.get("distance", 0),
            diet_type=diet.get("type"),
            energy_kwh=energy.get("kwh", 0)
        )
        
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": f"Error calculating carbon footprint: {str(e)}"}), 400

@app.route("/api/simulate", methods=["POST"])
def simulate():
    """Simulate carbon emissions with adjustments"""
    try:
        data = request.get_json()
        
        current = data.get("current", {})
        adjusted = data.get("adjusted", {})
        
        result = simulate_carbon(
            current_transport=current.get("transport", "car"),
            current_distance=current.get("distance", 0),
            current_diet=current.get("diet", "moderate"),
            current_energy=current.get("energy", 0),
            new_transport=adjusted.get("transport", "car"),
            new_distance=adjusted.get("distance", 0),
            new_diet=adjusted.get("diet", "moderate"),
            new_energy=adjusted.get("energy", 0)
        )
        
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": f"Error simulating carbon footprint: {str(e)}"}), 400

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    debug = os.getenv("ENV", "development") == "development"
    app.run(debug=debug, host="0.0.0.0", port=port)

