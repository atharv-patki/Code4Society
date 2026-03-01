# FastAPI Backend - Setup & Integration

## Directory Structure

Your project now has a complete backend:

```
carbon-footprint/
├── backend/                    # FastAPI backend
│   ├── main.py                # FastAPI application & routes
│   ├── models.py              # Pydantic data models
│   ├── calculator.py          # Carbon calculation logic
│   ├── requirements.txt        # Python dependencies
│   ├── .env.example           # Environment template
│   ├── setup.bat              # Windows setup script
│   ├── run.bat                # Windows run script
│   ├── setup.sh               # macOS/Linux setup script
│   ├── run.sh                 # macOS/Linux run script
│   └── README.md              # Backend documentation
├── src/                        # React frontend
├── package.json
├── vite.config.js
├── BACKEND_SETUP.md           # Backend setup guide
├── .env.local.example         # Frontend env template
├── start-dev.bat              # Start both frontend & backend (Windows)
└── start-dev.sh               # Start both frontend & backend (macOS/Linux)
```

## Quick Start

### Windows Users

**Terminal in project root:**

```powershell
.\start-dev.bat
```

This opens two terminal windows:
- Backend on `http://localhost:8000`
- Frontend on `http://localhost:5173`

Or start them individually:

**Terminal 1 (Backend):**
```powershell
cd backend
.\setup.bat
.\run.bat
```

**Terminal 2 (Frontend):**
```powershell
npm install  # if not done yet
npm run dev
```

---

### macOS/Linux Users

**Terminal in project root:**

```bash
chmod +x *.sh  # make scripts executable
./start-dev.sh
```

Or start them individually:

**Terminal 1 (Backend):**
```bash
cd backend
chmod +x setup.sh run.sh
./setup.sh
./run.sh
```

**Terminal 2 (Frontend):**
```bash
npm install  # if not done yet
npm run dev
```

---

## API Documentation

Once the backend is running, visit:

**Swagger UI (Interactive):**
```
http://localhost:8000/docs
```

**ReDoc (Read-only):**
```
http://localhost:8000/redoc
```

---

## Environment Configuration

### Frontend (.env.local)

Create `.env.local` in the project root:

```
VITE_API_URL=http://localhost:8000
```

This tells the frontend to use your local backend instead of mock data.

### Backend (.env)

The backend already has a `.env` template. No changes needed for local development, but you can customize:

```bash
cd backend
cp .env.example .env
```

Available options:
- `ENV=development` (hot reload enabled)
- `PORT=8000`
- `CORS_ORIGINS=http://localhost:5173`

---

## Architecture

### Frontend (React + Vite)
- `src/pages/Home.jsx` - Input form
- `src/pages/Dashboard.jsx` - Results display
- `src/services/api.js` - API communication

### Backend (FastAPI)
- `calculator.py` - Core calculation logic
- `models.py` - Request/response schemas
- `main.py` - API endpoints

### Flow
1. Frontend sends user input to `/api/calculate`
2. Backend computes carbon emissions
3. Frontend displays results
4. User can simulate reductions via `/api/simulate`

---

## API Endpoints

### POST /api/calculate
Calculate annual carbon footprint.

**Request:**
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

**Response:**
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

### POST /api/simulate
Simulate carbon reduction with adjustments.

**Request:**
```json
{
  "base_data": { /* response from /api/calculate */ },
  "adjustments": {
    "transport_reduction_percent": 50
  }
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

## Production Deployment

### Backend (Python)

**Requirements:**
- Python 3.9 or higher
- All packages from `requirements.txt`

**Build:**
```bash
cd backend
pip install -r requirements.txt
```

**Run:**
```bash
ENV=production PORT=8000 python main.py
```

Or using Gunicorn (recommended):
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:8000 main:app
```

### Frontend (React)

**Build:**
```bash
npm run build
```

**Output:**
- `dist/` folder contains static files ready to deploy

**Important:** Make sure `VITE_API_URL` points to your production backend:
```bash
VITE_API_URL=https://api.yourdomain.com npm run build
```

---

## Troubleshooting

### Backend won't start
- Check Python 3.9+: `python --version`
- Install dependencies: `pip install -r requirements.txt`
- Port 8000 in use? Change in `.env` (PORT=8001)

### Frontend can't reach backend
- Check `VITE_API_URL` in `.env.local`
- Backend running on port 8000? Verify with: `curl http://localhost:8000/api/health`
- Check CORS settings in backend `.env`

### "ModuleNotFoundError"
- Activate virtual environment:
  - Windows: `backend\venv\Scripts\activate.bat`
  - macOS/Linux: `source backend/venv/bin/activate`
- Install deps: `pip install -r requirements.txt`

### Port already in use
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :8000
kill -9 <PID>
```

---

## Development Workflow

### Adding New Features

1. **Backend change?**
   - Edit `calculator.py` or add endpoints in `main.py`
   - Update `models.py` if schema changes
   - Server auto-reloads (development mode)

2. **Frontend change?**
   - Edit `.jsx` files in `src/`
   - Vite hot-reloads automatically

3. **Testing?**
   - Use Swagger UI at `http://localhost:8000/docs`
   - Or use cURL/Postman

### Example cURL request:
```bash
curl -X POST http://localhost:8000/api/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "transport": {"mode": "car", "distance_per_day": 25},
    "diet": {"type": "nonveg"},
    "energy": {"monthly_units": 350}
  }'
```

---

## Next Steps

1. ✅ Backend created and ready
2. Run `./start-dev.bat` (Windows) or `./start-dev.sh` (macOS/Linux)
3. Visit `http://localhost:5173` for frontend
4. Test calculations in the app
5. Check `http://localhost:8000/docs` for API docs
6. Modify calculations in `backend/calculator.py` as needed

---

## Additional Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Pydantic Documentation](https://docs.pydantic.dev/)
- [Uvicorn Server](https://www.uvicorn.org/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)

