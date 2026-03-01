# Carbon Footprint Calculator - Backend

FastAPI-based Python backend for the Carbon Footprint Calculator application.

## Features

- **Carbon Calculation**: Compute annual CO2 emissions based on transport, diet, and energy usage
- **What-If Simulator**: Test scenarios like reducing transport or changing energy sources
- **RESTful API**: Clean, documented endpoints with OpenAPI/Swagger support
- **CORS Enabled**: Works seamlessly with the React frontend
- **Type Safety**: Full Pydantic model validation

## Requirements

- Python 3.9+
- pip (Python package manager)

## Installation

1. **Create a virtual environment** (recommended):

```bash
python -m venv venv

# Activate on Windows
venv\Scripts\activate

# Activate on macOS/Linux
source venv/bin/activate
```

2. **Install dependencies**:

```bash
pip install -r requirements.txt
```

3. **Configure environment** (optional):

```bash
cp .env.example .env
# Edit .env with your settings if needed
```

## Running the Server

### Development Mode (with hot reload):

```bash
python main.py
```

Or using uvicorn directly:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Production Mode:

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

The API will be available at `http://localhost:8000`

## API Documentation

### Interactive Docs (Swagger UI)
Once running, visit: `http://localhost:8000/docs`

### Health Check
```
GET /api/health
```
Response:
```json
{
  "status": "healthy",
  "service": "carbon-footprint-backend"
}
```

### Calculate Carbon Footprint
```
POST /api/calculate
```

Request body:
```json
{
  "transport": {
    "mode": "car",
    "distance_per_day": 25
  },
  "diet": {
    "type": "nonveg"
  },
  "energy": {
    "monthly_units": 350
  }
}
```

Response:
```json
{
  "total_co2": 3456.78,
  "carbon_score": "Moderate",
  "trees_required": 165,
  "breakdown": {
    "transport": 1922.5,
    "diet": 2500,
    "energy": 979.8
  },
  "recommendations": [
    "Reduce vehicle usage or switch to public transport",
    "Incorporate more plant-based meals into your diet",
    "Consider renewable energy for electricity"
  ]
}
```

### Simulate Carbon Reduction
```
POST /api/simulate
```

Request body:
```json
{
  "base_data": {
    "total_co2": 3456.78,
    "carbon_score": "Moderate",
    "trees_required": 165,
    "breakdown": {
      "transport": 1922.5,
      "diet": 2500,
      "energy": 979.8
    },
    "recommendations": []
  },
  "adjustments": {
    "transport_reduction_percent": 50
  }
}
```

Response:
```json
{
  "new_total_co2": 2696.28,
  "reduction_percent": 21.99,
  "trees_saved": 36
}
```

## Configuration

### Environment Variables (`.env`)

- `ENV`: Set to `development` or `production`
- `PORT`: Port number for the API (default: 8000)
- `CORS_ORIGINS`: Comma-separated list of allowed origins

## Connecting the Frontend

In your frontend `.env` or configuration, set:

```
VITE_API_URL=http://localhost:8000
```

The frontend will then use your FastAPI backend instead of mock calculations.

## Project Structure

```
backend/
├── main.py           # FastAPI application and routes
├── models.py         # Pydantic request/response models
├── calculator.py     # Core calculation logic
├── requirements.txt  # Python dependencies
├── .env.example      # Environment configuration template
└── README.md         # This file
```

## Transport Modes

- `car`: 0.21 kg CO2 per km
- `bus`: 0.089 kg CO2 per km
- `bike`: 0.05 kg CO2 per km

## Diet Types

- `vegan`: 1200 kg CO2/year
- `veg`: 1500 kg CO2/year
- `nonveg`: 2500 kg CO2/year

## Energy

- Assumes 0.233 kg CO2 per kWh (typical grid mix)
- Input is monthly kWh usage

## Trees for Carbon Offset

- Assumes 21 kg CO2 absorbed per tree per year

## Development

### Running Tests (when tests are added)

```bash
pytest
```

### Code Style

The project uses standard Python conventions. Consider using:

```bash
pip install black flake8
black .
flake8 .
```

## Troubleshooting

### ModuleNotFoundError

Make sure your virtual environment is activated and dependencies installed:

```bash
pip install -r requirements.txt
```

### CORS Issues

Check that `CORS_ORIGINS` in `.env` includes your frontend URL.

### Port Already in Use

Change the port:

```bash
python main.py --port 8001
```

Or edit the `PORT` variable in `.env`

## License

This project is part of the Carbon Footprint Calculator application.
