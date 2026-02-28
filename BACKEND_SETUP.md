# Quick Start Guide - Backend Setup

## Option 1: Windows (Recommended for Windows Users)

### Step 1: Open PowerShell in Backend Directory
```powershell
cd backend
```

### Step 2: Run Setup
```powershell
.\setup.bat
```
This will:
- Check for Python installation
- Create a virtual environment
- Install all dependencies
- Create a `.env` configuration file

### Step 3: Start the Server
```powershell
.\run.bat
```

The backend will start on `http://localhost:8000`

---

## Option 2: macOS/Linux

### Step 1: Open Terminal in Backend Directory
```bash
cd backend
```

### Step 2: Make Scripts Executable
```bash
chmod +x setup.sh run.sh
```

### Step 3: Run Setup
```bash
./setup.sh
```

### Step 4: Start the Server
```bash
./run.sh
```

---

## Option 3: Manual Setup (All Platforms)

### Step 1: Create Virtual Environment
```bash
python -m venv venv

# On Windows:
venv\Scripts\activate.bat

# On macOS/Linux:
source venv/bin/activate
```

### Step 2: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 3: Copy Environment File
```bash
cp .env.example .env
```

### Step 4: Start the Server
```bash
python main.py
```

---

## Verify Backend is Running

Go to: **`http://localhost:8000/docs`**

You should see:
- Swagger UI with interactive API documentation
- All available endpoints
- Try-it-out functionality for testing

Also check the health endpoint:
```
GET http://localhost:8000/api/health
```

---

## Connect Frontend to Backend

### In the Frontend Project Root

Create or edit `.env.local`:
```
VITE_API_URL=http://localhost:8000
```

Or update your Vite config to set the API URL when running the dev server.

### Run Frontend
In another terminal (in the frontend directory):
```bash
npm run dev
```

The frontend will now use your FastAPI backend instead of mock data!

---

## API Endpoints

### Health Check
```
GET /api/health
```

### Calculate Carbon Footprint
```
POST /api/calculate
Content-Type: application/json

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

### Simulate Carbon Reduction
```
POST /api/simulate
Content-Type: application/json

{
  "base_data": { ... },
  "adjustments": {
    "transport_reduction_percent": 50
  }
}
```

---

## Troubleshooting

### "Python not found"
- Ensure Python 3.9+ is installed: `python --version`
- Add Python to PATH if needed

### "ModuleNotFoundError"
- Ensure virtual environment is activated
- Run `pip install -r requirements.txt`

### "Port 8000 already in use"
- Edit `.env` and change PORT to another value (e.g., 8001)
- Or find and kill the process using port 8000

### "CORS errors in browser"
- Check `.env` has correct frontend URL in CORS_ORIGINS
- Default: `http://localhost:5173,http://localhost:3000`

### "Can't activate virtual environment"
- Windows: Run PowerShell as Administrator
- macOS/Linux: Ensure scripts are executable: `chmod +x *.sh`

---

## Development

### Hot Reload
The backend automatically reloads when files are edited (development mode).

### Debug Mode
The API prints logs to console by default.

### Full API Docs
Visit `http://localhost:8000/docs` (Swagger UI) or `http://localhost:8000/redoc` (ReDoc)

---

## Stopping the Server

Press `Ctrl + C` in the terminal where the server is running.

---

## Next Steps

1. ✅ Backend is running
2. Connect frontend to backend by setting `VITE_API_URL`
3. Run frontend: `npm run dev`
4. Test endpoints via Swagger UI at `http://localhost:8000/docs`
5. Build for production when ready
