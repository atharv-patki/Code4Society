# Carbon Footprint Calculator - Full Stack

A full-stack application to calculate and analyze carbon footprints with AI-powered recommendations.

## 🚀 Quick Start

### One-Command Setup (Recommended)

**Windows:**
```powershell
.\integrate.bat
```

**macOS/Linux:**
```bash
chmod +x integrate.sh
./integrate.sh
```

This will:
- ✅ Install all dependencies
- ✅ Create environment configuration
- ✅ Verify setup
- ✅ Show you how to run both services

### Run Both Services

**Windows:**
```powershell
.\start-dev.bat
```

**macOS/Linux:**
```bash
chmod +x *.sh
./start-dev.sh
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

---

## 📁 Project Structure

```
carbon-footprint/
├── frontend/                    # React + Vite frontend
├── backend/                      # FastAPI Python backend
├── integrate.bat / .sh           # One-command setup
├── start-dev.bat / .sh           # Run both services
├── test-integration.bat          # Test connectivity
├── package.json
└── README.md
```

---

## 🔧 Manual Setup

### Frontend Setup

**Requirements:** Node.js 16+

```bash
cd frontend
npm install
npm run dev
```

### Backend Setup

**Requirements:** Python 3.9+

```bash
cd backend
python -m venv venv
venv\Scripts\activate.bat        # Windows
source venv/bin/activate         # macOS/Linux
pip install -r requirements.txt
python main.py
```

---

## 🔌 Integration Configuration

The frontend and backend communicate automatically via REST API.

**Frontend (.env.local):**
```
VITE_API_URL=http://localhost:8000
```

**Backend (.env):**
```
ENV=development
PORT=8000
CORS_ORIGINS=http://localhost:5173,http://localhost:3000,http://localhost:4173
```

**Fallback:** If backend is unavailable, frontend uses mock calculations.

---

## ✅ Verify Integration

**Windows:**
```powershell
.\test-integration.bat
```

Checks backend health, frontend availability, and API connectivity.

---

## 📡 API Endpoints

**Base URL:** `http://localhost:8000/api/`  
**Docs:** `http://localhost:8000/docs`

### POST /api/calculate
Calculate carbon footprint from lifestyle data.

**Request:**
```json
{
  "transport": {"mode": "car", "distance_per_day": 25},
  "diet": {"type": "nonveg"},
  "energy": {"monthly_units": 350}
}
```

**Response:**
```json
{
  "total_co2": 3456.78,
  "carbon_score": "Moderate",
  "trees_required": 165,
  "breakdown": {...},
  "recommendations": [...]
}
```

### POST /api/simulate
Simulate carbon reduction scenarios.

**Request:**
```json
{
  "base_data": {...},
  "adjustments": {"transport_reduction_percent": 50}
}
```

**Response:**
```json
{
  "new_total_co2": 2696.28,
  "reduction_percent": 21.99,
  "trees_saved": 36
}
```

---

## 🛠️ Development

**Frontend:** Edit `frontend/src/` → Vite hot-reloads  
**Backend:** Edit `backend/` → Dev server auto-reloads

**Add dependencies:**
- Frontend: `cd frontend && npm install <pkg>`
- Backend: `cd backend && pip install <pkg> && pip freeze > requirements.txt`

---

## 🚚 Production Build

**Frontend:**
```bash
cd frontend
VITE_API_URL=https://api.yourdomain.com npm run build
```

**Backend:**
```bash
cd backend
ENV=production python main.py
```

Or with Gunicorn: `gunicorn -w 4 -b 0.0.0.0:8000 main:app`

---

## 💪 Technology Stack

| Component | Stack |
|-----------|-------|
| **Frontend** | React 18, Vite, React Router, Recharts, Axios |
| **Backend** | FastAPI, Uvicorn, Pydantic, Python 3.9+ |
| **API** | REST, JSON, CORS |

---

## 🎯 Features

- 🌍 Calculate annual carbon footprint
- 📊 Visual emissions breakdown
- 🤖 AI-powered recommendations
- 🧪 What-if scenario simulator
- 📱 Fully responsive UI
- 💾 Calculation history
- ⚡ Auto-generated API docs
- 🎨 Smooth animations

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Frontend won't load | `cd frontend && npm install` |
| API not found | Check `VITE_API_URL` in `frontend/.env.local` |
| Port 8000 in use | Edit `backend/.env`: `PORT=8001` |
| Port 5173 in use | Edit `frontend/vite.config.js` server port |
| CORS errors | Update `CORS_ORIGINS` in `backend/.env` |
| Venv issues | Delete `backend/venv/`, rerun `integrate.bat` |

---

## 📚 More Documentation

- [Backend README](./backend/README.md)
- [Frontend README](./frontend/README.md)
- [Backend Setup](./BACKEND_SETUP.md)
- [FastAPI Integration](./FASTAPI_BACKEND.md)

---

## ⚖️ License

MIT

---

## 🤝 Support

Check troubleshooting above or refer to documentation links.
